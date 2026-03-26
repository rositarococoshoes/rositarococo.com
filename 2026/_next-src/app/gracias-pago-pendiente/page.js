import { PrevioPagoPaymentSuccessPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Estamos confirmando tu pago',
  description: 'Tu pedido ya est\u00e1 registrado. Estamos esperando la confirmaci\u00f3n del pago para continuar con el despacho.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/gracias-pago-pendiente.html',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: 'Rosita Rococo | Estamos confirmando tu pago',
    description: 'Tu pedido ya est\u00e1 registrado. Estamos esperando la confirmaci\u00f3n del pago para continuar con el despacho.',
    url: 'https://rositarococo.com/2026/gracias-pago-pendiente.html',
    images: [
      {
        url: 'https://rositarococo.com/2026/og-contrareembolso-2026.png',
        width: 1200,
        height: 630,
        alt: 'Rosita Rococo Oto\u00f1o-Invierno 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rosita Rococo | Estamos confirmando tu pago',
    description: 'Tu pedido ya est\u00e1 registrado. Estamos esperando la confirmaci\u00f3n del pago para continuar con el despacho.',
    images: ['https://rositarococo.com/2026/og-contrareembolso-2026.png'],
  },
};

export default function PagoPendientePage() {
  return <PrevioPagoPaymentSuccessPage pairCount={1} total={87500} pending />;
}
