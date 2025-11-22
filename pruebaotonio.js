// --- Todo el JavaScript anterior (sin cambios en la lógica funcional) ---

// Initialize functionalities once the DOM is ready
$(document).ready(function(){

  // --- Slick Carousel Initialization (Restored options, accessibility: false) ---
  $('.model-carousel').slick({
    dots: true,
    infinite: true,
    speed: 400,
    fade: false,
    cssEase: 'ease-in-out',
    lazyLoad: 'ondemand',
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: false, // Keep accessibility disabled as workaround
    responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: true,
            arrows: true
          }
        }
      ]
  });

  $('.testimonials-carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    accessibility: false // Keep accessibility disabled as workaround
  });


  // --- Product Selection Logic ---
  var fieldsetsToShow = ['roma-negras', 'roma-suela', 'siena2025']; // Add all product IDs
  fieldsetsToShow.forEach(function(fieldset) {
    $('input[name="hwA-qty-' + fieldset + '"]').click(function() {
      var selectedQty = parseInt($(this).val());
      var $parentSelection = $(this).closest('.product-selection');
      if (selectedQty === 2) {
        $parentSelection.find('fieldset#hwA-' + fieldset + '-2').slideDown('fast');
      } else {
        $parentSelection.find('fieldset#hwA-' + fieldset + '-2').slideUp('fast');
        $parentSelection.find('fieldset#hwA-' + fieldset + '-2 select.talle').val('');
        $parentSelection.find('fieldset#hwA-' + fieldset + '-2 select.talle').trigger('change');
      }
    });
  });

  // --- Update Order Summary ---
  var summaryInput = $("#1471599855");
  var floatingSummary = $("#floating-cart-summary");
  var floatingSummaryText = $("#floating-cart-summary p b");
  var floatingPriceSummary = $("#floating-price-summary");
  var finalizeButton = $("#finalizarpedido");
  var restOfForm = $("#restodelform");

  $("#todoslosmodelos select.talle").change(function(){
    var $currentItem = $(this).closest('.product-item');
    var $select = $(this);
    var currentVal = $select.val();
    var prevVal = $select.data('pre') || "";

    $currentItem.find('.avisoagregado').remove();
    if (currentVal) {
      $select.closest('.form-group').prepend('<p class="avisoagregado">¡Agregado!</p>');
    }

    var summaryContent = summaryInput.val() || "";
    var summaryArray = summaryContent.split(', ').filter(Boolean);

    if (prevVal) {
      summaryArray = summaryArray.filter(item => item !== prevVal);
    }
    if (currentVal) {
      summaryArray.push(currentVal);
    }

    if (summaryArray.length > 2) {
      alert("Puedes seleccionar un máximo de 2 pares. Por favor, revisa tu selección.");
      $select.val(prevVal);
      summaryArray = summaryArray.filter(item => item !== currentVal);
      if (prevVal && !summaryArray.includes(prevVal)) {
         summaryArray.push(prevVal);
      }
      $currentItem.find('.avisoagregado').remove();
    } else {
        $select.data('pre', currentVal);
    }

    summaryInput.val(summaryArray.join(', '));
    var finalSummary = summaryInput.val();
    $("#help-modelostallesseleccionados").text(finalSummary || '-');
    floatingSummaryText.text(finalSummary || '...');

    var pairCount = summaryArray.length;
    var totalPriceText = "Elige tus modelos y talles para ver el total";
    var totalPrice = 0;

    if (pairCount === 1) {
      totalPrice = 70000;
      totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="70000">70.000</span> x 1 par</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Añade otro par por solo $55.000!</small>';
      restOfForm.slideDown();
      floatingSummary.fadeIn();
      finalizeButton.removeClass('hidden').text('Completar Datos de Envío ↓'); // Update CTA text
    } else if (pairCount === 2) {
      totalPrice = 110000;
      totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="110000">110.000</span> x 2 pares</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Excelente precio ($55.000 c/u)!</small>';
      restOfForm.slideDown();
      floatingSummary.fadeIn();
      finalizeButton.removeClass('hidden').text('Completar Datos de Envío ↓'); // Update CTA text
    } else if (pairCount === 0) {
       restOfForm.slideUp();
       floatingSummary.fadeOut();
       finalizeButton.addClass('hidden');
    } else {
        totalPriceText = "Has seleccionado más de 2 pares. Revisa tu selección.";
        restOfForm.slideUp();
        floatingSummary.fadeIn();
         finalizeButton.addClass('hidden');
    }

    $("#preciototal").html(totalPriceText);
    floatingPriceSummary.html(totalPriceText.replace(/<br.*?>/g, ' ').replace(/<small.*?>.*?<\/small>/g, '')); // Clean floating summary

    $("#comoabona").trigger('change'); // Recalculate price based on payment method
  });

  $("#todoslosmodelos select.talle").data('pre', '');

   finalizeButton.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $("#datos-envio").offset().top - 20 }, 500);
   });

  // --- Form Input Formatting & Live Update ---
   $('#1465946249').on('input blur', function() { $(this).val($(this).val().trim().toLowerCase()); });
   $('#541001873').on('input', function() { $(this).val($(this).val().replace(/[\s.]/g, '')); });
   $('#53830725').on('input', function() {
        let value = $(this).val().replace(/[\s-+\.]/g, '');
        if (value.startsWith('549')) value = value.substring(3);
        else if (value.startsWith('54')) value = value.substring(2);
        while (value.startsWith('0') && value.length > 1) value = value.substring(1);
        $(this).val(value.replace(/\D/g, ''));
   });

    $("#1460904554, #1465946249, #53830725, #951592426, #1743418466, #59648134, #1005165410, #541001873").on('keyup change input', function() {
         $("#help-nombre").text($("#1460904554").val() || '-');
         $("#help-wapp").text($("#53830725").val() || '-');
         $("#help-email").text($("#1465946249").val() || '-');
         $("#help-calleyaltura").text($("#951592426").val() || '-');
         $("#help-localidad").text($("#1743418466").val() || '-');
         $("#help-provincia").text($("#59648134 option:selected").text().replace('-- Selecciona tu Provincia --','') || '-');
         $("#help-cp").text($("#1005165410").val() || '-');
         $("#help-dni").text($("#541001873").val() || '-');
          // Combine address fields for display
         let fullAddress = [$("#help-calleyaltura").text(), $("#help-localidad").text(), $("#help-cp").text(), $("#help-provincia").text()].filter(Boolean).join(', ').replace(/ ,/g, ',');
         // Assuming you add a span with id="help-address-combined" in the summary HTML
         $("#help-address-combined").text(fullAddress || '-');
    });
    $("#59648134").trigger('change'); // Initial trigger for province


  // --- Discount Logic ---
  $("#comoabona").change(function() {
    var selectedPayment = $(this).val();
    var isCBU = (selectedPayment === "cbu");
    var discountText = isCBU ? ' <span style="color:#218838; font-weight:bold;">(10% OFF Incluido)</span>' : '';

    $(".preciototalaobservar").each(function() {
        var $priceSpan = $(this);
        var originalPrice = $priceSpan.data('original-price');
        if (typeof originalPrice === 'undefined') { // Fallback if data attribute wasn't set initially
             originalPrice = parseFloat($priceSpan.text().replace(/\./g, '').replace(',', '.'));
             $priceSpan.data('original-price', originalPrice);
         }

        var priceToShow = isCBU ? Math.round(originalPrice * 0.90) : originalPrice;
        $priceSpan.text(priceToShow.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/,/g, '.'));
    });

    // Update the main total display to show the discount text if applicable
    var $totalPriceElement = $("#preciototal");
    var currentHtml = $totalPriceElement.html();
    // Remove previous discount text before adding new one
    currentHtml = currentHtml.replace(/ <span style="color:#218838; font-weight:bold;">\(10% OFF Incluido\)<\/span>/g, '');
    if (isCBU) {
        // Add discount text after the price span
        currentHtml = currentHtml.replace(/(<\/span>)/, '$1' + discountText);
    }
    $totalPriceElement.html(currentHtml);

    // Update floating summary as well
    var $floatingPriceSummary = $("#floating-price-summary");
    var floatingHtml = $floatingPriceSummary.html();
    floatingHtml = floatingHtml.replace(/ <span style="color:#218838; font-weight:bold;">\(10% OFF Incluido\)<\/span>/g, '');
     if (isCBU) {
        floatingHtml = floatingHtml.replace(/(<\/span>)/, '$1' + discountText);
    }
    $floatingPriceSummary.html(floatingHtml);

  });

   $("#whatsapp").delay(5000).fadeIn(400);
   $("#1209868979").val(window.location.href);


  // --- Form Submission (logic remains the same) ---
  $('#bootstrapForm').submit(async function (event) {
      event.preventDefault();
      var $form = $(this);
      var $submitButton = $('#botoncomprar');

      if ($('#website').val() !== '') { console.log('Bot detected.'); return false; }

      if (!this.checkValidity()) {
          alert('Por favor, completa todos los campos obligatorios (*) correctamente.');
          $submitButton.val('Confirmar y Pagar 🛒').prop('disabled', false);
          $form.find(':invalid').first().focus();
          return;
      }

      const talleselegidos = $('#1471599855').val();
      if (!talleselegidos || talleselegidos.split(',').filter(Boolean).length === 0) {
          alert('¡No has seleccionado ningún par! Elige tus modelos y talles.');
          $submitButton.val('Confirmar y Pagar 🛒').prop('disabled', false);
          $('html, body').animate({ scrollTop: $("#todoslosmodelos").offset().top - 20 }, 500);
          return;
      }

      // Check WhatsApp validation status before submitting
      const whatsappInput = getInputElement("53830725");
      const errorElement = getErrorElement();
      if (!whatsappInput || !errorElement || !errorElement.classList.contains('valid')) {
          alert('Por favor, verifica tu número de WhatsApp antes de continuar.');
          $submitButton.val('Confirmar y Pagar 🛒').prop('disabled', false);
          if (whatsappInput) whatsappInput.focus();
          return;
      }


      $submitButton.val('Procesando...').prop('disabled', true);
      $('.loading-overlay').addClass('visible');

      const formaPago = $('#comoabona').val();
      const nombreComprador = $('#1460904554').val();
      // Ensure we get the potentially discounted price if CBU is selected
      const montoTexto = $(".preciototalaobservar").first().text();
      const monto = parseFloat(montoTexto.replace(/\./g, ''));

      try {
          const formAction = $form.attr('action');
          const formData = new URLSearchParams($form.serialize());

          if (formaPago === "cbu") {
              // ... (CBU logic - no changes needed) ...
               console.log('Processing CBU payment...');
               fbq('track', 'InitiateCheckout');
               fetch(formAction, { method: 'POST', mode: 'no-cors', body: formData });
               const pairCount = talleselegidos.split(',').filter(Boolean).length;
               const redirectUrl = pairCount === 2 ? 'https://rositarococo.com/transferenciacbu-2pares.html' : 'https://rositarococo.com/transferenciacbu-1par.html';
               setTimeout(() => { window.location.href = redirectUrl; }, 500);
               return;

          } else if (formaPago === "tarjeta" || formaPago === "mercadopago") {
               // ... (MercadoPago logic - no changes needed) ...
                console.log('Processing MercadoPago/Card payment...');
                fbq('track', 'InitiateCheckout');
                try {
                    const response = await fetch("https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30", {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ comprador: nombreComprador, monto: monto })
                    });
                    if (!response.ok) throw new Error(`Webhook status ${response.status}`);
                    const responseText = await response.text();
                    const jsonData = JSON.parse(responseText);
                    const mercadoPagoUrl = jsonData.linkpersonalizadomp;
                    if (!mercadoPagoUrl) throw new Error('MP link not found.');
                    $('#link-mercadopago').val(mercadoPagoUrl);
                    const finalFormData = new URLSearchParams($form.serialize());
                    fetch(formAction, { method: 'POST', mode: 'no-cors', body: finalFormData });
                    setTimeout(() => { window.location.href = mercadoPagoUrl; }, 1500);
                } catch (webhookError) {
                     console.error("MP link fetch error:", webhookError);
                     alert('Hubo un problema al generar el link de pago. Intenta nuevamente.');
                     $('.loading-overlay').removeClass('visible');
                     $submitButton.val('Confirmar y Pagar 🛒').prop('disabled', false);
                }
                return;
          }
          throw new Error("Forma de pago no válida.");
      } catch (error) {
          console.error("Submission error:", error);
          alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
          $('.loading-overlay').removeClass('visible');
          $submitButton.val('Confirmar y Pagar 🛒').prop('disabled', false);
      }
  });


  // --- Sales Notification Popups (logic remains same) ---
  const salesData = [
      { product: "Mocasín Roma Negras", city: "CABA", image: "roma-negras-1.jpg" },
      { product: "Borcego Siena 2025", city: "Córdoba", image: "siena2025-1.webp" },
      { product: "Mocasín Roma Suela", city: "Rosario", image: "roma-suela-1a.jpg" },
      { product: "Mocasín Roma Negras", city: "La Plata", image: "roma-negras-1.jpg" },
      { product: "Borcego Siena 2025", city: "Mendoza", image: "siena2025-1.webp" },
      { product: "Mocasín Roma Suela", city: "Mar del Plata", image: "roma-suela-1a.jpg" }
  ];
  let currentNotificationIndex = 0;
  const notificationContainer = document.getElementById('notification-container');

  function showNotification() {
      if (!notificationContainer) return;

      const sale = salesData[currentNotificationIndex % salesData.length];
      currentNotificationIndex++;

      const notification = document.createElement('div');
      notification.className = 'notification';

      const img = document.createElement('img');
      img.src = sale.image;
      img.alt = `Foto ${sale.product}`;

      const orderInfo = document.createElement('div');
      orderInfo.className = 'order-info';

      const title = document.createElement('h3');
      title.textContent = `¡Alguien compró!`;

      const productInfo = document.createElement('p');
      productInfo.textContent = `${sale.product}`;

      const customerInfo = document.createElement('div');
      customerInfo.className = 'customer-info';
      const citySpan = document.createElement('span');
      citySpan.className = 'city';
      citySpan.textContent = `en ${sale.city}`;
      customerInfo.appendChild(citySpan);

      const closeButton = document.createElement('span');
      closeButton.className = 'close';
      closeButton.innerHTML = '&times;';
      closeButton.onclick = () => notification.remove();

      orderInfo.appendChild(title);
      orderInfo.appendChild(productInfo);
      orderInfo.appendChild(customerInfo);

      notification.appendChild(img);
      notification.appendChild(orderInfo);
      notification.appendChild(closeButton);

      notificationContainer.appendChild(notification);

      // Remove notification after animation ends + a little delay
      setTimeout(() => {
          if (notification.parentNode === notificationContainer) {
              notificationContainer.removeChild(notification);
          }
      }, 5000); // Matches animation duration + 0.5s buffer
  }
  // Start notifications after a delay
  // setTimeout(() => { showNotification(); setInterval(showNotification, 12000); }, 8000);
  // Optional: Uncomment above line to enable notifications


  // --- WhatsApp Number Validation (logic remains the same, but ensure functions are accessible) ---
  // Moved helper functions outside the IIFE to be accessible by form submit handler
  function getInputElement(id) { return document.getElementById(id); }
  function getErrorElement() {
      const whatsappInputId = "53830725";
      const errorClass = "error-message";
      let errorElement = document.querySelector(`.${errorClass}[data-target="${whatsappInputId}"]`);
      if (!errorElement) {
          const inputElement = getInputElement(whatsappInputId);
          if (inputElement && inputElement.parentNode) {
              errorElement = document.createElement("div");
              errorElement.className = errorClass;
              errorElement.setAttribute('data-target', whatsappInputId);
              inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
          }
      }
      return errorElement;
  }

  (function() {
       const whatsappInputId = "53830725";
        const dependentElementIds = ["59648134", "1743418466", "1005165410", "951592426", "541001873", "comoabona", "botoncomprar"];
        const errorClass = "error-message";
        const apiUrl = "https://sswebhookss.odontolab.co/webhook/02eb0643-1b9d-4866-87a7-f892d6a945ea";

        let validationTimeout;
        let isChecking = false;
        let lastCheckedValue = null;

        function hideError() {
             const errorElement = getErrorElement();
             if (errorElement) { errorElement.style.display = "none"; errorElement.className = errorClass; }
        }
        function showError(message, status = "invalid") {
             const errorElement = getErrorElement();
             if (errorElement) {
                 errorElement.textContent = message;
                 errorElement.className = `${errorClass} ${status}`;
                 errorElement.style.display = "block";
             }
        }
        function formatNumberForValidation(number) {
             let rawNumber = number.replace(/\D/g, "");
             if (rawNumber.length >= 10 && rawNumber.length <= 12) {
                  if (rawNumber.length === 11 && rawNumber.startsWith('9')) rawNumber = '54' + rawNumber;
                  else if (rawNumber.length === 10) rawNumber = '549' + rawNumber;
              } else if (rawNumber.length > 0) return null;
             return rawNumber.startsWith('549') ? rawNumber : null;
        }
        function setDependentElementsDisabled(disabled) {
             dependentElementIds.forEach(id => {
                 const element = getInputElement(id);
                 if (element) { element.disabled = disabled; }
             });
        }
        function validateWhatsApp() {
             if (isChecking) return;
             const inputElement = getInputElement(whatsappInputId);
             if (!inputElement) return;
             const currentValue = inputElement.value.trim();
             if (currentValue === lastCheckedValue || currentValue === "") { if (currentValue === "") hideError(); return; }
             const formattedNumber = formatNumberForValidation(currentValue);

             if (!formattedNumber) {
                  if (currentValue !== "") showError("Formato de WhatsApp inválido. Ej: 1156457057", "invalid"); else hideError();
                  setDependentElementsDisabled(true);
                  lastCheckedValue = currentValue; return;
             }

             isChecking = true; lastCheckedValue = currentValue;
             showError("Verificando WhatsApp...", "verifying"); setDependentElementsDisabled(true);

             fetch(apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ whatsapp_check: formattedNumber }) })
             .then(response => { if (!response.ok) throw new Error(`API Error: ${response.status}`); return response.json(); })
             .then(data => { const isValid = data.exists === true; showError(isValid ? "WhatsApp válido. ¡Puedes continuar!" : "WhatsApp no encontrado. Revisa el número.", isValid ? "valid" : "invalid"); setDependentElementsDisabled(!isValid); })
             .catch(error => { console.error("WhatsApp validation error:", error); showError("Error al verificar. Intenta de nuevo.", "error-connection"); setDependentElementsDisabled(true); })
             .finally(() => { isChecking = false; });
        }
        function handleInput() {
             clearTimeout(validationTimeout); hideError(); setDependentElementsDisabled(true);
             validationTimeout = setTimeout(validateWhatsApp, 800); // Debounce
         }
        const whatsappInput = getInputElement(whatsappInputId);
        if (whatsappInput) { whatsappInput.addEventListener("input", handleInput); whatsappInput.addEventListener("blur", validateWhatsApp); setDependentElementsDisabled(true); } // Initially disable dependent fields
        else { console.error("WhatsApp input field not found."); }
  })();


}); // End document ready
