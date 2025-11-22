const puppeteer = require('puppeteer');
const path = require('path');

async function testWhatsAppModal() {
    let browser;
    try {
        console.log('Launching browser...');
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: { width: 1920, height: 1080 },
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Navigate to the test site
        console.log('Navigating to http://localhost:8080/astrocline/...');
        await page.goto('http://localhost:8080/astrocline/', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // Wait for the page to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Find and click the first "Agregar al Carrito" button
        console.log('Looking for "Agregar al Carrito" button...');
        await page.waitForSelector('.add-to-cart-btn', { timeout: 10000 });

        // Get the first add to cart button
        const addToCartBtn = await page.$('.add-to-cart-btn');
        if (!addToCartBtn) {
            throw new Error('Add to cart button not found');
        }

        // Select a size first (required for most product cards)
        console.log('Selecting a size...');
        const sizeSelect = await page.$('#talle-negras');
        if (sizeSelect) {
            await sizeSelect.select('36'); // Select size 36
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Click the add to cart button to trigger the modal
        console.log('Clicking "Agregar al Carrito" button...');
        await addToCartBtn.click();

        // Wait for modal to appear
        console.log('Waiting for WhatsApp modal to appear...');
        await page.waitForSelector('#whatsapp-modal', { timeout: 10000 });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Allow animation to complete

        // Check if modal is visible
        const modalVisible = await page.$eval('#whatsapp-modal', el =>
            el.style.display !== 'none' && !el.classList.contains('hidden')
        );

        if (!modalVisible) {
            throw new Error('WhatsApp modal is not visible');
        }

        console.log('WhatsApp modal is now visible!');

        // Take a screenshot of the modal
        console.log('Taking screenshot...');
        await page.screenshot({
            path: 'whatsapp-modal-test.png',
            fullPage: false
        });

        // Test the input field
        console.log('Testing WhatsApp input field...');
        const whatsappInput = await page.$('#whatsapp-input');
        if (whatsappInput) {
            // Check placeholder
            const placeholder = await page.$eval('#whatsapp-input', el => el.placeholder);
            console.log('Input placeholder:', placeholder);

            // Check maxlength
            const maxlength = await page.$eval('#whatsapp-input', el => el.maxLength);
            console.log('Input maxlength:', maxlength);

            // Test typing a number
            await whatsappInput.type('1112345678');
            await new Promise(resolve => setTimeout(resolve, 500));

            const inputValue = await page.$eval('#whatsapp-input', el => el.value);
            console.log('Input value after typing:', inputValue);
        }

        // Check if checkbox exists (should not exist)
        const checkboxExists = await page.$('#whatsapp-modal input[type="checkbox"]') !== null;
        console.log('Checkbox exists in modal:', checkboxExists);

        // Check "Ahora no" button styling
        const ahoraNoBtn = await page.$eval('button[onclick="closeWhatsAppModal()"]:last-child', el => {
            return {
                text: el.textContent.trim(),
                hasUnderline: window.getComputedStyle(el).textDecoration.includes('underline'),
                isFullWidth: window.getComputedStyle(el).width === '100%' || window.getComputedStyle(el).width.includes('100%')
            };
        });
        console.log('"Ahora no" button details:', ahoraNoBtn);

        // Check benefits text
        const benefitsText = await page.$eval('#whatsapp-modal ul li:first-child', el => el.textContent);
        console.log('Benefits text:', benefitsText);

        console.log('Test completed successfully!');
        console.log('Screenshot saved as: whatsapp-modal-test.png');

        // Keep browser open for manual inspection
        console.log('Browser will remain open for 30 seconds for manual inspection...');
        await new Promise(resolve => setTimeout(resolve, 30000));

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Check if Puppeteer is available
try {
    require('puppeteer');
    testWhatsAppModal();
} catch (error) {
    console.log('Puppeteer not found. Installing...');
    const { execSync } = require('child_process');
    execSync('npm install puppeteer', { stdio: 'inherit' });
    testWhatsAppModal();
}