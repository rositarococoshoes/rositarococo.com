import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CBU_ROUTE,
  FAMILIES,
  FAMILY_LABEL,
  GENDERS,
  GENDER_LABEL,
  PAYMENT_METHODS,
  PRICING,
  PRODUCTS,
  PROVINCES,
  THANK_YOU_ROUTE,
  discountFor,
  priceOf,
} from '../src/lib/perfumes-previo-pago-data.js';
import {
  buildLegacyPayload,
  buildOrderSummary,
  calculateSubtotal,
  calculateTotal,
  describeCart,
  formatOrderDetails,
  getCbuRoute,
  getDiscountLabel,
  getPostAddMessage,
  getThankYouRoute,
  getUpsell,
} from '../src/lib/perfumes-previo-pago-utils.js';

const cartOf = (...ids) => ids.map((productId) => ({ productId, id: productId }));
const CHEAP = 'maison-alhambra--eternal-touch'; // $79.500
const MID = 'armaf--club-de-nuit-sillage'; // $124.900
const EXPENSIVE = 'rasasi--hawas-for-him-malibu'; // $193.000

// ------------------------------------------------------------------ precios

test('el precio de venta sale del costo con el ratio 2,270909', () => {
  // El ratio sale del ejemplo: costo $55.000 -> venta $124.900.
  const ratio = 124900 / 55000;
  const round100 = (v) => Math.round(v / 100) * 100;

  for (const p of PRODUCTS) {
    assert.equal(
      p.price,
      round100(p.cost * ratio),
      `${p.id}: venta ${p.price} no sale del costo ${p.cost}`,
    );
  }
});

test('el ejemplo de referencia da exactamente los precios pedidos', () => {
  const sillage = PRODUCTS.find((p) => p.id === 'armaf--club-de-nuit-sillage');
  assert.equal(sillage.cost, 55000);
  assert.equal(sillage.price, 124900, 'el costo 55.000 tiene que dar 124.900');
  assert.equal(sillage.cbuPrice, 112400, 'y el CBU tiene que dar 112.400');
});

test('la transferencia es un 10% menos, redondeado a los $100', () => {
  for (const p of PRODUCTS) {
    assert.equal(p.cbuPrice, Math.round((p.price * 0.9) / 100) * 100, `${p.id} CBU mal redondeado`);
    assert.ok(p.cbuPrice < p.price, `${p.id}: el CBU no es más barato`);
  }
  assert.equal(priceOf(PRODUCTS[0], 'mercadopago'), priceOf(PRODUCTS[0], 'tarjeta'));
});

test('el costo nunca es mayor que el precio de venta', () => {
  for (const p of PRODUCTS) {
    assert.ok(p.cost < p.price, `${p.id} se vende por debajo del costo`);
    assert.ok(p.cost > 0, `${p.id} sin costo`);
  }
});

test('el precio de venta queda entre 79.500 y 204.400', () => {
  const precios = PRODUCTS.map((p) => p.price);
  assert.equal(Math.min(...precios), 79500);
  assert.equal(Math.max(...precios), 204400);
});

// ---------------------------------------------------------- descuentos

test('el descuento del carrito es el que se pidió: 0, $10.000 y $18.000', () => {
  assert.equal(discountFor(0), 0);
  assert.equal(discountFor(1), 0);
  assert.equal(discountFor(2), 10000);
  assert.equal(discountFor(3), 18000);
  // mas de 3 no sigue subiendo: el carrito esta topado
  assert.equal(discountFor(4), 18000);
  assert.equal(PRICING.maxItems, 3);
});

test('el total es la suma de los perfumes menos el descuento', () => {
  assert.equal(calculateSubtotal(cartOf(MID)), 124900);
  assert.equal(calculateTotal(cartOf(MID)), 124900, '1 perfume no lleva descuento');

  assert.equal(calculateSubtotal(cartOf(MID, CHEAP)), 204400);
  assert.equal(calculateTotal(cartOf(MID, CHEAP)), 194400, 'se descuentan 10.000');

  assert.equal(calculateSubtotal(cartOf(CHEAP, MID, EXPENSIVE)), 397400);
  assert.equal(calculateTotal(cartOf(CHEAP, MID, EXPENSIVE)), 379400, 'se descuentan 18.000');
});

test('el total por transferencia descuenta el 10% y despues el monto fijo', () => {
  const cart = cartOf(MID, CHEAP);
  // el 10% va primero sobre cada perfume, recien despues el descuento fijo,
  // igual que en el funnel de calzados
  assert.equal(calculateSubtotal(cart, 'cbu'), 184000); // (112.400 + 71.600)
  assert.equal(calculateTotal(cart, 'cbu'), 174000); // 184.000 - 10.000
  assert.ok(calculateTotal(cart, 'cbu') < calculateTotal(cart, 'tarjeta'));
});

test('el carrito vacio o nunca da negativo', () => {
  assert.equal(calculateTotal([]), 0);
  assert.equal(calculateSubtotal([]), 0);
  // el descuento nunca puede dejar el total en negativo
  assert.ok(calculateTotal(cartOf(CHEAP, CHEAP)) >= 0);
});

