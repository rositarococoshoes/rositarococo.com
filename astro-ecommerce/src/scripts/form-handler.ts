// Webhook endpoints
const WEBHOOKS = {
  ORDER: "https://sswebhookss.odontolab.co/webhook/a5dcd3c9-48a3-46a1-a781-475737a634ca",
  CONTRAREEMBOLSO: "https://sswebhookss.odontolab.co/webhook/1e214d4e-5481-4ded-8936-c63ff9ce7743",
  MERCADOPAGO: "https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30",
  FACEBOOK: "https://sswebhookss.odontolab.co/webhook/9dfb840b-2a21-4277-8aec-1666bfaaac89"
};

declare const fbq: any;

// Helper functions
async function getClientIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return '';
  }
}

function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
}

function getFacebookParams(): { fbc: string; fbp: string } {
  return {
    fbc: getCookie('_fbc') || localStorage.getItem('facebook_fbc') || '',
    fbp: getCookie('_fbp') || localStorage.getItem('facebook_fbp') || ''
  };
}

async function hashEmail(email: string): Promise<string> {
  if (!email) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(email.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Facebook tracking
async function trackFacebookEvent(eventName: string, eventData: Record<string, any> = {}): Promise<void> {
  try {
    const eventId = `fb_${eventName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fbParams = getFacebookParams();
    const clientIP = await getClientIP();
    const email = (document.getElementById('1465946249') as HTMLInputElement)?.value || '';

    const payload = {
      event_name: eventName,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: window.location.href,
      user_data: {
        client_ip_address: clientIP,
        client_user_agent: navigator.userAgent,
        em: await hashEmail(email),
        fbc: fbParams.fbc,
        fbp: fbParams.fbp
      },
      custom_data: eventData
    };

    await fetch(WEBHOOKS.FACEBOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [payload] })
    });

    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, eventData, { eventID: eventId });
    }
  } catch (error) {
    console.error('Facebook tracking error:', error);
  }
}

// Form data collection
function getFormData(): Record<string, string> {
  const getValue = (id: string): string => 
    (document.getElementById(id) as HTMLInputElement)?.value || '';

  return {
    'entry.1471599855': formatCartData(),
    'entry.1460904554': getValue('1460904554'),
    'entry.53830725': getValue('53830725'),
    'entry.1465946249': getValue('1465946249'),
    'entry.951592426': getValue('951592426'),
    'entry.1743418466': getValue('1743418466'),
    'entry.1005165410': getValue('1005165410'),
    'entry.59648134': getValue('59648134'),
    'entry.541001873': getValue('541001873'),
    'entry.1209868979': window.location.href,
    'comoabona': getValue('comoabona'),
    'entry.978809450': getValue('link-mercadopago'),
    'entry.2315500325': 'A DOMICILIO',
    'entry.17650825': 'A DOMICILIO',
    'client_user_agent': navigator.userAgent,
    '_fbp': getFacebookParams().fbp,
  };
}

function formatCartData(): string {
  if (!window.cart || window.cartCount === 0) return '';
  return window.cart.map(item => `${item.size}-${item.model}`).join(', ');
}

function calculateTotals(paymentMethod: string): { baseTotal: number; finalTotal: number } {
  let baseTotal = window.cartCount === 1 ? 60000 : 95000;
  let finalTotal = paymentMethod === 'cbu' ? Math.round(baseTotal * 0.9) : baseTotal;
  return { baseTotal, finalTotal };
}

// Loading states
function showLoading(): void {
  document.querySelector('.loading-overlay')?.classList.add('active');
}

function hideLoading(): void {
  document.querySelector('.loading-overlay')?.classList.remove('active');
}

function disableButton(): void {
  const btn = document.getElementById('botoncomprar') as HTMLButtonElement;
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Procesando...';
  }
}

function enableButton(): void {
  const btn = document.getElementById('botoncomprar') as HTMLButtonElement;
  if (btn) {
    btn.disabled = false;
    btn.textContent = 'Confirmar y Pagar 🛒';
  }
}

// Order processing
async function submitContrareembolso(formData: Record<string, string>): Promise<void> {
  const response = await fetch(WEBHOOKS.CONTRAREEMBOLSO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (!response.ok) throw new Error('Webhook error');

  const redirectUrl = window.cartCount === 1 
    ? '/gracias-1par-c' 
    : '/gracias-2pares-c';
  
  window.location.href = redirectUrl;
}

async function submitMercadoPago(formData: Record<string, string>): Promise<void> {
  const { finalTotal } = calculateTotals('tarjeta');
  const fbParams = getFacebookParams();

  const mpResponse = await fetch(WEBHOOKS.MERCADOPAGO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      comprador: formData['entry.1460904554'],
      monto: finalTotal,
      fbp: fbParams.fbp
    })
  });

  const mpData = await mpResponse.json();
  const mpUrl = Array.isArray(mpData) ? mpData[0]?.linkpersonalizadomp : mpData?.linkpersonalizadomp;

  if (!mpUrl) throw new Error('No MercadoPago URL');

  await sendToOrderWebhook(formData);
  window.location.href = mpUrl;
}

async function submitCBU(formData: Record<string, string>): Promise<void> {
  await sendToOrderWebhook(formData);
  
  const redirectUrl = window.cartCount >= 2 
    ? '/transferenciacbu-2pares' 
    : '/transferenciacbu-1par';
  
  window.location.href = redirectUrl;
}

async function sendToOrderWebhook(formData: Record<string, string>): Promise<void> {
  const params = new URLSearchParams();
  Object.entries(formData).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  await fetch(WEBHOOKS.ORDER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
}

// Form validation
function validateForm(): boolean {
  const requiredFields = ['1460904554', '53830725', '1465946249', '951592426', '1743418466', '1005165410', '59648134'];
  
  for (const fieldId of requiredFields) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (!field?.value?.trim()) {
      showNotification('Por favor completa todos los campos obligatorios', 'error');
      field?.focus();
      return false;
    }
  }

  if (window.cartCount === 0) {
    showNotification('Debes agregar al menos un producto', 'error');
    return false;
  }

  const paymentMethod = (document.getElementById('comoabona') as HTMLSelectElement)?.value;
  if (!paymentMethod) {
    showNotification('Por favor selecciona un método de pago', 'error');
    return false;
  }

  return true;
}

function showNotification(message: string, type: 'error' | 'success' = 'error'): void {
  const container = document.getElementById('notification-container');
  if (!container) return;

  const notification = document.createElement('div');
  notification.className = `${type === 'error' ? 'bg-red-100 border-red-400 text-red-800' : 'bg-green-100 border-green-400 text-green-800'} border-l-4 p-4 rounded shadow-lg`;
  notification.innerHTML = `<p class="font-medium">${message}</p>`;
  
  container.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

// Main handler
async function handleOrderSubmission(event: Event): Promise<void> {
  event.preventDefault();

  if (!validateForm()) return;

  showLoading();
  disableButton();

  try {
    const paymentMethod = (document.getElementById('comoabona') as HTMLSelectElement).value;
    const formData = getFormData();
    const { finalTotal } = calculateTotals(paymentMethod);

    await trackFacebookEvent('InitiateCheckout', {
      content_type: 'product',
      value: finalTotal,
      currency: 'ARS',
      num_items: window.cartCount
    });

    switch (paymentMethod) {
      case 'contrareembolso':
        await submitContrareembolso(formData);
        break;
      case 'tarjeta':
      case 'mercadopago':
        await submitMercadoPago(formData);
        break;
      case 'cbu':
        await submitCBU(formData);
        break;
      default:
        throw new Error('Método de pago no válido');
    }
  } catch (error) {
    console.error('Order error:', error);
    showNotification('Hubo un problema al procesar tu pedido. Intenta nuevamente.', 'error');
    hideLoading();
    enableButton();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bootstrapForm');
  form?.addEventListener('submit', handleOrderSubmission);

  // Set landing URL
  const landingField = document.getElementById('1209868979') as HTMLInputElement;
  if (landingField) landingField.value = window.location.href;

  // Track PageView
  trackFacebookEvent('PageView');
});

export {};
