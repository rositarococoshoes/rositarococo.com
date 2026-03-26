import { PrevioPagoTransferPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Datos para transferir tu pedido',
  description: 'Tu pedido de 1 par ya est\u00e1 registrado. Aqu\u00ed tienes los datos bancarios para abonar con descuento adicional.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/transferenciacbu-1par.html',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: 'Rosita Rococo | Datos para transferir tu pedido',
    description: 'Tu pedido de 1 par ya est\u00e1 registrado. Aqu\u00ed tienes los datos bancarios para abonar con descuento adicional.',
    url: 'https://rositarococo.com/2026/transferenciacbu-1par.html',
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
    title: 'Rosita Rococo | Datos para transferir tu pedido',
    description: 'Tu pedido de 1 par ya est\u00e1 registrado. Aqu\u00ed tienes los datos bancarios para abonar con descuento adicional.',
    images: ['https://rositarococo.com/2026/og-contrareembolso-2026.png'],
  },
};

export default function TransferenciaUnParPage() {
  return <PrevioPagoTransferPage pairCount={1} total={78750} />;
}
