import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildPerfumeLegacyPayload,
  buildPerfumeOrderSummary,
  calculatePerfumeTotal,
  formatPerfumeOrderDetails,
  getPerfumeActiveTierCount,
  getPerfumeHeadline,
  getPerfumePostAddMessage,
  getPerfumeSavingsLabel,
  getPerfumeThankYouRoute,
  getPerfumeUpsell,
} from '../src/lib/perfumes-utils.js';
import {
  PAGE_COPY,
  PRICING,
  PRICING_TIERS,
  PRODUCTS,
  SHIPPING_BADGE,
  TRUST_POINTS,
  UNIT_PRICE_TIERS,
  formatPerfumeLine,
} from '../src/lib/perfumes-data.js';

const cart = (count) =>
  Array.from({ length: count }, (_, index) => ({
    productId: PRODUCTS[index].id,
    id: `item-${index}`,
  }));

test('aplica la promo escalonada de perfumes', () => {
  assert.equal(calculatePerfumeTotal(0), 0);
  assert.equal(calculatePerfumeTotal(1), 40000);
  assert.equal(calculatePerfumeTotal(2), 65000);
  assert.equal(calculatePerfumeTotal(3), 80000);
});

test('el precio por unidad baja a medida que se suma', () => {
  const unit = (n) => calculatePerfumeTotal(n) / n;
  assert.ok(unit(1) > unit(2), '1 debe ser mas caro que 2');
  assert.ok(unit(2) > unit(3), '2 debe ser mas caro que 3');
});

test('nunca cobra mas de 3 perfumes', () => {
  assert.equal(PRICING.maxItems, 3);
  assert.equal(calculatePerfumeTotal(3), calculatePerfumeTotal(4));
});

test('marca el ahorro contra el precio de unidades sueltas', () => {
  assert.equal(getPerfumeSavingsLabel(0), '');
  assert.equal(getPerfumeSavingsLabel(1), '');
  // 2 sueltas = 80.000, la promo deja 65.000
  assert.equal(getPerfumeSavingsLabel(2), 'AHORRÁS $15.000');
  // 3 sueltas = 120.000, la promo deja 80.000
  assert.equal(getPerfumeSavingsLabel(3), 'AHORRÁS $40.000');
});

test('el escalon activo sigue la cantidad del carrito', () => {
  assert.equal(getPerfumeActiveTierCount(0), 0);
  assert.equal(getPerfumeActiveTierCount(1), 1);
  assert.equal(getPerfumeActiveTierCount(2), 2);
  assert.equal(getPerfumeActiveTierCount(3), 3);
});

test('el headline usa "perfume" en singular', () => {
  assert.equal(getPerfumeHeadline(0), 'Todavía no agregaste perfumes');
  assert.equal(getPerfumeHeadline(1), '1 perfume en tu pedido');
  assert.equal(getPerfumeHeadline(3), '3 perfumes en tu pedido');
});

test('el mensaje post-agregar empuja al siguiente escalon y se detiene en 3', () => {
  assert.match(getPerfumePostAddMessage(1), /65\.000/);
  assert.match(getPerfumePostAddMessage(2), /80\.000/);
  assert.match(getPerfumePostAddMessage(3), /80\.000/);
});

test('el upsell existe mientras haya lugar y desaparece en el maximo', () => {
  assert.ok(getPerfumeUpsell(0));
  assert.ok(getPerfumeUpsell(2));
  assert.equal(getPerfumeUpsell(3), null);
});

test('cada ruta de gracias corresponde a la cantidad del pedido', () => {
  assert.equal(getPerfumeThankYouRoute(1), '/gracias-perfumes-1');
  assert.equal(getPerfumeThankYouRoute(2), '/gracias-perfumes-2');
  assert.equal(getPerfumeThankYouRoute(3), '/gracias-perfumes-3');
});

test('el resumen de productos manda solo ids', () => {
  assert.equal(buildPerfumeOrderSummary(cart(2)), 'arabians-tonka, lady-million');
});

