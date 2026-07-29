const { test, expect } = require('playwright/test');

test.use({ viewport: { width: 430, height: 932 } });

test.setTimeout(180000);

async function addPair(page, productId, size) {
  await page.locator(`${productId} select`).selectOption(size);
  await page.locator(`${productId} .add-button`).click();
}

async function fillCheckout(page, { email, name, whatsapp, dni, street, postalCode, locality, province, paymentMethod }) {
  await page.getByPlaceholder('tuemail@ejemplo.com').fill(email);
  await page.getByPlaceholder('Quién recibe el pedido').fill(name);
  await page.getByPlaceholder('Ej: 1156457057 (sin 0 ni 15)').fill(whatsapp);
  await page.getByPlaceholder('Del titular o quien recibe').fill(dni);
  await page.getByPlaceholder('Ej: Av. Siempreviva 742, 3B').fill(street);
  await page.getByPlaceholder('Ej: 1425').fill(postalCode);
  await page.getByPlaceholder('Ej: Palermo').fill(locality);
  await page.locator('label:has-text("Provincia") select').selectOption({ label: province });
  await page.locator('label:has-text("¿Cómo preferís abonar?") select').selectOption(paymentMethod);
}

function watchNetwork(page, bucket) {
  page.on('response', async (response) => {
    const request = response.request();
    if (request.method() !== 'POST') return;
    const url = response.url();
    if (!url.includes('sswebhookss.odontolab.co')) return;
    let body = '';
    try {
      body = request.postData() || '';
    } catch {}
    bucket.push({
      url,
      status: response.status(),
      body,
    });
  });
}

test('real previo pago cbu + mp endpoints', async ({ browser }) => {
  const cbuContext = await browser.newContext();
  const cbuPage = await cbuContext.newPage();
  const cbuPosts = [];
  watchNetwork(cbuPage, cbuPosts);

  await cbuPage.goto('https://rositarococo.com/2026/index.html?v=2026.03.26-v42', { waitUntil: 'domcontentloaded' });
  await addPair(cbuPage, '#modelo-roma-negras', '37');
  await addPair(cbuPage, '#modelo-roma-suela', '38');
  await fillCheckout(cbuPage, {
    email: 'prueba.codex.cbu@example.com',
    name: 'Prueba Codex V42 CBU',
    whatsapp: '1156357051',
    dni: '30111222',
    street: 'Calle Falsa 123',
    postalCode: '1425',
    locality: 'Palermo',
    province: 'Capital Federal',
    paymentMethod: 'cbu',
  });

  const cbuOrderResponse = cbuPage.waitForResponse((response) => response.url().includes('a5dcd3c9-48a3-46a1-a781-475737a634ca') && response.request().method() === 'POST');
  await Promise.all([
    cbuOrderResponse,
    cbuPage.waitForURL(/transferenciacbu-2pares\.html/, { timeout: 45000 }),
    cbuPage.getByRole('button', { name: 'Confirmar y pagar' }).click(),
  ]);

  const cbuUrl = cbuPage.url();
  console.log('CBU_RESULT=' + JSON.stringify({ url: cbuUrl, posts: cbuPosts }, null, 2));
  await cbuContext.close();

  const mpContext = await browser.newContext();
  const mpPage = await mpContext.newPage();
  const mpPosts = [];
  watchNetwork(mpPage, mpPosts);

  await mpPage.goto('https://rositarococo.com/2026/index.html?v=2026.03.26-v42', { waitUntil: 'domcontentloaded' });
  await addPair(mpPage, '#modelo-roma-negras', '36');
  await addPair(mpPage, '#modelo-venecia-negras', '37');
  await fillCheckout(mpPage, {
    email: 'prueba.codex.mp@example.com',
    name: 'Prueba Codex V42 MP',
    whatsapp: '1156357051',
    dni: '30222333',
    street: 'Calle Falsa 456',
    postalCode: '1425',
    locality: 'Palermo',
    province: 'Capital Federal',
    paymentMethod: 'mercadopago',
  });

  const mpLinkResponse = mpPage.waitForResponse((response) => response.url().includes('addaa0c8-96b1-4d63-b2c0-991d6be3de30') && response.request().method() === 'POST');
  const mpOrderResponse = mpPage.waitForResponse((response) => response.url().includes('a5dcd3c9-48a3-46a1-a781-475737a634ca') && response.request().method() === 'POST');

  await Promise.all([
    mpLinkResponse,
    mpOrderResponse,
    mpPage.getByRole('button', { name: 'Confirmar y pagar' }).click(),
  ]);

  await mpPage.waitForURL(/mercadopago|mpago|mercado/i, { timeout: 45000 });
  const mpUrl = mpPage.url();
  console.log('MP_RESULT=' + JSON.stringify({ url: mpUrl, posts: mpPosts }, null, 2));
  await mpContext.close();
});
