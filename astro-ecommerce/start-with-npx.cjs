const { exec } = require('child_process');
const path = require('path');

console.log('🚀 INICIANDO SERVIDOR ASTRO CON NPX');
console.log(`📂 Directorio: ${__dirname}`);

// Usar npx astro dev directamente
exec('npx astro dev --port 3000', {
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