test('el detalle del pedido usa nombre, marca y genero', () => {
  const details = formatPerfumeOrderDetails(cart(2), PRODUCTS);
  assert.equal(details, 'Arabians Tonka (Montale) - Unisex | Lady Million (Rabanne) - Femenino');
});

test('el payload legado manda el costo de 9000 por frasco', () => {
  const payload = buildPerfumeLegacyPayload(cart(3), PRODUCTS);
  assert.equal(payload.pairCostTotal, 27000);
  assert.match(payload.legacyDetails, /Perfume: arabians-tonka/);
  assert.equal(payload.legacyDetails.split(' || ').length, 3);
});

test('el margen es positivo en los tres escalones', () => {
  for (const count of [1, 2, 3]) {
    const revenue = calculatePerfumeTotal(count);
    const cost = count * PRICING.unitCost;
    assert.ok(revenue > cost, `escalon de ${count} no deja margen`);
  }
});

test('el catalogo esta completo y sin ids repetidos', () => {
  assert.equal(PRODUCTS.length, 23);
  assert.equal(new Set(PRODUCTS.map((p) => p.id)).size, 23);
});

test('todo perfume tiene nombre, marca, genero, familia, notas e imagen', () => {
  for (const product of PRODUCTS) {
    assert.ok(product.name, `${product.id} sin nombre`);
    assert.ok(product.brand, `${product.id} sin marca`);
    assert.ok(['femenino', 'unisex'].includes(product.gender), `${product.id} con genero invalido`);
    assert.ok(product.family, `${product.id} sin familia`);
    assert.ok(product.description?.length > 20, `${product.id} sin notas`);
    assert.match(product.image, new RegExp(`/assets/perfumes/${product.id}\\.webp$`));
  }
});

test('el reparto por generos y familias cubre el catalogo entero', () => {
  const byGender = PRODUCTS.reduce((acc, p) => ({ ...acc, [p.gender]: (acc[p.gender] || 0) + 1 }), {});
  assert.equal(byGender.femenino, 19);
  assert.equal(byGender.unisex, 4);

  const byFamily = PRODUCTS.reduce((acc, p) => ({ ...acc, [p.family]: (acc[p.family] || 0) + 1 }), {});
  assert.equal(Object.keys(byFamily).length, 5);
  assert.equal(Object.values(byFamily).reduce((a, b) => a + b, 0), PRODUCTS.length);
  // ningun filtro deberia quedar vacio
  for (const count of Object.values(byFamily)) assert.ok(count > 0);
});

test('formatPerfumeLine arma "Nombre (Marca) - Genero"', () => {
  assert.equal(
    formatPerfumeLine(PRODUCTS[0]),
    'Arabians Tonka (Montale) - Unisex',
  );
});

test('el precio por unidad de cada escalón no promete un ahorro inexistente', () => {
  // Es lo que muestra cada tarjeta bajo el precio. Si cambia la promo, el bloque
  // tiene que seguir cuadrando con lo que se cobra de verdad.
  assert.equal(UNIT_PRICE_TIERS.length, 3);

  for (const tier of UNIT_PRICE_TIERS) {
    const exactUnit = calculatePerfumeTotal(tier.count) / tier.count;

    assert.equal(tier.total, calculatePerfumeTotal(tier.count), `total de ${tier.count}`);
    // Math.ceil: redondear hacia abajo prometería un precio que nadie puede pagar
    assert.equal(tier.unit, Math.ceil(exactUnit), `unidad de ${tier.count}`);
    // nunca por debajo del exacto, y nunca desviado más de un peso
    assert.ok(tier.unit >= exactUnit, `el redondeo recortaría el precio en ${tier.count}`);
    assert.ok(tier.unit - exactUnit < 1, `redondeo excesivo en ${tier.count}`);
    // Math.floor en el ahorro: nunca prometer más ahorro del real
    assert.equal(
      tier.savingPerUnit,
      Math.floor(PRICING.single - exactUnit),
      `ahorro de ${tier.count}`,
    );
    assert.ok(
      tier.savingPerUnit <= PRICING.single - exactUnit,
      `el ahorro de ${tier.count} no puede ser mayor al real`,
    );
    assert.equal(tier.unitLabel, `$${tier.unit.toLocaleString('es-AR')}`);
    // el total es el número que la persona compara con el efectivo que tiene
    assert.equal(tier.totalLabel, `$${tier.total.toLocaleString('es-AR')}`);
    // y tiene que ser el precio por unidad de ESE total, no de otro escalón
    assert.equal(tier.unit, Math.ceil(tier.totalLabel.replace(/\D/g, '') / tier.count));
  }
});

