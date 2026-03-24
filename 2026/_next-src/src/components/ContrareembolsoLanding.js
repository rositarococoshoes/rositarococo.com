'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  BASE_PATH,
  BRAND_LOGO_SRC,
  CHAT_WEBHOOK_URL,
  CHECKOUT_STEPS,
  HIGHLIGHTS,
  ORDER_WEBHOOK_URL,
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
  getCartHeadline,
  getCartPhase,
  getDeliveryOptions,
  getPostAddMessage,
  getThankYouRoute,
  isValidWhatsappInput,
} from '@/src/lib/funnel-utils';

const formatCurrency = (value) => `$${value.toLocaleString('es-AR')}`;

function postOrderThroughHiddenForm(params) {
  if (typeof document === 'undefined') throw new Error('No document available for order submission');

  return new Promise((resolve) => {
    const frameName = `rosita-order-${Date.now()}`;
    const iframe = document.createElement('iframe');
    const cleanup = () => {
      form.remove();
      iframe.remove();
    };
    const finalize = () => {
      window.clearTimeout(timeoutId);
      cleanup();
      resolve();
    };

    iframe.name = frameName;
    iframe.title = 'order-submit-frame';
    iframe.hidden = true;
    iframe.addEventListener('load', finalize, { once: true });

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = ORDER_WEBHOOK_URL;
    form.target = frameName;
    form.hidden = true;

    const entries = new URLSearchParams(params.toString());
    entries.set('entry.1885018612', params.get('entry.286442883') || '');
    entries.set('fvv', '1');
    entries.set('fbzx', '5661184097173102736');
    entries.set('pageHistory', '0');

    entries.forEach((value, key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    const timeoutId = window.setTimeout(finalize, 6000);
    form.submit();
  });
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

      <ProductGallery product={product} />

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

function ChatWidget({ hasCart = false, cartOpen = false }) {
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
    <div className={`chat-shell ${open ? 'is-open' : ''} ${hasCart ? 'has-cart' : ''} ${cartOpen ? 'cart-open' : ''}`}>
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
                <Image
                  key={item.id}
                  src={thumb}
                  alt={item.product?.displayName || item.productId}
                  width={32}
                  height={40}
                  className={`mobile-cart-thumb paired-thumb paired-thumb-${index}`}
                />
              );
            }) : latestThumb ? <Image src={latestThumb} alt={latestItem.product?.displayName || latestItem.productId} width={52} height={52} className="mobile-cart-thumb" /> : null}
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
                  {thumb ? <Image src={thumb} alt={item.product?.displayName || item.productId} width={48} height={48} className="mobile-cart-thumb" /> : null}
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

export default function ContrareembolsoLanding() {
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
      await postOrderThroughHiddenForm(params);

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
      </section>

      <section className="testimonials-section-next">
        <div className="section-heading left compact-heading">
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
                      {thumb ? <Image src={thumb} alt={item.product?.displayName || item.productId} width={68} height={68} className="cart-item-thumb" /> : null}
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
      <ChatWidget hasCart={cartEntries.length > 0} cartOpen={mobileCartOpen} />
    </main>
  );
}






