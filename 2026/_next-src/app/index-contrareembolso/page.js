import ContrareembolsoLanding from '@/src/components/ContrareembolsoLanding';
import { ContrareembolsoIntro, ContrareembolsoTestimonials } from '@/src/components/ContrareembolsoStaticSections';

export default function ContrareembolsoPage() {
  return (
    <main className="landing-shell">
      <ContrareembolsoIntro />
      <ContrareembolsoLanding testimonialsSlot={<ContrareembolsoTestimonials />} />
    </main>
  );
}
