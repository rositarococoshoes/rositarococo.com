const DELIVERY_DAY_NAMES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const DELIVERY_MONTH_NAMES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

const DEFAULT_CART_PRICING = {
  singlePrice: 70000,
  bundlePrice: 110000,
  bundleLabel: '$110.000',
};

const DEFAULT_THANK_YOU_ROUTES = {
  single: '/gracias-1par-c',
  bundle: '/gracias-2pares-c',
};

function resolvePricing(pricing = {}) {
  return {
    singlePrice: pricing.singlePrice ?? DEFAULT_CART_PRICING.singlePrice,
    bundlePrice: pricing.bundlePrice ?? DEFAULT_CART_PRICING.bundlePrice,
    bundleLabel: pricing.bundleLabel ?? DEFAULT_CART_PRICING.bundleLabel,
  };
}

export function formatWhatsappNumber(number) {
  if (!number) return '';

  let formatted = number.replace(/[\s\-()+]/g, '');

  if (/^549\d+$/.test(formatted)) return formatted;

  if (formatted.startsWith('54')) formatted = formatted.slice(2);
  if (formatted.startsWith('0')) formatted = formatted.slice(1);

  if (formatted.length > 2 && formatted.slice(2, 4) === '15') {
    formatted = `${formatted.slice(0, 2)}${formatted.slice(4)}`;
  } else if (formatted.startsWith('15')) {
    formatted = formatted.slice(2);
  }

  if (!/^\d+$/.test(formatted)) return '';

  return `549${formatted}`;
}

export function isValidWhatsappInput(number) {
  return formatWhatsappNumber(number).length >= 12;
}

export function calculateCartTotal(itemCount, pricing = DEFAULT_CART_PRICING) {
  const resolvedPricing = resolvePricing(pricing);
  if (itemCount <= 0) return 0;
  if (itemCount === 1) return resolvedPricing.singlePrice;
  return resolvedPricing.bundlePrice;
}

export function getCartPhase(itemCount) {
  if (itemCount <= 0) return 'empty';
  if (itemCount === 1) return 'single';
  return 'bundle';
}

export function getCartHeadline(itemCount) {
  if (itemCount <= 0) return 'Todavía no agregaste pares';
  if (itemCount === 1) return 'Tenés 1 de 2 pares';
  return 'Promo activada';
}

export function getPostAddMessage(itemCount, pricing = DEFAULT_CART_PRICING) {
  const resolvedPricing = resolvePricing(pricing);
  if (itemCount <= 1) {
    return `Agregaste 1 par al pedido. Sumá otro par y activá la promo de 2 pares por ${resolvedPricing.bundleLabel}.`;
  }
  return `Promo activada. Tu pedido quedó en 2 pares por ${resolvedPricing.bundleLabel} con envío gratis.`;
}

export function getThankYouRoute(itemCount, routes = DEFAULT_THANK_YOU_ROUTES) {
  return itemCount === 1 ? routes.single : routes.bundle;
}

export function buildOrderSummary(cart) {
  return cart.map((item) => `${item.size}-${item.productId}`).join(', ');
}

export function formatOrderDetails(cart, products) {
  const productMap = new Map(products.map((product) => [product.id, product.displayName]));
  return cart.map((item) => `Talle ${item.size} - ${productMap.get(item.productId) || item.productId}`).join(' | ');
}

export function buildLegacyOrderPayload(cart, products) {
  const productMap = new Map(products.map((product) => [product.id, product]));

  let pairCostTotal = 0;
  const legacyDetails = cart.map((item) => {
    const product = productMap.get(item.productId);
    const [modelKey = item.productId, colorKey = ''] = item.productId.split('-');

    let modelCode = item.productId;
    let unitCost = 16000;

    if (modelKey === 'roma') modelCode = '#4016';
    if (modelKey === 'venecia') modelCode = '#4015';

    pairCostTotal += unitCost;

    return `Talle: ${item.size} Modelo: ${modelCode} Color: ${colorKey || product?.displayName || item.productId}`;
  }).join(' || ');

  return { legacyDetails, pairCostTotal };
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function dateForIsoWeekday(date, targetIsoDay, weekOffset = 0) {
  const base = new Date(date);
  const currentIsoDay = ((base.getDay() + 6) % 7) + 1;
  const diff = targetIsoDay - currentIsoDay + weekOffset * 7;
  return addDays(base, diff);
}

function formatDeliveryDate(date) {
  return `${DELIVERY_DAY_NAMES[date.getDay()]} ${date.getDate()} de ${DELIVERY_MONTH_NAMES[date.getMonth()]} de 15hs a 22hs`;
}

export function getDeliveryOptions(now = new Date()) {
  const day = ((now.getDay() + 6) % 7) + 1;
  let availableDates = [];

  if (day === 1) {
    availableDates = [addDays(now, 3), dateForIsoWeekday(now, 2, 1)];
  } else if (day === 2) {
    availableDates = [addDays(now, 2), dateForIsoWeekday(now, 2, 1)];
  } else if (day >= 3 && day <= 6) {
    availableDates = [dateForIsoWeekday(now, 2, 1), dateForIsoWeekday(now, 4, 1)];
  } else {
    const hour = now.getHours();
    const minute = now.getMinutes();
    const isBeforeCutoff = hour < 12 || (hour === 12 && minute === 0);

    availableDates = isBeforeCutoff
      ? [addDays(now, 2), addDays(now, 4)]
      : [addDays(now, 4), dateForIsoWeekday(now, 2, 1)];
  }

  return availableDates.map(formatDeliveryDate);
}
