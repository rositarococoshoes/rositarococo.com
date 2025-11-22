#!/usr/bin/env node

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta principal para astrocline - PRIMERO (antes que cualquier middleware)
app.get(['/astrocline', '/astrocline/'], (req, res) => {
  console.log('🎯 ASTROCLINE ROUTE HIT!');
  let htmlContent = fs.readFileSync(path.join(__dirname, 'astrocline', 'index.html'), 'utf8');

  console.log('Original HTML contains CDN:', htmlContent.includes('cdn.tailwindcss.com'));

  // Reemplazar dinámicamente el CDN de Tailwind por nuestra versión local
  htmlContent = htmlContent.replace(
    '<script src="https://cdn.tailwindcss.com"></script>',
    '<link rel="stylesheet" href="/astrocline/css/tailwind-local.css">'
  );

  console.log('Modified HTML contains local CSS:', htmlContent.includes('tailwind-local.css'));
  console.log('✅ CDN replacement completed');

  res.send(htmlContent);
});

// Middleware para servir recursos específicos de astrocline (pero NUNCA index.html)
app.use('/astrocline/css', express.static(path.join(__dirname, 'astrocline', 'css')));
app.use('/astrocline/js', express.static(path.join(__dirname, 'astrocline', 'js')));

// Servir imágenes y otros recursos estáticos
app.use('/guillerminafotos', express.static(path.join(__dirname, 'guillerminafotos')));
app.use('/rosita-form.webp', express.static(path.join(__dirname, 'rosita-form.webp')));

// Static middleware para todo lo demás (pero NO para /astrocline)
app.use(express.static(__dirname));

// Servir el sitio principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor FINAL levantado en http://localhost:${PORT}`);
  console.log(`📂 Sitio principal: http://localhost:${PORT}`);
  console.log(`👟 Astrocline: http://localhost:${PORT}/astrocline`);
  console.log(`\n🔍 Puedes verificar que los recursos se carguen correctamente:`);
  console.log(`   • CSS: http://localhost:${PORT}/astrocline/css/tailwind-local.css`);
  console.log(`   • JS: http://localhost:${PORT}/astrocline/js/carousel.js`);
  console.log(`   • Imágenes: http://localhost:${PORT}/guillerminafotos/1.webp`);
  console.log(`\n⏹️  Presiona Ctrl+C para detener el servidor`);
});