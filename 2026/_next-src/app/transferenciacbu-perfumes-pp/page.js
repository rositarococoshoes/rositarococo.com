import PerfumesPrevioPagoTransferPage from '@/src/components/PerfumesPrevioPagoTransferPage';

export const metadata = {
  title: "Datos para la transferencia | Rosita Rococo",
  description: "Transferí el importe de tu pedido de perfumes y mandanos el comprobante por WhatsApp para despacharlo.",
  alternates: { canonical: "https://rositarococo.com/2026/transferenciacbu-perfumes-pp.html" },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: "Datos para la transferencia | Rosita Rococo",
    description: "Transferí el importe de tu pedido de perfumes y mandanos el comprobante por WhatsApp para despacharlo.",
    url: "https://rositarococo.com/2026/transferenciacbu-perfumes-pp.html",
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
    title: "Datos para la transferencia | Rosita Rococo",
    description: "Transferí el importe de tu pedido de perfumes y mandanos el comprobante por WhatsApp para despacharlo.",
    images: ['https://rositarococo.com/2026/og-perfumes-pp-2026.png'],
  },
};

export default function Page() {
  return <PerfumesPrevioPagoTransferPage />;
}
