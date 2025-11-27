const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Astro development server...');

// Start Astro with simplified config
const astroProcess = spawn('npx', ['astro@4.16.12', 'dev', '--config', 'astro.simple.config.mjs', '--port', '3000'], {
  cwd: path.resolve(__dirname),
  stdio: 'inherit',
  shell: true
});

astroProcess.on('close', (code) => {
  console.log(`\n✅ Astro server stopped with code ${code}`);
});

astroProcess.on('error', (error) => {
  console.error(`\n❌ Error starting Astro: ${error}`);
});

// Handle termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping Astro server...');
  astroProcess.kill('SIGINT');
});
