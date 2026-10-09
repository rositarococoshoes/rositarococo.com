import PerfumesPrevioPagoTransferPage from '@/src/components/PerfumesPrevioPagoTransferPage';

export const metadata = {
  title: "Datos para la transferencia | Rosita Rococo",
  description: "Transferí $90.000 y mandanos el comprobante por WhatsApp para despachar tu pedido.",
  alternates: { canonical: "https://rositarococo.com/2026/transferenciacbu-perfumes-pp-3.html" },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: "Datos para la transferencia | Rosita Rococo",
    description: "Transferí $90.000 y mandanos el comprobante por WhatsApp para despachar tu pedido.",
    url: "https://rositarococo.com/2026/transferenciacbu-perfumes-pp-3.html",
    images: [{ url: "https://rositarococo.com/2026/og-perfumes-pp-2026.png", width: 1200, height: 630, alt: 'Perfumes Rosita Rococo con pago online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Datos para la transferencia | Rosita Rococo",
    description: "Transferí $90.000 y mandanos el comprobante por WhatsApp para despachar tu pedido.",
    images: ["https://rositarococo.com/2026/og-perfumes-pp-2026.png"],
  },
};

export default function Page() {
  return <PerfumesPrevioPagoTransferPage total={90000} count={3} />;
}