test('el descuento fijo da un porcentaje distinto segun que perfumes se compren', () => {
  // No es un error, es la consecuencia de un descuento fijo: sobre el perfume
  // mas caro el mismo $10.000 es un porcentaje mucho menor. El test deja
  // documentado el rango para que, si alguna vez cambia a porcentaje, se note.
  const barato = (calculateSubtotal(cartOf(CHEAP, CHEAP)) - calculateTotal(cartOf(CHEAP, CHEAP))) /
    calculateSubtotal(cartOf(CHEAP, CHEAP));
  const caro = (calculateSubtotal(cartOf(EXPENSIVE, EXPENSIVE)) - calculateTotal(cartOf(EXPENSIVE, EXPENSIVE))) /
    calculateSubtotal(cartOf(EXPENSIVE, EXPENSIVE));
  assert.ok(barato > caro * 2, 'el descuento sobre el barato tiene que duplicar al del caro');
  assert.ok(caro > 0.02 && barato < 0.09, `fuera de rango: ${barato} / ${caro}`);
});

test('agregar un perfume empuja al siguiente escalón', () => {
  assert.match(getPostAddMessage(1), /10\.000/);
  assert.match(getPostAddMessage(2), /18\.000/);
  assert.equal(getUpsell(3), null, 'con 3 ya no hay lugar para otro');
  assert.ok(getUpsell(0) && getUpsell(1) && getUpsell(2));
});

test('la etiqueta del descuento muestra el monto', () => {
  assert.equal(getDiscountLabel(1), '');
  assert.equal(getDiscountLabel(2), '−$10.000');
  assert.equal(getDiscountLabel(3), '−$18.000');
});

test('las paginas finales ya no dependen de la cantidad', () => {
  // con precio por perfume el total varia por pedido, asi que hay una sola
  // pagina por tipo y lee el pedido del localStorage
  assert.equal(getThankYouRoute(), THANK_YOU_ROUTE);
  assert.equal(getCbuRoute(), CBU_ROUTE);
  assert.equal(getThankYouRoute(1), getThankYouRoute(3));
});

// ------------------------------------------------------------- resumen

test('el resumen del pedido trae el precio de cada perfume', () => {
  const cart = cartOf(MID, CHEAP);
  const lineas = describeCart(cart);
  assert.equal(lineas.length, 2);
  assert.equal(lineas[0].price, 124900);
  assert.equal(lineas[1].price, 79500);

  const cbu = describeCart(cart, 'cbu');
  assert.equal(cbu[0].price, 112400, 'con CBU cada linea va con el precio de transferencia');
});

test('el payload manda el costo de reposicion del pedido', () => {
  const payload = buildLegacyPayload(cartOf(MID, CHEAP));
  assert.equal(payload.costTotal, 55000 + 35000);
  assert.match(payload.legacyDetails, /Club de Nuit Sillage/);
  assert.match(payload.legacyDetails, /\|\|/, 'cada perfume va separado por ||');
});

test('el resumen y el detalle texto son legibles', () => {
  const cart = cartOf(MID, CHEAP);
  assert.equal(buildOrderSummary(cart), `${MID}, ${CHEAP}`);
  const detalle = formatOrderDetails(cart);
  assert.match(detalle, /Club de Nuit Sillage \(Armaf\) - Unisex/);
  assert.match(detalle, /\|/, 'los perfumes van separados por |');
});

// --------------------------------------------------------------- catalogo

test('el catálogo tiene los 61 perfumes del Excel', () => {
  assert.equal(PRODUCTS.length, 61);
  assert.equal(new Set(PRODUCTS.map((p) => p.id)).size, 61, 'hay ids repetidos');
});

test('todo perfume tiene lo que la tarjeta y el carrito dibujan', () => {
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
  const multi = PRODUCTS.filter((p) => p.images.length > 1);
  assert.equal(multi.length, 5);
  for (const p of multi) {
    assert.equal(new Set(p.images).size, p.images.length, `${p.id} repite la misma foto`);
  }
});

test('el genero y la familia cubren todo el catálogo', () => {
  const genders = new Set(PRODUCTS.map((p) => p.gender));
  assert.deepEqual([...genders].sort(), ['femenino', 'masculino', 'unisex']);

  for (const g of genders) assert.ok(GENDER_LABEL[g], `falta la etiqueta de ${g}`);
  assert.equal(GENDERS.length, 4, 'todos + los tres generos');
  assert.equal(FAMILIES.length, 6, 'todos + las cinco familias');

  for (const g of ['unisex', 'femenino', 'masculino']) {
    const familias = new Set(PRODUCTS.filter((p) => p.gender === g).map((p) => p.family));
    assert.ok(familias.size >= 2, `${g} tiene una sola familia: el filtro quedaria inutil`);
  }
});

test('solo Now y Asad tienen el precio sin confirmar', () => {
  // son los dos que se resolvieron por recomendacion; si se corrigen en
  // scripts/build-costos-pp.mjs, este test hay que actualizar
  const sinConfirmar = PRODUCTS.filter((p) => !p.priceConfirmed).map((p) => p.id).sort();
  assert.deepEqual(sinConfirmar, ['lattafa--asad', 'rave-lattafa--now']);
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
  assert.ok(PROVINCES.length >= 20, 'faltan provincias');
  for (const p of ['Córdoba', 'Mendoza', 'Buenos Aires', 'Capital Federal']) {
    assert.ok(PROVINCES.includes(p), `falta ${p}`);
  }
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