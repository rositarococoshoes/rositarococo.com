import test from 'node:test';
import assert from 'node:assert/strict';

import {
  PRODUCTS,
  PRICING,
  FAMILY_LABEL,
  GENDER_LABEL,
  PAYMENT_METHODS,
  PROVINCES,
  priceFor,
  tierFor,
} from '../src/lib/perfumes-previo-pago-data.js';
import {
  calculateTotal,
  getCbuRoute,
  getPostAddMessage,
  getSavingsLabel,
  getThankYouRoute,
  getUpsell,
} from '../src/lib/perfumes-previo-pago-utils.js';

// ------------------------------------------------------------------ precios

test('los precios de previo pago son el doble de 1,25 del contrarreembolso', () => {
  // La proporción sale del funnel de calzados: 87.500/70.000 = 1,25.
  // Contra los $40.000 del contrarreembolsto da $50.000 justos.
  assert.equal(PRICING.tiers[0].price, 50000);
  assert.equal(PRICING.tiers[2].price, 100000);
  // El de 2 da 81.250 exacto y se redondeó a 80.000 a pedido del usuario.
  assert.equal(PRICING.tiers[1].price, 80000);
  assert.notEqual(PRICING.tiers[1].price, Math.round(65000 * 1.25));
});

test('la transferencia banca tiene 10% OFF, como en calzados', () => {
  // En zapatos: 87.500 x 0,9 = 78.750
  assert.equal(priceFor(1, 'cbu'), 45000);
  assert.equal(priceFor(2, 'cbu'), 72000);
  assert.equal(priceFor(3, 'cbu'), 90000);
  for (const count of [1, 2, 3]) {
    const online = priceFor(count, 'tarjeta');
    assert.ok(priceFor(count, 'cbu') < online, `el CBU de ${count} no es más barato`);
  }
  assert.equal(priceFor(1, 'mercadopago'), priceFor(1, 'tarjeta'));
});

test('el total del carrito depende del medio de pago', () => {
  assert.equal(calculateTotal(0, 'tarjeta'), 0);
  assert.equal(calculateTotal(2, 'tarjeta'), 80000);
  assert.equal(calculateTotal(2, 'cbu'), 72000);
  // nunca más de 3 unidades
  assert.equal(calculateTotal(9, 'tarjeta'), calculateTotal(3, 'tarjeta'));
});

test('el ahorro se calcula contra comprar las unidades sueltas', () => {
  assert.equal(getSavingsLabel(1), '');
  assert.equal(getSavingsLabel(2), 'AHORRÁS $20.000'); // 2x50.000 - 80.000
  assert.equal(getSavingsLabel(3), 'AHORRÁS $50.000'); // 3x50.000 - 100.000
});

test('agregar un perfume empuja al siguiente escalón', () => {
  assert.match(getPostAddMessage(1), /80\.000/);
  assert.match(getPostAddMessage(2), /100\.000/);
  assert.equal(getUpsell(3), null, 'con 3 ya no hay lugar para otro');
  assert.ok(getUpsell(0));
  assert.ok(getUpsell(2));
});

test('cada cantidad tiene su ruta de gracias y de transferencia', () => {
  assert.equal(getThankYouRoute(1), '/gracias-perfumes-pp-1');
  assert.equal(getThankYouRoute(3), '/gracias-perfumes-pp-3');
  assert.equal(getCbuRoute(1), '/transferenciacbu-perfumes-pp-1');
  assert.equal(getCbuRoute(3), '/transferenciacbu-perfumes-pp-3');
});

// ------------------------------------------------------------------ catálogo

test('el catálogo tiene los 61 perfumes del Excel', () => {
  assert.equal(PRODUCTS.length, 61);
  assert.equal(new Set(PRODUCTS.map((p) => p.id)).size, 61, 'hay ids repetidos');
});

