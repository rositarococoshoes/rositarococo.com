import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildWhatsappSavePayload,
  buildWhatsappValidationPayload,
  persistWhatsappCapture,
  shouldOpenWhatsappModal,
} from '../src/lib/whatsapp-modal-utils.js';

test('buildWhatsappValidationPayload formats the number for the legacy validator', () => {
  assert.deepEqual(
    buildWhatsappValidationPayload('11 5635-7051'),
    { whatsapp_check: '5491156357051' },
  );
});

test('buildWhatsappSavePayload matches the legacy modal payload shape', () => {
  assert.deepEqual(
    buildWhatsappSavePayload({
      whatsappNumber: '11 5635-7051',
      source: 'modal_whatsapp_contrareembolso',
      url: 'https://rositarococo.com/2026/index-contrareembolso.html',
      timestamp: '2026-03-26T16:30:00.000Z',
    }),
    {
      whatsapp: '5491156357051',
      timestamp: '2026-03-26T16:30:00.000Z',
      source: 'modal_whatsapp_contrareembolso',
      url: 'https://rositarococo.com/2026/index-contrareembolso.html',
    },
  );
});

test('persistWhatsappCapture writes the same storage keys expected by the legacy funnels', () => {
  const writes = [];
  const storage = {
    setItem(key, value) {
      writes.push([key, value]);
    },
  };

  persistWhatsappCapture(storage, '5491156357051');

  assert.deepEqual(writes, [
    ['savedWhatsapp', '5491156357051'],
    ['whatsappModalShown', 'true'],
    ['rosita.whatsapp.prefill', '5491156357051'],
  ]);
});

test('shouldOpenWhatsappModal only opens after a pair is added and when it was not already shown', () => {
  assert.equal(shouldOpenWhatsappModal({ cartCount: 0, modalAlreadyShown: false }), false);
  assert.equal(shouldOpenWhatsappModal({ cartCount: 1, modalAlreadyShown: true }), false);
  assert.equal(shouldOpenWhatsappModal({ cartCount: 1, modalAlreadyShown: false }), true);
});
