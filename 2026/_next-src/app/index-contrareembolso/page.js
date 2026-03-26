import ContrareembolsoLanding from '@/src/components/ContrareembolsoLanding';
import { ContrareembolsoIntro, ContrareembolsoTestimonials } from '@/src/components/ContrareembolsoStaticSections';

export const metadata = {
  title: 'Rosita Rococo | Contrarreembolso con env\u00edo gratis',
  description: 'Eleg\u00ed tus pares de Rosita Rococo y pag\u00e1 al recibir. 1 par $70.000 o 2 pares $110.000 con env\u00edo gratis a todo el pa\u00eds.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/index-contrareembolso.html',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: 'Rosita Rococo | Contrarreembolso con env\u00edo gratis',
    description: 'Eleg\u00ed tus pares de Rosita Rococo y pag\u00e1 al recibir. 1 par $70.000 o 2 pares $110.000 con env\u00edo gratis a todo el pa\u00eds.',
    url: 'https://rositarococo.com/2026/index-contrareembolso.html',
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
    title: 'Rosita Rococo | Contrarreembolso con env\u00edo gratis',
    description: 'Eleg\u00ed tus pares de Rosita Rococo y pag\u00e1 al recibir. 1 par $70.000 o 2 pares $110.000 con env\u00edo gratis a todo el pa\u00eds.',
    images: ['https://rositarococo.com/2026/og-contrareembolso-2026.png'],
  },
};

export default function ContrareembolsoPage() {
  return (
    <main className="landing-shell">
      <ContrareembolsoIntro />
      <ContrareembolsoLanding testimonialsSlot={<ContrareembolsoTestimonials />} />
    </main>
  );
}
