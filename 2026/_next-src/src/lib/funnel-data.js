export const BASE_PATH = '/2026';
export const FACEBOOK_PIXEL_ID = '1052677351596434';
export const ORDER_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzGtF3OryfbupUz-8IlK1K4Ew0P0H1QSjabGnsHcswkbDzldXLWPDEdF26tLUkSjz6MSQ/exec';
export const CHAT_WEBHOOK_URL = 'https://sswebhookss.odontolab.co/webhook/8b70ed56-6ce4-4308-8d5b-0c21f9f7d751/chat';
export const WHATSAPP_CONFIRM_PHONE = '5491127595502';
export const DELIVERY_WINDOW = '15hs a 22hs';
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

export const PRODUCTS = [
  {
    id: 'roma-negras',
    shortModel: 'roma-negras',
    displayName: 'Botineta Roma negras',
    heroLabel: 'Roma negras',
    description: 'Botineta con silueta limpia, caida elegante y una base pensada para usarla de dia o de noche.',
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
    heroLabel: 'Roma suela',
    description: 'La variante suela mantiene la misma horma y suma un tono calido para looks mas suaves.',
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
    heroLabel: 'Venecia negras',
    description: 'Una linea mas sobria para quienes quieren un par con presencia y comodidad real en el uso diario.',
    images: [
      asset('venecia-negras-1a.webp'),
      asset('venecia-negras-2a.webp'),
      asset('venecia-negras-3a.webp'),
      asset('venecia-negras-4a.webp'),
    ],
    sizes: SIZES,
  },
];

export const HIGHLIGHTS = [
  'Pagas en efectivo al recibir',
  'Envio gratis en CABA y GBA',
  'Promo activa: 1 par $55.000 o 2 pares $85.000',
];

export const TRUST_POINTS = [
  {
    title: 'Compra directa',
    body: 'Seleccionas tus modelos, completas el formulario y te contactamos por WhatsApp para confirmar el envio.',
  },
  {
    title: 'Sin adelantos',
    body: 'El contrareembolso mantiene el pago al recibir, tal como hoy funciona el embudo original.',
  },
  {
    title: 'Entrega coordinada',
    body: 'Elegis una ventana de entrega y solo se despacha una vez validado por WhatsApp.',
  },
];

export const TESTIMONIALS = [
  'Quedan super comodas y el talle fue tal cual. Me las puse apenas llegaron.',
  'La compra fue simple y me confirmaron por WhatsApp enseguida. Muy prolijo todo.',
  'Pedi dos pares para aprovechar la promo y llegaron sin vueltas. Repetiria.',
];