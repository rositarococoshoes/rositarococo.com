// --- Rosita Rococó - Versión Contrareembolso ---

// Initialize functionalities once the DOM is ready
$(document).ready(function(){
  // Lazy loading de imágenes
  function loadVisibleImages() {
    $('img[data-lazy]').each(function() {
      var $img = $(this);
      if (!$img.attr('src') && isElementInViewport(this)) {
        var imgSrc = $img.attr('data-lazy');
        if (imgSrc) {
          $img.attr('src', imgSrc).removeAttr('data-lazy');
        }
      }
    });
  }

  // Función para verificar si un elemento está en el viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Variables para el carrito
  let cartItems = [];
  const cartButton = $('#cart-button');
  const miniCart = $('#mini-cart');
  const cartItemsContainer = $('.cart-items');
  const cartCount = $('.cart-button-count');
  const emptyCartMessage = $('.empty-cart-message');
  const cartTotal = $('.cart-total span');
  const checkoutBtn = $('#checkout-btn');
  const restOfForm = $('#restodelform');
  const floatingCheckoutBtn = $('#fixed-checkout-button');
  const floatingPriceSummary = $('#floating-price-summary');

  // Función para actualizar la visibilidad del formulario
  function updateFormVisibility() {
    if (cartItems.length > 0) {
      restOfForm.removeClass('hidden');
      floatingCheckoutBtn.show();
    } else {
      restOfForm.addClass('hidden');
      floatingCheckoutBtn.hide();
    }
  }

  // Función para actualizar el resumen del carrito
  function updateCartSummary() {
    // Actualizar contador
    const itemCount = cartItems.length;
    cartCount.text(itemCount);

    // Actualizar contenido del carrito
    if (itemCount === 0) {
      emptyCartMessage.show();
      cartItemsContainer.hide();
      checkoutBtn.addClass('btn-disabled').text('Carrito vacío');
      cartTotal.text('$0');
      $("#preciototal").html("Elige tus modelos y talles para ver el total");
      return;
    }

    // Mostrar items y ocultar mensaje de vacío
    emptyCartMessage.hide();
    cartItemsContainer.show();
    checkoutBtn.removeClass('btn-disabled').text('Continuar al Envío →');

    // Limpiar y reconstruir lista de items
    cartItemsContainer.empty();
    let totalPrice = 0;
    let totalPriceText = "";
    const pairCount = cartItems.length;

    // Construir lista de items
    cartItems.forEach((item, index) => {
      const itemElement = $(`
        <div class="cart-item">
          <div class="item-details">
            <div class="item-name">${item.model}</div>
            <div class="item-size">Talle: ${item.size}</div>
          </div>
          <button class="remove-item" data-index="${index}">×</button>
        </div>
      `);
      cartItemsContainer.append(itemElement);
    });

    // Calcular precio total basado en cantidad de pares
    if (pairCount === 1) {
      totalPrice = 60000; // Precio para 1 par
      totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="60000">60.000</span> x 1 par</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>Si agregas otro par te llevas cada uno a sólo $42.500</small>';
    } else if (pairCount === 2) {
      totalPrice = 85000; // Precio para 2 pares
      totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="85000">85.000</span> x 2 pares</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Excelente precio ($42.500 c/u)!</small>';
    } else {
      totalPrice = 0;
      totalPriceText = "Elige tus modelos y talles para ver el total";

      // Disable checkout button
      checkoutBtn.addClass('btn-disabled').text('Carrito vacío');

      // Ocultar el formulario si no hay productos en el carrito
      restOfForm.addClass('hidden').removeClass('active');
    }

    $("#preciototal").html(totalPriceText);

    // Mostrar notificación de éxito
    showNotification('¡Producto agregado al carrito!', 'success');

    // Actualizar la visibilidad del botón flotante y el formulario
    updateFormVisibility();

    // Retornar true para indicar que el producto se agregó correctamente
    return true;
  }

  // Initialize select elements with empty previous value
  $("#todoslosmodelos select.talle").data('pre', '');

  // Continue to checkout button click handlers - para el botón flotante
  $("#floating-continue-to-checkout, #fixed-checkout-button").on('click', function(e) {
    e.preventDefault();
    console.log('Botón de continuar al envío clickeado');
    
    // Mostrar la sección del formulario
    restOfForm.removeClass('hidden').addClass('active');
    
    // Desplazarse al formulario
    $('html, body').animate({
      scrollTop: restOfForm.offset().top - 20
    }, 500);
    
    // Ocultar el botón flotante
    floatingCheckoutBtn.hide();
  });

  // Abrir/cerrar carrito
  cartButton.on('click', function() {
    miniCart.toggleClass('open');
  });

  // Cerrar carrito con botón X
  $('.cart-close').on('click', function() {
    miniCart.removeClass('open');
  });

  // Cerrar carrito al hacer clic fuera
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#mini-cart, #cart-button').length) {
      miniCart.removeClass('open');
    }
  });

  // Eliminar item del carrito
  $(document).on('click', '.remove-item', function() {
    const index = $(this).data('index');
    cartItems.splice(index, 1);
    updateCartSummary();
  });

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

  // Función para agregar al carrito
  function addToCart(model, size, color) {
    if (!size || size === '') {
      alert('Por favor, selecciona un talle');
      return false;
    }

    // Agregar al carrito
    cartItems.push({
      model: model,
      size: size,
      color: color || ''
    });

    // Actualizar el carrito
    updateCartSummary();

    // Mostrar el carrito brevemente
    miniCart.addClass('open');
    setTimeout(function() {
      miniCart.removeClass('open');
    }, 3000);

    return true;
  }

  // Manejar cambios en los selectores de talle
  $("#todoslosmodelos select.talle").change(function() {
    const $select = $(this);
    const value = $select.val();
    
    // Si no hay valor seleccionado, no hacer nada
    if (!value) return;
    
    // Obtener información del producto
    const fieldsetId = $select.closest('fieldset').attr('id');
    const modelParts = fieldsetId.split('-');
    const modelNumber = modelParts[modelParts.length - 1];
    const modelBase = fieldsetId.replace(`-${modelNumber}`, '').replace('hwA-', '');
    
    // Construir nombre del modelo
    let modelName = modelBase.replace(/-/g, ' ');
    modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    
    // Extraer talle del valor seleccionado
    const sizeParts = value.split('-');
    const size = sizeParts[0];
    
    // Agregar al carrito
    addToCart(modelName, size);
    
    // Limpiar el selector después de agregar
    $select.val('');
  });

  // Update summary as user fills in form fields
  $("#1460904554, #1465946249, #53830725, #951592426, #1743418466, #59648134, #1005165410, #541001873, #1756027935").on('keyup change input', function() {
    $("#help-nombre").text($("#1460904554").val() || '-');
    $("#help-wapp").text($("#53830725").val() || '-');
    $("#help-email").text($("#1465946249").val() || '-');
    $("#help-calleyaltura").text($("#951592426").val() || '-');
    $("#help-localidad").text($("#1743418466").val() || '-');
    $("#help-provincia").text($("#59648134 option:selected").text().replace('-- Selecciona tu Provincia --','') || '-');
    $("#help-cp").text($("#1005165410").val() || '-');
    $("#help-dni").text($("#541001873").val() || '-');
    $("#help-diayhora").text($("#1756027935").val() || '-');
    
    // Actualizar dirección completa
    const calle = $("#951592426").val() || '-';
    const localidad = $("#1743418466").val() || '-';
    const cp = $("#1005165410").val() || '-';
    const provincia = $("#59648134 option:selected").text().replace('-- Selecciona tu Provincia --','') || '-';
    
    $("#help-address-combined").text(`${calle}, ${localidad} (${cp}), ${provincia}`);
  });

  // Initial trigger for province and delivery date
  $("#59648134, #1756027935").trigger('change');

  // Store page URL for tracking without query parameters
  // This is also used as an anti-spam measure - real users will always have this field filled
  $("#1209868979").val(window.location.origin + window.location.pathname);

  // Ensure the landing URL is always set for real users
  if (!$("#1209868979").val()) {
    $("#1209868979").val(window.location.origin + window.location.pathname);
  }

  // --- Form Submission Logic ---
  // Nota: La lógica de envío del formulario ahora está en form-handler-contrareembolso.js
  // Este código solo realiza validaciones iniciales y luego permite que form-handler-contrareembolso.js maneje el resto
  $('#bootstrapForm').submit(function (event) {
    // No usamos event.preventDefault() aquí para permitir que form-handler-contrareembolso.js maneje el envío

    var $form = $(this);
    var $submitButton = $('#botoncomprar');

    // Bot detection - Multiple methods
    // 1. Honeypot field check
    if ($('#website').val() !== '') {
      console.log('Bot detectado via honeypot field.');
      return false;
    }

    // 2. Landing URL check - Real users will always have this field filled
    const landingUrl = $('#1209868979').val();
    if (!landingUrl || landingUrl.trim() === '') {
      console.log('Bot detectado: Empty landing URL field.');
      return false;
    }

    // Form validation
    if (!this.checkValidity()) {
      alert('Por favor, completa todos los campos obligatorios (*) correctamente.');
      $submitButton.val('COMPRAR 🛒').prop('disabled', false);
      $form.find(':invalid').first().focus();
      return false;
    }

    // Check if products were selected
    const talleselegidos = $('#286442883').val();
    console.log("Talles elegidos:", talleselegidos);

    // Mejorar la validación para manejar correctamente el formato "valor1, valor2, "
    const itemsArray = talleselegidos ? talleselegidos.split(', ').filter(item => item && item.trim() !== '') : [];
    console.log("Items filtrados para validación:", itemsArray);

    if (!talleselegidos || itemsArray.length === 0) {
      alert('¡No has seleccionado ningún par! Elige tus modelos y talles.');
      $submitButton.val('COMPRAR 🛒').prop('disabled', false);
      $('html, body').animate({
        scrollTop: $("#todoslosmodelos").offset().top - 20
      }, 500);
      return false;
    }

    // Check WhatsApp validation status before submitting
    const whatsappInput = getInputElement("53830725");
    const errorElement = getErrorElement();
    if (!whatsappInput || !errorElement || !errorElement.classList.contains('valid')) {
        alert('Por favor, verifica tu número de WhatsApp antes de continuar.');
        $submitButton.val('COMPRAR 🛒').prop('disabled', false);
        if (whatsappInput) whatsappInput.focus();
        return false;
    }

    // Verificar que se haya seleccionado un día y hora de entrega
    const diaHora = $('#1756027935').val();
    if (!diaHora || diaHora.trim() === '') {
        alert('Por favor, selecciona un día y hora para la entrega.');
        $('#1756027935').focus();
        $submitButton.val('COMPRAR 🛒').prop('disabled', false);
        return false;
    }

    // Mostrar el spinner de carga
    $submitButton.val('Procesando...').prop('disabled', true);
    $('.loading-overlay').addClass('visible');

    console.log("Validación inicial completada. Permitiendo que form-handler-contrareembolso.js maneje el envío.");

    // Permitir que form-handler-contrareembolso.js maneje el resto del proceso
    // No hacemos return false aquí para permitir que el evento continúe
  });

  // Volver a productos (botón en el formulario)
  $('#back-to-products').on('click', function(e) {
    e.preventDefault();
    restOfForm.addClass('hidden').removeClass('active');
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });

  // Inicializar validación de WhatsApp
  (function() {
    const whatsappInputId = "53830725";
    const dependentElementIds = ["59648134", "1743418466", "1005165410", "951592426", "541001873", "1756027935", "botoncomprar"];
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
        let errorElement = getErrorElement();
        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.className = errorClass;
            errorElement.setAttribute("data-target", whatsappInputId);
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
        return errorElement;
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
            
            if (message === "Verificando WhatsApp...") {
                errorElement.className = "error-message verifying";
            } else {
                errorElement.className = "error-message";
                if (color === "green") {
                    errorElement.classList.add("valid");
                }
                errorElement.style.backgroundColor = color === "green" ? "#d4edda" : "#f8d7da";
                errorElement.style.color = color === "green" ? "#155724" : "#721c24";
                errorElement.style.border = color === "green" ? "1px solid #c3e6cb" : "1px solid #f5c6cb";
            }
            
            errorElement.style.display = "block";
        }
    }

    function formatNumber(number) {
        let rawNumber = number.replace(/\D/g, "");
        if (rawNumber.length >= 10) {
            if (rawNumber.startsWith("54") && !rawNumber.startsWith("549")) {
                rawNumber = "549" + rawNumber.substring(2);
            } else if (!rawNumber.startsWith("54")) {
                rawNumber = "549" + rawNumber;
            }
        }
        return rawNumber;
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
        if (isChecking) return;
        isChecking = true;

        const inputElement = getInputElement(whatsappInputId);
        if (!inputElement) {
            console.error("WhatsApp input element not found.");
            isChecking = false;
            return;
        }

        createErrorElement(inputElement);
        showError("Verificando WhatsApp...");

        const formattedNumber = formatNumber(inputElement.value);
        console.log("Validating number:", formattedNumber);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    isValid = data.exists === true;
                    if (isValid) {
                        showError("WhatsApp verificado correctamente", "green");
                        setDependentElementsDisabled(false);
                    } else {
                        showError("WhatsApp no válido. Verifica el número.", "red");
                        setDependentElementsDisabled(true);
                    }
                } else {
                    showError("Error al verificar WhatsApp. Intenta de nuevo.", "orange");
                    setDependentElementsDisabled(true);
                }
                isChecking = false;
            }
        };
        xhr.send(JSON.stringify({ whatsapp_check: formattedNumber }));
    }

    function clearErrorAndValidate() {
        hideError();
        clearTimeout(timeout);
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

  // Inicializar selector de día y hora para la entrega
  $(document).ready(function() {
    // Obtener el día actual y la hora actual
    var today = moment();
    var currentTime = moment().format("HH:mm");

    // Obtener el día de la semana actual en formato numérico
    var todayNum = today.isoWeekday();

    // Definir las fechas disponibles según el día y la hora actual
    var availableDates = [];

    if (todayNum == 1) {
      if (currentTime < "23:50") {
        availableDates.push(today.clone().add(3, "days"));
      } else {
        availableDates.push(today.clone().add(3, "days"));
      }
    } else if (todayNum == 2) {
      if (currentTime < "23:50") {
        availableDates.push(today.clone().add(2, "days"));
      } else {
        availableDates.push(today.clone().add(2, "days"));
      }
    } else if (todayNum == 3) {
      if (currentTime < "23:50") {
        availableDates.push(today.clone().add(1, "weeks").isoWeekday(4));
      } else {
        availableDates.push(today.clone().add(1, "weeks").isoWeekday(4));
      }
    } else if (todayNum == 4) {
      if (currentTime < "23:50") {
        availableDates.push(today.clone().add(1, "weeks").isoWeekday(4));
      } else {
        availableDates.push(today.clone().add(1, "weeks").isoWeekday(4));
      } 
    } else if (todayNum == 5) {
      if (currentTime < "23:50") {
        availableDates.push(today.clone().add(1, "weeks").isoWeekday(4));
      } else {
        availableDates.push(today.clone().add(1, "weeks").isoWeekday(4));
      }  
    } else if (todayNum == 6) {
      if (currentTime < "23:50") {
        availableDates.push(today.clone().add(1, "weeks").isoWeekday(4));
      } else {
        availableDates.push(today.clone().add(1, "weeks").isoWeekday(4));
      }    
    } else {
      availableDates.push(today.clone().add(4, "days"));
    }

    // Agregar las opciones al selector de fechas
    $.each(availableDates, function(index, value) {
      var optionText = value.format("dddd D [de] MMMM") + " de 15hs a 22hs";
      var option = $("<option></option>").attr("value", optionText).text(optionText);
      $("#1756027935").append(option);
    });

    // establecer el estilo uppercase para las opciones
    $('#1756027935 option').css('text-transform', 'uppercase');

    // Obtener el segundo valor del select
    var segundoValor = $('#1756027935 option:eq(1)').val();

    // Asignar el segundo valor al elemento #entregamasrapida
    $('.entregamasrapida').text(segundoValor).css({ 'text-transform': 'uppercase', 'font-size': '12px'});
  });

  // Mostrar pop-over al hacer clic en el enlace
  $(".instructions-link").on("click", function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace (ir a la URL)
    $("#instructions-popover").show(); // Mostrar pop-over
  });

  // Ocultar pop-over al hacer clic en la capa transparente
  $("#overlay").on("click", function() {
    $("#instructions-popover").hide(); // Ocultar pop-over
  });

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

  // Actualizar precios en todos los productos
  $(".select p span").each(function() {
    var text = $(this).html();
    // Actualizar precios para 1 par
    text = text.replace(/\$55\.000/g, "$60.000");
    // Actualizar precios para 2 pares
    text = text.replace(/\$80\.000/g, "$85.000");
    $(this).html(text);
  });

  // Actualizar precios en el carrito
  $("#preciototal, #preciototal2").each(function() {
    var text = $(this).html();
    // Actualizar precios para 1 par
    text = text.replace(/\$55\.000/g, "$60.000");
    // Actualizar precios para 2 pares
    text = text.replace(/\$80\.000/g, "$85.000");
    // Actualizar precio por par
    text = text.replace(/\$40\.000/g, "$42.500");
    $(this).html(text);
  });

  // Inicializar variables para el scroll
  let scrollTimer;
});
