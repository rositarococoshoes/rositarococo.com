import { PrevioPagoTransferPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Transfer\u00ed tus 2 pares con descuento',
  description: 'Tu pedido de 2 pares ya est\u00e1 registrado. Aqu\u00ed tienes los datos bancarios para abonar con descuento adicional.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/transferenciacbu-2pares.html',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: 'Rosita Rococo | Transfer\u00ed tus 2 pares con descuento',
    description: 'Tu pedido de 2 pares ya est\u00e1 registrado. Aqu\u00ed tienes los datos bancarios para abonar con descuento adicional.',
    url: 'https://rositarococo.com/2026/transferenciacbu-2pares.html',
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
    title: 'Rosita Rococo | Transfer\u00ed tus 2 pares con descuento',
    description: 'Tu pedido de 2 pares ya est\u00e1 registrado. Aqu\u00ed tienes los datos bancarios para abonar con descuento adicional.',
    images: ['https://rositarococo.com/2026/og-contrareembolso-2026.png'],
  },
};

export default function TransferenciaDosParesPage() {
  return <PrevioPagoTransferPage pairCount={2} total={123750} />;
}
