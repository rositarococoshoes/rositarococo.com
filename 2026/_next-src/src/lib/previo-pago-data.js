import { PRODUCTS as CONTRAREEMBOLSO_PRODUCTS } from '@/src/lib/funnel-data';

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
  season: 'Primavera-Verano 2026',
  paymentRibbon: 'Pago online o por transferencia',
  promoLine: '1 par $87.500. 2 pares $137.500 con env\u00edo gratis. Tambi\u00e9n pod\u00e9s pagar por transferencia con descuento adicional.',
  shoppingInstruction: 'Eleg\u00ed tus modelos favoritos y agr\u00e9galos al carrito, un par por vez.',
  testimonialsTitle: 'Lo que dicen nuestras clientas',
  checkoutTitle: 'Casi listas. Complet\u00e1 tus datos',
  paymentLegend: 'Eleg\u00ed c\u00f3mo quer\u00e9s pagar. Si seleccion\u00e1s tarjeta o saldo MercadoPago te redirigimos al link de pago seguro. Si eleg\u00eds transferencia, te mostramos los datos bancarios y el paso a paso para enviar el comprobante.',
  reviewCommitment: 'Verific\u00e1 que tus datos y modelos est\u00e9n correctos antes de continuar. Tu pedido quedar\u00e1 registrado con el medio de pago elegido.',
  freeShippingReminder: 'Record\u00e1: env\u00edo gratis a todo el pa\u00eds. Pod\u00e9s pagar online o por transferencia con descuento adicional.',
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
    body: 'Eleg\u00ed tus pares, sum\u00e1 los talles y cerr\u00e1 el pedido con la misma experiencia clara del funnel 2026.',
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

export const PRODUCTS = CONTRAREEMBOLSO_PRODUCTS.map((product) => ({
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