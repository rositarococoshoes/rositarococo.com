'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  BASE_PATH,
  CHAT_WEBHOOK_URL,
  CHECKOUT_STEPS,
  ORDER_WEBHOOK_URL,
  PAGE_COPY,
  PAYMENT_LINK_WEBHOOK_URL,
  PAYMENT_METHODS,
  PREVIO_PAGO_PRICING,
  PRODUCTS,
  PROVINCES,
  WHATSAPP_MODAL_SOURCE,
  WHATSAPP_SAVE_WEBHOOK_URL,
  WHATSAPP_VALIDATE_WEBHOOK_URL,
} from '@/src/lib/previo-pago-data';
import {
  buildOrderSummary,
  calculateCartTotal,
  formatOrderDetails,
  getCartHeadline,
  getCartPhase,
  getPostAddMessage,
  isValidWhatsappInput,
} from '@/src/lib/funnel-utils';
import { shouldOpenWhatsappModal } from '@/src/lib/whatsapp-modal-utils';
import LegacyWhatsappModal from '@/src/components/LegacyWhatsappModal';

const DeferredChatWidget = dynamic(() => import('@/src/components/DeferredChatWidget'), {
  ssr: false,
  loading: () => null,
});

const formatCurrency = (value) => `$${value.toLocaleString('es-AR')}`;

function getCookie(name) {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}

async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || '';
  } catch {
    try {
      const response = await fetch('https://httpbin.org/ip');
      const data = await response.json();
      return data.origin || '';
    } catch {
      return '';
    }
  }
}

async function requestMercadoPagoLink({ buyerName, total }) {
  const fbp = getCookie('_fbp') || window.localStorage.getItem('facebook_fbp') || '';
  const response = await fetch(PAYMENT_LINK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comprador: buyerName, monto: total, fbp }),
  });

  if (!response.ok) {
    throw new Error(`MercadoPago link request failed: ${response.status}`);
  }

  const payload = await response.json();
  const link = Array.isArray(payload) ? payload[0]?.linkpersonalizadomp : payload?.linkpersonalizadomp;
  if (!link) throw new Error('Missing MercadoPago link in response');
  return link;
}

