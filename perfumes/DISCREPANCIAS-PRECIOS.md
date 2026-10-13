# Precios de los perfumes con previo pago — RESUELTO

**Estado: cerrado el 13/10/2026.** Los 61 costos están confirmados por Roxana,
que es quien lleva el catálogo. Las cifras de acá son las que van publicadas.

## Fuentes

| | Archivo | Qué tiene |
|---|---|---|
| Catálogo | `catalogo-perfumes-completo.xlsx` | 64 filas → **61 perfumes únicos** (3 duplicados con 2 fotos cada uno) |
| Precios | `C:\Users\Sebastián\Downloads\Originales.pdf` | **228 líneas**, columna "Precio x Uni. Perfume Árabe", de $35.000 a $380.000 |

El Excel tiene `Precio $` y `Stock` **vacías en las 64 filas**. Todos los costos salen del PDF.

## Lo que confirmó Roxana

> - **Now** → Now Black
> - **Asad** → el Negro
> - Los precios que figuran en el PDF son **el costo**

Esto confirma lo que ya estaba puesto, así que ningún precio cambió. Lo que
cambia es que ya no queda nada pendiente.

## El ratio

```
costo $55.000  ->  venta $124.900   (3 cuotas sin interés)
                 ->  CBU   $112.400   (transferencia, −10%)
```

- **Venta** = `costo × 2,270909…` redondeado a los $100. El 2,270909 sale de `124.900 / 55.000`.
- **CBU** = `venta × 0,9` redondeado a los $100. El 10% de $124.900 da $112.410 y se redondeó a **$112.400**.

Los precios van de **$79.500 a $204.400** (CBU: $71.600 a $184.000).

> Ojo: $124.900 es 2,5 veces el precio del catálogo de contrarreembolsto ($50.000).
> No es un error, es lo que da el ratio que se pidió.

---

# 1. Las 5 discrepancias — cómo quedaron

## 1.1 `Now` — marca RAVE (Lattafa), Masculino

El PDF tiene dos "Now" y ninguno aclara la marca:

| Línea del PDF | Costo |
|---|---:|
| `Now Women 100ml` (femenino) | $40.000 |
| `Now Black 100ml` (masculino) | $35.000 |

**Roxana confirmó que el nuestro es `Now Black`.** Costo $35.000 → **venta $79.500**, CBU $71.600.

## 1.2 `Asad` — Lattafa, Masculino

El PDF tiene cuatro Asad; tres los usan otros productos del catálogo:

| Línea del PDF | Costo | ¿La usa otro cosa? |
|---|---:|---|
| `Asad Bourbon` | $60.000 | sí → tu `Asad Bourbon` |
| `Asad Elixir` | $60.000 | sí → tu `Asad Elixir` |
| `Asad Zanzibar` | $35.000 | sí → tu `Asad Zanzibar` |
| `Asad Negro` | $40.000 | libre |

**Roxana confirmó que nuestro `Asad` es el Negro** (Lattafa le cambió el nombre al Asad de siempre). Costo $40.000 → **venta $90.800**, CBU $81.700.

## 1.3 `Club de Nuit Precieux I` — Armaf, Extrait 55 ml

El PDF escribe `Precioux` (sin la *e*) y sin la "I" final. Es el único Club de Nuit de 55 ml del PDF.

**$80.000** → venta $181.700.

## 1.4 `Hawas Pink For Her` — Rasasi, Femenino

El PDF lo llama `Hawas Pink`. Tu Excel separa el género en el nombre de toda la serie Hawas.

**$80.000** → venta $181.700.

## 1.5 `Yara (Pink)` — Lattafa, Femenino

El PDF lo llama `Yara`. El Excel lo marca "(Pink)" para distinguirlo de `Yara Moi`, `Yara Tous` y `Yara Candy`, que sí están con nombre propio en el PDF.

**$40.000** → venta $90.800.

---

# 2. Los 61 precios

