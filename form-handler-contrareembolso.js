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

// Función para manejar el envío del formulario
$(document).ready(function() {
    // Asegurarse de que el campo landingurl tenga la URL actual
    $('#1209868979').val(window.location.href);

    // Manejar el envío del formulario
    $('#bootstrapForm').submit(async function(event) {
        event.preventDefault();

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
            $('#botoncomprar').prop('disabled', false).val('COMPRAR 🛒');
            return false;
        }

        // Verificar WhatsApp
        const whatsappInput = document.getElementById('53830725');
        const errorElement = document.querySelector('.error-message[data-target="53830725"]');
        if (errorElement && !errorElement.classList.contains('valid')) {
            alert('Por favor, verifica tu número de WhatsApp antes de continuar.');
            if (whatsappInput) whatsappInput.focus();
            $('#botoncomprar').prop('disabled', false).val('COMPRAR 🛒');
            return false;
        }

        // Verificar que haya productos en el carrito
        const selectedProducts = $('#286442883').val();
        if (!selectedProducts || selectedProducts.trim() === '') {
            alert('¡No has seleccionado ningún producto! Por favor, elige al menos un par.');
            $('#botoncomprar').prop('disabled', false).val('COMPRAR 🛒');
            return false;
        }

        // Verificar que se haya seleccionado un día y hora de entrega
        const diaHora = $('#1756027935').val();
        if (!diaHora || diaHora.trim() === '') {
            alert('Por favor, selecciona un día y hora para la entrega.');
            $('#1756027935').focus();
            $('#botoncomprar').prop('disabled', false).val('COMPRAR 🛒');
            return false;
        }

        // Mostrar overlay de carga
        $('.loading-overlay').addClass('visible');
        $('#botoncomprar').val('Procesando...').prop('disabled', true);

        try {
            // Concatenar valores de dirección
            var calleAltura = $('#951592426').val();
            var entreCalles = $('#entre-calles').val();
            if (entreCalles && entreCalles.trim() !== '') {
                var direccionCompleta = calleAltura + " entre calles " + entreCalles;
                // Actualiza el valor del campo "Calle y Altura" con la dirección completa
                $('#951592426').val(direccionCompleta);
            }

            // Preparar el formulario para envío a Google Forms
            const iframe = document.createElement('iframe');
            iframe.name = 'hidden_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            // Configurar el formulario para enviar a través del iframe
            this.target = 'hidden_iframe';

            // Obtener los datos del formulario
            var formData = $(this).serialize();

            // Enviar los datos al script de Google
            $.post('https://script.google.com/macros/s/AKfycbzGtF3OryfbupUz-8IlK1K4Ew0P0H1QSjabGnsHcswkbDzldXLWPDEdF26tLUkSjz6MSQ/exec', formData)
                .done(function() {
                    // Una vez que los datos se han enviado, redirigir a la URL correspondiente
                    var talleselegidos = $('#286442883').val();
                    var pairs = talleselegidos.split(', ').filter(Boolean);
                    var queryString = $('#286442883').serialize();

                    // Guardar los detalles del pedido en localStorage para la página de agradecimiento
                    localStorage.setItem('orderDetails', talleselegidos);
                    localStorage.setItem('customerName', $('#1211347450').val());
                    console.log('Datos guardados en localStorage:', {
                        orderDetails: talleselegidos,
                        customerName: $('#1211347450').val()
                    });

                    // Pequeño retraso para asegurar que los datos se guarden correctamente antes de la redirección
                    setTimeout(function() {
                        if(pairs.length === 1){
                            window.location = 'http://www.rositarococo.com/gracias-1par-c.html?' + queryString;
                        }
                        else if(pairs.length === 2){
                            window.location = 'http://www.rositarococo.com/gracias-2pares-c.html?' + queryString;
                        }
                        else if(pairs.length >= 3){
                            window.location = 'http://www.rositarococo.com/gracias-3pares.html?' + queryString;
                        }
                    }, 100);
                })
                .fail(function() {
                    // En caso de error
                    alert('Ocurrió un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
                    $('.loading-overlay').removeClass('visible');
                    $('#botoncomprar').val('COMPRAR 🛒').prop('disabled', false);
                });

            return false;
        } catch (error) {
            console.error('Error en el proceso de envío:', error);
            alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
            $('.loading-overlay').removeClass('visible');
            $('#botoncomprar').val('COMPRAR 🛒').prop('disabled', false);
            return false;
        }
    });
});
