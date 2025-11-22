const puppeteer = require('puppeteer');
const fs = require('fs');

async function detailedAnalysis() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('Realizando análisis detallado de problemas visuales...');

    try {
        await page.goto('http://localhost:4327/', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        await new Promise(resolve => setTimeout(resolve, 5000));

        // Análisis de estado de imágenes
        const imageAnalysis = await page.evaluate(() => {
            const allImages = Array.from(document.querySelectorAll('img'));
            const analysis = {
                total: allImages.length,
                loaded: 0,
                broken: 0,
                missing: 0,
                details: []
            };

            allImages.forEach((img, index) => {
                const isBroken = !img.complete || img.naturalHeight === 0;
                const src = img.src;
                const alt = img.alt || 'No alt text';

                if (isBroken) {
                    analysis.broken++;
                } else if (img.complete && img.naturalHeight > 0) {
                    analysis.loaded++;
                }

                analysis.details.push({
                    index,
                    src,
                    alt,
                    loaded: !isBroken,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    displayWidth: img.width,
                    displayHeight: img.height
                });
            });

            return analysis;
        });

        // Capturar screenshots de productos individuales
        const productCards = await page.$$('.card');
        console.log(`Encontradas ${productCards.length} tarjetas de producto`);

        // Screenshot de cada tarjeta de producto
        for (let i = 0; i < Math.min(productCards.length, 6); i++) {
            try {
                await productCards[i].screenshot({
                    path: `C:/Users/sflic/Documents/GitHub/rositarococo.com/evidence/product-card-${i + 1}.png`
                });
            } catch (error) {
                console.log(`No se pudo capturar la tarjeta ${i + 1}:`, error.message);
            }
        }

        // Capturar estado de la red para ver qué imágenes están fallando
        const networkLogs = [];
        page.on('response', response => {
            if (response.request().resourceType() === 'image') {
                networkLogs.push({
                    url: response.url(),
                    status: response.status(),
                    ok: response.ok()
                });
            }
        });

        // Recargar la página para capturar logs de red
        await page.goto('http://localhost:4327/', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        await new Promise(resolve => setTimeout(resolve, 3000));

        // Análisis de CSS y layout
        const layoutAnalysis = await page.evaluate(() => {
            const problematicElements = [];

            // Buscar elementos con problemas visuales comunes
            const images = document.querySelectorAll('img');
            images.forEach((img, index) => {
                if (!img.complete || img.naturalHeight === 0) {
                    problematicElements.push({
                        type: 'broken_image',
                        element: img.outerHTML.substring(0, 200),
                        src: img.src,
                        alt: img.alt,
                        index
                    });
                }
            });

            // Buscar elementos con estilos problemáticos
            const elementsWithEmptySrc = document.querySelectorAll('img[src=""], img[src="#"]');
            elementsWithEmptySrc.forEach((el, index) => {
                problematicElements.push({
                    type: 'empty_src',
                    element: el.outerHTML.substring(0, 200),
                    index
                });
            });

            return {
                problematicElements,
                totalImgElements: images.length,
                brokenImgCount: Array.from(images).filter(img => !img.complete || img.naturalHeight === 0).length
            };
        });

        // Guardar resultados del análisis
        const analysisResult = {
            timestamp: new Date().toISOString(),
            imageAnalysis,
            networkLogs,
            layoutAnalysis
        };

        fs.writeFileSync(
            'C:/Users/sflic/Documents/GitHub/rositarococo.com/evidence/detailed-analysis.json',
            JSON.stringify(analysisResult, null, 2)
        );

        console.log('✓ Análisis detallado completado');
        console.log(`Imágenes rotas: ${imageAnalysis.broken}/${imageAnalysis.total}`);
        console.log(`Red de imágenes fallidas: ${networkLogs.filter(log => !log.ok).length}`);

    } catch (error) {
        console.error('Error en análisis detallado:', error);
    } finally {
        await browser.close();
    }
}

detailedAnalysis();