// Función para detectar bots - Versión para Contrareembolso
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

// Función para generar un ID único
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

console.log('🚀 [Form Handler] INICIANDO form-handler-contrareembolso.js');

// Función para manejar el envío del formulario
$(document).ready(function() {
    console.log('📋 [Form Handler] Document ready, inicializando...');
    
    // Asegurarse de que el campo landingurl tenga la URL actual
    $('#1209868979').val(window.location.href);
    console.log('📝 [Form Handler] URL actual guardada en campo oculto:', window.location.href);

    // Manejar el envío del formulario
    $('#bootstrapForm').submit(async function(event) {
        console.log('🔄 [Form Handler] ¡FORMULARIO ENVIADO! Iniciando proceso de envío...');
        event.preventDefault();
        
        console.log('⏰ [Form Handler] Timestamp del envío:', new Date().toISOString());

        // Deshabilitar el botón de envío
        $('#botoncomprar').prop('disabled', true).val('Procesando...');
        console.log('🔒 [Form Handler] Botón deshabilitado y texto cambiado a "Procesando..."');

        // Verificar si es un bot
        console.log('🤖 [Form Handler] Verificando si es bot...');
        if (isBot()) {
            console.log('❌ [Form Handler] Envío bloqueado: posible bot');
            return false;
        }
        console.log('✅ [Form Handler] No es bot, continuando...');

        // Verificar validación del formulario
        console.log('📋 [Form Handler] Verificando validación del formulario...');
        if (!this.checkValidity()) {
            console.log('❌ [Form Handler] Formulario inválido, mostrando alerta...');
            alert('Por favor, completa todos los campos obligatorios (*) correctamente.');
            $(this).find(':invalid').first().focus();
            $('#botoncomprar').prop('disabled', false).val('COMPRAR 🛒');
            return false;
        }
        console.log('✅ [Form Handler] Formulario válido');

        // Verificar WhatsApp
        console.log('📱 [Form Handler] Verificando WhatsApp...');
        const whatsappInput = document.getElementById('53830725');
        const errorElement = document.querySelector('.error-message[data-target="53830725"]');
        console.log('📱 [Form Handler] Campo WhatsApp encontrado:', !!whatsappInput);
        console.log('📱 [Form Handler] Elemento de error encontrado:', !!errorElement);
        if (errorElement) {
            console.log('📱 [Form Handler] Clase del elemento de error:', errorElement.classList.toString());
        }
        
        if (errorElement && !errorElement.classList.contains('valid')) {
            console.log('❌ [Form Handler] WhatsApp no válido, mostrando alerta...');
            alert('Por favor, verifica tu número de WhatsApp antes de continuar.');
            if (whatsappInput) whatsappInput.focus();
            $('#botoncomprar').prop('disabled', false).val('COMPRAR 🛒');
            return false;
        }
        console.log('✅ [Form Handler] WhatsApp válido');

        // Verificar que haya productos en el carrito
        const selectedProducts = $('#286442883').val();
        console.log('🛒 [Form Handler] Productos seleccionados:', selectedProducts);
        if (!selectedProducts || selectedProducts.trim() === '') {
            console.log('❌ [Form Handler] No hay productos seleccionados');
            alert('¡No has seleccionado ningún producto! Por favor, elige al menos un par.');
            $('#botoncomprar').prop('disabled', false).val('COMPRAR 🛒');
            return false;
        }
        console.log('✅ [Form Handler] Productos válidos');

        // Verificar que se haya seleccionado un día y hora de entrega
        const diaHora = $('#1756027935').val();
        console.log('📅 [Form Handler] Día y hora seleccionados:', diaHora);
        if (!diaHora || diaHora.trim() === '') {
            console.log('❌ [Form Handler] No se seleccionó día y hora');
            alert('Por favor, selecciona un día y hora para la entrega.');
            $('#1756027935').focus();
            $('#botoncomprar').prop('disabled', false).val('COMPRAR 🛒');
            return false;
        }
        console.log('✅ [Form Handler] Día y hora válidos');

        // Mostrar overlay de carga
        console.log('⏳ [Form Handler] Mostrando overlay de carga...');
        $('.loading-overlay').addClass('visible');
        $('#botoncomprar').val('Procesando...').prop('disabled', true);
        console.log('✅ [Form Handler] Overlay visible y botón en estado "Procesando"');

        console.log('🎯 [Form Handler] Iniciando bloque try principal...');

        try {
            console.log('📊 [Form Handler] ENVIANDO EVENTO INITIATECHECKOUT...');
            // 📊 ENVIAR EVENTO INITIATECHECKOUT ANTES DEL ENVÍO
            const talleselegidos = $('#286442883').val();
            console.log('📊 [Form Handler] Productos para evento:', talleselegidos);
            
            if (talleselegidos && talleselegidos.trim() !== '') {
                const pairs = talleselegidos.split(', ').filter(Boolean);
                const totalItems = pairs.length;
                const unitPrice = totalItems === 1 ? 55000 : 42500; // Precios contrareembolso
                const totalValue = totalItems === 1 ? 55000 : totalItems * 42500;

                console.log('📊 [Form Handler] Detalles del evento:', { totalItems, unitPrice, totalValue });

                const eventData = {
                    content_type: 'product',
                    content_ids: ['contrareembolso-checkout'],
                    contents: [{
                        id: 'contrareembolso-checkout',
                        quantity: 1,
                        item_price: totalValue
                    }],
                    value: totalValue,
                    currency: 'ARS',
                    num_items: 1
                };

                // Enviar InitiateCheckout a Facebook
                if (typeof fbq !== 'undefined') {
                    const checkoutEventId = 'fb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                    fbq('track', 'InitiateCheckout', {
                        ...eventData,
                        event_id: checkoutEventId
                    });
                    console.log('✅ [Form Handler] InitiateCheckout enviado:', checkoutEventId);
                } else {
                    console.log('⚠️ [Form Handler] fbq no está definido, no se envía evento Facebook');
                }
            }

            console.log('📍 [Form Handler] Procesando dirección...');
            // Concatenar valores de dirección
            var calleAltura = $('#951592426').val();
            var entreCalles = $('#entre-calles').val();
            console.log('📍 [Form Handler] Calle:', calleAltura);
            console.log('📍 [Form Handler] Entre calles:', entreCalles);
            
            if (entreCalles && entreCalles.trim() !== '') {
                var direccionCompleta = calleAltura + " entre calles " + entreCalles;
                // Actualiza el valor del campo "Calle y Altura" con la dirección completa
                $('#951592426').val(direccionCompleta);
                console.log('📍 [Form Handler] Dirección completa guardada:', direccionCompleta);
            }

            console.log('🌐 [Form Handler] Preparando iframe y envío a Google...');
            // Preparar el formulario para envío a Google Forms
            const iframe = document.createElement('iframe');
            iframe.name = 'hidden_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            console.log('✅ [Form Handler] Iframe creado y agregado al DOM');

            // Configurar el formulario para enviar a través del iframe
            this.target = 'hidden_iframe';
            console.log('✅ [Form Handler] Formulario configurado para iframe');

            // Obtener los datos del formulario
            var formData = $(this).serialize();
            console.log('📋 [Form Handler] Datos del formulario serializados, longitud:', formData.length);

            console.log('🚀 [Form Handler] ENVIANDO A GOOGLE SCRIPTS...');
            console.log('⏰ [Form Handler] Timestamp de inicio de envío:', new Date().toISOString());
            
            // Configurar timeout para evitar bloqueo indefinido
            const timeoutId = setTimeout(() => {
                console.error('⏰ [Form Handler] TIMEOUT: El envío ha tardado más de 30 segundos');
                $('.loading-overlay').removeClass('visible');
                $('#botoncomprar').val('COMPRAR 🛒').prop('disabled', false);
                alert('El proceso está tardando más de lo normal. Por favor, intenta nuevamente.');
            }, 30000);

            // Enviar los datos al script de Google
            $.post('https://script.google.com/macros/s/AKfycbzGtF3OryfbupUz-8IlK1K4Ew0P0H1QSjabGnsHcswkbDzldXLWPDEdF26tLUkSjz6MSQ/exec', formData)
                .done(function(response) {
                    clearTimeout(timeoutId);
                    console.log('✅ [Form Handler] ¡ENVÍO EXITOSO! Respuesta recibida:', response);
                    console.log('⏰ [Form Handler] Timestamp de éxito:', new Date().toISOString());
                    
                    // Una vez que los datos se han enviado, redirigir a la URL correspondiente
                    var talleselegidos = $('#286442883').val();
                    var pairs = talleselegidos.split(', ').filter(Boolean);
                    var queryString = $('#286442883').serialize();

                    console.log('💾 [Form Handler] Guardando datos en localStorage...');
                    // Guardar los detalles del pedido en localStorage para la página de agradecimiento
                    localStorage.setItem('orderDetails', talleselegidos);
                    localStorage.setItem('customerName', $('#1211347450').val());

                    // 🔐 GENERAR TOKEN DE VALIDACIÓN PARA EVITAR EVENTOS FALSOS
                    const purchaseToken = 'purchase_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                    localStorage.setItem('valid_purchase_token', purchaseToken);
                    localStorage.setItem('purchase_timestamp', Date.now().toString());

                    console.log('✅ [Form Handler] Datos guardados en localStorage:', {
                        orderDetails: talleselegidos,
                        customerName: $('#1211347450').val(),
                        purchaseToken: purchaseToken
                    });

                    console.log('🔄 [Form Handler] Iniciando redirección en 100ms...');
                    // Pequeño retraso para asegurar que los datos se guarden correctamente antes de la redirección
                    setTimeout(function() {
                        console.log('🎯 [Form Handler] Redirigiendo a página de gracias...');
                        if(pairs.length === 1){
                            console.log('→ [Form Handler] Redirigiendo a: gracias-1par-c.html');
                            window.location = 'gracias-1par-c.html?' + queryString;
                        }
                        else if(pairs.length === 2){
                            console.log('→ [Form Handler] Redirigiendo a: gracias-2pares-c.html');
                            window.location = 'gracias-2pares-c.html?' + queryString;
                        }
                        else if(pairs.length >= 3){
                            console.log('→ [Form Handler] Redirigiendo a: gracias-3pares.html');
                            window.location = 'gracias-3pares.html?' + queryString;
                        }
                    }, 100);
                })
                .fail(function(xhr, status, error) {
                    clearTimeout(timeoutId);
                    console.error('❌ [Form Handler] ERROR EN ENVÍO:', {
                        status: status,
                        error: error,
                        responseText: xhr.responseText,
                        statusCode: xhr.status
                    });
                    console.log('⏰ [Form Handler] Timestamp de error:', new Date().toISOString());
                    
                    // En caso de error
                    alert('Ocurrió un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
                    $('.loading-overlay').removeClass('visible');
                    $('#botoncomprar').val('COMPRAR 🛒').prop('disabled', false);
                });

            console.log('✅ [Form Handler] Petición AJAX enviada, esperando respuesta...');
            return false;
            
        } catch (error) {
            console.error('❌ [Form Handler] ERROR EN BLOQUE TRY:', error);
            console.log('⏰ [Form Handler] Timestamp de error catch:', new Date().toISOString());
            
            alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
            $('.loading-overlay').removeClass('visible');
            $('#botoncomprar').val('COMPRAR 🛒').prop('disabled', false);
            return false;
        }
    });
    
    console.log('✅ [Form Handler] Event listener de formulario agregado correctamente');
});

console.log('🎉 [Form Handler] form-handler-contrareembolso.js cargado completamente');
