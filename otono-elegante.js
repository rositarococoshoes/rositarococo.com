// --- Rosita Rococó - Rediseño Otoñal Elegante ---

// Initialize functionalities once the DOM is ready
$(document).ready(function(){
  // Check if Slick is loaded
  if (typeof $.fn.slick === 'undefined') {
    console.error('Slick carousel not loaded. Attempting to load it dynamically.');
    // Try to load Slick dynamically
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
    script.onload = initCarousels;
    document.head.appendChild(script);

    // Also load CSS
    if (!document.querySelector('link[href*="slick.css"]')) {
      var link1 = document.createElement('link');
      link1.rel = 'stylesheet';
      link1.href = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css';
      document.head.appendChild(link1);

      var link2 = document.createElement('link');
      link2.rel = 'stylesheet';
      link2.href = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css';
      document.head.appendChild(link2);
    }
  } else {
    initCarousels();
  }

  // Function to initialize all carousels
  function initCarousels() {

  // --- Slick Carousel Initialization with optimized settings for image display ---
  $('.model-carousel').slick({
    dots: true,
    infinite: true,
    speed: 600, // Velocidad de transición ligeramente más lenta para mejor visualización
    fade: true,
    cssEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Transición más suave
    lazyLoad: 'ondemand', // Cambiado a ondemand para mejor carga
    adaptiveHeight: false, // Desactivado para mantener altura consistente
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true, // Mejorar accesibilidad
    autoplay: false,
    centerMode: false,
    variableWidth: false,
    pauseOnHover: true,
    pauseOnFocus: true,
    touchThreshold: 10, // Más sensible al tacto
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: true,
          speed: 500
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: true,
          speed: 400
        }
      },
      {
        breakpoint: 576,
        settings: {
          dots: true,
          arrows: true,
          speed: 300
        }
      }
    ]
  });

  // Mejorar la carga de imágenes en el carrusel
  $('.model-carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    // Precarga la siguiente imagen
    let $nextSlideElement = $(slick.$slides.get(nextSlide));
    let $img = $nextSlideElement.find('img[data-lazy]');

    if ($img.length && !$img.attr('src')) {
      let imgSrc = $img.attr('data-lazy');
      $img.attr('src', imgSrc).removeAttr('data-lazy');
    }
  });

  // Cargar todas las imágenes del carrusel activo después de la inicialización
  $('.model-carousel').each(function() {
    const $carousel = $(this);
    setTimeout(function() {
      $carousel.find('img[data-lazy]').each(function() {
        const $img = $(this);
        const imgSrc = $img.attr('data-lazy');
        if (imgSrc && !$img.attr('src')) {
          $img.attr('src', imgSrc).removeAttr('data-lazy');
        }
      });
    }, 500);
  });

  // Reinicializar carrusel cuando se cambia el tamaño de la ventana
  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      $('.model-carousel').slick('setPosition');
    }, 200);
  });

  // Testimonials carousel with autoplay
  $('.testimonials-carousel').slick({
    dots: true,
    infinite: true,
    speed: 700, // Transición más lenta para mejor visualización
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000, // Más tiempo para leer los testimonios
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false, // Cambiado para mantener altura consistente
    accessibility: true, // Mejorar accesibilidad
    fade: true,
    cssEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Transición más suave
    pauseOnHover: true,
    pauseOnFocus: true,
    touchThreshold: 10, // Más sensible al tacto
    lazyLoad: 'ondemand' // Cambiado a ondemand para mejor carga
  });

  // Asegurar que las imágenes de testimonios se carguen correctamente
  $('.testimonials-carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    // Precarga la siguiente imagen
    let $nextSlideElement = $(slick.$slides.get(nextSlide));
    let $img = $nextSlideElement.find('img[data-lazy]');

    if ($img.length && !$img.attr('src')) {
      let imgSrc = $img.attr('data-lazy');
      $img.attr('src', imgSrc).removeAttr('data-lazy');
    }
  });

  // Cargar todas las imágenes del carrusel de testimonios después de la inicialización
  $('.testimonials-carousel').each(function() {
    const $carousel = $(this);
    setTimeout(function() {
      $carousel.find('img[data-lazy]').each(function() {
        const $img = $(this);
        const imgSrc = $img.attr('data-lazy');
        if (imgSrc && !$img.attr('src')) {
          $img.attr('src', imgSrc).removeAttr('data-lazy');
        }
      });
    }, 500);
  });

  } // End of initCarousels function

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

    // Remove previous notification and add new one if item selected
    $currentItem.find('.avisoagregado').remove();
    if (currentVal) {
      $select.closest('.form-group').prepend('<p class="avisoagregado">¡Agregado a tu pedido!</p>');
    }

    // Process the summary content
    var summaryContent = summaryInput.val() || "";
    var summaryArray = summaryContent.split(', ').filter(Boolean);

    // Remove previous value if it exists
    if (prevVal) {
      summaryArray = summaryArray.filter(item => item !== prevVal);
    }

    // Add new value if selected
    if (currentVal) {
      summaryArray.push(currentVal);
    }

    // Check if we exceed the maximum allowed pairs
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

    // Update the summary input and display
    summaryInput.val(summaryArray.join(', '));
    var finalSummary = summaryInput.val();
    $("#help-modelostallesseleccionados").text(finalSummary || '-');
    floatingSummaryText.text(finalSummary || '...');

    // Update price display based on number of pairs
    var pairCount = summaryArray.length;
    var totalPriceText = "Elige tus modelos y talles para ver el total";
    var totalPrice = 0;

    if (pairCount === 1) {
      totalPrice = 70000;
      totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="70000">70.000</span> x 1 par</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Añade otro par por solo $55.000!</small>';
      restOfForm.slideDown();
      floatingSummary.data('should-show', true).fadeIn();
      finalizeButton.removeClass('hidden').text('Completar Datos ↓');

      // Scroll to the form if user has selected at least one pair
      if (currentVal && !prevVal) {
        setTimeout(function() {
          $('html, body').animate({
            scrollTop: $currentItem.offset().top + $currentItem.height() - 50
          }, 500);
        }, 300);
      }
    } else if (pairCount === 2) {
      totalPrice = 110000;
      totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="110000">110.000</span> x 2 pares</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Excelente precio ($55.000 c/u)!</small>';
      restOfForm.slideDown();
      floatingSummary.data('should-show', true).fadeIn();
      finalizeButton.removeClass('hidden').text('Completar Datos ↓');

      // If this is the second pair being added, show a more prominent notification
      if (currentVal && prevVal === "" && summaryArray.length === 2) {
        $('body').append('<div class="special-notification">¡Genial! Has completado tu selección de 2 pares.<br>Continúa abajo para completar tu pedido.</div>');
        $('.special-notification').fadeIn().delay(3000).fadeOut(function() {
          $(this).remove();
        });
      }
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
    floatingPriceSummary.html(totalPriceText.replace(/<br.*?>/g, ' ').replace(/<small.*?>.*?<\/small>/g, ''));

    // Recalculate price based on payment method
    $("#comoabona").trigger('change');
  });

  // Initialize select elements with empty previous value
  $("#todoslosmodelos select.talle").data('pre', '');

  // Smooth scroll to form when clicking the floating button
  finalizeButton.on('click', function(e) {
    e.preventDefault();
    // Ocultar la barra flotante inmediatamente para mejor experiencia
    floatingSummary.fadeOut(200);
    // Scroll más rápido y con mejor offset
    $('html, body').animate({
      scrollTop: $("#datos-envio").offset().top - 30
    }, 800, 'swing');
  });

  // --- Form Input Formatting & Live Update ---
  $('#1465946249').on('input blur', function() {
    $(this).val($(this).val().trim().toLowerCase());
  });

  $('#541001873').on('input', function() {
    $(this).val($(this).val().replace(/[\s.]/g, ''));
  });

  $('#53830725').on('input', function() {
    let value = $(this).val().replace(/[\s-+\.]/g, '');
    if (value.startsWith('549')) value = value.substring(3);
    else if (value.startsWith('54')) value = value.substring(2);
    while (value.startsWith('0') && value.length > 1) value = value.substring(1);
    $(this).val(value.replace(/\D/g, ''));
  });

  // Update summary as user fills in form fields
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
    let fullAddress = [
      $("#help-calleyaltura").text(),
      $("#help-localidad").text(),
      $("#help-cp").text(),
      $("#help-provincia").text()
    ].filter(Boolean).join(', ').replace(/ ,/g, ',');

    $("#help-address-combined").text(fullAddress || '-');
  });

  // Initial trigger for province
  $("#59648134").trigger('change');

  // --- Discount Logic ---
  $("#comoabona").change(function() {
    var selectedPayment = $(this).val();
    var isCBU = (selectedPayment === "cbu");
    var discountText = isCBU ? ' <span style="color:#5a8f3e; font-weight:bold;">(10% OFF Incluido)</span>' : '';

    $(".preciototalaobservar").each(function() {
      var $priceSpan = $(this);
      var originalPrice = $priceSpan.data('original-price');

      if (typeof originalPrice === 'undefined') {
        originalPrice = parseFloat($priceSpan.text().replace(/\./g, '').replace(',', '.'));
        $priceSpan.data('original-price', originalPrice);
      }

      var priceToShow = isCBU ? Math.round(originalPrice * 0.90) : originalPrice;
      $priceSpan.text(priceToShow.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).replace(/,/g, '.'));
    });

    // Update the main total display to show the discount text if applicable
    var $totalPriceElement = $("#preciototal");
    var currentHtml = $totalPriceElement.html();

    // Remove previous discount text before adding new one
    currentHtml = currentHtml.replace(/ <span style="color:#5a8f3e; font-weight:bold;">\(10% OFF Incluido\)<\/span>/g, '');

    if (isCBU) {
      // Add discount text after the price span
      currentHtml = currentHtml.replace(/(<\/span>)/, '$1' + discountText);
    }

    $totalPriceElement.html(currentHtml);

    // Update floating summary as well
    var $floatingPriceSummary = $("#floating-price-summary");
    var floatingHtml = $floatingPriceSummary.html();

    floatingHtml = floatingHtml.replace(/ <span style="color:#5a8f3e; font-weight:bold;">\(10% OFF Incluido\)<\/span>/g, '');

    if (isCBU) {
      floatingHtml = floatingHtml.replace(/(<\/span>)/, '$1' + discountText);
    }

    $floatingPriceSummary.html(floatingHtml);
  });

  // Show WhatsApp button after a delay
  $("#whatsapp").delay(3000).fadeIn(400);

  // Store page URL for tracking
  $("#1209868979").val(window.location.href);

  // --- Form Submission Logic ---
  $('#bootstrapForm').submit(async function (event) {
    event.preventDefault();
    var $form = $(this);
    var $submitButton = $('#botoncomprar');

    // Bot detection
    if ($('#website').val() !== '') {
      console.log('Bot detected.');
      return false;
    }

    // Form validation
    if (!this.checkValidity()) {
      alert('Por favor, completa todos los campos obligatorios (*) correctamente.');
      $submitButton.val('Confirmar y Pagar 🛒').prop('disabled', false);
      $form.find(':invalid').first().focus();
      return;
    }

    // Check if products were selected
    const talleselegidos = $('#1471599855').val();
    if (!talleselegidos || talleselegidos.split(',').filter(Boolean).length === 0) {
      alert('¡No has seleccionado ningún par! Elige tus modelos y talles.');
      $submitButton.val('Confirmar y Pagar 🛒').prop('disabled', false);
      $('html, body').animate({
        scrollTop: $("#todoslosmodelos").offset().top - 20
      }, 500);
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

    // Proceed with form submission
    $submitButton.val('Procesando...').prop('disabled', true);
    $('.loading-overlay').addClass('visible');

    const formaPago = $('#comoabona').val();
    const nombreComprador = $('#1460904554').val();

    // Get the potentially discounted price
    const montoTexto = $(".preciototalaobservar").first().text();
    const monto = parseFloat(montoTexto.replace(/\./g, ''));

    try {
      const formAction = $form.attr('action');
      const formData = new URLSearchParams($form.serialize());

      if (formaPago === "cbu") {
        // Process bank transfer payment
        console.log('Processing CBU payment...');
        fbq('track', 'InitiateCheckout');
        fetch(formAction, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        });

        const pairCount = talleselegidos.split(',').filter(Boolean).length;
        const redirectUrl = pairCount === 2 ?
          'https://rositarococo.com/transferenciacbu-2pares.html' :
          'https://rositarococo.com/transferenciacbu-1par.html';

        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 500);

        return;
      } else if (formaPago === "tarjeta" || formaPago === "mercadopago") {
        // Process MercadoPago/Card payment
        console.log('Processing MercadoPago/Card payment...');
        fbq('track', 'InitiateCheckout');

        try {
          const response = await fetch("https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              comprador: nombreComprador,
              monto: monto
            })
          });

          if (!response.ok) throw new Error(`Webhook status ${response.status}`);

          const responseText = await response.text();
          const jsonData = JSON.parse(responseText);
          const mercadoPagoUrl = jsonData.linkpersonalizadomp;

          if (!mercadoPagoUrl) throw new Error('MP link not found.');

          $('#link-mercadopago').val(mercadoPagoUrl);

          const finalFormData = new URLSearchParams($form.serialize());
          fetch(formAction, {
            method: 'POST',
            mode: 'no-cors',
            body: finalFormData
          });

          setTimeout(() => {
            window.location.href = mercadoPagoUrl;
          }, 1500);
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

  // --- Sales Notification Popups ---
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
    }, 5000);
  }

  // Start notifications after a delay
  setTimeout(() => {
    showNotification();
    setInterval(showNotification, 15000);
  }, 10000);

  // --- WhatsApp Number Validation ---
  function getInputElement(id) {
    return document.getElementById(id);
  }

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

    let isValid = false;
    let isChecking = false;
    let timeout; // Timeout para debounce

    function getInputElement(id) {
        return document.getElementById(id);
    }

    function getErrorElement() {
        return document.querySelector("." + errorClass);
    }

    function createErrorElement(inputElement) {
        if (!getErrorElement()) {
            const errorDiv = document.createElement("div");
            errorDiv.className = errorClass;
            errorDiv.style.display = "none";
            errorDiv.style.marginTop = "5px";
            errorDiv.style.padding = "8px 12px";
            errorDiv.style.borderRadius = "4px";
            errorDiv.style.fontSize = "0.9em";
            inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
        }
    }

    function hideError() {
        const errorElement = getErrorElement();
        if (errorElement) {
            errorElement.style.display = "none";
        }
    }

    function showError(message, color = "red") {
        const errorElement = getErrorElement();
        if (errorElement) {
            errorElement.textContent = message;

            // Si está verificando WhatsApp, agregar clase especial
            if (message === "Verificando WhatsApp...") {
                errorElement.className = "error-message verifying";
            } else {
                errorElement.className = "error-message";
                errorElement.style.backgroundColor = color === "green" ? "#d4edda" : "#f8d7da";
                errorElement.style.color = color === "green" ? "#155724" : "#721c24";
                errorElement.style.border = color === "green" ? "1px solid #c3e6cb" : "1px solid #f5c6cb";
            }

            errorElement.style.display = "block";
        }
    }

    function formatNumber(number) {
        let rawNumber = number.replace(/\D/g, "");
        if (rawNumber.length === 0) return null;

        // Si empieza con 549, lo dejamos como está
        if (rawNumber.startsWith("549")) {
            return rawNumber;
        }

        // Si empieza con 54 y tiene al menos 12 dígitos, lo dejamos como está
        if (rawNumber.startsWith("54") && rawNumber.length >= 12) {
            return rawNumber;
        }

        // Si tiene 10 dígitos, agregamos 549 al principio
        if (rawNumber.length === 10) {
            return "549" + rawNumber;
        }

        // Si tiene 11 dígitos y empieza con 9, agregamos 54 al principio
        if (rawNumber.length === 11 && rawNumber.startsWith("9")) {
            return "54" + rawNumber;
        }

        // En cualquier otro caso, devolvemos null (número inválido)
        return null;
    }

    function setDependentElementsDisabled(disabled) {
        dependentElementIds.forEach(id => {
            const element = getInputElement(id);
            if (element) {
                element.disabled = disabled;
            }
        });
    }

    function validateWhatsApp() {
        console.log("validateWhatsApp called");
        if (isChecking) {
            console.log("validateWhatsApp: Already checking, returning.");
            return;
        }
        isChecking = true;

        const inputElement = getInputElement(whatsappInputId);
        if (!inputElement) {
            console.error("WhatsApp input element not found.");
            isChecking = false;
            return;
        }

        createErrorElement(inputElement);
        showError("Verificando WhatsApp...", "#666");

        const formattedNumber = formatNumber(inputElement.value);
        console.log("Validating number:", formattedNumber);

        if (!formattedNumber) {
            showError("Formato de WhatsApp inválido. Ej: 1156457057", "red");
            setDependentElementsDisabled(true);
            isChecking = false;
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            console.log("xhr.onreadystatechange called.  readyState:", xhr.readyState, "status:", xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    console.log("API response:", data);
                    isValid = data.exists === true;
                    if (isValid) {
                        showError("WhatsApp válido. ¡Puedes continuar!", "green");
                        setDependentElementsDisabled(false); // Habilitar campos si es válido
                    } else {
                        showError("WhatsApp no válido. Verifica el número.", "red");
                        setDependentElementsDisabled(true); // Deshabilitar campos si no es válido
                    }
                } else {
                    console.error("API error. Status:", xhr.status);
                    showError("Error al verificar WhatsApp. Intenta de nuevo.", "orange");
                    setDependentElementsDisabled(true); // Deshabilitar campos en caso de error
                }
                isChecking = false;
            }
        };
        xhr.send(JSON.stringify({ whatsapp_check: formattedNumber }));
    }

    function clearErrorAndValidate() {
        hideError(); // Oculta el mensaje de error
        clearTimeout(timeout); // Limpia cualquier validación pendiente
        // No es necesario llamar a validateWhatsApp() aquí
    }

    function setupListeners() {
        const whatsappInput = getInputElement(whatsappInputId);
        if (!whatsappInput) {
            console.error("WhatsApp input element not found in setupListeners.");
            return;
        }

        // Agrega el listener para 'input'
        whatsappInput.addEventListener("input", clearErrorAndValidate);

        whatsappInput.addEventListener("blur", () => {
            console.log("blur event triggered");
            // Ahora sí, llama a validateWhatsApp después del 'blur'
            timeout = setTimeout(validateWhatsApp, 200); // Pequeño retraso para asegurar que se procese el valor final
        });
    }

    // Inicializar
    setupListeners();
  })();

  // --- Additional UI Enhancements ---

  // Smooth scroll for all anchor links
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 20
      }, 500);
    }
  });

  // Add animation to product items on scroll with improved performance
  function animateOnScroll() {
    $('.product-item').each(function() {
      var position = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();

      if (scroll + windowHeight > position + 80) { // Activar un poco antes para una transición más suave
        $(this).addClass('animated');
      }
    });
  }

  // Initial call and optimized scroll event with throttling
  animateOnScroll();

  let scrollTimer;
  $(window).on('scroll', function() {
    if (!scrollTimer) {
      scrollTimer = setTimeout(function() {
        animateOnScroll();
        scrollTimer = null;
      }, 50); // Limitar la frecuencia de ejecución para mejor rendimiento
    }
  });

  // Add enhanced CSS classes for animations
  $("<style>\
    .product-item { \
      opacity: 0; \
      transform: translateY(25px); \
      transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.4s ease; \
    } \
    .product-item.animated { \
      opacity: 1; \
      transform: translateY(0); \
    }\
    @media (prefers-reduced-motion: reduce) {\
      .product-item {\
        transition: opacity 0.2s ease;\
        transform: none;\
      }\
      .product-item.animated {\
        transform: none;\
      }\
    }\
  </style>").appendTo('head');

  // Mejorar la carga de imágenes
  function loadVisibleImages() {
    $('img[data-lazy]').each(function() {
      var $img = $(this);
      if (!$img.attr('src')) {
        var position = $img.offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();

        // Cargar imágenes con un margen más amplio para precargar
        if (scroll + windowHeight > position - 300 && scroll < position + $img.height() + 300) {
          var imgSrc = $img.attr('data-lazy');
          if (imgSrc) {
            // Crear una imagen temporal para precargar
            var tempImg = new Image();
            tempImg.onload = function() {
              // Una vez cargada, actualizar la imagen visible
              $img.attr('src', imgSrc).removeAttr('data-lazy');
            };
            tempImg.src = imgSrc;
          }
        }
      }
    });
  }

  // Cargar imágenes visibles inicialmente y en scroll
  loadVisibleImages();
  $(window).on('scroll', function() {
    if (!scrollTimer) {
      scrollTimer = setTimeout(function() {
        loadVisibleImages();
        scrollTimer = null;
      }, 100);
    }
  });

  // Forzar carga de todas las imágenes después de un tiempo
  setTimeout(function() {
    $('img[data-lazy]').each(function() {
      var $img = $(this);
      if (!$img.attr('src')) {
        var imgSrc = $img.attr('data-lazy');
        if (imgSrc) {
          $img.attr('src', imgSrc).removeAttr('data-lazy');
        }
      }
    });
  }, 2000);

  // Show WhatsApp button with animation
  $("#whatsapp").css({
    'transform': 'scale(0)',
    'opacity': '0',
    'display': 'block'
  }).animate({
    'opacity': '1'
  }, 500, function() {
    $(this).css('transform', 'scale(1)');
  });

  // Final fallback to ensure all images are loaded
  setTimeout(function() {
    $('img[data-lazy]').each(function() {
      var $img = $(this);
      if (!$img.attr('src')) {
        var imgSrc = $img.attr('data-lazy');
        if (imgSrc) {
          $img.attr('src', imgSrc).removeAttr('data-lazy');
        }
      }
    });
  }, 3000);

  // Scroll to form when clicking on finalize button
  $('#finalizarpedido').click(function(e) {
    e.preventDefault();
    var targetId = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(targetId).offset().top - 50
    }, 800);
  });

  // Ocultar la barra flotante cuando el usuario está en la sección del formulario
  $(window).scroll(function() {
    var formSection = $('#restodelform');
    var floatingBar = $('#floating-cart-summary');

    if (formSection.is(':visible')) {
      var formTop = formSection.offset().top;
      var formBottom = formTop + formSection.outerHeight();
      var scrollPosition = $(window).scrollTop() + $(window).height();

      // Si el usuario está en la sección del formulario o por debajo, ocultar la barra
      if (scrollPosition >= formTop) {
        floatingBar.fadeOut(300);
      } else {
        if (floatingBar.is(':hidden') && floatingBar.data('should-show')) {
          floatingBar.fadeIn(300);
        }
      }
    }
  });

}); // End document ready
