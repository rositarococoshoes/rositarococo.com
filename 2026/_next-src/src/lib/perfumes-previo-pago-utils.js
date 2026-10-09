import { PRICING, formatPerfumeLine, priceFor, tierFor } from './perfumes-previo-pago-data.js';

/** Precio del carrito según medio de pago. Sin método elegido, precio online. */
export function calculateTotal(itemCount, paymentMethod = 'tarjeta') {
  if (itemCount <= 0) return 0;
  return priceFor(Math.min(itemCount, PRICING.maxItems), paymentMethod);
}

export function getPhase(itemCount) {
  if (itemCount <= 0) return 'empty';
  if (itemCount === 1) return 'single';
  if (itemCount === 2) return 'pair';
  return 'trio';
}

export function getHeadline(itemCount) {
  if (itemCount <= 0) return 'Todavía no agregaste perfumes';
  if (itemCount === 1) return '1 perfume en tu pedido';
  return `${itemCount} perfumes en tu pedido`;
}

const TIER_LABEL = Object.fromEntries(PRICING.tiers.map((t) => [t.count, `$${t.price.toLocaleString('es-AR')}`]));

/**
 * Al agregar, el mensaje empuja al siguiente escalón. El precio que se menciona
 * es el de pago online: si después elige transferencia, el total baja un 10% más.
 */
export function getPostAddMessage(itemCount) {
  if (itemCount <= 0) return '';
  if (itemCount === 1) {
    return `Agregaste 1 perfume. Sumá otro y activá la promo de 2 por ${TIER_LABEL[2]}.`;
  }
  if (itemCount === 2) {
    return `Promo de 2 activada por ${TIER_LABEL[2]}. Sumá el tercero y llevá 3 por ${TIER_LABEL[3]}.`;
  }
  return `Pedido completo: 3 perfumes por ${TIER_LABEL[3]}, el mejor precio por unidad.`;
}

export function getUpsell(itemCount) {
  if (itemCount >= PRICING.maxItems) return null;
  if (itemCount === 0) return { title: 'Elegí tu primer perfume', sub: `1 por ${TIER_LABEL[1]} · 3 por ${TIER_LABEL[3]}` };
  if (itemCount === 1) return { title: '+ Sumá un perfume más', sub: `Pasás de ${TIER_LABEL[1]} a ${TIER_LABEL[2]}` };
  return { title: '+ Sumá el tercero', sub: `Tu pedido pasa de ${TIER_LABEL[2]} a ${TIER_LABEL[3]}` };
}

/** Cuánto se ahorra contra comprar las unidades sueltas. */
export function getSavingsLabel(itemCount) {
  const tier = tierFor(itemCount);
  if (itemCount <= 1) return '';
  const solo = PRICING.unitPrice * itemCount;
  const saving = solo - tier.price;
  return saving > 0 ? `AHORRÁS $${saving.toLocaleString('es-AR')}` : '';
}

export function getThankYouRoute(itemCount) {
  if (itemCount === 1) return '/gracias-perfumes-pp-1';
  if (itemCount === 2) return '/gracias-perfumes-pp-2';
  return '/gracias-perfumes-pp-3';
}

/** Ruta de la página de datos bancarios, para quien paga por transferencia. */
export function getCbuRoute(itemCount) {
  if (itemCount === 1) return '/transferenciacbu-perfumes-pp-1';
  if (itemCount === 2) return '/transferenciacbu-perfumes-pp-2';
  return '/transferenciacbu-perfumes-pp-3';
}

export function buildOrderSummary(cart) {
  return cart.map((item) => item.productId).join(', ');
}

export function formatOrderDetails(cart, products) {
  const map = new Map(products.map((p) => [p.id, p]));
  return cart.map((item) => formatPerfumeLine(map.get(item.productId) || { name: item.productId })).join(' | ');
}

/** Campo de detalle legado: id legible + nombre, para matchear en la planilla. */
export function buildLegacyPayload(cart, products) {
  const map = new Map(products.map((p) => [p.id, p]));
  return {
    legacyDetails: cart
      .map((item) => `Perfume: ${item.productId} - ${formatPerfumeLine(map.get(item.productId))}`)
      .join(' || '),
    pairCostTotal: cart.length * PRICING.unitCost,
  };
}