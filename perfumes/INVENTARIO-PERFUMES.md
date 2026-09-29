# Inventario Perfumes Rosita Rococo — Landing Contrarreembolso

> Generado el 2026-09-29. Fuente: 5 ZIPs en `perfumes/` + `info-perfumes.txt`.

## 1. Resumen

- **23 perfumes** con imagen (22 de la lista de notas + **1 extra no listado**: FAME Rabanne)
- **4 Unisex** / **19 Femenino**
- Todos son **Extrait de Parfum 60 ML**, con el texto "INSPIRADO EN <marca> <modelo>"
- Las imágenes **ya traen el texto quemado** (nombre, marca, género, notas) → no hace falta retocar

## 2. Precios (de `info-perfumes.txt`)

| Cantidad | Precio | Por unidad | Ahorro |
|---|---|---|---|
| 1 perfume | **$40.000** | $40.000 | — |
| 2 perfumes | **$65.000** | $32.500 | $15.000 |
| 3 perfumes | **$80.000** | $26.666 | $40.000 |

Máximo del carrito: **3**. Costo de compra por frasco: **$9.000**.

## 3. Mapa perfume → archivo de imagen

Todos los archivos están dentro de los ZIPs. `AI` = render limpio 1024×1024. Sin `_ai` = recorte 1000×1000 de menor calidad.

### ZIP `perfumescondescripcionenenvase (1).zip` — 00 a 09

| # | Perfume | Marca | Genre | Archivo |
|---|---|---|---|---|
| 1 | Arabians Tonka | Montale | Unisex | `00_arabians_tonka_montale.png` |
| 2 | Lady Million | Rabanne | Femenino | `01_lady_million_rabanne.png` |
| 3 | Power of You | Giorgio Armani | Femenino | `02_power_of_you_giorgio_armani.png` |
| 4 | Cher Dieciocho | María Cher | Femenino | `03_cher_dieciocho_maria_cher.png` |
| 5 | 212 VIP Rosé | Carolina Herrera | Femenino | `04_212_vip_rose_carolina_herrera.png` |
| 6 | Yara | Lattafa | Femenino | `05_yara_lattafa.png` |
| 7 | La Bomba | Carolina Herrera | Femenino | `06_la_bomba_carolina_herrera.png` |
| 8 | Eclaire | Lattafa | Femenino | `07_eclaire_lattafa.png` |
| 9 | Black XS | Rabanne | Femenino | `08_black_xs_rabanne.png` |
| 10 | Odyssey Mandaryn Elixir | Armaf | Unisex | `09_mandaryn_sky_elixir_armaf.png` |

### ZIP `perfumescondescripcinenenvase.zip` — 10 a 14

| # | Perfume | Marca | Genre | Archivo |
|---|---|---|---|---|
| 11 | Odyssey Mandarin | Armaf | Unisex | `10_odyssey_mandarin_armaf_unisex_ai.png` |
| 12 | Bombshell Nights | Victoria's Secret | Femenino | `11_bombshell_nights_victorias_secret_ai.png` |
| 13 | Scandal | Jean Paul Gaultier | Femenino | `12_scandal_jean_paul_gaultier_ai.png` |
| 14 | Erba Pura | Xerjoff | Unisex | `13_erba_pura_xerjoff_ai.png` |
| 15 | Ange ou Demon | Givenchy | Femenino | `14_ange_ou_demon_givenchy_ai.png` |

### ZIP `perfumescondescripcinenenvase (1).zip` — 15 a 19

| # | Perfume | Marca | Genre | Archivo |
|---|---|---|---|---|
| 16 | Born in Roma Purple Melancholia | Valentino | Femenino | `15_born_in_roma_purple_melancholia_valentino_ai.png` |
| 17 | Valentino Donna Born in Roma | Valentino | Femenino | `16_valentino_donna_born_in_roma_ai.png` |
| 18 | My Way | Giorgio Armani | Femenino | `17_my_way_giorgio_armani_ai.png` |
| 19 | Yara (variante visual) | Lattafa | Femenino | `18_yara_lattafa_variante_ai.png` |
| 20 | Olympea | Rabanne | Femenino | `19_olympea_rabanne_ai.png` |

### ZIP `perfumescondescripcionenenvase.zip` — 21, 22, 23

| # | Perfume | Marca | Genre | Archivo | Dim |
|---|---|---|---|---|---|
| 21 | La Vie Est Belle L'Elixir | Lancôme | Femenino | `WhatsApp Image ...10.03.19.jpeg` | 1200×1600 |
| 22 | Bonbon | Viktor&Rolf | Femenino | `WhatsApp Image ...10.03.20.jpeg` | 1207×1600 |
| 23 | **FAME** ⚠️ | Rabanne | Femenino | `WhatsApp Image ...10.03.18.jpeg` | 1221×1600 |

### ZIP `perfumescondescripcinenenvase (2).zip`
Duplicado exacto de `perfumescondescripcionenenvase (1).zip` (00–09). Ignorar.

## 4. Variantes alternativas (imágenes con título dorado, 3:4)

| Perfume | Archivo | Dim |
|---|---|---|
| Arabians Tonka | `arabians tonka montale unisex.jpeg` | 1207×1600 |
| Odyssey Mandaryn Elixir | `WhatsApp Image ...10.03.17.jpeg` | 1599×1066 (panorámica) |
| Erba Pura | `WhatsApp Image ...10.03.17 (1).jpeg` | 1207×1600 |

