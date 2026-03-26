import ContrareembolsoLanding from '@/src/components/ContrareembolsoLanding';
import { ContrareembolsoIntro, ContrareembolsoTestimonials } from '@/src/components/ContrareembolsoStaticSections';

export const metadata = {
  title: 'Rosita Rococo | Contrarreembolso 2026',
  description: 'Embudo de contrarreembolso 2026 de Rosita Rococo. 1 par $70.000, 2 pares $110.000 con envío gratis y pago al recibir.',
  alternates: {
    canonical: 'https://rositarococo.com/2026/index-contrareembolso.html',
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