async function submitPrevioPagoOrder(formData) {
  const response = await fetch(ORDER_WEBHOOK_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Order submission failed: ${response.status}`);
  }
}

function ProductGallery({ product, priority = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = product.images[activeIndex];

  return (
    <div className="gallery-card">
      <div className="gallery-frame">
        <img
          src={activeImage}
          alt={product.displayName}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="gallery-image"
        />
      </div>
      <div className="gallery-thumbs">
        {product.images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={`gallery-thumb ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ver foto ${index + 1} de ${product.displayName}`}
          >
            <img src={image} alt="" loading="lazy" decoding="async" className="gallery-thumb-image" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd, cartLocked, helperLabel, priority = false }) {
  const [size, setSize] = useState('');
  const specsInline = product.specs.map((spec) => spec.value).join(' / ');

  return (
    <article className="product-card" id={`modelo-${product.id}`}>
      <div className="product-top">
        <div className="product-badges-row">
          {product.badges.map((badge) => (
            <span key={badge} className="badge-chip">{badge}</span>
          ))}
        </div>
        <h2>{product.displayName}</h2>
      </div>

      <ProductGallery product={product} priority={priority} />

      <div className="product-copy">
        <p className="product-meta-line">{specsInline}</p>
        <p className="product-description-copy compact-description">{product.description}</p>

        <div className="price-card concise-price-card">
          <div className="price-card-headline compact-card-pricing">
            <span>Tu oferta</span>
          </div>
          <div className="price-options static-prices compact-price-grid">
            <div className="price-option static-price">
              <div>
                <strong>1 par</strong>
                <span>{product.unitPriceLabel}</span>
                <small>Pago previo seguro</small>
              </div>
            </div>
            <div className="price-option static-price featured-bundle">
              <div>
                <strong>2 pares</strong>
                <span>{product.bundlePriceLabel}</span>
                <small>{`${product.savingsLabel} con envío gratis`}</small>
              </div>
            </div>
          </div>
          <p className="promo-inline-copy">Agregá 1 par por vez. Combiná cualquier modelo o talle. <strong>{helperLabel}</strong>.</p>
        </div>

        <div className="size-selector-block single-size-selector">
          <label>
            Seleccioná tu talle
            <select value={size} onChange={(event) => setSize(event.target.value)}>
              <option value="">-- Seleccioná tu talle --</option>
              {product.sizes.map((entry) => (
                <option key={entry.value} value={entry.value}>{entry.label}</option>
              ))}
            </select>
          </label>
        </div>

        {size ? <p className="selection-hint concise-hint">{`Talle ${size} listo para agregar.`}</p> : null}

        <details className="size-guide-disclosure">
          <summary>Guía de talles</summary>
          <div className="size-table-card">
            <div className="size-table-header">
              <strong>Guía de talles</strong>
              <span>Plantilla aproximada en cm</span>
            </div>
            <div className="size-table-grid" role="table" aria-label={`Guía de talles de ${product.displayName}`}>
              {product.sizes.map((entry) => (
                <div key={entry.value} className="size-table-row" role="row">
                  <span role="cell">Talle {entry.value}</span>
                  <strong role="cell">{entry.label.replace(`${entry.value} `, '')}</strong>
                </div>
              ))}
            </div>
          </div>
        </details>

        <button
          type="button"
          className="add-button"
          disabled={cartLocked}
          onClick={() => onAdd(product, size)}
        >
          {cartLocked ? 'Pedido completo' : 'Agregar este par'}
        </button>
      </div>
    </article>
  );
}

function CartGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M3.5 5.5h2l1.9 8.1a1.6 1.6 0 0 0 1.6 1.2h7.7a1.6 1.6 0 0 0 1.5-1.1l1.8-6.5H7.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19.5" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function MiniCartDrawer({ cartEntries, cartHeadline, cartPhase, total, expanded, setExpanded, onRemove, onGoProducts, onGoCheckout }) {
  if (!cartEntries.length) return null;

  const helperCopy = cartPhase === 'bundle'
    ? 'Tus 2 pares ya tienen precio promo y envío gratis.'
    : 'Sumá otro par para activar 2 pares por $137.500.';

  const handleGoProducts = () => {
    setExpanded(false);
    onGoProducts();
  };

  const handleGoCheckout = () => {
    setExpanded(false);
    onGoCheckout();
  };

  return (
    <div className={`mobile-cart-drawer ${expanded ? 'is-open' : ''}`}>
      <button
        type="button"
        className="mobile-cart-toggle"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Ocultar' : 'Ver'} carrito con ${cartEntries.length} par${cartEntries.length > 1 ? 'es' : ''} y total ${formatCurrency(total)}`}
      >
        <div className="mobile-cart-peek">
          <div className="mobile-cart-icon-shell" aria-hidden="true">
            <span className="mobile-cart-icon">
              <CartGlyph />
            </span>
            <span className="mobile-cart-count">{cartEntries.length}</span>
          </div>
          <div className="mobile-cart-copy">
            <strong>{cartHeadline}</strong>
            <span>{helperCopy}</span>
          </div>
        </div>
        <div className="mobile-cart-summary">
          <strong>{formatCurrency(total)}</strong>
          <span>{expanded ? 'Ocultar carrito' : 'Ver carrito'}</span>
        </div>
      </button>

      {expanded ? (
        <div className="mobile-cart-sheet">
          <div className="mobile-cart-handle" aria-hidden="true" />
          <div className="mobile-cart-sheet-headbar">
            <div className="mobile-cart-sheet-head">
              <span>{cartPhase === 'bundle' ? 'Promo activada' : 'Tu pedido en curso'}</span>
              <strong>{cartPhase === 'bundle' ? 'Tus 2 pares ya tienen promo activa' : 'Sumá 1 par más y activás 2 pares por $137.500'}</strong>
              <p>{helperCopy}</p>
            </div>
            <button type="button" className="mobile-cart-close" onClick={() => setExpanded(false)} aria-label="Cerrar pedido">{'\u00D7'}</button>
          </div>

          <div className="mobile-cart-lines">
            {cartEntries.map((item) => {
              const thumb = item.product?.images?.[0];
              return (
                <article key={item.id} className="mobile-cart-line">
                  {thumb ? <img src={thumb} alt={item.product?.displayName || item.productId} width="48" height="48" loading="lazy" decoding="async" className="mobile-cart-thumb" /> : null}
                  <div className="mobile-cart-line-copy">
                    <strong>{item.product?.displayName || item.productId}</strong>
                    <span>Talle {item.size}</span>
                    <button
                      type="button"
                      className="mobile-inline-remove"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Quitar ${item.product?.displayName || item.productId} talle ${item.size}`}
                    >
                      Quitar
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mobile-cart-total-box">
            <div>
              <span>Total del pedido</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
            <small>{cartPhase === 'bundle' ? 'Envío gratis incluido. Elegí cómo pagar al finalizar.' : 'Podés finalizar con 1 par o sumar otro y mejorar el total.'}</small>
          </div>

          <div className="mobile-cart-actions">
            {cartPhase === 'single' ? (
              <>
                <button type="button" className="submit-button mobile-cart-button" onClick={handleGoProducts}>Sumar otro par y activar promo</button>
                <p className="mobile-cart-secondary-copy">o <button type="button" className="mini-link-button" onClick={handleGoCheckout}>finalizá con 1 par</button></p>
              </>
            ) : (
              <>
                <button type="button" className="submit-button mobile-cart-button" onClick={handleGoCheckout}>Finalizar pedido</button>
                <p className="mobile-cart-secondary-copy">o <button type="button" className="mini-link-button" onClick={handleGoProducts}>seguir viendo modelos</button></p>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function PrevioPagoLanding({ testimonialsSlot = null }) {
  const [cart, setCart] = useState([]);
  const [cartExpanded, setCartExpanded] = useState(true);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [prefillWhatsapp, setPrefillWhatsapp] = useState('');
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    whatsapp: '',
    street: '',
    postalCode: '',
    locality: '',
    province: 'Buenos Aires',
    dni: '',
    paymentMethod: '',
  });

  useEffect(() => {
    const savedWhatsapp = window.localStorage.getItem('savedWhatsapp')
      || window.localStorage.getItem('rosita.whatsapp.prefill')
      || '';
    if (savedWhatsapp) {
      setPrefillWhatsapp(savedWhatsapp);
      setFormState((current) => ({ ...current, whatsapp: current.whatsapp || savedWhatsapp }));
    }
  }, []);

  useEffect(() => {
    if (!notification) return undefined;
    const timeout = window.setTimeout(() => setNotification(''), 2600);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  useEffect(() => {
    if (mobileCartOpen && notification) {
      setNotification('');
    }
  }, [mobileCartOpen, notification]);

  useEffect(() => {
    if (whatsappModalOpen && notification) {
      setNotification('');
    }
  }, [notification, whatsappModalOpen]);

  const cartPhase = getCartPhase(cart.length);
  const cartHeadline = getCartHeadline(cart.length);
  const total = calculateCartTotal(cart.length, PREVIO_PAGO_PRICING);
  const cartEntries = useMemo(
    () => cart.map((item) => ({ ...item, product: PRODUCTS.find((entry) => entry.id === item.productId) })),
    [cart],
  );
  const orderSummary = useMemo(() => buildOrderSummary(cart), [cart]);
  const orderDetails = useMemo(() => formatOrderDetails(cart, PRODUCTS), [cart]);
  const canCheckout = cart.length > 0;
  const activeCheckoutStep = cart.length ? 2 : 1;
  const selectedPayment = PAYMENT_METHODS.find((entry) => entry.value === formState.paymentMethod);
  const offerHelperLabel = 'Pago online o transferencia con descuento adicional';

  function updateField(field, value) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function jumpTo(selector) {
    const element = document.querySelector(selector);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleAdd(product, size) {
    if (!size) {
      setNotification('Seleccioná tu talle antes de agregar el par al pedido.');
      return;
    }
    if (cart.length >= 2) {
      setNotification('Ya tenés 2 pares en el pedido. Eliminá uno si querés cambiarlo.');
      return;
    }

    const nextCount = cart.length + 1;
    const shouldPromptWhatsapp = typeof window !== 'undefined' && shouldOpenWhatsappModal({
      cartCount: nextCount,
      modalAlreadyShown: Boolean(window.localStorage.getItem('whatsappModalShown')),
    });

    setCart((current) => [
      ...current,
      { productId: product.id, size, id: `${product.id}-${size}-${Date.now()}-${Math.random()}` },
    ]);
    setCartExpanded(true);
    setMobileCartOpen(false);
    setNotification(shouldPromptWhatsapp ? '' : (nextCount === 1 ? getPostAddMessage(nextCount, PREVIO_PAGO_PRICING) : ''));
    if (shouldPromptWhatsapp) {
      window.setTimeout(() => setWhatsappModalOpen(true), 500);
    }
    if (!formState.whatsapp && prefillWhatsapp) {
      setFormState((current) => ({ ...current, whatsapp: current.whatsapp || prefillWhatsapp }));
    }
  }

  function removeItem(itemId) {
    setCart((current) => current.filter((item) => item.id !== itemId));
  }

  async function submitOrder(event) {
    event.preventDefault();

    if (!cart.length) {
      setNotification('Primero agregá al menos un par al carrito.');
      return;
    }
    if (!formState.email || !formState.name || !formState.street || !formState.postalCode || !formState.locality || !formState.province || !formState.dni || !formState.paymentMethod) {
      setNotification('Completá todos los datos obligatorios antes de continuar.');
      return;
    }
    if (!isValidWhatsappInput(formState.whatsapp)) {
      setNotification('Revisá el WhatsApp. Debe ir sin 0 ni 15.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    const whatsappForForm = formState.whatsapp.replace(/\D/g, '');
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `${BASE_PATH}/index.html`;
    const clientIp = await getClientIP();
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const fbp = getCookie('_fbp') || window.localStorage.getItem('facebook_fbp') || '';

    formData.set('entry.286442883', orderSummary);
    formData.set('entry.1465946249', formState.email.trim());
    formData.set('entry.1460904554', formState.name.trim());
    formData.set('entry.53830725', whatsappForForm);
    formData.set('entry.951592426', formState.street.trim());
    formData.set('entry.1005165410', formState.postalCode.trim());
    formData.set('entry.1743418466', formState.locality.trim());
    formData.set('entry.59648134', formState.province);
    formData.set('entry.541001873', formState.dni.trim());
    formData.set('entry.17650825', 'A DOMICILIO');
    formData.set('entry.1209868979', currentUrl);
    formData.set('entry.978809450', '');
    formData.set('comoabona', formState.paymentMethod);
    formData.set('website', '');
    formData.set('fvv', '1');
    formData.set('fbzx', '5661184097173102736');
    formData.set('pageHistory', '0');
    if (clientIp) formData.set('client_ip_address', clientIp);
    if (userAgent) formData.set('client_user_agent', userAgent);
    if (fbp) formData.set('_fbp', fbp);

    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {
          currency: 'ARS',
          value: total,
          num_items: cart.length,
          content_type: 'product',
        });
      }

      let mercadoPagoUrl = '';
      if (formState.paymentMethod === 'tarjeta' || formState.paymentMethod === 'mercadopago') {
        mercadoPagoUrl = await requestMercadoPagoLink({ buyerName: formState.name.trim(), total });
        formData.set('entry.978809450', mercadoPagoUrl);
      }

      await submitPrevioPagoOrder(formData);

      window.localStorage.setItem('orderDetails', orderDetails);
      window.localStorage.setItem('rawProducts', orderSummary);
      window.localStorage.setItem('customerName', formState.name.trim());
      window.localStorage.setItem('customerEmail', formState.email.trim());
      window.localStorage.setItem('paymentMethod', formState.paymentMethod);
      window.localStorage.setItem('orderTotal', String(total));
      window.localStorage.setItem('rosita.whatsapp.prefill', formState.whatsapp);

      if (formState.paymentMethod === 'cbu') {
        const transferRoute = cart.length === 1 ? '/transferenciacbu-1par.html' : '/transferenciacbu-2pares.html';
        window.location.assign(`${BASE_PATH}${transferRoute}?286442883=${encodeURIComponent(orderSummary)}`);
        return;
      }

      window.location.assign(mercadoPagoUrl);
    } catch {
      setNotification('Hubo un problema al procesar el pedido. Intenta nuevamente.');
      setLoading(false);
    }
  }

  return (
    <>
      <section id="productos" className="products-section">
        <div className="products-grid refined-grid">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAdd}
              cartLocked={cart.length >= 2}
              helperLabel={offerHelperLabel}
              priority={product.id === PRODUCTS[0].id}
            />
          ))}
        </div>
      </section>

      {testimonialsSlot}

      <section className="checkout-layout editorial-layout">
        <aside className="cart-panel editorial-cart">
          <div className="cart-header">
            <div>
              <span>Tu pedido</span>
              <strong>{cartHeadline}</strong>
            </div>
            <button type="button" className="cart-expand-button" onClick={() => setCartExpanded((value) => !value)}>
              {cartExpanded ? 'Ocultar' : 'Ver pedido'} ({cart.length}/2)
            </button>
          </div>

          <div className={`cart-offer-banner ${cartPhase}`}>
            <span>{cartPhase === 'bundle' ? 'Promo activada' : cartPhase === 'single' ? 'Te falta 1 par' : 'Activa la promo'}</span>
            <strong>{cartPhase === 'bundle' ? '2 pares por $137.500' : 'Sumá otro par'}</strong>
            <p>
              {cartPhase === 'empty'
                ? 'Agregá un par para empezar tu pedido.'
                : cartPhase === 'single'
                  ? 'Podés sumar el segundo del mismo modelo o de otro, con cualquier talle.'
                  : 'Tu pedido ya quedó con el precio promo final y envío gratis.'}
            </p>
          </div>

          {cartExpanded ? (
            <div className="cart-items independent-lines">
              {cartEntries.length ? cartEntries.map((item) => {
                const thumb = item.product?.images?.[0];
                return (
                  <article key={item.id} className="cart-item detailed-cart-item independent-item">
                    <div className="cart-item-media">
                      {thumb ? <img src={thumb} alt={item.product?.displayName || item.productId} width="68" height="68" loading="lazy" decoding="async" className="cart-item-thumb" /> : null}
                    </div>
                    <div className="cart-item-copy">
                      <strong>{item.product?.displayName || item.productId}</strong>
                      <p>Talle {item.size}</p>
                    </div>
                    <div className="cart-item-actions compact-actions">
                      <button type="button" className="cart-remove-link" onClick={() => removeItem(item.id)}>Quitar</button>
                    </div>
                  </article>
                );
              }) : <p className="empty-copy">Todavía no agregaste pares.</p>}
            </div>
          ) : null}

          <div className="cart-total-box highlighted-box">
            <span>Total del pedido</span>
            <strong>{formatCurrency(total)}</strong>
            <small>
              {cartPhase === 'empty'
                ? 'Agregá un par para ver el total final.'
                : cartPhase === 'single'
                  ? '1 par: $87.500. Sumá otro y activás la promo de $137.500.'
                  : '2 pares promo: $137.500 con envío gratis.'}
            </small>
          </div>

          <div className="cart-next-actions desktop-actions">
            {cartPhase === 'single' ? <button type="button" className="ghost-button" onClick={() => jumpTo('#productos')}>Sumar otro par</button> : null}
            {canCheckout ? <button type="button" className="submit-button" onClick={() => jumpTo('#checkout-form')}>{cartPhase === 'bundle' ? 'Finalizar pedido' : 'Finalizar compra'}</button> : null}
          </div>
        </aside>

        <section id="checkout-form" className={`checkout-panel editorial-checkout ${canCheckout ? 'ready' : 'locked'}`}>
          <div className="section-heading left compact-heading">
            <span>Checkout</span>
            <h2>{PAGE_COPY.checkoutTitle}</h2>
          </div>

          <div className="checkout-mini-steps">
            {CHECKOUT_STEPS.map((step, index) => (
              <div key={step} className={`mini-step ${index + 1 <= activeCheckoutStep ? 'active' : ''}`}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>

          <form className="checkout-form refined-form" onSubmit={submitOrder}>
            <input type="hidden" name="entry.286442883" value={orderSummary} readOnly />
            <input type="hidden" name="entry.17650825" value="A DOMICILIO" readOnly />

            <fieldset className="checkout-fieldset">
              <legend>Resumen de tu pedido</legend>
              <label>
                Modelos y talles seleccionados
                <input value={orderDetails} readOnly placeholder="Aquí verás tu selección" />
              </label>
            </fieldset>

            <fieldset className="checkout-fieldset">
              <legend>Información de contacto</legend>
              <div className="field-grid">
                <label>
                  Email
                  <input value={formState.email} onChange={(event) => updateField('email', event.target.value)} placeholder="tuemail@ejemplo.com" required />
                  <small>Te enviamos la confirmación y el seguimiento del pago o despacho.</small>
                </label>
                <label>
                  Nombre y apellido
                  <input value={formState.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Quién recibe el pedido" required />
                </label>
              </div>
              <div className="field-grid">
                <label>
                  WhatsApp
                  <input value={formState.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} placeholder="Ej: 1156457057 (sin 0 ni 15)" required />
                  <small>{isValidWhatsappInput(formState.whatsapp) || !formState.whatsapp ? 'Lo usamos por si necesitamos ayudarte con el pago o el envío.' : 'Formato inválido.'}</small>
                </label>
                <label>
                  DNI
                  <input value={formState.dni} onChange={(event) => updateField('dni', event.target.value)} placeholder="Del titular o quien recibe" required />
                </label>
              </div>
            </fieldset>

            <fieldset className="checkout-fieldset">
              <legend>Dirección de envío</legend>
              <p className="fieldset-copy">Asegurate de que sea correcta para recibir tu paquete sin problemas.</p>
              <label>
                Calle y número (Piso/Dpto)
                <input value={formState.street} onChange={(event) => updateField('street', event.target.value)} placeholder="Ej: Av. Siempreviva 742, 3B" required />
              </label>
              <div className="field-grid triple">
                <label>
                  Código postal
                  <input value={formState.postalCode} onChange={(event) => updateField('postalCode', event.target.value)} placeholder="Ej: 1425" required />
                </label>
                <label>
                  Localidad
                  <input value={formState.locality} onChange={(event) => updateField('locality', event.target.value)} placeholder="Ej: Palermo" required />
                </label>
                <label>
                  Provincia
                  <select value={formState.province} onChange={(event) => updateField('province', event.target.value)} required>
                    {PROVINCES.map((province) => <option key={province} value={province}>{province}</option>)}
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset className="checkout-fieldset emphasis-fieldset">
              <legend>Pago</legend>
              <p className="fieldset-copy compact-legend-copy">{PAGE_COPY.paymentLegend}</p>
              <label>
                ¿Cómo preferís abonar?
                <select value={formState.paymentMethod} onChange={(event) => updateField('paymentMethod', event.target.value)} required>
                  <option value="">Seleccioná una opción</option>
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method.value} value={method.value}>{method.label}</option>
                  ))}
                </select>
              </label>
              {selectedPayment ? <p className="payment-helper-copy">{selectedPayment.helper}</p> : null}
            </fieldset>

            <div className="review-box original-review-style">
              <h3>Revisa tu pedido y datos</h3>
              <p><strong>Selección:</strong> {orderDetails || '-'}</p>
              <p><strong>Nombre:</strong> {formState.name || '-'}</p>
              <p><strong>WhatsApp:</strong> {formState.whatsapp || '-'}</p>
              <p><strong>Email:</strong> {formState.email || '-'}</p>
              <p><strong>Dirección:</strong> {[formState.street, formState.locality, formState.postalCode].filter(Boolean).join(', ') || '-'}</p>
              <p><strong>DNI:</strong> {formState.dni || '-'}</p>
              <p><strong>Método de pago:</strong> {selectedPayment?.label || '-'}</p>
              <p className="review-total">Total: {formatCurrency(total)}</p>
              <details className="checkout-detail-note review-commitment-note">
                <summary>Importante antes de enviar</summary>
                <p className="review-warning">{PAGE_COPY.reviewCommitment}</p>
              </details>
              <p className="review-help">Si elegís transferencia, el total con descuento queda en <strong>{cart.length === 2 ? PREVIO_PAGO_PRICING.cbuBundleLabel : PREVIO_PAGO_PRICING.cbuSingleLabel}</strong>.</p>
            </div>

            <p className="checkout-reminder compact-reminder">{PAGE_COPY.freeShippingReminder}</p>
            <div className="submit-row aligned-row">
              <button type="submit" className="submit-button" disabled={!canCheckout || loading}>{loading ? 'Procesando...' : 'Confirmar y pagar'}</button>
              <p>Te llevamos al siguiente paso según el medio de pago que elijas.</p>
            </div>
          </form>
        </section>
      </section>

      {notification ? <div className="notification-toast subtle-toast">{notification}</div> : null}

      <MiniCartDrawer
        cartEntries={cartEntries}
        cartHeadline={cartHeadline}
        cartPhase={cartPhase}
        total={total}
        expanded={mobileCartOpen}
        setExpanded={setMobileCartOpen}
        onRemove={removeItem}
        onGoProducts={() => jumpTo('#productos')}
        onGoCheckout={() => jumpTo('#checkout-form')}
      />
      <LegacyWhatsappModal
        isOpen={whatsappModalOpen}
        initialWhatsapp={prefillWhatsapp || formState.whatsapp}
        title={PAGE_COPY.whatsappModalTitle}
        message={PAGE_COPY.whatsappModalMessage}
        note={PAGE_COPY.whatsappModalNote}
        validateBeforeSave
        validateEndpoint={WHATSAPP_VALIDATE_WEBHOOK_URL}
        saveEndpoint={WHATSAPP_SAVE_WEBHOOK_URL}
        saveSource={WHATSAPP_MODAL_SOURCE}
        closeDelayMs={1000}
        onSaved={(whatsappNumber) => {
          setWhatsappModalOpen(false);
          setPrefillWhatsapp(whatsappNumber);
          setFormState((current) => ({ ...current, whatsapp: whatsappNumber }));
        }}
      />
      <DeferredChatWidget
        hasCart={cartEntries.length > 0}
        cartOpen={mobileCartOpen}
        webhookUrl={CHAT_WEBHOOK_URL}
        initialMessage="Hola, soy Rosita. Si quieres, te ayudo con talles, medios de pago o con la promo de previo pago."
        source="next-2026-previo-pago"
      />
    </>
  );
}

