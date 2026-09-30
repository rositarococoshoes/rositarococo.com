/**
 * Datos del catálogo de perfumes para la landing de contrarreembolso.
 *
 * Separado de `funnel-data.js` (que es del funnel de calzados) a propósito:
 * los dos catálogos comparten el flujo de compra pero NO comparten producto,
 * precios ni forma del resumen del pedido. Mezclarlos obliga a guardar flags de
 * "modo perfume" por todos lados.
 *
 * Las fotos ya traen el nombre, la marca, el género y las notas impressos en la
 * propia imagen, así que acá se repiten como texto por SEO y para que la tarjeta
 * siga siendo legible si la imagen no carga.
 */

export const BASE_PATH = '/2026';

const asset = (id) => `${BASE_PATH}/assets/perfumes/${id}.webp`;

export const BRAND_LOGO_SRC = `${BASE_PATH}/assets/contrareembolso/rosita-form.webp`;
export const WHATSAPP_BUTTON_SRC = `${BASE_PATH}/assets/contrareembolso/enviarwsp.png`;

/** Reutilizado: mismo webhook y mismo número que el funnel de calzados. */
export const ORDER_WEBHOOK_URL =
  'https://sswebhookss.odontolab.co/webhook/1e214d4e-5481-4ded-8936-c63ff9ce7743';
export const WHATSAPP_CONFIRM_PHONE = '5491127595502';
export const PRODUCT_KIND = 'perfume';

/** Marca de producto que viaja en el payload para que n8n rutee. */
export const PRODUCT_KIND_FIELD = 'producto';

export const PRICING = {
  single: 40000,
  pair: 65000,
  trio: 80000,
  maxItems: 3,
  /** Costo de compra de un frasco 60 ml, para el cálculo de margen en n8n. */
  unitCost: 9000,
};

export const PRICING_TIERS = [
  { count: 1, price: PRICING.single, label: '$40.000' },
  { count: 2, price: PRICING.pair, label: '$65.000' },
  { count: 3, price: PRICING.trio, label: '$80.000', featured: true },
];

export const GENDERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'femenino', label: 'Femenino' },
  { id: 'unisex', label: 'Unisex' },
];

export const AROMA_FAMILIES = [
  { id: 'citricos', label: 'Cítricos y Frescos' },
  { id: 'florales', label: 'Florales y Románticos' },
  { id: 'dulces', label: 'Dulces y Gourmand' },
  { id: 'tropicales', label: 'Tropicales y Afrutados' },
  { id: 'intensos', label: 'Intensos y Amaderados' },
];

export const PAGE_COPY = {
  title: 'Perfumes por contrarreembolso',
  paymentRibbon: 'Pagás al recibir en efectivo',
  promoLine: 'Combiná los que quieras: el precio por unidad baja cada vez que sumás otro.',
  shippingNote: 'Solo CABA y GBA',
  checkoutTitle: 'Casi listos. Completá tus datos',
  whatsappModalTitle: 'Ingresa tu WhatsApp para continuar',
};

export const SHIPPING_BADGE = 'Envío gratis';

/**
 * Cada escalón de la promo con el total a pagar y lo que sale cada perfume.
 *
 * Se muestra en la tarjeta como "2 perfumes = $65.000 · $32.500 c/u": el total
 * es lo que la persona va a poner en efectivo, y el precio por unidad deja
 * claro que el descuento viene de la cantidad y no de que el perfume sea
 * distinto. Como la promo es plana y todos valen lo mismo, el bloque se calcula
 * una vez y se repite en las 23 tarjetas.
 *
 * `unit` redondea hacia arriba (Math.ceil) para no prometer una cifra que nadie
 * puede pagar: 80.000/3 son 26.666,67. `savingPerUnit` redondea hacia abajo por
 * lo mismo, así que el ahorro anunciado nunca es mayor al real.
 */
export const UNIT_PRICE_TIERS = PRICING_TIERS.map((tier) => {
  const exactUnit = tier.price / tier.count;
  return {
    count: tier.count,
    total: tier.price,
    unit: Math.ceil(exactUnit),
    unitLabel: `$${Math.ceil(exactUnit).toLocaleString('es-AR')}`,
    savingPerUnit: Math.floor(PRICING.single - exactUnit),
    totalLabel: `$${tier.price.toLocaleString('es-AR')}`,
  };
});

