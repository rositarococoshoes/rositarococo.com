import ContrareembolsoLandingV2 from '@/src/components/ContrareembolsoLandingV2';

export const metadata = {
  title: 'Rosita Rococo | Contrarreembolso CABA y GBA',
  description: 'Pagás al recibir en CABA y GBA. 1 par $70.000 o 2 pares $110.000. Combiná modelos, mismo precio.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/index-contrareembolso.html',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: 'Rosita Rococo | Contrarreembolso CABA y GBA',
    description: 'Pagás al recibir en CABA y GBA. 1 par $70.000 o 2 pares $110.000.',
    url: 'https://rositarococo.com/2026/index-contrareembolso.html',
    images: [
      {
        url: 'https://rositarococo.com/2026/og-contrareembolso-2026.png',
        width: 1200,
        height: 630,
        alt: 'Rosita Rococo Otoño-Invierno 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rosita Rococo | Contrarreembolso CABA y GBA',
    description: 'Pagás al recibir en CABA y GBA. 1 par $70.000 o 2 pares $110.000.',
    images: ['https://rositarococo.com/2026/og-contrareembolso-2026.png'],
  },
};

export default function ContrareembolsoV2Page() {
  return (
    <main className="v2-landing-shell">
      <ContrareembolsoLandingV2 />
    </main>
  );
}
