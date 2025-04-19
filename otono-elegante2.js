// --- Rosita Rococó - Rediseño Otoñal Elegante 2.0 ---

// Initialize functionalities once the DOM is ready
$(document).ready(function(){
  // --- Cart & Checkout Process Variables ---
  var cartItems = [];
  var currentStep = 1;
  var maxStep = 3;

  // Initialize checkout progress
  updateCheckoutProgress(currentStep);

  // Mini-cart toggle functionality - Nuevo botón independiente
  $('#cart-button').on('click', function(e) {
    e.stopPropagation(); // Evitar que el clic se propague
    $('#mini-cart').toggleClass('active');
  });

  // También permitir clic en los elementos dentro del botón
  $('.cart-button-icon, .cart-button-count').on('click', function(e) {
    e.stopPropagation(); // Evitar que el clic se propague
    $('#mini-cart').toggleClass('active');
  });

  // Mantener compatibilidad con el botón antiguo si existe
  $('.mini-cart-tab').on('click', function(e) {
    e.stopPropagation();
    $('#mini-cart').toggleClass('active');
  });

  $('.tab-icon, .tab-text').on('click', function(e) {
    e.stopPropagation();
    $('#mini-cart').toggleClass('active');
  });

  // Close mini-cart when clicking outside
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#mini-cart').length && $('#mini-cart').hasClass('active')) {
      $('#mini-cart').removeClass('active');
    }
  });

  // Close mini-cart when clicking the close button
  $('.cart-close').on('click', function(e) {
    e.stopPropagation();
    $('#mini-cart').removeClass('active');
  });

  // Asegurarse de que el botón del carrito sea visible
  function ensureCartButtonVisible() {
    // Forzar visibilidad del botón del carrito independiente
    $('#cart-button').css({
      'display': 'flex',
      'visibility': 'visible',
      'opacity': '1',
      'z-index': '9999'
    });

    // También asegurar visibilidad del botón antiguo por compatibilidad
    $('.mini-cart-tab').css({
      'display': 'flex',
      'visibility': 'visible',
      'opacity': '1',
      'z-index': '9999'
    });

    // Forzar animación
    if (!$('#cart-button').hasClass('animated')) {
      $('#cart-button').addClass('animated');
    }

    // Actualizar contador
    $('.cart-button-count').text($('.cart-count').text());

    // Asegurar visibilidad del botón flotante de continuar al envío
    if (cartItems.length > 0) {
      var formElement = $('#restodelform');
      var windowTopPosition = $(window).scrollTop();
      var windowBottomPosition = windowTopPosition + $(window).height();

      // Verificar si el formulario está visible y activo
      var formVisible = false;

      if (formElement.length > 0) {
        // Comprobar si el formulario está activo o no oculto
        var formIsActive = formElement.hasClass('active') || !formElement.hasClass('hidden');

        if (formIsActive) {
          // Si el formulario está activo, verificar si está en la pantalla
          var formTop = formElement.offset().top;
          var formBottom = formTop + formElement.outerHeight();

          // El formulario está visible si:
          // 1. La parte superior del formulario está visible en la pantalla, o
          // 2. La parte inferior del formulario está visible en la pantalla, o
          // 3. El formulario abarca toda la pantalla (más grande que la ventana)
          // 4. Estamos cerca del formulario (dentro de 200px)
          formVisible =
            (formTop >= windowTopPosition && formTop <= windowBottomPosition) || // Parte superior visible
            (formBottom >= windowTopPosition && formBottom <= windowBottomPosition) || // Parte inferior visible
            (formTop <= windowTopPosition && formBottom >= windowBottomPosition) || // Formulario abarca toda la pantalla
            (formTop - windowBottomPosition < 200 && formTop > windowBottomPosition) || // Estamos justo encima del formulario
            (windowTopPosition - formBottom < 200 && windowTopPosition > formBottom); // Estamos justo debajo del formulario
        }

        // Si el formulario está activo, considerarlo visible aunque no esté en la pantalla
        formVisible = formVisible || formIsActive;
      }

      // Mostrar el botón flotante solo si hay productos en el carrito y no estamos viendo el formulario
      if (!formVisible) {
        $('#fixed-checkout-button').css({
          'display': 'block',
          'visibility': 'visible',
          'opacity': '1',
          'z-index': '9999'
        }).removeClass('hidden');
        console.log('Mostrando botón flotante - formulario no visible');
      } else {
        // Ocultar el botón si estamos viendo el formulario
        $('#fixed-checkout-button').css('display', 'none').addClass('hidden');
        console.log('Ocultando botón flotante - formulario visible');
      }
    } else {
      // Ocultar el botón si no hay productos en el carrito
      $('#fixed-checkout-button').css('display', 'none').addClass('hidden');
    }
  }

  // Llamar inmediatamente y también después de un retraso para asegurar que funcione
  ensureCartButtonVisible();
  setTimeout(ensureCartButtonVisible, 500);
  setTimeout(ensureCartButtonVisible, 1000);
  setTimeout(ensureCartButtonVisible, 2000);
  setTimeout(ensureCartButtonVisible, 3000);

  // Función para mostrar el botón de emergencia
  function showEmergencyButton() {
    if (cartItems.length > 0) {
      var formPosition = $('#datos-envio').offset().top;
      var windowTopPosition = $(window).scrollTop();

      if (windowTopPosition < formPosition - 200) {
        $('#emergency-checkout-button').css('display', 'block');
        console.log('Mostrando botón de emergencia');
      } else {
        $('#emergency-checkout-button').css('display', 'none');
        console.log('Ocultando botón de emergencia');
      }
    } else {
      $('#emergency-checkout-button').css('display', 'none');
    }
  }

  // Llamar a la función para mostrar el botón de emergencia
  setTimeout(showEmergencyButton, 1000);
  setTimeout(showEmergencyButton, 2000);
  setTimeout(showEmergencyButton, 3000);

  // Animate the cart button after page load to draw attention
  setTimeout(function() {
    $('#cart-button').addClass('pulse-once');

    setTimeout(function() {
      $('#cart-button').removeClass('pulse-once');
    }, 1000);
  }, 3000);

  // Show checkout progress bar and manage floating button after scrolling
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      $('#checkout-progress').addClass('visible');
    } else {
      $('#checkout-progress').removeClass('visible');
    }

    // Mostrar/ocultar el botón flotante según la posición de desplazamiento
    if (cartItems.length > 0) {
      var formElement = $('#restodelform');
      var windowTopPosition = $(window).scrollTop();
      var windowBottomPosition = windowTopPosition + $(window).height();

      // Verificar si el formulario está visible y activo
      var formVisible = false;

      if (formElement.length > 0) {
        // Comprobar si el formulario está activo o no oculto
        var formIsActive = formElement.hasClass('active') || !formElement.hasClass('hidden');

        if (formIsActive) {
          // Si el formulario está activo, verificar si está en la pantalla
          var formTop = formElement.offset().top;
          var formBottom = formTop + formElement.outerHeight();

          // El formulario está visible si:
          // 1. La parte superior del formulario está visible en la pantalla, o
          // 2. La parte inferior del formulario está visible en la pantalla, o
          // 3. El formulario abarca toda la pantalla (más grande que la ventana)
          // 4. Estamos cerca del formulario (dentro de 200px)
          formVisible =
            (formTop >= windowTopPosition && formTop <= windowBottomPosition) || // Parte superior visible
            (formBottom >= windowTopPosition && formBottom <= windowBottomPosition) || // Parte inferior visible
            (formTop <= windowTopPosition && formBottom >= windowBottomPosition) || // Formulario abarca toda la pantalla
            (formTop - windowBottomPosition < 200 && formTop > windowBottomPosition) || // Estamos justo encima del formulario
            (windowTopPosition - formBottom < 200 && windowTopPosition > formBottom); // Estamos justo debajo del formulario
        }

        // Si el formulario está activo, considerarlo visible aunque no esté en la pantalla
        formVisible = formVisible || formIsActive;
      }

      // Mostrar el botón flotante solo si hay productos en el carrito y no estamos viendo el formulario
      if (!formVisible) {
        $('#fixed-checkout-button').css({
          'display': 'block',
          'visibility': 'visible',
          'opacity': '1',
          'z-index': '9999'
        }).removeClass('hidden');
        console.log('Mostrando botón flotante al hacer scroll - formulario no visible');
      } else {
        // Ocultar el botón si estamos viendo el formulario
        $('#fixed-checkout-button').css('display', 'none').addClass('hidden');
        console.log('Ocultando botón flotante al hacer scroll - formulario visible');
      }
    } else {
      // Si no hay productos en el carrito, ocultar el botón flotante
      $('#fixed-checkout-button').css('display', 'none').addClass('hidden');
    }
  });

  // --- Product Selection Logic ---
  var fieldsetsToShow = ['roma-negras', 'roma-suela', 'siena2025', 'venecia-negras']; // Add all product IDs
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

  // --- Add to Cart Button Logic ---
  $('.add-to-cart-btn').on('click', function() {
    var modelId = $(this).data('model');
    var $select = $('#talle-select-' + modelId);

    // Llamar a la función para agregar al carrito
    var added = addToCartFromButton(modelId);

    // Solo mostrar notificación y animar el botón si se agregó el producto
    if (added) {
      // Animar el botón del carrito
      $('#cart-button').addClass('pulse-once');
      setTimeout(function() {
        $('#cart-button').removeClass('pulse-once');
      }, 1000);
    }
  });

  // --- Update Order Summary ---
  var summaryInput = $("#1471599855");
  var miniCart = $("#mini-cart");
  var cartItemsContainer = $(".cart-items");
  var cartCountElement = $(".cart-count");
  var cartTotalElement = $(".cart-total span");
  var checkoutBtn = $("#checkout-btn");
  var restOfForm = $("#restodelform");

  $("#todoslosmodelos select.talle").change(function(){
    var $currentItem = $(this).closest('.product-item');
    var $select = $(this);
    var currentVal = $select.val();
    var prevVal = $select.data('pre') || "";

    // Solo almacenar el valor seleccionado, pero no agregarlo al carrito automáticamente
    $select.data('pre', currentVal);

    // Eliminar cualquier notificación previa
    $currentItem.find('.avisoagregado').remove();
  });

  // Función para agregar al carrito cuando se hace clic en el botón
  function addToCartFromButton(modelId) {
    // Obtener el selector correcto basado en el ID del modelo
    var $select;
    if (modelId.includes('-1') || modelId.includes('-2')) {
      // Si el ID incluye -1 o -2 (para el primer o segundo par)
      $select = $('#talle-select-' + modelId);
      if ($select.length === 0) {
        // Intentar encontrar el selector dentro del fieldset correspondiente
        var fieldsetId = 'hwA-' + modelId;
        $select = $('#' + fieldsetId + ' select.talle');
      }
    } else {
      // Fallback para buscar cualquier selector con ese modelo
      $select = $('select.talle[id*="' + modelId + '"]').first();
    }

    // Si aún no encontramos el selector, buscar dentro del botón que se hizo clic
    if ($select.length === 0) {
      $select = $('.add-to-cart-btn[data-model="' + modelId + '"]').closest('fieldset').find('select.talle');
    }

    console.log('Selector encontrado:', $select.length > 0 ? 'Sí' : 'No');

    // Obtener el elemento del producto actual
    var $currentItem = $select.closest('.product-item');

    var currentVal = $select.val();
    var prevVal = $select.data('pre') || "";

    // Verificar si se seleccionó un talle
    if (!currentVal) {
      alert('Por favor, selecciona un talle antes de agregar al carrito');
      if ($select.length > 0) {
        $select.focus();
      }
      return false;
    }

    // Verificar si el selector existe
    if ($select.length === 0) {
      console.error('No se encontró el selector para el modelo:', modelId);
      alert('Error al agregar al carrito. Por favor, intenta de nuevo.');
      return false;
    }

    // Process the summary content
    var summaryContent = summaryInput.val() || "";
    var summaryArray = summaryContent.split(', ').filter(Boolean);

    // Verificar si el producto ya está en el carrito
    if (summaryArray.includes(currentVal)) {
      // Si el producto ya está en el carrito, mostrar notificación
      showNotification('Este producto ya está en tu carrito', 'info');
      return false;
    }

    // Remove previous value if it exists
    if (prevVal) {
      summaryArray = summaryArray.filter(item => item !== prevVal);
    }

    // Add new value
    summaryArray.push(currentVal);

    // Mostrar notificación de éxito
    $select.closest('.form-group').prepend('<p class="avisoagregado">¡Agregado a tu pedido!</p>');

    // Check if we exceed the maximum allowed pairs
    if (summaryArray.length > 2) {
      alert("Puedes seleccionar un máximo de 2 pares. Por favor, revisa tu selección.");
      summaryArray = summaryArray.filter(item => item !== currentVal);
      $select.closest('.form-group').find('.avisoagregado').remove();
    } else {
      $select.data('pre', currentVal);
    }

    // Update the summary input and display
    summaryInput.val(summaryArray.join(', '));
    var finalSummary = summaryInput.val();
    $("#help-modelostallesseleccionados").text(finalSummary || '-');

    // Update cart items
    updateCart(summaryArray);

    // Update price display based on number of pairs
    var pairCount = summaryArray.length;
    var totalPriceText = "Elige tus modelos y talles para ver el total";
    var totalPrice = 0;

    if (pairCount >= 1) {
      // Activate checkout button
      checkoutBtn.removeClass('btn-disabled').text('Finalizar Compra');

      // Make checkout section active if there are items in cart
      if (pairCount === 1) {
        totalPrice = 70000;
        totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="70000">70.000</span> x 1 par</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Añade otro par por solo $55.000!</small>';

        // Si es el primer par que se agrega, mostrar el formulario automáticamente
        if (currentVal && prevVal === "") {
          // Mostrar y activar la sección de checkout
          restOfForm.removeClass('hidden inactive').addClass('active');

          // Mostrar notificación
          showNotification('¡Producto agregado! Completa tus datos para finalizar la compra.', 'success');

          // Desplazarse al formulario con una pequeña demora
          setTimeout(function() {
            $('html, body').animate({
              scrollTop: restOfForm.offset().top - 20
            }, 500);
          }, 500);
        }
      } else if (pairCount === 2) {
        totalPrice = 110000;
        totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="110000">110.000</span> x 2 pares</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Excelente precio ($55.000 c/u)!</small>';

        // If this is the second pair being added, show a more prominent notification
        if (currentVal && prevVal === "" && summaryArray.length === 2) {
          showNotification('¡Genial! Has completado tu selección de 2 pares. Completa tus datos para finalizar la compra.', 'success');

          // Asegurarse de que el formulario esté visible
          restOfForm.removeClass('hidden inactive').addClass('active');

          // Desplazarse al formulario
          setTimeout(function() {
            $('html, body').animate({
              scrollTop: restOfForm.offset().top - 20
            }, 500);
          }, 500);
        }
      } else {
        totalPriceText = "Has seleccionado más de 2 pares. Revisa tu selección.";
      }

      // Show notification that user can proceed
      if (currentVal && !prevVal) {
        showNotification('¡Producto agregado! Puedes continuar con tu compra o seguir explorando.', 'success');
      }
    } else {
      totalPrice = 0;
      totalPriceText = "Elige tus modelos y talles para ver el total";

      // Disable checkout button
      checkoutBtn.addClass('btn-disabled').text('Carrito vacío');

      // Ocultar el formulario si no hay productos en el carrito
      restOfForm.addClass('hidden').removeClass('active');
    }

    $("#preciototal").html(totalPriceText);

    // Recalculate price based on payment method
    $("#comoabona").trigger('change');

    // Mostrar notificación de éxito
    showNotification('¡Producto agregado al carrito!', 'success');

    // Mostrar el botón flotante si no estamos en la sección del formulario
    var formPosition = $('#datos-envio').offset().top;
    var windowTopPosition = $(window).scrollTop();

    if (windowTopPosition < formPosition - 200) {
      // Mostrar botón flotante original
      $('#floating-checkout-button').css({
        'display': 'block',
        'visibility': 'visible',
        'opacity': '1'
      }).removeClass('hidden');
      console.log('Mostrando botón flotante después de agregar producto');

      // Mostrar botón de emergencia también
      $('#emergency-checkout-button').css('display', 'block');
      console.log('Mostrando botón de emergencia después de agregar producto');
    }

    // Retornar true para indicar que el producto se agregó correctamente
    return true;
  }

  // Initialize select elements with empty previous value
  $("#todoslosmodelos select.talle").data('pre', '');

  // Continue to checkout button click handlers - para todos los botones flotantes
  $("#floating-continue-to-checkout, #emergency-checkout-button, #fixed-checkout-button").on('click', function(e) {
    e.preventDefault();
    console.log('Botón de continuar al envío clickeado');

    // Check if there are items in the cart
    if (cartItems.length > 0) {
      // Mostrar y activar la sección de checkout
      restOfForm.removeClass('hidden inactive').addClass('active');

      // Scroll to the checkout section
      window.scrollTo({
        top: $("#datos-envio").offset().top - 80,
        behavior: 'smooth'
      });

      // Update checkout progress
      currentStep = 2;
      updateCheckoutProgress(currentStep);

      // Focus the first field
      setTimeout(function() {
        $("#1465946249").focus();
      }, 500);

      // Mostrar notificación según la cantidad de productos
      if (cartItems.length === 1) {
        showNotification('Completa tus datos para finalizar la compra. ¡Recuerda que puedes agregar otro par con descuento!', 'info');
      } else {
        showNotification('Completa tus datos para finalizar la compra con tu descuento por 2 pares', 'success');
      }

      // Ocultar los botones flotantes cuando se muestra el formulario
      $('#floating-checkout-button').addClass('hidden').css('display', 'none');
      $('#emergency-checkout-button').css('display', 'none');
    } else {
      showNotification('Por favor, selecciona al menos un producto para continuar', 'error');
    }
  });

  // Back to products button
  $("#back-to-products").on('click', function(e) {
    e.preventDefault();

    // Scroll back to products section
    window.scrollTo({
      top: $("#todoslosmodelos").offset().top - 80,
      behavior: 'smooth'
    });

    // Update checkout progress
    currentStep = 1;
    updateCheckoutProgress(currentStep);

    // Mostrar el botón flotante si hay productos en el carrito
    if (cartItems.length > 0) {
      $('#floating-checkout-button').removeClass('hidden');
    }
  });

  // Checkout button in mini-cart
  $("#checkout-btn").on('click', function(e) {
    e.preventDefault();

    if (!$(this).hasClass('btn-disabled')) {
      // Cerrar el mini-carrito
      $('#mini-cart').removeClass('active');

      // Mostrar y activar la sección de checkout
      restOfForm.removeClass('hidden inactive').addClass('active');

      // Scroll to the checkout section
      window.scrollTo({
        top: $("#datos-envio").offset().top - 80,
        behavior: 'smooth'
      });

      // Update checkout progress
      currentStep = 2;
      updateCheckoutProgress(currentStep);

      // Mostrar notificación según la cantidad de productos
      if (cartItems.length === 1) {
        showNotification('Completa tus datos para finalizar la compra. ¡Recuerda que puedes agregar otro par con descuento!', 'info');
      } else {
        showNotification('Completa tus datos para finalizar la compra con tu descuento por 2 pares', 'success');
      }
    } else {
      showNotification('Agrega productos a tu carrito para continuar', 'error');
    }
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

    // Update floating summary if it exists
    var $floatingPriceSummary = $("#floating-price-summary");
    if ($floatingPriceSummary.length > 0) {
      var floatingHtml = $floatingPriceSummary.html();

      floatingHtml = floatingHtml.replace(/ <span style="color:#5a8f3e; font-weight:bold;">\(10% OFF Incluido\)<\/span>/g, '');

      if (isCBU) {
        floatingHtml = floatingHtml.replace(/(<\/span>)/, '$1' + discountText);
      }

      $floatingPriceSummary.html(floatingHtml);
    }
  });

  // Show WhatsApp button after a delay
  $("#whatsapp").delay(3000).fadeIn(400);

  // Store page URL for tracking without query parameters
  // This is also used as an anti-spam measure - real users will always have this field filled
  $("#1209868979").val(window.location.origin + window.location.pathname);

  // Ensure the landing URL is always set for real users
  if (!$("#1209868979").val()) {
    $("#1209868979").val(window.location.origin + window.location.pathname);
  }

  // --- Form Submission Logic ---
  $('#bootstrapForm').submit(async function (event) {
    event.preventDefault();
    var $form = $(this);
    var $submitButton = $('#botoncomprar');

    // Bot detection - Multiple methods
    // 1. Honeypot field check
    if ($('#website').val() !== '') {
      console.log('Bot detected via honeypot field.');
      return false;
    }

    // 2. Landing URL check - Real users will always have this field filled
    const landingUrl = $('#1209868979').val();
    if (!landingUrl || landingUrl.trim() === '') {
      console.log('Bot detected: Empty landing URL field.');
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

    // Get price based on payment method
    let monto;
    if (formaPago === "tarjeta" || formaPago === "mercadopago") {
      // For MercadoPago, always use the original price without discount
      const $priceSpan = $(".preciototalaobservar").first();
      monto = $priceSpan.data('original-price');

      // If data attribute is not available, get from text and calculate original price
      if (typeof monto === 'undefined') {
        const currentText = $priceSpan.text();
        monto = parseFloat(currentText.replace(/\./g, ''));

        // If CBU is selected, we need to calculate back the original price (divide by 0.9)
        if (formaPago === "cbu") {
          monto = Math.round(monto / 0.9);
        }
      }
    } else {
      // For CBU, use the discounted price
      const montoTexto = $(".preciototalaobservar").first().text();
      monto = parseFloat(montoTexto.replace(/\./g, ''));
    }

    console.log(`Monto a enviar (${formaPago}):`, monto);

    try {
      const formAction = $form.attr('action');
      const formData = new URLSearchParams($form.serialize());

      if (formaPago === "cbu") {
        // Process bank transfer payment
        console.log('Processing CBU payment...');
        // Check if Facebook Pixel is available before calling it
        if (typeof fbq !== 'undefined') {
          fbq('track', 'InitiateCheckout');
        }
        try {
          console.log('Enviando formulario al proxy (CBU)...');
          const formResponse = await fetch(formAction, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
          });

          // Verificar la respuesta del proxy
          if (formResponse.ok) {
            const responseData = await formResponse.json();
            console.log('Respuesta del proxy (CBU):', responseData);

            if (responseData.success) {
              console.log('Formulario enviado correctamente (CBU)');
            } else {
              console.error('Error en el proxy (CBU):', responseData.message);
            }
          } else {
            console.error('Error en la respuesta del proxy (CBU):', formResponse.status);
          }
        } catch (formError) {
          console.error('Error al enviar formulario (CBU):', formError);
          // Continuamos con la redirección aunque falle el envío del formulario
        }

        const pairCount = talleselegidos.split(',').filter(Boolean).length;
        const redirectUrl = pairCount === 2 ?
          'https://rositarococo.com/transferenciacbu-2pares.html' :
          'https://rositarococo.com/transferenciacbu-1par.html';

        // Store order data in sessionStorage instead of passing via URL
        sessionStorage.setItem('orderDetails', talleselegidos);
        sessionStorage.setItem('customerName', nombreComprador);

        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 500);

        return;
      } else if (formaPago === "tarjeta" || formaPago === "mercadopago") {
        // Process MercadoPago/Card payment
        console.log('Processing MercadoPago/Card payment...');
        // Check if Facebook Pixel is available before calling it
        if (typeof fbq !== 'undefined') {
          fbq('track', 'InitiateCheckout');
        }

        try {
          // Obtener link de MercadoPago
          console.log('Enviando datos a MercadoPago:', { comprador: nombreComprador, monto: monto });
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
          console.log('Respuesta del servidor:', responseText);

          let mercadoPagoUrl;
          try {
            const jsonData = JSON.parse(responseText);
            mercadoPagoUrl = jsonData.linkpersonalizadomp;

            if (!mercadoPagoUrl) {
              throw new Error('No se pudo obtener el link de MercadoPago');
            }

            console.log('Link de MercadoPago obtenido:', mercadoPagoUrl);
          } catch (parseError) {
            console.error('Error al procesar la respuesta:', parseError);
            throw new Error('Error al procesar la respuesta del servidor. Por favor, intente nuevamente.');
          }

          // Guardar link en el formulario
          $('#link-mercadopago').val(mercadoPagoUrl);
          document.getElementById('link-mercadopago').value = mercadoPagoUrl;

          // Enviar el formulario a nuestro proxy
          try {
            console.log('Enviando formulario al proxy...');
            const formResponse = await fetch(formAction, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams($form.serialize())
            });

            // Verificar la respuesta del proxy
            if (formResponse.ok) {
              const responseData = await formResponse.json();
              console.log('Respuesta del proxy:', responseData);

              if (responseData.success) {
                console.log('Formulario enviado correctamente');
              } else {
                console.error('Error en el proxy:', responseData.message);
                // Podríamos mostrar un mensaje al usuario aquí si es necesario
              }
            } else {
              console.error('Error en la respuesta del proxy:', formResponse.status);
            }
          } catch (formError) {
            console.error('Error al enviar formulario:', formError);
            // Continuamos con la redirección aunque falle el envío del formulario
          }

          // Luego redireccionar a MercadoPago (separado del envío del formulario)
          console.log('Redirigiendo a MercadoPago:', mercadoPagoUrl);

          // Usar una redirección directa sin setTimeout para evitar problemas
          try {
            // Crear un enlace y hacer clic en él (método alternativo de redirección)
            const redirectLink = document.createElement('a');
            redirectLink.href = mercadoPagoUrl;
            redirectLink.target = '_self';
            redirectLink.style.display = 'none';
            document.body.appendChild(redirectLink);

            console.log('Ejecutando redirección a MercadoPago...');
            setTimeout(() => {
              redirectLink.click();
            }, 500);
          } catch (redirectError) {
            console.error('Error en la redirección:', redirectError);

            // Intentar método alternativo de redirección
            console.log('Intentando método alternativo de redirección...');
            setTimeout(() => {
              window.location.replace(mercadoPagoUrl);
            }, 500);
          }
        } catch (webhookError) {
          console.error("MP link fetch error:", webhookError);

          // Mensaje de error más específico
          let errorMessage = 'Hubo un problema al generar el link de pago. Intenta nuevamente.';

          // Si es un error de conexión con el webservice
          if (webhookError.message && webhookError.message.includes('fetch')) {
            errorMessage = 'Error de conexión con el servidor de pagos. Verifica tu conexión a internet e intenta nuevamente.';
          }

          // Si es un error al procesar la respuesta JSON
          if (webhookError.message && webhookError.message.includes('JSON')) {
            errorMessage = 'Error al procesar la respuesta del servidor. Por favor, intenta nuevamente en unos minutos.';
          }

          // Si es un error relacionado con MercadoPago
          if (webhookError.message && webhookError.message.includes('MercadoPago')) {
            errorMessage = 'No se pudo generar el link de pago. Por favor, intenta nuevamente o elige otro método de pago.';
          }

          // Mostrar error al usuario
          alert(errorMessage);

          // Ocultar overlay y reactivar botón
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
    { product: "Botineta Roma Negras", city: "CABA", image: "roma-negras-1.jpg" },
    { product: "Borcego Siena 2025", city: "Córdoba", image: "siena2025-1.webp" },
    { product: "Botineta Roma Suela", city: "Rosario", image: "roma-suela-1a.jpg" },
    { product: "Botineta Roma Negras", city: "La Plata", image: "roma-negras-1.jpg" },
    { product: "Borcego Siena 2025", city: "Mendoza", image: "siena2025-1.webp" },
    { product: "Botineta Roma Suela", city: "Mar del Plata", image: "roma-suela-1a.jpg" }
  ];

  // Función para mostrar notificaciones de compra
  function showSaleNotification() {
    // Crear el contenedor de notificaciones si no existe
    if (!$('#sale-notification-container').length) {
      $('<div id="sale-notification-container"></div>').css({
        'position': 'fixed',
        'bottom': '90px',
        'right': '20px',
        'z-index': '9998',
        'width': '280px',
        'pointer-events': 'none'
      }).appendTo('body');
    }

    // Seleccionar una venta aleatoria
    const sale = salesData[Math.floor(Math.random() * salesData.length)];
    console.log('Mostrando notificación de compra con imagen:', sale.image);

    // Crear la notificación
    const notification = $(`
      <div class="sale-notification">
        <img src="${sale.image}" alt="${sale.product}" onerror="this.src='roma-negras-1.jpg'">
        <div class="order-info">
          <h3>¡Alguien compró!</h3>
          <p>${sale.product}</p>
          <div class="customer-info">
            <span>en ${sale.city}</span>
          </div>
        </div>
        <span class="close">&times;</span>
      </div>
    `);

    // Estilos para la notificación
    notification.css({
      'display': 'flex',
      'align-items': 'center',
      'background-color': 'white',
      'border-radius': '8px',
      'box-shadow': '0 2px 10px rgba(0,0,0,0.2)',
      'padding': '12px',
      'margin-bottom': '10px',
      'border-left': '3px solid #4CAF50',
      'transform': 'translateX(120%)',
      'opacity': '0',
      'transition': 'transform 0.3s ease, opacity 0.3s ease',
      'pointer-events': 'auto',
      'position': 'relative'
    });

    // Estilos para la imagen
    notification.find('img').css({
      'width': '50px',
      'height': '50px',
      'object-fit': 'cover',
      'border-radius': '4px',
      'margin-right': '10px',
      'border': '1px solid #ddd',
      'background-color': '#f8f8f8'
    }).on('error', function() {
      // Si la imagen no carga, usar una imagen de respaldo
      $(this).attr('src', 'roma-negras-1.jpg');
      console.log('Error al cargar la imagen, usando imagen de respaldo');
    });

    // Estilos para la información del pedido
    notification.find('.order-info').css({
      'flex': '1'
    });

    notification.find('h3').css({
      'margin': '0 0 3px 0',
      'font-size': '14px',
      'font-weight': '600'
    });

    notification.find('p').css({
      'margin': '0 0 3px 0',
      'font-size': '13px'
    });

    notification.find('.customer-info').css({
      'font-size': '12px',
      'color': '#666'
    });

    // Estilos para el botón de cierre
    notification.find('.close').css({
      'position': 'absolute',
      'top': '5px',
      'right': '8px',
      'font-size': '16px',
      'cursor': 'pointer',
      'color': '#999'
    }).on('click', function() {
      notification.css({
        'transform': 'translateX(120%)',
        'opacity': '0'
      });
      setTimeout(function() {
        notification.remove();
      }, 300);
    });

    // Agregar al contenedor
    $('#sale-notification-container').append(notification);

    // Mostrar con animación
    setTimeout(function() {
      notification.css({
        'transform': 'translateX(0)',
        'opacity': '1'
      });

      // Ocultar automáticamente después de 5 segundos
      setTimeout(function() {
        notification.css({
          'transform': 'translateX(120%)',
          'opacity': '0'
        });
        setTimeout(function() {
          notification.remove();
        }, 300);
      }, 5000);
    }, 100);
  }

  // Mostrar notificación de compra solo una vez por sesión
  setTimeout(function() {
    // Verificar si ya se mostró la notificación en esta sesión
    if (!sessionStorage.getItem('saleNotificationShown')) {
      showSaleNotification();

      // Marcar que ya se mostró la notificación
      sessionStorage.setItem('saleNotificationShown', 'true');
    }
  }, 3000);

  // Fin de la configuración de notificaciones

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
                // Add 'valid' class when the message indicates success (green color)
                errorElement.className = color === "green" ? "error-message valid" : "error-message";
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

  // WhatsApp button removed as requested

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
    // --- CSS Carousel Button Logic ---
    $('.css-carousel .carousel-btn').on('click', function() {
      const $button = $(this);
      const $carousel = $button.closest('.css-carousel');
      const $container = $carousel.find('.scroll-container');
      const scrollAmount = $container.width(); // Scroll by the width of the container (one item)

      if ($button.hasClass('next-btn')) {
        // Smooth scroll right
        $container.animate({ scrollLeft: $container.scrollLeft() + scrollAmount }, 300);
      } else if ($button.hasClass('prev-btn')) {
        // Smooth scroll left
        $container.animate({ scrollLeft: $container.scrollLeft() - scrollAmount }, 300);
      }
    });

  });

  // --- Helper Functions ---

  // Update cart display
  function updateCart(itemsArray) {
    // Asegurarse de que el botón del carrito sea visible
    ensureCartButtonVisible();

    // Clear current cart items
    cartItems = [];
    cartItemsContainer.empty();

    // Process each item
    itemsArray.forEach(function(item) {
      if (item) {
        var parts = item.split('-');
        var size = parts[0];
        var model = parts.slice(1).join('-');

        // Get product details
        var productName = getProductName(model);
        var productImage = getProductImage(model);
        var productPrice = itemsArray.length === 1 ? 70000 : 55000;

        // Add to cart items array
        cartItems.push({
          id: item,
          name: productName,
          size: size,
          price: productPrice,
          image: productImage
        });

        // Create cart item HTML
        var cartItemHTML = `
          <div class="cart-item" data-id="${item}">
            <img src="${productImage}" class="cart-item-image" alt="${productName}">
            <div class="cart-item-details">
              <div class="cart-item-name">${productName}</div>
              <div class="cart-item-size">Talle: ${size}</div>
            </div>
            <div class="cart-item-price">$${productPrice.toLocaleString('es-AR')}</div>
            <button class="cart-item-remove" data-id="${item}">×</button>
          </div>
        `;

        cartItemsContainer.append(cartItemHTML);
      }
    });

    // Update cart count in all places
    cartCountElement.text(cartItems.length);
    $('.tab-count').text(cartItems.length);
    $('.cart-button-count').text(cartItems.length);

    // Update cart total
    var total = cartItems.reduce(function(sum, item) {
      return sum + item.price;
    }, 0);

    cartTotalElement.text('$' + total.toLocaleString('es-AR'));

    // Show/hide empty cart message and update cart classes
    if (cartItems.length === 0) {
      $('.empty-cart-message').show();
      $('.cart-instructions').show();
      restOfForm.removeClass('active').addClass('hidden');
      miniCart.removeClass('has-items');

      // Ocultar botón flotante de continuar al envío
      $('#floating-checkout-button').addClass('hidden');

      // Resaltar la primera instrucción cuando el carrito está vacío
      $('.instruction-step:first-child').addClass('highlight');
      $('.instruction-step:not(:first-child)').removeClass('highlight');
    } else {
      $('.empty-cart-message').hide();
      $('.cart-instructions').show();
      miniCart.addClass('has-items');

      // Mostrar botón flotante de continuar al envío si no estamos en la sección del formulario
      var formPosition = $('#datos-envio').offset().top;
      var windowTopPosition = $(window).scrollTop();

      // Siempre mostrar el botón flotante cuando hay productos en el carrito
      // y no estamos en la sección del formulario
      $('#floating-checkout-button').removeClass('hidden');

      // Verificar si estamos en la sección del formulario
      if (windowTopPosition >= formPosition - 200) {
        $('#floating-checkout-button').addClass('hidden');
      }

      // Resaltar la última instrucción cuando hay productos
      $('.instruction-step:last-child').addClass('highlight');
      $('.instruction-step:not(:first-child)').removeClass('highlight');

      // Si hay exactamente 1 producto, mostrar mensaje sobre descuento por segundo par
      if (cartItems.length === 1) {
        showNotification('¡Agrega otro par y obtén un 21% de descuento! Segundo par a solo $55.000', 'info');
      }

      // Cuando hay 2 productos, mostrar notificación pero NO activar el formulario automáticamente
      if (cartItems.length === 2) {
        // Mostrar notificación de éxito
        showNotification('¡Excelente elección! Has completado tu selección de 2 pares con descuento. Puedes continuar cuando estés listo.', 'success');
      }

      // Mostrar el botón de emergencia
      showEmergencyButton();

      // Forzar la visibilidad del botón flotante original también
      var formPosition = $('#datos-envio').offset().top;
      var windowTopPosition = $(window).scrollTop();

      if (windowTopPosition < formPosition - 200) {
        $('#floating-checkout-button').css({
          'display': 'block',
          'visibility': 'visible',
          'opacity': '1'
        }).removeClass('hidden');
      }
    }

    // Setup remove buttons
    $('.cart-item-remove').on('click', function() {
      var itemId = $(this).data('id');
      removeFromCart(itemId);
    });
  }

  // Remove item from cart
  function removeFromCart(itemId) {
    // Find the select element with this value
    $('#todoslosmodelos select.talle').each(function() {
      if ($(this).val() === itemId) {
        $(this).val('').trigger('change');
      }
    });

    showNotification('Producto eliminado del carrito', 'info');
  }

  // Get product name from model ID
  function getProductName(model) {
    var names = {
      'roma-negras': 'Botineta Roma Negras',
      'roma-suela': 'Botineta Roma Suela',
      'siena2025': 'Borcego Siena 2025',
      'venecia-negras': 'Venecia Negras'
    };

    return names[model] || model;
  }

  // Get product image from model ID
  function getProductImage(model) {
    var images = {
      'roma-negras': 'roma-negras-1.jpg',
      'roma-suela': 'roma-suela-1a.jpg',
      'siena2025': 'siena2025-1.webp',
      'venecia-negras': 'venecia-negras-1a.jpg'
    };

    return images[model] || '';
  }

  // Update checkout progress display
  function updateCheckoutProgress(step) {
    // Update progress bar
    $('.progress-step').removeClass('active completed');
    $('.progress-connector').removeClass('active');

    for (var i = 1; i <= maxStep; i++) {
      if (i < step) {
        $(`.progress-step[data-step="${i}"]`).addClass('completed');
        if (i < maxStep) {
          $(`.progress-step[data-step="${i}"]`).next('.progress-connector').addClass('active');
        }
      } else if (i === step) {
        $(`.progress-step[data-step="${i}"]`).addClass('active');
      }
    }

    // Update checkout steps in form
    $('.checkout-step').removeClass('active completed');

    if (step === 2) {
      $('#shipping-step').addClass('active');
    } else if (step === 3) {
      $('#shipping-step').addClass('completed');
      $('#payment-step').addClass('active');
    }
  }

  // Show notification
  function showNotification(message, type) {
    console.log('Showing notification:', message, type);

    // Create notification container if it doesn't exist
    if (!$('#notification-container').length) {
      $('<div id="notification-container"></div>').css({
        'position': 'fixed',
        'bottom': '90px',
        'right': '20px',
        'z-index': '9998',
        'width': '280px',
        'pointer-events': 'none'
      }).appendTo('body');
    }

    // Determinar el color del borde según el tipo
    var borderColor = '#5bc0de'; // info (default)
    if (type === 'error') borderColor = '#d9534f';
    if (type === 'success') borderColor = '#4CAF50';

    // Crear la notificación
    var notification = $(`<div class="system-notification">${message}</div>`);

    // Aplicar estilos
    notification.css({
      'display': 'block',
      'background-color': 'white',
      'border-radius': '8px',
      'box-shadow': '0 2px 10px rgba(0,0,0,0.2)',
      'padding': '12px 15px',
      'margin-bottom': '10px',
      'border-left': '3px solid ' + borderColor,
      'transform': 'translateX(120%)',
      'opacity': '0',
      'transition': 'transform 0.3s ease, opacity 0.3s ease',
      'pointer-events': 'auto',
      'position': 'relative',
      'font-size': '14px',
      'text-align': 'left'
    });

    // Agregar al contenedor
    $('#notification-container').append(notification);

    // Mostrar con animación
    setTimeout(function() {
      notification.css({
        'transform': 'translateX(0)',
        'opacity': '1'
      });

      // Ocultar automáticamente después de 5 segundos
      setTimeout(function() {
        notification.css({
          'transform': 'translateX(120%)',
          'opacity': '0'
        });
        setTimeout(function() {
          notification.remove();
        }, 300);
      }, 5000);
    }, 100);
  }

  // Fin de las funciones de notificación

}); // End document ready
