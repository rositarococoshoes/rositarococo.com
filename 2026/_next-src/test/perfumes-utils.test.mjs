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
import { PRODUCTS, PRICING, formatPerfumeLine } from '../src/lib/perfumes-data.js';

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