test('todo perfume tiene lo que la tarjeta dibuja', () => {
  for (const p of PRODUCTS) {
    assert.ok(p.name, `${p.id} sin nombre`);
    assert.ok(p.brand, `${p.id} sin marca`);
    assert.ok(GENDER_LABEL[p.gender], `${p.id} con genero invalido: ${p.gender}`);
    assert.ok(FAMILY_LABEL[p.family], `${p.id} con familia invalida: ${p.family}`);
    assert.ok(p.description?.length > 20, `${p.id} sin notas`);
    assert.ok(p.presentation?.length > 3, `${p.id} sin presentacion`);
    assert.ok(Array.isArray(p.images) && p.images.length >= 1, `${p.id} sin fotos`);
    for (const img of p.images) {
      assert.match(img, /^\/2026\/assets\/perfumes-previo-pago\//, `${p.id} con foto fuera de la carpeta`);
    }
  }
});

test('los 5 perfumes con dos fotos tienen las dos en la ficha', () => {
  // El Excel repite 3 productos en dos filas distintas (Club de Nuit Sillage,
  // 9AM, 9AM Pour Femme) y 2 más traen 2 ángulos. Todas deben quedar cargadas.
  const multi = PRODUCTS.filter((p) => p.images.length > 1);
  assert.equal(multi.length, 5);
  for (const p of multi) {
    assert.ok(p.images.length >= 2, `${p.id} deberia tener 2 fotos`);
    assert.equal(new Set(p.images).size, p.images.length, `${p.id} repite la misma foto`);
  }
});

test('el genero y la familia cubren todo el catálogo', () => {
  const genders = new Set(PRODUCTS.map((p) => p.gender));
  assert.deepEqual([...genders].sort(), ['femenino', 'masculino', 'unisex']);

  const families = new Set(PRODUCTS.map((p) => p.family));
  assert.equal(families.size, 5, 'las 5 familias del filtro tienen que tener productos');
  for (const f of families) {
    assert.ok(FAMILY_LABEL[f], `falta la etiqueta de la familia ${f}`);
  }
  for (const g of genders) assert.ok(GENDER_LABEL[g], `falta la etiqueta de ${g}`);
});

test('los tres generos tienen conteos consistentes con los filtros', () => {
  const counts = PRODUCTS.reduce((acc, p) => ({ ...acc, [p.gender]: (acc[p.gender] || 0) + 1 }), {});
  assert.equal(counts.unisex + counts.femenino + counts.masculino, PRODUCTS.length);
  assert.ok(counts.masculino > 0 && counts.femenino > 0 && counts.unisex > 0);
});

test('el filtro de familia nunca queda vacio en ningun genero combinado', () => {
  for (const g of ['unisex', 'femenino', 'masculino']) {
    const enGenero = PRODUCTS.filter((p) => p.gender === g);
    const familias = new Set(enGenero.map((p) => p.family));
    assert.ok(familias.size >= 2, `${g} tiene una sola familia: el filtro quedaria inutil`);
  }
});

// ------------------------------------------------------- medios de pago

test('hay tres medios de pago y todos se pueden elegir', () => {
  assert.deepEqual(PAYMENT_METHODS.map((m) => m.value), ['tarjeta', 'mercadopago', 'cbu']);
  for (const m of PAYMENT_METHODS) {
    assert.ok(m.label?.length > 5, `${m.value} sin etiqueta`);
    assert.ok(m.helper?.length > 10, `${m.value} sin ayuda`);
  }
});

test('el envio es a todo el pais, no solo a CABA y GBA', () => {
  // El previo pago de calzados va a todo el país, y así se definió para perfumes.
  assert.ok(PROVINCES.length >= 20, 'faltan provincias');
  assert.ok(PROVINCES.includes('Córdoba'));
  assert.ok(PROVINCES.includes('Mendoza'));
  assert.ok(PROVINCES.includes('Buenos Aires'));
  for (const p of PROVINCES) assert.ok(!p.includes('?'), `provincia con encoding roto: ${p}`);
});

test('tierFor recorta al máximo de unidades', () => {
  assert.equal(tierFor(0).price, 50000);
  assert.equal(tierFor(3).price, 100000);
  assert.equal(tierFor(9).price, 100000, 'más de 3 no sube de precio');
});

test('el copy esta en español y sin anglicismos', () => {
  const texto = [
    ...PRODUCTS.map((p) => `${p.name} ${p.brand} ${p.familyLabel} ${p.description} ${p.presentation}`),
    ...PAYMENT_METHODS.flatMap((m) => [m.label, m.helper]),
    ...PROVINCES,
  ].join(' ');

  for (const word of ['inspired', 'shipping', 'free', 'order', 'checkout', 'cart', 'shop', 'buy']) {
    assert.equal(new RegExp(`\\b${word}\\b`).test(texto), false, `"${word}" esta en ingles`);
  }
});