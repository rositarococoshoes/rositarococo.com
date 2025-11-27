const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 INICIANDO SERVIDOR ASTRO CORRECTAMENTE');
console.log('📂 Directorio actual:', __dirname);

// Cambiar al directorio del proyecto y ejecutar npm run dev
const devProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.resolve(__dirname),
  stdio: 'inherit',
  shell: true
});

devProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

devProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

devProcess.on('close', (code) => {
  console.log(`\n✅ Servidor detenido con código ${code}`);
});

devProcess.on('error', (error) => {
  console.error('\n❌ Error iniciando servidor:', error);
});

console.log('🔄 Esperando que el servidor inicie...');
console.log('📍 URL esperada: http://localhost:3000');
console.log('📋 Presiona Ctrl+C para detener');
