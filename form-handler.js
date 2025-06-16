// Función auxiliar para obtener cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
}

// Función para obtener parámetros de Facebook (FBC/FBP)
function getFacebookParams() {
    return {
        fbc: getCookie('_fbc') || localStorage.getItem('facebook_fbc') || '',
        fbp: getCookie('_fbp') || localStorage.getItem('facebook_fbp') || ''
    };
}

// Función para hashear email con SHA-256 (requerido por Meta) - Definida globalmente
async function hashEmail(email) {
    if (!email) return '';

    // Normalizar email: lowercase y trim
    const normalizedEmail = email.toLowerCase().trim();

    // Crear hash SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(normalizedEmail);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

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

// Función para generar un ID único
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Función para enviar datos al nuevo endpoint
async function enviarDatosAlNuevoEndpoint(form) {
    try {
        // Recopilar todos los datos del formulario
        const formData = $(form).serialize();

        // Enviar los datos al nuevo endpoint
        const response = await fetch('https://sswebhookss.odontolab.co/webhook/a5dcd3c9-48a3-46a1-a781-475737a634ca', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del endpoint: ${response.status}`);
        }

        console.log('Datos enviados correctamente al nuevo endpoint');
        return true;
    } catch (error) {
        console.error('Error al enviar datos al nuevo endpoint:', error);
        return false;
    }
}

// Función para manejar el envío del formulario
$(document).ready(function() {
    // Asegurarse de que el campo landingurl tenga la URL actual
    $('#1209868979').val(window.location.href);

    // Verificar los campos de productos al cargar la página
    console.log('Verificando campos de productos al cargar la página:');
    console.log('Campo #1471599855:', $('#1471599855').val());
    console.log('Campo #286442883:', $('#286442883').val());

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
            return false;
        }

        // Verificar WhatsApp
        const whatsappInput = document.getElementById('501094818');
        const errorElement = document.querySelector('.error-message[data-target="501094818"]');
        if (errorElement && !errorElement.classList.contains('valid')) {
            alert('Por favor, verifica tu número de WhatsApp antes de continuar.');
            if (whatsappInput) whatsappInput.focus();
            return false;
        }

        // Verificar que haya productos en el carrito
        // Usar el ID correcto según la página
        const selectedProducts = window.location.href.includes('contrareembolso') ?
            $('#286442883').val() : $('#1471599855').val();

        console.log('Productos seleccionados:', selectedProducts);

        if (!selectedProducts || selectedProducts.trim() === '') {
            alert('¡No has seleccionado ningún producto! Por favor, elige al menos un par.');
            return false;
        }

        // Mostrar overlay de carga
        $('.loading-overlay').addClass('visible');
        $('#botoncomprar').val('Procesando...').prop('disabled', true);

        try {
            // Para la página de contrareembolso, asumimos que el método de pago es contrareembolso
            const formaPago = window.location.href.includes('contrareembolso') ? 'contrareembolso' : $('#comoabona').val();
            const nombreComprador = $('#1460904554').val(); // Corregido: Usar el ID correcto del campo de nombre y apellido

            // Si es contrareembolso (pago en efectivo al recibir)
            if (formaPago === 'contrareembolso') {
                console.log('Procesando formulario de contrareembolso...');

                // Disparar evento de Facebook Pixel - InitiateCheckout (Tracking Dual)
                if (typeof fbq !== 'undefined') {
                    // Función asíncrona para manejar el tracking de Facebook
                    (async function() {
                        try {
                            console.log('Enviando evento InitiateCheckout a Facebook Pixel (Contrareembolso)');

                            // Generar Event ID único para deduplicación
                            const eventId = 'fb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);


                            // Calcular datos del carrito para contrareembolso
                            const talleselegidos = window.location.href.includes('contrareembolso') ?
                                $('#286442883').val() : $('#1471599855').val();
                            const pairs = talleselegidos.split(', ').filter(Boolean);
                            const totalItems = pairs.length;
                            const unitPrice = totalItems === 1 ? 60000 : 42500;
                            const totalValue = totalItems === 1 ? 60000 : totalItems * 42500;

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

                            // 1. Enviar a Facebook (Cliente)
                            fbq('track', 'InitiateCheckout', {
                                ...eventData,
                                event_id: eventId
                            });

                            // 2. Obtener parámetros de Facebook (FBC/FBP)
                            const fbParams = getFacebookParams();

                            // 3. Función para obtener timestamp correcto para Argentina (UTC-3)
                            function getArgentinaTimestamp() {
                                const now = new Date();
                                const argentinaTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
                                return Math.floor(argentinaTime.getTime() / 1000);
                            }

                            // 4. Función para obtener IP del cliente
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

                            const clientIP = await getClientIP();

                            // 6. Obtener y hashear email del cliente
                            const hashedEmail = await hashEmail(customerEmail);

                            // 7. Enviar al servidor (N8N) en formato para Facebook Events API
                            const facebookEventData = {
                                event_name: 'InitiateCheckout',
                                event_id: eventId,
                                event_time: getArgentinaTimestamp(), // Timestamp correcto para Argentina
                                action_source: 'website',
                                event_source_url: window.location.href,
                                user_data: {
                                    client_ip_address: clientIP, // IP del cliente obtenida
                                    client_user_agent: navigator.userAgent,
                                    em: hashedEmail, // Email hasheado con SHA-256 (requerido por Meta)
                                    fbc: fbParams.fbc,
                                    fbp: fbParams.fbp
                                },
                                custom_data: eventData
                            };

                            // Enviar al webhook en formato N8N
                            fetch('https://sswebhookss.odontolab.co/webhook/9dfb840b-2a21-4277-8aec-1666bfaaac89', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    data: [facebookEventData]
                                })
                            }).then(() => {
                                console.log('✅ InitiateCheckout (Contrareembolso) enviado - IP:', clientIP, 'FBC:', fbParams.fbc, 'FBP:', fbParams.fbp);
                            }).catch(error => {
                                console.error('Error enviando InitiateCheckout al servidor:', error);
                            });
                        } catch (error) {
                            console.error('Error en el tracking de Facebook (Contrareembolso):', error);
                        }
                    })();
                }

                // Procesar los productos seleccionados
                var talleselegidos = window.location.href.includes('contrareembolso') ?
                    $('#286442883').val() : $('#1471599855').val();
                var pairs = talleselegidos.split(', '); // split the input by ", " (comma and space)

                // remove empty elements from the array
                pairs = pairs.filter(Boolean);

                // store the values in an array
                var values = [];
                var montoacobrar;
                var costodepares = 0;

                for (var i = 0; i < pairs.length; i++) {
                    var parts = pairs[i].split('-');
                    if (parts.length < 2) {
                        // the input is not properly formatted, skip this pair
                        continue;
                    }
                    var talle = parts[0].trim(); // remove leading and trailing spaces from the size value
                    var modelo = parts[1];
                    var color = parts.slice(2).join(' '); // use all the words as the color

                    var modeloId;
                    var costo;
                    switch(modelo) {
                        case 'roma':
                            modeloId = '#4016';
                            costo = 16000;
                            break;
                        case 'venecia':
                            modeloId = '#4015';
                            costo = 16000;
                            break;
                        case 'siena':
                            modeloId = '#SIENA';
                            costo = 3700;
                            break;
                        case 'paris':
                            modeloId = '#PARIS';
                            costo = 3700;
                            break;
                        default:
                            modeloId = 'desconocido';
                            break;
                    }
                    costodepares += costo;
                    var modelosangies = 'Talle: ' + talle + ' Modelo: ' + modeloId + ' Color: ' + color;
                    values.push(modelosangies);
                }

                // join the array elements with the desired separator
                var output = values.join(' || '); // use " || " as the separator between pairs

                // calcular monto a cobrar para contrareembolso
                if (pairs.length == 0) {
                    montoacobrar = 0;
                } else if (pairs.length == 1) {
                    montoacobrar = 60000; // Precio para 1 par en contrareembolso
                } else if (pairs.length == 2) {
                    montoacobrar = 85000; // Precio para 2 pares en contrareembolso
                } else {
                    montoacobrar = 0;
                }

                // asignar valores a los inputs
                $('#1885018612').val(output);
                $('#1715320252').val(montoacobrar);
                $('#736134777').val(costodepares);

                console.log('Campos ocultos actualizados:');
                console.log('1885018612 (detalles):', output);
                console.log('1715320252 (monto):', montoacobrar);
                console.log('736134777 (costo):', costodepares);
                console.log('286442883 (productos):', talleselegidos);

                // Concatenar valores de dirección
                var calleAltura = $('#394819614').val();
                var entreCalles = $('#entre-calles').val() || '';
                var direccionCompleta = calleAltura;
                if (entreCalles) {
                    direccionCompleta += " entre calles " + entreCalles;
                }

                // Actualiza el valor del campo "Calle y Altura" con la dirección completa
                $('#394819614').val(direccionCompleta);

                // Preparar el formulario para envío a Google Forms
                const iframe = document.createElement('iframe');
                iframe.name = 'hidden_iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                // Configurar el formulario para enviar a través del iframe
                this.target = 'hidden_iframe';

                // Enviar el formulario al nuevo endpoint para contrareembolso
                var formData = $(this).serialize();

                $.post('https://sswebhookss.odontolab.co/webhook/1e214d4e-5481-4ded-8936-c63ff9ce7743', formData)
                    .done(function() {
                        console.log('Formulario enviado al nuevo endpoint (Contrareembolso)');

                        // Guardar detalles del pedido en localStorage
                        localStorage.setItem('orderDetails', output);
                        localStorage.setItem('rawProducts', talleselegidos);

                        // También guardar el nombre del cliente si está disponible
                        if ($('#1211347450').val()) {
                            localStorage.setItem('customerName', $('#1211347450').val());
                        }

                        // 🔐 GENERAR TOKEN DE VALIDACIÓN PARA EVITAR EVENTOS FALSOS
                        const purchaseToken = 'purchase_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                        localStorage.setItem('valid_purchase_token', purchaseToken);
                        localStorage.setItem('purchase_timestamp', Date.now().toString());

                        // Redireccionar a la página de gracias
                        var queryString = $('#286442883').serialize();
                        var pairs = talleselegidos.split(', ').filter(Boolean);
                        console.log('Redireccionando con', pairs.length, 'productos');
                        console.log('Detalles guardados en localStorage:', output);

                        // Determinar la URL de redirección
                        var redirectUrl;
                        if(pairs.length === 1){
                            redirectUrl = 'http://www.rositarococo.com/gracias-1par-c.html?' + queryString;
                        }
                        else if(pairs.length === 2){
                            redirectUrl = 'http://www.rositarococo.com/gracias-2pares-c.html?' + queryString;
                        }
                        else if(pairs.length >= 3){
                            redirectUrl = 'http://www.rositarococo.com/gracias-3pares.html?' + queryString;
                        }
                        else {
                            // Fallback por si no se detectan productos
                            redirectUrl = 'http://www.rositarococo.com/gracias-1par-c.html?' + queryString;
                        }

                        console.log('Redireccionando a:', redirectUrl);

                        // Intentar redireccionar de varias formas para asegurar que funcione
                        try {
                            // Método 1: window.location.href
                            window.location.href = redirectUrl;

                            // Método 2: setTimeout como respaldo
                            setTimeout(function() {
                                console.log('Intentando redirección con setTimeout');
                                window.location = redirectUrl;
                            }, 1000);

                            // Método 3: crear un enlace y hacer clic en él
                            setTimeout(function() {
                                console.log('Intentando redirección con enlace');
                                var link = document.createElement('a');
                                link.href = redirectUrl;
                                link.style.display = 'none';
                                document.body.appendChild(link);
                                link.click();
                            }, 2000);
                        } catch (e) {
                            console.error('Error al redireccionar:', e);
                            alert('Hubo un problema al redireccionar. Por favor, haz clic en Aceptar para continuar.');
                            window.location = redirectUrl;
                        }
                    })
                    .fail(function(error) {
                        console.error('Error al enviar el formulario:', error);
                        alert('Hubo un problema al enviar tu pedido. Por favor, intenta nuevamente.');
                        $('.loading-overlay').removeClass('visible');
                        $('#botoncomprar').val('COMPRAR 🛒').prop('disabled', false);
                    });

                return false;
            }

            // Si es transferencia bancaria (CBU)
            if (formaPago === 'cbu') {
                // Disparar evento de Facebook Pixel - InitiateCheckout (CBU - Tracking Dual)
                if (typeof fbq !== 'undefined') {
                    // Función asíncrona para manejar el tracking de Facebook
                    (async function() {
                        try {
                            console.log('Enviando evento InitiateCheckout a Facebook Pixel (CBU)');

                            // Generar Event ID único para deduplicación
                            const eventId = 'fb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

                            // Guardar email en localStorage para eventos de Facebook
                            const customerEmail = $('#1465946249').val() || $('#entry\\.1465946249').val();
                            if (customerEmail) {
                                localStorage.setItem('customer_email', customerEmail);
                            }

                            // Calcular datos del carrito para CBU
                            const productsValue = window.location.href.includes('contrareembolso') ?
                                $('#286442883').val() : $('#1471599855').val();
                            const pairs = productsValue.split(', ').filter(Boolean);
                            const totalItems = pairs.length;
                            const totalValue = totalItems === 1 ? 63000 : 99000; // Precios CBU correctos

                            const eventData = {
                                content_type: 'product',
                                content_ids: ['cbu-checkout'],
                                contents: [{
                                    id: 'cbu-checkout',
                                    quantity: 1,
                                    item_price: totalValue
                                }],
                                value: totalValue,
                                currency: 'ARS',
                                num_items: 1
                            };

                            // 1. Enviar a Facebook (Cliente)
                            fbq('track', 'InitiateCheckout', {
                                ...eventData,
                                event_id: eventId
                            });

                            // 2. Obtener parámetros de Facebook (FBC/FBP)
                            const fbParams = getFacebookParams();

                            // 3. Función para obtener timestamp correcto para Argentina (UTC-3)
                            function getArgentinaTimestamp() {
                                const now = new Date();
                                const argentinaTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
                                return Math.floor(argentinaTime.getTime() / 1000);
                            }

                            // 4. Función para obtener IP del cliente
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

                            const clientIP = await getClientIP();

                            // 6. Obtener y hashear email del cliente
                            const hashedEmail = await hashEmail(customerEmail);

                            // 7. Enviar al servidor (N8N) en formato para Facebook Events API
                            const facebookEventData = {
                                event_name: 'InitiateCheckout',
                                event_id: eventId,
                                event_time: getArgentinaTimestamp(), // Timestamp correcto para Argentina
                                action_source: 'website',
                                event_source_url: window.location.href,
                                user_data: {
                                    client_ip_address: clientIP, // IP del cliente obtenida
                                    client_user_agent: navigator.userAgent,
                                    em: hashedEmail, // Email hasheado con SHA-256 (requerido por Meta)
                                    fbc: fbParams.fbc,
                                    fbp: fbParams.fbp
                                },
                                custom_data: eventData
                            };

                            // Enviar al webhook en formato N8N
                            fetch('https://sswebhookss.odontolab.co/webhook/9dfb840b-2a21-4277-8aec-1666bfaaac89', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    data: [facebookEventData]
                                })
                            }).then(() => {
                                console.log('✅ InitiateCheckout (CBU) enviado - IP:', clientIP, 'FBC:', fbParams.fbc, 'FBP:', fbParams.fbp);
                            }).catch(error => {
                                console.error('Error enviando InitiateCheckout CBU al servidor:', error);
                            });
                        } catch (error) {
                            console.error('Error en el tracking de Facebook (CBU):', error);
                        }
                    })();
                }

                // Verificar si estamos en la página de contrareembolso
                const esContrareembolso = window.location.href.includes('contrareembolso');

                if (esContrareembolso) {
                    // Mantener el comportamiento original para contrareembolso
                    // Preparar el formulario para envío a Google Forms
                    const iframe = document.createElement('iframe');
                    iframe.name = 'hidden_iframe';
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);

                    // Configurar el formulario para enviar a través del iframe
                    this.target = 'hidden_iframe';
                    this.submit();

                    console.log('Formulario enviado a Google Forms (CBU - Contrareembolso)');
                } else {
                    // Para index.html, enviar al nuevo endpoint
                    console.log('Enviando datos al nuevo endpoint (CBU)');
                    const enviado = await enviarDatosAlNuevoEndpoint(this);

                    if (!enviado) {
                        alert('Hubo un problema al enviar tu pedido. Por favor, intenta nuevamente.');
                        $('.loading-overlay').removeClass('visible');
                        $('#botoncomprar').val('Confirmar y Pagar 🛒').prop('disabled', false);
                        return false;
                    }

                    console.log('Datos enviados correctamente al nuevo endpoint (CBU)');
                }

                // Redireccionar a la página de transferencia CBU (mismo comportamiento para ambos casos)
                setTimeout(function() {
                    // Asegurarse de usar el valor correcto para contar los pares
                    const productsValue = window.location.href.includes('contrareembolso') ?
                        $('#286442883').val() : $('#1471599855').val();

                    const pairCount = productsValue.split(',').length;
                    console.log('Número de pares para CBU:', pairCount);

                    const redirectUrl = pairCount >= 2 ?
                        'https://rositarococo.com/transferenciacbu-2pares.html' :
                        'https://rositarococo.com/transferenciacbu-1par.html';

                    window.location.href = redirectUrl;
                }, 1000);

                return false;
            }

            // Si es MercadoPago o tarjeta
            if (formaPago === 'tarjeta' || formaPago === 'mercadopago') {
                // Disparar evento de Facebook Pixel - InitiateCheckout (MercadoPago/Tarjeta - Tracking Dual)
                if (typeof fbq !== 'undefined') {
                    // Función asíncrona para manejar el tracking de Facebook
                    (async function() {
                        try {
                            console.log('Enviando evento InitiateCheckout a Facebook Pixel (MercadoPago/Tarjeta)');

                            // Generar Event ID único para deduplicación
                            const eventId = 'fb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

                            // Guardar email en localStorage para eventos de Facebook
                            const customerEmail = $('#1465946249').val() || $('#entry\\.1465946249').val();
                            if (customerEmail) {
                                localStorage.setItem('customer_email', customerEmail);
                            }

                            // Calcular datos del carrito para MercadoPago/Tarjeta
                            const productsValue = window.location.href.includes('contrareembolso') ?
                                $('#286442883').val() : $('#1471599855').val();
                            const pairs = productsValue.split(', ').filter(Boolean);
                            const totalItems = pairs.length;
                            const unitPrice = totalItems === 1 ? 70000 : 55000; // Precios previo pago
                            const totalValue = totalItems === 1 ? 70000 : totalItems * 55000;

                            const eventData = {
                                content_type: 'product',
                                content_ids: ['mercadopago-checkout'],
                                contents: [{
                                    id: 'mercadopago-checkout',
                                    quantity: 1,
                                    item_price: totalValue
                                }],
                                value: totalValue,
                                currency: 'ARS',
                                num_items: 1
                            };

                            // 1. Enviar a Facebook (Cliente)
                            fbq('track', 'InitiateCheckout', {
                                ...eventData,
                                event_id: eventId
                            });

                            // 2. Obtener parámetros de Facebook (FBC/FBP)
                            const fbParams = getFacebookParams();

                            // 3. Función para obtener timestamp correcto para Argentina (UTC-3)
                            function getArgentinaTimestamp() {
                                const now = new Date();
                                const argentinaTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
                                return Math.floor(argentinaTime.getTime() / 1000);
                            }

                            // 4. Función para obtener IP del cliente
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

                            const clientIP = await getClientIP();

                            // 6. Obtener y hashear email del cliente
                            const hashedEmail = await hashEmail(customerEmail);

                            // 7. Enviar al servidor (N8N) en formato para Facebook Events API
                            const facebookEventData = {
                                event_name: 'InitiateCheckout',
                                event_id: eventId,
                                event_time: getArgentinaTimestamp(), // Timestamp correcto para Argentina
                                action_source: 'website',
                                event_source_url: window.location.href,
                                user_data: {
                                    client_ip_address: clientIP, // IP del cliente obtenida
                                    client_user_agent: navigator.userAgent,
                                    em: hashedEmail, // Email hasheado con SHA-256 (requerido por Meta)
                                    fbc: fbParams.fbc,
                                    fbp: fbParams.fbp
                                },
                                custom_data: eventData
                            };

                            // Enviar al webhook en formato N8N
                            fetch('https://sswebhookss.odontolab.co/webhook/9dfb840b-2a21-4277-8aec-1666bfaaac89', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    data: [facebookEventData]
                                })
                            }).then(() => {
                                console.log('✅ InitiateCheckout (MercadoPago/Tarjeta) enviado - IP:', clientIP, 'FBC:', fbParams.fbc, 'FBP:', fbParams.fbp);
                            }).catch(error => {
                                console.error('Error enviando InitiateCheckout MercadoPago al servidor:', error);
                            });
                        } catch (error) {
                            console.error('Error en el tracking de Facebook (MercadoPago):', error);
                        }
                    })();
                }

                // Obtener el precio basado en la cantidad de productos
                // Asegurarse de usar el valor correcto para contar los pares
                const productsValue = window.location.href.includes('contrareembolso') ?
                    $('#286442883').val() : $('#1471599855').val();

                const pairCount = productsValue.split(',').length;
                console.log('Número de pares para MercadoPago:', pairCount);

                const monto = pairCount >= 2 ? 110000 : 70000;
                console.log('Usando monto:', monto);

                // Verificar si estamos en la página de contrareembolso
                const esContrareembolso = window.location.href.includes('contrareembolso');

                try {
                    // Construir la URL para el webhook de MercadoPago
                    const webhookUrl = "https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30";
                    console.log('Llamando al webhook:', webhookUrl);
                    console.log('Datos del comprador:', nombreComprador);

                    // Preparar el cuerpo de la solicitud
                    const requestBody = {
                        comprador: nombreComprador,
                        monto: monto
                    };
                    console.log('Enviando datos a MercadoPago:', requestBody);

                    // Llamar al webhook para generar el link de pago
                    const response = await fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                    });

                    if (!response.ok) {
                        throw new Error(`Error en la respuesta del webhook: ${response.status}`);
                    }

                    const responseText = await response.text();
                    const jsonData = JSON.parse(responseText);
                    const mercadoPagoUrl = jsonData.linkpersonalizadomp;

                    if (!mercadoPagoUrl) {
                        throw new Error('No se encontró el link de MercadoPago en la respuesta');
                    }

                    // Guardar el link en el formulario
                    if (document.getElementById('link-mercadopago')) {
                        $('#link-mercadopago').val(mercadoPagoUrl);
                        document.getElementById('link-mercadopago').value = mercadoPagoUrl;
                    }

                    // Enviar los datos del formulario
                    if (esContrareembolso) {
                        // Para contrareembolso, mantener el comportamiento original
                        // Enviar el formulario a Google Forms usando un iframe oculto
                        const iframe = document.createElement('iframe');
                        iframe.name = 'hidden_iframe';
                        iframe.style.display = 'none';
                        document.body.appendChild(iframe);

                        // Configurar el formulario para enviar a través del iframe
                        this.target = 'hidden_iframe';
                        this.submit();

                        console.log('Formulario enviado a Google Forms (MercadoPago - Contrareembolso)');
                    } else {
                        // Para index.html, enviar al nuevo endpoint
                        console.log('Enviando datos al nuevo endpoint (MercadoPago)');
                        const enviado = await enviarDatosAlNuevoEndpoint(this);

                        if (!enviado) {
                            throw new Error('Error al enviar datos al nuevo endpoint');
                        }

                        console.log('Datos enviados correctamente al nuevo endpoint (MercadoPago)');
                    }

                    // Redireccionar a MercadoPago después de enviar el formulario
                    // Mantener el spinner visible durante la redirección
                    console.log('Redireccionando a MercadoPago...');

                    // Asegurarnos de que el overlay de carga permanezca visible
                    $('.loading-overlay').addClass('visible');

                    // Usar setTimeout para dar tiempo a que se muestre el spinner
                    setTimeout(function() {
                        window.location.href = mercadoPagoUrl;
                    }, 500);

                } catch (error) {
                    console.error('Error al procesar el pago:', error);
                    alert('Hubo un problema al procesar el pago. Por favor, intenta nuevamente o elige otro método de pago.');
                    $('.loading-overlay').removeClass('visible');
                    $('#botoncomprar').val('Confirmar y Pagar 🛒').prop('disabled', false);
                }

                return false;
            }

            // Si llegamos aquí, es porque no se seleccionó un método de pago válido
            if (!window.location.href.includes('contrareembolso')) {
                alert('Por favor, selecciona un método de pago válido.');
                $('.loading-overlay').removeClass('visible');
                $('#botoncomprar').val('Confirmar y Pagar 🛒').prop('disabled', false);
            } else {
                // Si estamos en la página de contrareembolso pero no se detectó correctamente
                console.log('Detectada página de contrareembolso, procesando como pago en efectivo');

                // Disparar evento de Facebook Pixel - InitiateCheckout (Fallback Contrareembolso - Tracking Dual)
                if (typeof fbq !== 'undefined') {
                    console.log('Enviando evento InitiateCheckout a Facebook Pixel (Fallback Contrareembolso)');

                    // Generar Event ID único para deduplicación
                    const eventId = 'fb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

                    // Calcular datos del carrito para contrareembolso fallback
                    const talleselegidos = $('#286442883').val() || $('#1471599855').val();
                    const pairs = talleselegidos.split(', ').filter(Boolean);
                    const totalItems = pairs.length;
                    const unitPrice = totalItems === 1 ? 60000 : 42500;
                    const totalValue = totalItems === 1 ? 60000 : totalItems * 42500;

                    const eventData = {
                        content_type: 'product',
                        content_ids: ['contrareembolso-fallback'],
                        contents: [{
                            id: 'contrareembolso-fallback',
                            quantity: totalItems,
                            item_price: unitPrice
                        }],
                        value: totalValue,
                        currency: 'ARS',
                        num_items: totalItems
                    };

                    // 1. Enviar a Facebook (Cliente)
                    fbq('track', 'InitiateCheckout', {
                        ...eventData,
                        event_id: eventId
                    });

                    // 2. Obtener parámetros de Facebook (FBC/FBP)
                    const fbParams = getFacebookParams();

                    // 3. Enviar al servidor (N8N) en formato para Facebook Events API
                    const facebookEventData = {
                        event_name: 'InitiateCheckout',
                        event_id: eventId,
                        event_time: Math.floor(Date.now() / 1000),
                        action_source: 'website',
                        event_source_url: window.location.href,
                        user_data: {
                            client_ip_address: '',
                            client_user_agent: navigator.userAgent,
                            fbc: fbParams.fbc,
                            fbp: fbParams.fbp
                        },
                        custom_data: eventData
                    };

                    // Enviar al webhook en formato N8N
                    fetch('https://sswebhookss.odontolab.co/webhook/9dfb840b-2a21-4277-8aec-1666bfaaac89', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: [facebookEventData]
                        })
                    }).then(() => {
                        console.log('✅ InitiateCheckout (Fallback) enviado - FBC:', fbParams.fbc, 'FBP:', fbParams.fbp);
                    }).catch(error => {
                        console.error('Error enviando InitiateCheckout Fallback al servidor:', error);
                    });
                }

                // Usar el mismo código que en la sección de contrareembolso
                // No es necesario actualizar campos ocultos para compatibilidad

                // Procesar los productos seleccionados
                var talleselegidos = window.location.href.includes('contrareembolso') ?
                    $('#286442883').val() : $('#1471599855').val();
                var pairs = talleselegidos.split(', '); // split the input by ", " (comma and space)

                // remove empty elements from the array
                pairs = pairs.filter(Boolean);

                // store the values in an array
                var values = [];
                var montoacobrar;
                var costodepares = 0;

                for (var i = 0; i < pairs.length; i++) {
                    var parts = pairs[i].split('-');
                    if (parts.length < 2) {
                        // the input is not properly formatted, skip this pair
                        continue;
                    }
                    var talle = parts[0].trim(); // remove leading and trailing spaces from the size value
                    var modelo = parts[1];
                    var color = parts.slice(2).join(' '); // use all the words as the color

                    var modeloId;
                    var costo;
                    switch(modelo) {
                        case 'roma':
                            modeloId = '#4016';
                            costo = 16000;
                            break;
                        case 'venecia':
                            modeloId = '#4015';
                            costo = 16000;
                            break;
                        case 'siena':
                            modeloId = '#SIENA';
                            costo = 3700;
                            break;
                        case 'paris':
                            modeloId = '#PARIS';
                            costo = 3700;
                            break;
                        default:
                            modeloId = 'desconocido';
                            break;
                    }
                    costodepares += costo;
                    var modelosangies = 'Talle: ' + talle + ' Modelo: ' + modeloId + ' Color: ' + color;
                    values.push(modelosangies);
                }

                // join the array elements with the desired separator
                var output = values.join(' || '); // use " || " as the separator between pairs

                // calcular monto a cobrar para contrareembolso
                if (pairs.length == 0) {
                    montoacobrar = 0;
                } else if (pairs.length == 1) {
                    montoacobrar = 60000; // Precio para 1 par en contrareembolso
                } else if (pairs.length == 2) {
                    montoacobrar = 85000; // Precio para 2 pares en contrareembolso
                } else {
                    montoacobrar = 0;
                }

                // asignar valores a los inputs
                $('#1885018612').val(output);
                $('#1715320252').val(montoacobrar);
                $('#736134777').val(costodepares);

                console.log('Campos ocultos actualizados:');
                console.log('1885018612 (detalles):', output);
                console.log('1715320252 (monto):', montoacobrar);
                console.log('736134777 (costo):', costodepares);
                console.log('286442883 (productos):', talleselegidos);

                // Concatenar valores de dirección
                var calleAltura = $('#394819614').val();
                var entreCalles = $('#entre-calles').val() || '';
                var direccionCompleta = calleAltura;
                if (entreCalles) {
                    direccionCompleta += " entre calles " + entreCalles;
                }

                // Actualiza el valor del campo "Calle y Altura" con la dirección completa
                $('#394819614').val(direccionCompleta);

                // Preparar el formulario para envío a Google Forms
                const iframe = document.createElement('iframe');
                iframe.name = 'hidden_iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                // Configurar el formulario para enviar a través del iframe
                this.target = 'hidden_iframe';

                // Enviar el formulario al nuevo endpoint para contrareembolso
                var formData = $(this).serialize();

                $.post('https://sswebhookss.odontolab.co/webhook/1e214d4e-5481-4ded-8936-c63ff9ce7743', formData)
                    .done(function() {
                        console.log('Formulario enviado al nuevo endpoint (Contrareembolso)');

                        // Guardar detalles del pedido en localStorage
                        localStorage.setItem('orderDetails', output);
                        localStorage.setItem('rawProducts', talleselegidos);

                        // También guardar el nombre del cliente si está disponible
                        if ($('#1211347450').val()) {
                            localStorage.setItem('customerName', $('#1211347450').val());
                        }

                        // Redireccionar a la página de gracias
                        var queryString = $('#286442883').serialize();
                        var pairs = talleselegidos.split(', ').filter(Boolean);
                        console.log('Redireccionando con', pairs.length, 'productos');
                        console.log('Detalles guardados en localStorage:', output);

                        // Determinar la URL de redirección
                        var redirectUrl;
                        if(pairs.length === 1){
                            redirectUrl = 'http://www.rositarococo.com/gracias-1par-c.html?' + queryString;
                        }
                        else if(pairs.length === 2){
                            redirectUrl = 'http://www.rositarococo.com/gracias-2pares-c.html?' + queryString;
                        }
                        else if(pairs.length >= 3){
                            redirectUrl = 'http://www.rositarococo.com/gracias-3pares.html?' + queryString;
                        }
                        else {
                            // Fallback por si no se detectan productos
                            redirectUrl = 'http://www.rositarococo.com/gracias-1par-c.html?' + queryString;
                        }

                        console.log('Redireccionando a:', redirectUrl);

                        // Intentar redireccionar de varias formas para asegurar que funcione
                        try {
                            // Método 1: window.location.href
                            window.location.href = redirectUrl;

                            // Método 2: setTimeout como respaldo
                            setTimeout(function() {
                                console.log('Intentando redirección con setTimeout');
                                window.location = redirectUrl;
                            }, 1000);

                            // Método 3: crear un enlace y hacer clic en él
                            setTimeout(function() {
                                console.log('Intentando redirección con enlace');
                                var link = document.createElement('a');
                                link.href = redirectUrl;
                                link.style.display = 'none';
                                document.body.appendChild(link);
                                link.click();
                            }, 2000);
                        } catch (e) {
                            console.error('Error al redireccionar:', e);
                            alert('Hubo un problema al redireccionar. Por favor, haz clic en Aceptar para continuar.');
                            window.location = redirectUrl;
                        }
                    })
                    .fail(function(error) {
                        console.error('Error al enviar el formulario:', error);
                        alert('Hubo un problema al enviar tu pedido. Por favor, intenta nuevamente.');
                        $('.loading-overlay').removeClass('visible');
                        $('#botoncomprar').val('COMPRAR 🛒').prop('disabled', false);
                    });

                return false;
            }

        } catch (error) {
            console.error('Error en el proceso de envío:', error);
            alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
            $('.loading-overlay').removeClass('visible');
            $('#botoncomprar').val('Confirmar y Pagar 🛒').prop('disabled', false);
        }

        return false;
    });
});
