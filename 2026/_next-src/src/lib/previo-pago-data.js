import { PRODUCTS as CONTRAREEMBOLSO_PRODUCTS, SIZES } from '@/src/lib/funnel-data';

export const BASE_PATH = '/2026';
export const FACEBOOK_PIXEL_ID = '1052677351596434';
export const ORDER_WEBHOOK_URL = 'https://sswebhookss.odontolab.co/webhook/a5dcd3c9-48a3-46a1-a781-475737a634ca';
export const PAYMENT_LINK_WEBHOOK_URL = 'https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30';
export const CHAT_WEBHOOK_URL = 'https://sswebhookss.odontolab.co/webhook/0bf290e4-f5d5-4a22-94f5-a88cbbf9b347/chat';
export const WHATSAPP_CONFIRM_PHONE = '5491127595502';

const asset = (file) => `${BASE_PATH}/assets/previo-pago/${file}`;

export const PREVIO_PAGO_PRICING = {
  singlePrice: 87500,
  bundlePrice: 137500,
  singleLabel: '$87.500',
  bundleLabel: '$137.500',
  savingsLabel: 'AHORR\u00c1 $37.500',
  cbuSingleLabel: '$78.750',
  cbuBundleLabel: '$123.750',
};

export const BRAND_LOGO_SRC = asset('rosita-form.webp');
export const WHATSAPP_BUTTON_SRC = asset('enviarwsp.png');

export const PAGE_COPY = {
  season: 'Oto\u00f1o-Invierno 2026',
  paymentRibbon: 'Pago online o por transferencia',
  promoLine: '1 par $87.500. 2 pares $137.500 con env\u00edo gratis. Tambi\u00e9n pod\u00e9s pagar por transferencia con descuento adicional.',
  shoppingInstruction: 'Eleg\u00ed tus modelos favoritos y agr\u00e9galos al carrito, un par por vez.',
  testimonialsTitle: 'Lo que dicen nuestras clientas',
  checkoutTitle: 'Casi listas. Complet\u00e1 tus datos',
  paymentLegend: 'Eleg\u00ed c\u00f3mo quer\u00e9s pagar. Si seleccion\u00e1s tarjeta o saldo MercadoPago te redirigimos al link de pago seguro. Si eleg\u00eds transferencia, te mostramos los datos bancarios y el paso a paso para enviar el comprobante.',
  reviewCommitment: 'Verific\u00e1 que tus datos y modelos est\u00e9n correctos antes de continuar. Tu pedido quedar\u00e1 registrado con el medio de pago elegido.',
  freeShippingReminder: 'Record\u00e1: env\u00edo gratis a todo el pa\u00eds. Pod\u00e9s pagar online o por transferencia con descuento adicional.',
  whatsappModalTitle: 'Ingresa tu WhatsApp para continuar',
  whatsappModalMessage: 'Dejanos tu número de WhatsApp para guardar tu carrito. Si agregás dos pares de cualquier modelo o talle, tenés descuento importante por par y envío gratis.',
  whatsappModalNote: 'Tu número se usará para el seguimiento de tu pedido y guardar tu carrito.',
};

export const HIGHLIGHTS = [
  'ENV\u00cdO GRATIS A TODO EL PA\u00cdS',
  'PAGO ONLINE SEGURO',
  'TRANSFERENCIA CON DESCUENTO',
];

export const PROGRESS_STEPS = ['Productos', 'Env\u00edo', 'Pago'];
export const CHECKOUT_STEPS = ['Informaci\u00f3n de contacto', 'M\u00e9todo de pago', 'Revisar y confirmar'];

export const TRUST_POINTS = [
  {
    title: 'Compra simple',
    body: 'Eleg\u00ed tus pares, sum\u00e1 los talles y cerr\u00e1 el pedido con una experiencia clara, simple y segura.',
  },
  {
    title: 'Pago flexible',
    body: 'Pod\u00e9s pagar con tarjeta, con saldo MercadoPago o por transferencia bancaria con descuento adicional.',
  },
  {
    title: 'Env\u00edo gratis',
    body: 'Mantenemos env\u00edo gratis a todo el pa\u00eds y confirmaci\u00f3n clara del estado de tu pedido.',
  },
];

PAGE_COPY.reviewCommitment = 'Verificá que tus datos y modelos estén correctos antes de continuar.';
PAGE_COPY.whatsappModalMessage = 'Dejanos tu número para guardar tu pedido y ayudarte si necesitás soporte con el pago.';
PAGE_COPY.whatsappModalNote = 'Lo usamos para confirmarte la compra y acompañarte si hace falta.';
TRUST_POINTS[2] = {
  title: 'Envío gratis',
  body: 'Recibís tus pares con envío gratis a todo el país y seguimiento claro de tu compra.',
};

PAGE_COPY.reviewCommitment = 'Verific\u00e1 que tus datos y modelos est\u00e9n correctos antes de continuar.';
PAGE_COPY.whatsappModalMessage = 'Dejanos tu n\u00famero para guardar tu pedido y ayudarte si necesit\u00e1s soporte con el pago.';
PAGE_COPY.whatsappModalNote = 'Lo usamos para confirmarte la compra y acompa\u00f1arte si hace falta.';
TRUST_POINTS[2] = {
  title: 'Env\u00edo gratis',
  body: 'Recib\u00eds tus pares con env\u00edo gratis a todo el pa\u00eds y seguimiento claro de tu compra.',
};

