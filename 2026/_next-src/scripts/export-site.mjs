import fs from 'node:fs/promises';
import path from 'node:path';

const root2026 = path.resolve('..');
const outDir = path.resolve('out');
const serverAppDir = path.resolve('.next', 'server', 'app');
const nextStaticDir = path.resolve('.next', 'static');
const publicDir = path.resolve('public');

const generatedEntries = [
  'index.html',
  '404.html',
  '_not-found.html',
  'index-contrareembolso.html',
  'gracias-1par-c.html',
  'gracias-2pares-c.html',
  '_next',
  'assets',
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'og-contrareembolso-2026.png',
  'site.webmanifest',
];

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function removeGeneratedTargets() {
  await Promise.all(
    generatedEntries.map(async (entry) => {
      const target = path.join(root2026, entry);
      await fs.rm(target, { recursive: true, force: true });
    }),
  );
}

async function copyRecursive(source, destination) {
  const stat = await fs.stat(source);
  if (stat.isDirectory()) {
    await fs.mkdir(destination, { recursive: true });
    const entries = await fs.readdir(source);
    await Promise.all(entries.map((entry) => copyRecursive(path.join(source, entry), path.join(destination, entry))));
    return;
  }

  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(source, destination);
}

async function exportFromServerApp() {
  const htmlEntries = [
    ['index.html', 'index.html'],
    ['index-contrareembolso.html', 'index-contrareembolso.html'],
    ['gracias-1par-c.html', 'gracias-1par-c.html'],
    ['gracias-2pares-c.html', 'gracias-2pares-c.html'],
    ['_not-found.html', '_not-found.html'],
    ['_not-found.html', '404.html'],
  ];

  await Promise.all(htmlEntries.map(([sourceName, targetName]) => copyRecursive(path.join(serverAppDir, sourceName), path.join(root2026, targetName))));
  await copyRecursive(nextStaticDir, path.join(root2026, '_next', 'static'));
  await copyRecursive(path.join(publicDir, 'assets'), path.join(root2026, 'assets'));

  const optionalPublic = [
    'apple-touch-icon.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'og-contrareembolso-2026.png',
    'site.webmanifest',
  ];
  await Promise.all(optionalPublic.map(async (file) => {
    const source = path.join(publicDir, file);
    if (await exists(source)) {
      await copyRecursive(source, path.join(root2026, file));
    }
  }));
}

async function main() {
  await removeGeneratedTargets();
  if (await exists(serverAppDir) && await exists(nextStaticDir)) {
    await exportFromServerApp();
    console.log(`Export copiado desde ${serverAppDir} y ${nextStaticDir} hacia ${root2026}`);
    return;
  }

  if (await exists(outDir)) {
    await copyRecursive(outDir, root2026);
    console.log(`Export copiado desde ${outDir} hacia ${root2026}`);
    return;
  }

  throw new Error(`No encontre archivos exportables en ${serverAppDir} ni en ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
