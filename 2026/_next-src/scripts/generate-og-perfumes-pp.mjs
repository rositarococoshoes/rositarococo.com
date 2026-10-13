import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS, PRICING, discountFor } from '../src/lib/perfumes-previo-pago-data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'public', 'og-perfumes-pp-2026.png');

const W = 1200;
const H = 630;

const money = (value) => `$${value.toLocaleString('es-AR')}`;

const DESDE = Math.min(...PRODUCTS.map((p) => p.price));

// Escalones de descuento. No hay un precio por cantidad porque cada perfume
// tiene el suyo: lo que se anuncia es el descuento fijo que se activa.
const tierCards = [1, 2, 3]
  .map((count, index) => {
    const featured = count === PRICING.maxItems;
    const off = discountFor(count);
    const x = 80 + index * 260;
    const bg = featured ? '#2b3350' : '#ffffff';
    const title = featured ? '#c3cbe2' : '#6b5b51';
    const price = featured ? '#ffffff' : '#241a15';
    const unit = featured ? '#c3cbe2' : '#6b5b51';
    const flag = featured
      ? `<rect x="${x + 180}" y="356" width="100" height="20" rx="10" fill="#2f6b52"/>
         <text x="${x + 230}" y="370" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">MEJOR</text>`
      : '';
    return `
      <rect x="${x}" y="372" width="240" height="118" rx="10" fill="${bg}" ${
        featured ? '' : 'opacity="0.85"'
      }/>
      <text x="${x + 20}" y="406" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="${title}">${
        count
      } ${count === 1 ? 'PERFUME' : 'PERFUMES'}</text>
      <text x="${x + 20}" y="452" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700" fill="${price}">${
        off ? `−${money(off)}` : 'PLENO'
      }</text>
      <text x="${x + 20}" y="474" font-family="Arial, Helvetica, sans-serif" font-size="13" fill="${unit}">${
        off ? 'de descuento' : 'sin descuento'
      }</text>
      ${flag}`;
  })
  .join('\n');

const svg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f7f3ef"/>
      <stop offset="52%" stop-color="#eef1f7"/>
      <stop offset="100%" stop-color="#dfe3ef"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3f4a6b"/>
      <stop offset="100%" stop-color="#2b3350"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cbd2e6" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#8a94b8" stop-opacity="0.9"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <path d="M0 0 L210 0 L0 210 Z" fill="#aab3d0" opacity="0.2"/>
  <path d="M1200 630 L990 630 L1200 420 Z" fill="#aab3d0" opacity="0.2"/>
  <rect x="0" y="0" width="${W}" height="6" fill="url(#accent)"/>

  <!-- frasco -->
  <g transform="translate(930 176)">
    <rect x="42" y="0" width="52" height="38" rx="7" fill="url(#accent)"/>
    <rect x="34" y="34" width="68" height="24" rx="5" fill="#454f70"/>
    <rect x="10" y="56" width="116" height="186" rx="15" fill="url(#glass)"/>
    <rect x="22" y="136" width="92" height="100" rx="9" fill="#3f4a6b" opacity="0.7"/>
    <rect x="21" y="63" width="13" height="172" rx="6" fill="#ffffff" opacity="0.4"/>
    <rect x="10" y="150" width="116" height="66" fill="#fffaf5" opacity="0.94"/>
    <text x="68" y="174" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" fill="#2b3350" text-anchor="middle">EXTRAIT</text>
    <text x="68" y="192" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" fill="#2b3350" text-anchor="middle">DE PARFUM</text>
    <text x="68" y="208" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#6b5b51" text-anchor="middle">60 ML</text>
  </g>

  <text x="80" y="146" font-family="Georgia, 'Playfair Display', 'Times New Roman', serif" font-size="58" font-weight="700" fill="#241a15">Rosita Rococo</text>
  <text x="80" y="206" font-family="Georgia, 'Playfair Display', 'Times New Roman', serif" font-size="42" font-weight="700" fill="#3f4a6b">Perfumes</text>

  <rect x="80" y="242" width="430" height="42" rx="21" fill="#2f6b52"/>
  <text x="295" y="269" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#fff" text-anchor="middle">ENVÍO GRATIS A TODO EL PAÍS</text>

  <text x="80" y="322" font-family="Arial, Helvetica, sans-serif" font-size="21" fill="#6b5b51">61 perfumes desde ${money(
    DESDE,
  )} · pagá con tarjeta, MercadoPago o transferencia</text>

  ${tierCards}

  <rect x="80" y="506" width="700" height="34" rx="17" fill="#dcece4"/>
  <text x="430" y="528" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="#2f6b52" text-anchor="middle">Transferencia bancaria con 10% OFF adicional</text>

  <rect x="0" y="578" width="${W}" height="52" fill="#2b3350"/>
  <text x="600" y="611" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#c3cbe2" text-anchor="middle">Armaf · Afnan · Lattafa · Rasasi · Maison Alhambra</text>
</svg>`);

await sharp(svg).png().toFile(OUT);
console.log('OG image generated:', OUT);