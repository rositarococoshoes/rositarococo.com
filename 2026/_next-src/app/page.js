import PrevioPagoLanding from '@/src/components/PrevioPagoLanding';
import { PrevioPagoIntro, PrevioPagoTestimonials } from '@/src/components/PrevioPagoStaticSections';

export const metadata = {
  title: 'Rosita Rococo | Previo pago 2026',
  description: 'Embudo de previo pago 2026 de Rosita Rococo. 1 par $87.500, 2 pares $137.500 con envío gratis y pago online o transferencia.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/index.html',
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
