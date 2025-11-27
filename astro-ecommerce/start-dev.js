const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Astro development server...');

const devProcess = spawn('npx', ['astro', 'dev', '--port', '3000'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

devProcess.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
});

devProcess.on('error', (error) => {
  console.error(`Error starting server: ${error}`);
});
