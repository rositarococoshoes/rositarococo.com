const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureScreenshots() {
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

    const screenshots = [];

    try {
        console.log('Starting screenshot capture...');

        // 1. Header Component Screenshots
        console.log('Capturing Header components...');

        // Full header - Desktop view
        await page.setViewport({ width: 1920, height: 1080 });
        const headerElement = await page.$('header');
        if (headerElement) {
            await headerElement.screenshot({
                path: 'evidence/screenshots/original-header-desktop.png',
                fullPage: false
            });
            screenshots.push('original-header-desktop.png');
            console.log('✓ Header desktop captured');
        }

        // Mobile header view
        await page.setViewport({ width: 375, height: 812 });
        const mobileHeader = await page.$('header');
        if (mobileHeader) {
            await mobileHeader.screenshot({
                path: 'evidence/screenshots/original-header-mobile.png',
                fullPage: false
            });
            screenshots.push('original-header-mobile.png');
            console.log('✓ Header mobile captured');
        }

        // Benefits bar details
        await page.setViewport({ width: 1920, height: 1080 });
        const benefitsBar = await page.$('.benefits-bar, .promo-bar, .top-bar, [class*="benefit"], [class*="promo"]');
        if (benefitsBar) {
            await benefitsBar.screenshot({
                path: 'evidence/screenshots/original-benefits-bar.png',
                fullPage: false
            });
            screenshots.push('original-benefits-bar.png');
            console.log('✓ Benefits bar captured');
        }

        // 2. Product Components Screenshots
        console.log('Capturing Product components...');
        await page.setViewport({ width: 1920, height: 1080 });

        // Product cards
        const productCards = await page.$$('.product-card, .product-item, [class*="product"]');
        for (let i = 0; i < Math.min(3, productCards.length); i++) {
            const card = productCards[i];
            if (card) {
                await card.screenshot({
                    path: `evidence/screenshots/original-product-card-${i + 1}.png`,
                    fullPage: false
                });
                screenshots.push(`original-product-card-${i + 1}.png`);
                console.log(`✓ Product card ${i + 1} captured`);
            }
        }

        // Product carousel/slider
        const carousel = await page.$('.swiper-container, .carousel, .slider, .product-carousel, [class*="swiper"], [class*="carousel"], [class*="slider"]');
        if (carousel) {
            await carousel.screenshot({
                path: 'evidence/screenshots/original-product-carousel.png',
                fullPage: false
            });
            screenshots.push('original-product-carousel.png');
            console.log('✓ Product carousel captured');

            // Try to capture multiple carousel states
            for (let i = 0; i < 3; i++) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Try to click next button
                try {
                    const nextButton = await page.$('.swiper-button-next, .carousel-next, .next-btn, [class*="next"]');
                    if (nextButton) {
                        await nextButton.click();
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await carousel.screenshot({
                            path: `evidence/screenshots/original-carousel-slide-${i + 2}.png`,
                            fullPage: false
                        });
                        screenshots.push(`original-carousel-slide-${i + 2}.png`);
                        console.log(`✓ Carousel slide ${i + 2} captured`);
                    }
                } catch (e) {
                    console.log(`Could not advance carousel: ${e.message}`);
                }
            }
        }

        // Size selector interface
        const sizeSelector = await page.$('.size-selector, .size-options, [class*="size"], [data-size]');
        if (sizeSelector) {
            await sizeSelector.screenshot({
                path: 'evidence/screenshots/original-size-selector.png',
                fullPage: false
            });
            screenshots.push('original-size-selector.png');
            console.log('✓ Size selector captured');
        }

        // Add to cart buttons
        const addToCartButtons = await page.$$('button[class*="cart"], button[class*="add"], .add-to-cart, [data-action="add-to-cart"]');
        if (addToCartButtons.length > 0) {
            await addToCartButtons[0].screenshot({
                path: 'evidence/screenshots/original-add-to-cart.png',
                fullPage: false
            });
            screenshots.push('original-add-to-cart.png');
            console.log('✓ Add to cart button captured');
        }

        // Price display components
        const priceElements = await page.$$('.price, [class*="price"], .product-price, [data-price]');
        if (priceElements.length > 0) {
            await priceElements[0].screenshot({
                path: 'evidence/screenshots/original-price-display.png',
                fullPage: false
            });
            screenshots.push('original-price-display.png');
            console.log('✓ Price display captured');
        }

        // 3. Cart Components Screenshots
        console.log('Capturing Cart components...');

        // Mini cart closed state
        await page.setViewport({ width: 1920, height: 1080 });
        const miniCartClosed = await page.$('.mini-cart, .cart-widget, [class*="cart"], .shopping-cart');
        if (miniCartClosed) {
            await miniCartClosed.screenshot({
                path: 'evidence/screenshots/original-minicart-closed.png',
                fullPage: false
            });
            screenshots.push('original-minicart-closed.png');
            console.log('✓ Mini cart closed captured');
        }

        // Try to open mini cart and capture
        try {
            const cartToggle = await page.$('.cart-toggle, .cart-button, [class*="cart"][class*="toggle"], button[aria-label*="cart"]');
            if (cartToggle) {
                await cartToggle.click();
                await new Promise(resolve => setTimeout(resolve, 1000));

                const miniCartOpen = await page.$('.mini-cart.open, .cart-widget.active, [class*="cart"].open, [class*="cart"].active');
                if (miniCartOpen) {
                    await miniCartOpen.screenshot({
                        path: 'evidence/screenshots/original-minicart-open.png',
                        fullPage: false
                    });
                    screenshots.push('original-minicart-open.png');
                    console.log('✓ Mini cart open captured');
                }
            }
        } catch (e) {
            console.log(`Could not open mini cart: ${e.message}`);
        }

        // Checkout buttons
        const checkoutButtons = await page.$$('button[class*="checkout"], .checkout-btn, [data-action="checkout"], a[href*="checkout"]');
        if (checkoutButtons.length > 0) {
            await checkoutButtons[0].screenshot({
                path: 'evidence/screenshots/original-checkout-button.png',
                fullPage: false
            });
            screenshots.push('original-checkout-button.png');
            console.log('✓ Checkout button captured');
        }

        // 4. Form Components Screenshots
        console.log('Capturing Form components...');

        // Contact form fields
        const contactForm = await page.$('form, .contact-form, [class*="form"], [id*="form"]');
        if (contactForm) {
            await contactForm.screenshot({
                path: 'evidence/screenshots/original-contact-form.png',
                fullPage: false
            });
            screenshots.push('original-contact-form.png');
            console.log('✓ Contact form captured');

            // Individual form fields
            const formInputs = await page.$$('input[type="text"], input[type="email"], textarea, select');
            for (let i = 0; i < Math.min(3, formInputs.length); i++) {
                const input = formInputs[i];
                if (input) {
                    await input.screenshot({
                        path: `evidence/screenshots/original-form-field-${i + 1}.png`,
                        fullPage: false
                    });
                    screenshots.push(`original-form-field-${i + 1}.png`);
                    console.log(`✓ Form field ${i + 1} captured`);
                }
            }
        }

        // Submit buttons
        const submitButtons = await page.$$('button[type="submit"], input[type="submit"], .submit-btn, [class*="submit"]');
        if (submitButtons.length > 0) {
            await submitButtons[0].screenshot({
                path: 'evidence/screenshots/original-submit-button.png',
                fullPage: false
            });
            screenshots.push('original-submit-button.png');
            console.log('✓ Submit button captured');
        }

        // Full page screenshots for context
        console.log('Capturing full page context...');

        // Desktop full page
        await page.setViewport({ width: 1920, height: 1080 });
        await page.screenshot({
            path: 'evidence/screenshots/original-fullpage-desktop.png',
            fullPage: true
        });
        screenshots.push('original-fullpage-desktop.png');
        console.log('✓ Full page desktop captured');

        // Mobile full page
        await page.setViewport({ width: 375, height: 812 });
        await page.screenshot({
            path: 'evidence/screenshots/original-fullpage-mobile.png',
            fullPage: true
        });
        screenshots.push('original-fullpage-mobile.png');
        console.log('✓ Full page mobile captured');

    } catch (error) {
        console.error('Error during screenshot capture:', error);
    } finally {
        await browser.close();
    }

    console.log(`\nScreenshot capture completed! ${screenshots.length} screenshots captured.`);
    console.log('Screenshots saved to evidence/screenshots/');

    return screenshots;
}

// Run the function
captureScreenshots().catch(console.error);