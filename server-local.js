#!/usr/bin/env node

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta principal para astrocline - servimos el HTML modificado en memoria (antes de static middleware)
app.get(['/astrocline', '/astrocline/'], (req, res) => {
  let htmlContent = fs.readFileSync(path.join(__dirname, 'astrocline', 'index.html'), 'utf8');

  // Reemplazar dinámicamente el CDN de Tailwind por nuestra versión local
  // Solo para desarrollo local, sin modificar el archivo original
  console.log('Processing astrocline route - hostname:', req.hostname);
  console.log('Request headers host:', req.headers.host);

  // Siempre hacer el reemplazo para desarrollo local
  htmlContent = htmlContent.replace(
    '<script src="https://cdn.tailwindcss.com"></script>',
    '<link rel="stylesheet" href="/astrocline/css/tailwind-local.css">'
  );

  res.send(htmlContent);
});

// Servir archivos estáticos desde la raíz del proyecto (después de rutas personalizadas)
app.use(express.static(__dirname));

// Servir recursos específicos de astrocline (evitando conflictos con la ruta principal)
app.use('/astrocline/css', express.static(path.join(__dirname, 'astrocline', 'css')));
app.use('/astrocline/js', express.static(path.join(__dirname, 'astrocline', 'js')));
app.use('/astrocline/images', express.static(path.join(__dirname, 'astrocline', 'images')));
app.use('/astrocline/favicon.svg', express.static(path.join(__dirname, 'astrocline')));

// Servir imágenes y recursos de las carpetas hijas
app.use('/guillerminafotos', express.static(path.join(__dirname, 'guillerminafotos')));
app.use('/rosita-form.webp', express.static(path.join(__dirname, 'rosita-form.webp')));

// Middleware especial para interceptar y servir Tailwind CSS localmente sin modificar archivos originales
app.use((req, res, next) => {
  // Intercepta solicitudes al CDN de Tailwind CSS
  if (req.path.includes('cdn.tailwindcss.com') || req.path.includes('unpkg.com/tailwindcss')) {
    res.setHeader('Content-Type', 'text/css');
    return res.sendFile(path.join(__dirname, 'astrocline', 'css', 'tailwind-local.css'));
  }
  next();
});


// Servir el sitio principal también
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor local levantado en http://localhost:${PORT}`);
  console.log(`📂 Sitio principal: http://localhost:${PORT}`);
  console.log(`👟 Astrocline: http://localhost:${PORT}/astrocline`);
  console.log(`\n🔍 Puedes verificar que los recursos se carguen correctamente:`);
  console.log(`   • CSS: http://localhost:${PORT}/astrocline/css/unified.css`);
  console.log(`   • JS: http://localhost:${PORT}/astrocline/js/carousel.js`);
  console.log(`   • Imágenes: http://localhost:${PORT}/guillerminafotos/1.webp`);
  console.log(`\n⏹️  Presiona Ctrl+C para detener el servidor`);
});