**Ninguna línea del PDF se usó dos veces**: cada costo se asignó a un solo producto, así que no hay doble conteo.

| Producto | Marca | Género | Costo | Venta | CBU | Línea del PDF |
|---|---|---|---:|---:|---:|---|
| Club de Nuit Sillage | Armaf | Unisex | $55.000 | $124.900 | $112.400 | `Club de Nuit Sillage 105ml` |
| Odyssey Go Mango | Armaf | Unisex | $65.000 | $147.600 | $132.800 | `Odyssey Go Mango 100ml` |
| King | Bharara | Masculino | $90.000 | $204.400 | $184.000 | `Bharara King 100ml` |
| 9AM Pour Femme | Afnan | Femenino | $60.000 | $136.300 | $122.700 | `9am Pour Femme 100ml` |
| Amber Oud Gold Edition | Al Haramain | Unisex | $80.000 | $181.700 | $163.500 | `Amber Oud Gold Edition 120ml.` |
| Eternal Touch | Maison Alhambra | Unisex | $35.000 | $79.500 | $71.600 | `Eternal Touch 80ml` |
| Glacier Ultra | Maison Alhambra | Unisex | $35.000 | $79.500 | $71.600 | `Glacier Ultra 100ml` |
| Haya | Lattafa | Femenino | $40.000 | $90.800 | $81.700 | `Haya 100ml` |
| Club de Nuit Iconic | Armaf | Masculino | $65.000 | $147.600 | $132.800 | `Club de Nuit Iconic 105ml` |
| Her Confession | Lattafa | Femenino | $55.000 | $124.900 | $112.400 | `Her Confession 100ml` |
| La Rouge Baroque Extreme | Maison Alhambra | Unisex | $35.000 | $79.500 | $71.600 | `La Rouge Baroque Extreme 100ml` |
| La Vivacité Intensa | Maison Alhambra | Femenino | $35.000 | $79.500 | $71.600 | `La Vivacite Intensa 100ml` |
| His Confession | Lattafa | Masculino | $55.000 | $124.900 | $112.400 | `His Confession 100ml` |
| Odyssey Homme White Edition | Armaf | Masculino | $45.000 | $102.200 | $92.000 | `Odyssey Homme White Edition 100ml` |
| Pisa | Lattafa Pride | Masculino | $65.000 | $147.600 | $132.800 | `Pisa 100ml` |
| Now | RAVE (Lattafa) | Masculino | $35.000 | $79.500 | $71.600 | `Now Black 100ml` |
| Odyssey Mandarin Sky | Armaf | Masculino | $50.000 | $113.500 | $102.200 | `Odyssey Mandarin Sky 100ml` |
| Odyssey Candee | Armaf | Femenino | $45.000 | $102.200 | $92.000 | `Odyssey Candee 100ml` |
| Odyssey Ba Ha Mas (Bahamas) | Armaf | Unisex | $65.000 | $147.600 | $132.800 | `Odyssey BA HA MAS 100ml` |
| Victoria | Lattafa | Unisex | $50.000 | $113.500 | $102.200 | `Victoria 100ml` |
| Hawas Verde | Rasasi | Masculino | $75.000 | $170.300 | $153.300 | `Hawas Verde 100ml` |
| Hawas Tropical | Rasasi | Masculino | $80.000 | $181.700 | $163.500 | `Hawas Tropical 100ml` |
| Hawas Pink For Her | Rasasi | Femenino | $80.000 | $181.700 | $163.500 | `Hawas Pink 100ml` |
| Odyssey Aqua | Armaf | Masculino | $60.000 | $136.300 | $122.700 | `Odyssey Aqua Edition 100ml` |
| Hawas For Him Kobra | Rasasi | Masculino | $80.000 | $181.700 | $163.500 | `Hawas Kobra 100ml` |
| Hawas Ice For Him | Rasasi | Masculino | $70.000 | $159.000 | $143.100 | `Hawas ICE 100ml` |
| Hawas For Him (original) | Rasasi | Masculino | $50.000 | $113.500 | $102.200 | `Hawas for Him 100ml` |
| Hawas For Him Malibu | Rasasi | Masculino | $85.000 | $193.000 | $173.700 | `Hawas Malibu 100ml` |
| Hawas For Him Fire | Rasasi | Masculino | $65.000 | $147.600 | $132.800 | `Hawas Fire 100ml` |
| Hawas Elixir | Rasasi | Unisex | $60.000 | $136.300 | $122.700 | `Hawas Elixir 100ml` |
| Hawas For Her Eclat | Rasasi | Femenino | $50.000 | $113.500 | $102.200 | `Hawas for Her Éclat 100ml` |
| Hawas For Her Diva | Rasasi | Femenino | $80.000 | $181.700 | $163.500 | `Hawas Diva 100ml` |
| Hawas For Her (original) | Rasasi | Femenino | $45.000 | $102.200 | $92.000 | `Hawas for Her 100ml` |
| Turathi Electric | Afnan | Unisex | $60.000 | $136.300 | $122.700 | `Turathi Electric 100ml` |
| Turathi (Blue) | Afnan | Masculino | $60.000 | $136.300 | $122.700 | `Turathi Blue 90ml` |
| 9PM Rebel | Afnan | Masculino | $60.000 | $136.300 | $122.700 | `9pm Rebel 100ml` |
| Hawas Black For Him | Rasasi | Masculino | $50.000 | $113.500 | $102.200 | `Hawas Black 100ml` |
| 9PM Elixir | Afnan | Unisex | $65.000 | $147.600 | $132.800 | `9pm Elixir 100ml` |
| 9PM | Afnan | Masculino | $55.000 | $124.900 | $112.400 | `9pm 100ml` |
| 9PM Pour Femme | Afnan | Femenino | $55.000 | $124.900 | $112.400 | `9pm Pour Femme 100ml` |
| 9PM Night Out | Afnan | Unisex | $90.000 | $204.400 | $184.000 | `9pm Night Out 100ml` |
| 9AM | Afnan | Masculino | $50.000 | $113.500 | $102.200 | `9am 100ml` |
| Yara Tous | Lattafa | Femenino | $40.000 | $90.800 | $81.700 | `Yara Tous 100ml` |
| Yara Moi | Lattafa | Femenino | $40.000 | $90.800 | $81.700 | `Yara Moi 100ml` |
| Yara (Pink) | Lattafa | Femenino | $40.000 | $90.800 | $81.700 | `Yara 100ml` |
| Asad Zanzibar | Lattafa | Masculino | $35.000 | $79.500 | $71.600 | `Asad Zanzibar 100ml` |
| Asad Elixir | Lattafa | Masculino | $60.000 | $136.300 | $122.700 | `Asad Elixir 100ml` |
| Yara Candy | Lattafa | Femenino | $40.000 | $90.800 | $81.700 | `Yara Candy 100ml` |
| Asad | Lattafa | Masculino | $40.000 | $90.800 | $81.700 | `Asad Negro 100ml` |
| Club de Nuit Woman | Armaf | Femenino | $50.000 | $113.500 | $102.200 | `Club de Nuit Woman 105ml` |
| Club de Nuit Urban Man Elixir | Armaf | Masculino | $70.000 | $159.000 | $143.100 | `Club de Nuit Urban Elixir 105ml` |
| Club de Nuit Untold | Armaf | Unisex | $65.000 | $147.600 | $132.800 | `Club de Nuit Untold 105ml` |
| Asad Bourbon | Lattafa | Masculino | $60.000 | $136.300 | $122.700 | `Asad Bourbon 100ml` |
| Club de Nuit Precieux I | Armaf | Unisex | $80.000 | $181.700 | $163.500 | `Club de Nuit Precioux 55ml` |
| Club de Nuit Oud | Armaf | Unisex | $80.000 | $181.700 | $163.500 | `Club de Nuit Oud 105ml` |
| Club de Nuit Milestone | Armaf | Unisex | $60.000 | $136.300 | $122.700 | `Club de Nuit Milestone 105ml` |
| Club de Nuit Lionheart Woman | Armaf | Femenino | $60.000 | $136.300 | $122.700 | `Club De Nuit Lionheart Woman 100ml` |
| Club de Nuit Lionheart Man | Armaf | Masculino | $70.000 | $159.000 | $143.100 | `Club De Nuit Lionheart Man 100ml` |
| Club de Nuit Intense Woman | Armaf | Femenino | $50.000 | $113.500 | $102.200 | `Club de Nuit Intense Woman 105` |
| Club de Nuit Intense Man (EDT) | Armaf | Masculino | $60.000 | $136.300 | $122.700 | `Club de Nuit Intense Man 105ml` |
| Club de Nuit Maleka | Armaf | Femenino | $65.000 | $147.600 | $132.800 | `Club de Nuit Maleka 105ml` |

