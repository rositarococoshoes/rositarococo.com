document.addEventListener('DOMContentLoaded', function() {
    // --- Elementos del DOM (con IDs únicos para no interferir) ---
    const icon = document.getElementById('whatsapp-direct-icon');
    const modal = document.getElementById('whatsapp-direct-modal');
    const submitBtn = document.getElementById('whatsapp-direct-submit');
    const input = document.getElementById('whatsapp-direct-input');
    const errorMsg = document.getElementById('whatsapp-direct-error');

    // Salir si los elementos no existen para evitar errores
    if (!icon || !modal || !submitBtn || !input || !errorMsg) {
        return;
    }

    const overlay = modal.querySelector('.whatsapp-modal-overlay');
    const closeBtn = modal.querySelector('.whatsapp-modal-close');

    // --- Configuración ---
    const validationWebhook = 'https://sswebhookss.odontolab.co/webhook/02eb0643-1b9d-4866-87a7-f892d6a945ea';
    const submissionWebhook = 'https://sswebhookss.odontolab.co/webhook/7ba9427a-e1f6-4201-bbc0-d6fcf5183395';
    const whatsappRedirectUrl = 'https://api.whatsapp.com/send?phone=5491176293618&text=Hola!%20Quisiera%20hacer%20un%20pedido.';

    // --- Lógica de Interacción ---
    icon.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    overlay.addEventListener('click', () => modal.classList.remove('active'));

    // --- Lógica de Envío y Validación ---
    submitBtn.addEventListener('click', async function() {
        this.disabled = true;
        this.textContent = 'Verificando...';
        errorMsg.textContent = '';

        const number = input.value;
        // Formateo robusto del número
        const formattedNumber = '549' + number.replace(/\D/g, '').replace(/^(549|54|0|15)/, '');

        if (formattedNumber.length < 12) {
            errorMsg.textContent = 'El número parece ser muy corto.';
            this.disabled = false;
            this.textContent = 'Ir a WhatsApp';
            return;
        }

        try {
            // 1. Validar existencia del WhatsApp
            const validationResponse = await fetch(validationWebhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ whatsapp_check: formattedNumber })
            });
            const validationData = await validationResponse.json();

            if (!validationData.exists) {
                throw new Error('El número de WhatsApp no parece ser válido.');
            }

            // 2. Enviar datos al nuevo webhook
            this.textContent = 'Procesando...';
            const fbclid = localStorage.getItem('initial_fbclid') || new URLSearchParams(window.location.search).get('fbclid') || '';
            
            const submissionResponse = await fetch(submissionWebhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ whatsapp: formattedNumber, fbclid: fbclid })
            });

            if (!submissionResponse.ok) {
                throw new Error('No se pudo procesar la solicitud en este momento.');
            }

            // 3. Redirigir al usuario a WhatsApp
            window.location.href = whatsappRedirectUrl;

        } catch (error) {
            errorMsg.textContent = error.message || 'Ocurrió un error. Por favor, intenta de nuevo.';
            this.disabled = false;
            this.textContent = 'Ir a WhatsApp';
        }
    });
});
