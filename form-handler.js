// Función para detectar bots
function isBot() {
    // 1. Verificar si el campo honeypot está lleno
    if ($('#website').val() !== '') {
        console.log('Bot detectado: campo honeypot lleno');
        return true;
    }

    // 2. Verificar si el campo landingurl está vacío
    const landingUrl = $('#1209868979').val();
    if (!landingUrl || landingUrl.trim() === '') {
        console.log('Bot detectado: campo landingurl vacío');
        return true;
    }

    return false;
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    container.appendChild(notification);

    setTimeout(function() {
        if (notification.parentNode) notification.parentNode.removeChild(notification);
    }, 5000);
}

// Variable global para controlar el envío del formulario
window.formSubmitted = false;
window.formSubmissionId = null;
window.formSubmissionCount = 0; // Contador de envíos

// Función para generar un ID único
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para verificar si el formulario ya se ha enviado
function checkPreviousSubmission() {
    try {
        // Verificar si hay un ID de envío almacenado en localStorage
        const storedSubmissionId = localStorage.getItem('formSubmissionId');
        const storedTimestamp = localStorage.getItem('formSubmissionTimestamp');
        const storedCount = localStorage.getItem('formSubmissionCount');

        if (storedSubmissionId && storedTimestamp) {
            // Verificar si el envío fue hace menos de 10 minutos
            const now = Date.now();
            const submissionTime = parseInt(storedTimestamp, 10);
            const timeDiff = now - submissionTime;

            // Si el envío fue hace menos de 10 minutos, considerar que el formulario ya se ha enviado
            if (timeDiff < 10 * 60 * 1000) {
                console.log('Formulario enviado recientemente (hace ' + Math.round(timeDiff/1000) + ' segundos)');
                window.formSubmitted = true;
                window.formSubmissionId = storedSubmissionId;
                window.formSubmissionCount = storedCount ? parseInt(storedCount, 10) : 0;
                return true;
            }
        }
    } catch (e) {
        console.error('Error al verificar envío previo:', e);
    }

    return false;
}

// Función para evitar envíos duplicados
function preventDuplicateSubmission() {
    // Incrementar el contador de envíos
    window.formSubmissionCount++;

    // Almacenar el contador en localStorage
    try {
        localStorage.setItem('formSubmissionCount', window.formSubmissionCount.toString());
    } catch (e) {
        console.error('Error al almacenar contador de envíos:', e);
    }

    // Si ya se ha enviado más de una vez, evitar envíos adicionales
    if (window.formSubmissionCount > 1) {
        console.log('Evitando envío duplicado. Contador:', window.formSubmissionCount);
        return false;
    }

    return true;
}