---

# 3. Descuentos del carrito

| Cantidad | Descuento |
|---|---|
| 1 perfume | precio normal |
| 2 perfumes | **$10.000 OFF** |
| 3 perfumes | **$18.000 OFF** |

El descuento es un monto **fijo**, así que el porcentaje real depende de qué perfumes se compre:

| Ejemplo | Subtotal | OFF | Total | Descuento real |
|---|---:|---:|---:|---:|
| 2 × Eternal Touch ($79.500) | $159.000 | −$10.000 | $149.000 | 6,3% |
| 2 × Hawas Malibu ($193.000) | $386.000 | −$10.000 | $376.000 | 2,6% |
| 3 × Eternal Touch ($79.500) | $238.500 | −$18.000 | $220.500 | 7,5% |
| 3 × Hawas Malibu ($193.000) | $579.000 | −$18.000 | $561.000 | 3,1% |

Sobre los más baratos el descuento es casi el doble de porcentaje que sobre los caros. Si algún día se quiere un descuento parejo, hay que pasarlo a porcentaje. Está documentado en un test (`test/perfumes-previo-pago.test.mjs`) para que el cambio se note.

El orden de aplicación es: primero el 10% de la transferencia sobre cada perfume, después el descuento fijo. Igual que en el funnel de calzados.

