/**
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

const asset = (file) => `${BASE_PATH}/assets/perfumes-previo-pago/${file}`;

export const BRAND_LOGO_SRC = `${BASE_PATH}/assets/contrareembolso/rosita-form.webp`;
export const WHATSAPP_BUTTON_SRC = `${BASE_PATH}/assets/contrareembolso/enviarwsp.png`;

export const ORDER_WEBHOOK_URL =
  'https://sswebhookss.odontolab.co/webhook/a5dcd3c9-48a3-46a1-a781-475737a634ca';
export const PAYMENT_LINK_WEBHOOK_URL =
  'https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30';
export const WHATSAPP_CONFIRM_PHONE = '5491127595502';

/** Ruteo en n8n: separa perfumes-previopago de calzados-previopago. */
export const PRODUCT_KIND = 'perfume-previopago';

export const PRICING = {
  "maxItems": 3,
  "cartDiscounts": {
    "2": 10000,
    "3": 18000
  }
};

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
  promoLine:
    'Cada perfume con su precio. Llevás 2 y te descontamos $10.000, llevás 3 y te descontamos $18.000. ' +
    'Transferencia con 10% OFF.',
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

/** Rutas de las páginas finales. Una sola por tipo: el total ya no es fijo. */
export const THANK_YOU_ROUTE = '/gracias-perfumes-pp';
export const CBU_ROUTE = '/transferenciacbu-perfumes-pp';

