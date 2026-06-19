import ContrareembolsoLanding from '@/src/components/ContrareembolsoLanding';
import { ContrareembolsoIntro, ContrareembolsoTestimonials } from '@/src/components/ContrareembolsoStaticSections';

export const metadata = {
  title: 'Rosita Rococo | Contrarreembolso (anterior)',
  description: 'Elegí tus pares de Rosita Rococo y pagá al recibir. 1 par $70.000 o 2 pares $110.000 con envío gratis a todo el país.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/index-contrareembolso2.html',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: 'Rosita Rococo | Contrarreembolso (anterior)',
    description: 'Elegí tus pares de Rosita Rococo y pagá al recibir. 1 par $70.000 o 2 pares $110.000 con envío gratis a todo el país.',
    url: 'https://rositarococo.com/2026/index-contrareembolso2.html',
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
    title: 'Rosita Rococo | Contrarreembolso (anterior)',
    description: 'Elegí tus pares de Rosita Rococo y pagá al recibir. 1 par $70.000 o 2 pares $110.000 con envío gratis.',
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