---

# 4. Del PDF no se usó nada

De las 228 líneas del PDF se usan **61**. Las otras 167 son productos que no están en el Excel.

También hay líneas del PDF que son **kits de varios frascos**, y no se usaron porque en el Excel esos productos existen por separado:

| Kit | Costo | Por qué no se usó |
|---|---:|---|
| `Kit Asad + Asad Zanzibar` | $70.000 | son 2 frascos; el Excel tiene Asad y Asad Zanzibar por separado |
| `Kit Yara + Yara Candy` | $70.000 | son 2 frascos; el Excel tiene Yara (Pink) y Yara Candy por separado |
| `Kit Pisa` | $80.000 | el Excel tiene Pisa como frasco suelto; el PDF lo tiene suelto a $65.000 y en kit a $80.000 |

Si alguno de esos kits se vende como unidad, hay que recalcularlo.

---

# 5. Cómo cambiar un precio

El mapeo vive en `2026/_next-src/scripts/build-costos-pp.mjs`, una línea por perfume con la línea del PDF de la que sale. **No es automático** a propósito: el cruce por nombre no es confiable (las series Hawas, Asad, Yara y Club de Nuit se pisan entre sí y asignan el costo del frasco equivocado).

Para cambiar uno:

```bash
cd 2026/_next-src
node scripts/build-costos-pp.mjs          # regenera ../perfumes/costos-perfumes.json
node scripts/build-perfumes-previo-pago.mjs   # regenera src/lib/perfumes-previo-pago-data.js
npm test                                   # hay que actualizar el test si cambia Now o Asad
npm run build && npm run export:site
```