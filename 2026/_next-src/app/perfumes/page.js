import PerfumesLanding from '@/src/components/PerfumesLanding';

const OG_IMAGE = 'https://rositarococo.com/2026/og-perfumes-2026.png';
const CANONICAL = 'https://rositarococo.com/2026/perfumes.html';

const TITLE = 'Perfumes por contrarreembolsto | Rosita Rococo';
const DESCRIPTION =
  'Elegí tus perfumes y pagá al recibir. 1 por $40.000, 2 por $65.000 o 3 por $80.000. Envío gratis a CABA y GBA.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Perfumes Rosita Rococo por contrarreembolso' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function PerfumesPage() {
  return (
    <main className="pf-landing-shell">
      <PerfumesLanding />
    </main>
  );
}
