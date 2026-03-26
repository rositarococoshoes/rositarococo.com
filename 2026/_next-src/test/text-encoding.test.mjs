import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const MOJIBAKE_PATTERN = /Ã|Â|�/;
const FILES = [
  'C:/rosita/rositarococo.com/2026/_next-src/src/lib/funnel-data.js',
  'C:/rosita/rositarococo.com/2026/_next-src/src/lib/previo-pago-data.js',
];
const CUSTOMER_COPY_FILES = [
  'C:/rosita/rositarococo.com/2026/_next-src/src/components/ContrareembolsoLanding.js',
  'C:/rosita/rositarococo.com/2026/_next-src/src/components/ThankYouClient.js',
  'C:/rosita/rositarococo.com/2026/_next-src/src/components/DeferredChatWidget.js',
  'C:/rosita/rositarococo.com/2026/_next-src/src/components/PrevioPagoLanding.js',
];
const DISALLOWED_COPY = [
  'Codigo postal',
  'Seleccion:',
  'Dia y hora de entrega:',
  '<legend>Contrareembolso</legend>',
  '["$","strong",null,{"children":"Contrareembolso"}]',
  'contrareembolso que recién hice',
  'Si quieres',
  'Puedes continuar la compra',
];

for (const filePath of FILES) {
  test(`source copy in ${filePath.split('/').at(-1)} does not contain mojibake`, () => {
    const contents = readFileSync(filePath, 'utf8');
    assert.equal(MOJIBAKE_PATTERN.test(contents), false);
  });
}

for (const filePath of CUSTOMER_COPY_FILES) {
  test(`customer-facing copy in ${filePath.split('/').at(-1)} keeps corrected accents and spelling`, () => {
    const contents = readFileSync(filePath, 'utf8');
    for (const snippet of DISALLOWED_COPY) {
      assert.equal(contents.includes(snippet), false, `Found disallowed copy snippet "${snippet}" in ${filePath}`);
    }
  });
}
