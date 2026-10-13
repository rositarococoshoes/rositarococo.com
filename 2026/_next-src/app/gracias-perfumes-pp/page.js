import PerfumesPrevioPagoThankYouPage from '@/src/components/PerfumesPrevioPagoThankYouPage';

export const metadata = {
  title: "Confirmá tu pedido | Rosita Rococo",
  description: "Tu pedido de perfumes quedó registrado. Mandanos el comprobante por WhatsApp y te enviamos el número de seguimiento.",
  alternates: { canonical: "https://rositarococo.com/2026/gracias-perfumes-pp.html" },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: "Confirmá tu pedido | Rosita Rococo",
    description: "Tu pedido de perfumes quedó registrado. Mandanos el comprobante por WhatsApp y te enviamos el número de seguimiento.",
    url: "https://rositarococo.com/2026/gracias-perfumes-pp.html",
    images: [
      {
        url: 'https://rositarococo.com/2026/og-perfumes-pp-2026.png',
        width: 1200,
        height: 630,
        alt: 'Perfumes Rosita Rococo con pago online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Confirmá tu pedido | Rosita Rococo",
    description: "Tu pedido de perfumes quedó registrado. Mandanos el comprobante por WhatsApp y te enviamos el número de seguimiento.",
    images: ['https://rositarococo.com/2026/og-perfumes-pp-2026.png'],
  },
};

export default function Page() {
  return <PerfumesPrevioPagoThankYouPage />;
}
