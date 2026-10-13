'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  BANK_DETAILS,
  BRAND_LOGO_SRC,
  FAMILIES,
  FAMILY_LABEL,
  GENDER_LABEL,
  GENDERS,
  ORDER_WEBHOOK_URL,
  PAGE_COPY,
  PAYMENT_LINK_WEBHOOK_URL,
  PAYMENT_METHODS,
  PRODUCT_KIND,
  PRICING,
  PRODUCTS,
  PROVINCES,
  discountFor,
  priceOf,
} from '@/src/lib/perfumes-previo-pago-data';
import {
  buildLegacyPayload,
  buildOrderSummary,
  calculateSubtotal,
  calculateTotal,
  describeCart,
  formatOrderDetails,
  getCbuRoute,
  getDiscountLabel,
  getHeadline,
  getPostAddMessage,
  getUpsell,
} from '@/src/lib/perfumes-previo-pago-utils';
import { getDeliveryOptions, isBlockedWhatsappNumber, isValidWhatsappInput } from '@/src/lib/funnel-utils';
import { generateFBC, generateFBP } from '@/src/lib/facebook-tracking';

const formatCurrency = (value) => `$${value.toLocaleString('es-AR')}`;

const EMPTY_FORM = {
  name: '',
  email: '',
  whatsapp: '',
  dni: '',
  street: '',
  postalCode: '',
  locality: '',
  province: '',
  paymentMethod: '',
  deliverySlot: '',
};

function splitDeliveryOption(option) {
  const match = option.match(/^(.+?)\s+de\s+(\d+)hs\s+a\s+(\d+)hs$/);
  if (!match) return { date: option, time: '' };
  return { date: match[1].trim(), time: `${match[2]} a ${match[3]} hs` };
}

/* ------------------------------------------------------------------- filtros */

