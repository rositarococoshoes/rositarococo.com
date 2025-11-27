const { exec } = require('child_process');
const path = require('path');

console.log('🚀 INICIANDO SERVIDOR ASTRO');
console.log(`📂 Directorio: ${__dirname}`);

// Usar exec en lugar de spawn para ejecutar npm run dev
exec('npm run dev', {
  cwd: path.resolve(__dirname),
}, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error:', error);
    return;
  }
  
  if (stderr) {
    console.error('❌ STDERR:', stderr);
    return;
  }
  
  console.log('✅ Servidor iniciado correctamente');
  console.log(stdout);
});
