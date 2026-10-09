import PerfumesPrevioPagoThankYouPage from '@/src/components/PerfumesPrevioPagoThankYouPage';

export const metadata = {
  title: "Confirmá tu 1 perfume | Rosita Rococo",
  description: "Tu pedido de 1 perfume quedó registrado. Confirmá y mandanos el comprobante por WhatsApp.",
  alternates: { canonical: "https://rositarococo.com/2026/gracias-perfumes-pp-1.html" },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: "Confirmá tu 1 perfume | Rosita Rococo",
    description: "Tu pedido de 1 perfume quedó registrado. Confirmá y mandanos el comprobante por WhatsApp.",
    url: "https://rositarococo.com/2026/gracias-perfumes-pp-1.html",
    images: [{ url: "https://rositarococo.com/2026/og-perfumes-pp-2026.png", width: 1200, height: 630, alt: 'Perfumes Rosita Rococo con pago online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Confirmá tu 1 perfume | Rosita Rococo",
    description: "Tu pedido de 1 perfume quedó registrado. Confirmá y mandanos el comprobante por WhatsApp.",
    images: ["https://rositarococo.com/2026/og-perfumes-pp-2026.png"],
  },
};

export default function Page() {
  return <PerfumesPrevioPagoThankYouPage count={1} total={50000} method="tarjeta" />;
}
