'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BASE_PATH,
  BRAND_LOGO_SRC,
  CHAT_WEBHOOK_URL,
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

const SINGLE_PRICE = 70000;
const BUNDLE_PRICE = 110000;

const formatCurrency = (value) => `$${value.toLocaleString('es-AR')}`;

function parseDeliveryOption(option) {
  // Formato esperado: "Jueves 26 de junio de 15hs a 22hs"
  const match = option.match(/^(.+?)\s+de\s+(\d+)hs\s+a\s+(\d+)hs$/);
  if (!match) return { date: option, time: '' };
  return {
    date: match[1].trim(),
    time: `${match[2]} a ${match[3]} hs`,
  };
}

function plantillaFromLabel(label) {
  // "39 (25,5 cm de plantilla)" → "25,5 cm de plantilla"
  const match = label.match(/\((.+)\)/);
  return match ? match[1] : '';
}

function V2SizeSelect({ value, onChange, options, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function handleClickOutside(event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open]);

  const selected = options.find((entry) => entry.value === value);

  return (
    <div className="v2-size-select-wrap" ref={wrapRef}>
      <button
        type="button"
        className="v2-size-select"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        <span className="v2-size-select-label">
          {selected ? `Talle ${selected.value}` : 'Elegí tu talle'}
        </span>
        <span className="v2-size-select-arrow" aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>
      {open ? (
        <ul className="v2-size-options" role="listbox">
          {options.map((entry) => (
            <li key={entry.value} role="option" aria-selected={value === entry.value}>
              <button
                type="button"
                className={`v2-size-option${value === entry.value ? ' is-selected' : ''}`}
                onClick={() => {
                  onChange(entry.value);
                  setOpen(false);
                }}
              >
                <span className="v2-size-option-num">Talle {entry.value}</span>
                <span className="v2-size-option-dim">{plantillaFromLabel(entry.label)}</span>
                {value === entry.value ? <span className="v2-size-option-check" aria-hidden="true">✓</span> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

async function postOrderToWebhook(webhookUrl, params) {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString(),
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Webhook status ${response.status}`);
  }
  return response;
}

function V2ProductGallery({ product, priority = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = product.images[activeIndex];

  return (
    <div className="v2-gallery">
      <div className="v2-gallery-frame">
        <img
          src={activeImage}
          alt={product.displayName}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="v2-gallery-image"
        />
      </div>
      <div className="v2-thumbs">
        {product.images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={`v2-thumb ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ver foto ${index + 1} de ${product.displayName}`}
          >
            <img src={image} alt="" loading="lazy" decoding="async" className="v2-thumb-image" />
          </button>
        ))}
      </div>
    </div>
  );
}

function V2ProductCard({ product, onAdd, cartLocked, priority = false }) {
  const [size, setSize] = useState('');

  return (
    <article className="v2-product-card" id={`modelo-${product.id}`}>
      <h2 className="v2-product-title">{product.displayName}</h2>

      <V2ProductGallery product={product} priority={priority} />

      <div className="v2-product-actions">
        <V2SizeSelect
          value={size}
          onChange={setSize}
          options={product.sizes}
          ariaLabel={`Talle para ${product.displayName}`}
        />

        <button
          type="button"
          className="v2-add-button"
          disabled={cartLocked}
          onClick={() => onAdd(product, size)}
        >
          {cartLocked ? 'Pedido completo' : 'Agregar'}
        </button>
      </div>
    </article>
  );
}

function V2CartPanel({
  cartEntries,
  cartPhase,
  total,
  expanded,
  setExpanded,
  onRemove,
  onGoCheckout,
  onContinue,
  deliveryOptions,
  selectedSlot,
  onSelectSlot,
}) {
  return (
    <div className={`v2-cart-panel ${expanded ? 'is-open' : ''} ${cartEntries.length ? 'has-items' : ''}`}>
      <button
        type="button"
        className="v2-cart-toggle"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
      >
        <div className="v2-cart-row-top">
          <div className="v2-cart-context">
            <span className="v2-cart-tag v2-cart-tag-primary">Contrarreembolso</span>
            <span className="v2-cart-tag v2-cart-tag-accent">Envío gratis</span>
            <span className="v2-cart-context-text">Pagá al recibir sólo efectivo</span>
          </div>
          <span className="v2-cart-arrow" aria-hidden="true">{expanded ? '▾' : '▴'}</span>
        </div>
        <div className="v2-cart-row-bottom">
          <span className="v2-cart-price">
            <small>1 par</small>
            <strong>$70.000</strong>
          </span>
          <span className="v2-cart-divider" aria-hidden="true">·</span>
          <span className="v2-cart-price featured">
            <small>2 pares</small>
            <strong>$110.000</strong>
          </span>
        </div>
      </button>

      {expanded ? (
        <div className="v2-cart-body">
          <div className="v2-cart-body-head">
            <span className="v2-cart-body-title">Tu pedido</span>
            <button
              type="button"
              className="v2-cart-close"
              onClick={() => setExpanded(false)}
              aria-label="Cerrar carrito"
            >
              ✕ Cerrar
            </button>
          </div>

          {deliveryOptions.length ? (
            <div className="v2-cart-dates" role="group" aria-label="Elegí cuándo recibir">
              <span className="v2-cart-dates-label">¿Cuándo querés recibir?</span>
              <div className="v2-cart-dates-options">
                {deliveryOptions.map((option) => {
                  const { date, time } = parseDeliveryOption(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      className={`v2-cart-date-option${selectedSlot === option ? ' selected' : ''}`}
                      onClick={() => onSelectSlot(option)}
                      aria-pressed={selectedSlot === option}
                      aria-label={time ? `${date}, ${time}` : option}
                    >
                      <span className="v2-cart-date-day">{date}</span>
                      {time ? <span className="v2-cart-date-time">{time}</span> : null}
                      {selectedSlot === option ? <span className="v2-cart-date-check" aria-hidden="true">✓</span> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {cartEntries.length ? (
            <ul className="v2-cart-list">
              {cartEntries.map((item, index) => (
                <li key={item.id} className="v2-cart-row-item">
                  <div className="v2-cart-row-thumb">
                    {item.product?.images?.[0] ? (
                      <img src={item.product.images[0]} alt={item.product.displayName} width="36" height="36" loading="lazy" decoding="async" />
                    ) : null}
                  </div>
                  <div className="v2-cart-row-copy">
                    <strong>{item.product?.displayName || item.productId}</strong>
                    <span>Talle {item.size}</span>
                  </div>
                  <button type="button" className="v2-cart-row-remove" onClick={() => onRemove(item.id)} aria-label={`Quitar ${item.product?.displayName || 'par'}`}>
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="v2-cart-empty">Elegí un modelo arriba ↑</p>
          )}

          {cartEntries.length ? (
            <div className="v2-cart-total-box">
              <span className="v2-cart-total-box-label">Total al recibir</span>
              <strong className="v2-cart-total-box-amount">{formatCurrency(total)}</strong>
            </div>
          ) : null}

          <div className="v2-cart-actions">
            {cartEntries.length ? (
              <button type="button" className="v2-cart-primary" onClick={onGoCheckout}>
                {cartPhase === 'bundle' ? 'Finalizar pedido →' : 'Finalizar con este par →'}
              </button>
            ) : null}
            {cartPhase === 'single' ? (
              <button type="button" className="v2-cart-secondary v2-cart-promo" onClick={onContinue}>
                <span className="v2-cart-promo-title">+ Sumar otro par</span>
                <span className="v2-cart-promo-sub">2 pares por $110.000 más envío gratis</span>
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function V2CheckoutForm({ visible, formState, setFormState, deliveryOptions, deliveryLabel, orderDetails, total, loading, onSubmit, isValidWhatsappInput, cartEntries }) {
  if (!visible) return null;

  function updateField(field, value) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  const whatsappInvalid = formState.whatsapp && !isValidWhatsappInput(formState.whatsapp);

  return (
    <form className="v2-checkout-form" onSubmit={onSubmit}>
      <h2 className="v2-checkout-title">Tus datos</h2>

      <div className="v2-checkout-summary">
        <strong>Tu selección:</strong>
        <span>{orderDetails || '-'}</span>
      </div>

      <div className="v2-form-grid">
        <label className="v2-field">
          <span>Nombre y apellido</span>
          <input
            value={formState.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Quién recibe"
            required
          />
        </label>

        <label className="v2-field">
          <span>WhatsApp</span>
          <input
            value={formState.whatsapp}
            onChange={(event) => updateField('whatsapp', event.target.value)}
            placeholder="Ej: 1156457057"
            required
            inputMode="numeric"
          />
          <small className={whatsappInvalid ? 'v2-hint-error' : ''}>
            {whatsappInvalid ? 'Formato inválido (sin 0 ni 15).' : 'Sin 0 ni 15, te confirmamos por acá.'}
          </small>
        </label>
      </div>

      <label className="v2-field">
        <span>Calle y número (piso/dpto)</span>
        <input
          value={formState.street}
          onChange={(event) => updateField('street', event.target.value)}
          placeholder="Ej: Av. Siempreviva 742, 3B"
          required
        />
      </label>

      <label className="v2-field">
        <span>Entre calles</span>
        <input
          value={formState.betweenStreets}
          onChange={(event) => updateField('betweenStreets', event.target.value)}
          placeholder="Ej: Entre Corrientes y Lavalle"
          required
        />
      </label>

      <div className="v2-form-grid triple">
        <label className="v2-field">
          <span>Código postal</span>
          <input
            value={formState.postalCode}
            onChange={(event) => updateField('postalCode', event.target.value)}
            placeholder="1425"
            required
            inputMode="numeric"
          />
        </label>
        <label className="v2-field">
          <span>Localidad</span>
          <p className="v2-field-restriction">Sólo Capital Federal y Gran Buenos Aires</p>
          <input
            value={formState.locality}
            onChange={(event) => updateField('locality', event.target.value)}
            placeholder="Palermo"
            required
          />
        </label>
        <label className="v2-field">
          <span>Provincia</span>
          <input value={formState.province} readOnly />
        </label>
      </div>

      <div className="v2-delivery-block">
        <span className="v2-delivery-label">¿Cuándo querés recibir?</span>
        <div className="v2-delivery-options">
          {deliveryOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`v2-delivery-option${formState.deliverySlot === option ? ' selected' : ''}`}
              onClick={() => updateField('deliverySlot', option)}
            >
              {option}
              {formState.deliverySlot === option ? <span aria-hidden="true">✓</span> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="v2-order-recap">
        <h4>Resumen de tu pedido</h4>
        {cartEntries?.map((item, index) => (
          <div key={item.id} className="v2-order-line">
            <span className="v2-order-line-index">Par {index + 1}</span>
            <span className="v2-order-line-product">{item.product?.displayName || item.productId}</span>
            <span className="v2-order-line-size">Talle {item.size}</span>
          </div>
        ))}
        <div className="v2-order-line-total">
          <span>Total al recibir</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </div>

      <div className="v2-checkout-foot">
        <div className="v2-checkout-total">
          <span>Total al recibir</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
        <button type="submit" className="v2-checkout-submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Confirmar pedido'}
        </button>
        <p className="v2-checkout-fineprint">
          Pagás en efectivo al recibir. Te confirmamos por WhatsApp antes del despacho. Solo CABA y GBA.
        </p>
      </div>
    </form>
  );
}

export default function ContrareembolsoLandingV2() {
  const [cart, setCart] = useState([]);
  const [cartExpanded, setCartExpanded] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');
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
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('savedWhatsapp')
      || window.localStorage.getItem('rosita.whatsapp.prefill')
      || '';
    if (saved) {
      setFormState((current) => (current.whatsapp ? current : { ...current, whatsapp: saved }));
    }
  }, []);

  useEffect(() => {
    if (!notification) return undefined;
    const timeout = window.setTimeout(() => setNotification(''), 2600);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  const deliveryOptions = useMemo(() => getDeliveryOptions(new Date()), []);
  const deliveryLabel = deliveryOptions[0] || 'Próxima ventana disponible';
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

  function jumpTo(selector) {
    if (typeof document === 'undefined') return;
    const element = document.querySelector(selector);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleAdd(product, size) {
    if (!size) {
      setNotification('Elegí tu talle antes de pedir');
      return;
    }
    if (cart.length >= 2) {
      setNotification('Ya tienes 2 pares. Quitá uno si querés cambiar.');
      return;
    }
    const nextCount = cart.length + 1;
    setCart((current) => [
      ...current,
      { productId: product.id, size, id: `${product.id}-${size}-${Date.now()}-${Math.random()}` },
    ]);
    setCartExpanded(true);
    setNotification(nextCount === 1 ? getPostAddMessage(nextCount) : '');
    setTimeout(() => jumpTo('#v2-cart-anchor'), 120);
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
    if (!formState.name || !formState.street || !formState.betweenStreets || !formState.postalCode || !formState.locality || !formState.deliverySlot) {
      setNotification('Completá todos los datos antes de comprar.');
      return;
    }
    if (!isValidWhatsappInput(formState.whatsapp)) {
      setNotification('Revisá el WhatsApp (sin 0 ni 15).');
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
    params.set('entry.1209868979', typeof window !== 'undefined' ? window.location.href : BASE_PATH + '/index-contrareembolso-v2.html');
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
      await postOrderToWebhook(ORDER_WEBHOOK_URL, params);
      window.localStorage.setItem('orderDetails', orderDetails);
      window.localStorage.setItem('rawProducts', orderSummary);
      window.localStorage.setItem('customerName', formState.name);
      window.localStorage.setItem('rosita.whatsapp.prefill', formState.whatsapp);

      const route = getThankYouRoute(cart.length);
      window.location.assign(`${BASE_PATH}${route}.html?286442883=${encodeURIComponent(orderSummary)}`);
    } catch {
      setNotification('Hubo un problema al enviar el pedido. Probá de nuevo.');
      setLoading(false);
    }
  }

  return (
    <div className="v2-shell">
      <header className="v2-header">
        <img src={BRAND_LOGO_SRC} alt="Rosita Rococo" width="320" height="108" className="v2-logo" decoding="async" />
        <h1 className="v2-header-title">Catálogo Contrareembolso</h1>
        <p className="v2-payment-ribbon">Pagás al recibir en efectivo. Sólo CABA y GBA.</p>
      </header>

      <main className="v2-main">
        <section className="v2-products" aria-label="Modelos disponibles">
          {PRODUCTS.map((product, index) => (
            <V2ProductCard
              key={product.id}
              product={product}
              onAdd={handleAdd}
              cartLocked={cart.length >= 2}
              priority={index === 0}
            />
          ))}
        </section>

        <span id="v2-cart-anchor" aria-hidden="true" />

        <section id="checkout-form" className="v2-checkout-anchor" aria-label="Confirmar pedido">
          <V2CheckoutForm
            visible={checkoutOpen}
            formState={formState}
            setFormState={setFormState}
            deliveryOptions={deliveryOptions}
            deliveryLabel={deliveryLabel}
            orderDetails={orderDetails}
            total={total}
            loading={loading}
            onSubmit={submitOrder}
            isValidWhatsappInput={isValidWhatsappInput}
            cartEntries={cartEntries}
          />
        </section>
      </main>

      <V2CartPanel
        cartEntries={cartEntries}
        cartPhase={cartPhase}
        total={total}
        expanded={cartExpanded}
        setExpanded={setCartExpanded}
        onRemove={removeItem}
        onContinue={() => {
          setCartExpanded(false);
          jumpTo('.v2-products');
        }}
        onGoCheckout={() => {
          setCartExpanded(false);
          setCheckoutOpen(true);
          setTimeout(() => jumpTo('#checkout-form'), 80);
        }}
        deliveryOptions={deliveryOptions}
        selectedSlot={formState.deliverySlot}
        onSelectSlot={(slot) => setFormState((current) => ({ ...current, deliverySlot: slot }))}
      />

      {notification ? <div className="v2-toast">{notification}</div> : null}

      {cartEntries.length > 0 && !cartExpanded && !checkoutOpen ? (
        <button
          type="button"
          className="floating-checkout-cta"
          onClick={() => {
            setCartExpanded(true);
            setTimeout(() => jumpTo('#v2-cart-anchor'), 80);
          }}
        >
          {cartPhase === 'bundle' ? 'Finalizar pedido →' : `Ver pedido (${cartEntries.length} par${cartEntries.length > 1 ? 'es' : ''}) →`}
        </button>
      ) : null}
    </div>
  );
}