## 5. Descripciones (de `info-perfumes.txt`)

Cada perfume tiene un párrafo de notas. Están en el archivo, se usan tal cual como descripción.

## 6. Gap técnico: el funnel de zapatos no sirve directo

El funnel de contrarreembolso actual (`ContrareembolsoLandingV2`) asume calzados:

| Feature shoes | Impacto en perfumes |
|---|---|
| Dropdown de **talle** por producto | **No aplica** — hay que sacarlo |
| `SIZES` (35–40) | No aplica |
| `entry.736134777` = costo por par (16000) | Hay que definir costo perfume |
| `buildOrderSummary` → `"35-roma-negras"` | Hay que reformatear sin talle |
| `MODEL_NAMES` en `ThankYouClient` | Específico de zapatos |
| 3 productos | 23 productos |
| 1 imagen 112:100 por producto | Imágenes 1:1 con texto quemado |
| `gracias-1par-c` / `gracias-2pares-c` con total hardcodeado | Precios distintos ($40k/$65k) |
| `block` de WhatsApp `1141902122` | Reutilizar |
| Webhook `ORDER_WEBHOOK_URL` | ¿Mismo o nuevo? |
| Chat widget | V2 no lo tiene |

## 7. Implementación (2026-09-29)

**Estado: construido y verificado, NO publicado.** El build y el export están hechos;
falta decidir si se sube.

### Rutas

| URL | Contenido | Origen |
|---|---|---|
| `/2026/perfumes.html` | landing | `app/perfumes/page.js` |
| `/2026/gracias-perfumes-1.html` | 1 perfume, $40.000 | `app/gracias-perfumes-1/page.js` |
| `/2026/gracias-perfumes-2.html` | 2 perfumes, $65.000 | `app/gracias-perfumes-2/page.js` |
| `/2026/gracias-perfumes-3.html` | 3 perfumes, $80.000 | `app/gracias-perfumes-3/page.js` |

### Archivos nuevos

- `src/lib/perfumes-data.js` — catálogo, precios, familias, copy
- `src/lib/perfumes-utils.js` — carrito, totales, payload
- `src/components/PerfumesLanding.js` — la landing
- `src/components/PerfumesThankYouPage.js` + `PerfumesThankYouClient.js` — post-compra
- `app/perfumes/`, `app/gracias-perfumes-{1,2,3}/` — rutas
- `scripts/build-perfume-images.mjs` — ZIP → WebP (`npm run assets:perfumes`)
- `scripts/generate-og-perfumes.mjs` — imagen OG (`npm run og:perfumes`)
- `test/perfumes-utils.test.mjs` — 17 tests
- `app/globals.css` — bloque `pf-` al final

### Ruteo en n8n

El payload manda una clave nueva **`producto` = `perfume`**, además de
`entry.comoabona` = `contraeembolso` (igual que zapatos) y la URL de la landing.

| Campo | Valor de ejemplo |
|---|---|
| `producto` | `perfume` |
| `entry.286442883` | `arabians-tonka, vip-rose, mandaryn-elixir` |
| `entry.1715320252` | `80000` (total) |
| `entry.736134777` | `27000` (costo, 3 x 9.000) |
| `entry.1885018612` | `Perfume: arabians-tonka - Arabians Tonka (Montale) - Unisex` (separado con `||`) |

### Decisiones de implementación

- Fotos con `object-fit: contain`: el nombre y las notas vienen impresos en la imagen,
  recortarlas dejaría el producto sin identificar.
- 3 fotos de WhatsApp son 3:4 y el resto 1:1. `contain` las deja con bandas
  blancas en vez de cortar el texto del envase.
- Sin testimonios y sin chat widget, igual que la V2 de zapatos.
- Las landings de zapatos no se tocaron: solo cambia el hash del CSS compartido.

### Bugs preexistentes encontrados (NO tocados)

`formatWhatsappNumber` en `src/lib/funnel-utils.js` falla con formatos que la gente
escribe todo el tiempo. El test del repo ya lo documenta y falla en `HEAD`:

| Entrada | Devuelve | Debería |
|---|---|---|
| `011-15-5645-7057` | `549111556457057` | `5491156457057` |
| `341 15 520-8671` | `549341155208671` | `5493415208671` |
| `15-5645-7057` | `''` (vacío) | `5491156457057` |

Afecta a **los dos funnels**: el número va al webhook y al WhatsApp de confirmación.
El caso `15-...` además vacía el campo, así que el formulario no se puede completar.
La causa es que el código hace `slice(2)` del `15` solo si está al principio, y
después del `0` inicial ya no coincide.

---

## 8. Stack técnico

- Next.js 16.2.1 `output: 'export'`, basePath `/2026`, React 19
- Source: `2026/_next-src/`, export → `2026/` y raíz del repo
- Build: `npm run build` (webpack) → `npm run export:site`
- Facebook Pixel: `1052677351596434`
- Webhook pedidos: `https://sswebhookss.odontolab.co/webhook/1e214d4e-...`
- WhatsApp confirmación: `5491127595502`
- Deploy: `npm run publish:site` (GitHub Pages)
