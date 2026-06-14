export const BASE_PATH = '/2026';
export const FACEBOOK_PIXEL_ID = '1052677351596434';
export const ORDER_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzGtF3OryfbupUz-8IlK1K4Ew0P0H1QSjabGnsHcswkbDzldXLWPDEdF26tLUkSjz6MSQ/exec';
export const ORDER_WEBHOOK_URL = 'https://sswebhookss.odontolab.co/webhook/1e214d4e-5481-4ded-8936-c63ff9ce7743';
export const CHAT_WEBHOOK_URL = 'https://sswebhookss.odontolab.co/webhook/8b70ed56-6ce4-4308-8d5b-0c21f9f7d751/chat';
export const WHATSAPP_CONFIRM_PHONE = '5491127595502';
export const BUILD_VERSION = '2026.03.26-v48';

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
  season: 'Oto\u00f1o-Invierno 2026',
  paymentRibbon: 'Pag\u00e1s al recibir en efectivo',
  promoLine: 'Promo 2 pares: $110.000 con env\u00edo gratis. Pod\u00e9s combinar cualquier modelo.',
  shoppingInstruction: 'Seleccion\u00e1 tus productos favoritos y agr\u00e9galos al carrito.',
  testimonialsTitle: 'Lo que dicen nuestras clientas',
  checkoutTitle: 'Casi listos. Complet\u00e1 tus datos',
  deliveryLegend: 'ENV\u00cdO: seleccion\u00e1 uno de los d\u00edas presentados en las opciones para recibir y asegurate de que, si vos no est\u00e1s, haya alguien para recibir y abonar la compra en el horario de 15hs a 22hs. El pago es solo en efectivo y deb\u00e9s contar con todo el dinero. Vamos a contactarte por WhatsApp para confirmar el env\u00edo y deb\u00e9s respondernos para confirmarlo o no se env\u00eda.',
  reviewCommitment: 'PAG\u00c1S SOLO EN EFECTIVO AL RECIBIR. SI NO DISPON\u00c9S DE LA TOTALIDAD DEL EFECTIVO NO HAGAS EL PEDIDO. TU PEDIDO ES UN COMPROMISO DE PAGO.',
  freeShippingReminder: 'Record\u00e1: env\u00edo GRATIS a todo el pa\u00eds. Pag\u00e1s en efectivo al recibir.',
  whatsappModalTitle: 'Ingresa tu WhatsApp para continuar',
  whatsappModalMessage: 'Dejanos tu n\u00famero para guardar tu pedido y poder contactarte si hace falta.',
  whatsappModalNote: 'Lo usamos para confirmarte el env\u00edo y ayudarte con tu compra.',
};

export const HIGHLIGHTS = [
  'PAG\u00c1S AL RECIBIR EN EFECTIVO',
  'ENV\u00cdO GRATIS',
  'COMPRA DIRECTA POR WHATSAPP',
];

export const PROGRESS_STEPS = ['Productos', 'Env\u00edo', 'Contrarreembolso'];
export const CHECKOUT_STEPS = ['Informaci\u00f3n de env\u00edo', 'M\u00e9todo de pago', 'Revisar y confirmar'];

export const PRODUCTS = [
  {
    id: 'roma-negras',
    shortModel: 'roma-negras',
    displayName: 'Botineta Roma negras',
    badges: ['M\u00c1S VENDIDO', 'STOCK LIMITADO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Altura', value: 'Media' },
    ],
    description: 'Un cl\u00e1sico atemporal y vers\u00e1til, perfecto para elevar cualquier look diario con comodidad y estilo.',
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
    badges: ['M\u00c1S VENDIDO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Altura', value: 'Media' },
    ],
    description: 'El tono c\u00e1lido ideal para complementar tus outfits de oto\u00f1o, aportando un toque natural y sofisticado.',
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
    description: 'Elegancia y comodidad en un dise\u00f1o moderno. El modelo Venecia es perfecto para complementar tus looks m\u00e1s sofisticados.',
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
  {
    id: 'zuecos-turin-negros',
    shortModel: 'zuecos-turin-negros',
    displayName: 'Zuecos Tur\u00edn negros',
    badges: ['NUEVO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Altura', value: 'Baja' },
    ],
    description: 'C\u00f3modos por naturaleza, vers\u00e1tiles por dise\u00f1o. Ideales para combinar con tus looks diarios con un toque de oto\u00f1o.',
    unitPriceLabel: '$70.000',
    bundlePriceLabel: '$110.000',
    savingsLabel: 'AHORRA $30.000',
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
    displayName: 'Zuecos Tur\u00edn marr\u00f3n',
    badges: ['NUEVO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Altura', value: 'Baja' },
    ],
    description: 'El tono c\u00e1lido que eleva tus looks de entretiempo. Un b\u00e1sico c\u00f3modo y con presencia para el d\u00eda a d\u00eda.',
    unitPriceLabel: '$70.000',
    bundlePriceLabel: '$110.000',
    savingsLabel: 'AHORRA $30.000',
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
    displayName: 'Botitas Mil\u00e1n nude',
    badges: ['NUEVO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Goma Eva reforzada' },
      { label: 'Altura', value: 'Baja' },
    ],
    description: 'Estilo y confort en un dise\u00f1o cuidado. Acompa\u00f1an tus outfits de entretiempo sin resignar calidez.',
    unitPriceLabel: '$70.000',
    bundlePriceLabel: '$110.000',
    savingsLabel: 'AHORRA $30.000',
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
    displayName: 'Botitas Mil\u00e1n chocolate',
    badges: ['NUEVO'],
    specs: [
      { label: 'Material', value: 'Cuero' },
      { label: 'Suela', value: 'Goma Eva reforzada' },
      { label: 'Altura', value: 'Baja' },
    ],
    description: 'El chocolate es el neutro c\u00e1lido por excelencia. Combina con todo y le da profundidad a tu look de estaci\u00f3n.',
    unitPriceLabel: '$70.000',
    bundlePriceLabel: '$110.000',
    savingsLabel: 'AHORRA $30.000',
    images: [
      asset('botitas-milan-chocolate-1.webp'),
      asset('botitas-milan-chocolate-2.webp'),
      asset('botitas-milan-chocolate-3.webp'),
      asset('botitas-milan-chocolate-4.webp'),
    ],
    sizes: SIZES,
  },
];

export const TRUST_POINTS = [
  {
    title: 'Compra simple',
    body: 'Eleg\u00ed tus pares, agreg\u00e1 los talles y complet\u00e1 el pedido en pocos pasos.',
  },
  {
    title: 'Env\u00edo gratis',
    body: 'Recib\u00ed tus pares con env\u00edo gratis y confirmaci\u00f3n por WhatsApp antes del despacho.',
  },
  {
    title: 'Pag\u00e1 al recibir',
    body: 'Pag\u00e1s en efectivo cuando recib\u00eds tu pedido en casa.',
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
