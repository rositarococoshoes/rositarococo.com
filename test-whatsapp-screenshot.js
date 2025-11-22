const puppeteer = require('puppeteer');
const path = require('path');

async function captureWhatsAppModal() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 }
  });

  const page = await browser.newPage();

  try {
    console.log('Navigating to the site...');
    await page.goto('http://localhost:8080/astrocline/', {
      waitUntil: 'networkidle2'
    });

    console.log('Waiting for page to load...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // First, let's try to add a product to cart to trigger the modal
    console.log('Looking for add to cart buttons...');

    // Try to find and click an "Add to Cart" button to trigger the modal
    const addToCartButton = await page.$('button[data-model], button[onclick*="handleAddToCart"]');

    if (addToCartButton) {
      console.log('Found Add to Cart button, clicking...');
      await addToCartButton.click();
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      console.log('No Add to Cart button found, trying to trigger modal manually...');
      // Try to trigger the modal directly
      await page.evaluate(() => {
        const modal = document.getElementById('whatsapp-modal');
        if (modal) {
          modal.classList.remove('hidden');
          modal.style.display = 'flex';
        }
      });
    }

    console.log('Taking screenshot of current WhatsApp modal...');
    await page.screenshot({
      path: path.join(__dirname, 'whatsapp-modal-current.png'),
      fullPage: false
    });

    console.log('Screenshot saved as whatsapp-modal-current.png');

    // Wait a bit longer to see the result
    await new Promise(resolve => setTimeout(resolve, 5000));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

captureWhatsAppModal().catch(console.error);