// Función para manejar el envío del formulario
$(document).ready(function() {
    // Verificar si el formulario ya se ha enviado recientemente
    if (checkPreviousSubmission()) {
        // Deshabilitar el botón de envío
        $('#botoncomprar').prop('disabled', true).val('Procesando...');
        showNotification('Tu pedido ya está siendo procesado. Por favor, espera unos minutos.', 'info');
    }

    // Asegurarse de que el campo landingurl tenga la URL actual
    $('#1209868979').val(window.location.href);

    // Deshabilitar el botón de envío al hacer clic
    $('#botoncomprar').on('click', function() {
        // Deshabilitar el botón inmediatamente para evitar múltiples clics
        $(this).prop('disabled', true).val('Procesando...');
    });

    // Manejar el envío del formulario
    $('#bootstrapForm').submit(async function(event) {
        event.preventDefault();

        // Verificar si el formulario ya se ha enviado
        if (window.formSubmitted) {
            console.log('Formulario ya enviado, evitando duplicación');
            $('#botoncomprar').prop('disabled', true).val('Procesando...');
            return false;
        }

        // Marcar el formulario como enviado
        window.formSubmitted = true;
        window.formSubmissionId = generateUniqueId();

        // Almacenar el ID de envío en localStorage
        try {
            localStorage.setItem('formSubmissionId', window.formSubmissionId);
            localStorage.setItem('formSubmissionTimestamp', Date.now().toString());
        } catch (e) {
            console.error('Error al almacenar ID de envío:', e);
        }

        // Deshabilitar el botón de envío
        $('#botoncomprar').prop('disabled', true).val('Procesando...');

        // Verificar si es un bot
        if (isBot()) {
            console.log('Envío bloqueado: posible bot');
            return false;
        }

        // Verificar validación del formulario
        if (!this.checkValidity()) {
            alert('Por favor, completa todos los campos obligatorios (*) correctamente.');
            $(this).find(':invalid').first().focus();
            return false;
        }

        // Verificar WhatsApp
        const whatsappInput = document.getElementById('53830725');
        const errorElement = document.querySelector('.error-message[data-target="53830725"]');
        if (errorElement && !errorElement.classList.contains('valid')) {
            alert('Por favor, verifica tu número de WhatsApp antes de continuar.');
            if (whatsappInput) whatsappInput.focus();
            return false;
        }

        // Verificar que haya productos en el carrito
        const selectedProducts = $('#1471599855').val();
        if (!selectedProducts || selectedProducts.trim() === '') {
            alert('¡No has seleccionado ningún producto! Por favor, elige al menos un par.');
            return false;
        }

        // Mostrar overlay de carga
        $('.loading-overlay').addClass('visible');
        $('#botoncomprar').val('Procesando...').prop('disabled', true);

        try {
            const formaPago = $('#comoabona').val();
            const nombreComprador = $('#1460904554').val();

            // Si es transferencia bancaria (CBU)
            if (formaPago === 'cbu') {
                // Preparar el formulario para envío a Google Forms

                // Verificar si ya se ha enviado el formulario más de una vez
                if (!preventDuplicateSubmission()) {
                    console.log('Evitando envío duplicado a Google Forms (CBU)');

                    // Redireccionar a la página de transferencia CBU sin enviar el formulario de nuevo
                    setTimeout(function() {
                        const pairCount = selectedProducts.split(',').length;
                        const redirectUrl = pairCount >= 2 ?
                            'https://rositarococo.com/transferenciacbu-2pares.html' :
                            'https://rositarococo.com/transferenciacbu-1par.html';

                        window.location.href = redirectUrl;
                    }, 1000);

                    return false;
                }

                // Enviar formulario a Google Forms usando un iframe oculto
                // Esta técnica permite enviar a Google Forms sin redireccionar la página
                const iframe = document.createElement('iframe');
                iframe.name = 'hidden_iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                // Agregar el ID único de envío como campo oculto
                const submissionIdField = document.createElement('input');
                submissionIdField.type = 'hidden';
                submissionIdField.name = 'submission_id';
                submissionIdField.value = window.formSubmissionId;
                this.appendChild(submissionIdField);

                // Agregar el contador de envíos como campo oculto
                const submissionCountField = document.createElement('input');
                submissionCountField.type = 'hidden';
                submissionCountField.name = 'submission_count';
                submissionCountField.value = window.formSubmissionCount.toString();
                this.appendChild(submissionCountField);

                // Configurar el formulario para enviar a través del iframe
                this.target = 'hidden_iframe';
                this.submit();

                console.log('Formulario enviado a Google Forms (CBU). Contador:', window.formSubmissionCount);

                // Redireccionar a la página de transferencia CBU
                setTimeout(function() {
                    const pairCount = selectedProducts.split(',').length;
                    const redirectUrl = pairCount >= 2 ?
                        'https://rositarococo.com/transferenciacbu-2pares.html' :
                        'https://rositarococo.com/transferenciacbu-1par.html';

                    window.location.href = redirectUrl;
                }, 1000);

                return false;
            }

            // Si es MercadoPago o tarjeta
            if (formaPago === 'tarjeta' || formaPago === 'mercadopago') {
                // Obtener el precio
                let montoTexto = $(".preciototalaobservar").first().text();
                console.log('Texto del precio:', montoTexto);

                // Si no se encuentra el precio, usar un valor predeterminado basado en la cantidad de productos
                let monto = 0;
                if (!montoTexto || montoTexto.trim() === '') {
                    const pairCount = selectedProducts.split(',').length;
                    monto = pairCount >= 2 ? 110000 : 70000;
                    console.log('Usando monto predeterminado:', monto);
                } else {
                    monto = parseFloat(montoTexto.replace(/\./g, ''));
                    console.log('Monto parseado:', monto);
                }

                // Verificar que el monto sea válido
                if (isNaN(monto) || monto <= 0) {
                    const pairCount = selectedProducts.split(',').length;
                    monto = pairCount >= 2 ? 110000 : 70000;
                    console.log('Monto inválido, usando predeterminado:', monto);
                }

                // Construir la URL para el webhook de MercadoPago
                const webhookUrl = "https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30";
                console.log('Llamando al webhook:', webhookUrl);
                console.log('Datos de envío:', { comprador: nombreComprador, monto: monto });

                try {
                    // Llamar al webhook para generar el link de pago
                    const response = await fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            comprador: nombreComprador,
                            monto: monto
                        })
                    });

                    console.log('Respuesta del webhook:', response.status, response.statusText);

                    if (!response.ok) {
                        throw new Error(`Error en la respuesta del webhook: ${response.status} ${response.statusText}`);
                    }

                    const responseText = await response.text();
                    console.log('Texto de respuesta:', responseText);

                    let jsonData;
                    try {
                        jsonData = JSON.parse(responseText);
                        console.log('Datos JSON:', jsonData);
                    } catch (e) {
                        console.error('Error al parsear JSON:', e);
                        throw new Error('Error al parsear la respuesta del servidor');
                    }

                    const mercadoPagoUrl = jsonData.linkpersonalizadomp;
                    console.log('URL de MercadoPago:', mercadoPagoUrl);

                    if (!mercadoPagoUrl) {
                        throw new Error('No se encontró el link de MercadoPago en la respuesta');
                    }

                    // Guardar el link en el formulario
                    $('#link-mercadopago').val(mercadoPagoUrl);
                    document.getElementById('link-mercadopago').value = mercadoPagoUrl;

                    // Verificar si ya se ha enviado el formulario más de una vez
                    if (!preventDuplicateSubmission()) {
                        console.log('Evitando envío duplicado a Google Forms (MercadoPago)');

                        // Redireccionar a MercadoPago sin enviar el formulario de nuevo
                        console.log('Redireccionando a MercadoPago sin enviar formulario...');
                        setTimeout(function() {
                            console.log('Redireccionando ahora a:', mercadoPagoUrl);
                            window.location.href = mercadoPagoUrl;
                        }, 1500);

                        return false;
                    }

                    // Enviar el formulario a Google Forms usando un iframe oculto
                    const iframe = document.createElement('iframe');
                    iframe.name = 'hidden_iframe';
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);

                    // Agregar el ID único de envío como campo oculto
                    const submissionIdField = document.createElement('input');
                    submissionIdField.type = 'hidden';
                    submissionIdField.name = 'submission_id';
                    submissionIdField.value = window.formSubmissionId;
                    this.appendChild(submissionIdField);

                    // Agregar el contador de envíos como campo oculto
                    const submissionCountField = document.createElement('input');
                    submissionCountField.type = 'hidden';
                    submissionCountField.name = 'submission_count';
                    submissionCountField.value = window.formSubmissionCount.toString();
                    this.appendChild(submissionCountField);

                    // Configurar el formulario para enviar a través del iframe
                    this.target = 'hidden_iframe';
                    this.submit();

                    console.log('Formulario enviado a Google Forms (MercadoPago). Contador:', window.formSubmissionCount);

                    // Redireccionar a MercadoPago
                    console.log('Redireccionando a MercadoPago en 1.5 segundos...');
                    setTimeout(function() {
                        console.log('Redireccionando ahora a:', mercadoPagoUrl);
                        window.location.href = mercadoPagoUrl;
                    }, 1500);

                } catch (error) {
                    console.error('Error al generar el link de pago:', error);
                    alert('Hubo un problema al generar el link de pago. Por favor, intenta nuevamente o elige otro método de pago.');
                    $('.loading-overlay').removeClass('visible');
                    $('#botoncomprar').val('Confirmar y Pagar 🛒').prop('disabled', false);
                }

                return false;
            }

            // Si llegamos aquí, es porque no se seleccionó un método de pago válido
            alert('Por favor, selecciona un método de pago válido.');
            $('.loading-overlay').removeClass('visible');
            $('#botoncomprar').val('Confirmar y Pagar 🛒').prop('disabled', false);

        } catch (error) {
            console.error('Error en el proceso de envío:', error);
            alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
            $('.loading-overlay').removeClass('visible');
            $('#botoncomprar').val('Confirmar y Pagar 🛒').prop('disabled', false);
        }

        return false;
    });
});
