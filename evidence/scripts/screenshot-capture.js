/**
 * Screenshot Capture Script for Rosita Rococó E-commerce Analysis
 *
 * This script captures comprehensive screenshots of both e-commerce funnels
 * for visual analysis and migration planning.
 *
 * Requirements:
 * - Puppeteer: npm install puppeteer
 * - Node.js version 14+
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  urls: [
    {
      name: 'previo-pago',
      url: 'http://localhost:8000/index.html',
      title: 'Previo Pago Funnel'
    },
    {
      name: 'contrarreembolso',
      url: 'http://localhost:8000/contrarreembolsonueva.html',
      title: 'Contrarreembolso Funnel'
    }
  ],

  viewports: [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 }
  ],

  screenshots: {
    fullPage: true,
    quality: 90,
    type: 'png'
  },

  outputDir: path.join(__dirname, '../screenshots'),
  delay: 2000 // Wait time for page to load completely
};

/**
 * Create output directory structure
 */
function createDirectoryStructure() {
  const directories = [
    CONFIG.outputDir,
    ...CONFIG.urls.map(url => path.join(CONFIG.outputDir, url.name)),
    ...CONFIG.urls.flatMap(url =>
      CONFIG.viewports.map(viewport =>
        path.join(CONFIG.outputDir, url.name, viewport.name)
      )
    )
  ];

  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
}

/**
 * Capture screenshots for specific sections of a page
 */
async function captureSectionScreenshots(page, url, viewport) {
  const sections = [
    { name: 'header', selector: '.main-header, header', wait: true },
    { name: 'hero', selector: '.hero, .hero-section', wait: false },
    { name: 'products', selector: '.product-grid, .products, .swiper', wait: true },
    { name: 'pricing', selector: '.price-section, .pricing', wait: false },
    { name: 'form', selector: 'form, .checkout-form', wait: true },
    { name: 'cart', selector: '.mini-cart, .cart', wait: false },
    { name: 'footer', selector: 'footer', wait: false }
  ];

  const capturedSections = [];

  for (const section of sections) {
    try {
      // Wait for section if required
      if (section.wait) {
        await page.waitForSelector(section.selector, { timeout: 10000 });
      }

      const element = await page.$(section.selector);
      if (element) {
        const filename = `${url.name}-${section.name}-${viewport.name}.png`;
        const filepath = path.join(CONFIG.outputDir, url.name, viewport.name, filename);

        await element.screenshot({
          path: filepath,
          quality: CONFIG.screenshots.quality
        });

        capturedSections.push({
          section: section.name,
          filename,
          filepath,
          success: true
        });

        console.log(`✅ Captured ${section.name} section for ${url.name} (${viewport.name})`);
      } else {
        console.log(`⚠️  Section not found: ${section.selector} for ${url.name} (${viewport.name})`);
        capturedSections.push({
          section: section.name,
          selector: section.selector,
          success: false,
          error: 'Element not found'
        });
      }
    } catch (error) {
      console.log(`❌ Error capturing ${section.name} section: ${error.message}`);
      capturedSections.push({
        section: section.name,
        selector: section.selector,
        success: false,
        error: error.message
      });
    }
  }

  return capturedSections;
}

/**
 * Capture interactive states (hover, focus, etc.)
 */
async function captureInteractiveStates(page, url, viewport) {
  const interactiveStates = [];

  try {
    // Capture button hover states
    const buttons = await page.$$('button, .btn, [role="button"]');
    for (let i = 0; i < Math.min(buttons.length, 3); i++) {
      try {
        const button = buttons[i];
        await button.hover();
        await page.waitForTimeout(300);

        const filename = `${url.name}-button-hover-${i + 1}-${viewport.name}.png`;
        const filepath = path.join(CONFIG.outputDir, url.name, viewport.name, filename);

        await button.screenshot({
          path: filepath,
          quality: CONFIG.screenshots.quality
        });

        interactiveStates.push({
          type: 'button-hover',
          element: `button-${i + 1}`,
          filename,
          success: true
        });
      } catch (error) {
        console.log(`⚠️  Could not capture button ${i + 1} hover: ${error.message}`);
      }
    }

    // Capture form field focus states
    const formFields = await page.$$('input[type="text"], input[type="email"], input[type="tel"], textarea');
    for (let i = 0; i < Math.min(formFields.length, 3); i++) {
      try {
        const field = formFields[i];
        await field.focus();
        await page.waitForTimeout(300);

        const filename = `${url.name}-form-focus-${i + 1}-${viewport.name}.png`;
        const filepath = path.join(CONFIG.outputDir, url.name, viewport.name, filename);

        await field.screenshot({
          path: filepath,
          quality: CONFIG.screenshots.quality
        });

        interactiveStates.push({
          type: 'form-focus',
          element: `form-field-${i + 1}`,
          filename,
          success: true
        });
      } catch (error) {
        console.log(`⚠️  Could not capture form field ${i + 1} focus: ${error.message}`);
      }
    }

  } catch (error) {
    console.log(`❌ Error capturing interactive states: ${error.message}`);
  }

  return interactiveStates;
}

