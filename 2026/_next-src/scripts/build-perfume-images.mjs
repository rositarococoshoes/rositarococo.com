/**
 * Convierte las fotos crudas de `perfumes/_extracted/` a WebP optimizado en
 * `public/assets/perfumes/`.
 *
 * Uso:  node scripts/build-perfume-images.mjs
 *
 * Por qué existe: las fotos originales son PNG de ~2 MB cada una (23 fotos =
 * ~46 MB). Para una landing mobile eso es inviable, así que se re-codifican a
 * WebP con el lado mayor a 900 px.
 *
 * Nota de calidad: los archivos SIN sufijo `_ai` son recortes de 1000x1000 con
 * un borde oscuro artifactado. Cuando existe la variante `_ai` se usa esa
 * (1024x1024, render limpio). Ver perfumes/INVENTARIO-PERFUMES.md.
 */
import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, statSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
// _next-src/scripts -> _next-src -> 2026 -> raíz del repo
const SRC_ROOT = resolve(__dirname, '..', '..', '..', 'perfumes', '_extracted');
const OUT_DIR = resolve(__dirname, '..', 'public', 'assets', 'perfumes');

const MAX_EDGE = 900;
const QUALITY = 82;

/** id de perfume -> archivo fuente relativo dentro de _extracted */
const SOURCES = {
  'arabians-tonka': 'perfumescondescripcionenenvase__1_/00_arabians_tonka_montale.png',
  'lady-million': 'perfumescondescripcionenenvase__1_/01_lady_million_rabanne.png',
  'power-of-you': 'perfumescondescripcionenenvase__1_/02_power_of_you_giorgio_armani.png',
  'cher-dieciocho': 'perfumescondescripcionenenvase__1_/03_cher_dieciocho_maria_cher.png',
  'vip-rose': 'perfumescondescripcionenenvase__1_/04_212_vip_rose_carolina_herrera.png',
  'yara': 'perfumescondescripcionenenvase__1_/05_yara_lattafa.png',
  'la-bomba': 'perfumescondescripcionenenvase__1_/06_la_bomba_carolina_herrera.png',
  'eclaire': 'perfumescondescripcionenenvase__1_/07_eclaire_lattafa.png',
  'black-xs': 'perfumescondescripcionenenvase__1_/08_black_xs_rabanne.png',
  'mandaryn-elixir': 'perfumescondescripcionenenvase__1_/09_mandaryn_sky_elixir_armaf.png',
  'odyssey-mandarin': 'perfumescondescripcinenenvase/10_odyssey_mandarin_armaf_unisex_ai.png',
  'bombshell-nights': 'perfumescondescripcinenenvase/11_bombshell_nights_victorias_secret_ai.png',
  'scandal': 'perfumescondescripcinenenvase/12_scandal_jean_paul_gaultier_ai.png',
  'erba-pura': 'perfumescondescripcinenenvase/13_erba_pura_xerjoff_ai.png',
  'ange-ou-demon': 'perfumescondescripcinenenvase/14_ange_ou_demon_givenchy_ai.png',
  'born-in-roma-purple': 'perfumescondescripcinenenvase__1_/15_born_in_roma_purple_melancholia_valentino_ai.png',
  'valentino-donna-born': 'perfumescondescripcinenenvase__1_/16_valentino_donna_born_in_roma_ai.png',
  'my-way': 'perfumescondescripcinenenvase__1_/17_my_way_giorgio_armani_ai.png',
  'yara-variante': 'perfumescondescripcinenenvase__1_/18_yara_lattafa_variante_ai.png',
  'olympea': 'perfumescondescripcinenenvase__1_/19_olympea_rabanne_ai.png',
  // Las tres siguientes solo existen como fotos de WhatsApp en 3:4.
  'la-vie-est-belle': 'perfumescondescripcionenenvase/WhatsApp Image 2026-09-13 at 10.03.19.jpeg',
  'bonbon': 'perfumescondescripcionenenvase/WhatsApp Image 2026-09-13 at 10.03.20.jpeg',
  'fame': 'perfumescondescripcionenenvase/WhatsApp Image 2026-09-13 at 10.03.18.jpeg',
};

async function main() {
  const entries = Object.entries(SOURCES);
  const missing = entries.filter(([, rel]) => !existsSync(resolve(SRC_ROOT, rel)));

  if (missing.length) {
    console.error('Faltan archivos fuente:');
    for (const [id, rel] of missing) console.error(`  ${id} -> ${rel}`);
    console.error('\nExtraé los ZIP de perfumes/ en perfumes/_extracted/ primero.');
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const report = [];

  for (const [id, rel] of entries) {
    const input = resolve(SRC_ROOT, rel);
    const output = resolve(OUT_DIR, `${id}.webp`);

    const info = await sharp(input)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(output);

    report.push({
      id,
      size: `${info.width}x${info.height}`,
      webpKB: Math.round(info.size / 1024),
      saved: `${Math.round((1 - info.size / statSync(input).size) * 100)}%`,
    });
  }

  const totalWebp = report.reduce((sum, row) => sum + row.webpKB, 0);
  console.table(report);
  console.log(`\n${report.length} imágenes -> ${OUT_DIR}`);
  console.log(`Total WebP: ${(totalWebp / 1024).toFixed(2)} MB`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
