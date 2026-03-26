import PrevioPagoLanding from '@/src/components/PrevioPagoLanding';
import { PrevioPagoIntro, PrevioPagoTestimonials } from '@/src/components/PrevioPagoStaticSections';

export const metadata = {
  title: 'Rosita Rococo | Colecci\u00f3n Oto\u00f1o-Invierno 2026',
  description: 'Descubr\u00ed la colecci\u00f3n Oto\u00f1o-Invierno 2026 de Rosita Rococo. 1 par $87.500, 2 pares $137.500 con env\u00edo gratis y pago online o transferencia.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/index.html',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: 'Rosita Rococo | Colecci\u00f3n Oto\u00f1o-Invierno 2026',
    description: 'Descubr\u00ed la colecci\u00f3n Oto\u00f1o-Invierno 2026 de Rosita Rococo. 1 par $87.500, 2 pares $137.500 con env\u00edo gratis y pago online o transferencia.',
    url: 'https://rositarococo.com/2026/index.html',
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
    title: 'Rosita Rococo | Colecci\u00f3n Oto\u00f1o-Invierno 2026',
    description: 'Descubr\u00ed la colecci\u00f3n Oto\u00f1o-Invierno 2026 de Rosita Rococo. 1 par $87.500, 2 pares $137.500 con env\u00edo gratis y pago online o transferencia.',
    images: ['https://rositarococo.com/2026/og-contrareembolso-2026.png'],
  },
};

export default function HomePage() {
  return (
    <main className="landing-shell">
      <PrevioPagoIntro />
      <PrevioPagoLanding testimonialsSlot={<PrevioPagoTestimonials />} />
    </main>
  );
}
