export const BASE_PATH = '/2026';
export const FACEBOOK_PIXEL_ID = '1052677351596434';
export const ORDER_WEBHOOK_URL = 'https://sswebhookss.odontolab.co/webhook/a5dcd3c9-48a3-46a1-a781-475737a634ca';
export const PAYMENT_LINK_WEBHOOK_URL = 'https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30';
export const CHAT_WEBHOOK_URL = 'https://sswebhookss.odontolab.co/webhook/0bf290e4-f5d5-4a22-94f5-a88cbbf9b347/chat';
export const WHATSAPP_CONFIRM_PHONE = '5491127595502';

const asset = (file) => `${BASE_PATH}/assets/previo-pago/${file}`;

const STANDARD_SIZES = [
  { value: '35', label: '35 (23 cm de plantilla)' },
  { value: '36', label: '36 (23,5 cm de plantilla)' },
  { value: '37', label: '37 (24 cm de plantilla)' },
  { value: '38', label: '38 (24,7 cm de plantilla)' },
  { value: '39', label: '39 (25,3 cm de plantilla)' },
  { value: '40', label: '40 (26 cm de plantilla)' },
];

const PARIS_SIZES = [
  { value: '35', label: '35 (22,8 cm de plantilla)' },
  { value: '36', label: '36 (23,4 cm de plantilla)' },
  { value: '37', label: '37 (24,3 cm de plantilla)' },
  { value: '38', label: '38 (24,7 cm de plantilla)' },
  { value: '39', label: '39 (25,2 cm de plantilla)' },
  { value: '40', label: '40 (26 cm de plantilla)' },
  { value: '41', label: '41 (27,5 cm de plantilla)' },
  { value: '42', label: '42 (28,4 cm de plantilla)' },
  { value: '43', label: '43 (29,2 cm de plantilla)' },
  { value: '44', label: '44 (29,8 cm de plantilla)' },
];

export const PREVIO_PAGO_PRICING = {
  singlePrice: 87500,
  bundlePrice: 137500,
  singleLabel: '$87.500',
  bundleLabel: '$137.500',
  savingsLabel: 'AHORRÁ $37.500',
  cbuSingleLabel: '$78.750',
  cbuBundleLabel: '$123.750',
};

export const BRAND_LOGO_SRC = asset('rosita-form.webp');
export const WHATSAPP_BUTTON_SRC = asset('enviarwsp.png');

export const PAGE_COPY = {
  season: 'Primavera-Verano 2026',
  paymentRibbon: 'Pago online o por transferencia',
  promoLine: '1 par $87.500. 2 pares $137.500 con envío gratis. También podés pagar por transferencia con descuento adicional.',
  shoppingInstruction: 'Elegí tus modelos favoritos y agrégalos al carrito, un par por vez.',
  testimonialsTitle: 'Lo que dicen nuestras clientas',
  checkoutTitle: 'Casi listas. Completá tus datos',
  paymentLegend: 'Elegí cómo querés pagar. Si seleccionás tarjeta o saldo MercadoPago te redirigimos al link de pago seguro. Si elegís transferencia, te mostramos los datos bancarios y el paso a paso para enviar el comprobante.',
  reviewCommitment: 'Verificá que tus datos y modelos estén correctos antes de continuar. Tu pedido quedará registrado con el medio de pago elegido.',
  freeShippingReminder: 'Recordá: envío gratis a todo el país. Podés pagar online o por transferencia con descuento adicional.',
};

export const HIGHLIGHTS = [
  'ENVÍO GRATIS A TODO EL PAÍS',
  'PAGO ONLINE SEGURO',
  'TRANSFERENCIA CON DESCUENTO',
];

export const PROGRESS_STEPS = ['Productos', 'Envío', 'Pago'];
export const CHECKOUT_STEPS = ['Información de contacto', 'Método de pago', 'Revisar y confirmar'];

export const TRUST_POINTS = [
  {
    title: 'Compra simple',
    body: 'Elegí tus pares, sumá los talles y cerrá el pedido con la misma experiencia clara del funnel 2026.',
  },
  {
    title: 'Pago flexible',
    body: 'Podés pagar con tarjeta, con saldo MercadoPago o por transferencia bancaria con descuento adicional.',
  },
  {
    title: 'Envío gratis',
    body: 'Mantenemos envío gratis a todo el país y confirmación clara del estado de tu pedido.',
  },
];

