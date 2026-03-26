import { PrevioPagoLegacyOptionsPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Eleg\u00ed c\u00f3mo pagar tus 2 pares',
  description: 'Tu pedido de 2 pares ya est\u00e1 listo. Eleg\u00ed si quer\u00e9s pagar online o por transferencia con descuento adicional.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/gracias-2pares.html',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: 'Rosita Rococo | Eleg\u00ed c\u00f3mo pagar tus 2 pares',
    description: 'Tu pedido de 2 pares ya est\u00e1 listo. Eleg\u00ed si quer\u00e9s pagar online o por transferencia con descuento adicional.',
    url: 'https://rositarococo.com/2026/gracias-2pares.html',
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
    title: 'Rosita Rococo | Eleg\u00ed c\u00f3mo pagar tus 2 pares',
    description: 'Tu pedido de 2 pares ya est\u00e1 listo. Eleg\u00ed si quer\u00e9s pagar online o por transferencia con descuento adicional.',
    images: ['https://rositarococo.com/2026/og-contrareembolso-2026.png'],
  },
};

export default function GraciasDosParesPage() {
  return <PrevioPagoLegacyOptionsPage pairCount={2} total={137500} />;
}
