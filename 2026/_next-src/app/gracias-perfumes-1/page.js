import PerfumesThankYouPage from '@/src/components/PerfumesThankYouPage';

const OG_IMAGE = 'https://rositarococo.com/2026/og-perfumes-2026.png';
const CANONICAL = 'https://rositarococo.com/2026/gracias-perfumes-1.html';

const TITLE = 'Confirmá tu pedido de perfume por WhatsApp | Rosita Rococo';
const DESCRIPTION = 'Tu pedido de 1 perfume quedó reservado. Confirmalo por WhatsApp para que podamos despacharlo.';

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

export default function GraciasPerfumesUnoPage() {
  return <PerfumesThankYouPage count={1} total={40000} />;
}
