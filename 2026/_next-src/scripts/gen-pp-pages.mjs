import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('app');
const out = path.resolve('src/components/PerfumesPrevioPagoThanksPages.js');

const meta = (title, description, file) => {
  const OG = 'https://rositarococo.com/2026/og-perfumes-pp-2026.png';
  const CANONICAL = `https://rositarococo.com/2026/${file}.html`;
  return `export const metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  alternates: { canonical: ${JSON.stringify(CANONICAL)} },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    url: ${JSON.stringify(CANONICAL)},
    images: [{ url: ${JSON.stringify(OG)}, width: 1200, height: 630, alt: 'Perfumes Rosita Rococo con pago online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    images: [${JSON.stringify(OG)}],
  },
};`;
};

// count, total, método de pago por defecto, carpeta
const variants = [
  { n: 1, total: 50000, method: 'tarjeta', dir: 'gracias-perfumes-pp-1', file: 'gracias-perfumes-pp-1' },
  { n: 2, total: 80000, method: 'tarjeta', dir: 'gracias-perfumes-pp-2', file: 'gracias-perfumes-pp-2' },
  { n: 3, total: 100000, method: 'tarjeta', dir: 'gracias-perfumes-pp-3', file: 'gracias-perfumes-pp-3' },
];

for (const v of variants) {
  const folder = path.join(dir, v.dir);
  fs.mkdirSync(folder, { recursive: true });
  const title = `Confirmá tu${v.n > 1 ? 's' : ''} ${v.n} perfume${v.n > 1 ? 's' : ''} | Rosita Rococo`;
  const description = `Tu pedido de ${v.n} perfume${v.n > 1 ? 's' : ''} quedó registrado. Confirmá y mandanos el comprobante por WhatsApp.`;
  const page = `import PerfumesPrevioPagoThankYouPage from '@/src/components/PerfumesPrevioPagoThankYouPage';

${meta(title, description, v.file)}

export default function Page() {
  return <PerfumesPrevioPagoThankYouPage count={${v.n}} total={${v.total}} method="${v.method}" />;
}
`;
  fs.writeFileSync(path.join(folder, 'page.js'), page, 'utf8');
  console.log('escrito', v.dir);
}

// página de transferencia bancaria (CBU): muestra los datos para pagar
const cbuVariants = [
  { n: 1, total: 45000, dir: 'transferenciacbu-perfumes-pp-1', file: 'transferenciacbu-perfumes-pp-1' },
  { n: 2, total: 72000, dir: 'transferenciacbu-perfumes-pp-2', file: 'transferenciacbu-perfumes-pp-2' },
  { n: 3, total: 90000, dir: 'transferenciacbu-perfumes-pp-3', file: 'transferenciacbu-perfumes-pp-3' },
];

for (const v of cbuVariants) {
  const folder = path.join(dir, v.dir);
  fs.mkdirSync(folder, { recursive: true });
  const title = `Datos para la transferencia | Rosita Rococo`;
  const description = `Transferí $${v.total.toLocaleString('es-AR')} y mandanos el comprobante por WhatsApp para despachar tu pedido.`;
  const page = `import PerfumesPrevioPagoTransferPage from '@/src/components/PerfumesPrevioPagoTransferPage';

${meta(title, description, v.file)}

export default function Page() {
  return <PerfumesPrevioPagoTransferPage total={${v.total}} count={${v.n}} />;
}
`;
  fs.writeFileSync(path.join(folder, 'page.js'), page, 'utf8');
  console.log('escrito', v.dir);
}

fs.rmSync(out, { force: true });