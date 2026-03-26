import ThankYouPage from '@/src/components/ThankYouPage';

export const metadata = {
  title: 'Rosita Rococo | Confirm\u00e1 tu pedido por WhatsApp',
  description: 'Tu pedido de 1 par qued\u00f3 reservado. Confirmalo por WhatsApp para que podamos despacharlo.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/gracias-1par-c.html',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: 'Rosita Rococo | Confirm\u00e1 tu pedido por WhatsApp',
    description: 'Tu pedido de 1 par qued\u00f3 reservado. Confirmalo por WhatsApp para que podamos despacharlo.',
    url: 'https://rositarococo.com/2026/gracias-1par-c.html',
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
    title: 'Rosita Rococo | Confirm\u00e1 tu pedido por WhatsApp',
    description: 'Tu pedido de 1 par qued\u00f3 reservado. Confirmalo por WhatsApp para que podamos despacharlo.',
    images: ['https://rositarococo.com/2026/og-contrareembolso-2026.png'],
  },
};

export default function GraciasUnParPage() {
  return <ThankYouPage pairCount={1} total={70000} />;
}
