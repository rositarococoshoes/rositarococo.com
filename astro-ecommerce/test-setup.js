const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Testing basic Astro setup...');

// Check if basic files exist
const filesToCheck = [
  'src/pages/simple.astro',
  'astro.config.mjs',
  'package.json'
];

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`✗ ${file} missing`);
  }
});

// Try to run a simple Astro build
console.log('\nTrying to run Astro dev server...');
const devProcess = spawn('npx', ['astro', 'dev', '--port', '3000', '--host', '0.0.0.0'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

devProcess.on('close', (code) => {
  console.log(`\nDev server exited with code ${code}`);
});

devProcess.on('error', (error) => {
  console.error(`\nError starting server: ${error}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down dev server...');
  devProcess.kill('SIGINT');
});
