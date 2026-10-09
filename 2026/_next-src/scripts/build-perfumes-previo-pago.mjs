/**
 * Genera `src/lib/perfumes-previo-pago-data.js` a partir del Excel del
 * catálogo, y convierte las fotos a WebP.
 *
 * Uso:  node scripts/build-perfumes-previo-pago.mjs
 *
 * Entradas:
 *   - catalogo-perfumes-completo.xlsx  (información de cada perfume)
 *   - fotos_catalogo/*.jpg             (66 fotos 1080x1080)
 *
 * El Excel trae 64 filas pero solo 61 productos: 3 aparecen duplicados con dos
 * fotos cada uno. Acá se agrupan por marca+perfume y se quedan todas sus fotos,
 * para que el carrusel tenga más de un ángulo cuando existe.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = 'C:/Users/Sebastián/Downloads/catalogorabesoriginales';
const XLSX = `${SRC}/catalogo-perfumes-completo.xlsx`;
const PHOTOS = `${SRC}/perfumes-catalogo-completo/fotos_catalogo`;
const OUT_DIR = resolve(__dirname, '..', 'public', 'assets', 'perfumes-previo-pago');
const OUT_DATA = resolve(__dirname, '..', 'src', 'lib', 'perfumes-previo-pago-data.js');

const MAX_EDGE = 800;
const QUALITY = 80;

/** Precios: ver scripts/calc-previo-pago-precios.mjs para el porqué. */
const PRICING = {
  maxItems: 3,
  unitCost: 9000,
  /** Precio de un perfume suelto: referencia para calcular el ahorro de los combos. */
  unitPrice: 50000,
  tiers: [
    { count: 1, price: 50000, cbu: 45000 },
    { count: 2, price: 80000, cbu: 72000 },
    { count: 3, price: 100000, cbu: 90000 },
  ],
};

/** Igual que en el funnel de calzados: CBU con 10% OFF. */
const CBU_FACTOR = 0.9;

// ---------------------------------------------------------------- xlsx reader

function unzip(sourcePath, targetDir) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });
  const ps =
    `Add-Type -AssemblyName System.IO.Compression.FileSystem;` +
    `[System.IO.Compression.ZipFile]::ExtractToDirectory('${sourcePath.replace(/\\/g, '/')}', '${targetDir.replace(/\\/g, '/')}')`;
  for (const shell of ['pwsh', 'powershell']) {
    try {
      execFileSync(shell, ['-NoProfile', '-Command', ps], { stdio: 'pipe' });
      return targetDir;
    } catch (e) {
      if (shell === 'powershell') throw e;
    }
  }
  return targetDir;
}

function unescapeXmlText(value) {
  return value
    .replace(/&(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);/g, (_, e) => {
      if (e === 'amp') return '&';
      if (e === 'lt') return '<';
      if (e === 'gt') return '>';
      if (e === 'quot') return '"';
      if (e === 'apos') return "'";
      if (e.startsWith('#x')) return String.fromCodePoint(parseInt(e.slice(2), 16));
      return String.fromCodePoint(parseInt(e.slice(1), 10));
    })
    .replace(/_(x[0-9a-fA-F]{4}|[0-9a-fA-F]{4}|u[0-9a-fA-F]{4})/g, (_, hex) => {
      if (hex[0] === 'x' || hex[0] === 'u') return String.fromCharCode(parseInt(hex.slice(1), 16));
      return String.fromCharCode(parseInt(hex, 16));
    });
}

