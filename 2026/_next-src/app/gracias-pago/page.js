import { PrevioPagoPaymentSuccessPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Pago confirmado',
  description: 'Recibimos el pago de tu pedido de 1 par. Te avisaremos cuando salga tu env\u00edo.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/gracias-pago.html',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: 'Rosita Rococo | Pago confirmado',
    description: 'Recibimos el pago de tu pedido de 1 par. Te avisaremos cuando salga tu env\u00edo.',
    url: 'https://rositarococo.com/2026/gracias-pago.html',
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
    title: 'Rosita Rococo | Pago confirmado',
    description: 'Recibimos el pago de tu pedido de 1 par. Te avisaremos cuando salga tu env\u00edo.',
    images: ['https://rositarococo.com/2026/og-contrareembolso-2026.png'],
  },
};

export default function PagoExitosoUnParPage() {
  return <PrevioPagoPaymentSuccessPage pairCount={1} total={87500} />;
}
