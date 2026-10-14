import PerfumesPrevioPagoLanding from '@/src/components/PerfumesPrevioPagoLanding';
import { PRODUCTS } from '@/src/lib/perfumes-previo-pago-data';

const OG_IMAGE = 'https://rositarococo.com/2026/og-perfumes-pp-2026.png';
const CANONICAL = 'https://rositarococo.com/2026/perfumes-previopago.html';

const TITLE = 'Perfumes con pago online | Rosita Rococo';
// La cantidad sale del catálogo, no va escrita a mano: quedó en 61 cuando ya
// eran 62 y el texto de la páginaVZaba diciendo una cosa y la landing otra.
const DESCRIPTION = `${PRODUCTS.length} perfumes de Armaf, Afnan, Lattafa y Rasasi. Pagá con tarjeta, MercadoPago o transferencia con 10% OFF. Envío gratis a todo el país.`;

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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Perfumes Rosita Rococo con pago online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function PerfumesPrevioPagoPage() {
  return (
    <main className="pp-landing-shell">
      <PerfumesPrevioPagoLanding />
    </main>
  );
}