export const TRUST_POINTS = [
  {
    title: 'Elegís vos',
    body: '23 perfumes inspirados en marcas que ya conocés, filtrados por aroma y género.',
  },
  {
    title: 'Pagás al recibir',
    body: 'Entregamos en efectivo cuando llega a tu puerta. Sin anticipo, sin tarjetas.',
  },
  {
    title: 'Te lo armamos con promo',
    body: 'Cuantos más perfumes sumes, mejor el precio por unidad. Sin letra chica.',
  },
];

export const DELIVERY_LEGEND =
  'ENVÍO: elegí uno de los días disponibles para recibir. Si no estás, dejá a alguien con el efectivo. ' +
  'Te escribimos por WhatsApp y necesitás respondernos para que podamos confirmar el pedido y despachar. ' +
  'El pago es solo en efectivo y tenés que contar con el total.';

export const REVIEW_COMMITMENT =
  'PAGÁS SOLO EN EFECTIVO AL RECIBIR. SI NO DISPONÉS DE LA TOTALIDAD DEL EFECTIVO NO HAGAS EL PEDIDO. TU PEDIDO ES UN COMPROMISO DE PAGO.';

export const PRODUCTS = [
  {
    id: 'arabians-tonka',
    name: 'Arabians Tonka',
    brand: 'Montale',
    gender: 'unisex',
    family: 'intensos',
    description:
      'Dulce, avainillado y ambarado, con acordes de oud, especias cálidas, rosas, almizcle y un toque atalcado.',
  },
  {
    id: 'lady-million',
    name: 'Lady Million',
    brand: 'Rabanne',
    gender: 'femenino',
    family: 'florales',
    description:
      'Floral blanco, dulce y amielado, con matices cítricos, frutales, almizclados, de pachuli y ámbar.',
  },
  {
    id: 'power-of-you',
    name: 'Power of You',
    brand: 'Giorgio Armani',
    gender: 'femenino',
    family: 'tropicales',
    description:
      'Tropical, dulce y afrutado, con vainilla, cítricos, flores, notas frescas y un suave fondo ambarado.',
  },
  {
    id: 'cher-dieciocho',
    name: 'Cher Dieciocho',
    brand: 'María Cher',
    gender: 'femenino',
    family: 'dulces',
    description:
      'Dulce, amielado y caramelizado, con cítricos, flores blancas, cera de abeja, notas animales y pachuli.',
  },
  {
    id: 'vip-rose',
    name: '212 VIP Rosé',
    brand: 'Carolina Herrera',
    gender: 'femenino',
    family: 'florales',
    description:
      'Floral, afrutado y almizclado, con rosas, notas amaderadas y un delicado toque atalcado.',
  },
  {
    id: 'yara',
    name: 'Yara',
    brand: 'Lattafa',
    gender: 'femenino',
    family: 'tropicales',
    description:
      'Dulce, avainillado y frutal, con acordes tropicales, almizcle, flores, cítricos y un toque atalcado.',
  },
  {
    id: 'la-bomba',
    name: 'La Bomba',
    brand: 'Carolina Herrera',
    gender: 'femenino',
    family: 'tropicales',
    description:
      'Floral tropical, afrutado y avainillado, con una salida fresca y un fondo suave de pachuli.',
  },
  {
    id: 'eclaire',
    name: 'Eclaire',
    brand: 'Lattafa',
    gender: 'femenino',
    family: 'dulces',
    description:
      'Gourmand, dulce y cremoso, con vainilla, caramelo, miel, notas láctonicas y un toque atalcado.',
  },
  {
    id: 'black-xs',
    name: 'Black XS',
    brand: 'Rabanne',
    gender: 'femenino',
    family: 'intensos',
    description:
      'Cálido, especiado y dulce, con cacao, vainilla, frutas, rosas, pachuli y acordes amaderados.',
  },
  {
    id: 'mandaryn-elixir',
    name: 'Odyssey Mandaryn Elixir',
    brand: 'Armaf',
    gender: 'unisex',
    family: 'citricos',
    description:
      'Cítrico, dulce y aromático, con vainilla, caramelo, ámbar, lavanda y cálidas especias.',
  },
  {
    id: 'odyssey-mandarin',
    name: 'Odyssey Mandarin',
    brand: 'Armaf',
    gender: 'unisex',
    family: 'citricos',
    description: 'Cítrico, dulce y aromático, con caramelo, ámbar, vainilla y un fondo amaderado.',
  },
  {
    id: 'bombshell-nights',
    name: 'Bombshell Nights',
    brand: "Victoria's Secret",
    gender: 'femenino',
    family: 'tropicales',
    description: 'Dulce, floral y afrutado, con un fondo ambarado y almizclado.',
  },
  {
    id: 'scandal',
    name: 'Scandal',
    brand: 'Jean Paul Gaultier',
    gender: 'femenino',
    family: 'dulces',
    description:
      'Dulce y amielado, con flores blancas, caramelo, cítricos, cera de abeja, pachuli y maderas.',
  },
  {
    id: 'erba-pura',
    name: 'Erba Pura',
    brand: 'Xerjoff',
    gender: 'unisex',
    family: 'tropicales',
    description:
      'Frutal, dulce y fresco, con cítricos, vainilla, ámbar, almizcle y un suave toque atalcado.',
  },
  {
    id: 'ange-ou-demon',
    name: 'Ange ou Demon',
    brand: 'Givenchy',
    gender: 'femenino',
    family: 'intensos',
    description:
      'Avainillado y dulce, con flores blancas, especias cálidas, maderas, notas aromáticas y un fondo balsámico.',
  },
  {
    id: 'born-in-roma-purple',
    name: 'Born in Roma Purple Melancholia',
    brand: 'Valentino',
    gender: 'femenino',
    family: 'florales',
    description: 'Frutal, floral y dulce, con vainilla y un delicado toque especiado.',
  },
  {
    id: 'valentino-donna-born',
    name: 'Valentino Donna Born in Roma',
    brand: 'Valentino',
    gender: 'femenino',
    family: 'intensos',
    description:
      'Amaderado, avainillado y afrutado, con flores blancas, almizcle, cítricos verdes y especias suaves.',
  },
  {
    id: 'my-way',
    name: 'My Way',
    brand: 'Giorgio Armani',
    gender: 'femenino',
    family: 'florales',
    description: 'Floral blanco y cítrico, con nardos, vainilla y un delicado matiz almizclado.',
  },
  {
    id: 'yara-variante',
    name: 'Yara (variante)',
    brand: 'Lattafa',
    gender: 'femenino',
    family: 'tropicales',
    description:
      'Dulce, avainillado y frutal, con acordes tropicales, almizcle, flores, cítricos y un toque atalcado.',
  },
  {
    id: 'olympea',
    name: 'Olympea',
    brand: 'Rabanne',
    gender: 'femenino',
    family: 'intensos',
    description:
      'Avainillado, salado y ambarado, con matices atalcados, marinos, frescos y balsámicos.',
  },
  {
    id: 'la-vie-est-belle',
    name: "La Vie Est Belle L'Elixir",
    brand: 'Lancôme',
    gender: 'femenino',
    family: 'citricos',
    description:
      'Dulce y afrutado, con matices de rosas, cítricos, verdes y acuáticos, sobre un fondo ozónico, de cuero y sutilmente animalico.',
  },
  {
    id: 'bonbon',
    name: 'Bonbon',
    brand: 'Viktor&Rolf',
    gender: 'femenino',
    family: 'dulces',
    description:
      'Dulce y gourmand, con caramelo, cítricos y frutas, acompañado de flores blancas, ámbar, maderas y un toque atalcado.',
  },
  {
    id: 'fame',
    name: 'Fame',
    brand: 'Rabanne',
    gender: 'femenino',
    family: 'tropicales',
    description:
      'Tropical, afrutado y avainillado, con un fondo amaderado, floral blanco, atalcado y terpénico sobre un corazón de ámbar.',
  },
].map((product) => ({ ...product, image: asset(product.id) }));

export const GENDER_LABEL = {
  femenino: 'Femenino',
  unisex: 'Unisex',
};

export const FAMILY_LABEL = Object.fromEntries(
  AROMA_FAMILIES.map((family) => [family.id, family.label]),
);

/** "Arabians Tonka (Montale) - Unisex" */
export function formatPerfumeLine(product) {
  if (!product) return '';
  return `${product.name} (${product.brand}) - ${GENDER_LABEL[product.gender] || product.gender}`;
}
