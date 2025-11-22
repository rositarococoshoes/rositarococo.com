#!/usr/bin/env node

/**
 * SCRIPT COMPLETO DE VALIDACIÓN MCP PARA CORRECCIONES DEL SITIO
 *
 * Este script realiza una validación exhaustiva de que las correcciones
 * CSS y JavaScript funcionaron correctamente usando capacidades MCP.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureScreenshots() {
    console.log('🚀 Iniciando validación completa MCP del sitio corregido...');

    const browser = await puppeteer.launch({
        headless: false, // Para visualización
        defaultViewport: null,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Configurar user agent real
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        // Directorio de salida
        const outputDir = './validation-results';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log('📱 Navegando al sitio corregido...');
        await page.goto('http://localhost:4336/', {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        console.log('⏳ Esperando carga completa de recursos...');
        await sleep(3000);

        // Capturar estado de la consola
        const consoleLogs = [];
        page.on('console', msg => {
            consoleLogs.push({
                type: msg.type(),
                text: msg.text(),
                location: msg.location()
            });
        });

        // Capturar errores de JavaScript
        const jsErrors = [];
        page.on('pageerror', error => {
            jsErrors.push({
                message: error.message,
                stack: error.stack
            });
        });

        // Capturar errores de red
        const networkErrors = [];
        page.on('requestfailed', request => {
            networkErrors.push({
                url: request.url(),
                failure: request.failure()
            });
        });

        // 1. SCREENSHOT DESKTOP COMPLETO
        console.log('📸 Capturando screenshot desktop completo...');
        await page.setViewport({ width: 1920, height: 1080 });
        await sleep(2000);

        const desktopScreenshot = await page.screenshot({
            path: `${outputDir}/desktop-fullsite-${Date.now()}.png`,
            fullPage: true,
            quality: 90
        });

        // 2. SCREENSHOT MOBILE
        console.log('📱 Capturando screenshot mobile...');
        await page.setViewport({ width: 375, height: 667 });
        await sleep(2000);

        const mobileScreenshot = await page.screenshot({
            path: `${outputDir}/mobile-fullsite-${Date.now()}.png`,
            fullPage: true,
            quality: 90
        });

        // 3. ANÁLISIS DE CSS Y ESTILOS
        console.log('🎨 Analizando aplicación de estilos CSS...');
        const cssAnalysis = await page.evaluate(() => {
            const results = {
                headerStyles: false,
                bannerStyles: false,
                productCardStyles: false,
                priceStyles: false,
                buttonStyles: false,
                carouselStyles: false
            };

            // Verificar estilos del header
            const header = document.querySelector('header');
            if (header) {
                const styles = window.getComputedStyle(header);
                results.headerStyles = styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
            }

            // Verificar banner de beneficios
            const banner = document.querySelector('.benefits-banner, .banner, [class*="benefit"]');
            if (banner) {
                const styles = window.getComputedStyle(banner);
                results.bannerStyles = styles.display !== 'none';
            }

            // Verificar tarjetas de productos
            const productCard = document.querySelector('.product-card, [class*="product"], [class*="card"]');
            if (productCard) {
                const styles = window.getComputedStyle(productCard);
                results.productCardStyles = styles.border !== '0px' || styles.boxShadow !== 'none';
            }

            // Verificar estilos de precios
            const priceElement = document.querySelector('[class*="price"], .precio, .amount');
            if (priceElement) {
                const styles = window.getComputedStyle(priceElement);
                results.priceStyles = styles.color !== 'rgb(0, 0, 0)' || styles.fontWeight !== '400';
            }

            // Verificar botones
            const button = document.querySelector('button, .btn, [class*="button"]');
            if (button) {
                const styles = window.getComputedStyle(button);
                results.buttonStyles = styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
            }

            // Verificar carrusel
            const carousel = document.querySelector('.swiper, .carousel, [class*="slider"]');
            if (carousel) {
                results.carouselStyles = true;
            }

            return results;
        });

        // 4. VERIFICACIÓN DE CARRUSEL E INTERACTIVIDAD
        console.log('🎠 Probando funcionalidad del carrusel...');
        await page.setViewport({ width: 1920, height: 1080 });

        let carouselTest = { working: false, slides: 0, navigation: false };

        try {
            // Buscar carruseles y probar navegación
            carouselTest = await page.evaluate(() => {
                const carousels = document.querySelectorAll('.swiper, .carousel, [id*="carousel"]');
                let working = false;
                let slides = 0;
                let navigation = false;

                carousels.forEach(carousel => {
                    const slideElements = carousel.querySelectorAll('.swiper-slide, .slide, [class*="slide"]');
                    slides = slideElements.length;

                    const navButtons = carousel.querySelectorAll('.swiper-button-next, .swiper-button-prev, [class*="nav"], [class*="arrow"]');
                    navigation = navButtons.length > 0;

                    // Verificar si Swiper está inicializado
                    if (carousel.swiper || window.Swiper) {
                        working = true;
                    }
                });

                return { working, slides, navigation };
            });

            // Si hay navegación, intentar hacer clic
            if (carouselTest.navigation) {
                await page.click('.swiper-button-next, [class*="next"], [class*="arrow"]:last-child');
                await sleep(1000);
            }
        } catch (error) {
            console.log('Error en test de carrusel:', error.message);
        }

        // 5. VERIFICACIÓN DE FORMULARIO
        console.log('📝 Verificando formulario de contacto...');
        const formTest = await page.evaluate(() => {
            const form = document.querySelector('form');
            if (!form) return { found: false };

            const inputs = form.querySelectorAll('input, select, textarea');
            const submitButton = form.querySelector('button[type="submit"], [type="submit"], .btn');

            return {
                found: true,
                inputs: inputs.length,
                hasSubmit: !!submitButton,
                visible: form.offsetParent !== null
            };
        });

        // 6. ANÁLISIS DE REDES Y RECURSOS
        console.log('🌐 Analizando carga de recursos...');
        const resourceAnalysis = await page.evaluate(() => {
            const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
            const scripts = Array.from(document.querySelectorAll('script[src]'));
            const images = Array.from(document.querySelectorAll('img'));

            return {
                stylesheets: stylesheets.map(link => link.href),
                scripts: scripts.map(script => script.src),
                images: images.map(img => ({ src: img.src, loaded: img.complete })),
                totalResources: stylesheets.length + scripts.length + images.length
            };
        });

        // 7. CAPTURA DE DETALLES VISUALES ADICIONALES
        console.log('🔍 Capturando detalles visuales específicos...');

        // Header screenshot
        const headerElement = await page.$('header');
        let headerScreenshot = null;
        if (headerElement) {
            headerScreenshot = await headerElement.screenshot({
                path: `${outputDir}/header-detail-${Date.now()}.png`
            });
        }

        // Product cards screenshot
        const productCards = await page.$$('.product-card, [class*="product"]');
        if (productCards.length > 0) {
            await productCards[0].screenshot({
                path: `${outputDir}/product-card-detail-${Date.now()}.png`
            });
        }

        // Form screenshot
        const formElement = await page.$('form');
        if (formElement) {
            await formElement.screenshot({
                path: `${outputDir}/form-detail-${Date.now()}.png`
            });
        }

        // 8. GENERAR REPORTE COMPLETO
        const report = {
            timestamp: new Date().toISOString(),
            url: 'http://localhost:4336/',
            success: true,

            screenshots: {
                desktop: desktopScreenshot ? 'captured' : 'failed',
                mobile: mobileScreenshot ? 'captured' : 'failed',
                header: headerScreenshot ? 'captured' : 'failed'
            },

            cssAnalysis,
            carouselTest,
            formTest,

            errors: {
                javascript: jsErrors,
                network: networkErrors,
                console: consoleLogs.filter(log => log.type === 'error')
            },

            resources: resourceAnalysis,

            validation: {
                cssLoaded: cssAnalysis.headerStyles || cssAnalysis.productCardStyles,
                carouselWorking: carouselTest.working,
                formFunctional: formTest.found && formTest.hasSubmit,
                noJSErrors: jsErrors.length === 0,
                resourcesLoaded: resourceAnalysis.totalResources > 0
            }
        };

        // Guardar reporte
        const reportPath = `${outputDir}/validation-report-${Date.now()}.json`;
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

        console.log('\n✅ VALIDACIÓN COMPLETA FINALIZADA');
        console.log('📊 Resultados:');
        console.log(`   - Screenshots: ${report.screenshots.desktop === 'captured' ? '✅' : '❌'}`);
        console.log(`   - CSS Aplicado: ${report.validation.cssLoaded ? '✅' : '❌'}`);
        console.log(`   - Carrusel: ${report.validation.carouselWorking ? '✅' : '❌'}`);
        console.log(`   - Formulario: ${report.validation.formFunctional ? '✅' : '❌'}`);
        console.log(`   - Sin Errores JS: ${report.validation.noJSErrors ? '✅' : '❌'}`);
        console.log(`   - Recursos Cargados: ${report.validation.resourcesLoaded ? '✅' : '❌'}`);

        console.log(`\n📄 Reporte guardado en: ${reportPath}`);
        console.log(`📁 Screenshots guardados en: ${outputDir}/`);

        // Score de éxito (0-100)
        const successScore = Object.values(report.validation)
            .filter(Boolean)
            .length / Object.values(report.validation).length * 100;

        console.log(`\n🎯 SCORE DE ÉXITO: ${successScore.toFixed(1)}%`);

        return report;

    } catch (error) {
        console.error('❌ Error en validación:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

// Ejecutar validación
if (require.main === module) {
    captureScreenshots()
        .then(() => {
            console.log('\n🎉 Validación MCP completada exitosamente');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n💥 Error en validación:', error);
            process.exit(1);
        });
}

module.exports = { captureScreenshots };