/**
 * Genera las dos páginas finales del funnel de perfumes con previo pago.
 *
 * Uso:  node scripts/gen-pp-pages.mjs
 *
 * Antes eran seis (gracias-1/2/3 y transferenciacbu-1/2/3), una por cantidad.
 * Ya no tiene sentido: con precio por perfume el total depende de cuáles
 * perfumes eligió el cliente, así que no hay un importe fijo por cantidad que
 * pueda ir hardcodeado en la URL. Las dos páginas leen el pedido del
 * localStorage que dejó el submit (ver src/lib/use-last-order.js).
 */
import fs from 'node:fs';
import path from 'node:path';

const appDir = path.resolve('app');

const meta = (title, description, file) => `export const metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  alternates: { canonical: ${JSON.stringify(`https://rositarococo.com/2026/${file}.html`)} },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    url: ${JSON.stringify(`https://rositarococo.com/2026/${file}.html`)},
    images: [
      {
        url: 'https://rositarococo.com/2026/og-perfumes-pp-2026.png',
        width: 1200,
        height: 630,
        alt: 'Perfumes Rosita Rococo con pago online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    images: ['https://rositarococo.com/2026/og-perfumes-pp-2026.png'],
  },
};`;

// Las seis rutas viejas, que se borran: sus importadores ya no existen.
const VIEJAS = [
  'gracias-perfumes-pp-1',
  'gracias-perfumes-pp-2',
  'gracias-perfumes-pp-3',
  'transferenciacbu-perfumes-pp-1',
  'transferenciacbu-perfumes-pp-2',
  'transferenciacbu-perfumes-pp-3',
];

for (const name of VIEJAS) {
  const dir = path.join(appDir, name);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('borrada', name);
  }
}

// --- gracias (tarjeta / MercadoPago)
const gracias = path.join(appDir, 'gracias-perfumes-pp');
fs.mkdirSync(gracias, { recursive: true });
// La metadata va en el archivo de pagina, no en el componente: Next solo lee
// el export `metadata` de page.js, y si queda en el componente se usa la del
// layout (el title genérico de la temporada).
fs.writeFileSync(
  path.join(gracias, 'page.js'),
  `import PerfumesPrevioPagoThankYouPage from '@/src/components/PerfumesPrevioPagoThankYouPage';

${meta(
  'Confirmá tu pedido | Rosita Rococo',
  'Tu pedido de perfumes quedó registrado. Mandanos el comprobante por WhatsApp y te enviamos el número de seguimiento.',
  'gracias-perfumes-pp',
)}

export default function Page() {
  return <PerfumesPrevioPagoThankYouPage />;
}
`,
  'utf8',
);
console.log('escrito gracias-perfumes-pp');

// --- transferencia bancaria: metadata aparte porque el componente es cliente
const cbu = path.join(appDir, 'transferenciacbu-perfumes-pp');
fs.mkdirSync(cbu, { recursive: true });
fs.writeFileSync(
  path.join(cbu, 'page.js'),
  `import PerfumesPrevioPagoTransferPage from '@/src/components/PerfumesPrevioPagoTransferPage';

${meta(
  'Datos para la transferencia | Rosita Rococo',
  'Transferí el importe de tu pedido de perfumes y mandanos el comprobante por WhatsApp para despacharlo.',
  'transferenciacbu-perfumes-pp',
)}

export default function Page() {
  return <PerfumesPrevioPagoTransferPage />;
}
`,
  'utf8',
);
console.log('escrito transferenciacbu-perfumes-pp');