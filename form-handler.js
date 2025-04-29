// --- Form Submission Logic for Contrareembolso ---
$(document).ready(function() {
    $('#bootstrapForm').submit(function (event) {
        event.preventDefault(); // prevent the form from submitting normally
        var $submitButton = $('#botoncomprar');
        $submitButton.attr('value', 'Espere...');
        $submitButton.attr('disabled', 'true');

        // Bot detection - Multiple methods (Keep from original form-handler.js)
        // 1. Honeypot field check
        if ($('#website').val() !== '') {
            console.log('Bot detected via honeypot field.');
            return false;
        }

        // 2. Landing URL check - Real users will always have this field filled
        // Note: The ID for landing URL is #1209868979 in index-contrarreembolso.html
        // and #227154461 in contrareembolso.html. We'll use the one from index-contrarreembolso.html
        // and ensure the hidden field name matches the Apps Script expectation (entry.227154461).
        const landingUrl = $('#1209868979').val();
        if (!landingUrl || landingUrl.trim() === '') {
            console.log('Bot detected: Empty landing URL field.');
            return false;
        }
         // Ensure the correct hidden field for the URL is populated
        $('#227154461').val(window.location.href);


        // Form validation (Keep from original form-handler.js)
        if (!this.checkValidity()) {
            alert('Por favor, completa todos los campos obligatorios (*) correctamente.');
            $submitButton.val('Confirmar Pedido Contrareembolso 🛒').prop('disabled', false); // Updated button text
            $(this).find(':invalid').first().focus();
            return false;
        }

        // Check WhatsApp validation status before submitting (Keep from original form-handler.js)
        const whatsappInput = document.getElementById('53830725'); // ID for WhatsApp input
        const errorElement = document.querySelector('.error-message[data-target="53830725"]'); // Get the specific error element for WhatsApp
        if (!whatsappInput || !errorElement || !errorElement.classList.contains('valid')) {
            alert('Por favor, verifica tu número de WhatsApp antes de continuar.');
            $submitButton.val('Confirmar Pedido Contrareembolso 🛒').prop('disabled', false); // Updated button text
            if (whatsappInput) whatsappInput.focus();
            return false;
        }


        // Get selected items count for redirection (Keep from original form-handler.js, but use correct ID)
        const talleselegidos = $('#286442883').val(); // Updated ID
        const words = talleselegidos ? talleselegidos.split(',').filter(Boolean) : [];
        const pairCount = words.length;

         if (pairCount === 0) {
             alert('¡No has seleccionado ningún par! Elige tus modelos y talles.');
             $submitButton.val('Confirmar Pedido Contrareembolso 🛒').prop('disabled', false); // Updated button text
             $('html, body').animate({
                 scrollTop: $("#todoslosmodelos").offset().top - 20
             }, 500);
             return false;
         }


        // Combine address fields for the 'Calle y Altura' field (Keep from contrareembolso.html)
        var calleAltura = $('#951592426').val(); // Use the ID from index-contrarreembolso.html
        var entreCalles = $('#entre-calles').val();
        var direccionCompleta = calleAltura + " entre calles " + entreCalles;

        // Update the value of the 'Calle y Altura' field with the combined address
        // Note: The ID for Calle y Altura is #951592426 in index-contrarreembolso.html
        // but the name expected by Apps Script is entry.394819614.
        // We need to ensure the input with name entry.394819614 gets the combined value.
        // Assuming the input with id="951592426" also has name="entry.394819614" based on previous changes.
        $('#951592426').val(direccionCompleta);


        var formData = $(this).serialize(); // get all the form data

        // send the form data to the Google Apps Script URL
        $.post('https://script.google.com/macros/s/AKfycbzGtF3OryfbupUz-8IlK1K4Ew0P0H1QSjabGnsHcswkbDzldXLWPDEdF26tLUkSjz6MSQ/exec', formData)
            .done(function() {
                // once the data has been sent, redirect to the new URL
                if(pairCount === 1){
                    window.location = 'http://www.rositarococo.com/gracias-1par-c.html?' + $.param({ 'items': talleselegidos }); // Pass selected items in query string
                }
                else if(pairCount === 2){
                    window.location = 'http://www.rositarococo.com/gracias-2pares-c.html?' + $.param({ 'items': talleselegidos }); // Pass selected items in query string
                }
                 // Note: Original contrareembolso.html had a case for >= 4 pairs redirecting to gracias-3pares.html.
                 // Since we limit to 2 pairs, this case is not needed.
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                 console.error("Form submission failed:", textStatus, errorThrown, jqXHR.responseText);
                 alert("Ocurrió un error al enviar tu pedido. Por favor, inténtalo de nuevo.");
                 $submitButton.val('Confirmar Pedido Contrareembolso 🛒').prop('disabled', false); // Re-enable button on failure
            });

        // Prevent default form submission again to be safe
        return false;
    });
});
