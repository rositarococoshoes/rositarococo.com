const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Configurar viewport para desktop
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('Capturando screenshots del sitio localhost:4327...');

    try {
        // Captura de página principal - Desktop
        await page.goto('http://localhost:4327/', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // Esperar a que cargue todo el contenido
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Captura completa de la página
        await page.screenshot({
            path: 'C:/Users/sflic/Documents/GitHub/rositarococo.com/evidence/desktop-fullpage.png',
            fullPage: true
        });

        // Captura de viewport
        await page.screenshot({
            path: 'C:/Users/sflic/Documents/GitHub/rositarococo.com/evidence/desktop-viewport.png'
        });

        // Captura de versión mobile
        await page.setViewport({ width: 375, height: 812 });
        await page.goto('http://localhost:4327/', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        await new Promise(resolve => setTimeout(resolve, 3000));

        await page.screenshot({
            path: 'C:/Users/sflic/Documents/GitHub/rositarococo.com/evidence/mobile-fullpage.png',
            fullPage: true
        });

        await page.screenshot({
            path: 'C:/Users/sflic/Documents/GitHub/rositarococo.com/evidence/mobile-viewport.png'
        });

        // Capturar sección de productos específicamente
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto('http://localhost:4327/', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Hacer scroll a la sección de productos
        const productsSection = await page.$('.products-grid, .product-grid, .grid, [class*="product"]');
        if (productsSection) {
            await productsSection.screenshot({
                path: 'C:/Users/sflic/Documents/GitHub/rositarococo.com/evidence/products-section.png'
            });
        }

        // Capturar información de la página para análisis
        const pageData = await page.evaluate(() => {
            // Obtener todas las imágenes de productos
            const productImages = Array.from(document.querySelectorAll('img[src*="product"], img[src*="modelo"], img[alt*="modelo"], img[alt*="bota"], img[alt*="zapato"]'));

            return {
                title: document.title,
                url: window.location.href,
                productImages: productImages.map(img => ({
                    src: img.src,
                    alt: img.alt,
                    width: img.width,
                    height: img.height,
                    loaded: img.complete && img.naturalHeight > 0
                })),
                totalImages: document.querySelectorAll('img').length,
                brokenImages: Array.from(document.querySelectorAll('img')).filter(img => !img.complete || img.naturalHeight === 0).length
            };
        });

        // Guardar información para análisis
        fs.writeFileSync(
            'C:/Users/sflic/Documents/GitHub/rositarococo.com/evidence/page-analysis.json',
            JSON.stringify(pageData, null, 2)
        );

        console.log('✓ Screenshots capturados exitosamente');
        console.log('✓ Análisis de página guardado');

    } catch (error) {
        console.error('Error al capturar screenshots:', error);
    } finally {
        await browser.close();
    }
}

// Crear directorio de evidencia si no existe
const evidenceDir = 'C:/Users/sflic/Documents/GitHub/rositarococo.com/evidence';
if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
}

captureScreenshots();