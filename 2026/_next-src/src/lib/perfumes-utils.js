// Import relativo (y no alias @/) a propósito: permite que `node --test` cargue
// este módulo sin configurar el resolver de Next.js.
import { PRICING, formatPerfumeLine } from './perfumes-data.js';

/**
 * Precio del pedido según cuántas unidades hay en el carrito.
 * La promo es escalonada y plana: 1 = 40.000, 2 = 65.000, 3 = 80.000.
 */
export function calculatePerfumeTotal(itemCount, pricing = PRICING) {
  if (itemCount <= 0) return 0;
  if (itemCount === 1) return pricing.single;
  if (itemCount === 2) return pricing.pair;
  return pricing.trio;
}

export function getPerfumePhase(itemCount) {
  if (itemCount <= 0) return 'empty';
  if (itemCount === 1) return 'single';
  if (itemCount === 2) return 'pair';
  return 'trio';
}

export function getPerfumeHeadline(itemCount) {
  if (itemCount <= 0) return 'Todavía no agregaste perfumes';
  if (itemCount === 1) return '1 perfume en tu pedido';
  return `${itemCount} perfumes en tu pedido`;
}

const TIER_LABELS = {
  single: '$40.000',
  pair: '$65.000',
  trio: '$80.000',
};

/**
 * Mensaje que se muestra al agregar. En 1 y 2 unidades el objetivo es empujar
 * al escalón siguiente, así que siempre dice cuánto falta y qué se gana.
 */
export function getPerfumePostAddMessage(itemCount, pricing = PRICING) {
  if (itemCount <= 0) return '';
  if (itemCount === 1) {
    return `Agregaste 1 perfume. Sumá uno más y activá la promo de 2 por ${TIER_LABELS.pair}.`;
  }
  if (itemCount === 2) {
    return `Promo de 2 activada. Sumá el tercero y llevás 3 por ${TIER_LABELS.trio}.`;
  }
  return `Pedido completo: 3 perfumes por ${pricing.trio.toLocaleString('es-AR')} es el mejor precio.`;
}

/** Qué sigue si el carrito todavía tiene lugar. `null` cuando ya está lleno. */
export function getPerfumeUpsell(itemCount, pricing = PRICING) {
  if (itemCount >= pricing.maxItems) return null;
  if (itemCount === 0) {
    return {
      title: 'Elegí tu primer perfume',
      sub: `1 por ${TIER_LABELS.single} · 3 por ${TIER_LABELS.trio}`,
    };
  }
  if (itemCount === 1) {
    return {
      title: '+ Sumá un perfume más',
      sub: `Pasás de ${TIER_LABELS.single} a ${TIER_LABELS.pair} por el total`,
    };
  }
  return {
    title: '+ Sumá el tercero',
    sub: `Tu pedido pasa de ${TIER_LABELS.pair} a ${TIER_LABELS.trio}`,
  };
}

const TIER_SAVINGS = {
  pair: PRICING.single * 2 - PRICING.pair,
  trio: PRICING.single * 3 - PRICING.trio,
};

export function getPerfumeSavingsLabel(itemCount) {
  const phase = getPerfumePhase(itemCount);
  const amount = TIER_SAVINGS[phase];
  return amount ? `AHORRÁS $${amount.toLocaleString('es-AR')}` : '';
}

/** Cantidad de unidades que corresponde a la fase del carrito. */
export function getPerfumeActiveTierCount(itemCount) {
  return itemCount <= 0 ? 0 : itemCount;
}

export function getPerfumeThankYouRoute(itemCount) {
  if (itemCount === 1) return '/gracias-perfumes-1';
  if (itemCount === 2) return '/gracias-perfumes-2';
  return '/gracias-perfumes-3';
}

/** Ids sueltos, para el campo de resumen de productos del formulario. */
export function buildPerfumeOrderSummary(cart) {
  return cart.map((item) => item.productId).join(', ');
}

/** "Arabians Tonka (Montale) - Unisex | Yara (Lattafa) - Femenino" */
export function formatPerfumeOrderDetails(cart, products) {
  const productMap = new Map(products.map((product) => [product.id, product]));
  return cart
    .map((item) => formatPerfumeLine(productMap.get(item.productId) || { name: item.productId }))
    .join(' | ');
}

/**
 * Campo de detalle legado del formulario de Google. El funnel de calzados
 * escribía "Talle: X Modelo: #4016 Color: Y"; acá va el perfume con su id
 * (para poder matchear en la planilla) y el nombre legible.
 */
export function buildPerfumeLegacyPayload(cart, products, pricing = PRICING) {
  const productMap = new Map(products.map((product) => [product.id, product]));
  const legacyDetails = cart
    .map((item) => {
      const product = productMap.get(item.productId);
      return `Perfume: ${item.productId} - ${formatPerfumeLine(product)}`;
    })
    .join(' || ');

  return {
    legacyDetails,
    pairCostTotal: cart.length * pricing.unitCost,
  };
}
