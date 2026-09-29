// Import relativo (y no alias @/) para que `node --test` lo pueda cargar.
import { AR_AREA_CODES } from './ar-area-codes.js';

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

/**
 * Parte un número nacional en código de área y suscriptor, y saca el "15" de
 * celular que va justo después del código.
 *
 * Busca primero el código más largo (4, luego 3, luego 2) porque es la única
 * forma de resolver el caso ambiguo: "379154001234" es 3791 + 54001234
 * (Puerto Iguazú, sin 15), no 379 + 15 + 4001234.
 *
 * Devuelve `null` si el código de área no está en la lista. El llamador decide
 * qué hacer; no se toca el número para no deformar uno que antes funcionaba.
 */
function splitNationalNumber(digits) {
  for (const length of [4, 3, 2]) {
    if (digits.length <= length) continue;

    const areaCode = digits.slice(0, length);
    if (!AR_AREA_CODES.has(areaCode)) continue;

    let subscriber = digits.slice(length);
    // el 15 es móvil solo si todavía queda un abonado razonable detrás
    if (subscriber.startsWith('15') && subscriber.length - 2 >= 6) {
      subscriber = subscriber.slice(2);
    }

    return { areaCode, subscriber };
  }

  return null;
}

export function formatWhatsappNumber(number) {
  if (!number) return '';

  // solo dígitos: la gente escribe espacios, guiones, paréntesis y el "+"
  let digits = String(number).replace(/\D/g, '');
  if (!digits) return '';

  // trunksis: 011, 0341, 03791... (varios ceros por si wrote 0011)
  digits = digits.replace(/^0+/, '');
  if (!digits) return '';

  // ya viene en formato internacional
  if (digits.startsWith('549') && digits.length >= 12) return digits;

  // código de país sin el 9 de móvil
  if (digits.startsWith('54') && digits.length >= 11) digits = digits.slice(2);

  const split = splitNationalNumber(digits);

  let national;
  if (split) {
    national = split.areaCode + split.subscriber;
  } else {
    // Código de área desconocido: no se toca el 15 (comportamiento previo).
    // Solo se quita si viniera al principio, que es el caso de quien escribe
    // "15 5645-7057" sin el código de área.
    national = digits.startsWith('15') ? digits.slice(2) : digits;
  }

  if (national.length < 10) return '';

  return `549${national}`;
}

export function isValidWhatsappInput(number) {
  return formatWhatsappNumber(number).length >= 12;
}

const BLOCKED_WHATSAPP_NUMBERS = ['1141902122'];

export function isBlockedWhatsappNumber(rawNumber) {
  if (!rawNumber) return false;
  const digits = String(rawNumber).replace(/\D/g, '');
  return BLOCKED_WHATSAPP_NUMBERS.some((blocked) => digits.includes(blocked));
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
  if (itemCount === 1) return '1 par agregado';
  return '2 pares agregados';
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

const HOLIDAY_OVERRIDES = {
  // 9 de julio (Día de la Independencia Argentina, feriado) → sábado 11
  '7-9': { month: 6, day: 11 },
};

function adjustForHolidays(date) {
  const key = `${date.getMonth() + 1}-${date.getDate()}`;
  const override = HOLIDAY_OVERRIDES[key];
  if (override) {
    const adjusted = new Date(date);
    adjusted.setMonth(override.month);
    adjusted.setDate(override.day);
    return adjusted;
  }
  return date;
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
      : [dateForIsoWeekday(now, 2, 1), addDays(now, 4)];
  }

  return availableDates.map((date) => formatDeliveryDate(adjustForHolidays(date)));
}
