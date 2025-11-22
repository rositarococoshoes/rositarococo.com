const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureAdditionalScreenshots() {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: { width: 1920, height: 1080 }
    });

    const page = await browser.newPage();

    // Navigate to the page
    await page.goto('http://localhost:8000/index.html', {
        waitUntil: 'networkidle2',
        timeout: 30000
    });

    // Wait for the page to fully load
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        console.log('Capturing additional screenshots...');

        // Full page desktop context
        await page.setViewport({ width: 1920, height: 1080 });
        await page.screenshot({
            path: 'evidence/screenshots/original-fullpage-desktop.png',
            fullPage: true
        });
        console.log('✓ Full page desktop captured');

        // Full page mobile context
        await page.setViewport({ width: 375, height: 812 });
        await page.screenshot({
            path: 'evidence/screenshots/original-fullpage-mobile.png',
            fullPage: true
        });
        console.log('✓ Full page mobile captured');

        // Try to capture WhatsApp widget if present
        await page.setViewport({ width: 1920, height: 1080 });
        const whatsappWidget = await page.$('[class*="whatsapp"], [id*="whatsapp"], .whatsapp-widget');
        if (whatsappWidget) {
            await whatsappWidget.screenshot({
                path: 'evidence/screenshots/original-whatsapp-widget.png',
                fullPage: false
            });
            console.log('✓ WhatsApp widget captured');
        }

        // Footer component
        const footer = await page.$('footer, .footer, [class*="footer"]');
        if (footer) {
            await footer.screenshot({
                path: 'evidence/screenshots/original-footer.png',
                fullPage: false
            });
            console.log('✓ Footer captured');
        }

        // Try to capture testimonials if present
        const testimonials = await page.$('.testimonials, .reviews, [class*="testimonial"], [class*="review"]');
        if (testimonials) {
            await testimonials.screenshot({
                path: 'evidence/screenshots/original-testimonials.png',
                fullPage: false
            });
            console.log('✓ Testimonials captured');
        }

    } catch (error) {
        console.error('Error during additional screenshot capture:', error);
    } finally {
        await browser.close();
    }

    console.log('\nAdditional screenshot capture completed!');
}

// Run the function
captureAdditionalScreenshots().catch(console.error);