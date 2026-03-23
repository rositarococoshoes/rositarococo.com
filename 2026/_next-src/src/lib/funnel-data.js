export const BASE_PATH = '/2026';
export const FACEBOOK_PIXEL_ID = '1052677351596434';
export const ORDER_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzGtF3OryfbupUz-8IlK1K4Ew0P0H1QSjabGnsHcswkbDzldXLWPDEdF26tLUkSjz6MSQ/exec';
export const CHAT_WEBHOOK_URL = 'https://sswebhookss.odontolab.co/webhook/8b70ed56-6ce4-4308-8d5b-0c21f9f7d751/chat';
export const WHATSAPP_CONFIRM_PHONE = '5491127595502';
export const BUILD_VERSION = '2026.03.23-v14';
const asset = (file) => `${BASE_PATH}/assets/contrareembolso/${file}`;

const SIZES = [
  { value: '35', label: '35 (23 cm de plantilla)' },
  { value: '36', label: '36 (23,5 cm de plantilla)' },
  { value: '37', label: '37 (24 cm de plantilla)' },
  { value: '38', label: '38 (25 cm de plantilla)' },
  { value: '39', label: '39 (25,5 cm de plantilla)' },
  { value: '40', label: '40 (26 cm de plantilla)' },
];

export const BRAND_LOGO_SRC = asset('rosita-form.webp');
export const WHATSAPP_BUTTON_SRC = asset('enviarwsp.png');

export const PAGE_COPY = {
  season: 'Otono-Invierno 2025',
  paymentRibbon: 'Pagas al recibir en efectivo',
  promoLine: 'Promo 2 pares: $110.000 con envio gratis. Podes combinar cualquier modelo.',
  shoppingInstruction: 'Selecciona tus productos favoritos y agregalos al carrito.',
  testimonialsTitle: 'Lo que dicen nuestras clientas',
  checkoutTitle: 'Casi listos. Completa tus datos',
  deliveryLegend: 'ENVIO: selecciona uno de los dias presentados en las opciones para recibir y asegurate que si vos no estas haya alguien para recibir y abonar la compra en el horario de 15hs a 22hs. El pago es solo en efectivo y debes contar con todo el dinero. Vamos a contactarte por Whatsapp para confirmar el envio y debes respondernos para confirmarlo o no se envia.',
  reviewCommitment: 'PAGAS SOLO EN EFECTIVO AL RECIBIR. SI NO DISPONES DE LA TOTALIDAD DEL EFECTIVO NO HAGAS EL PEDIDO. TU PEDIDO ES UN COMPROMISO DE PAGO.',
  freeShippingReminder: 'Recuerda: envio GRATIS a todo el pais. Pagas en efectivo al recibir.',
};

export const HIGHLIGHTS = [
  'PAGAS AL RECIBIR EN EFECTIVO',
  'ENVIO GRATIS',
  'COMPRA DIRECTA POR WHATSAPP',
];

export const PROGRESS_STEPS = ['Productos', 'Envio', 'Contrareembolso'];
export const CHECKOUT_STEPS = ['Informacion de Envio', 'Metodo de Pago', 'Revisar y Confirmar'];

export const PRODUCTS = [
  {
    id: 'roma-negras',
    shortModel: 'roma-negras',
    displayName: 'Botineta Roma negras',
    badges: ['MAS VENDIDO', 'STOCK LIMITADO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Altura', value: 'Media' },
    ],
    description: 'Un clasico atemporal y versatil, perfecto para elevar cualquier look diario con comodidad y estilo.',
    unitPriceLabel: '$70.000',
    bundlePriceLabel: '$110.000',
    savingsLabel: 'AHORRA $30.000',
    images: [
      asset('roma-negras-1.webp'),
      asset('roma-negras-1a.webp'),
      asset('roma-negras-5a.webp'),
      asset('roma-negras-2a.webp'),
      asset('roma-negras-3a.webp'),
      asset('roma-negras-4a.webp'),
      asset('roma-negras-2.webp'),
    ],
    sizes: SIZES,
  },
  {
    id: 'roma-suela',
    shortModel: 'roma-suela',
    displayName: 'Botineta Roma suela',
    badges: ['MAS VENDIDO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Altura', value: 'Media' },
    ],
    description: 'El tono calido ideal para complementar tus outfits de otono, aportando un toque natural y sofisticado.',
    unitPriceLabel: '$70.000',
    bundlePriceLabel: '$110.000',
    savingsLabel: 'AHORRA $30.000',
    images: [
      asset('roma-suela-1a.webp'),
      asset('roma-suela-2a.webp'),
      asset('roma-suela-1.webp'),
      asset('roma-suela-2.webp'),
    ],
    sizes: SIZES,
  },
  {
    id: 'venecia-negras',
    shortModel: 'venecia-negras',
    displayName: 'Venecia negras',
    badges: [],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Altura', value: 'Media' },
    ],
    description: 'Elegancia y comodidad en un diseno moderno. El modelo Venecia es perfecto para complementar tus looks mas sofisticados.',
    unitPriceLabel: '$70.000',
    bundlePriceLabel: '$110.000',
    savingsLabel: 'AHORRA $30.000',
    images: [
      asset('venecia-negras-1a.webp'),
      asset('venecia-negras-2a.webp'),
      asset('venecia-negras-3a.webp'),
      asset('venecia-negras-4a.webp'),
    ],
    sizes: SIZES,
  },
];

export const TRUST_POINTS = [
  {
    title: 'Compra simple',
    body: 'Elige tus pares, agrega los talles y completa el pedido en pocos pasos.',
  },
  {
    title: 'Envio gratis',
    body: 'El checkout mantiene envio gratis y confirmacion por WhatsApp antes de despachar.',
  },
  {
    title: 'Contrareembolso real',
    body: 'El pago sigue siendo solo en efectivo al recibir, respetando el flujo original.',
  },
];

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





