'use client';

import { useEffect, useState } from 'react';

import { PRODUCTS, PRODUCT_BY_ID, formatPerfumeLine } from './perfumes-previo-pago-data.js';

/**
 * Lee del localStorage el pedido que dejó el submit de la landing.
 *
 * Hace falta porque con precio por perfume el total ya no es un valor fijo
 * por cantidad: depende de cuáles perfumes eligió el cliente y de qué medio
 * de pago usó. Las páginas de gracias y de transferencia no pueden hardcodear
 * un total, así que lo leen de acá.
 *
 * Si el localStorage está vacío (el cliente entra por URL directa, o limpió
 * el navegador) devuelve null y cada página muestra su propio texto de
 * respaldo en vez de romper.
 */

const PRODUCT_BY_ID_MAP = PRODUCT_BY_ID || new Map(PRODUCTS.map((p) => [p.id, p]));

function readCart() {
  try {
    const raw = window.localStorage.getItem('ppOrderCart');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

function readNumber(key) {
  const value = Number(window.localStorage.getItem(key));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * @returns {{
 *   count: number, total: number, subtotal: number, discount: number,
 *   lines: Array<{ id: string, name: string, brand: string, line: string, price: number }>,
 *   customerName: string, paymentMethod: string, whatsapp: string
 * } | null}
 */
export function useLastOrder() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Si el localStorage está vacío, se arma igual el pedido desde los ids
    // sueltos que guardaba el funnel anterior, para que al menos se vea la
    // lista de perfumes aunque falten los precios.
    let lines = readCart();

    if (!lines) {
      const ids = (window.localStorage.getItem('rawProducts') || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (!ids.length) return;
      lines = ids
        .map((id) => {
          const product = PRODUCT_BY_ID_MAP.get(id);
          if (!product) return null;
          return {
            id: product.id,
            name: product.name,
            brand: product.brand,
            line: formatPerfumeLine(product),
            price: product.price,
          };
        })
        .filter(Boolean);
      if (!lines.length) return;
    }

    setOrder({
      lines,
      count: lines.length,
      total: readNumber('ppOrderTotal') || lines.reduce((s, l) => s + (l.price || 0), 0),
      subtotal: readNumber('ppOrderSubtotal') || lines.reduce((s, l) => s + (l.price || 0), 0),
      discount: Number(window.localStorage.getItem('ppOrderDiscount')) || 0,
      customerName: window.localStorage.getItem('customerName') || '',
      paymentMethod: window.localStorage.getItem('paymentMethod') || '',
      whatsapp: window.localStorage.getItem('rosita.whatsapp.prefill') || '',
    });
  }, []);

  return order;
}

export const PAYMENT_METHOD_LABEL = {
  tarjeta: 'Tarjeta de crédito o débito',
  mercadopago: 'Saldo MercadoPago',
  cbu: 'Transferencia bancaria',
};

/** Mensaje de WhatsApp con el detalle del pedido. */
export function buildWhatsappMessage(order, extra = '') {
  const lines = order ? order.lines.map((l) => l.line).join(' | ') : 'ver pedido en la web';
  const greeting = order?.customerName ? `Hola, soy ${order.customerName}.` : 'Hola.';
  const method = order?.paymentMethod
    ? `\nMedio de pago: ${PAYMENT_METHOD_LABEL[order.paymentMethod] || order.paymentMethod}`
    : '';
  return [
    greeting,
    `Detalle del pedido: ${lines}`,
    order ? `Total a pagar: $${order.total.toLocaleString('es-AR')}` : '',
    method,
    extra,
  ]
    .filter(Boolean)
    .join('\n');
}