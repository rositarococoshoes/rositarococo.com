/**
 * Lee el catálogo de perfumes de `catalogo-perfumes-completo.xlsx` y lo vuelca
 * a JSON legible.
 *
 * El .xlsx es un zip con XML adentro. No hay librerías de Office instaladas en
 * este proyecto (ni xlsx, ni exceljs, ni jszip), así que se descomprime con
 * System.IO.Compression desde PowerShell y el XML se parsea acá a mano.
 *
 * Uso:  node scripts/read-perfumes-catalog.mjs [ruta.xlsx] [salida.json]
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const XLSX =
  process.argv[2] ||
  'C:/Users/Sebastián/Downloads/catalogorabesoriginales/catalogo-perfumes-completo.xlsx';
const OUT = process.argv[3] || path.join(__dirname, '..', '..', 'perfumes', 'catalogo-rabes.json');
const TMP = path.join(process.env.TEMP || '/tmp', 'xlsx-catalogo-' + Date.now());

/** Descomprime el xlsx con .NET (sin dependencias de npm). */
function unzip(sourcePath, targetDir) {
  // El directorio es nuevo en cada corrida, así que no hace falta el overload
  // con `overwriteFiles` (que además no existe en Windows PowerShell 5.1).
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  const ps =
    `Add-Type -AssemblyName System.IO.Compression.FileSystem;` +
    `[System.IO.Compression.ZipFile]::ExtractToDirectory('${sourcePath.replace(/\\/g, '/')}', '${targetDir.replace(/\\/g, '/')}')`;

  // pwsh (PowerShell 7) primero; Windows PowerShell como fallback.
  for (const shell of ['pwsh', 'powershell']) {
    try {
      execFileSync(shell, ['-NoProfile', '-Command', ps], { stdio: 'pipe' });
      return targetDir;
    } catch (error) {
      const last = shell === 'powershell';
      if (last) throw error;
    }
  }
  return targetDir;
}

/**
 * Escapa los metacaracteres de regex en un string de hoja.
 * Los .xlsx guardan los textos con escapes tipo \& _XX que no son XML válido,
 * hay que sacarlos antes de decodificar.
 */
function unescapeXmlText(value) {
  return value
    .replace(/&(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);/g, (_, e) => {
      if (e === 'amp') return '&';
      if (e === 'lt') return '<';
      if (e === 'gt') return '>';
      if (e === 'quot') return '"';
      if (e === 'apos') return "'";
      if (e.startsWith('#x')) return String.fromCodePoint(parseInt(e.slice(2), 16));
      return String.fromCodePoint(parseInt(e.slice(1), 10));
    })
    // escapes propios del formato de Excel
    .replace(/_(x[0-9a-fA-F]{4}|[0-9a-fA-F]{4}|u[0-9a-fA-F]{4})/g, (_, hex) => {
      if (hex[0] === 'x') return String.fromCharCode(parseInt(hex.slice(1), 16));
      if (hex[0] === 'u') return String.fromCharCode(parseInt(hex.slice(1), 16));
      return String.fromCharCode(parseInt(hex, 16));
    });
}

/** Convierte un character reference tipo &#225; a su carácter. */
function decodeNumericEntities(s) {
  return s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

/** Lee las filas de una hoja: devuelve arrays de celdas ya resueltas. */
function readSheet(xmlPath) {
  if (!fs.existsSync(xmlPath)) return [];
  const xml = fs.readFileSync(xmlPath, 'utf8');

  const rows = [];
  const rowRe = /<row\b[^>]*>([\s\S]*?)<\/row>/g;
  let rowMatch;

  while ((rowMatch = rowRe.exec(xml))) {
    const cells = [];
    const cellRe = /<c\b([^>]*)(?:\/>|>([\s\S]*?)<\/c>)/g;
    let cellMatch;

    while ((cellMatch = cellRe.exec(rowMatch[1]))) {
      const attrs = cellMatch[1] || '';
      const inner = cellMatch[2] || '';
      const ref = (attrs.match(/r="([A-Z]+)\d+"/) || [])[1] || '';
      const type = (attrs.match(/t="([^"]+)"/) || [])[1] || 'n';

      let value = '';
      if (type === 'inlineStr') {
        const isMatch = inner.match(/<is>([\s\S]*?)<\/is>/);
        const raw = isMatch ? isMatch[1] : inner;
        value = decodeNumericEntities(unescapeXmlText(raw.replace(/<[^>]+>/g, '')));
      } else {
        const vMatch = inner.match(/<v>([\s\S]*?)<\/v>/);
        value = vMatch ? decodeNumericEntities(unescapeXmlText(vMatch[1])) : '';
      }
      cells.push({ col: ref, value });
    }
    rows.push(cells);
  }
  return rows;
}

/** "BC" -> 54 (índice de columna base 0). */
function colToIndex(col) {
  let n = 0;
  for (const ch of col) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

/**
 * La primera fila de cada hoja es un título de dos líneas (nombre del catálogo +
 * nota al pie). La segunda es la que tiene los encabezados reales de columna.
 */
function toObjects(rows) {
  // busca la fila de encabezados: la primera que tenga celda en la columna A
  // con valor corto tipo "#"
  const headerIndex = rows.findIndex(
    (cells) => cells.length > 2 && cells[0].value.trim() === '#',
  );
  if (headerIndex === -1) return [];

  const header = rows[headerIndex].map((c) => c.value.trim());

  return rows.slice(headerIndex + 1).map((cells) => {
    const obj = {};
    for (const { col, value } of cells) {
      const idx = colToIndex(col);
      const key = header[idx] || `col_${idx}`;
      obj[key] = value;
    }
    return obj;
  });
}

// --- main ---
if (!fs.existsSync(XLSX)) {
  console.error('No existe el xlsx:', XLSX);
  process.exit(1);
}

const dir = unzip(XLSX, TMP);

const workbookXml = fs.readFileSync(path.join(dir, 'xl', 'workbook.xml'), 'utf8');
const sheetNames = [...workbookXml.matchAll(/<sheet\b[^>]*name="([^"]+)"/g)].map((m) => m[1]);
console.log('Hojas:', sheetNames.join(' | '));

const result = {};
sheetNames.forEach((name, i) => {
  const sheetPath = path.join(dir, 'xl', 'worksheets', `sheet${i + 1}.xml`);
  const rows = readSheet(sheetPath);
  const objects = toObjects(rows);
  result[name] = objects;

  console.log(`\n=== ${name} (${objects.length} filas) ===`);
  console.log('columnas:', Object.keys(objects[0] || {}).join(' | '));
  console.log(JSON.stringify(objects.slice(0, 2), null, 2));
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(result, null, 2), 'utf8');
console.log(`\nJSON escrito en ${OUT}`);

fs.rmSync(dir, { recursive: true, force: true });