export const PRODUCTS = [
  {
    id: 'armaf--club-de-nuit-sillage',
    name: 'Club de Nuit Sillage',
    brand: 'Armaf',
    gender: 'unisex',
    family: 'frescos',
    familyLabel: 'Chipre floral / cítrica amaderada',
    similar: 'Creed Silver Mountain Water',
    presentation: 'EDP 105 ml (+ body spray 125 ml)',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 55000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 124900,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 112400,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Bergamota, grosellas negras, limón, lima, hojas de violeta, jengibre · Rosa, iris, jazmín · Ambroxan, almizcle, sándalo, cedro Inspirado en Creed Silver Mountain Water.',
    images: [
    asset('armaf--club-de-nuit-sillage-1.webp'),
    asset('armaf--club-de-nuit-sillage-2.webp'),
    ],
  },
  {
    id: 'armaf--odyssey-go-mango',
    name: 'Odyssey Go Mango',
    brand: 'Armaf',
    gender: 'unisex',
    family: 'orientales',
    familyLabel: 'Floral oriental frutal',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 65000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 147600,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 132800,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Limón, pimienta rosa, jengibre, flores blancas · Mango, haba tonka, maderas secas · Madera de guayaco, ámbar, vainilla, notas de nuez, almizcle',
    images: [
    asset('armaf--odyssey-go-mango-1.webp'),
    asset('armaf--odyssey-go-mango-2.webp'),
    ],
  },
  {
    id: 'bharara--king',
    name: 'King',
    brand: 'Bharara',
    gender: 'masculino',
    family: 'amaderados',
    familyLabel: 'Ambarada frutal / fougère',
    similar: 'Xerjoff Erba Pura (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 90000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 204400,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 184000,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Naranja, bergamota, limón · Frutas (tutti frutti) · Almizcle blanco, ámbar, vainilla Inspirado en Xerjoff Erba Pura (según reseñas).',
    images: [
    asset('bharara--king-1.webp'),
    ],
  },
  {
    id: 'afnan--9am-pour-femme',
    name: '9AM Pour Femme',
    brand: 'Afnan',
    gender: 'femenino',
    family: 'florales',
    familyLabel: 'Floral frutal',
    similar: 'Armani My Way (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Hoja de manzana, mandarina, osmanto · Magnolia, almizcle · Iris blanco Inspirado en Armani My Way (según reseñas).',
    images: [
    asset('afnan--9am-pour-femme-1.webp'),
    asset('afnan--9am-pour-femme-2.webp'),
    ],
  },
  {
    id: 'al-haramain--amber-oud-gold-edition',
    name: 'Amber Oud Gold Edition',
    brand: 'Al Haramain',
    gender: 'unisex',
    family: 'dulces',
    familyLabel: 'Ambarada vainilla frutal',
    similar: 'Xerjoff Erba Pura',
    presentation: 'EDP 120 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 80000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 181700,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 163500,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Bergamota, notas verdes · Melón, piña, notas dulces (gourmand), ámbar · Vainilla, almizcle, maderas Inspirado en Xerjoff Erba Pura.',
    images: [
    asset('al-haramain--amber-oud-gold-edition-1.webp'),
    ],
  },
  {
    id: 'maison-alhambra--eternal-touch',
    name: 'Eternal Touch',
    brand: 'Maison Alhambra',
    gender: 'unisex',
    family: 'dulces',
    familyLabel: 'Oriental gourmand / tabaco',
    similar: 'Tom Ford Tobacco Vanille',
    presentation: 'EDP 80 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 35000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 79500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 71600,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Hoja de tabaco, especias · Vainilla, cacao, haba tonka, flor de tabaco · Frutas secas, maderas Inspirado en Tom Ford Tobacco Vanille.',
    images: [
    asset('maison-alhambra--eternal-touch-1.webp'),
    ],
  },
  {
    id: 'maison-alhambra--glacier-ultra',
    name: 'Glacier Ultra',
    brand: 'Maison Alhambra',
    gender: 'unisex',
    family: 'frescos',
    familyLabel: 'Especiada fresca amaderada',
    similar: 'JPG Ultra Male',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 35000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 79500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 71600,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Canela, pimienta, limón · Lavanda, salvia esclarea, pachulí · Vainilla, ámbar, cedro Inspirado en JPG Ultra Male.',
    images: [
    asset('maison-alhambra--glacier-ultra-1.webp'),
    ],
  },
  {
    id: 'lattafa--haya',
    name: 'Haya',
    brand: 'Lattafa',
    gender: 'femenino',
    family: 'florales',
    familyLabel: 'Floral frutal',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 40000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 90800,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 81700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Champagne, frutilla, mandarina, naranja sanguina, rosa · Gardenia, jazmín, orquídea de vainilla · Ámbar, sándalo, castaña',
    images: [
    asset('lattafa--haya-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-iconic',
    name: 'Club de Nuit Iconic',
    brand: 'Armaf',
    gender: 'masculino',
    family: 'amaderados',
    familyLabel: 'Amaderada aromática azul ("blue")',
    similar: 'Bleu de Chanel (según reseñas)',
    presentation: 'EDP 105 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 65000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 147600,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 132800,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Pomelo, limón, menta, pimienta rosa, cilantro · Jengibre, nuez moscada, jazmín, melón · Incienso, ámbar, cedro, sándalo, pachulí, labdanum Inspirado en Bleu de Chanel (según reseñas).',
    images: [
    asset('armaf--club-de-nuit-iconic-1.webp'),
    ],
  },
  {
    id: 'lattafa--her-confession',
    name: 'Her Confession',
    brand: 'Lattafa',
    gender: 'femenino',
    family: 'dulces',
    familyLabel: 'Floral oriental gourmand',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 55000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 124900,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 112400,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Canela, acordes místicos · Jazmín, tuberosa, incienso, mahonial · Vainilla, almizcle, haba tonka',
    images: [
    asset('lattafa--her-confession-1.webp'),
    ],
  },
  {
    id: 'maison-alhambra--la-rouge-baroque-extreme',
    name: 'La Rouge Baroque Extreme',
    brand: 'Maison Alhambra',
    gender: 'unisex',
    family: 'orientales',
    familyLabel: 'Ambarada especiada (azafrán y almendra)',
    similar: 'MFK Baccarat Rouge 540 Extrait',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 35000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 79500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 71600,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Azafrán, almendra · Maderas, cedro, jazmín egipcio · Maderas, ámbar gris, almizcle Inspirado en MFK Baccarat Rouge 540 Extrait.',
    images: [
    asset('maison-alhambra--la-rouge-baroque-extreme-1.webp'),
    ],
  },
  {
    id: 'maison-alhambra--la-vivacite-intensa',
    name: 'La Vivacité Intensa',
    brand: 'Maison Alhambra',
    gender: 'femenino',
    family: 'dulces',
    familyLabel: 'Floral frutal gourmand',
    similar: 'Lancôme La Vie Est Belle Intensément',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 35000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 79500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 71600,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Grosella negra, pera · Jazmín, azahar · Praliné, vainilla, pachulí, haba tonka Inspirado en Lancôme La Vie Est Belle Intensément.',
    images: [
    asset('maison-alhambra--la-vivacite-intensa-1.webp'),
    ],
  },
  {
    id: 'lattafa--his-confession',
    name: 'His Confession',
    brand: 'Lattafa',
    gender: 'masculino',
    family: 'amaderados',
    familyLabel: 'Floral empolvado amaderado',
    similar: 'Celine Black Tie',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 55000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 124900,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 112400,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Canela, lavanda, mandarina · Iris, benjuí, ciprés, mahonial · Vainilla, haba tonka, incienso, ámbar, cedro, pachulí Inspirado en Celine Black Tie.',
    images: [
    asset('lattafa--his-confession-1.webp'),
    ],
  },
  {
    id: 'armaf--odyssey-homme-white-edition',
    name: 'Odyssey Homme White Edition',
    brand: 'Armaf',
    gender: 'masculino',
    family: 'frescos',
    familyLabel: 'Ambarada fougère fresca',
    similar: 'Armani Stronger With You / Invictus Aqua (reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 45000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 102200,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 92000,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Pimienta rosa, pomelo, yuzu · Hoja de violeta, notas marinas · Ámbar, amberwood, madera de guayaco Inspirado en Armani Stronger With You / Invictus Aqua (reseñas).',
    images: [
    asset('armaf--odyssey-homme-white-edition-1.webp'),
    ],
  },
  {
    id: 'lattafa-pride--pisa',
    name: 'Pisa',
    brand: 'Lattafa Pride',
    gender: 'masculino',
    family: 'frescos',
    familyLabel: 'Cítrica amaderada fresca',
    similar: 'Bvlgari Tygar',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 65000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 147600,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 132800,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Mandarina, limón, bergamota · Cedro · Sándalo, ámbar Inspirado en Bvlgari Tygar.',
    images: [
    asset('lattafa-pride--pisa-1.webp'),
    asset('lattafa-pride--pisa-2.webp'),
    ],
  },
  {
    id: 'rave-lattafa--now',
    name: 'Now',
    brand: 'RAVE (Lattafa)',
    gender: 'masculino',
    family: 'amaderados',
    familyLabel: 'Frutal amaderada (estilo chypre)',
    similar: 'estilo Creed Aventus (piña)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 35000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 79500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 71600,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: false,
    description:
      'Grosella negra, bergamota, manzana, piña · Rosa, abedul seco, jazmín marroquí, pachulí · Musgo de roble, almizcle, ámbar gris, vainilla Inspirado en estilo Creed Aventus (piña).',
    images: [
    asset('rave-lattafa--now-1.webp'),
    ],
  },
  {
    id: 'armaf--odyssey-mandarin-sky',
    name: 'Odyssey Mandarin Sky',
    brand: 'Armaf',
    gender: 'masculino',
    family: 'dulces',
    familyLabel: 'Ambarada dulce especiada',
    similar: 'JPG Scandal Pour Homme',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 50000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 113500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 102200,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Salvia, mandarina, naranja, azafrán · Caramelo, haba tonka, tagetes (marigold) · Vetiver, cedro, ambroxan Inspirado en JPG Scandal Pour Homme.',
    images: [
    asset('armaf--odyssey-mandarin-sky-1.webp'),
    ],
  },
  {
    id: 'armaf--odyssey-candee',
    name: 'Odyssey Candee',
    brand: 'Armaf',
    gender: 'femenino',
    family: 'dulces',
    familyLabel: 'Floral frutal gourmand',
    similar: 'Burberry Her (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 45000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 102200,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 92000,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Frutilla, frambuesa, geranio, durazno, bergamota · Caramelo, jazmín, maracuyá · Pachulí, almizcle, ámbar Inspirado en Burberry Her (según reseñas).',
    images: [
    asset('armaf--odyssey-candee-1.webp'),
    ],
  },
  {
    id: 'armaf--odyssey-ba-ha-mas-bahamas',
    name: 'Odyssey Ba Ha Mas (Bahamas)',
    brand: 'Armaf',
    gender: 'unisex',
    family: 'frescos',
    familyLabel: 'Frutal acuática',
    similar: 'Le Sel d\'Issey (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 65000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 147600,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 132800,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Melón cantalupo, melón, algas, sal, manzana Granny Smith, pera, ciruela · Notas acuáticas, nenúfar, musgo de roble, incienso · Almizcle, azúcar, ámbar, cedro Inspirado en Le Sel d\'Issey (según reseñas).',
    images: [
    asset('armaf--odyssey-ba-ha-mas-bahamas-1.webp'),
    ],
  },
  {
    id: 'lattafa--victoria',
    name: 'Victoria',
    brand: 'Lattafa',
    gender: 'unisex',
    family: 'dulces',
    familyLabel: 'Floral frutal gourmand',
    similar: 'D&G Devotion (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 50000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 113500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 102200,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Pie de limón (lemon meringue) · Neroli · Vainilla Inspirado en D&G Devotion (según reseñas).',
    images: [
    asset('lattafa--victoria-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-verde',
    name: 'Hawas Verde',
    brand: 'Rasasi',
    gender: 'masculino',
    family: 'frescos',
    familyLabel: 'Cítrica aromática verde',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 75000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 170300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 153300,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Lima, manzana verde · Romero · Pachulí, ámbar',
    images: [
    asset('rasasi--hawas-verde-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-tropical',
    name: 'Hawas Tropical',
    brand: 'Rasasi',
    gender: 'masculino',
    family: 'frescos',
    familyLabel: 'Aromática verde amaderada',
    similar: 'JPG Le Beau Paradise Garden',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 80000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 181700,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 163500,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Hoja de higo, agua de coco, jengibre · Coco, higo, menta · Haba tonka, almizcle, sándalo Inspirado en JPG Le Beau Paradise Garden.',
    images: [
    asset('rasasi--hawas-tropical-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-pink-for-her',
    name: 'Hawas Pink For Her',
    brand: 'Rasasi',
    gender: 'femenino',
    family: 'dulces',
    familyLabel: 'Floral gourmand',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 80000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 181700,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 163500,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Neroli egipcio, canela, nuez moscada · Azahar, tuberosa, malvavisco dorado · Algodón de azúcar, vainilla, haba tonka',
    images: [
    asset('rasasi--hawas-pink-for-her-1.webp'),
    ],
  },
  {
    id: 'armaf--odyssey-aqua',
    name: 'Odyssey Aqua',
    brand: 'Armaf',
    gender: 'masculino',
    family: 'frescos',
    familyLabel: 'Amaderada aromática fresca',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Naranja, pomelo, artemisa · Menta, lavanda · Ambroxan, pachulí, ciprés',
    images: [
    asset('armaf--odyssey-aqua-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-for-him-kobra',
    name: 'Hawas For Him Kobra',
    brand: 'Rasasi',
    gender: 'masculino',
    family: 'amaderados',
    familyLabel: 'Oriental amaderada',
    similar: 'Louis Vuitton Imagination (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 80000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 181700,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 163500,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Jengibre, bergamota, mandarina · Té verde, canela, neroli · Almizcle, notas amaderadas, ámbar Inspirado en Louis Vuitton Imagination (según reseñas).',
    images: [
    asset('rasasi--hawas-for-him-kobra-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-ice-for-him',
    name: 'Hawas Ice For Him',
    brand: 'Rasasi',
    gender: 'masculino',
    family: 'florales',
    familyLabel: 'Aromática frutal',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 70000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 159000,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 143100,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Manzana, limón italiano, bergamota siciliana, anís estrellado · Ciruela, azahar, cardamomo · Almizcle, ámbar, madera a la deriva, musgo',
    images: [
    asset('rasasi--hawas-ice-for-him-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-for-him-original',
    name: 'Hawas For Him (original)',
    brand: 'Rasasi',
    gender: 'masculino',
    family: 'frescos',
    familyLabel: 'Acuática aromática',
    similar: 'Invictus Aqua (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 50000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 113500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 102200,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Manzana, bergamota, limón, canela · Notas acuáticas, ciruela, azahar, cardamomo · Ámbar gris, almizcle, madera a la deriva, pachulí Inspirado en Invictus Aqua (según reseñas).',
    images: [
    asset('rasasi--hawas-for-him-original-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-for-him-malibu',
    name: 'Hawas For Him Malibu',
    brand: 'Rasasi',
    gender: 'masculino',
    family: 'florales',
    familyLabel: 'Aromática frutal',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 85000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 193000,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 173700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Piña, naranja, pomelo · Raíz de iris (orris), lavanda, ámbar · Haba tonka, almizcle, pachulí, madera de cachemira',
    images: [
    asset('rasasi--hawas-for-him-malibu-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-for-him-fire',
    name: 'Hawas For Him Fire',
    brand: 'Rasasi',
    gender: 'masculino',
    family: 'frescos',
    familyLabel: 'Aromática acuática',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 65000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 147600,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 132800,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Salvia esclarea · Notas marinas, jazmín egipcio · Ámbar, notas minerales, ámbar gris',
    images: [
    asset('rasasi--hawas-for-him-fire-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-elixir',
    name: 'Hawas Elixir',
    brand: 'Rasasi',
    gender: 'unisex',
    family: 'dulces',
    familyLabel: 'Oriental vainilla / gourmand',
    similar: 'JPG Le Male Elixir (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Menta, bergamota, artemisa · Chocolate negro, lavanda, benjuí · Vainilla, haba tonka, almizcle blanco Inspirado en JPG Le Male Elixir (según reseñas).',
    images: [
    asset('rasasi--hawas-elixir-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-for-her-eclat',
    name: 'Hawas For Her Eclat',
    brand: 'Rasasi',
    gender: 'femenino',
    family: 'orientales',
    familyLabel: 'Floral oriental frutal',
    similar: 'Parfums de Marly Delina La Rosée',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 50000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 113500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 102200,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Lichi, bergamota, pera, pistacho · Rosa, incienso · Vainilla, ámbar, almizcle, notas amaderadas Inspirado en Parfums de Marly Delina La Rosée.',
    images: [
    asset('rasasi--hawas-for-her-eclat-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-for-her-diva',
    name: 'Hawas For Her Diva',
    brand: 'Rasasi',
    gender: 'femenino',
    family: 'orientales',
    familyLabel: 'Floral oriental',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 80000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 181700,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 163500,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Frutos rojos, ruibarbo, lichi · Incienso (olíbano), rosa, cedro · Vainilla, ámbar gris, almizcle',
    images: [
    asset('rasasi--hawas-for-her-diva-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-for-her-original',
    name: 'Hawas For Her (original)',
    brand: 'Rasasi',
    gender: 'femenino',
    family: 'amaderados',
    familyLabel: 'Floral frutal amaderada',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 45000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 102200,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 92000,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Manzana, pomelo, granada · Jazmín sambac, iris, cítricos · Pachulí, vetiver, praliné',
    images: [
    asset('rasasi--hawas-for-her-original-1.webp'),
    ],
  },
  {
    id: 'afnan--turathi-electric',
    name: 'Turathi Electric',
    brand: 'Afnan',
    gender: 'unisex',
    family: 'florales',
    familyLabel: 'Floral frutal',
    similar: 'Ex Nihilo Blue Talisman (según reseñas)',
    presentation: 'EDP 90 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Pera, pomelo rosa, mandarina, bergamota · Azahar, manzana, cedro · Almizcle, ámbar, vainilla Inspirado en Ex Nihilo Blue Talisman (según reseñas).',
    images: [
    asset('afnan--turathi-electric-1.webp'),
    ],
  },
  {
    id: 'afnan--turathi-blue',
    name: 'Turathi (Blue)',
    brand: 'Afnan',
    gender: 'masculino',
    family: 'frescos',
    familyLabel: 'Aromática acuática',
    similar: null,
    presentation: 'EDP 90 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Bergamota, mandarina · Ámbar, notas amaderadas · Almizcle, pachulí, especias frescas',
    images: [
    asset('afnan--turathi-blue-1.webp'),
    ],
  },
  {
    id: 'afnan--9pm-rebel',
    name: '9PM Rebel',
    brand: 'Afnan',
    gender: 'masculino',
    family: 'dulces',
    familyLabel: 'Frutal amaderada gourmand',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Mandarina, piña, manzana Granny Smith · Cedro, musgo de roble, vainilla · Caramelo, maderas secas, ámbar gris, almizcle',
    images: [
    asset('afnan--9pm-rebel-1.webp'),
    ],
  },
  {
    id: 'rasasi--hawas-black-for-him',
    name: 'Hawas Black For Him',
    brand: 'Rasasi',
    gender: 'masculino',
    family: 'florales',
    familyLabel: 'Aromática frutal',
    similar: 'Nishane Hacivat (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 50000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 113500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 102200,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Piña, pomelo, bergamota · Pachulí, cedro, jazmín · Musgo de roble, notas amaderadas, ámbar Inspirado en Nishane Hacivat (según reseñas).',
    images: [
    asset('rasasi--hawas-black-for-him-1.webp'),
    ],
  },
  {
    id: 'afnan--9pm-elixir',
    name: '9PM Elixir',
    brand: 'Afnan',
    gender: 'unisex',
    family: 'orientales',
    familyLabel: 'Oriental especiada',
    similar: null,
    presentation: 'Parfum Intense 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 65000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 147600,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 132800,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Cardamomo, nuez moscada, elemi · Pimiento, cuero, lavanda · Vainilla, pachulí, labdanum, jara (rock rose)',
    images: [
    asset('afnan--9pm-elixir-1.webp'),
    ],
  },
  {
    id: 'afnan--9pm',
    name: '9PM',
    brand: 'Afnan',
    gender: 'masculino',
    family: 'dulces',
    familyLabel: 'Oriental vainilla',
    similar: 'JPG Ultra Male (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 55000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 124900,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 112400,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Manzana, canela, lavanda silvestre, bergamota · Azahar, lirio de los valles · Vainilla, haba tonka, ámbar, pachulí Inspirado en JPG Ultra Male (según reseñas).',
    images: [
    asset('afnan--9pm-1.webp'),
    ],
  },
  {
    id: 'afnan--9pm-pour-femme',
    name: '9PM Pour Femme',
    brand: 'Afnan',
    gender: 'femenino',
    family: 'amaderados',
    familyLabel: 'Amaderada floral',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 55000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 124900,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 112400,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Frambuesa, manzana, violeta, naranja · Rosa, peonía, iris, jazmín · Cedro, ciprés, pino, ámbar',
    images: [
    asset('afnan--9pm-pour-femme-1.webp'),
    ],
  },
  {
    id: 'afnan--9pm-night-out',
    name: '9PM Night Out',
    brand: 'Afnan',
    gender: 'unisex',
    family: 'orientales',
    familyLabel: 'Oriental especiada',
    similar: null,
    presentation: 'Extrait de Parfum 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 90000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 204400,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 184000,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Pitahaya (fruta del dragón), lavanda, coñac, manzana, bergamota · Toffee, cardamomo, gamuza, cedro, mahonial · Haba tonka, Ambrofix, pachulí, akigalawood',
    images: [
    asset('afnan--9pm-night-out-1.webp'),
    ],
  },
  {
    id: 'afnan--9am',
    name: '9AM',
    brand: 'Afnan',
    gender: 'masculino',
    family: 'frescos',
    familyLabel: 'Cítrica especiada',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 50000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 113500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 102200,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Limón, mandarina, pimienta rosa, cardamomo · Manzana verde, lavanda, azahar, rosa · Almizcle, musgo, pachulí, cedro',
    images: [
    asset('afnan--9am-1.webp'),
    asset('afnan--9am-2.webp'),
    ],
  },
  {
    id: 'lattafa--yara-tous',
    name: 'Yara Tous',
    brand: 'Lattafa',
    gender: 'femenino',
    family: 'florales',
    familyLabel: 'Floral frutal tropical',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 40000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 90800,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 81700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Mango, coco, maracuyá · Jazmín, azahar, heliotropo · Vainilla, almizcle, cachemirán',
    images: [
    asset('lattafa--yara-tous-1.webp'),
    ],
  },
  {
    id: 'lattafa--yara-moi',
    name: 'Yara Moi',
    brand: 'Lattafa',
    gender: 'femenino',
    family: 'dulces',
    familyLabel: 'Ámbar floral gourmand',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 40000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 90800,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 81700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Jazmín, durazno · Caramelo, ámbar · Pachulí, sándalo',
    images: [
    asset('lattafa--yara-moi-1.webp'),
    ],
  },
  {
    id: 'lattafa--yara-pink',
    name: 'Yara (Pink)',
    brand: 'Lattafa',
    gender: 'femenino',
    family: 'dulces',
    familyLabel: 'Ámbar vainilla',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 40000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 90800,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 81700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Mandarina, heliotropo, orquídea · Frutas tropicales, acorde gourmand · Vainilla, almizcle, sándalo',
    images: [
    asset('lattafa--yara-pink-1.webp'),
    ],
  },
  {
    id: 'lattafa--asad-zanzibar',
    name: 'Asad Zanzibar',
    brand: 'Lattafa',
    gender: 'masculino',
    family: 'orientales',
    familyLabel: 'Oriental tropical',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 35000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 79500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 71600,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Lavanda, pimienta negra · Agua de coco, iris, sal · Vainilla, incienso',
    images: [
    asset('lattafa--asad-zanzibar-1.webp'),
    ],
  },
  {
    id: 'lattafa--asad-elixir',
    name: 'Asad Elixir',
    brand: 'Lattafa',
    gender: 'masculino',
    family: 'amaderados',
    familyLabel: 'Oriental amaderada',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Pimienta rosa, azafrán, pomelo · Tabaco, vainilla, cedro · Ámbar claro, olíbano, pachulí, cachemirán',
    images: [
    asset('lattafa--asad-elixir-1.webp'),
    ],
  },
  {
    id: 'lattafa--yara-candy',
    name: 'Yara Candy',
    brand: 'Lattafa',
    gender: 'femenino',
    family: 'dulces',
    familyLabel: 'Floral frutal gourmand',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 40000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 90800,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 81700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Mandarina verde, grosella negra · Caramelo de frutilla efervescente, gardenia · Sándalo, jarabe de vainilla, almizcle, ámbar',
    images: [
    asset('lattafa--yara-candy-1.webp'),
    ],
  },
  {
    id: 'lattafa--asad',
    name: 'Asad',
    brand: 'Lattafa',
    gender: 'masculino',
    family: 'orientales',
    familyLabel: 'Oriental especiada',
    similar: 'Dior Sauvage Elixir (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 40000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 90800,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 81700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: false,
    description:
      'Pimienta negra, tabaco, piña · Pachulí, café, iris · Vainilla, ámbar, maderas secas, benjuí, labdanum Inspirado en Dior Sauvage Elixir (según reseñas).',
    images: [
    asset('lattafa--asad-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-woman',
    name: 'Club de Nuit Woman',
    brand: 'Armaf',
    gender: 'femenino',
    family: 'amaderados',
    familyLabel: 'Floral frutal chipre',
    similar: 'Chanel Coco Mademoiselle (inspiración)',
    presentation: 'EDP 105 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 50000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 113500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 102200,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Naranja, bergamota, pomelo, durazno · Rosa, jazmín, geranio, lichi · Pachulí, almizcle, vainilla, vetiver Inspirado en Chanel Coco Mademoiselle (inspiración).',
    images: [
    asset('armaf--club-de-nuit-woman-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-urban-man-elixir',
    name: 'Club de Nuit Urban Man Elixir',
    brand: 'Armaf',
    gender: 'masculino',
    family: 'orientales',
    familyLabel: 'Ambarada aromática',
    similar: 'Aventus + Sauvage (según reseñas)',
    presentation: 'EDP 105 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 70000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 159000,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 143100,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Bergamota, pimienta rosa, azahar, jazmín · Lavanda, elemi, geranio, vetiver, azafrán, marigold · Ambroxan, ámbar, cedro, pachulí, labdanum Inspirado en Aventus + Sauvage (según reseñas).',
    images: [
    asset('armaf--club-de-nuit-urban-man-elixir-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-untold',
    name: 'Club de Nuit Untold',
    brand: 'Armaf',
    gender: 'unisex',
    family: 'amaderados',
    familyLabel: 'Ámbar amaderada',
    similar: 'MFK Baccarat Rouge 540 (según reseñas)',
    presentation: 'EDP 105 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 65000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 147600,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 132800,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Azafrán, jazmín · Amberwood, ámbar gris · Resina de abeto, cedro Inspirado en MFK Baccarat Rouge 540 (según reseñas).',
    images: [
    asset('armaf--club-de-nuit-untold-1.webp'),
    ],
  },
  {
    id: 'lattafa--asad-bourbon',
    name: 'Asad Bourbon',
    brand: 'Lattafa',
    gender: 'masculino',
    family: 'dulces',
    familyLabel: 'Oriental especiada gourmand',
    similar: null,
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Lavanda, ciruela mirabel, pimienta rosa · Cacao, nuez moscada, davana · Vainilla de bourbon, ámbar, vetiver',
    images: [
    asset('lattafa--asad-bourbon-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-precieux-i',
    name: 'Club de Nuit Precieux I',
    brand: 'Armaf',
    gender: 'unisex',
    family: 'amaderados',
    familyLabel: 'Amaderada oriental',
    similar: 'Aventus Absolu (según reseñas)',
    presentation: 'Extrait de Parfum 55 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 80000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 181700,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 163500,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Piña, limón, bergamota, caramelo, pimienta rosa, pera, pimienta negra · Musgo de roble, maderas blancas, jazmín, lirio de los valles, anís · Ambroxan, almizcle blanco, cedro, pachulí, cuero, ámbar, vainilla Inspirado en Aventus Absolu (según reseñas).',
    images: [
    asset('armaf--club-de-nuit-precieux-i-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-oud',
    name: 'Club de Nuit Oud',
    brand: 'Armaf',
    gender: 'unisex',
    family: 'dulces',
    familyLabel: 'Frutal dulce amaderada',
    similar: null,
    presentation: 'EDP 105 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 80000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 181700,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 163500,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Durazno, pera, maracuyá, piña, ciruela, bergamota · Jazmín, madera de cachemira, fresia, hojas de violeta · Almizcle, ámbar cristal, vainilla, oud de Camboya',
    images: [
    asset('armaf--club-de-nuit-oud-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-milestone',
    name: 'Club de Nuit Milestone',
    brand: 'Armaf',
    gender: 'unisex',
    family: 'amaderados',
    familyLabel: 'Amaderada floral almizclada',
    similar: null,
    presentation: 'EDP 105 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Notas marinas, frutos rojos, bergamota · Violeta, maderas blancas, sándalo · Almizcle, ambroxan, vetiver',
    images: [
    asset('armaf--club-de-nuit-milestone-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-lionheart-woman',
    name: 'Club de Nuit Lionheart Woman',
    brand: 'Armaf',
    gender: 'femenino',
    family: 'dulces',
    familyLabel: 'Oriental vainilla',
    similar: 'Burberry Goddess (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Lavanda, vainilla · Cacao, jengibre · Vainilla absoluta Inspirado en Burberry Goddess (según reseñas).',
    images: [
    asset('armaf--club-de-nuit-lionheart-woman-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-lionheart-man',
    name: 'Club de Nuit Lionheart Man',
    brand: 'Armaf',
    gender: 'masculino',
    family: 'amaderados',
    familyLabel: 'Oriental fougère',
    similar: 'JPG Le Male Elixir (según reseñas)',
    presentation: 'EDP 100 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 70000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 159000,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 143100,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Lavanda, menta · Benjuí, vainilla · Miel, haba tonka, tabaco Inspirado en JPG Le Male Elixir (según reseñas).',
    images: [
    asset('armaf--club-de-nuit-lionheart-man-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-intense-woman',
    name: 'Club de Nuit Intense Woman',
    brand: 'Armaf',
    gender: 'femenino',
    family: 'amaderados',
    familyLabel: 'Chipre floral especiada',
    similar: 'Tom Ford Noir de Noir (según reseñas)',
    presentation: 'EDP 105 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 50000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 113500,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 102200,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Rosa, azafrán, geranio · Nuez moscada, pimienta, violeta, alcaravea · Pachulí, vainilla, oud, ámbar Inspirado en Tom Ford Noir de Noir (según reseñas).',
    images: [
    asset('armaf--club-de-nuit-intense-woman-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-intense-man-edt',
    name: 'Club de Nuit Intense Man (EDT)',
    brand: 'Armaf',
    gender: 'masculino',
    family: 'amaderados',
    familyLabel: 'Amaderada especiada frutal',
    similar: 'Creed Aventus (según reseñas)',
    presentation: 'EDT 105 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 60000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 136300,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 122700,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Limón, piña, grosella negra, bergamota, manzana · Abedul, jazmín, rosa · Almizcle, ámbar gris, pachulí, vainilla Inspirado en Creed Aventus (según reseñas).',
    images: [
    asset('armaf--club-de-nuit-intense-man-edt-1.webp'),
    ],
  },
  {
    id: 'armaf--club-de-nuit-maleka',
    name: 'Club de Nuit Maleka',
    brand: 'Armaf',
    gender: 'femenino',
    family: 'florales',
    familyLabel: 'Floral frutal empolvada',
    similar: 'Creed Queen of Silk (según reseñas)',
    presentation: 'EDP 105 ml',
    /** Costo de reposición. No se muestra al cliente. */
    cost: 65000,
    /** Precio de venta con tarjeta o saldo MercadoPago. */
    price: 147600,
    /** Preciofinal por transferencia bancaria (10% menos). */
    cbuPrice: 132800,
    /** El costo todavía no fue confirmado por el usuario. */
    priceConfirmed: true,
    description:
      'Lichi, bergamota, pimienta rosa · Orris (raíz de lirio) · Praliné, sándalo, ambroxan Inspirado en Creed Queen of Silk (según reseñas).',
    images: [
    asset('armaf--club-de-nuit-maleka-1.webp'),
    ],
  },
];

export const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

/**
 * Descuento fijo del carrito para una cantidad dada.
 * 1 perfume no lleva descuento; 2 lleva $10.000 y 3 lleva $18.000.
 */
export function discountFor(count) {
  if (count <= 1) return 0;
  const capped = Math.min(count, PRICING.maxItems);
  return PRICING.cartDiscounts[capped] || 0;
}

/**
 * Precio de un perfume suelto según el medio de pago.
 * La transferencia lleva el 10% menos, ya redondeado en los datos.
 */
export function priceOf(product, paymentMethod) {
  if (!product) return 0;
  return paymentMethod === 'cbu' ? product.cbuPrice : product.price;
}

export function formatPerfumeLine(product) {
  if (!product) return '';
  return `${product.name} (${product.brand}) - ${GENDER_LABEL[product.gender] || product.gender}`;
}
