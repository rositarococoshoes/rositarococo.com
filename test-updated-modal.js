const puppeteer = require('puppeteer');
const path = require('path');

async function testUpdatedModal() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 }
  });

  const page = await browser.newPage();

  try {
    console.log('Navigating to the updated site...');
    await page.goto('http://localhost:8080/astrocline/', {
      waitUntil: 'networkidle2'
    });

    console.log('Waiting for page to load...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // First, let's try to add a product to cart to trigger the modal
    console.log('Looking for add to cart buttons...');

    // Try to find and click an "Add to Cart" button to trigger the modal
    const addToCartButton = await page.$('button[data-model], button[onclick*="handleAddToCart"]');

    if (addToCartButton) {
      console.log('Found Add to Cart button, clicking...');
      await addToCartButton.click();
      await new Promise(resolve => setTimeout(resolve, 3000));
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

    console.log('Taking screenshot of updated WhatsApp modal...');
    await page.screenshot({
      path: path.join(__dirname, 'whatsapp-modal-updated.png'),
      fullPage: false
    });

    console.log('Screenshot saved as whatsapp-modal-updated.png');

    // Check if the modal content has been updated
    const modalContent = await page.evaluate(() => {
      const modal = document.getElementById('whatsapp-modal');
      if (!modal) return null;

      const title = modal.querySelector('h3')?.textContent;
      const subtitle = modal.querySelector('p.text-green-100')?.textContent;
      const bodyText = modal.querySelector('p.text-gray-700')?.textContent;
      const buttonText = modal.querySelector('button[type="submit"]')?.textContent.trim();

      return { title, subtitle, bodyText, buttonText };
    });

    console.log('Modal content verification:');
    console.log('Title:', modalContent?.title);
    console.log('Subtitle:', modalContent?.subtitle);
    console.log('Body text:', modalContent?.bodyText);
    console.log('Button text:', modalContent?.buttonText);

    // Wait a bit longer to see the result
    await new Promise(resolve => setTimeout(resolve, 5000));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

testUpdatedModal().catch(console.error);