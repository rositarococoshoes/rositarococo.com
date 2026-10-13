# Discrepancias entre el catálogo y los precios del PDF

Generado el 2026-10-09. Trae la lista completa para que la revises antes de tocar la landing.

## Fuentes

| | Archivo | Qué tiene |
|---|---|---|
| Catálogo | `catalogo-perfumes-completo.xlsx` | 64 filas → **61 perfumes únicos** (3 vienen duplicados con 2 fotos cada uno) |
| Precios | `C:\Users\Sebastián\Downloads\Originales.pdf` | **228 líneas** con costo, columna "Precio x Uni. Perfume Árabe", valores de $35.000 a $380.000 |

El Excel tiene las columnas `Precio $` y `Stock` **vacías en las 64 filas**. Todos los costos salen del PDF.

## El ratio que definiste

```
costo $55.000  ->  venta $124.900   (3 cuotas sin interés)
                 ->  CBU   $112.400   (transferencia, -10%)
```

- **Venta** = `costo × 2,270909…` redondeado a los $100. El 2,270909 sale de `124.900 / 55.000`, o sea el ratio exacto de tu ejemplo.
- **CBU** = `venta × 0,9` redondeado a los $100. El 10% de $124.900 da $112.410 y lo redondeamos a **$112.400** como pediste.

Ojo: ese $124.900 es **2,5 veces** el precio del catálogo de contrarreembolso ($50.000). No es un error, es lo que da el ratio que pasaste.

---

# 1. Las 5 discrepancias — necesitan tu decisión

Estas son las únicas 5 de 61 donde el nombre del catálogo no coincide con ninguna línea del PDF.

## 1.1 `Now` — marca RAVE (Lattafa), Masculino, EDP 100 ml

El PDF tiene dos "Now" y ninguno aclara la marca:

| # | Línea del PDF | Costo | Variante |
|---|---|---|---|
| 210 | `Now Women 100ml  \|  \|  Burberry - Her \|` | **$40.000** | femenino |
| 211 | `Now Black 100ml  \|  \|  Creed - Aventus \|` | **$35.000** | masculino |

**Por qué no puedo decidirlo:** tu catálogo lo tiene como **Masculino**, así que por género encaja `Now Black`. Pero el PDF no dice la marca en ninguno de los dos, y `Now Women` no dice "Lattafa" tampoco. Si el Now de tu Excel es de RAVE y ninguno de estos dos lo es, el costo correcto no está en el PDF.

**Decime cuál es** → $35.000 (Black) o $40.000 (Women), o pasame el costo si es otro.

---

## 1.2 `Asad` — marca Lattafa, Masculino, EDP 100 ml

El PDF tiene cuatro Asad. Tres ya los usan otros productos de tu catálogo:

| # | Línea del PDF | Costo | ¿Lo usa otro producto? |
|---|---|---|---|
| 109 | `Asad Bourbon 100ml \|` | $60.000 | sí → tu `Asad Bourbon` |
| 110 | `Asad Elixir 100ml \|  \|  Bottled Absolu - Hugo Boss \|` | $60.000 | sí → tu `Asad Elixir` |
| 111 | `Asad Negro 100ml \|  \|  Dior - Sauvage Elixir \|` | $40.000 | **libre** |
| 112 | `Asad Zanzibar 100ml \|  \|  Jean Paul Gaultier - Le Beau Le Parfum \|` | $35.000 | sí → tu `Asad Zanzibar` |
| 121 | `Kit Asad + Asad Zanzibar \|` | $70.000 | es un **kit de 2 frascos**, no un frasco |

**Por qué no puedo decidirlo:** el único nombre libre es `Asad Negro`. Lattafa renombró el Asad original a "Asad Negro", así que encaja con un producto que en tu Excel se llama solo "Asad". Pero también es posible que tu `Asad` sea el clásico y el PDF lo liste con otro nombre.

**Decime si es el Asad Negro** ($40.000) o pasame el costo.

---

## 1.3 `Club de Nuit Precieux I` — Armaf, Unisex, Extrait de Parfum 55 ml

