'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  BASE_PATH,
  BRAND_LOGO_SRC,
  CHAT_WEBHOOK_URL,
  CHECKOUT_STEPS,
  HIGHLIGHTS,
  ORDER_SCRIPT_URL,
  PAGE_COPY,
  PRODUCTS,
  PROGRESS_STEPS,
  TESTIMONIAL_IMAGES,
  TRUST_POINTS,
} from '@/src/lib/funnel-data';
import {
  buildOrderSummary,
  calculateCartTotal,
  formatOrderDetails,
  getDeliveryOptions,
  getThankYouRoute,
  isValidWhatsappInput,
} from '@/src/lib/funnel-utils';

const formatCurrency = (value) => `$${value.toLocaleString('es-AR')}`;

function groupCartItems(cart, products) {
  const grouped = new Map();

  cart.forEach((item) => {
    const key = `${item.productId}-${item.size}`;
    const current = grouped.get(key);
    if (current) {
      current.quantity += 1;
      current.ids.push(item.id);
      return;
    }

    const product = products.find((entry) => entry.id === item.productId);
    grouped.set(key, {
      key,
      productId: item.productId,
      size: item.size,
      quantity: 1,
      ids: [item.id],
      product,
    });
  });

  return Array.from(grouped.values());
}

function ProductGallery({ product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = product.images[activeIndex];

  return (
    <div className="gallery-card">
      <div className="gallery-frame">
        <Image
          src={activeImage}
          alt={product.displayName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
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
            <Image src={image} alt="" fill sizes="72px" className="gallery-thumb-image" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd, cartLocked, deliveryLabel }) {
  const [pairCount, setPairCount] = useState('1');
  const [sizes, setSizes] = useState(['', '']);
  const bundleIntent = pairCount === '2';
  const selectedCount = 1;
  const selectedSizes = [sizes[0]].filter(Boolean);

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

      <ProductGallery product={product} />

      <div className="product-copy">
        <div className="spec-row">
          {product.specs.map((spec) => (
            <span key={spec.label} className="spec-pill"><strong>{spec.label}:</strong> {spec.value}</span>
          ))}
        </div>
        <p className="product-description-copy">{product.description}</p>

        <div className="price-card">
          <p className="quantity-selector-label">Selecciona la cantidad:</p>
          <div className="price-options">
            <label className={`price-option ${pairCount === '1' ? 'selected' : ''}`}>
              <input type="radio" name={`qty-${product.id}`} value="1" checked={pairCount === '1'} onChange={() => setPairCount('1')} />
              <div>
                <strong>1 par</strong>
                <span>{product.unitPriceLabel}</span>
                <small>Precio final por un solo par</small>
              </div>
            </label>
            <label className={`price-option featured-bundle ${pairCount === '2' ? 'selected' : ''}`}>
              <input type="radio" name={`qty-${product.id}`} value="2" checked={pairCount === '2'} onChange={() => setPairCount('2')} />
              <div>
                <strong>2 pares</strong>
                <span>{product.bundlePriceLabel}</span>
                <small>{`${product.savingsLabel} y envio gratis`}</small>
              </div>
            </label>
          </div>
          <div className="promo-explanation-box">
            <p>Puedes combinar cualquier modelo dentro de la promo.</p>
            <p><span>ENVIO GRATIS</span> Recibes tu pedido: <strong>{deliveryLabel}</strong></p>
            <p><span>PAGO</span> Contrareembolso en efectivo al recibir</p>
          </div>
        </div>

        <div className="size-selector-block">
          <label>
            Talle par 1
            <select value={sizes[0]} onChange={(event) => setSizes([event.target.value, sizes[1]])}>
              <option value="">-- Selecciona Talle Par 1 --</option>
              {product.sizes.map((size) => (
                <option key={size.value} value={size.value}>{size.label}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="selection-hint">
          {bundleIntent
            ? selectedSizes.length
              ? `Primer par listo: talle ${selectedSizes[0]}. Luego eliges el segundo en cualquier otro modelo.`
              : 'Elige el talle de este primer par. El segundo lo sumas en cualquier otro modelo.'
            : selectedSizes.length
              ? `Seleccion actual: talle ${selectedSizes[0]}`
              : 'Selecciona el talle para habilitar una compra mas rapida.'}
        </p>

        <details className="size-guide-disclosure"><summary>Ver guia de talles</summary><div className="size-table-card">
          <div className="size-table-header">
            <strong>Guia de talles</strong>
            <span>Plantilla aproximada en cm</span>
          </div>
          <div className="size-table-grid" role="table" aria-label={`Guia de talles de ${product.displayName}`}>
            {product.sizes.map((size) => (
              <div key={size.value} className="size-table-row" role="row">
                <span role="cell">Talle {size.value}</span>
                <strong role="cell">{size.label.replace(`${size.value} `, '')}</strong>
              </div>
            ))}
          </div>
        </div>

        </details>
        <button
          type="button"
          className="add-button"
          disabled={cartLocked}
          onClick={() => {
            const nextItems = sizes[0] ? [{ productId: product.id, size: sizes[0] }] : [];
            onAdd(nextItems, selectedCount, bundleIntent);
          }}
        >
          {cartLocked ? 'Carrito completo' : bundleIntent ? 'Agregar este par y elegir el segundo' : 'Agregar 1 par al carrito'}
        </button>
      </div>
    </article>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hola, soy Rosita. Si quieres, te ayudo con talles o con la promo de contrareembolso.' }]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);

  async function sendMessage(event) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || sending) return;

    setMessages((current) => [...current, { from: 'user', text: trimmed }]);
    setDraft('');
    setSending(true);

    try {
      const response = await fetch(CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, source: 'next-2026-contrareembolso', page: typeof window !== 'undefined' ? window.location.href : '' }),
      });

      const text = await response.text();
      let reply = 'Gracias, ya recibimos tu consulta. En unos instantes te respondemos por este chat.';
      try {
        const data = JSON.parse(text);
        reply = data.reply || data.message || data.output || reply;
      } catch {
        if (text.trim()) reply = text.trim();
      }
      setMessages((current) => [...current, { from: 'bot', text: reply }]);
    } catch {
      setMessages((current) => [...current, { from: 'bot', text: 'No pude conectar con el asistente ahora. Puedes continuar la compra y te confirmamos por WhatsApp.' }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={`chat-shell ${open ? 'is-open' : ''}`}>
      <button type="button" className={`chat-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen((value) => !value)}>
        <span className="chat-toggle-dot" aria-hidden="true" />
        {open ? 'Cerrar' : 'Ayuda'}
      </button>
      {open ? (
        <div className="chat-panel">
          <div className="chat-messages">
            {messages.map((message, index) => <div key={`${message.from}-${index}`} className={`chat-message chat-${message.from}`}>{message.text}</div>)}
          </div>
          <form className="chat-form" onSubmit={sendMessage}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Escribe tu consulta..." />
            <button type="submit" disabled={sending}>{sending ? 'Enviando...' : 'Enviar'}</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default function ContrareembolsoLanding() {
  const [cart, setCart] = useState([]);
  const [cartExpanded, setCartExpanded] = useState(true);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [pendingItems, setPendingItems] = useState([]);
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
    const timeout = window.setTimeout(() => setNotification(''), 2800);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  const deliveryOptions = useMemo(() => getDeliveryOptions(new Date()), []);
  const featuredDeliveryLabel = deliveryOptions[0] || 'Proxima ventana disponible';
  const total = calculateCartTotal(cart.length);
  const groupedCart = useMemo(() => groupCartItems(cart, PRODUCTS), [cart]);
  const orderSummary = useMemo(() => buildOrderSummary(cart), [cart]);
  const orderDetails = useMemo(() => formatOrderDetails(cart, PRODUCTS), [cart]);
  const canCheckout = cart.length > 0;
  const activeCheckoutStep = cart.length ? 2 : 1;

  function updateField(field, value) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function pushItems(items) {
    setCart((current) => {
      const next = [...current];
      for (const item of items) {
        if (next.length >= 2) break;
        next.push({ ...item, id: `${item.productId}-${item.size}-${Date.now()}-${Math.random()}` });
      }
      return next;
    });
  }

  function handleAdd(items, requestedCount, bundleIntent = false) {
    if (!items.length || items.length !== requestedCount) {
      setNotification('Selecciona los talles antes de agregar el producto al carrito.');
      return;
    }
    if (cart.length >= 2) {
      setNotification('Ya tienes 2 pares en el carrito. Completa el pedido o elimina uno para cambiarlo.');
      return;
    }
    if (cart.length + items.length > 2) {
      setNotification('El embudo actual solo permite hasta 2 pares por pedido.');
      return;
    }
    const savedWhatsapp = formState.whatsapp || prefillWhatsapp;
    if (!savedWhatsapp) {
      setPendingItems(items);
      setShowWhatsappModal(true);
      return;
    }
    pushItems(items);
    setCartExpanded(true);
    setNotification(
      bundleIntent && cart.length === 0
        ? 'Primer par agregado. Ahora elige el segundo en cualquier otro modelo para activar la promo de 2 pares.'
        : cart.length === 0
          ? 'Primer par agregado. Si quieres, suma uno mas para activar la promo.'
          : 'Promo de 2 pares activada. Completa tus datos para cerrar el pedido.',
    );
  }

  function confirmWhatsappAndContinue(event) {
    event.preventDefault();
    if (!isValidWhatsappInput(prefillWhatsapp)) {
      setNotification('Ingresa un WhatsApp valido para continuar.');
      return;
    }
    window.localStorage.setItem('rosita.whatsapp.prefill', prefillWhatsapp);
    setFormState((current) => ({ ...current, whatsapp: current.whatsapp || prefillWhatsapp }));
    pushItems(pendingItems);
    setPendingItems([]);
    setShowWhatsappModal(false);
    setCartExpanded(true);
    setNotification('WhatsApp guardado. Ya puedes seguir con tu pedido.');
  }

  function removeItem(itemId) {
    setCart((current) => current.filter((item) => item.id !== itemId));
  }

  function incrementGroupedItem(group) {
    if (cart.length >= 2) {
      setNotification('Ya alcanzaste el maximo de 2 pares para esta promo.');
      return;
    }
    setCart((current) => [
      ...current,
      { productId: group.productId, size: group.size, id: `${group.productId}-${group.size}-${Date.now()}-${Math.random()}` },
    ]);
  }

  function decrementGroupedItem(group) {
    const lastId = group.ids[group.ids.length - 1];
    if (lastId) removeItem(lastId);
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
    const params = new URLSearchParams();
    params.set('entry.286442883', orderSummary);
    params.set('entry.1211347450', formState.name);
    params.set('entry.501094818', whatsappForForm);
    params.set('entry.394819614', formState.street);
    params.set('entry.entreCalles', formState.betweenStreets);
    params.set('entry.183290493', formState.postalCode);
    params.set('entry.2081271241', formState.locality);
    params.set('entry.1440375758', formState.province);
    params.set('entry.17650825', 'A DOMICILIO');
    params.set('entry.comoabona', 'contrareembolso');
    params.set('entry.1756027935', formState.deliverySlot);
    params.set('entry.1209868979', typeof window !== 'undefined' ? window.location.href : `${BASE_PATH}/index-contrareembolso.html`);

    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', { currency: 'ARS', value: total, num_items: cart.length, content_type: 'product' });
      }
      const response = await fetch(ORDER_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: params.toString(),
      });
      if (!response.ok) throw new Error('No se pudo guardar el pedido');

      window.localStorage.setItem('orderDetails', orderDetails);
      window.localStorage.setItem('rawProducts', orderSummary);
      window.localStorage.setItem('customerName', formState.name);

      const route = getThankYouRoute(cart.length);
      window.location.assign(`${BASE_PATH}${route}.html?286442883=${encodeURIComponent(orderSummary)}`);
    } catch {
      setNotification('Hubo un problema al enviar el pedido. Intenta nuevamente.');
      setLoading(false);
    }
  }

  return (
    <main className="landing-shell">
      <div className="benefits-strip">{HIGHLIGHTS.map((item) => <span key={item}>{item}</span>)}</div>

      <div className="progress-rail">
        {PROGRESS_STEPS.map((step, index) => (
          <div key={step} className={`progress-node ${index === 0 ? 'active' : ''}`}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>

      <section className="hero-header-card">
        <div className="brand-lockup large">
          <Image src={BRAND_LOGO_SRC} alt="Rosita Rococo" width={320} height={108} priority className="brand-logo-image" />
        </div>
        <div className="hero-heading-copy">
          <h1>{PAGE_COPY.season} <span>{PAGE_COPY.paymentRibbon}</span></h1>
          <p className="hero-promo-copy">{PAGE_COPY.promoLine}</p>
        </div>
      </section>

      <section className="trust-grid refined">
        {TRUST_POINTS.map((point) => (
          <article key={point.title} className="trust-card soft">
            <h2>{point.title}</h2>
            <p>{point.body}</p>
          </article>
        ))}
      </section>

      <section id="productos" className="products-section">
        <div className="products-grid refined-grid">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={handleAdd} cartLocked={cart.length >= 2} deliveryLabel={featuredDeliveryLabel} />
          ))}
        </div>
        <div className="shopping-instructions-bar"><p>{PAGE_COPY.shoppingInstruction}</p></div>
      </section>

      <section className="testimonials-section-next">
        <div className="section-heading left compact-heading">
          <span>Prueba social</span>
          <h2>{PAGE_COPY.testimonialsTitle}</h2>
        </div>
        <div className="testimonial-grid-images">
          {TESTIMONIAL_IMAGES.map((item, index) => (
            <figure key={item.src} className="testimonial-shot">
              <Image
                src={item.src}
                alt={item.alt}
                width={420}
                height={720}
                priority={index < 2}
                sizes="(max-width: 768px) 62vw, 20vw"
                className="testimonial-image"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="checkout-layout editorial-layout">
        <aside className="cart-panel editorial-cart">
          <div className="cart-header">
            <div>
              <span>Resumen de tu pedido</span>
              <strong>{cart.length === 2 ? 'Promo 2 pares activa' : 'Resumen rapido del pedido'}</strong>
            </div>
            <button type="button" className="cart-expand-button" onClick={() => setCartExpanded((value) => !value)}>
              {cartExpanded ? 'Ocultar' : 'Ver carrito'} ({cart.length}/2)
            </button>
          </div>
          <div className="cart-offer-banner">
            <span>{cart.length >= 2 ? 'Promo aplicada' : 'Total promo si llevas 2 pares'}</span>
            <strong>2 pares por $110.000</strong>
            <p>{cart.length >= 2 ? 'Tu carrito ya tomo el precio promocional final con envio gratis.' : 'Combina cualquier modelo y pagas $55.000 por par con envio gratis.'}</p>
          </div>
          {cartExpanded ? (
            <div className="cart-items">
              {groupedCart.length ? groupedCart.map((group) => {
                const product = group.product;
                const thumb = product?.images?.[0];
                return (
                  <article key={group.key} className="cart-item detailed-cart-item">
                    <div className="cart-item-media">
                      {thumb ? <Image src={thumb} alt={product?.displayName || group.productId} width={68} height={68} className="cart-item-thumb" /> : null}
                    </div>
                    <div className="cart-item-copy">
                      <strong>{product?.displayName || group.productId}</strong>
                      <p>Talle {group.size}</p>
                      <small>{group.quantity === 2 ? '2 pares de este modelo/talle' : '1 par agregado'}</small>
                    </div>
                    <div className="cart-item-actions">
                      <div className="qty-stepper">
                        <button type="button" aria-label="Quitar un par" onClick={() => decrementGroupedItem(group)}>-</button>
                        <span>{group.quantity}</span>
                        <button type="button" aria-label="Agregar un par" onClick={() => incrementGroupedItem(group)} disabled={cart.length >= 2}>+</button>
                      </div>
                      <button type="button" className="cart-remove-link" onClick={() => group.ids.forEach((id) => removeItem(id))}>Quitar</button>
                    </div>
                  </article>
                );
              }) : <p className="empty-copy">Agrega productos para ver aqui el detalle del pedido, con foto, talle y total actualizado.</p>}
            </div>
          ) : null}
          <div className="cart-total-box highlighted-box">
            <span>Total a pagar al recibir</span>
            <strong>{formatCurrency(total)}</strong>
            <small>{cart.length === 1 ? `1 par: ${formatCurrency(total)}` : cart.length === 2 ? `2 pares promo: ${formatCurrency(total)}` : 'Agrega un par para ver el total final.'}</small>
          </div>
          {canCheckout ? <a href="#checkout-form" className="floating-inline-link">Ir a completar datos</a> : null}
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
                <input value={orderSummary} readOnly placeholder="Aqui veras tu seleccion" />
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
              <p className="fieldset-copy">{PAGE_COPY.deliveryLegend}</p>
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
              <p className="review-warning">{PAGE_COPY.reviewCommitment}</p>
              <p className="review-help">Recibe en: <strong>{featuredDeliveryLabel}</strong>. Te contactaremos para confirmar.</p>
            </div>

            <p className="checkout-reminder">{PAGE_COPY.freeShippingReminder}</p>
            <div className="submit-row aligned-row">
              <button type="submit" className="submit-button" disabled={!canCheckout || loading}>{loading ? 'Procesando...' : 'Comprar'}</button>
              <p>Vamos a confirmarte por WhatsApp antes del despacho.</p>
            </div>
          </form>
        </section>
      </section>

      {notification ? <div className="notification-toast">{notification}</div> : null}

      {showWhatsappModal ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <span className="modal-eyebrow">Paso rapido</span>
            <h2>Guarda tu WhatsApp y sigue</h2>
            <p>Lo usamos para dejar el checkout precargado y para confirmar el envio antes de despachar tu pedido.</p>
            <form onSubmit={confirmWhatsappAndContinue}>
              <input value={prefillWhatsapp} onChange={(event) => setPrefillWhatsapp(event.target.value)} placeholder="1156457057" />
              <small className="modal-help">Escribelo sin 0 ni 15. Luego agregamos el par directo al carrito.</small>
              <div className="modal-actions">
                <button type="submit" className="submit-button">Guardar WhatsApp y agregar</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {canCheckout ? <a href="#checkout-form" className="floating-checkout-cta">Completar pedido ({cart.length})</a> : null}
      <ChatWidget />
    </main>
  );
}
