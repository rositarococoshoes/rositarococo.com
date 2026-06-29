import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateCartTotal,
  formatWhatsappNumber,
  getCartHeadline,
  getCartPhase,
  getDeliveryOptions,
  getPostAddMessage,
  getThankYouRoute,
  isValidWhatsappInput,
} from '../src/lib/funnel-utils.js';

const PREVIO_PAGO_PRICING = {
  singlePrice: 87500,
  bundlePrice: 137500,
  bundleLabel: '$137.500',
};

test('formats argentina whatsapp numbers to 549 format', () => {
  assert.equal(formatWhatsappNumber('11 5645-7057'), '5491156457057');
  assert.equal(formatWhatsappNumber('5491156457057'), '5491156457057');
  assert.equal(formatWhatsappNumber('011-15-5645-7057'), '5491156457057');
  // Area codes with 3 digits (e.g., 341 for Rosario)
  assert.equal(formatWhatsappNumber('3415208671'), '5493415208671');
  assert.equal(formatWhatsappNumber('03415208671'), '5493415208671');
  assert.equal(formatWhatsappNumber('341 15 520-8671'), '5493415208671');
  // Area codes with 4 digits (e.g., 379 for Puerto Iguazú)
  assert.equal(formatWhatsappNumber('379154001234'), '549379154001234');
  assert.equal(formatWhatsappNumber('0379154001234'), '549379154001234');
});

test('rejects invalid whatsapp values', () => {
  assert.equal(formatWhatsappNumber('abc'), '');
  assert.equal(isValidWhatsappInput('abc'), false);
  assert.equal(isValidWhatsappInput('11 5645 7057'), true);
});

test('calculates contrareembolso totals for current funnel', () => {
  assert.equal(calculateCartTotal(0), 0);
  assert.equal(calculateCartTotal(1), 70000);
  assert.equal(calculateCartTotal(2), 110000);
});

test('calculates previo pago totals with custom pricing', () => {
  assert.equal(calculateCartTotal(0, PREVIO_PAGO_PRICING), 0);
  assert.equal(calculateCartTotal(1, PREVIO_PAGO_PRICING), 87500);
  assert.equal(calculateCartTotal(2, PREVIO_PAGO_PRICING), 137500);
});

test('derives cart-first phase from item count', () => {
  assert.equal(getCartPhase(0), 'empty');
  assert.equal(getCartPhase(1), 'single');
  assert.equal(getCartPhase(2), 'bundle');
});

test('builds cart headline copy for each phase', () => {
  assert.equal(getCartHeadline(0), 'Todavía no agregaste pares');
  assert.equal(getCartHeadline(1), '1 par agregado');
  assert.equal(getCartHeadline(2), '2 pares agregados');
});

test('builds post-add feedback for first and second pair', () => {
  assert.equal(getPostAddMessage(1), 'Agregaste 1 par al pedido. Sumá otro par y activá la promo de 2 pares por $110.000.');
  assert.equal(getPostAddMessage(2), 'Promo activada. Tu pedido quedó en 2 pares por $110.000 con envío gratis.');
});

test('builds post-add feedback for previo pago pricing', () => {
  assert.equal(getPostAddMessage(1, PREVIO_PAGO_PRICING), 'Agregaste 1 par al pedido. Sumá otro par y activá la promo de 2 pares por $137.500.');
  assert.equal(getPostAddMessage(2, PREVIO_PAGO_PRICING), 'Promo activada. Tu pedido quedó en 2 pares por $137.500 con envío gratis.');
});

test('resolves thank-you route from pair count', () => {
  assert.equal(getThankYouRoute(1), '/gracias-1par-c');
  assert.equal(getThankYouRoute(2), '/gracias-2pares-c');
});

test('resolves thank-you route for previo pago funnel', () => {
  assert.equal(getThankYouRoute(1, { single: '/gracias-1par', bundle: '/gracias-2pares' }), '/gracias-1par');
  assert.equal(getThankYouRoute(2, { single: '/gracias-1par', bundle: '/gracias-2pares' }), '/gracias-2pares');
});

test('builds sunday delivery options before cutoff', () => {
  const options = getDeliveryOptions(new Date('2026-03-22T11:30:00-03:00'));
  assert.equal(options.length, 2);
  assert.match(options[0], /^Martes /);
  assert.match(options[1], /^Jueves /);
});

test('builds sunday delivery options after cutoff', () => {
  const options = getDeliveryOptions(new Date('2026-03-22T12:30:00-03:00'));
  assert.equal(options.length, 2);
  assert.match(options[0], /^Martes /);
  assert.match(options[1], /^Jueves /);
});

test('replaces jueves 9 de julio with sábado 11 de julio (independence day holiday)', () => {
  // On Wednesday July 1, the second option would normally be Thursday July 9
  // but gets overridden to Saturday July 11
  const options = getDeliveryOptions(new Date('2026-07-01T10:00:00-03:00'));
  assert.equal(options.length, 2);
  assert.match(options[0], /^Martes 7 de julio/);
  assert.equal(options[1], 'Sábado 11 de julio de 15hs a 22hs');
});

test('does not affect dates after the holiday passes', () => {
  // On Wednesday July 8, delivery options are Tuesday July 14 and Thursday July 16
  const options = getDeliveryOptions(new Date('2026-07-08T10:00:00-03:00'));
  assert.equal(options.length, 2);
  assert.match(options[0], /^Martes /);
  assert.match(options[1], /^Jueves /);
  assert.ok(!options[1].includes('Sábado'));
});
