import PerfumesPrevioPagoThankYouPage from '@/src/components/PerfumesPrevioPagoThankYouPage';

export const metadata = {
  title: "Confirmá tus 2 perfumes | Rosita Rococo",
  description: "Tu pedido de 2 perfumes quedó registrado. Confirmá y mandanos el comprobante por WhatsApp.",
  alternates: { canonical: "https://rositarococo.com/2026/gracias-perfumes-pp-2.html" },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: "Confirmá tus 2 perfumes | Rosita Rococo",
    description: "Tu pedido de 2 perfumes quedó registrado. Confirmá y mandanos el comprobante por WhatsApp.",
    url: "https://rositarococo.com/2026/gracias-perfumes-pp-2.html",
    images: [{ url: "https://rositarococo.com/2026/og-perfumes-pp-2026.png", width: 1200, height: 630, alt: 'Perfumes Rosita Rococo con pago online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Confirmá tus 2 perfumes | Rosita Rococo",
    description: "Tu pedido de 2 perfumes quedó registrado. Confirmá y mandanos el comprobante por WhatsApp.",
    images: ["https://rositarococo.com/2026/og-perfumes-pp-2026.png"],
  },
};

export default function Page() {
  return <PerfumesPrevioPagoThankYouPage count={2} total={80000} method="tarjeta" />;
}
