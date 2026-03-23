'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  BASE_PATH,
  BRAND_LOGO_SRC,
  CHAT_WEBHOOK_URL,
  HIGHLIGHTS,
  ORDER_SCRIPT_URL,
  PRODUCTS,
  TESTIMONIALS,
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

function ProductGallery({ product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = product.images[activeIndex];

  return (
    <div className="gallery-card">
      <div className="gallery-frame">
        <Image src={activeImage} alt={product.displayName} fill sizes="(max-width: 768px) 100vw, 33vw" className="gallery-image" />
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
            <Image src={image} alt="" fill sizes="84px" className="gallery-thumb-image" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd, cartLocked }) {
  const [pairCount, setPairCount] = useState('1');
  const [sizes, setSizes] = useState(['35', '35']);

  return (
    <article className="product-card" id={`modelo-${product.id}`}>
      <ProductGallery product={product} />
      <div className="product-copy">
        <div className="product-badge">{product.heroLabel}</div>
        <h2>{product.displayName}</h2>
        <p>{product.description}</p>

        <div className="product-controls">
          <label>
            Cantidad de pares para este modelo
            <select value={pairCount} onChange={(event) => setPairCount(event.target.value)}>
              <option value="1">1 par</option>
              <option value="2">2 pares</option>
            </select>
          </label>

          <div className="size-grid">
            <label>
              Talle par 1
              <select value={sizes[0]} onChange={(event) => setSizes([event.target.value, sizes[1]])}>
                {product.sizes.map((size) => (
                  <option key={size.value} value={size.value}>{size.label}</option>
                ))}
              </select>
            </label>
            {pairCount === '2' ? (
              <label>
                Talle par 2
                <select value={sizes[1]} onChange={(event) => setSizes([sizes[0], event.target.value])}>
                  {product.sizes.map((size) => (
                    <option key={size.value} value={size.value}>{size.label}</option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          className="add-button"
          disabled={cartLocked}
          onClick={() => {
            const nextItems = pairCount === '2'
              ? [sizes[0], sizes[1]].map((size) => ({ productId: product.id, size }))
              : [{ productId: product.id, size: sizes[0] }];
            onAdd(nextItems);
          }}
        >
          {cartLocked ? 'Carrito completo' : 'Agregar al carrito'}
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
      <button type="button" className="chat-toggle" onClick={() => setOpen((value) => !value)}>
        {open ? 'Cerrar ayuda' : 'Necesito ayuda'}
      </button>
      {open ? (
        <div className="chat-panel">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={`${message.from}-${index}`} className={`chat-message chat-${message.from}`}>{message.text}</div>
            ))}
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

function ThankYouStrip() {
  return (
    <div className="benefits-strip compact">
      {HIGHLIGHTS.map((item) => <span key={item}>{item}</span>)}
    </div>
  );
}

export default function ContrareembolsoLanding() {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [pendingItems, setPendingItems] = useState([]);
  const [prefillWhatsapp, setPrefillWhatsapp] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    whatsapp: '',
    street: '',
    betweenStreets: '',
    postalCode: '',
    locality: '',
    province: 'Buenos Aires',
    deliverySlot: '',
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
  const total = calculateCartTotal(cart.length);
  const orderSummary = useMemo(() => buildOrderSummary(cart), [cart]);
  const orderDetails = useMemo(() => formatOrderDetails(cart, PRODUCTS), [cart]);
  const canCheckout = cart.length > 0;

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

  function handleAdd(items) {
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
    setNotification(cart.length === 0 ? 'Primer par agregado. Si quieres, suma uno mas para activar la promo.' : 'Promo de 2 pares activada. Completa tus datos para cerrar el pedido.');
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
    setNotification('WhatsApp guardado. Ya puedes seguir con tu pedido.');
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
        window.fbq('track', 'InitiateCheckout', {
          currency: 'ARS',
          value: total,
          num_items: cart.length,
          content_type: 'product',
        });
      }

      const response = await fetch(ORDER_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error('No se pudo guardar el pedido');
      }

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
      <ThankYouStrip />
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Embudo 2026 en Next.js</span>
          <h1>Rosita Rococo contrareembolso, rehecho para exportacion estatica.</h1>
          <p>
            Tome el flujo actual de la raiz y lo rehice con una estructura moderna: carrito nativo, formulario integrado,
            componentes reutilizables y salida lista para GitHub Pages dentro de <strong>/2026</strong>.
          </p>
          <div className="hero-pricing">
            <div>
              <strong>1 par</strong>
              <span>$55.000</span>
            </div>
            <div>
              <strong>2 pares</strong>
              <span>$85.000</span>
            </div>
          </div>
          <div className="hero-cta-row">
            <a href="#productos" className="primary-link">Ver modelos</a>
            <a href="#checkout" className="secondary-link">Ir al formulario</a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="brand-lockup">
            <Image src={BRAND_LOGO_SRC} alt="Rosita Rococo" width={320} height={108} priority />
          </div>
          <ul className="hero-list">
            {HIGHLIGHTS.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="trust-grid">
        {TRUST_POINTS.map((point) => (
          <article key={point.title} className="trust-card">
            <h2>{point.title}</h2>
            <p>{point.body}</p>
          </article>
        ))}
      </section>

      <section id="productos" className="products-section">
        <div className="section-heading">
          <span>Modelos activos del embudo</span>
          <h2>Portados desde la raiz actual y estilizados con la base visual que ya habias empezado en Astro.</h2>
        </div>
        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={handleAdd} cartLocked={cart.length >= 2} />
          ))}
        </div>
      </section>

      <section className="checkout-layout">
        <aside className="cart-panel">
          <div className="cart-header">
            <span>Tu pedido</span>
            <strong>{cart.length} / 2 pares</strong>
          </div>
          <div className="cart-items">
            {cart.length ? cart.map((item) => {
              const product = PRODUCTS.find((entry) => entry.id === item.productId);
              return (
                <article key={item.id} className="cart-item">
                  <div>
                    <strong>{product?.displayName || item.productId}</strong>
                    <p>Talle {item.size}</p>
                  </div>
                  <button type="button" onClick={() => removeItem(item.id)}>Quitar</button>
                </article>
              );
            }) : <p className="empty-copy">Aun no agregaste pares. Selecciona modelos y talles para ver el resumen.</p>}
          </div>
          <div className="cart-total-box">
            <span>Total contrareembolso</span>
            <strong>${total.toLocaleString('es-AR')}</strong>
            <small>{cart.length === 1 ? 'Agrega otro par si quieres activar la promo de 2 por $85.000.' : 'El total final se abona en efectivo al recibir.'}</small>
          </div>
        </aside>

        <section id="checkout" className="checkout-panel">
          <div className="section-heading left">
            <span>Checkout activo</span>
            <h2>El formulario conserva los mismos campos y nombres que el flujo original.</h2>
          </div>
          <form className="checkout-form" onSubmit={submitOrder}>
            <input type="hidden" name="entry.286442883" value={orderSummary} readOnly />
            <input type="hidden" name="entry.comoabona" value="contrareembolso" readOnly />
            <input type="hidden" name="entry.17650825" value="A DOMICILIO" readOnly />
            <label>
              Modelos y talles seleccionados
              <input value={orderSummary} readOnly placeholder="Aqui veras tu seleccion" />
            </label>
            <div className="field-grid">
              <label>
                Nombre y apellido
                <input value={formState.name} onChange={(event) => updateField('name', event.target.value)} required />
              </label>
              <label>
                WhatsApp
                <input value={formState.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} placeholder="1156457057" required />
                <small>{isValidWhatsappInput(formState.whatsapp) || !formState.whatsapp ? 'Sin 0 ni 15. Lo usamos para confirmar el envio.' : 'Formato invalido.'}</small>
              </label>
            </div>
            <label>
              Calle y numero (piso/depto)
              <input value={formState.street} onChange={(event) => updateField('street', event.target.value)} required />
            </label>
            <label>
              Entre calles
              <input value={formState.betweenStreets} onChange={(event) => updateField('betweenStreets', event.target.value)} required />
            </label>
            <div className="field-grid triple">
              <label>
                Codigo postal
                <input value={formState.postalCode} onChange={(event) => updateField('postalCode', event.target.value)} required />
              </label>
              <label>
                Localidad
                <input value={formState.locality} onChange={(event) => updateField('locality', event.target.value)} required />
              </label>
              <label>
                Provincia
                <input value={formState.province} readOnly />
              </label>
            </div>
            <label>
              Dia y hora estimada de entrega
              <select value={formState.deliverySlot} onChange={(event) => updateField('deliverySlot', event.target.value)} required>
                <option value="">Selecciona una opcion</option>
                {deliveryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <div className="review-box">
              <h3>Revision antes de confirmar</h3>
              <p><strong>Pedido:</strong> {orderDetails || '-'}</p>
              <p><strong>Nombre:</strong> {formState.name || '-'}</p>
              <p><strong>WhatsApp:</strong> {formState.whatsapp || '-'}</p>
              <p><strong>Direccion:</strong> {[formState.street, formState.locality, formState.postalCode].filter(Boolean).join(', ') || '-'}</p>
              <p><strong>Entrega:</strong> {formState.deliverySlot || '-'}</p>
              <p className="review-total">Total a pagar al recibir: ${total.toLocaleString('es-AR')}</p>
            </div>
            <div className="submit-row">
              <button type="submit" className="submit-button" disabled={!canCheckout || loading}>{loading ? 'Procesando...' : 'Comprar'}</button>
              <p>Solo para CABA y GBA. El pedido se confirma por WhatsApp antes del despacho.</p>
            </div>
          </form>
        </section>
      </section>

      <section className="testimonials-strip">
        {TESTIMONIALS.map((item) => (
          <blockquote key={item}>{item}</blockquote>
        ))}
      </section>

      {notification ? <div className="notification-toast">{notification}</div> : null}
      {showWhatsappModal ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h2>Antes de agregar el primer par</h2>
            <p>Guardamos tu WhatsApp para que el checkout ya salga precargado y el equipo pueda confirmar el envio.</p>
            <form onSubmit={confirmWhatsappAndContinue}>
              <input value={prefillWhatsapp} onChange={(event) => setPrefillWhatsapp(event.target.value)} placeholder="1156457057" />
              <div className="modal-actions">
                <button type="button" className="ghost-button" onClick={() => setShowWhatsappModal(false)}>Cerrar</button>
                <button type="submit" className="submit-button">Guardar y seguir</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <ChatWidget />
    </main>
  );
}