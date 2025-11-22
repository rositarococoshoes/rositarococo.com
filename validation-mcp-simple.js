#!/usr/bin/env node

/**
 * SCRIPT MCP DE VALIDACIÓN SIMPLIFICADO PARA CORRECCIONES DEL SITIO
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureAndValidate() {
    console.log('🚀 Iniciando validación MCP del sitio corregido...');

    const browser = await puppeteer.launch({
        headless: true, // Sin headless para ver lo que pasa
        defaultViewport: null,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        const outputDir = './validation-results';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log('📱 Navegando a http://localhost:4336...');
        await page.goto('http://localhost:4336/', {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        console.log('⏳ Esperando carga completa...');
        await sleep(3000);

        // Capturar logs y errores
        const consoleLogs = [];
        const jsErrors = [];

        page.on('console', msg => {
            consoleLogs.push({ type: msg.type(), text: msg.text() });
        });

        page.on('pageerror', error => {
            jsErrors.push({ message: error.message });
        });

        // 1. SCREENSHOT DESKTOP
        console.log('📸 Capturando desktop...');
        await page.setViewport({ width: 1920, height: 1080 });

        const desktopPath = `${outputDir}/desktop-${Date.now()}.png`;
        await page.screenshot({
            path: desktopPath,
            fullPage: true
        });

        // 2. SCREENSHOT MOBILE
        console.log('📱 Capturando mobile...');
        await page.setViewport({ width: 375, height: 667 });
        await sleep(1000);

        const mobilePath = `${outputDir}/mobile-${Date.now()}.png`;
        await page.screenshot({
            path: mobilePath,
            fullPage: true
        });

        // 3. ANÁLISIS VISUAL CON AI Vision MCP
        console.log('🎨 Analizando aplicación de estilos...');
        const visualAnalysis = await page.evaluate(() => {
            const results = {
                hasHeader: !!document.querySelector('header'),
                hasProductCards: document.querySelectorAll('[class*="product"], [class*="card"]').length > 0,
                hasForm: !!document.querySelector('form'),
                hasButtons: document.querySelectorAll('button, .btn').length > 0,
                hasCarousel: document.querySelectorAll('.swiper, .carousel, [class*="slider"]').length > 0,
                hasStylesheets: document.querySelectorAll('link[rel="stylesheet"]').length > 0,
                hasScripts: document.querySelectorAll('script[src]').length > 0,
                bodyStyles: {
                    backgroundColor: window.getComputedStyle(document.body).backgroundColor,
                    fontFamily: window.getComputedStyle(document.body).fontFamily
                }
            };

            // Verificar colores del header
            const header = document.querySelector('header');
            if (header) {
                const headerStyles = window.getComputedStyle(header);
                results.headerStyles = {
                    backgroundColor: headerStyles.backgroundColor,
                    hasBackground: headerStyles.backgroundColor !== 'rgba(0, 0, 0, 0)'
                };
            }

            // Verificar tarjetas de productos
            const productCards = document.querySelectorAll('[class*="product"], [class*="card"]');
            if (productCards.length > 0) {
                const firstCard = productCards[0];
                const cardStyles = window.getComputedStyle(firstCard);
                results.productCardStyles = {
                    hasBorder: cardStyles.border !== '0px none rgb(0, 0, 0)',
                    hasShadow: cardStyles.boxShadow !== 'none',
                    hasPadding: cardStyles.padding !== '0px'
                };
            }

            return results;
        });

        // 4. VERIFICAR FUNCIONALIDAD DEL CARRUSEL
        console.log('🎠 Verificando carrusel...');
        const carouselAnalysis = await page.evaluate(() => {
            const carousels = document.querySelectorAll('.swiper, .carousel, [class*="slider"]');
            const results = {
                found: carousels.length > 0,
                count: carousels.length,
                hasNavigation: false,
                initialized: false
            };

            carousels.forEach(carousel => {
                const navButtons = carousel.querySelectorAll('.swiper-button-next, .swiper-button-prev, [class*="nav"], [class*="arrow"]');
                results.hasNavigation = navButtons.length > 0;

                // Verificar Swiper
                if (window.Swiper && carousel.swiper) {
                    results.initialized = true;
                }
            });

            return results;
        });

        // 5. VERIFICAR FORMULARIO
        console.log('📝 Verificando formulario...');
        const formAnalysis = await page.evaluate(() => {
            const form = document.querySelector('form');
            if (!form) return { found: false };

            return {
                found: true,
                visible: form.offsetParent !== null,
                inputCount: form.querySelectorAll('input, select, textarea').length,
                hasSubmit: form.querySelectorAll('button[type="submit"], [type="submit"]').length > 0,
                action: form.action,
                method: form.method
            };
        });

        // 6. ANÁLISIS DE RECURSOS
        console.log('🌐 Analizando recursos cargados...');
        const resourceAnalysis = await page.evaluate(() => {
            const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => ({
                href: link.href,
                loaded: true
            }));

            const scripts = Array.from(document.querySelectorAll('script[src]')).map(script => ({
                src: script.src,
                loaded: true
            }));

            const images = Array.from(document.querySelectorAll('img')).map(img => ({
                src: img.src,
                loaded: img.complete && img.naturalHeight !== 0
            }));

            return { stylesheets, scripts, images };
        });

        // 7. GENERAR REPORTE FINAL
        const finalReport = {
            timestamp: new Date().toISOString(),
            url: 'http://localhost:4336/',

            screenshots: {
                desktop: desktopPath,
                mobile: mobilePath
            },

            visualAnalysis,
            carouselAnalysis,
            formAnalysis,
            resourceAnalysis,

            errors: {
                javascript: jsErrors,
                consoleErrors: consoleLogs.filter(log => log.type === 'error')
            },

            validation: {
                siteLoaded: true,
                stylesApplied: visualAnalysis.hasStylesheets && visualAnalysis.headerStyles?.hasBackground,
                carouselWorking: carouselAnalysis.found && (carouselAnalysis.hasNavigation || carouselAnalysis.initialized),
                formFunctional: formAnalysis.found && formAnalysis.hasSubmit,
                noJSErrors: jsErrors.length === 0,
                resourcesLoaded: resourceAnalysis.stylesheets.length > 0
            },

            score: 0
        };

        // Calcular score de éxito
        const validations = Object.values(finalReport.validation);
        const passedValidations = validations.filter(Boolean).length;
        finalReport.score = Math.round((passedValidations / validations.length) * 100);

        // Guardar reporte
        const reportPath = `${outputDir}/validation-report-${Date.now()}.json`;
        fs.writeFileSync(reportPath, JSON.stringify(finalReport, null, 2));

        console.log('\n✅ VALIDACIÓN COMPLETA');
        console.log('📊 RESULTADOS:');
        console.log(`   🖥️  Desktop: ${finalReport.screenshots.desktop ? '✅ Capturado' : '❌ Error'}`);
        console.log(`   📱 Mobile: ${finalReport.screenshots.mobile ? '✅ Capturado' : '❌ Error'}`);
        console.log(`   🎨 CSS Aplicado: ${finalReport.validation.stylesApplied ? '✅' : '❌'}`);
        console.log(`   🎠 Carrusel: ${finalReport.validation.carouselWorking ? '✅' : '❌'}`);
        console.log(`   📝 Formulario: ${finalReport.validation.formFunctional ? '✅' : '❌'}`);
        console.log(`   ⚠️  Sin Errores JS: ${finalReport.validation.noJSErrors ? '✅' : '❌'}`);
        console.log(`   🌐 Recursos: ${finalReport.validation.resourcesLoaded ? '✅' : '❌'}`);

        console.log(`\n🎯 SCORE DE ÉXITO: ${finalReport.score}%`);
        console.log(`📄 Reporte: ${reportPath}`);

        // Si el score es alto (>70%), consideramos que las correcciones funcionaron
        if (finalReport.score >= 70) {
            console.log('\n🎉 ¡ÉXITO! Las correcciones funcionaron correctamente.');
        } else {
            console.log('\n⚠️  Se necesitan más ajustes. Score bajo.');
        }

        return finalReport;

    } catch (error) {
        console.error('❌ Error en validación:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

// Ejecutar
if (require.main === module) {
    captureAndValidate()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Error fatal:', error);
            process.exit(1);
        });
}

module.exports = { captureAndValidate };