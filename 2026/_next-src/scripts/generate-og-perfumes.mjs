import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'public', 'og-perfumes-2026.png');

const W = 1200;
const H = 630;

const svg = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbf4ec"/>
      <stop offset="52%" stop-color="#f4e8db"/>
      <stop offset="100%" stop-color="#e9d6c4"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8f5a45"/>
      <stop offset="100%" stop-color="#6f3b28"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f6dfc6" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#c98f5e" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="juice" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d9a066"/>
      <stop offset="100%" stop-color="#8a4f2c"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <path d="M0 0 L210 0 L0 210 Z" fill="#d8b397" opacity="0.18"/>
  <path d="M1200 630 L990 630 L1200 420 Z" fill="#d8b397" opacity="0.18"/>
  <rect x="0" y="0" width="${W}" height="6" fill="url(#accent)"/>

  <!-- frasco -->
  <g transform="translate(905 168)">
    <rect x="46" y="0" width="54" height="42" rx="8" fill="url(#accent)"/>
    <rect x="36" y="38" width="74" height="26" rx="6" fill="#7c4630"/>
    <rect x="12" y="62" width="122" height="196" rx="16" fill="url(#glass)"/>
    <rect x="20" y="128" width="106" height="122" rx="10" fill="url(#juice)"/>
    <rect x="24" y="70" width="14" height="180" rx="7" fill="#ffffff" opacity="0.4"/>
    <rect x="12" y="150" width="122" height="72" fill="#fffaf5" opacity="0.92"/>
    <text x="73" y="176" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="#6f3b28" text-anchor="middle">EXTRAIT</text>
    <text x="73" y="196" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="#6f3b28" text-anchor="middle">DE PARFUM</text>
    <text x="73" y="214" font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#8f5a45" text-anchor="middle">60 ML</text>
  </g>

  <text x="80" y="150" font-family="Georgia, 'Playfair Display', 'Times New Roman', serif" font-size="62" font-weight="700" fill="#28170f">Rosita Rococo</text>
  <text x="80" y="212" font-family="Georgia, 'Playfair Display', 'Times New Roman', serif" font-size="44" font-weight="700" fill="#8f5a45">Perfumes</text>

  <rect x="80" y="248" width="330" height="42" rx="21" fill="#8f5a45"/>
  <text x="245" y="276" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#fff6ef" text-anchor="middle">PAGÁS AL RECIBIR · CABA Y GBA</text>

  <text x="80" y="336" font-family="Arial, Helvetica, sans-serif" font-size="21" fill="#70584b">Elegís los perfumes y lo pagás en efectivo al recibir</text>

  <rect x="80" y="372" width="220" height="118" rx="10" fill="#ffffff" opacity="0.82"/>
  <text x="100" y="406" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#6f3b28">1 PERFUME</text>
  <text x="100" y="452" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="#28170f">$40.000</text>

  <rect x="316" y="372" width="220" height="118" rx="10" fill="#8f5a45"/>
  <text x="336" y="406" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#e8cdb4">2 PERFUMES</text>
  <text x="336" y="452" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="#fff6ef">$65.000</text>

  <rect x="552" y="372" width="240" height="118" rx="10" fill="#6f3b28"/>
  <text x="572" y="406" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#e8cdb4">3 PERFUMES</text>
  <text x="572" y="452" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="#fff6ef">$80.000</text>
  <text x="572" y="474" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#9fd0b4">MEJOR PRECIO</text>

  <rect x="0" y="578" width="${W}" height="52" fill="#6f3b28"/>
  <text x="600" y="611" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#e8cdb4" text-anchor="middle">Envío gratis · Sin anticipo · 23 fragrances inspirados en marcas que ya conocés</text>
</svg>`
);

await sharp(svg).png().toFile(OUT);
console.log('OG image generated:', OUT);
