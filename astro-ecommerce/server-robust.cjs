const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces

console.log('='.repeat(50));
console.log('🚀 INICIANDO SERVIDOR ROBUSTO');
console.log('='.repeat(50));
console.log(`📍 Puerto: ${PORT}`);
console.log(`🌐 Host: ${HOST}`);
console.log(`📂 Directorio: ${__dirname}`);
console.log('='.repeat(50));

const server = http.createServer((req, res) => {
    const timestamp = new Date().toISOString();
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    console.log(`[${timestamp}] ${req.method} ${req.url} desde ${clientIP}`);
    
    // Configurar CORS para todos los orígenes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
    
    // Manejar preflight OPTIONS
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Servir archivos estáticos principales
    if (req.url === '/' || req.url === '/index.html' || req.url === '/home') {
        const filePath = path.join(__dirname, 'src', 'pages', 'home.astro');
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`[${timestamp}] Error leyendo home.astro:`, err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor');
                return;
            }
            
            res.writeHead(200, { 
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-cache'
            });
            res.end(data);
            console.log(`[${timestamp}] ✅ Página principal servida`);
        });
    }
    // Servir imágenes de productos
    else if (req.url && req.url.startsWith('/guillerminafotos/')) {
        const imagePath = path.join(__dirname, 'public', req.url);
        
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                console.error(`[${timestamp}] Error leyendo imagen ${req.url}:`, err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Imagen no encontrada');
                return;
            }
            
            const ext = path.extname(imagePath).toLowerCase();
            const contentType = ext === '.webp' ? 'image/webp' : 'image/jpeg';
            
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600'
            });
            res.end(data);
            console.log(`[${timestamp}] ✅ Imagen servida: ${req.url}`);
        });
    }
    // Servir otros recursos
    else if (req.url && req.url.startsWith('/src/')) {
        const filePath = path.join(__dirname, req.url);
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Recurso no encontrado');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': getContentType(filePath) });
            res.end(data);
        });
    }
    // 404 para todo lo demás
    else {
        console.log(`[${timestamp}] ❌ 404 - ${req.method} ${req.url}`);
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>404 - Página no encontrada</title></head>
            <body>
                <h1>404 - Página no encontrada</h1>
                <p>La página ${req.url} no existe.</p>
                <a href="/">Ir al inicio</a>
            </body>
            </html>
        `);
    }
});

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const types = {
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.astro': 'text/html'
    };
    return types[ext] || 'text/plain';
}

// Manejo de errores del servidor
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Error: El puerto ${PORT} ya está en uso`);
        console.error('🔧 Solución: Cierra otras aplicaciones usando el puerto 3000');
        console.error('📋 O usa un puerto diferente: node server-robust.cjs 3001');
    } else {
        console.error(`❌ Error del servidor:`, error);
    }
});

// Servidor escuchando
server.listen(PORT, HOST, () => {
    console.log('='.repeat(50));
    console.log('✅ SERVIDOR INICIADO CORRECTAMENTE');
    console.log('='.repeat(50));
    console.log(`🌐 URL local: http://localhost:${PORT}`);
    console.log(`🌐 URL red: http://0.0.0.0:${PORT}`);
    console.log('='.repeat(50));
    console.log('📋 Presiona Ctrl+C para detener el servidor');
    console.log('='.repeat(50));
});

// Manejo de cierre gracioso
process.on('SIGINT', () => {
    console.log('\n🛑 Deteniendo servidor...');
    server.close(() => {
        console.log('✅ Servidor detenido correctamente');
        process.exit(0);
    });
});

console.log('🔄 Esperando conexiónes...');
