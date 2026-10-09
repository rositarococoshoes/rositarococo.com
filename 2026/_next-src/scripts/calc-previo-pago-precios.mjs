/**
 * De dónde salen los precios de la landing de perfumes con previo pago.
 *
 * Uso:  node scripts/calc-previo-pago-precios.mjs
 *
 * El funnel de calzados usa esta proporción:
 *
 *   contrareembolso   1 par  $70.000  /  2 pares $110.000
 *   previo pago       1 par  $87.500  /  2 pares $137.500   (= x1,25)
 *   transferencia CBU         $78.750  /         $123.750   (= x0,90)
 *
 * El factor 1,25 da en perfumes $50.000 y $100.000 justos, pero en 2 perfumes
 * da $81.250, un número que queda raro para mostrar. Se redondeó a $80.000,
 * que es $1.250 por debajo del exacto: la promo de 2 queda un poco más
 * generosa que la de calzados, a cambio de un precio presentable.
 */
export const CR_PERFUMES = { 1: 40000, 2: 65000, 3: 80000 };
export const PP_PERFUMES = { 1: 50000, 2: 80000, 3: 100000 };
export const CBU_DISCOUNT = 0.9;

export function cbuPrice(count) {
  return Math.round((PP_PERFUMES[count] * CBU_DISCOUNT) / 50) * 50;
}

// Se ejecuta directo con `node scripts/calc-previo-pago-precios.mjs` para ver
// la tabla; importado desde los tests solo aporta las constantes.
const isDirectRun = process.argv[1] && import.meta.url.endsWith(process.argv[1].split(/[\\/]/).pop());

if (isDirectRun) {
  console.log('proporción de calzados:');
  console.log(`  1 par: 87500 / 70000 = ${(87500 / 70000).toFixed(4)}`);
  console.log(`  2 pares: 137500 / 110000 = ${(137500 / 110000).toFixed(4)}`);
  console.log(`  CBU: 78750 / 87500 = ${(78750 / 87500).toFixed(4)}`);
  console.log('');
  console.log('perfumes con previo pago:');
  for (const n of [1, 2, 3]) {
    const exacto = CR_PERFUMES[n] * 1.25;
    console.log(
      `  ${n}: exacto ${exacto.toFixed(2)} -> ${PP_PERFUMES[n].toLocaleString('es-AR')} (${(PP_PERFUMES[n] / n).toLocaleString('es-AR')} c/u) | CBU ${cbuPrice(n).toLocaleString('es-AR')}`,
    );
  }
}