function decodeEntities(s) {
  return s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function readSheet(xmlPath) {
  if (!fs.existsSync(xmlPath)) return [];
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const rows = [];
  const rowRe = /<row\b[^>]*>([\s\S]*?)<\/row>/g;
  let rowMatch;
  while ((rowMatch = rowRe.exec(xml))) {
    const cells = [];
    const cellRe = /<c\b([^>]*)(?:\/>|>([\s\S]*?)<\/c>)/g;
    let cellMatch;
    while ((cellMatch = cellRe.exec(rowMatch[1]))) {
      const attrs = cellMatch[1] || '';
      const inner = cellMatch[2] || '';
      const ref = (attrs.match(/r="([A-Z]+)\d+"/) || [])[1] || '';
      const type = (attrs.match(/t="([^"]+)"/) || [])[1] || 'n';
      let value = '';
      if (type === 'inlineStr') {
        const isMatch = inner.match(/<is>([\s\S]*?)<\/is>/);
        value = decodeEntities(unescapeXmlText((isMatch ? isMatch[1] : inner).replace(/<[^>]+>/g, '')));
      } else {
        const vMatch = inner.match(/<v>([\s\S]*?)<\/v>/);
        value = vMatch ? decodeEntities(unescapeXmlText(vMatch[1])) : '';
      }
      cells.push({ col: ref, value });
    }
    rows.push(cells);
  }
  return rows;
}

function colToIndex(col) {
  let n = 0;
  for (const ch of col) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

function toObjects(rows) {
  const headerIndex = rows.findIndex((c) => c.length > 2 && c[0].value.trim() === '#');
  if (headerIndex === -1) return [];
  const header = rows[headerIndex].map((c) => c.value.trim());
  return rows.slice(headerIndex + 1).map((cells) => {
    const obj = {};
    for (const { col, value } of cells) {
      const idx = colToIndex(col);
      obj[header[idx] || `col_${idx}`] = value;
    }
    return obj;
  });
}

// ------------------------------------------------------------- helpers

const clean = (s) => String(s || '').replace(/\s+/g, ' ').trim();

/**
 * La columna "Foto(s)" a veces trae dos archivos separados por un salto de línea
 * que al limpiar quedan pegados con un espacio: "a.jpg b.jpg". Hay que
 * separarlos otra vez, sin partir un nombre que tenga espacios.
 */
function splitPhotos(cell) {
  const raw = String(cell || '');
  const byLines = raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  if (byLines.length > 1) return byLines;

  // Una sola línea con varios .jpg pegados: los nombres de archivo del catálogo
  // no tienen espacios, así que se puede partir por ".jpg ".
  return raw
    .split(/\.jpg\s+/i)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (/\.jpe?g$/i.test(s) ? s : `${s}.jpg`));
}

/** "1 (26 fotos)" -> "1" */
const tandaOf = (s) => clean(s).replace(/\s*\(.*\)/, '');

/** Normaliza la marca: "RAVE (Lattafa)" y "Lattafa Pride" son marcas distintas en el Excel. */
const slug = (s) =>
  clean(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const GENDER_ID = { Unisex: 'unisex', Femenino: 'femenino', Masculino: 'masculino' };

/**
 * Las 49 "familia olfativa" del Excel son demasiado finos para un filtro.
 * Se agrupan en 5 familias parecidas a las del catálogo de contrarreembolso,
 * buscando la palabra clave en el texto de la familia del Excel.
 */
const FAMILY_RULES = [
  { id: 'frescos', label: 'Cítricos y Frescos', match: /cítric|fresc|acuátic|green|verde|hawa/ },
  { id: 'dulces', label: 'Dulces y Gourmand', match: /gourmand|dulce|caramel|vainill|azúcar/ },
  { id: 'amaderados', label: 'Amaderados y Cípres', match: /amaderad|chipre|chypre|madera|fougère|oud|báls|leather|cuero/ },
  { id: 'orientales', label: 'Orientales y Ámbar', match: /oriental|ámbar|ambar|tabaco|especiad|vainilla oriental/ },
  { id: 'florales', label: 'Florales', match: /floral|empolvad/ },
];

function familyOf(text) {
  const t = clean(text).toLowerCase();
  for (const rule of FAMILY_RULES) {
    if (rule.match.test(t)) return rule.id;
  }
  return 'florales';
}

/** Arma la descripción corta que va bajo el nombre en la tarjeta. */
/**
 * Descripción para la tarjeta: las tres pirámides de notas separadas por puntos
 * (salida · corazón · fondo) y, si el Excel la trae, la fragancia de referencia
 * como frase propia.
 */
function descriptionOf({ top, heart, base, similar }) {
  const notes = [top, heart, base].map(clean).filter(Boolean).join(' · ');
  const ref = clean(similar);
  const refText = ref && !ref.startsWith('—') ? ` Inspirado en ${ref.replace(/^≈\s*/, '')}.` : '';
  return notes + refText;
}

// ---------------------------------------------------------------- main

async function main() {
  if (!fs.existsSync(XLSX)) throw new Error('Falta el Excel: ' + XLSX);
  const tmp = unzip(XLSX, path.join(process.env.TEMP, `pp-cat-${Date.now()}`));

  const workbookXml = fs.readFileSync(path.join(tmp, 'xl', 'workbook.xml'), 'utf8');
  const sheetNames = [...workbookXml.matchAll(/<sheet\b[^>]*name="([^"]+)"/g)].map((m) => m[1]);
  const rows = readSheet(path.join(tmp, 'xl', 'worksheets', 'sheet1.xml'));
  fs.rmSync(tmp, { recursive: true, force: true });

  const raw = toObjects(rows);
  console.log(`filas del Excel: ${raw.length}`);

  // --- agrupar por marca+perfume, juntando fotos y quedándome con la primera fila con datos
  const byProduct = new Map();

  for (const row of raw) {
    const marca = clean(row['Marca']);
    const perfume = clean(row['Perfume']);
    if (!marca || !perfume) continue;

    const key = `${slug(marca)}--${slug(perfume)}`;
    const fotos = splitPhotos(row['Foto(s)']);

    if (!byProduct.has(key)) {
      byProduct.set(key, {
        key,
        marca,
        perfume,
        genero: GENDER_ID[clean(row['Género'])] || 'unisex',
        familia: familyOf(row['Familia olfativa']),
        familiaTexto: clean(row['Familia olfativa']),
        descripcion: descriptionOf({
          top: row['Notas de salida'],
          heart: row['Notas de corazón'],
          base: row['Notas de fondo'],
          similar: row['Similar a / inspirado en'],
        }),
        presentacion: clean(row['Presentación']),
        similar: clean(row['Similar a / inspirado en']),
        fotos: [],
      });
    }

    const entry = byProduct.get(key);
    for (const foto of fotos) {
      if (!entry.fotos.includes(foto)) entry.fotos.push(foto);
    }
  }

  const products = [...byProduct.values()];
  console.log(`productos únicos: ${products.length}`);
  console.log(`fotos referenciadas: ${products.reduce((s, p) => s + p.fotos.length, 0)}`);

  // --- convertir fotos a webp
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let bytesIn = 0;
  let bytesOut = 0;

  for (const product of products) {
    for (const [index, foto] of product.fotos.entries()) {
      const source = path.join(PHOTOS, foto);
      if (!fs.existsSync(source)) throw new Error(`Falta la foto ${foto} de ${product.key}`);

      const outName = `${product.key}-${index + 1}.webp`;
      const info = await sharp(source)
        .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(path.join(OUT_DIR, outName));

      product.imageFiles = product.imageFiles || [];
      product.imageFiles.push(outName);
      bytesIn += fs.statSync(source).size;
      bytesOut += info.size;
    }
  }

  console.log(`fotos: ${(bytesIn / 1048576).toFixed(1)} MB -> ${(bytesOut / 1048576).toFixed(2)} MB`);

  // --- emitir el módulo de datos
  const assets = Array.from({ length: 0 });

  const productsLiteral = products
    .map((p) => {
      const images = p.imageFiles.map((f) => `    asset('${f}'),`).join('\n');
      const similar = p.similar && !p.similar.startsWith('—') ? p.similar.replace(/^≈\s*/, '') : null;
      return [
        '  {',
        `    id: '${p.key}',`,
        `    name: '${p.perfume.replace(/'/g, "\\'")}',`,
        `    brand: '${p.marca.replace(/'/g, "\\'")}',`,
        `    gender: '${p.gender ?? p.genero}',`,
        `    family: '${p.familia}',`,
        `    familyLabel: '${p.familiaTexto.replace(/'/g, "\\'")}',`,
        `    similar: ${similar ? `'${similar.replace(/'/g, "\\'")}'` : 'null'},`,
        `    presentation: '${p.presentacion.replace(/'/g, "\\'")}',`,
        `    description:`,
        `      '${p.descripcion.replace(/'/g, "\\'")}',`,
        `    images: [`,
        images,
        `    ],`,
        '  },',
      ].join('\n');
    })
    .join('\n');

  const module = `/**
 * Catálogo de perfumes con PREVIO PAGO (tarjeta / MercadoPago / transferencia).
 *
 * NO editar a mano: se genera con
 *   node scripts/build-perfumes-previo-pago.mjs
 * desde catalogo-perfumes-completo.xlsx + las fotos crudas.
 *
 * Es un catálogo distinto al de contrarreembolso (src/lib/perfumes-data.js):
 * 61 perfumes de marcas Armaf, Afnan, Lattafa, Rasasi, Maison Alhambra, en
 * lugar de los 23 inspirados de marcas de lujo. Se mantienen archivos separados
 * porque los precios, el flujo de pago y el destino de los pedidos son otros.
 */

export const BASE_PATH = '/2026';

const asset = (file) => \`\${BASE_PATH}/assets/perfumes-previo-pago/\${file}\`;

export const BRAND_LOGO_SRC = \`\${BASE_PATH}/assets/contrareembolso/rosita-form.webp\`;
export const WHATSAPP_BUTTON_SRC = \`\${BASE_PATH}/assets/contrareembolso/enviarwsp.png\`;

export const ORDER_WEBHOOK_URL =
  'https://sswebhookss.odontolab.co/webhook/a5dcd3c9-48a3-46a1-a781-475737a634ca';
export const PAYMENT_LINK_WEBHOOK_URL =
  'https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30';
export const WHATSAPP_CONFIRM_PHONE = '5491127595502';

/** Ruteo en n8n: separa perfumes-previopago de calzados-previopago. */
export const PRODUCT_KIND = 'perfume-previopago';

export const PRICING = ${JSON.stringify(PRICING, null, 2).replace(/\n/g, '\n')};

export const GENDERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'femenino', label: 'Femenino' },
  { id: 'masculino', label: 'Masculino' },
  { id: 'unisex', label: 'Unisex' },
];

export const FAMILIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'frescos', label: 'Cítricos y Frescos' },
  { id: 'florales', label: 'Florales' },
  { id: 'dulces', label: 'Dulces y Gourmand' },
  { id: 'amaderados', label: 'Amaderados y Cípres' },
  { id: 'orientales', label: 'Orientales y Ámbar' },
];

export const GENDER_LABEL = {
  femenino: 'Femenino',
  masculino: 'Masculino',
  unisex: 'Unisex',
};

export const FAMILY_LABEL = {
  frescos: 'Cítricos y Frescos',
  florales: 'Florales',
  dulces: 'Dulces y Gourmand',
  amaderados: 'Amaderados y Cípres',
  orientales: 'Orientales y Ámbar',
};

export const PAGE_COPY = {
  title: 'Perfumes con pago online',
  paymentRibbon: 'Tarjeta, MercadoPago o transferencia',
  promoLine: '1 perfume $50.000 · 2 por $80.000 · 3 por $100.000. Transferencia con 10% OFF.',
  shippingNote: 'Envío gratis a todo el país',
  checkoutTitle: 'Casi listos. Completá tus datos',
  paymentLegend:
    'Elegí cómo querés pagar. Con tarjeta o saldo MercadoPago te redirigimos al link de pago seguro. ' +
    'Si elegís transferencia te mostramos los datos bancarios con el 10% de descuento ya aplicado.',
  reviewCommitment:
    'Verificá que tus datos y perfumes estén correctos antes de continuar. Tu pedido queda registrado con el medio de pago elegido.',
  freeShippingReminder: 'Recordá: envío gratis a todo el país. Transferencia bancaria con 10% OFF.',
  deliveryLegend:
    'ENVÍO: elegí uno de los días disponibles para recibir. Te escribimos por WhatsApp y necesitás ' +
    'respondernos para que podamos confirmar el pedido y despachar.',
};

export const TRUST_POINTS = [
  {
    title: '61 perfumes',
    body: 'Armaf, Afnan, Lattafa, Rasasi y más, con sus notas de salida, corazón y fondo.',
  },
  {
    title: 'Pagá como quieras',
    body: 'Tarjeta en 3 cuotas, saldo MercadoPago o transferencia con 10% OFF.',
  },
  {
    title: 'Envío gratis',
    body: 'A todo el país, con confirmación por WhatsApp antes de despachar.',
  },
];

export const PAYMENT_METHODS = [
  {
    value: 'tarjeta',
    label: '💳 Tarjeta de crédito o débito',
    helper: 'Hasta 3 cuotas sin interés. Te redirigimos al link de pago seguro.',
  },
  {
    value: 'mercadopago',
    label: '💲 Saldo en cuenta MercadoPago',
    helper: 'Abonás con tu saldo y te llevamos al link de pago seguro.',
  },
  {
    value: 'cbu',
    label: '🏦 Transferencia bancaria',
    helper: '10% de descuento. Te mostramos el CBU y el alias para enviar el comprobante.',
  },
];

export const PROVINCES = [
  'Buenos Aires',
  'Capital Federal',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tucumán',
];

export const BANK_DETAILS = {
  bank: 'Banco Santander',
  cbu: '0720570588000035387718',
  alias: 'RROCOCO.S',
  holder: 'Baustian Roxana',
};

export const THANK_YOU_ROUTES = {
  single: '/gracias-perfumes-pp-1',
  pair: '/gracias-perfumes-pp-2',
  trio: '/gracias-perfumes-pp-3',
};

export const PRODUCTS = [
${productsLiteral}
];

/** Escalón vigente para una cantidad de unidades del carrito. */
export function tierFor(count) {
  if (count <= 0) return PRICING.tiers[0];
  const index = Math.min(count, PRICING.tiers.length) - 1;
  return PRICING.tiers[index];
}

/** Precio final según medio de pago (la transferencia lleva 10% OFF). */
export function priceFor(count, paymentMethod) {
  const tier = tierFor(count);
  return paymentMethod === 'cbu'
    ? Math.round((tier.price * ${CBU_FACTOR}) / 50) * 50
    : tier.price;
}

export function formatPerfumeLine(product) {
  if (!product) return '';
  return \`\${product.name} (\${product.brand}) - \${GENDER_LABEL[product.gender] || product.gender}\`;
}
`;

  fs.mkdirSync(path.dirname(OUT_DATA), { recursive: true });
  fs.writeFileSync(OUT_DATA, module, 'utf8');
  console.log(`\nmódulo escrito en ${OUT_DATA}`);

  const byGender = {};
  const byFamily = {};
  for (const p of products) {
    byGender[p.genero] = (byGender[p.genero] || 0) + 1;
    byFamily[p.familia] = (byFamily[p.familia] || 0) + 1;
  }
  console.log('por género:', JSON.stringify(byGender));
  console.log('por familia:', JSON.stringify(byFamily));
  console.log('con 2+ fotos:', products.filter((p) => p.imageFiles.length > 1).length);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});