const PREVIO_PAGO_EXCLUSIVE_PRODUCTS = [
  {
    id: 'zuecos-turin-negros',
    shortModel: 'zuecos-turin-negros',
    displayName: 'Zuecos Turín negros',
    badges: ['NUEVO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Altura', value: 'Baja' },
    ],
    description: 'Cómodos por naturaleza, versátiles por diseño. Ideales para combinar con tus looks diarios con un toque de otoño.',
    images: [
      asset('zuecos-turin-negros-1.webp'),
      asset('zuecos-turin-negros-2.webp'),
      asset('zuecos-turin-negros-3.webp'),
      asset('zuecos-turin-negros-4.webp'),
      asset('zuecos-turin-negros-5.webp'),
      asset('zuecos-turin-negros-6.webp'),
    ],
    sizes: SIZES,
  },
  {
    id: 'zuecos-turin-marron',
    shortModel: 'zuecos-turin-marron',
    displayName: 'Zuecos Turín marrón',
    badges: ['NUEVO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Altura', value: 'Baja' },
    ],
    description: 'El tono cálido que eleva tus looks de entretiempo. Un básico cómodo y con presencia para el día a día.',
    images: [
      asset('zuecos-turin-marron-1.webp'),
      asset('zuecos-turin-marron-2.webp'),
      asset('zuecos-turin-marron-3.webp'),
      asset('zuecos-turin-marron-4.webp'),
      asset('zuecos-turin-marron-5.webp'),
    ],
    sizes: SIZES,
  },
  {
    id: 'botitas-milan-nude',
    shortModel: 'botitas-milan-nude',
    displayName: 'Botitas Milán nude',
    badges: ['NUEVO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Goma Eva reforzada' },
      { label: 'Altura', value: 'Baja' },
    ],
    description: 'Estilo y confort en un diseño cuidado. Acompañan tus outfits de entretiempo sin resignar calidez.',
    images: [
      asset('botitas-milan-nude-1.webp'),
      asset('botitas-milan-nude-2.webp'),
      asset('botitas-milan-nude-3.webp'),
      asset('botitas-milan-nude-4.webp'),
      asset('botitas-milan-nude-5.webp'),
    ],
    sizes: SIZES,
  },
  {
    id: 'botitas-milan-chocolate',
    shortModel: 'botitas-milan-chocolate',
    displayName: 'Botitas Milán chocolate',
    badges: ['NUEVO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Goma Eva reforzada' },
      { label: 'Altura', value: 'Baja' },
    ],
    description: 'El chocolate es el neutro cálido por excelencia. Combina con todo y le da profundidad a tu look de estación.',
    images: [
      asset('botitas-milan-chocolate-1.webp'),
      asset('botitas-milan-chocolate-2.webp'),
      asset('botitas-milan-chocolate-3.webp'),
      asset('botitas-milan-chocolate-4.webp'),
    ],
    sizes: SIZES,
  },
];

export const PRODUCTS = [...CONTRAREEMBOLSO_PRODUCTS, ...PREVIO_PAGO_EXCLUSIVE_PRODUCTS].map((product) => ({
  ...product,
  unitPriceLabel: PREVIO_PAGO_PRICING.singleLabel,
  bundlePriceLabel: PREVIO_PAGO_PRICING.bundleLabel,
  savingsLabel: PREVIO_PAGO_PRICING.savingsLabel,
}));

export const TESTIMONIAL_IMAGES = [
  { src: asset('comentariorecibi1.webp'), alt: 'Captura de comentario positivo de clienta 1' },
  { src: asset('comentariorecibi2.webp'), alt: 'Captura de comentario positivo de clienta 2' },
  { src: asset('comentariorecibi4.webp'), alt: 'Captura de comentario positivo de clienta 3' },
  { src: asset('comentariorecibi5.webp'), alt: 'Captura de comentario positivo de clienta 4' },
  { src: asset('comentariorecibi6.webp'), alt: 'Captura de comentario positivo de clienta 5' },
  { src: asset('comentariosig.webp'), alt: 'Captura de comentarios de Instagram' },
  { src: asset('comentario3-min.webp'), alt: 'Referencia de clienta satisfecha 1' },
  { src: asset('comentario4-min.webp'), alt: 'Referencia de clienta satisfecha 2' },
  { src: asset('comentario5-min.webp'), alt: 'Referencia de clienta satisfecha 3' },
];

export const PROVINCES = [
  'Buenos Aires',
  'Capital Federal',
  'Gran Buenos Aires',
  'C\u00f3rdoba',
  'Santa F\u00e9',
  'Mendoza',
  'Neuqu\u00e9n',
  'Entre R\u00edos',
  'Catamarca',
  'Chubut',
  'Salta',
  'Santa Cruz',
  'Chaco',
  'Corrientes',
  'Formosa',
  'La Pampa',
  'La Rioja',
  'R\u00edo Negro',
  'San Juan',
  'San Luis',
  'Santiago del Estero',
  'Tucum\u00e1n',
];

export const PAYMENT_METHODS = [
  {
    value: 'tarjeta',
    label: '\ud83d\udcb3 Tarjeta de Cr\u00e9dito/D\u00e9bito (\u00a13 Cuotas sin inter\u00e9s!)',
    helper: 'Te redirigimos al link de pago seguro para abonar con tarjeta.',
  },
  {
    value: 'mercadopago',
    label: '\ud83d\udcb2 Saldo en cuenta MercadoPago',
    helper: 'Te llevamos al link de pago seguro para abonar con tu cuenta.',
  },
  {
    value: 'cbu',
    label: '\ud83c\udfe6 Transferencia Bancaria (\u00a1Con 10% OFF adicional!)',
    helper: 'Te mostramos el CBU y luego pod\u00e9s enviar el comprobante por WhatsApp.',
  },
];

export const THANK_YOU_ROUTES = {
  single: '/gracias-1par',
  bundle: '/gracias-2pares',
};

export const BANK_DETAILS = {
  bank: 'Banco Santander',
  cbu: '0720570588000035387718',
  alias: 'RROCOCO.S',
  holder: 'Baustian Roxana',
};
