import {
  CBU_ROUTE,
  PRICING,
  PRODUCTS,
  PRODUCT_BY_ID,
  THANK_YOU_ROUTE,
  discountFor,
  formatPerfumeLine,
  priceOf,
} from './perfumes-previo-pago-data.js';

/** Los ids del carrito, en el orden en que los eligió el cliente. */
export function productIdsOf(cart) {
  return cart.map((item) => item.productId);
}

/**
 * Subtotal: la suma de los precios de cada perfume, sin discounts.
 * Con transferencia el precio de cada unidad ya viene con el 10% menos.
 */
export function calculateSubtotal(cart, paymentMethod = 'tarjeta') {
  return cart.reduce((sum, item) => {
    const product = PRODUCT_BY_ID.get(item.productId);
    return sum + priceOf(product, paymentMethod);
  }, 0);
}

/**
 * Total a cobrar: subtotal menos el descuento fijo por cantidad.
 *
 * El descuento se aplica ANTES del 10% de la transferencia, igual que en el
 * funnel de calzados: ahí el precio de cada escalón ya venía con el CBU y el
 * 10% se aplicaba sobre ese total.
 */
export function calculateTotal(cart, paymentMethod = 'tarjeta') {
  const subtotal = calculateSubtotal(cart, paymentMethod);
  if (!cart.length) return 0;
  return Math.max(0, subtotal - discountFor(cart.length));
}

/**
 * Cuánto se ahorra pagar por transferencia en vez de con tarjeta.
 *
 * Existe porque el 10% se aplica en el precio de cada perfume y no en el
 * total: si solo se mostrara el total ya descontado, no se vería que el
 * descuento se aplicó (se quejó Roxana el 13/10/2026). Con esta función el
 * checkout puede mostrar el precio con tarjeta y la diferencia como una
 * línea propia.
 *
 * Da 0 cuando el medio de pago no es transferencia, para que la línea se
 * pueda ocultar sin cambiar el markup.
 */
export function cbuSavingsFor(cart, paymentMethod = 'tarjeta') {
  if (paymentMethod !== 'cbu') return 0;
  return Math.max(0, calculateSubtotal(cart, 'tarjeta') - calculateSubtotal(cart, 'cbu'));
}

export function getPhase(count) {
  if (count <= 0) return 'empty';
  if (count === 1) return 'single';
  if (count === 2) return 'pair';
  return 'trio';
}

export function getHeadline(count) {
  if (count <= 0) return 'Todavía no agregaste perfumes';
  if (count === 1) return '1 perfume en tu pedido';
  return `${count} perfumes en tu pedido`;
}

const money = (value) => `$${value.toLocaleString('es-AR')}`;

/**
 * Al agregar, el mensaje empuja al siguiente escalón mencionando el descuento
 * fijo que se activa, que es lo que el cliente gana.
 */
export function getPostAddMessage(count) {
  if (count <= 0) return '';
  if (count === 1) {
    return `Agregaste 1 perfume. Sumá otro y te descontamos ${money(PRICING.cartDiscounts[2])}.`;
  }
  if (count === 2) {
    return `Descontamos ${money(PRICING.cartDiscounts[2])}. Sumá el tercero y el descuento sube a ${money(
      PRICING.cartDiscounts[3],
    )}.`;
  }
  return `Descuento de ${money(PRICING.cartDiscounts[3])} aplicado. Es el mejor precio por perfume.`;
}

export function getUpsell(count) {
  if (count >= PRICING.maxItems) return null;
  if (count === 0) {
    return { title: 'Elegí tu primer perfume', sub: 'Sumá un segundo y te descontamos $10.000' };
  }
  if (count === 1) {
    return {
      title: '+ Sumá un perfume más',
      sub: `Te descontamos ${money(PRICING.cartDiscounts[2])} del total`,
    };
  }
  return {
    title: '+ Sumá el tercero',
    sub: `Tu descuento sube a ${money(PRICING.cartDiscounts[3])}`,
  };
}

/** Texto del descuento que se aplica, listo para mostrar. */
export function getDiscountLabel(count) {
  const value = discountFor(count);
  return value > 0 ? `−${money(value)}` : '';
}

/**
 * El descuento es fijo, así que el porcentaje real depende de qué perfumes
 * se compren. Solo tiene sentido mostrarlo cuando es al menos 3%.
 */
export function getDiscountPercent(cart, paymentMethod = 'tarjeta') {
  const subtotal = calculateSubtotal(cart, paymentMethod);
  const value = discountFor(cart.length);
  if (!subtotal || !value) return 0;
  return (value / subtotal) * 100;
}

/**
 * Ya no hay una ruta por cantidad: el total depende de qué perfumes eligió el
 * cliente, así que las páginas finales lo leen del localStorage del pedido.
 */
export const getThankYouRoute = () => THANK_YOU_ROUTE;
export const getCbuRoute = () => CBU_ROUTE;

export function buildOrderSummary(cart) {
  return productIdsOf(cart).join(', ');
}

export function formatOrderDetails(cart) {
  return cart
    .map((item) => formatPerfumeLine(PRODUCT_BY_ID.get(item.productId) || { name: item.productId }))
    .join(' | ');
}

/** Campo de detalle legado: id legible + nombre, para matchear en la planilla. */
export function buildLegacyPayload(cart) {
  return {
    legacyDetails: cart
      .map((item) => {
        const product = PRODUCT_BY_ID.get(item.productId);
        return `Perfume: ${item.productId} - ${formatPerfumeLine(product)}`;
      })
      .join(' || '),
    /** Costo de reposición del pedido, para calcular margen en el backend. */
    costTotal: cart.reduce(
      (sum, item) => sum + (PRODUCT_BY_ID.get(item.productId)?.cost || 0),
      0,
    ),
  };
}

/** Precio de cada perfume del carrito, para el resumen de las páginas finales. */
export function describeCart(cart, paymentMethod = 'tarjeta') {
  return cart.map((item) => {
    const product = PRODUCT_BY_ID.get(item.productId);
    if (!product) return null;
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      line: formatPerfumeLine(product),
      price: priceOf(product, paymentMethod),
    };
  });
}

export { PRODUCTS };