export const PRODUCTS = [
  {
    id: 'guillermina-negras',
    displayName: 'Guillerminas Negras',
    badges: ['NUEVA TEMPORADA', 'STOCK LIMITADO'],
    specs: [
      { label: 'Material', value: 'Tela reforzada super flexible' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Envío', value: 'Gratis' },
    ],
    description: '¡Renovate para la nueva temporada Primavera-Verano 2026! Nuestras guillerminas negras son el complemento ideal para cualquier look. Su diseño versátil y ultra cómodo te va a encantar.',
    unitPriceLabel: PREVIO_PAGO_PRICING.singleLabel,
    bundlePriceLabel: PREVIO_PAGO_PRICING.bundleLabel,
    savingsLabel: PREVIO_PAGO_PRICING.savingsLabel,
    images: [1, 2, 3, 4, 5, 6, 7, 8].map((index) => asset(`guillerminafotos/${index}.webp`)),
    sizes: STANDARD_SIZES,
  },
  {
    id: 'guillermina-camel',
    displayName: 'Guillerminas Camel',
    badges: ['NUEVA TEMPORADA', 'STOCK LIMITADO'],
    specs: [
      { label: 'Material', value: 'Tela reforzada super flexible' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Envío', value: 'Gratis' },
    ],
    description: '¡Renovate para la nueva temporada Primavera-Verano 2026! Nuestras guillerminas camel son el complemento ideal para cualquier look. Su diseño versátil y ultra cómodo te va a encantar.',
    unitPriceLabel: PREVIO_PAGO_PRICING.singleLabel,
    bundlePriceLabel: PREVIO_PAGO_PRICING.bundleLabel,
    savingsLabel: PREVIO_PAGO_PRICING.savingsLabel,
    images: [1, 2, 3, 4, 5, 6, 7, 8].map((index) => asset(`guillerminafotos/guillerminascamel/${index}.webp`)),
    sizes: STANDARD_SIZES,
  },
  {
    id: 'guillermina-blancas',
    displayName: 'Guillerminas Blancas',
    badges: ['NUEVA TEMPORADA', 'STOCK LIMITADO'],
    specs: [
      { label: 'Material', value: 'Tela reforzada super flexible' },
      { label: 'Suela', value: 'Expanso' },
      { label: 'Envío', value: 'Gratis' },
    ],
    description: '¡Renovate para la nueva temporada Primavera-Verano 2026! Nuestras guillerminas blancas son el complemento ideal para cualquier look. Su diseño versátil y ultra cómodo te va a encantar.',
    unitPriceLabel: PREVIO_PAGO_PRICING.singleLabel,
    bundlePriceLabel: PREVIO_PAGO_PRICING.bundleLabel,
    savingsLabel: PREVIO_PAGO_PRICING.savingsLabel,
    images: [1, 2, 3, 4, 5, 6, 7, 8].map((index) => asset(`guillerminafotos/guillerminasblancas/${index}.webp`)),
    sizes: STANDARD_SIZES,
  },
  {
    id: 'birk-negras',
    displayName: 'Birk Negras',
    badges: ['NUEVA TEMPORADA', 'STOCK LIMITADO'],
    specs: [
      { label: 'Material', value: 'Ecocuero' },
      { label: 'Suela', value: 'Antideslizante' },
      { label: 'Envío', value: 'Gratis' },
    ],
    description: 'Sandalias de ecocuero con doble hebilla metálica ajustable. Cuentan con una plantilla ergonómica y una suela antideslizante que brinda confort y estabilidad en cada paso.',
    unitPriceLabel: PREVIO_PAGO_PRICING.singleLabel,
    bundlePriceLabel: PREVIO_PAGO_PRICING.bundleLabel,
    savingsLabel: PREVIO_PAGO_PRICING.savingsLabel,
    images: [1, 2, 3, 4, 5, 6, 7].map((index) => asset(`birknegras/${index}.webp`)),
    sizes: STANDARD_SIZES,
  },
  {
    id: 'birk-camel',
    displayName: 'Birk Camel',
    badges: ['NUEVA TEMPORADA', 'STOCK LIMITADO'],
    specs: [
      { label: 'Material', value: 'Ecocuero' },
      { label: 'Suela', value: 'Antideslizante' },
      { label: 'Envío', value: 'Gratis' },
    ],
    description: 'Sandalias de ecocuero camel con doble hebilla metálica ajustable. Cuentan con una plantilla ergonómica y una suela antideslizante que brinda confort y estabilidad en cada paso.',
    unitPriceLabel: PREVIO_PAGO_PRICING.singleLabel,
    bundlePriceLabel: PREVIO_PAGO_PRICING.bundleLabel,
    savingsLabel: PREVIO_PAGO_PRICING.savingsLabel,
    images: [1, 2, 3, 4, 5, 6, 7, 8].map((index) => asset(`birkcamel/${index}.webp`)),
    sizes: STANDARD_SIZES,
  },
  {
    id: 'birk-blancas',
    displayName: 'Birk Blancas',
    badges: ['NUEVA TEMPORADA', 'STOCK LIMITADO'],
    specs: [
      { label: 'Material', value: 'Ecocuero' },
      { label: 'Suela', value: 'Antideslizante' },
      { label: 'Envío', value: 'Gratis' },
    ],
    description: 'Sandalias de ecocuero blancas con doble hebilla metálica ajustable. Cuentan con una plantilla ergonómica y una suela antideslizante que brinda confort y estabilidad en cada paso.',
    unitPriceLabel: PREVIO_PAGO_PRICING.singleLabel,
    bundlePriceLabel: PREVIO_PAGO_PRICING.bundleLabel,
    savingsLabel: PREVIO_PAGO_PRICING.savingsLabel,
    images: [1, 2, 3, 4, 5, 6, 7, 8].map((index) => asset(`birkblancas/${index}.webp`)),
    sizes: STANDARD_SIZES,
  },
  {
    id: 'paris-negras',
    displayName: 'Paris Negras',
    badges: ['NUEVA TEMPORADA'],
    specs: [
      { label: 'Material', value: 'Tela elastizada' },
      { label: 'Suela', value: 'Liviana' },
      { label: 'Detalles', value: 'Bicolor' },
    ],
    description: '¡Elegancia urbana para la nueva temporada Primavera-Verano 2026! Nuestras Paris negras combinan comodidad y estilo con su diseño bicolor único. Perfectas para looks diarios con un toque sofisticado.',
    unitPriceLabel: PREVIO_PAGO_PRICING.singleLabel,
    bundlePriceLabel: PREVIO_PAGO_PRICING.bundleLabel,
    savingsLabel: PREVIO_PAGO_PRICING.savingsLabel,
    images: [asset('paris2025-negras.webp')],
    sizes: PARIS_SIZES,
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

export const PROVINCES = [
  'Buenos Aires',
  'Capital Federal',
  'Gran Buenos Aires',
  'Córdoba',
  'Santa Fé',
  'Mendoza',
  'Neuquén',
  'Entre Ríos',
  'Catamarca',
  'Chubut',
  'Salta',
  'Santa Cruz',
  'Chaco',
  'Corrientes',
  'Formosa',
  'La Pampa',
  'La Rioja',
  'Río Negro',
  'San Juan',
  'San Luis',
  'Santiago del Estero',
  'Tucumán',
];

export const PAYMENT_METHODS = [
  {
    value: 'tarjeta',
    label: '💳 Tarjeta de Crédito/Débito (¡3 Cuotas sin interés!)',
    helper: 'Te redirigimos al link de pago seguro para abonar con tarjeta.',
  },
  {
    value: 'mercadopago',
    label: '💲 Saldo en cuenta MercadoPago',
    helper: 'Te llevamos al link de pago seguro para abonar con tu cuenta.',
  },
  {
    value: 'cbu',
    label: '🏦 Transferencia Bancaria (¡Con 10% OFF adicional!)',
    helper: 'Te mostramos el CBU y luego podés enviar el comprobante por WhatsApp.',
  },
];

export const THANK_YOU_ROUTES = {
  single: '/gracias-1par',
  bundle: '/gracias-2pares',
};

export const MERCADO_PAGO_LINKS = {
  single: 'https://mpago.la/1FigNnC',
  bundle: 'https://mpago.la/2gYRoZX',
};

export const BANK_DETAILS = {
  bank: 'Banco Santander',
  cbu: '0720570588000035387718',
  alias: 'RROCOCO.S',
  holder: 'Baustian Roxana',
};




