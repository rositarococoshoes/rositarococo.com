import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateCartTotal,
  formatWhatsappNumber,
  getDeliveryOptions,
  getThankYouRoute,
  isValidWhatsappInput,
} from '../src/lib/funnel-utils.js';

test('formats argentina whatsapp numbers to 549 format', () => {
  assert.equal(formatWhatsappNumber('11 5645-7057'), '5491156457057');
  assert.equal(formatWhatsappNumber('5491156457057'), '5491156457057');
  assert.equal(formatWhatsappNumber('011-15-5645-7057'), '5491156457057');
});

test('rejects invalid whatsapp values', () => {
  assert.equal(formatWhatsappNumber('abc'), '');
  assert.equal(isValidWhatsappInput('abc'), false);
  assert.equal(isValidWhatsappInput('11 5645 7057'), true);
});

test('calculates contrareembolso totals for current funnel', () => {
  assert.equal(calculateCartTotal(0), 0);
  assert.equal(calculateCartTotal(1), 55000);
  assert.equal(calculateCartTotal(2), 85000);
});

test('resolves thank-you route from pair count', () => {
  assert.equal(getThankYouRoute(1), '/gracias-1par-c');
  assert.equal(getThankYouRoute(2), '/gracias-2pares-c');
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
  assert.match(options[0], /^Jueves /);
  assert.match(options[1], /^Martes /);
});
