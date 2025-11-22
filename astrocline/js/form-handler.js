// Form Handler for Astro Client - Webhook Implementation
// Replaces Google Forms with original webhook endpoints

// === WEBHOOK ENDPOINTS (ORIGINAL) ===
const ORDER_WEBHOOK = "https://sswebhookss.odontolab.co/webhook/a5dcd3c9-48a3-46a1-a781-475737a634ca";
const CONTRAREEMBOLSO_WEBHOOK = "https://sswebhookss.odontolab.co/webhook/1e214d4e-5481-4ded-8936-c63ff9ce7743";
const MERCADOPAGO_WEBHOOK = "https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30";
const FACEBOOK_WEBHOOK = "https://sswebhookss.odontolab.co/webhook/9dfb840b-2a21-4277-8aec-1666bfaaac89";

// === CLIENT INFORMATION TRACKING ===
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        try {
            const response2 = await fetch('https://httpbin.org/ip');
            const data2 = await response2.json();
            return data2.origin;
        } catch (error2) {
            return '';
        }
    }
}

// === FACEBOOK PARAMETERS ===
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
}

function getFacebookParams() {
    return {
        fbc: getCookie('_fbc') || localStorage.getItem('facebook_fbc') || '',
        fbp: getCookie('_fbp') || localStorage.getItem('facebook_fbp') || ''
    };
}

function getArgentinaTimestamp() {
    const now = new Date();
    const argentinaTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
    return Math.floor(argentinaTime.getTime() / 1000);
}

async function hashEmail(email) {
    if (!email) return '';
    const normalizedEmail = email.toLowerCase().trim();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalizedEmail);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// === BOT PROTECTION ===
function isBot() {
    // Check honeypot field
    const websiteField = document.getElementById('website');
    if (websiteField && websiteField.value !== '') {
        return true;
    }

    // Check landing URL field
    const landingUrlField = document.getElementById('1209868979');
    if (landingUrlField && !landingUrlField.value.trim()) {
        return true;
    }

    return false;
}

// === LOADING STATES ===
function showLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

function hideLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// === NOTIFICATIONS ===
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    container.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// === FACEBOOK TRACKING ===
async function trackFacebookEvent(eventName, eventData = {}) {
    try {
        const eventId = `fb_${eventName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const fbParams = getFacebookParams();
        const clientIP = await getClientIP();
        const customerEmail = document.getElementById('1465946249')?.value || '';
        const hashedEmail = await hashEmail(customerEmail);

        const facebookEventData = {
            event_name: eventName,
            event_id: eventId,
            event_time: getArgentinaTimestamp(),
            action_source: 'website',
            event_source_url: window.location.href,
            user_data: {
                client_ip_address: clientIP,
                client_user_agent: navigator.userAgent,
                em: hashedEmail,
                fbc: fbParams.fbc,
                fbp: fbParams.fbp
            },
            custom_data: eventData
        };

        await fetch(FACEBOOK_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [facebookEventData] })
        });

        // Also track on client-side if available
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, eventData, { eventID: eventId });
        }
    } catch (error) {
        console.error('Error tracking Facebook event:', error);
    }
}

// === ORDER PROCESSING ===

async function submitStandardOrder(paymentMethod) {
    try {
        const formData = getFormData();

        // Calculate totals based on payment method
        const totals = calculateOrderTotals(window.cartCount, paymentMethod);

        // Track InitiateCheckout event
        await trackFacebookEvent('InitiateCheckout', {
            content_type: 'product',
            content_ids: ['astroline-checkout'],
            contents: [{
                id: 'astroline-checkout',
                quantity: window.cartCount,
                item_price: totals.finalTotal
            }],
            value: totals.finalTotal,
            currency: 'ARS',
            num_items: window.cartCount
        });

        if (paymentMethod === 'tarjeta' || paymentMethod === 'mercadopago') {
            await processMercadoPagoPayment(totals.finalTotal, formData);
        } else if (paymentMethod === 'cbu') {
            await processCBUPayment(totals.finalTotal, formData);
        }

    } catch (error) {
        console.error('Error processing standard order:', error);
        showNotification('Hubo un problema al procesar tu pedido. Por favor, intenta nuevamente.', 'error');
        hideLoadingOverlay();
        enableSubmitButton();
    }
}

async function submitContrareembolsoOrder() {
    try {
        const formData = getFormData();

        // Calculate contrareembolso totals
        const totals = calculateContrareembolsoTotals(window.cartCount);

        // Track InitiateCheckout for contrareembolso
        await trackFacebookEvent('InitiateCheckout', {
            content_type: 'product',
            content_ids: ['astroline-contrareembolso'],
            contents: [{
                id: 'astroline-contrareembolso',
                quantity: window.cartCount,
                item_price: totals.finalTotal
            }],
            value: totals.finalTotal,
            currency: 'ARS',
            num_items: window.cartCount
        });

        // Send order data to contrareembolso webhook
        const response = await fetch(CONTRAREEMBOLSO_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Save order details
        saveOrderDetails(formData);

        // Redirect to appropriate thank you page
        redirectToThankYouPage(window.cartCount);

    } catch (error) {
        console.error('Error processing contrareembolso order:', error);
        showNotification('Hubo un problema al procesar tu pedido. Por favor, intenta nuevamente.', 'error');
        hideLoadingOverlay();
        enableSubmitButton();
    }
}

async function processMercadoPagoPayment(monto, formData) {
    try {
        const nombreComprador = document.getElementById('1460904554')?.value || '';
        const fbParams = getFacebookParams();

        // Generate MercadoPago link
        const mpResponse = await fetch(MERCADOPAGO_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                comprador: nombreComprador,
                monto: monto,
                fbp: fbParams.fbp
            })
        });

        if (!mpResponse.ok) {
            console.error('MercadoPago webhook response status:', mpResponse.status);
            console.error('MercadoPago webhook response text:', await mpResponse.text());
            throw new Error(`MercadoPago webhook error: ${mpResponse.status}`);
        }

        const mpData = await mpResponse.json();
        console.log('MercadoPago webhook response:', mpData); // Debug log

        // Try multiple possible response formats
        let mercadoPagoUrl = null;

        if (Array.isArray(mpData) && mpData.length > 0) {
            // Array format
            mercadoPagoUrl = mpData[0].linkpersonalizadomp || mpData[0].link || mpData[0].url;
        } else if (mpData) {
            // Object format
            mercadoPagoUrl = mpData.linkpersonalizadomp || mpData.link || mpData.url || mpData.mercadopago_link;
        }

        console.log('Extracted MercadoPago URL:', mercadoPagoUrl); // Debug log

        if (!mercadoPagoUrl) {
            console.error('Response structure:', JSON.stringify(mpData, null, 2));
            throw new Error('No se pudo generar el link de MercadoPago - respuesta inválida');
        }

        // Save MercadoPago link
        const linkField = document.getElementById('link-mercadopago');
        if (linkField) {
            linkField.value = mercadoPagoUrl;
        }

        // Send order data to main webhook
        await sendOrderToWebhook(formData);

        // Generate purchase token
        generatePurchaseToken();

        // Redirect to MercadoPago
        setTimeout(() => {
            window.location.href = mercadoPagoUrl;
        }, 1000);

    } catch (error) {
        console.error('Error processing MercadoPago payment:', error);
        throw error;
    }
}

async function processCBUPayment(monto, formData) {
    try {
        // Send order data to main webhook
        await sendOrderToWebhook(formData);

        // Generate purchase token
        generatePurchaseToken();

        // Redirect to CBU transfer page
        const transferUrl = window.cartCount >= 2 ?
            'https://rositarococo.com/transferenciacbu-2pares.html' :
            'https://rositarococo.com/transferenciacbu-1par.html';

        setTimeout(() => {
            window.location.href = transferUrl;
        }, 1000);

    } catch (error) {
        console.error('Error processing CBU payment:', error);
        throw error;
    }
}

async function sendOrderToWebhook(formData) {
    // Convert to FormData format to match original webhook expectations
    const formPayload = new URLSearchParams();

    // Add all form data fields as URLSearchParams (same as original)
    Object.keys(formData).forEach(key => {
        if (formData[key] !== undefined && formData[key] !== null) {
            formPayload.append(key, formData[key]);
        }
    });

    const response = await fetch(ORDER_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formPayload.toString()
    });

    if (!response.ok) {
        throw new Error(`Order webhook error: ${response.status}`);
    }
}

// === DATA PROCESSING ===

function getFormData() {
    return {
        // Cart information (formatos del webhook original)
        'entry.1471599855': formatCartDataForFunnel(), // Formatted cart data (IMPORTANTE: Este es el nombre correcto del webhook original)

        // Customer information (formatos del webhook original)
        'entry.1460904554': document.getElementById('1460904554')?.value || '', // Name
        'entry.53830725': document.getElementById('53830725')?.value || '', // WhatsApp
        'entry.1465946249': document.getElementById('1465946249')?.value || '', // Email

        // Address information (formatos del webhook original)
        'entry.951592426': document.getElementById('951592426')?.value || '', // Address
        'entry.1743418466': document.getElementById('1743418466')?.value || '', // Locality
        'entry.1005165410': document.getElementById('1005165410')?.value || '', // Postal code
        'entry.59648134': document.getElementById('59648134')?.value || '', // Province
        'entry.541001873': document.getElementById('541001873')?.value || '', // DNI

        // Order metadata (formatos del webhook original)
        'entry.1209868979': window.location.href, // Landing URL
        'comoabona': document.getElementById('comoabona')?.value || '', // Payment method
        'entry.978809450': document.getElementById('link-mercadopago')?.value || '', // MercadoPago link

        // Additional fields from original form
        'entry.2315500325': 'A DOMICILIO', // Shipping method (fixed)
        'entry.17650825': 'A DOMICILIO', // Shipping method type (fixed)

        // Technical data (formatos del webhook original)
        'client_ip_address': '', // Will be filled below
        'client_user_agent': navigator.userAgent,
        '_fbp': getFacebookParams().fbp,

        // Order totals
        '1715320252': '', // Will be calculated below
        '736134777': '', // Will be calculated below
        '1885018612': '', // Will be filled below
    };
}

function formatCartDataForFunnel() {
    if (!window.cart || window.cartCount === 0) return '';

    const formattedItems = window.cart.map(item => {
        const modelMap = {
            'negras': 'guillermina-negras',
            'camel': 'guillermina-camel',
            'blancas': 'guillermina-blancas'
        };
        const modelKey = modelMap[item.model] || item.model;
        return `${item.size}-${modelKey}`;
    });

    return formattedItems.join(', ');
}

function calculateOrderTotals(cartCount, paymentMethod) {
    let unitPrice, baseTotal, finalTotal;

    if (cartCount === 1) {
        unitPrice = 60000; // Precio individual para tarjeta/MP
        baseTotal = 60000;
    } else if (cartCount === 2) {
        baseTotal = 95000; // Precio promoción 2 pares
        unitPrice = 47500; // Precio por par en promoción
    } else {
        // Para más de 2 pares, mantener la lógica de promoción por par
        unitPrice = 47500; // Precio por par en promoción
        baseTotal = cartCount * 47500;
    }

    // Apply CBU discount
    if (paymentMethod === 'cbu') {
        finalTotal = Math.round(baseTotal * 0.9);
    } else {
        finalTotal = baseTotal;
    }

    return {
        unitPrice,
        baseTotal,
        finalTotal,
        discount: baseTotal - finalTotal
    };
}

function calculateContrareembolsoTotals(cartCount) {
    let finalTotal;

    if (cartCount === 1) {
        finalTotal = 55000; // Precio para 1 par en contrareembolso
    } else if (cartCount === 2) {
        finalTotal = 85000; // Precio para 2 pares en contrareembolso
    } else {
        finalTotal = 0; // Default for invalid amounts
    }

    return {
        finalTotal
    };
}

function saveOrderDetails(formData) {
    localStorage.setItem('orderDetails', formData['1885018612'] || '');
    localStorage.setItem('rawProducts', formData['286442883'] || '');

    if (formData['1460904554']) {
        localStorage.setItem('customerName', formData['1460904554']);
    }
}

function generatePurchaseToken() {
    const purchaseToken = 'purchase_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('valid_purchase_token', purchaseToken);
    localStorage.setItem('purchase_timestamp', Date.now().toString());
}

function redirectToThankYouPage(pairsCount) {
    const queryString = `?productos=${encodeURIComponent(document.getElementById('286442883')?.value || '')}`;

    let redirectUrl;
    if (pairsCount === 1) {
        redirectUrl = 'https://www.rositarococo.com/gracias-1par-c.html' + queryString;
    } else if (pairsCount === 2) {
        redirectUrl = 'https://www.rositarococo.com/gracias-2pares-c.html' + queryString;
    } else if (pairsCount >= 3) {
        redirectUrl = 'https://www.rositarococo.com/gracias-3pares.html' + queryString;
    } else {
        redirectUrl = 'https://www.rositarococo.com/gracias-1par-c.html' + queryString;
    }

    // Try multiple redirect methods
    try {
        window.location.href = redirectUrl;
        setTimeout(() => window.location = redirectUrl, 1000);
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = redirectUrl;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
        }, 2000);
    } catch (e) {
        console.error('Error redirecting:', e);
        alert('Hubo un problema al redireccionar. Por favor, haz clic en Aceptar para continuar.');
        window.location = redirectUrl;
    }
}

// === UI CONTROLS ===

function disableSubmitButton() {
    const submitButton = document.getElementById('botoncomprar');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Procesando...';
    }
}

function enableSubmitButton() {
    const submitButton = document.getElementById('botoncomprar');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Confirmar y Pagar 🛒';
    }
}

// === VALIDATION ===

function validateForm() {
    // Use inline validator if available
    if (window.formValidator) {
        return window.formValidator.validateForm();
    }

    // Fallback validation for compatibility
    const form = document.getElementById('bootstrapForm');
    if (form && !form.checkValidity()) {
        showInlineAlert('Por favor, completa todos los campos obligatorios (*) correctamente.', 'error');
        form.querySelector(':invalid')?.focus();
        return false;
    }

    // Check if cart has items
    if (window.cartCount === 0) {
        showInlineAlert('No has seleccionado ningún producto. Por favor, elige al menos un par.', 'error');
        return false;
    }

    // Check payment method
    const paymentMethod = document.getElementById('comoabona')?.value;
    if (!paymentMethod) {
        showInlineAlert('Por favor, selecciona un método de pago.', 'error');
        return false;
    }

    return true;
}

// === MAIN FORM HANDLER ===

async function handleOrderSubmission(event) {
    event.preventDefault();

    if (!validateForm()) {
        return false;
    }

    // Check for bots
    if (isBot()) {
        return false;
    }

    // Show loading state
    showLoadingOverlay();
    disableSubmitButton();

    try {
        const paymentMethod = document.getElementById('comoabona').value;

        if (paymentMethod === 'contrareembolso') {
            await submitContrareembolsoOrder();
        } else {
            await submitStandardOrder(paymentMethod);
        }

    } catch (error) {
        console.error('Error in order submission:', error);
        showNotification('Hubo un problema al procesar tu pedido. Por favor, intenta nuevamente.', 'error');
        hideLoadingOverlay();
        enableSubmitButton();
    }

    return false;
}

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Astroline Form Handler...');

    // Set landing URL
    const landingUrlField = document.getElementById('1209868979');
    if (landingUrlField) {
        landingUrlField.value = window.location.href;
    }

    // Add form submit handler
    const form = document.getElementById('bootstrapForm');
    if (form) {
        form.addEventListener('submit', handleOrderSubmission);
        console.log('✅ Form submit handler attached');
    } else {
        console.error('❌ Form #bootstrapForm not found');
    }

    // Track PageView
    trackFacebookEvent('PageView');

    console.log('✅ Astroline Form Handler initialized');
});

// Export functions for global access
window.handleOrderSubmission = handleOrderSubmission;
window.trackFacebookEvent = trackFacebookEvent;
window.showLoadingOverlay = showLoadingOverlay;
window.hideLoadingOverlay = hideLoadingOverlay;