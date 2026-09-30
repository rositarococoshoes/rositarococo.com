'use client';
import { useEffect, useMemo, useState } from 'react';

import {
  AROMA_FAMILIES,
  BRAND_LOGO_SRC,
  DELIVERY_LEGEND,
  FAMILY_LABEL,
  GENDER_LABEL,
  GENDERS,
  BEST_UNIT_PRICE,
  ORDER_WEBHOOK_URL,
  PAGE_COPY,
  PRICING,
  PRICING_TIERS,
  SHIPPING_BADGE,
  PRODUCT_KIND,
  PRODUCT_KIND_FIELD,
  PRODUCTS,
  REVIEW_COMMITMENT,
  TRUST_POINTS,
} from '@/src/lib/perfumes-data';
import {
  buildPerfumeLegacyPayload,
  buildPerfumeOrderSummary,
  calculatePerfumeTotal,
  formatPerfumeOrderDetails,
  getPerfumeHeadline,
  getPerfumePostAddMessage,
  getPerfumeSavingsLabel,
  getPerfumeThankYouRoute,
  getPerfumeUpsell,
  getPerfumeActiveTierCount,
} from '@/src/lib/perfumes-utils';
import {
  getDeliveryOptions,
  isBlockedWhatsappNumber,
  isValidWhatsappInput,
} from '@/src/lib/funnel-utils';
import { generateFBC, generateFBP } from '@/src/lib/facebook-tracking';

const formatCurrency = (value) => `$${value.toLocaleString('es-AR')}`;

const EMPTY_FORM = {
  name: '',
  whatsapp: '',
  street: '',
  betweenStreets: '',
  postalCode: '',
  locality: '',
  province: 'Buenos Aires',
  deliverySlot: '',
};

function splitDeliveryOption(option) {
  const match = option.match(/^(.+?)\s+de\s+(\d+)hs\s+a\s+(\d+)hs$/);
  if (!match) return { date: option, time: '' };
  return { date: match[1].trim(), time: `${match[2]} a ${match[3]} hs` };
}

/* ------------------------------------------------------------------ filtros */