**Diferencia:** el PDF escribe **`Precioux`** (sin la *e*) y sin la "I" final. Tu Excel dice `Precieux I`.

| # | Línea del PDF | Costo |
|---|---|---|
| 49 | `Club de Nuit Precioux 55ml  \|  \|  Absolu Aventus - Creed \|` | **$80.000** |

**Por qué creo que es el mismo:** es el único `Club de Nuit` de 55 ml en todo el PDF, y el único `Extrait de Parfum` de tu Excel. La diferencia es solo ortografía.

**Lo resolví como $80.000.** Confirmame si es correcto.

---

## 1.4 `Hawas Pink For Her` — Rasasi, Femenino, EDP 100 ml

**Diferencia:** el PDF lo llama `Hawas Pink`, sin el "For Her".

| # | Línea del PDF | Costo |
|---|---|---|
| 168 | `Hawas Pink 100ml  \|  \|  Love Don't Be Shy - By Kilian \|` | **$80.000** |

**Por qué creo que es el mismo:** tu Excel separa la línea de género en el nombre de todos los Hawas (`Hawas For Him Fire`, `Hawas For Her Eclat`…), y el PDF los lista sin eso. Tu Excel tiene además `Hawas For Her (original)` y `Hawas For Her Diva` como entradas separadas, así que "Pink For Her" es la tercera de esa misma serie.

**Lo resolví como $80.000.** Confirmame si es correcto.

---

## 1.5 `Yara (Pink)` — Lattafa, Femenino, EDP 100 ml

**Diferencia:** el PDF lo llama `Yara`, sin el "(Pink)".

| # | Línea del PDF | Costo |
|---|---|---|
| 103 | `Yara 100ml  \|  \|  Dior - Poison Girl` | **$40.000** |

**Por qué creo que es el mismo:** Lattafa Yara es el rosado de la línea, y tu Excel lo marca como "(Pink)" justamente para distinguirlo de `Yara Moi`, `Yara Tous` y `Yara Candy`, que sí están en el PDF con nombre propio.

**Lo resolví como $40.000.** Confirmame si es correcto.

---

# 2. Los 56 que sí cruzan

Estos están confirmados. La columna "como aparece en el PDF" te deja verificar cualquier precio en dos segundos contra el original.

| Producto | Marca | Género | Costo | Venta | CBU (−10%) | Como aparece en el PDF |
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
| Odyssey Mandarin Sky | Armaf | Masculino | $50.000 | $113.500 | $102.200 | `Odyssey Mandarin Sky 100ml` |
| Odyssey Candee | Armaf | Femenino | $45.000 | $102.200 | $92.000 | `Odyssey Candee 100ml` |
| Odyssey Ba Ha Mas (Bahamas) | Armaf | Unisex | $65.000 | $147.600 | $132.800 | `Odyssey BA HA MAS 100ml` |
| Victoria | Lattafa | Unisex | $50.000 | $113.500 | $102.200 | `Victoria 100ml` |
| Hawas Verde | Rasasi | Masculino | $75.000 | $170.300 | $153.300 | `Hawas Verde 100ml` |
| Hawas Tropical | Rasasi | Masculino | $80.000 | $181.700 | $163.500 | `Hawas Tropical 100ml` |
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
| Asad Zanzibar | Lattafa | Masculino | $35.000 | $79.500 | $71.600 | `Asad Zanzibar 100ml` |
| Asad Elixir | Lattafa | Masculino | $60.000 | $136.300 | $122.700 | `Asad Elixir 100ml` |
| Yara Candy | Lattafa | Femenino | $40.000 | $90.800 | $81.700 | `Yara Candy 100ml` |
| Club de Nuit Woman | Armaf | Femenino | $50.000 | $113.500 | $102.200 | `Club de Nuit Woman 105ml` |
| Club de Nuit Urban Man Elixir | Armaf | Masculino | $70.000 | $159.000 | $143.100 | `Club de Nuit Urban Elixir 105ml` |
| Club de Nuit Untold | Armaf | Unisex | $65.000 | $147.600 | $132.800 | `Club de Nuit Untold 105ml` |
| Asad Bourbon | Lattafa | Masculino | $60.000 | $136.300 | $122.700 | `Asad Bourbon 100ml` |
| Club de Nuit Oud | Armaf | Unisex | $80.000 | $181.700 | $163.500 | `Club de Nuit Oud 105ml` |
| Club de Nuit Milestone | Armaf | Unisex | $60.000 | $136.300 | $122.700 | `Club de Nuit Milestone 105ml` |
| Club de Nuit Lionheart Woman | Armaf | Femenino | $60.000 | $136.300 | $122.700 | `Club De Nuit Lionheart Woman 100ml` |
| Club de Nuit Lionheart Man | Armaf | Masculino | $70.000 | $159.000 | $143.100 | `Club De Nuit Lionheart Man 100ml` |
| Club de Nuit Intense Woman | Armaf | Femenino | $50.000 | $113.500 | $102.200 | `Club de Nuit Intense Woman 105` |
| Club de Nuit Intense Man (EDT) | Armaf | Masculino | $60.000 | $136.300 | $122.700 | `Club de Nuit Intense Man 105ml` |
| Club de Nuit Maleka | Armaf | Femenino | $65.000 | $147.600 | $132.800 | `Club de Nuit Maleka 105ml` |

