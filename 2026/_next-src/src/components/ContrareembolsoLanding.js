'use client';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  BASE_PATH,
  CHAT_WEBHOOK_URL,
  CHECKOUT_STEPS,
  ORDER_WEBHOOK_URL,
  PAGE_COPY,
  PRODUCTS,
} from '@/src/lib/funnel-data';
import {
  buildLegacyOrderPayload,
  buildOrderSummary,
  calculateCartTotal,
  formatOrderDetails,
  getCartHeadline,
  getCartPhase,
  getDeliveryOptions,
  getPostAddMessage,
  getThankYouRoute,
  isValidWhatsappInput,
} from '@/src/lib/funnel-utils';

const DeferredChatWidget = dynamic(() => import('@/src/components/DeferredChatWidget'), {
  ssr: false,
  loading: () => null,
});

const formatCurrency = (value) => `$${value.toLocaleString('es-AR')}`;

function postOrderThroughHiddenForm(action, params) {
  if (typeof document === 'undefined') throw new Error('No document available for order submission');

  return new Promise((resolve) => {
    const frameName = `rosita-order-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement('iframe');
    let form = null;
    let settled = false;
    let submitted = false;
    let timeoutId = null;

    const cleanup = () => {
      if (form?.isConnected) form.remove();
      if (iframe.isConnected) iframe.remove();
    };

    const finalize = () => {
      if (settled) return;
      settled = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      cleanup();
      resolve();
    };

    iframe.name = frameName;
    iframe.title = 'order-submit-frame';
    iframe.hidden = true;
    iframe.addEventListener('load', () => {
      if (!submitted) return;
      finalize();
    });

    form = document.createElement('form');
    form.method = 'POST';
    form.action = action;
    form.target = frameName;
    form.hidden = true;

    const entries = new URLSearchParams(params.toString());
    entries.forEach((value, key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    submitted = true;
    timeoutId = window.setTimeout(finalize, 6000);
    form.submit();
  });
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

function ProductCard({ product, onAdd, cartLocked, deliveryLabel, priority = false }) {
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
            <span>Elige como quieres pedir</span>
          </div>
          <div className="price-options static-prices compact-price-grid">
            <div className="price-option static-price">
              <div>
                <strong>1 par</strong>
                <span>{product.unitPriceLabel}</span>
                <small>Paga al recibir</small>
              </div>
            </div>
            <div className="price-option static-price featured-bundle">
              <div>
                <strong>2 pares</strong>
                <span>{product.bundlePriceLabel}</span>
                <small>{`${product.savingsLabel} con envio gratis`}</small>
              </div>
            </div>
          </div>
          <p className="promo-inline-copy">Agrega 1 par por vez. Combina cualquier modelo o talle. <strong>{deliveryLabel}</strong>.</p>
        </div>

        <div className="size-selector-block single-size-selector">
          <label>
            Selecciona tu talle
            <select value={size} onChange={(event) => setSize(event.target.value)}>
              <option value="">-- Selecciona tu talle --</option>
              {product.sizes.map((entry) => (
                <option key={entry.value} value={entry.value}>{entry.label}</option>
              ))}
            </select>
          </label>
        </div>

        {size ? <p className="selection-hint concise-hint">{`Talle ${size} listo para agregar.`}</p> : null}

        <details className="size-guide-disclosure"><summary>Guia de talles</summary><div className="size-table-card">
          <div className="size-table-header">
            <strong>Guia de talles</strong>
            <span>Plantilla aproximada en cm</span>
          </div>
          <div className="size-table-grid" role="table" aria-label={`Guia de talles de ${product.displayName}`}>
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

function MiniCartDrawer({ cartEntries, cartHeadline, cartPhase, total, expanded, setExpanded, onRemove, onGoProducts, onGoCheckout }) {
  if (!cartEntries.length) return null;

  const latestItem = cartEntries[cartEntries.length - 1];
  const latestThumb = latestItem.product?.images?.[0];
  const peekItems = cartEntries.slice(-2);
  const helperCopy = cartPhase === 'bundle'
    ? 'Revisa tu pedido o termina la compra cuando quieras.'
    : 'Te falta 1 par para activar la promo de 2 pares.';
  const toggleLabel = cartPhase === 'bundle' ? 'Promo activada' : '1 de 2 pares';
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
      <button type="button" className="mobile-cart-toggle" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
        <div className="mobile-cart-peek">
          <div className={`mobile-cart-thumb-wrap ${cartEntries.length > 1 ? 'is-pair' : ''}`}>
            {cartEntries.length > 1 ? peekItems.map((item, index) => {
              const thumb = item.product?.images?.[0];
              if (!thumb) return null;
              return (
                <img
                  key={item.id}
                  src={thumb}
                  alt={item.product?.displayName || item.productId}
                  width="32"
                  height="40"
                  loading="lazy"
                  decoding="async"
                  className={`mobile-cart-thumb paired-thumb paired-thumb-${index}`}
                />
              );
            }) : latestThumb ? <img src={latestThumb} alt={latestItem.product?.displayName || latestItem.productId} width="52" height="52" loading="lazy" decoding="async" className="mobile-cart-thumb" /> : null}
            {cartEntries.length === 1 ? <span className="mobile-cart-count">{cartEntries.length}</span> : null}
          </div>
          <div className="mobile-cart-copy">
            <strong>{toggleLabel}</strong>
            <span>{cartEntries.length === 1 ? `${latestItem.product?.displayName || latestItem.productId} - talle ${latestItem.size}` : '2 pares en tu pedido'}</span>
          </div>
        </div>
        <div className="mobile-cart-summary">
          <strong>{formatCurrency(total)}</strong>
          <span>{expanded ? 'Minimizar' : 'Ver pedido'}</span>
        </div>
      </button>

      {expanded ? (
        <div className="mobile-cart-sheet">
          <div className="mobile-cart-handle" aria-hidden="true" />
          <div className="mobile-cart-sheet-headbar">
            <div className="mobile-cart-sheet-head">
              <span>{cartPhase === 'bundle' ? 'Promo activada' : 'Tu pedido en curso'}</span>
              <strong>{cartPhase === 'bundle' ? 'Tus 2 pares ya tienen promo activa' : 'Suma 1 par mas y activas 2 pares por $110.000'}</strong>
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
              <span>Total a pagar al recibir</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
            <small>{cartPhase === 'bundle' ? 'Envio gratis incluido. Pagas al recibir.' : 'Puedes finalizar con 1 par o sumar otro y ahorrar en el total.'}</small>
          </div>

          <div className="mobile-cart-actions">
            {cartPhase === 'single' ? (
              <>
                <button type="button" className="submit-button mobile-cart-button" onClick={handleGoProducts}>Sumar otro par y activar promo</button>
                <p className="mobile-cart-secondary-copy">o <button type="button" className="mini-link-button" onClick={handleGoCheckout}>finaliza con 1 par</button></p>
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

export default function ContrareembolsoLanding({ testimonialsSlot = null }) {
  const [cart, setCart] = useState([]);
  const [cartExpanded, setCartExpanded] = useState(true);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [prefillWhatsapp, setPrefillWhatsapp] = useState('');
  const [formState, setFormState] = useState({
    name: '', whatsapp: '', street: '', betweenStreets: '', postalCode: '', locality: '', province: 'Buenos Aires', deliverySlot: '',
  });

  useEffect(() => {
    const savedWhatsapp = window.localStorage.getItem('rosita.whatsapp.prefill') || '';
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

  const deliveryOptions = useMemo(() => getDeliveryOptions(new Date()), []);
  const featuredDeliveryLabel = deliveryOptions[0] || 'Proxima ventana disponible';
  const cartPhase = getCartPhase(cart.length);
  const cartHeadline = getCartHeadline(cart.length);
  const total = calculateCartTotal(cart.length);
  const cartEntries = useMemo(
    () => cart.map((item) => ({ ...item, product: PRODUCTS.find((entry) => entry.id === item.productId) })),
    [cart],
  );
  const orderSummary = useMemo(() => buildOrderSummary(cart), [cart]);
  const orderDetails = useMemo(() => formatOrderDetails(cart, PRODUCTS), [cart]);
  const legacyOrderPayload = useMemo(() => buildLegacyOrderPayload(cart, PRODUCTS), [cart]);
  const canCheckout = cart.length > 0;
  const activeCheckoutStep = cart.length ? 2 : 1;

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
      setNotification('Selecciona tu talle antes de agregar el par al pedido.');
      return;
    }
    if (cart.length >= 2) {
      setNotification('Ya tienes 2 pares en el pedido. Elimina uno si quieres cambiarlo.');
      return;
    }

    const nextCount = cart.length + 1;
    setCart((current) => [
      ...current,
      { productId: product.id, size, id: `${product.id}-${size}-${Date.now()}-${Math.random()}` },
    ]);
    setCartExpanded(true);
    setMobileCartOpen(false);
    setNotification(nextCount === 1 ? getPostAddMessage(nextCount) : '');
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
      setNotification('Primero agrega al menos un par al carrito.');
      return;
    }
    if (!formState.name || !formState.street || !formState.betweenStreets || !formState.postalCode || !formState.locality || !formState.deliverySlot) {
      setNotification('Completa todos los datos obligatorios antes de comprar.');
      return;
    }
    if (!isValidWhatsappInput(formState.whatsapp)) {
      setNotification('Revisa el WhatsApp. Debe ir sin 0 ni 15.');
      return;
    }
    setLoading(true);

    const whatsappForForm = formState.whatsapp.replace(/\D/g, '');
    const addressLine = formState.betweenStreets.trim()
      ? `${formState.street.trim()} - ${formState.betweenStreets.trim()}`
      : formState.street.trim();
    const params = new URLSearchParams();
    params.set('entry.286442883', orderSummary);
    params.set('entry.1211347450', formState.name);
    params.set('entry.501094818', whatsappForForm);
    params.set('entry.394819614', addressLine);
    params.set('entry.183290493', formState.postalCode);
    params.set('entry.2081271241', formState.locality);
    params.set('entry.1440375758', formState.province);
    params.set('entry.17650825', 'A DOMICILIO');
    params.set('entry.comoabona', 'contrareembolso');
    params.set('entry.1756027935', formState.deliverySlot);
    params.set('entry.1209868979', typeof window !== 'undefined' ? window.location.href : BASE_PATH + '/index-contrareembolso.html');
    params.set('entry.1885018612', legacyOrderPayload.legacyDetails);
    params.set('entry.1715320252', String(total));
    params.set('entry.736134777', String(legacyOrderPayload.pairCostTotal));
    params.set('entry.227154461', '');
    params.set('entry.1620487876', 'Pendiente');
    params.set('website', '');
    params.set('fvv', '1');
    params.set('fbzx', '5661184097173102736');
    params.set('pageHistory', '0');

    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', { currency: 'ARS', value: total, num_items: cart.length, content_type: 'product' });
      }
      await postOrderThroughHiddenForm(ORDER_WEBHOOK_URL, params);

      window.localStorage.setItem('orderDetails', orderDetails);
      window.localStorage.setItem('rawProducts', orderSummary);
      window.localStorage.setItem('customerName', formState.name);
      window.localStorage.setItem('rosita.whatsapp.prefill', formState.whatsapp);

      const route = getThankYouRoute(cart.length);
      window.location.assign(`${BASE_PATH}${route}.html?286442883=${encodeURIComponent(orderSummary)}`);
    } catch {
      setNotification('Hubo un problema al enviar el pedido. Intenta nuevamente.');
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
              deliveryLabel={featuredDeliveryLabel}
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
            <strong>{cartPhase === 'bundle' ? '2 pares por $110.000' : 'Suma otro par'}</strong>
            <p>
              {cartPhase === 'empty'
                ? 'Agrega un par para empezar tu pedido.'
                : cartPhase === 'single'
                  ? 'Puedes sumar el segundo del mismo modelo o de otro, con cualquier talle.'
                  : 'Tu pedido ya quedo con el precio promo final y envio gratis.'}
            </p>
          </div>

          {cartExpanded ? (
            <div className="cart-items independent-lines">
              {cartEntries.length ? cartEntries.map((item, index) => {
                const thumb = item.product?.images?.[0];
                return (
                  <article key={item.id} className="cart-item detailed-cart-item independent-item">
                    <div className="cart-item-media">
                      {thumb ? <img src={thumb} alt={item.product?.displayName || item.productId} width="68" height="68" loading="lazy" decoding="async" className="cart-item-thumb" /> : null}
                    </div>
                    <div className="cart-item-copy">
                      <strong>{item.product?.displayName || item.productId}</strong>
                      <p>Talle {item.size}</p>
                      <small>Par {index + 1} del pedido</small>
                    </div>
                    <div className="cart-item-actions compact-actions">
                      <button type="button" className="cart-remove-link" onClick={() => removeItem(item.id)}>Quitar</button>
                    </div>
                  </article>
                );
              }) : <p className="empty-copy">Todavia no agregaste pares.</p>}
            </div>
          ) : null}

          <div className="cart-total-box highlighted-box">
            <span>Total a pagar al recibir</span>
            <strong>{formatCurrency(total)}</strong>
            <small>
              {cartPhase === 'empty'
                ? 'Agrega un par para ver el total final.'
                : cartPhase === 'single'
                  ? '1 par: $70.000. Suma otro y activas la promo de $110.000.'
                  : '2 pares promo: $110.000 con envio gratis.'}
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
            <input type="hidden" name="entry.comoabona" value="contrareembolso" readOnly />
            <input type="hidden" name="entry.17650825" value="A DOMICILIO" readOnly />

            <fieldset className="checkout-fieldset">
              <legend>Resumen de tu pedido</legend>
              <label>
                Modelos y talles seleccionados
                <input value={orderDetails} readOnly placeholder="Aqui veras tu seleccion" />
              </label>
            </fieldset>

            <fieldset className="checkout-fieldset">
              <legend>Informacion de contacto</legend>
              <div className="field-grid">
                <label>
                  Nombre y apellido
                  <input value={formState.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Quien recibe el pedido" required />
                </label>
                <label>
                  WhatsApp
                  <input value={formState.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} placeholder="Ej: 1156457057 (sin 0 ni 15)" required />
                  <small>{isValidWhatsappInput(formState.whatsapp) || !formState.whatsapp ? 'Fundamental para coordinar el envio si es necesario.' : 'Formato invalido.'}</small>
                </label>
              </div>
            </fieldset>

            <fieldset className="checkout-fieldset">
              <legend>Direccion de envio</legend>
              <p className="fieldset-copy">Asegurate que sea correcta para recibir tu paquete sin problemas.</p>
              <label>
                Calle y numero (Piso/Dpto)
                <input value={formState.street} onChange={(event) => updateField('street', event.target.value)} placeholder="Ej: Av. Siempreviva 742, 3B" required />
              </label>
              <label>
                Entre calles
                <input value={formState.betweenStreets} onChange={(event) => updateField('betweenStreets', event.target.value)} placeholder="Ej: Entre Av. Corrientes y Lavalle" required />
              </label>
              <div className="field-grid triple">
                <label>
                  Codigo postal
                  <input value={formState.postalCode} onChange={(event) => updateField('postalCode', event.target.value)} placeholder="Ej: 1425" required />
                </label>
                <label>
                  Localidad
                  <input value={formState.locality} onChange={(event) => updateField('locality', event.target.value)} placeholder="Ej: Palermo" required />
                </label>
                <label>
                  Provincia
                  <input value={formState.province} readOnly />
                </label>
              </div>
            </fieldset>

            <fieldset className="checkout-fieldset emphasis-fieldset">
              <legend>Contrareembolso</legend>
              <p className="fieldset-copy compact-legend-copy">Pagas solo en efectivo al recibir. Te confirmamos por WhatsApp antes del despacho.</p>
              <details className="checkout-detail-note">
                <summary>Ver condiciones del envio y pago</summary>
                <p className="fieldset-copy">{PAGE_COPY.deliveryLegend}</p>
              </details>
              <label>
                Dia y hora estimada para entregar
                <select value={formState.deliverySlot} onChange={(event) => updateField('deliverySlot', event.target.value)} required>
                  <option value="">Selecciona una opcion</option>
                  {deliveryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
            </fieldset>

            <div className="review-box original-review-style">
              <h3>Revisa tu pedido y datos</h3>
              <p><strong>Seleccion:</strong> {orderDetails || '-'}</p>
              <p><strong>Nombre:</strong> {formState.name || '-'}</p>
              <p><strong>WhatsApp:</strong> {formState.whatsapp || '-'}</p>
              <p><strong>Direccion:</strong> {[formState.street, formState.locality, formState.postalCode].filter(Boolean).join(', ') || '-'}</p>
              <p><strong>Dia y hora de entrega:</strong> {formState.deliverySlot || '-'}</p>
              <p className="review-total">Total: {formatCurrency(total)}</p>
              <details className="checkout-detail-note review-commitment-note">
                <summary>Importante antes de enviar</summary>
                <p className="review-warning">{PAGE_COPY.reviewCommitment}</p>
              </details>
              <p className="review-help">Recibe en: <strong>{featuredDeliveryLabel}</strong>. Te contactaremos para confirmar.</p>
            </div>

            <p className="checkout-reminder compact-reminder">{PAGE_COPY.freeShippingReminder}</p>
            <div className="submit-row aligned-row">
              <button type="submit" className="submit-button" disabled={!canCheckout || loading}>{loading ? 'Procesando...' : 'Comprar'}</button>
              <p>Vamos a confirmarte por WhatsApp antes del despacho.</p>
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
      <DeferredChatWidget
        hasCart={cartEntries.length > 0}
        cartOpen={mobileCartOpen}
        webhookUrl={CHAT_WEBHOOK_URL}
      />
    </>
  );
}