/**
 * Capture full page screenshots
 */
async function captureFullPage(page, url, viewport) {
  const filename = `${url.name}-full-page-${viewport.name}.png`;
  const filepath = path.join(CONFIG.outputDir, url.name, viewport.name, filename);

  await page.screenshot({
    path: filepath,
    fullPage: CONFIG.screenshots.fullPage,
    quality: CONFIG.screenshots.quality,
    type: CONFIG.screenshots.type
  });

  return {
    type: 'full-page',
    filename,
    filepath,
    success: true
  };
}

/**
 * Generate analysis report
 */
function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: CONFIG.urls.length,
      totalViewports: CONFIG.viewports.length,
      totalScreenshots: results.reduce((acc, result) => acc + result.screenshots.length, 0)
    },
    results: results,
    issues: [],
    recommendations: []
  };

  // Identify issues
  results.forEach(result => {
    result.screenshots.forEach(screenshot => {
      if (!screenshot.success) {
        report.issues.push({
          url: result.url.name,
          viewport: result.viewport.name,
          element: screenshot.section || screenshot.element,
          error: screenshot.error
        });
      }
    });
  });

  // Add recommendations
  if (report.issues.length > 0) {
    report.recommendations.push('Review missing elements and selectors');
  }

  report.recommendations.push('Compare visual consistency between viewports');
  report.recommendations.push('Analyze component hierarchy and spacing');
  report.recommendations.push('Document responsive behavior patterns');

  const reportPath = path.join(__dirname, '../reports/screenshot-analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`📊 Analysis report generated: ${reportPath}`);
  return report;
}

/**
 * Main capture function
 */
async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture process...');

  // Create directory structure
  createDirectoryStructure();

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  });

  const results = [];

  try {
    for (const urlConfig of CONFIG.urls) {
      console.log(`\n📸 Processing: ${urlConfig.title}`);

      for (const viewport of CONFIG.viewports) {
        console.log(`  🖥️  Viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);

        const page = await browser.newPage();
        await page.setViewport(viewport);

        try {
          // Navigate to URL
          await page.goto(urlConfig.url, {
            waitUntil: 'networkidle2',
            timeout: 30000
          });

          // Wait for page to fully load
          await page.waitForTimeout(CONFIG.delay);

          // Disable animations for consistent screenshots
          await page.addStyleTag({
            content: `
              *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-delay: 0.01ms !important;
                transition-duration: 0.01ms !important;
                transition-delay: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            `
          });

          const pageResults = {
            url: urlConfig,
            viewport: viewport,
            screenshots: []
          };

          // Capture full page
          console.log(`    📄 Capturing full page...`);
          const fullPageResult = await captureFullPage(page, urlConfig, viewport);
          pageResults.screenshots.push(fullPageResult);

          // Capture sections
          console.log(`    🎯 Capturing page sections...`);
          const sectionResults = await captureSectionScreenshots(page, urlConfig, viewport);
          pageResults.screenshots.push(...sectionResults);

          // Capture interactive states (only on desktop)
          if (viewport.name === 'desktop') {
            console.log(`    🖱️  Capturing interactive states...`);
            const interactiveResults = await captureInteractiveStates(page, urlConfig, viewport);
            pageResults.screenshots.push(...interactiveResults);
          }

          results.push(pageResults);

          console.log(`    ✅ Completed ${pageResults.screenshots.filter(s => s.success).length} screenshots`);

        } catch (error) {
          console.log(`    ❌ Error processing ${urlConfig.name} on ${viewport.name}: ${error.message}`);

          results.push({
            url: urlConfig,
            viewport: viewport,
            screenshots: [],
            error: error.message
          });
        } finally {
          await page.close();
        }
      }
    }

    // Generate analysis report
    const report = generateReport(results);

    console.log('\n🎉 Screenshot capture completed!');
    console.log(`📊 Total screenshots captured: ${report.summary.totalScreenshots}`);
    console.log(`📁 Screenshots saved to: ${CONFIG.outputDir}`);

  } catch (error) {
    console.error('❌ Fatal error during screenshot capture:', error);
  } finally {
    await browser.close();
  }
}

/**
 * Check if localhost server is running
 */
async function checkServer() {
  const { default: axios } = await import('axios');

  try {
    await axios.get('http://localhost:8000', { timeout: 5000 });
    return true;
  } catch (error) {
    console.log('❌ Server is not running on http://localhost:8000');
    console.log('Please start the server before running this script');
    return false;
  }
}

// Run the capture process
if (require.main === module) {
  checkServer().then(isRunning => {
    if (isRunning) {
      captureScreenshots().catch(console.error);
    } else {
      process.exit(1);
    }
  });
}

module.exports = {
  captureScreenshots,
  checkServer,
  CONFIG
};