**Ninguna línea del PDF se usó dos veces.** Cada precio del PDF se asignó a un solo producto, así que no hay doble conteo.

---

# 3. Descuentos del carrito

Pediste:

| Cantidad | Descuento |
|---|---|
| 1 perfume | precio normal |
| 2 perfumes | **$10.000 OFF** |
| 3 perfumes | **$18.000 OFF** |

Como el descuento es fijo y no porcentual, el porcentaje real que se lleva el cliente depende de qué perfumes compra:

| Ejemplo | Subtotal | OFF | Total | Descuento real |
|---|---:|---:|---:|---:|
| 2 × Eternal Touch ($79.500) | $159.000 | −$10.000 | $149.000 | 6,3% |
| 2 × Hawas Malibu ($193.000) | $386.000 | −$10.000 | $376.000 | 2,6% |
| 3 × Eternal Touch ($79.500) | $238.500 | −$18.000 | $220.500 | 7,5% |
| 3 × Hawas Malibu ($193.000) | $579.000 | −$18.000 | $561.000 | 3,1% |

Sobre los más baratos el descuento es casi el doble de porcentaje que sobre los caros. Si querías un descuento parejo, conviene pasarlo a porcentaje (por ejemplo 6% y 11%).

---

# 4. Rango de precios

| | Mínimo | Máximo |
|---|---:|---:|
| Costo | $35.000 | $90.000 |
| Venta | $79.500 | $204.400 |
| CBU | $71.600 | $184.000 |

Los extremos de costo son Eternal Touch / Glacier Ultra / La Rouge / La Vivacité / Asad Zanzibar ($35.000) y King / 9PM Night Out ($90.000).

---

# 5. Nota sobre el PDF

Del total de 228 precios del PDF se usan **59**. Los otros 169 corresponden a productos que no están en tu Excel de 61 (Erba Pura, XJ 1861 Naxos, World Cup, Amber Oud Private Edition, los Lattafa Hayaati, etc.).

También hay líneas en el PDF que son **kits de varios frascos**, y que no usé porque en tu Excel esos productos existen por separado:

| Kit | Costo | Por qué no lo usé |
|---|---:|---|
| `Kit Asad + Asad Zanzibar` | $70.000 | son 2 frascos; tu Excel tiene Asad y Asad Zanzibar por separado |
| `Kit Yara + Yara Candy` | $70.000 | son 2 frascos; tu Excel tiene Yara (Pink) y Yara Candy por separado |
| `Kit Pisa` | $80.000 | tu Excel tiene Pisa como frasco suelto; el PDF lo tiene suelto a $65.000 y en kit a $80.000 |

Si alguno de esos kits se vende como unidad, avisame y lo recalculo.