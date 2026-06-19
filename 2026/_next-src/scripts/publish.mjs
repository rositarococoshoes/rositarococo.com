import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const nextSrcDir = path.resolve(here, '..');
const repoRoot = path.resolve(nextSrcDir, '..', '..');

const rootHtmlFiles = [
  'index.html',
  'index-contrareembolso.html',
  'index-contrareembolso2.html',
  'gracias-1par.html',
  'gracias-1par-c.html',
  'gracias-2pares.html',
  'gracias-2pares-c.html',
  'gracias-pago.html',
  'gracias-pago-2pares.html',
  'gracias-pago-pendiente.html',
  'transferenciacbu-1par.html',
  'transferenciacbu-2pares.html',
];

function run(command, cwd) {
  console.log(`> ${command}`);
  execSync(command, { stdio: 'inherit', cwd: cwd ?? repoRoot });
}

console.log('Building Next.js...');
run('npm run build', nextSrcDir);

console.log('Exporting static site (2026/ + repo root)...');
run('npm run export:site', nextSrcDir);

console.log('Staging changes...');
run('git add 2026/');
for (const file of rootHtmlFiles) {
  run(`git add ${file}`);
}

console.log('');
console.log('Listo. Revisa con `git status` y commitea cuando estes conforme.');