function CatalogFilters({ gender, onGender, family, onFamily, total, shown }) {
  const countsByFamily = useMemo(() => {
    const base = PRODUCTS.filter((product) => gender === 'todos' || product.gender === gender);
    return base.reduce((acc, product) => {
      acc[product.family] = (acc[product.family] || 0) + 1;
      return acc;
    }, {});
  }, [gender]);

  return (
    <div className="pf-filters">
      <div className="pf-filter-block">
        <span className="pf-filter-label">Para</span>
        <div className="pf-gender-tabs" role="tablist" aria-label="Filtrar por género">
          {GENDERS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={gender === entry.id}
              className={`pf-gender-tab${gender === entry.id ? ' is-active' : ''}`}
              onClick={() => onGender(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pf-filter-block">
        <span className="pf-filter-label">Aroma</span>
        <div className="pf-family-chips" role="group" aria-label="Filtrar por familia de aromas">
          <button
            type="button"
            className={`pf-family-chip${family === 'todos' ? ' is-active' : ''}`}
            onClick={() => onFamily('todos')}
            aria-pressed={family === 'todos'}
          >
            Todos
          </button>
          {AROMA_FAMILIES.map((entry) => {
            const count = countsByFamily[entry.id] || 0;
            return (
              <button
                key={entry.id}
                type="button"
                className={`pf-family-chip${family === entry.id ? ' is-active' : ''}`}
                onClick={() => onFamily(entry.id)}
                aria-pressed={family === entry.id}
                disabled={count === 0}
              >
                {entry.label}
                {count ? <span className="pf-chip-count">{count}</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      <p className="pf-filter-count" aria-live="polite">
        {shown === total ? `${total} perfumes` : `${shown} de ${total} perfumes`}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- productos */

function PerfumeCard({ product, onAdd, cartLocked, priority }) {
  return (
    <article className="pf-card" id={`perfume-${product.id}`}>
      <div className="pf-card-media">
        <img
          src={product.image}
          alt={`${product.name} de ${product.brand} - perfume ${GENDER_LABEL[product.gender]}`}
          width="900"
          height="900"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="pf-card-image"
        />
      </div>

      <div className="pf-card-body">
        <div className="pf-card-head">
          <h2 className="pf-card-name">{product.name}</h2>
          <span className="pf-card-brand">{product.brand}</span>
        </div>

        <div className="pf-card-chips">
          <span className={`pf-chip pf-chip-gender is-${product.gender}`}>
            {GENDER_LABEL[product.gender]}
          </span>
          <span className="pf-chip pf-chip-family">{FAMILY_LABEL[product.family]}</span>
        </div>

        <p className="pf-card-notes">{product.description}</p>

        <div className="pf-card-actions">
          {/* Precio por unidad del escalón de 3, no el de 1: muestra el mejor
              precio posible y el ahorro, que es lo que mueve a comprar más. */}
          <span className="pf-card-price-block">
            <strong className="pf-card-price">{BEST_UNIT_PRICE.label}</strong>
            <small className="pf-card-price-caption">
              {BEST_UNIT_PRICE.caption} · ahorrás {formatCurrency(BEST_UNIT_PRICE.saving)}
            </small>
          </span>
          <button
            type="button"
            className="pf-add-button"
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

/* -------------------------------------------------------------------- cart */

function CartPanel({
  cartEntries,
  activeTier,
  total,
  savings,
  upsell,
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
    <div
      className={`pf-cart ${expanded ? 'is-open' : ''} ${cartEntries.length ? 'has-items' : ''}`}
    >
      <button
        type="button"
        className="pf-cart-toggle"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
      >
        <div className="pf-cart-top">
          <div className="pf-cart-context">
            <span className="pf-tag pf-tag-primary">Contrarreembolso</span>
            <span className="pf-tag pf-tag-accent">Envío gratis</span>
            <span className="pf-tag pf-tag-quiet">Efectivo al recibir</span>
          </div>
          <span className="pf-cart-arrow" aria-hidden="true">
            {expanded ? '▾' : '▴'}
          </span>
        </div>

        <div className="pf-cart-bottom">
          <div className="pf-tier-rail">
            {PRICING_TIERS.map((tier) => (
              <span
                key={tier.count}
                className={`pf-tier${activeTier === tier.count ? ' is-active' : ''}`}
              >
                <small>
                  {tier.count === 1 ? '1 perfume' : `${tier.count} perfumes`}
                </small>
                <strong>{tier.label}</strong>
              </span>
            ))}
          </div>
        </div>
      </button>

      {expanded ? (
        <div className="pf-cart-body">
          <div className="pf-cart-body-head">
            <span className="pf-cart-body-title">{getPerfumeHeadline(cartEntries.length)}</span>
            <button
              type="button"
              className="pf-cart-close"
              onClick={() => setExpanded(false)}
              aria-label="Cerrar carrito"
            >
              ✕ Cerrar
            </button>
          </div>

          {deliveryOptions.length ? (
            <div className="pf-slots" role="group" aria-label="Elegí cuándo recibir">
              <span className="pf-slots-label">¿Cuándo querés recibir?</span>
              <div className="pf-slot-options">
                {deliveryOptions.map((option) => {
                  const { date, time } = splitDeliveryOption(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      className={`pf-slot${selectedSlot === option ? ' is-selected' : ''}`}
                      onClick={() => onSelectSlot(option)}
                      aria-pressed={selectedSlot === option}
                    >
                      <span className="pf-slot-day">{date}</span>
                      {time ? <span className="pf-slot-time">{time}</span> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {cartEntries.length ? (
            <ul className="pf-cart-list">
              {cartEntries.map((item) => (
                <li key={item.id} className="pf-cart-row">
                  <span className="pf-cart-row-thumb">
                    {item.product?.image ? (
                      <img src={item.product.image} alt="" width="40" height="40" loading="lazy" decoding="async" />
                    ) : null}
                  </span>
                  <span className="pf-cart-row-copy">
                    <strong>{item.product?.name || item.productId}</strong>
                    <small>
                      {item.product?.brand} · {GENDER_LABEL[item.product?.gender] || ''}
                    </small>
                  </span>
                  <button
                    type="button"
                    className="pf-cart-row-remove"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Quitar ${item.product?.name || 'perfume'}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="pf-cart-empty">Elegí un perfume arriba ↑</p>
          )}

          {cartEntries.length ? (
            <div className="pf-cart-total">
              <div className="pf-cart-total-line">
                <span>Total al recibir</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
              {savings ? <div className="pf-cart-savings">{savings}</div> : null}
            </div>
          ) : null}

          <div className="pf-cart-actions">
            {cartEntries.length ? (
              <button type="button" className="pf-cart-primary" onClick={onGoCheckout}>
                Finalizar pedido →
              </button>
            ) : null}
            {upsell ? (
              <button type="button" className="pf-cart-upsell" onClick={onContinue}>
                <span className="pf-cart-upsell-title">{upsell.title}</span>
                <span className="pf-cart-upsell-sub">{upsell.sub}</span>
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------------- checkout */

function CheckoutForm({ formState, setFormState, deliveryOptions, orderDetails, total, cartEntries, loading, onSubmit, onBlock }) {
  function update(field, value) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  const whatsappInvalid = formState.whatsapp && !isValidWhatsappInput(formState.whatsapp);

  return (
    <form className="pf-checkout" onSubmit={onSubmit}>
      <h2 className="pf-checkout-title">{PAGE_COPY.checkoutTitle}</h2>

      {cartEntries.length ? (
        <div className="pf-recap">
          {cartEntries.map((item, index) => (
            <div key={item.id} className="pf-recap-line">
              <span className="pf-recap-index">{index + 1}</span>
              <span className="pf-recap-name">{item.product?.name || item.productId}</span>
              <span className="pf-recap-brand">{item.product?.brand}</span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="pf-field">
        <span>Nombre y apellido</span>
        <input
          value={formState.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder="Quién recibe"
          required
        />
      </div>

      <div className="pf-field">
        <span>WhatsApp</span>
        <input
          value={formState.whatsapp}
          onChange={(event) => update('whatsapp', event.target.value)}
          onBlur={() => {
            if (isBlockedWhatsappNumber(formState.whatsapp)) onBlock();
          }}
          placeholder="Ej: 1156457057"
          required
          inputMode="numeric"
        />
        <small className={whatsappInvalid ? 'pf-hint pf-hint-error' : 'pf-hint'}>
          {whatsappInvalid ? 'Formato inválido (sin 0 ni 15).' : 'Sin 0 ni 15, te confirmamos por acá.'}
        </small>
      </div>

      <div className="pf-field">
        <span>Calle y número (piso/dpto)</span>
        <input
          value={formState.street}
          onChange={(event) => update('street', event.target.value)}
          placeholder="Ej: Av. Siempreviva 742, 3B"
          required
        />
      </div>

      <div className="pf-field">
        <span>Entre calles</span>
        <input
          value={formState.betweenStreets}
          onChange={(event) => update('betweenStreets', event.target.value)}
          placeholder="Ej: Entre Corrientes y Lavalle"
          required
        />
      </div>

      <div className="pf-field">
        <span>Código postal</span>
        <input
          value={formState.postalCode}
          onChange={(event) => update('postalCode', event.target.value)}
          placeholder="1425"
          required
          inputMode="numeric"
        />
      </div>

      <div className="pf-field">
        <span>Localidad</span>
        <p className="pf-field-restriction">Solo Capital Federal y Gran Buenos Aires</p>
        <input
          value={formState.locality}
          onChange={(event) => update('locality', event.target.value)}
          placeholder="Palermo"
          required
        />
      </div>

      <div className="pf-field">
        <span>Provincia</span>
        <input value={formState.province} readOnly />
      </div>

      <div className="pf-slots pf-slots-block">
        <span className="pf-slots-label">¿Cuándo querés recibir?</span>
        <div className="pf-slot-options is-block">
          {deliveryOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`pf-slot${formState.deliverySlot === option ? ' is-selected' : ''}`}
              onClick={() => update('deliverySlot', option)}
              aria-pressed={formState.deliverySlot === option}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className="pf-delivery-legend">{DELIVERY_LEGEND}</p>
      <p className="pf-commitment">{REVIEW_COMMITMENT}</p>

      <div className="pf-checkout-foot">
        <div className="pf-checkout-total">
          <span>Total al recibir</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
        <button type="submit" className="pf-checkout-submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Confirmar pedido'}
        </button>
        <p className="pf-fineprint">
          Pagás en efectivo al recibir. Te confirmamos por WhatsApp antes del despacho. Solo CABA y GBA.
        </p>
      </div>

      <p className="pf-order-details-fallback" aria-hidden="true">{orderDetails}</p>
    </form>
  );
}

/* ------------------------------------------------------------------ landing */

export default function PerfumesLanding() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [toast, setToast] = useState('');
  const [gender, setGender] = useState('todos');
  const [family, setFamily] = useState('todos');
  const [formState, setFormState] = useState(EMPTY_FORM);

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
    const timeout = window.setTimeout(() => setToast(''), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const deliveryOptions = useMemo(() => getDeliveryOptions(new Date()), []);

  const visibleProducts = useMemo(
    () =>
      PRODUCTS.filter(
        (product) =>
          (gender === 'todos' || product.gender === gender) &&
          (family === 'todos' || product.family === family),
      ),
    [gender, family],
  );

  const cartEntries = useMemo(
    () => cart.map((item) => ({ ...item, product: PRODUCTS.find((p) => p.id === item.productId) })),
    [cart],
  );

  const activeTier = getPerfumeActiveTierCount(cart.length);
  const total = calculatePerfumeTotal(cart.length);
  const savings = getPerfumeSavingsLabel(cart.length);
  const upsell = getPerfumeUpsell(cart.length);
  const orderSummary = useMemo(() => buildPerfumeOrderSummary(cart), [cart]);
  const orderDetails = useMemo(() => formatPerfumeOrderDetails(cart, PRODUCTS), [cart]);
  const legacyPayload = useMemo(() => buildPerfumeLegacyPayload(cart, PRODUCTS), [cart]);

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
    setToast(getPerfumePostAddMessage(nextCount));
    setTimeout(() => jumpTo('#pf-cart-anchor'), 120);
  }

  function removeItem(itemId) {
    setCart((current) => current.filter((item) => item.id !== itemId));
  }

  async function submitOrder(event) {
    event.preventDefault();
    if (!cart.length) {
      setToast('Primero agregá al menos un perfume.');
      return;
    }
    if (
      !formState.name ||
      !formState.street ||
      !formState.betweenStreets ||
      !formState.postalCode ||
      !formState.locality ||
      !formState.deliverySlot
    ) {
      setToast('Completá todos los datos antes de confirmar.');
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
    setLoading(true);

    const address = formState.betweenStreets.trim()
      ? `${formState.street.trim()} - ${formState.betweenStreets.trim()}`
      : formState.street.trim();

    const params = new URLSearchParams();
    params.set('entry.286442883', orderSummary);
    params.set('entry.1211347450', formState.name);
    params.set('entry.501094818', formState.whatsapp.replace(/\D/g, ''));
    params.set('entry.394819614', address);
    params.set('entry.183290493', formState.postalCode);
    params.set('entry.2081271241', formState.locality);
    params.set('entry.1440375758', formState.province);
    params.set('entry.17650825', 'A DOMICILIO');
    params.set('entry.comoabona', 'contraeembolso');
    params.set('entry.1756027935', formState.deliverySlot);
    params.set('entry.1209868979', window.location.href);
    params.set('entry.1885018612', legacyPayload.legacyDetails);
    params.set('entry.1715320252', String(total));
    params.set('entry.736134777', String(legacyPayload.pairCostTotal));
    params.set('entry.227154461', '');
    params.set('entry.1620487876', 'Pendiente');
    // Ruteo en n8n: separa perfumes de calzados.
    params.set(PRODUCT_KIND_FIELD, PRODUCT_KIND);
    params.set('website', '');
    params.set('fvv', '1');
    params.set('fbzx', '5661184097173102736');
    params.set('pageHistory', '0');

    const fbc = generateFBC();
    const fbp = generateFBP();
    if (fbc) params.set('_fbc', fbc);
    if (fbp) params.set('_fbp', fbp);

    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {
          currency: 'ARS',
          value: total,
          num_items: cart.length,
          content_type: 'product',
        });
      }

      const response = await fetch(ORDER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: params.toString(),
        cache: 'no-store',
      });
      if (!response.ok) throw new Error(`Webhook ${response.status}`);

      window.localStorage.setItem('orderDetails', orderDetails);
      window.localStorage.setItem('rawProducts', orderSummary);
      window.localStorage.setItem('customerName', formState.name);
      window.localStorage.setItem('rosita.whatsapp.prefill', formState.whatsapp);

      const route = getPerfumeThankYouRoute(cart.length);
      window.location.assign(`/2026${route}.html?286442883=${encodeURIComponent(orderSummary)}`);
    } catch {
      setToast('Hubo un problema al enviar el pedido. Probá de nuevo.');
      setLoading(false);
    }
  }

  return (
    <div className="pf-shell">
      <header className="pf-header">
        <img
          src={BRAND_LOGO_SRC}
          alt="Rosita Rococo"
          width="260"
          height="88"
          className="pf-logo"
          decoding="async"
        />
        <h1 className="pf-header-title">{PAGE_COPY.title}</h1>
        <p className="pf-ribbon">
          {PAGE_COPY.paymentRibbon} · {PAGE_COPY.shippingNote}
        </p>
      </header>

      {/* Envío gratis y precio escalonado arriba de todo: es el argumento que
          hace agregar más unidades, así que va antes que el catálogo. */}
      <section className="pf-promo-panel" aria-label="Promociones y envío">
        <p className="pf-shipping">
          <span className="pf-shipping-icon" aria-hidden="true">✓</span>
          {SHIPPING_BADGE}
        </p>

        <div className="pf-promo-tiers">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.count}
              className={`pf-promo-tier${tier.featured ? ' is-featured' : ''}`}
            >
              <span className="pf-promo-tier-qty">
                {tier.count} {tier.count === 1 ? 'perfume' : 'perfumes'}
              </span>
              <strong className="pf-promo-tier-price">{tier.label}</strong>
              <span className="pf-promo-tier-unit">
                {formatCurrency(Math.ceil(tier.price / tier.count))} c/u
              </span>
              {tier.featured ? (
                <span className="pf-promo-tier-flag">Mejor precio</span>
              ) : (
                <span className="pf-promo-tier-flag is-hidden" aria-hidden="true">·</span>
              )}
            </div>
          ))}
        </div>

        <p className="pf-promo-note">{PAGE_COPY.promoLine}</p>
      </section>

      <section className="pf-trust">
        {TRUST_POINTS.map((point) => (
          <div key={point.title} className="pf-trust-item">
            <strong>{point.title}</strong>
            <span>{point.body}</span>
          </div>
        ))}
      </section>

      <main className="pf-main">
        <CatalogFilters
          gender={gender}
          onGender={setGender}
          family={family}
          onFamily={setFamily}
          total={PRODUCTS.length}
          shown={visibleProducts.length}
        />

        <section className="pf-list" aria-label="Perfumes disponibles">
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
            <p className="pf-empty-filter">
              No hay perfumes con esa combinación. Probá con otra familia de aromas.
            </p>
          ) : null}
        </section>

        <span id="pf-cart-anchor" aria-hidden="true" />

        {checkoutOpen ? (
          <section id="pf-checkout" className="pf-checkout-anchor" aria-label="Confirmar pedido">
            <CheckoutForm
              formState={formState}
              setFormState={setFormState}
              deliveryOptions={deliveryOptions}
              orderDetails={orderDetails}
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
        activeTier={activeTier}
        total={total}
        savings={savings}
        upsell={upsell}
        expanded={cartOpen}
        setExpanded={setCartOpen}
        onRemove={removeItem}
        onContinue={() => {
          setCartOpen(false);
          jumpTo('.pf-list');
        }}
        onGoCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
          setTimeout(() => jumpTo('#pf-checkout'), 80);
        }}
        deliveryOptions={deliveryOptions}
        selectedSlot={formState.deliverySlot}
        onSelectSlot={(slot) => setFormState((current) => ({ ...current, deliverySlot: slot }))}
      />

      {toast ? <div className="pf-toast">{toast}</div> : null}

      {blocked ? (
        <div className="pf-blocked" role="alert">
          <div className="pf-blocked-card">
            <h2>No podemos continuar con tu pedido</h2>
            <p>
              Estamos teniendo un problema técnico y por ahora no podemos tomar pedidos. Disculpá las
              molestias, probá más tarde.
            </p>
          </div>
        </div>
      ) : null}

      {cart.length > 0 && !cartOpen && !checkoutOpen ? (
        <button
          type="button"
          className="pf-floating-cta"
          onClick={() => {
            setCartOpen(true);
            setTimeout(() => jumpTo('#pf-cart-anchor'), 80);
          }}
        >
          Ver pedido ({cart.length}) · {formatCurrency(total)} →
        </button>
      ) : null}
    </div>
  );
}
