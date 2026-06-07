import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'public', 'og-previo-pago-2026.png');

const W = 1200;
const H = 630;

const bg = Buffer.from(
  `<svg width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f8eee6"/>
        <stop offset="46%" stop-color="#f2e7dc"/>
        <stop offset="100%" stop-color="#ead7c8"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#8f5a45"/>
        <stop offset="100%" stop-color="#6f3b28"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <!-- decorative corner -->
    <path d="M0 0 L180 0 L0 180 Z" fill="#d8b397" opacity="0.15"/>
    <path d="M1200 630 L1020 630 L1200 450 Z" fill="#d8b397" opacity="0.15"/>
    <!-- brand bar top -->
    <rect x="0" y="0" width="${W}" height="5" fill="url(#accent)"/>
    <text font-family="Georgia, 'Playfair Display', 'Times New Roman', serif" font-size="56" font-weight="700" fill="#28170f" x="80" y="180">Rosita Rococo</text>
    <text font-family="Georgia, 'Playfair Display', 'Times New Roman', serif" font-size="28" fill="#70584b" x="80" y="224">Colección Otoño-Invierno 2026</text>
    <!-- badge -->
    <rect x="80" y="256" width="260" height="40" rx="20" ry="20" fill="#8f5a45"/>
    <text font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#fff6ef" x="210" y="283" text-anchor="middle">PAGO ONLINE / TRANSFERENCIA</text>
    <!-- pricing -->
    <text font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#70584b" x="80" y="340">Elegí tus modelos y pagá de forma segura</text>
    <rect x="80" y="370" width="240" height="100" rx="8" ry="8" fill="white" opacity="0.7"/>
    <text font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#6f3b28" x="96" y="402">1 PAR</text>
    <text font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#28170f" x="96" y="440">$87.500</text>
    <rect x="340" y="370" width="240" height="100" rx="8" ry="8" fill="#8f5a45"/>
    <text font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#d8b397" x="372" y="402">2 PARES</text>
    <text font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#fff6ef" x="356" y="440">$137.500</text>
    <text font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#2d6f53" font-weight="700" x="372" y="462">Envío gratis</text>
    <!-- footer -->
    <rect x="0" y="580" width="${W}" height="50" fill="#6f3b28"/>
    <text font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#d8b397" x="600" y="610" text-anchor="middle">Envío gratis a todo el país - Pago online con todos los medios</text>
  </svg>`
);

await sharp(bg)
  .png()
  .toFile(OUT);

console.log('OG image generated:', OUT);