test('sumar perfumes baja efectivamente el precio por unidad', () => {
  const units = UNIT_PRICE_TIERS.map((t) => t.unit);
  for (let i = 1; i < units.length; i++) {
    assert.ok(
      units[i] < units[i - 1],
      `el escalón de ${UNIT_PRICE_TIERS[i].count} no es más barato por unidad`,
    );
  }
  // el de 1 no tiene ahorro: es el precio de referencia
  assert.equal(UNIT_PRICE_TIERS[0].unit, PRICING.single);
  assert.equal(UNIT_PRICE_TIERS[0].savingPerUnit, 0);
});

test('el total y el precio por unidad de cada escalón son coherentes entre sí', () => {
  // Es lo que muestra la tarjeta: "2 perfumes  $65.000  $32.500 c/u". Si el c/u no
  // saliera de dividir ese mismo total por la cantidad, el cartel mentiría.
  for (const tier of UNIT_PRICE_TIERS) {
    const total = Number(tier.totalLabel.replace(/[^\d]/g, ''));
    const unit = Number(tier.unitLabel.replace(/[^\d]/g, ''));

    assert.equal(total, tier.total, `total de ${tier.count}`);
    assert.equal(unit, tier.unit, `unidad de ${tier.count}`);
    assert.equal(
      unit,
      Math.ceil(total / tier.count),
      `el c/u de ${tier.count} no es el total dividido por la cantidad`,
    );
    // y el total tiene que ser lo que se cobra de verdad por esa cantidad
    assert.equal(total, calculatePerfumeTotal(tier.count));
  }
});

test('los tres escalones de precio están ordenados y growing', () => {
  assert.equal(PRICING_TIERS.length, 3);
  for (let i = 1; i < PRICING_TIERS.length; i++) {
    assert.ok(
      PRICING_TIERS[i].price > PRICING_TIERS[i - 1].price,
      'sumar unidades debe costar más en total',
    );
  }
  assert.equal(PRICING_TIERS[2].featured, true, 'solo el último escalón va destacado');
  assert.equal(PRICING_TIERS.filter((t) => t.featured).length, 1);
});

test('la copia al cliente esta en español y sin typos', () => {
  const joined = [
    PAGE_COPY.title,
    PAGE_COPY.paymentRibbon,
    PAGE_COPY.promoLine,
    PAGE_COPY.shippingNote,
    SHIPPING_BADGE,
    ...TRUST_POINTS.flatMap((point) => [point.title, point.body]),
    ...PRODUCTS.map((p) => `${p.name} ${p.brand} ${p.description}`),
  ].join(' ');

  // se colaron palabras en inglés y un espacio faltante ("perfumesinspired")
  assert.equal(joined.includes('perfumesinspired'), false, 'falta el espacio en "perfumes inspirados"');
  assert.equal(joined.includes('inspiraded'), false);
  assert.equal(joined.includes(' perfumess'), false);
  assert.match(joined, /23 perfumes inspirados/);
  // ninguna palabra inglesa del copy
  for (const word of ['inspired', 'shipping', 'free', 'order', 'checkout', 'cart', 'shop', 'buy']) {
    assert.equal(
      new RegExp(`\\b${word}\\b`).test(joined),
      false,
      `"${word}" esta en ingles en el copy`,
    );
  }
});