function CatalogFilters({ gender, onGender, family, onFamily, shown }) {
  const counts = useMemo(() => {
    const base = PRODUCTS.filter((p) => gender === 'todos' || p.gender === gender);
    const byFamily = base.reduce((acc, p) => ({ ...acc, [p.family]: (acc[p.family] || 0) + 1 }), {});
    const byGender = PRODUCTS.reduce((acc, p) => ({ ...acc, [p.gender]: (acc[p.gender] || 0) + 1 }), {});
    return { byFamily, byGender };
  }, [gender]);

  return (
    <div className="pp-filters">
      <div className="pp-filter-block">
        <span className="pp-filter-label">Para</span>
        <div className="pp-gender-tabs" role="tablist" aria-label="Filtrar por género">
          {GENDERS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={gender === entry.id}
              className={`pp-gender-tab${gender === entry.id ? ' is-active' : ''}`}
              onClick={() => onGender(entry.id)}
            >
              {entry.label}
              {entry.id !== 'todos' ? (
                <span className="pp-tab-count">{counts.byGender[entry.id] || 0}</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="pp-filter-block">
        <span className="pp-filter-label">Familia de aroma</span>
        <div className="pp-family-chips" role="group" aria-label="Filtrar por familia de aromas">
          {FAMILIES.map((entry) => {
            const count = entry.id === 'todos' ? null : counts.byFamily[entry.id] || 0;
            return (
              <button
                key={entry.id}
                type="button"
                className={`pp-family-chip${family === entry.id ? ' is-active' : ''}`}
                onClick={() => onFamily(entry.id)}
                aria-pressed={family === entry.id}
                disabled={count === 0}
              >
                {entry.label}
                {count ? <span className="pp-chip-count">{count}</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      <p className="pp-filter-count" aria-live="polite">
        {shown === PRODUCTS.length ? `${PRODUCTS.length} perfumes` : `${shown} de ${PRODUCTS.length}`}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ carrusel */

function PerfumeGallery({ product, priority }) {
  const [index, setIndex] = useState(0);
  const [touchX, setTouchX] = useState(null);
  const images = product.images;
  const multi = images.length > 1;

  function go(delta) {
    setIndex((current) => (current + delta + images.length) % images.length);
  }

  function onTouchStart(event) {
    setTouchX(event.touches[0].clientX);
  }

  function onTouchEnd(event) {
    if (touchX == null) return;
    const delta = event.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    setTouchX(null);
  }

  return (
    <div className="pp-gallery">
      <div
        className="pp-gallery-frame"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role={multi ? 'group' : undefined}
        aria-label={multi ? `Fotos de ${product.name}` : undefined}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={
              i === 0
                ? `${product.name} de ${product.brand} - ${GENDER_LABEL[product.gender]}`
                : `${product.name} de ${product.brand}, foto ${i + 1}`
            }
            loading={priority && i === 0 ? 'eager' : 'lazy'}
            fetchPriority={priority && i === 0 ? 'high' : undefined}
            decoding="async"
            className={`pp-gallery-image${i === index ? ' is-active' : ''}`}
          />
        ))}

        {multi ? (
          <>
            <button
              type="button"
              className="pp-gallery-arrow is-prev"
              onClick={() => go(-1)}
              aria-label={`Foto anterior de ${product.name}`}
            >
              ‹
            </button>
            <button
              type="button"
              className="pp-gallery-arrow is-next"
              onClick={() => go(1)}
              aria-label={`Foto siguiente de ${product.name}`}
            >
              ›
            </button>
            <span className="pp-gallery-counter">
              {index + 1}/{images.length}
            </span>
          </>
        ) : null}
      </div>

      {multi ? (
        <div className="pp-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`pp-thumb${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1} de ${product.name}`}
            >
              <img src={src} alt="" loading="lazy" decoding="async" className="pp-thumb-image" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------- tarjeta */

function PerfumeCard({ product, onAdd, cartLocked, priority }) {
  return (
    <article className="pp-card" id={`pp-${product.id}`}>
      <PerfumeGallery product={product} priority={priority} />

      <div className="pp-card-body">
        <div className="pp-card-head">
          <h2 className="pp-card-name">{product.name}</h2>
          <span className="pp-card-brand">{product.brand}</span>
        </div>

        <div className="pp-card-chips">
          <span className={`pp-chip pp-chip-gender is-${product.gender}`}>
            {GENDER_LABEL[product.gender]}
          </span>
          <span className="pp-chip pp-chip-family">{FAMILY_LABEL[product.family]}</span>
          {product.presentation ? (
            <span className="pp-chip pp-chip-size">{product.presentation}</span>
          ) : null}
        </div>

        <p className="pp-card-notes">{product.description}</p>

        <div className="pp-card-pricing">
          <div className="pp-card-price-row">
            <span className="pp-card-price-label">
              Precio
              <small className="pp-card-price-hint">3 cuotas sin interés</small>
            </span>
            <span className="pp-card-price-values">
              <strong className="pp-card-price">{formatCurrency(product.price)}</strong>
              <small className="pp-card-price-cbu">
                {formatCurrency(product.cbuPrice)} por transferencia
              </small>
            </span>
          </div>

          <ul className="pp-card-combos">
            {[2, 3].map((count) => {
              const off = discountFor(count);
              return (
                <li key={count} className="pp-card-combo">
                  <span className="pp-card-combo-qty">
                    {count} perfumes
                    <small className="pp-card-combo-hint">sumando {count - 1} más</small>
                  </span>
                  <span className="pp-card-combo-values">
                    <strong className="pp-card-combo-total">
                      {formatCurrency(count * product.price - off)}
                    </strong>
                    <small className="pp-card-combo-unit">
                      {formatCurrency(Math.round((count * product.price - off) / count))} c/u
                    </small>
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="pp-card-discount-note">
            Descuento fijo sobre el total: {formatCurrency(PRICING.cartDiscounts[2])} con 2 perfumes,{' '}
            {formatCurrency(PRICING.cartDiscounts[3])} con 3.
          </p>
        </div>

        <div className="pp-card-actions">
          <button
            type="button"
            className="pp-add-button"
            disabled={cartLocked}
            onClick={() => onAdd(product)}
          >
            {cartLocked ? 'Pedido completo' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------- carrito */

function CartPanel({
  cartEntries,
  subtotal,
  discount,
  total,
  upsell,
  paymentMethod,
  expanded,
  setExpanded,
  onRemove,
  onGoCheckout,
  onContinue,
  deliveryOptions,
  selectedSlot,
  onSelectSlot,
}) {
  const cbu = paymentMethod === 'cbu';

  return (
    <div className={`pp-cart ${expanded ? 'is-open' : ''} ${cartEntries.length ? 'has-items' : ''}`}>
      <button
        type="button"
        className="pp-cart-toggle"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="pp-cart-top">
          <div className="pp-cart-context">
            <span className="pp-tag pp-tag-primary">Pago online</span>
            <span className="pp-tag pp-tag-accent">Envío gratis</span>
            {cbu ? <span className="pp-tag pp-tag-cbu">−10% CBU</span> : null}
            {discount ? <span className="pp-tag pp-tag-off">{getDiscountLabel(cartEntries.length)}</span> : null}
          </div>
          <span className="pp-cart-arrow" aria-hidden="true">
            {expanded ? '▾' : '▴'}
          </span>
        </div>

        <div className="pp-cart-bottom">
          <div className="pp-tier-rail">
            {[1, 2, 3].map((count) => {
              const active = cartEntries.length === count;
              const off = discountFor(count);
              return (
                <span key={count} className={`pp-tier${active ? ' is-active' : ''}`}>
                  <small>{count === 1 ? '1 perfume' : `${count} perfumes`}</small>
                  <strong>{off ? `−${formatCurrency(off)}` : 'Sin dto.'}</strong>
                </span>
              );
            })}
          </div>
        </div>
      </button>

      {expanded ? (
        <div className="pp-cart-body">
          <div className="pp-cart-body-head">
            <span className="pp-cart-body-title">{getHeadline(cartEntries.length)}</span>
            <button
              type="button"
              className="pp-cart-close"
              onClick={() => setExpanded(false)}
              aria-label="Cerrar carrito"
            >
              ✕ Cerrar
            </button>
          </div>

          {deliveryOptions.length ? (
            <div className="pp-slots" role="group" aria-label="Elegí cuándo recibir">
              <span className="pp-slots-label">¿Cuándo querés recibir?</span>
              <div className="pp-slot-options">
                {deliveryOptions.map((option) => {
                  const { date, time } = splitDeliveryOption(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      className={`pp-slot${selectedSlot === option ? ' is-selected' : ''}`}
                      onClick={() => onSelectSlot(option)}
                      aria-pressed={selectedSlot === option}
                    >
                      <span className="pp-slot-day">{date}</span>
                      {time ? <span className="pp-slot-time">{time}</span> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {cartEntries.length ? (
            <ul className="pp-cart-list">
              {cartEntries.map((item) => (
                <li key={item.id} className="pp-cart-row">
                  <span className="pp-cart-row-thumb">
                    {item.product?.images?.[0] ? (
                      <img src={item.product.images[0]} alt="" width="40" height="40" loading="lazy" decoding="async" />
                    ) : null}
                  </span>
                  <span className="pp-cart-row-copy">
                    <strong>{item.product?.name || item.productId}</strong>
                    <small>{item.product?.brand}</small>
                  </span>
                  <button
                    type="button"
                    className="pp-cart-row-remove"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Quitar ${item.product?.name || 'perfume'}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="pp-cart-empty">Elegí un perfume arriba ↑</p>
          )}

          {cartEntries.length ? (
            <div className="pp-cart-total">
              <div className="pp-cart-total-line is-sub">
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              {discount ? (
                <div className="pp-cart-total-line is-discount">
                  <span>
                    Descuento por {cartEntries.length}{' '}
                    {cartEntries.length === 1 ? 'perfume' : 'perfumes'}
                  </span>
                  <strong>−{formatCurrency(discount)}</strong>
                </div>
              ) : null}
              <div className="pp-cart-total-line is-final">
                <span>Total a pagar</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
            </div>
          ) : null}

          <div className="pp-cart-actions">
            {cartEntries.length ? (
              <button type="button" className="pp-cart-primary" onClick={onGoCheckout}>
                Finalizar pedido →
              </button>
            ) : null}
            {upsell ? (
              <button type="button" className="pp-cart-upsell" onClick={onContinue}>
                <span className="pp-cart-upsell-title">{upsell.title}</span>
                <span className="pp-cart-upsell-sub">{upsell.sub}</span>
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------- checkout */

function CheckoutForm({
  formState,
  setFormState,
  deliveryOptions,
  subtotal,
  discount,
  total,
  cartEntries,
  loading,
  onSubmit,
  onBlock,
}) {
  function update(field, value) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  const whatsappInvalid = formState.whatsapp && !isValidWhatsappInput(formState.whatsapp);
  const method = PAYMENT_METHODS.find((m) => m.value === formState.paymentMethod);

  return (
    <form className="pp-checkout" onSubmit={onSubmit}>
      <h2 className="pp-checkout-title">{PAGE_COPY.checkoutTitle}</h2>

      {cartEntries.length ? (
        <div className="pp-recap">
          {cartEntries.map((item, index) => (
            <div key={item.id} className="pp-recap-line">
              <span className="pp-recap-index">{index + 1}</span>
              <span className="pp-recap-name">{item.product?.name || item.productId}</span>
              <span className="pp-recap-brand">{item.product?.brand}</span>
              <span className="pp-recap-price">
                {item.product ? formatCurrency(priceOf(item.product, formState.paymentMethod || 'tarjeta')) : '—'}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="pp-field">
        <span>Nombre y apellido</span>
        <input value={formState.name} onChange={(e) => update('name', e.target.value)} placeholder="Quién recibe" required />
      </div>

      <div className="pp-field">
        <span>Email</span>
        <input
          type="email"
          value={formState.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="tuemail@ejemplo.com"
          required
        />
        <small className="pp-hint">Ahí te enviamos la confirmación del pedido.</small>
      </div>

      <div className="pp-field">
        <span>WhatsApp</span>
        <input
          value={formState.whatsapp}
          onChange={(e) => update('whatsapp', e.target.value)}
          onBlur={() => {
            if (isBlockedWhatsappNumber(formState.whatsapp)) onBlock();
          }}
          placeholder="Ej: 1156457057"
          required
          inputMode="numeric"
        />
        <small className={whatsappInvalid ? 'pp-hint pp-hint-error' : 'pp-hint'}>
          {whatsappInvalid ? 'Formato inválido (sin 0 ni 15).' : 'Sin 0 ni 15, te confirmamos por acá.'}
        </small>
      </div>

      <div className="pp-field">
        <span>DNI</span>
        <input
          value={formState.dni}
          onChange={(e) => update('dni', e.target.value)}
          placeholder="Sin puntos"
          required
          inputMode="numeric"
        />
      </div>

      <div className="pp-field">
        <span>Calle y número (piso/dpto)</span>
        <input value={formState.street} onChange={(e) => update('street', e.target.value)} placeholder="Ej: Av. Siempreviva 742, 3B" required />
      </div>

      <div className="pp-field">
        <span>Código postal</span>
        <input value={formState.postalCode} onChange={(e) => update('postalCode', e.target.value)} placeholder="1425" required inputMode="numeric" />
      </div>

      <div className="pp-field">
        <span>Localidad</span>
        <input value={formState.locality} onChange={(e) => update('locality', e.target.value)} placeholder="Palermo" required />
      </div>

      <div className="pp-field">
        <span>Provincia</span>
        <select value={formState.province} onChange={(e) => update('province', e.target.value)} required>
          <option value="">Elegí tu provincia</option>
          {PROVINCES.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      <div className="pp-slots pp-slots-block">
        <span className="pp-slots-label">¿Cuándo querés recibir?</span>
        <div className="pp-slot-options is-block">
          {deliveryOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`pp-slot${formState.deliverySlot === option ? ' is-selected' : ''}`}
              onClick={() => update('deliverySlot', option)}
              aria-pressed={formState.deliverySlot === option}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="pp-methods">
        <span className="pp-slots-label">¿Cómo querés pagar?</span>
        {PAYMENT_METHODS.map((entry) => (
          <label key={entry.value} className={`pp-method${formState.paymentMethod === entry.value ? ' is-selected' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value={entry.value}
              checked={formState.paymentMethod === entry.value}
              onChange={(e) => update('paymentMethod', e.target.value)}
            />
            <span className="pp-method-copy">
              <strong>{entry.label}</strong>
              <small>{entry.helper}</small>
            </span>
          </label>
        ))}
      </div>

      {formState.paymentMethod === 'cbu' ? (
        <div className="pp-bank">
          <p className="pp-bank-title">Datos para la transferencia</p>
          <p>
            <strong>Banco:</strong> {BANK_DETAILS.bank}
          </p>
          <p className="pp-bank-cbu">
            <strong>CBU:</strong> {BANK_DETAILS.cbu}
          </p>
          <p>
            <strong>Alias:</strong> {BANK_DETAILS.alias}
          </p>
          <p>
            <strong>Titular:</strong> {BANK_DETAILS.holder}
          </p>
        </div>
      ) : null}

      <p className="pp-delivery-legend">{PAGE_COPY.deliveryLegend}</p>
      <p className="pp-commitment">{PAGE_COPY.reviewCommitment}</p>

      <div className="pp-checkout-foot">
        <div className="pp-checkout-totals">
          <div className="pp-checkout-total is-sub">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          {discount ? (
            <div className="pp-checkout-total is-discount">
              <span>Descuento por {cartEntries.length} perfumes</span>
              <strong>−{formatCurrency(discount)}</strong>
            </div>
          ) : null}
          <div className="pp-checkout-total is-final">
            <span>Total a pagar</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </div>
        <p className="pp-checkout-method">
          {method ? method.label : 'Elegí un medio de pago'}
          {formState.paymentMethod === 'cbu' ? ' · con 10% OFF aplicado' : ''}
        </p>
        <button type="submit" className="pp-checkout-submit" disabled={loading}>
          {loading ? 'Procesando...' : formState.paymentMethod === 'cbu' ? 'Ver datos para transferir' : 'Pagar ahora'}
        </button>
        <p className="pp-fineprint">{PAGE_COPY.freeShippingReminder}</p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------- landing */

export default function PerfumesPrevioPagoLanding() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [toast, setToast] = useState('');
  const [gender, setGender] = useState('todos');
  const [family, setFamily] = useState('todos');
  const [formState, setFormState] = useState(EMPTY_FORM);

  const mpScriptLoaded = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved =
      window.localStorage.getItem('savedWhatsapp') ||
      window.localStorage.getItem('rosita.whatsapp.prefill') ||
      '';
    if (saved) {
      setFormState((current) => (current.whatsapp ? current : { ...current, whatsapp: saved }));
    }
    generateFBC();
    generateFBP();
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const deliveryOptions = useMemo(() => getDeliveryOptions(new Date()), []);

  const visibleProducts = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => (gender === 'todos' || p.gender === gender) && (family === 'todos' || p.family === family),
      ),
    [gender, family],
  );

  const cartEntries = useMemo(
    () => cart.map((item) => ({ ...item, product: PRODUCTS.find((p) => p.id === item.productId) })),
    [cart],
  );

  // El subtotal depende del medio de pago (la transferencia tiene 10% OFF en
  // cada perfume) y el total, además, del descuento fijo por cantidad.
  const method = formState.paymentMethod || 'tarjeta';
  const subtotal = calculateSubtotal(cart, method);
  const discount = discountFor(cart.length);
  const total = calculateTotal(cart, method);
  const upsell = getUpsell(cart.length);
  const orderSummary = useMemo(() => buildOrderSummary(cart), [cart]);
  const orderDetails = useMemo(() => formatOrderDetails(cart), [cart]);
  const legacyPayload = useMemo(() => buildLegacyPayload(cart), [cart]);
  const cartSummary = useMemo(() => describeCart(cart, method), [cart, method]);

  function jumpTo(selector) {
    const element = document.querySelector(selector);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleAdd(product) {
    if (cart.length >= PRICING.maxItems) {
      setToast(`Ya tenés ${PRICING.maxItems} perfumes, que es el máximo de la promo.`);
      return;
    }
    const nextCount = cart.length + 1;
    setCart((current) => [
      ...current,
      { productId: product.id, id: `${product.id}-${Date.now()}-${Math.random()}` },
    ]);
    setCartOpen(true);
    setToast(getPostAddMessage(nextCount));
    setTimeout(() => jumpTo('#pp-cart-anchor'), 120);

    // MercadoPago pide su script de seguridad al agregar al carrito, igual que
    // en el funnel de calzados: sin esto el link de pago puede fallar.
    if (!mpScriptLoaded.current) {
      const script = document.createElement('script');
      script.src = 'https://www.mercadopago.com/v2/security.js';
      script.setAttribute('view', 'checkout');
      document.head.appendChild(script);
      mpScriptLoaded.current = true;
    }
  }

  function removeItem(itemId) {
    setCart((current) => current.filter((item) => item.id !== itemId));
  }

  async function requestMercadoPagoLink({ buyerName, total: amount }) {
    const response = await fetch(PAYMENT_LINK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comprador: buyerName, monto: amount, fbp: generateFBP(), fbc: generateFBC() }),
    });
    if (!response.ok) throw new Error(`MercadoPago link request failed: ${response.status}`);
    const payload = await response.json();
    const link = Array.isArray(payload) ? payload[0]?.linkpersonalizadomp : payload?.linkpersonalizadomp;
    if (!link) throw new Error('Missing MercadoPago link in response');
    return link;
  }

  async function submitOrder(event) {
    event.preventDefault();

    if (!cart.length) {
      setToast('Primero agregá al menos un perfume.');
      return;
    }
    if (!formState.name || !formState.email || !formState.street || !formState.postalCode || !formState.locality || !formState.province || !formState.dni || !formState.paymentMethod) {
      setToast('Completá todos los datos antes de continuar.');
      return;
    }
    if (!isValidWhatsappInput(formState.whatsapp)) {
      setToast('Revisá el WhatsApp (sin 0 ni 15).');
      return;
    }
    if (isBlockedWhatsappNumber(formState.whatsapp)) {
      setBlocked(true);
      return;
    }
    if (!formState.deliverySlot) {
      setToast('Elegí un día de entrega.');
      return;
    }

    setLoading(true);

    const address = `${formState.street.trim()} ${formState.postalCode.trim()} ${formState.locality.trim()}, ${formState.province}`;

    let mercadoPagoUrl = '';
    if (formState.paymentMethod === 'tarjeta' || formState.paymentMethod === 'mercadopago') {
      try {
        mercadoPagoUrl = await requestMercadoPagoLink({
          buyerName: formState.name.trim(),
          total: calculateTotal(cart.length, formState.paymentMethod),
        });
      } catch {
        setToast('No pudimos generar el link de pago. Probá de nuevo en un momento.');
        setLoading(false);
        return;
      }
    }

    const formData = new FormData();
    formData.set('entry.286442883', orderSummary);
    formData.set('entry.1465946249', formState.email.trim());
    formData.set('entry.1460904554', formState.name.trim());
    formData.set('entry.53830725', formState.whatsapp.replace(/\D/g, ''));
    formData.set('entry.951592426', address);
    formData.set('entry.1005165410', formState.postalCode.trim());
    formData.set('entry.1743418466', formState.locality.trim());
    formData.set('entry.59648134', formState.province);
    formData.set('entry.541001873', formState.dni.trim());
    formData.set('entry.17650825', 'A DOMICILIO');
    formData.set('entry.1209868979', window.location.href);
    formData.set('entry.978809450', mercadoPagoUrl);
    // Con precio por perfume el desglose ya no es un total fijo: se mandan el
    // subtotal, el descuento de la cantidad y el costo de reposición, para que
    // el backend pueda ver el margen sin tener que recalcularlo.
    formData.set('entry.subtotal', String(subtotal));
    formData.set('entry.descuento', String(discount));
    formData.set('entry.cantidad', String(cart.length));
    formData.set('entry.1885018612', legacyPayload.legacyDetails);
    formData.set('entry.1715320252', String(total));
    formData.set('entry.736134777', String(legacyPayload.costTotal));
    formData.set('entry.1756027935', formState.deliverySlot);
    formData.set('comoabona', formState.paymentMethod);
    // Ruteo en n8n: separa perfumes-previopago de calzados y de perfumes
    // contrarreembolsto.
    formData.set('producto', PRODUCT_KIND);
    formData.set('website', '');
    formData.set('fvv', '1');
    formData.set('fbzx', '5661184097173102736');
    formData.set('pageHistory', '0');
    const fbc = generateFBC();
    const fbp = generateFBP();
    if (fbc) formData.set('_fbc', fbc);
    if (fbp) formData.set('_fbp', fbp);

    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {
          currency: 'ARS',
          value: total,
          num_items: cart.length,
          content_type: 'product',
        });
      }

      const response = await fetch(ORDER_WEBHOOK_URL, { method: 'POST', body: formData, keepalive: true });
      if (!response.ok) throw new Error(`Order submission failed: ${response.status}`);

      window.localStorage.setItem('orderDetails', orderDetails);
      window.localStorage.setItem('rawProducts', orderSummary);
      window.localStorage.setItem('customerName', formState.name);
      window.localStorage.setItem('paymentMethod', formState.paymentMethod);
      window.localStorage.setItem('rosita.whatsapp.prefill', formState.whatsapp);
      // Con precio por perfume el total ya no es un valor fijo por cantidad,
      // así que las páginas finales lo leen de acá. El precio de cada perfume
      // viaja en el carrito para que el resumen muestre lo que se cobró.
      window.localStorage.setItem('ppOrderTotal', String(total));
      window.localStorage.setItem('ppOrderSubtotal', String(subtotal));
      window.localStorage.setItem('ppOrderDiscount', String(discount));
      window.localStorage.setItem('ppOrderCount', String(cart.length));
      window.localStorage.setItem('ppOrderCart', JSON.stringify(cartSummary));

      if (formState.paymentMethod === 'cbu') {
        // La transferencia no tiene redirección: va a la página con los datos
        // bancarios y el comprobante se manda por WhatsApp.
        window.location.assign(`/2026${getCbuRoute()}.html`);
        return;
      }

      window.location.assign(mercadoPagoUrl);
    } catch {
      setToast('Hubo un problema al enviar el pedido. Probá de nuevo.');
      setLoading(false);
    }
  }

  return (
    <div className="pp-shell">
      <header className="pp-header">
        <img src={BRAND_LOGO_SRC} alt="Rosita Rococo" width="260" height="88" className="pp-logo" decoding="async" />
        <h1 className="pp-header-title">{PAGE_COPY.title}</h1>
        <p className="pp-ribbon">
          {PAGE_COPY.paymentRibbon} · {PAGE_COPY.shippingNote}
        </p>
      </header>

      <section className="pp-promo-panel" aria-label="Promociones y envío">
        <p className="pp-shipping">
          <span className="pp-shipping-icon" aria-hidden="true">✓</span>
          Envío gratis a todo el país
        </p>

        <div className="pp-promo-tiers">
          {[1, 2, 3].map((count) => {
            const off = discountFor(count);
            const last = count === PRICING.maxItems;
            return (
              <div key={count} className={`pp-promo-tier${last ? ' is-featured' : ''}`}>
                <span className="pp-promo-tier-qty">
                  {count} {count === 1 ? 'perfume' : 'perfumes'}
                </span>
                <strong className="pp-promo-tier-price">
                  {off ? `−${formatCurrency(off)}` : 'Precio pleno'}
                </strong>
                <span className="pp-promo-tier-unit">
                  {off ? 'de descuento' : 'sin descuento'}
                </span>
                <span className={`pp-promo-tier-flag${last ? '' : ' is-hidden'}`} aria-hidden="true">
                  {last ? 'Mejor precio' : '·'}
                </span>
              </div>
            );
          })}
        </div>

        <p className="pp-cbu-note">Transferencia bancaria con 10% OFF adicional</p>
        <p className="pp-promo-note">{PAGE_COPY.promoLine}</p>
      </section>

      <section className="pp-trust">
        {[
          { title: '61 perfumes', body: 'Armaf, Afnan, Lattafa, Rasasi y más, con sus notas de salida, corazón y fondo.' },
          { title: 'Pagá como quieras', body: 'Tarjeta en 3 cuotas, saldo MercadoPago o transferencia con 10% OFF.' },
          { title: 'Envío gratis', body: 'A todo el país, con confirmación por WhatsApp antes de despachar.' },
        ].map((point) => (
          <div key={point.title} className="pp-trust-item">
            <strong>{point.title}</strong>
            <span>{point.body}</span>
          </div>
        ))}
      </section>

      <main className="pp-main">
        <CatalogFilters
          gender={gender}
          onGender={setGender}
          family={family}
          onFamily={setFamily}
          shown={visibleProducts.length}
        />

        <section className="pp-list" aria-label="Perfumes disponibles">
          {visibleProducts.map((product, index) => (
            <PerfumeCard
              key={product.id}
              product={product}
              onAdd={handleAdd}
              cartLocked={cart.length >= PRICING.maxItems}
              priority={index === 0}
            />
          ))}

          {visibleProducts.length === 0 ? (
            <p className="pp-empty-filter">
              No hay perfumes con esa combinación. Probá con otra familia de aromas.
            </p>
          ) : null}
        </section>

        <span id="pp-cart-anchor" aria-hidden="true" />

        {checkoutOpen ? (
          <section id="pp-checkout" className="pp-checkout-anchor" aria-label="Confirmar pedido">
            <CheckoutForm
              formState={formState}
              setFormState={setFormState}
              deliveryOptions={deliveryOptions}
              subtotal={subtotal}
              discount={discount}
              total={total}
              cartEntries={cartEntries}
              loading={loading}
              onSubmit={submitOrder}
              onBlock={() => setBlocked(true)}
            />
          </section>
        ) : null}
      </main>

      <CartPanel
        cartEntries={cartEntries}
        subtotal={subtotal}
        discount={discount}
        total={total}
        upsell={upsell}
        paymentMethod={formState.paymentMethod}
        expanded={cartOpen}
        setExpanded={setCartOpen}
        onRemove={removeItem}
        onContinue={() => {
          setCartOpen(false);
          jumpTo('.pp-list');
        }}
        onGoCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
          setTimeout(() => jumpTo('#pp-checkout'), 80);
        }}
        deliveryOptions={deliveryOptions}
        selectedSlot={formState.deliverySlot}
        onSelectSlot={(slot) => setFormState((current) => ({ ...current, deliverySlot: slot }))}
      />

      {toast ? <div className="pp-toast">{toast}</div> : null}

      {blocked ? (
        <div className="pp-blocked" role="alert">
          <div className="pp-blocked-card">
            <h2>No podemos continuar con tu pedido</h2>
            <p>Estamos teniendo un problema técnico y por ahora no podemos tomar pedidos. Disculpá las molestias, probá más tarde.</p>
          </div>
        </div>
      ) : null}

      {cart.length > 0 && !cartOpen && !checkoutOpen ? (
        <button
          type="button"
          className="pp-floating-cta"
          onClick={() => {
            setCartOpen(true);
            setTimeout(() => jumpTo('#pp-cart-anchor'), 80);
          }}
        >
          Ver pedido ({cart.length}) · {formatCurrency(total)} →
        </button>
      ) : null}
    </div>
  );
}