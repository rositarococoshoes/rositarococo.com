import fs from 'node:fs/promises';
import path from 'node:path';

const root2026 = path.resolve('..');
const outDir = path.resolve('out');
const generatedEntries = ['index.html', 'index-contrareembolso.html', 'gracias-1par-c.html', 'gracias-2pares-c.html', '_next', 'assets'];

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

async function main() {
  await removeGeneratedTargets();
  await copyRecursive(outDir, root2026);
  console.log(`Export copiado desde ${outDir} hacia ${root2026}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
