/**
 * Extrae el texto de un PDF sin dependencias de npm permanentes.
 *
 * Uso:  node scripts/read-pdf.mjs <archivo.pdf> [paginas]
 *
 * El PDF de precios (Originales.pdf, 56 MB, 25 páginas) tiene texto real, no
 * escaneos, así que alcanza con parsearlo. Se usa pdfjs-dist instalado con
 * `--no-save`: no va a package.json porque es una herramienta de lectura, no
 * parte del build del sitio.
 */
import fs from 'node:fs';
import path from 'node:path';

const pdfPath = process.argv[2];
if (!pdfPath || !fs.existsSync(pdfPath)) {
  console.error('Uso: node scripts/read-pdf.mjs <archivo.pdf>');
  process.exit(1);
}

const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjs.getDocument({ data, useSystemFonts: false }).promise;

console.log(`paginas: ${doc.numPages}`);

const out = [];
for (let page = 1; page <= doc.numPages; page++) {
  const p = await doc.getPage(page);
  const content = await p.getTextContent();
  // reconstruir lineas: los items traen la posicion en Y
  const items = content.items.map((it) => ({
    str: it.str,
    x: it.transform[4],
    y: Math.round(it.transform[5] * 10) / 10,
    h: it.height || 10,
  }));
  items.sort((a, b) => (b.y - a.y) || (a.x - b.x));

  const lines = [];
  let current = null;
  for (const it of items) {
    if (current === null || Math.abs(it.y - current.y) > Math.max(3, it.h * 0.4)) {
      current = { y: it.y, parts: [] };
      lines.push(current);
    }
    current.parts.push(it);
  }

  const text = lines
    .map((line) => {
      let s = '';
      let prev = null;
      for (const it of line.parts) {
        if (prev !== null) {
          const gap = it.x - prev;
          if (gap > 1.2) s += ' | ';
          else if (gap > 0.25) s += ' ';
        }
        s += it.str;
        prev = it.x + it.str.length * it.h * 0.45;
      }
      return s.replace(/[ \t]+/g, ' ').trim();
    })
    .filter(Boolean)
    .join('\n');

  out.push(`\n========== PAGINA ${page} ==========\n${text}`);
}

const full = out.join('\n');
fs.writeFileSync(path.join(process.env.TEMP, 'originales.txt'), full, 'utf8');
console.log(full);
console.log('\n--- guardado en %TEMP%\\originales.txt ---');