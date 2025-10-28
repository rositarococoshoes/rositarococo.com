// --- Rosita Rococó - Rediseño Otoñal Elegante 2.0 ---

// Función auxiliar para obtener cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}

// Función robusta para detectar si algún modal de WhatsApp está activo
function isAnyWhatsAppModalActive() {
  try {
    // Lista de posibles tipos de modales de WhatsApp
    const whatsappModalTypes = [
      'whatsapp-modal',
      'whatsapp-direct-modal',
      'whatsapp-popover',
      'whatsapp-widget',
      'wa-modal',
      'wa-popover'
    ];

    // Verificar cada tipo de modal
    for (const modalType of whatsappModalTypes) {
      const modal = document.getElementById(modalType);
      if (modal) {
        // Verificar múltiples formas de detectar si el modal está activo
        const isActive =
          modal.classList.contains('active') ||
          modal.classList.contains('show') ||
          modal.classList.contains('visible') ||
          modal.classList.contains('open') ||
          modal.style.display === 'block' ||
          (modal.style.display !== 'none' && modal.offsetWidth > 0 && modal.offsetHeight > 0);

        if (isActive) {
          console.log(`🛒 Modal de WhatsApp activo detectado: ${modalType}`);
          return true;
        }
      }
    }

    // También buscar modales por clase CSS (más amplio)
    const modalSelectors = [
      '.whatsapp-modal.active',
      '.whatsapp-modal.show',
      '.whatsapp-modal.visible',
      '.whatsapp-modal.open',
      '.wa-modal.active',
      '.wa-modal.show',
      '.wa-modal.visible',
      '.wa-modal.open',
      '[id*="whatsapp"][class*="active"]',
      '[id*="whatsapp"][class*="show"]',
      '[id*="whatsapp"][class*="visible"]',
      '[id*="whatsapp"][class*="open"]'
    ];

    for (const selector of modalSelectors) {
      const modals = document.querySelectorAll(selector);
      if (modals.length > 0) {
        console.log(`🛒 Modal de WhatsApp activo detectado por selector: ${selector}`);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error al detectar modal de WhatsApp:', error);
    // En caso de error, asumir que no hay modal activo para no interferir con el carrito
    return false;
  }
}

// Función para mostrar mensajes en el carrito
window.showCartMessage = function(message, type = 'info', duration = 5000) {
  console.log('🛒 Mostrando mensaje del carrito:', message, 'Tipo:', type);
  
  const cartMessagesArea = document.getElementById('cart-messages');
  if (!cartMessagesArea) {
    console.warn('🛒 Área de mensajes del carrito no encontrada');
    return;
  }

  // Crear estructura HTML completa del mensaje
  const messageDiv = document.createElement('div');
  messageDiv.className = `cart-message cart-message-${type}`;
  
  // Crear texto del mensaje
  const messageText = document.createElement('div');
  messageText.className = 'message-text';
  messageText.textContent = message;
  
  // Crear botón de cierre
  const closeButton = document.createElement('button');
  closeButton.className = 'message-close';
  closeButton.innerHTML = '×';
  closeButton.title = 'Cerrar mensaje';
  
  // Agregar evento de cierre
  closeButton.addEventListener('click', function() {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
    // Verificar si el área de mensajes está vacía
    if (cartMessagesArea.children.length === 0) {
      cartMessagesArea.style.display = 'none';
    }
  });
  
  // Ensamblar el mensaje
  messageDiv.appendChild(messageText);
  messageDiv.appendChild(closeButton);

  // Insertar mensaje al inicio
  cartMessagesArea.insertBefore(messageDiv, cartMessagesArea.firstChild);

  // Forzar que el área de mensajes sea visible
  cartMessagesArea.style.display = 'block';
  cartMessagesArea.style.visibility = 'visible';
  cartMessagesArea.style.opacity = '1';

  console.log('🛒 Mensaje agregado al área de mensajes. Total de mensajes:', cartMessagesArea.children.length);

  // Auto-remover mensaje si duration > 0
  if (duration > 0) {
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
      // Verificar si el área de mensajes está vacía
      if (cartMessagesArea.children.length === 0) {
        cartMessagesArea.style.display = 'none';
      }
    }, duration);
  }
};

// Funciones auxiliares para mensajes específicos
window.showCartSuccess = function(message, duration = 5000) {
  showCartMessage(message, 'success', duration);
};

window.showCartError = function(message, duration = 0) {
  showCartMessage(message, 'error', duration);
};

window.showCartWarning = function(message, duration = 0) {
  showCartMessage(message, 'warning', duration);
};

window.showCartInfo = function(message, duration = 3000) {
  showCartMessage(message, 'info', duration);
};

// Función para obtener imagen del producto
function getProductImage(productValue) {
  const isContrareembolso = (typeof IS_CONTRAREEMBOLSO_PAGE !== 'undefined' && IS_CONTRAREEMBOLSO_PAGE);
  
  // Para páginas de contrareembolso (Milán, Trento, Parma)
  if (isContrareembolso) {
    if (productValue.includes('milan')) {
      return 'nuevosmodeloscontra/1.webp';
    } else if (productValue.includes('trento')) {
      return 'nuevosmodeloscontra/10.webp';
    } else if (productValue.includes('parma')) {
      return 'nuevosmodeloscontra/17.webp';
    }
  } else {
    // Para otras páginas
    if (productValue.includes('guillermina-negras')) {
      return 'guillerminafotos/1.webp';
    } else if (productValue.includes('guillermina-camel')) {
      return 'guillerminafotos/guillerminascamel/1.webp';
    } else if (productValue.includes('guillermina-blancas')) {
      return 'guillerminafotos/guillerminasblancas/1.webp';
    } else if (productValue.includes('birk-negras')) {
      return 'birknegras/1.webp';
    } else if (productValue.includes('birk-camel')) {
      return 'birkcamel/1.webp';
    } else if (productValue.includes('birk-blancas')) {
      return 'birkblancas/1.webp';
    } else if (productValue.includes('paris-negras')) {
      return 'paris2025-negras.webp';
    }
  }

  // Imagen por defecto
  return isContrareembolso ? 'nuevosmodeloscontra/1.webp' : 'guillerminafotos/1.webp';
}

// Función para obtener nombre del producto
function getProductName(productValue) {
  const isContrareembolso = (typeof IS_CONTRAREEMBOLSO_PAGE !== 'undefined' && IS_CONTRAREEMBOLSO_PAGE);
  
  if (isContrareembolso) {
    if (productValue.includes('milan')) return 'Milán';
    if (productValue.includes('trento')) return 'Trento';
    if (productValue.includes('parma')) return 'Parma';
  } else {
    if (productValue.includes('guillermina-negras')) return 'Guillerminas Negras';
    if (productValue.includes('guillermina-camel')) return 'Guillerminas Camel';
    if (productValue.includes('guillermina-blancas')) return 'Guillerminas Blancas';
    if (productValue.includes('birk-negras')) return 'Birk Negras';
    if (productValue.includes('birk-camel')) return 'Birk Camel';
    if (productValue.includes('birk-blancas')) return 'Birk Blancas';
    if (productValue.includes('paris-negras')) return 'Paris Negras';
  }
  
  return 'Producto';
}

// Initialize functionalities once the DOM is ready
$(document).ready(function(){
  // --- Cart & Checkout Process Variables ---
  window.cartItems = []; // Hacer global para depuración
  var cartItems = window.cartItems;
  var currentStep = 1;
  var maxStep = 3;

  // Asegurar que el campo 286442883 esté sincronizado con 1471599855
  // Esto es crucial para la compatibilidad con el código existente
  function syncHiddenFields() {
    if ($('#286442883').length && $('#1471599855').length) {
      var value1471599855 = $('#1471599855').val();
      var value286442883 = $('#286442883').val();

      // Si hay un valor en 1471599855 pero no en 286442883, sincronizar
      if (value1471599855 && !value286442883) {
        $('#286442883').val(value1471599855);
        // console.log('Campo #286442883 sincronizado con #1471599855:', value1471599855);
      }
      // Si hay un valor en 286442883 pero no en 1471599855, sincronizar
      else if (value286442883 && !value1471599855) {
        $('#1471599855').val(value286442883);
        // console.log('Campo #1471599855 sincronizado con #286442883:', value286442883);
      }
    }
  }

  // Llamar a la sincronización al inicio
  syncHiddenFields();

  // Configurar un intervalo para mantener los campos sincronizados
  setInterval(syncHiddenFields, 2000);

  // Initialize checkout progress
  updateCheckoutProgress(currentStep);

  // Función para actualizar el progreso del checkout
  function updateCheckoutProgress(step) {
    // Actualizar la barra de progreso visual
    var progressBar = $("#checkout-progress-bar");
    if (progressBar.length) {
      var progressWidth = (step / maxStep) * 100;
      progressBar.css("width", progressWidth + "%");
    }

    // Actualizar los pasos del checkout
    $(".checkout-step").removeClass("active completed");
    
    for (var i = 1; i <= maxStep; i++) {
      var stepElement = $(".checkout-step[data-step='" + i + "']");
      if (i < step) {
        stepElement.addClass("completed");
      } else if (i === step) {
        stepElement.addClass("active");
      }
    }

    // También actualizar el progreso principal si existe
    var checkoutProgress = $("#checkout-progress");
    if (checkoutProgress.length) {
      checkoutProgress.find(".progress-step").removeClass("active completed");
      for (var j = 1; j <= 3; j++) {
        var progressStep = checkoutProgress.find(".progress-step[data-step='" + j + "']");
        if (j < step) {
          progressStep.addClass("completed");
        } else if (j === step) {
          progressStep.addClass("active");
        }
      }
    }

    console.log('Progreso del checkout actualizado al paso:', step);
  }

  // Función para actualizar el carrito
  function updateCart(itemsArray) {
    // Actualizar el array global de items del carrito
    cartItems = itemsArray || [];
    
    // Limpiar contenedor de items del carrito
    var cartItemsContainer = $(".cart-items");
    cartItemsContainer.empty();
    
    // Si hay items, mostrarlos
    if (itemsArray && itemsArray.length > 0) {
      // Ocultar mensaje de carrito vacío
      $('.empty-cart-message').hide();
      
      // Crear elementos para cada item
      itemsArray.forEach(function(item, index) {
        var itemElement = $('<div>').addClass('cart-item').attr('data-id', index + 1);
        var itemImage = $('<div>').addClass('cart-item-image');
        var itemDetails = $('<div>').addClass('cart-item-details');
        var itemName = $('<div>').addClass('cart-item-name').text(getProductName(item) + ' - Talle ' + item.split('-')[0]);
        var removeButton = $('<button>').addClass('remove-item').html('&times;').attr('data-id', index + 1);
        
        // Agregar imagen del producto
        var productImg = $('<img>').attr('src', getProductImage(item)).attr('alt', getProductName(item));
        productImg.on('error', function() {
          $(this).attr('src', getProductImage(item));
        });
        itemImage.append(productImg);
        
        itemDetails.append(itemName);
        itemElement.append(itemImage, itemDetails, removeButton);
        cartItemsContainer.append(itemElement);
      });
      
      // Configurar eventos para botones de remover
      $('.remove-item').on('click', function() {
        var itemId = $(this).data('id');
        var currentItems = cartItems.slice();
        currentItems.splice(itemId - 1, 1);
        
        // Actualizar el campo de resumen
        if (summaryInput.length) {
          summaryInput.val(currentItems.join(', '));
          summaryInput.trigger('change');
        }
        
        // Actualizar carrito
        updateCart(currentItems);
        
        // Actualizar botón de checkout
        if (currentItems.length > 0) {
          checkoutBtn.removeClass('btn-disabled').text('Continuar al Envío →');
        } else {
          checkoutBtn.addClass('btn-disabled').text('Carrito vacío');
        }
      });
      
    } else {
      // Mostrar mensaje de carrito vacío
      $('.empty-cart-message').show();
    }
    
    // Actualizar contador del carrito
    var itemCount = itemsArray ? itemsArray.length : 0;
    $('.cart-count, .cart-button-count').text(itemCount);
    
    // Actualizar total del carrito (texto simple)
    var cartTotalElement = $(".cart-total span");
    if (cartTotalElement.length) {
      const isContrareembolso = (typeof IS_CONTRAREEMBOLSO_PAGE !== 'undefined' && IS_CONTRAREEMBOLSO_PAGE);
      if (itemCount === 1) {
        cartTotalElement.text(isContrareembolso ? "$55.000" : "$60.000");
      } else if (itemCount === 2) {
        cartTotalElement.text(isContrareembolso ? "$85.000" : "$95.000");
      } else {
        cartTotalElement.text("$0");
      }
    }
    
    console.log('Carrito actualizado con', itemCount, 'items:', itemsArray);
  }

  // Sistema unificado de eventos del carrito
  var cartEventHandlers = {
    init: function() {
      // Configurar eventos del botón principal del carrito
      $('#cart-button, .cart-button-icon, .cart-button-count').on('click.cart', function(e) {
        e.stopPropagation();
        cartState.toggle();
      });

      // Mantener compatibilidad con botones antiguos
      $('.mini-cart-tab, .tab-icon, .tab-text').on('click.cart', function(e) {
        e.stopPropagation();
        cartState.toggle();
      });

      // Cerrar carrito al hacer clic fuera
      $(document).on('click.cart', function(e) {
        // Verificar si el carrito está abierto y el clic fue fuera del carrito
        if (!$(e.target).closest('#mini-cart').length && cartState.isOpen) {
          // Verificar si el clic viene de dentro de algún modal de WhatsApp
          const isClickInsideWhatsAppModal = $(e.target).closest('.whatsapp-modal').length > 0 ||
                                            $(e.target).closest('.whatsapp-modal-content').length > 0 ||
                                            $(e.target).hasClass('whatsapp-modal') ||
                                            $(e.target).hasClass('whatsapp-modal-overlay') ||
                                            $(e.target).hasClass('whatsapp-modal-button') ||
                                            $(e.target).hasClass('whatsapp-modal-input') ||
                                            $(e.target).parents('.whatsapp-modal').length > 0;

          console.log('🛒 Clic fuera detectado:', {
            target: e.target,
            targetId: e.target.id,
            targetClass: e.target.className,
            isCartOpen: cartState.isOpen,
            isClickInsideWhatsAppModal: isClickInsideWhatsAppModal,
            modalDetails: isClickInsideWhatsAppModal ? 'Clic dentro del modal de WhatsApp' : 'Clic fuera de todos los modales'
          });

          // Solo cerrar el carrito si el clic NO viene de dentro del modal de WhatsApp
          if (!isClickInsideWhatsAppModal) {
            console.log('🛒 Cerrando carrito por clic fuera - clic no viene del modal de WhatsApp');
            cartState.close();
          } else {
            console.log('🛒 Clic dentro del modal de WhatsApp - carrito permanece abierto');
          }
        }
      });

      // Cerrar carrito con el botón de cierre
      $('.cart-close').on('click.cart', function(e) {
        e.stopPropagation();
        e.preventDefault();
        cartState.close();
        console.log('🛒 Carrito cerrado manualmente');
      });

      // Prevenir que los clics dentro del carrito lo cierren
      $('#mini-cart').on('click.cart', function(e) {
        e.stopPropagation();
      });
    },

    destroy: function() {
      // Remover todos los event handlers del carrito
      $('#cart-button, .cart-button-icon, .cart-button-count, .mini-cart-tab, .tab-icon, .tab-text').off('click.cart');
      $(document).off('click.cart');
      $('.cart-close').off('click.cart');
      $('#mini-cart').off('click.cart');
    }
  };

  // Inicializar eventos del carrito
  cartEventHandlers.init();

  // Sistema unificado de gestión del estado del carrito
  var cartState = {
    isOpen: false,
    hasItems: false,
    isAnimating: false,

    // Método para actualizar el estado completo del carrito
    update: function() {
      var itemCount = cartItems.length;
      this.hasItems = itemCount > 0;

      // Actualizar elementos del carrito
      this.updateCartElements();
      this.updateButtonVisibility();
      this.updateFloatingButton();
      this.updateCartMessages();
    },

    // Actualizar elementos del carrito (contadores, clases, etc.)
    updateCartElements: function() {
      var itemCount = cartItems.length;

      // Actualizar contadores
      $('.cart-count, .cart-button-count, .tab-count').text(itemCount);

      // Actualizar clases del mini-cart
      if (itemCount > 0) {
        $('#mini-cart').addClass('has-items');
        $('.empty-cart-message').hide();
        $('.cart-instructions').show();
      } else {
        $('#mini-cart').removeClass('has-items');
        $('.empty-cart-message').show();
        $('.cart-instructions').show();
      }
    },

    // Gestionar visibilidad de botones del carrito
    updateButtonVisibility: function() {
      // Asegurar visibilidad del botón principal del carrito
      $('#cart-button').css({
        'display': 'flex',
        'visibility': 'visible',
        'opacity': '1',
        'z-index': '9999'
      });

      // Compatibilidad con botón antiguo
      $('.mini-cart-tab').css({
        'display': 'flex',
        'visibility': 'visible',
        'opacity': '1',
        'z-index': '9999'
      });

      // Agregar animación si no la tiene
      if (!$('#cart-button').hasClass('animated')) {
        $('#cart-button').addClass('animated');
      }
    },

    // Gestionar botón flotante de continuar al envío
    updateFloatingButton: function() {
      var formElement = $('#restodelform');
      var windowTopPosition = $(window).scrollTop();
      var windowBottomPosition = windowTopPosition + $(window).height();

      if (!this.hasItems) {
        $('#fixed-checkout-button').css('display', 'none').addClass('hidden');
        return;
      }

      // Verificar si el formulario está visible y activo
      var formVisible = false;

      if (formElement.length > 0) {
        var formIsActive = formElement.hasClass('active') || !formElement.hasClass('hidden');

        if (formIsActive) {
          var formTop = formElement.offset().top;
          var formBottom = formTop + formElement.outerHeight();

          formVisible =
            (formTop >= windowTopPosition && formTop <= windowBottomPosition) ||
            (formBottom >= windowTopPosition && formBottom <= windowBottomPosition) ||
            (formTop <= windowTopPosition && formBottom >= windowBottomPosition) ||
            (formTop - windowBottomPosition < 200 && formTop > windowBottomPosition) ||
            (windowTopPosition - formBottom < 200 && windowTopPosition > formBottom);
        }

        formVisible = formVisible || formIsActive;
      }

      // Mostrar/ocultar botón flotante
      if (!formVisible) {
        $('#fixed-checkout-button').css({
          'display': 'block',
          'visibility': 'visible',
          'opacity': '1',
          'z-index': '9999'
        }).removeClass('hidden');
      } else {
        $('#fixed-checkout-button').css('display', 'none').addClass('hidden');
      }
    },

    // Gestionar mensajes del carrito
    updateCartMessages: function() {
      if (!this.hasItems) {
        $('.instruction-step:first-child').addClass('highlight');
        $('.instruction-step:not(:first-child)').removeClass('highlight');
        $("#preciototal").html("Elige modelos y talles para ver el total");
      } else {
        $('.instruction-step:last-child').addClass('highlight');
        $('.instruction-step:not(:last-child)').removeClass('highlight');
      }
    },

    // Abrir carrito
    open: function() {
      if (this.isAnimating) {
        console.log('🛒 Carrito ya está animando, ignorando apertura');
        return;
      }

      console.log('🛒 Abriendo carrito...');
      this.isAnimating = true;
      this.isOpen = true;

      $('#mini-cart').addClass('active');

      // Aplicar estilos de visibilidad de forma limpia
      setTimeout(() => {
        $('#mini-cart').css({
          'display': 'block',
          'visibility': 'visible',
          'opacity': '1',
          'z-index': '10000',
          'transform': 'translateY(0)'
        });
        this.isAnimating = false;
        console.log('🛒 Carrito abierto exitosamente');
      }, 10);
    },

    // Cerrar carrito
    close: function() {
      if (this.isAnimating) {
        console.log('🛒 Carrito ya está animando, ignorando cierre');
        return;
      }

      console.log('🛒 Cerrando carrito...');
      this.isAnimating = true;
      this.isOpen = false;

      $('#mini-cart').removeClass('active');

      // Aplicar estilos de cierre de forma limpia
      $('#mini-cart').css({
        'transform': 'translateY(120%)',
        'opacity': '0',
        'visibility': 'hidden'
      });

      setTimeout(() => {
        $('#mini-cart').css('display', 'none');
        this.isAnimating = false;
        console.log('🛒 Carrito cerrado exitosamente');
      }, 300);
    },

    // Toggle del carrito
    toggle: function() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  };

  // Inicializar estado del carrito
  cartState.update();

  // El sistema cartState ahora maneja toda la visibilidad de forma unificada

  // Animate the cart button after page load to draw attention
  setTimeout(function() {
    $('#cart-button').addClass('pulse-once');

    setTimeout(function() {
      $('#cart-button').removeClass('pulse-once');
    }, 1000);
  }, 3000);

  // Show checkout progress bar after scrolling
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      $('#checkout-progress').addClass('visible');
    } else {
      $('#checkout-progress').removeClass('visible');
    }

    // El botón flotante ahora se gestiona automáticamente por cartState.update()
  });

  // --- Product Selection Logic ---
  var fieldsetsToShow = ['guillermina-negras', 'guillermina-camel', 'guillermina-blancas', 'birk-negras', 'birk-camel', 'birk-blancas', 'paris-negras']; // Updated to match actual models in HTML
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

  // Trigger initial state for checked radios to ensure second fieldsets are hidden if quantity is 1
  fieldsetsToShow.forEach(function(fieldset) {
    $('input[name="hwA-qty-' + fieldset + '"]:checked').trigger('click');
  });

  // --- Add to Cart Button Logic ---
  $('.add-to-cart-btn').on('click', function() {
    var modelId = $(this).data('model');
    // console.log('Botón clickeado con data-model:', modelId);

    // Llamar a la función para agregar al carrito
    var added = addToCartFromButton(this);

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
  var summaryInput = (typeof IS_CONTRAREEMBOLSO_PAGE !== 'undefined' && IS_CONTRAREEMBOLSO_PAGE) ? $("#286442883") : $("#1471599855"); // ID dinámico según la página
  var summaryDisplay = $("#display-selected-items"); // Updated ID for display
  var miniCart = $("#mini-cart");
  var cartItemsContainer = $(".cart-items");
  var cartCountElement = $(".cart-count");
  var cartTotalElement = $(".cart-total span");
  var checkoutBtn = $("#checkout-btn");
  var restOfForm = $("#restodelform");

  // Inicializar el carrito al cargar la página
  (function initializeCart() {
    // Obtener los productos del campo oculto
    var summaryContent = summaryInput.val() || "";
    // console.log('Inicializando carrito con productos:', summaryContent);

    // Convertir a array y filtrar valores vacíos
    var summaryArray = summaryContent.split(', ').filter(item => item && item.trim() !== '');
    // console.log('Array de productos inicial:', summaryArray);

    // Actualizar el carrito con los productos existentes
    if (summaryArray.length > 0) {
      updateCart(summaryArray);

      // Actualizar el texto del total en el resumen del pedido
      var isContrareembolso = (typeof IS_CONTRAREEMBOLSO_PAGE !== 'undefined' && IS_CONTRAREEMBOLSO_PAGE);
      var totalPriceText = "";

      if (summaryArray.length === 1) {
        if (isContrareembolso) {
          totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="55000">55.000</span> x 1 par</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Añade otro par por solo $30.000 más!</small>';
        } else {
          totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="60000">60.000</span> x 1 par</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Añade otro par por solo $35.000 más!</small>';
        }
      } else if (summaryArray.length === 2) {
        if (isContrareembolso) {
          totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="85000">85.000</span> x 2 pares</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Excelente precio ($42.500 c/u)!</small>';
        } else {
          totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="95000">95.000</span> x 2 pares</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Excelente precio ($47.500 c/u)!</small>';
        }
      }

      // Actualizar el elemento #preciototal con el texto correspondiente
      if (totalPriceText) {
        $("#preciototal").html(totalPriceText);
        // console.log("Inicializando #preciototal con:", totalPriceText);
      }
    } else {
      // Si no hay productos, mostrar mensaje predeterminado
      $("#preciototal").html("Elige modelos y talles para ver el total");
      // console.log("No hay productos iniciales, mostrando mensaje predeterminado en #preciototal");
    }
  })();

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
  function addToCartFromButton(button) {
    // Obtener el ID del modelo del botón
    var modelId = $(button).data('model');
    // console.log('Agregando al carrito desde botón con data-model:', modelId);

    // Obtener el selector correcto basado en el ID del modelo
    var $select;
    if (modelId && (modelId.includes('-1') || modelId.includes('-2'))) {
      // Si el ID incluye -1 o -2 (para el primer o segundo par)
      $select = $('#talle-select-' + modelId);
      if ($select.length === 0) {
        // Intentar encontrar el selector dentro del fieldset correspondiente
        var fieldsetId = 'hwA-' + modelId;
        $select = $('#' + fieldsetId + ' select.talle');
      }
    } else {
      // Fallback para buscar cualquier selector con ese modelo
      $select = $(button).closest('fieldset').find('select.talle');
    }

    // Si aún no encontramos el selector, buscar dentro del botón que se hizo clic
    if ($select.length === 0) {
      $select = $(button).closest('fieldset').find('select.talle');
    }

    // console.log('Selector encontrado para ' + modelId + ':', $select.length > 0 ? 'Sí' : 'No');
    // console.log('ID del selector:', $select.attr('id'));

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
    // console.log('Contenido actual del campo de productos:', summaryContent);
    var summaryArray = summaryContent.split(', ').filter(item => item && item.trim() !== '');
    // console.log('Array de productos antes de agregar:', summaryArray);

    // Check if we exceed the maximum allowed pairs BEFORE adding the new item
    if (summaryArray.length >= 2) {
      alert("Puedes seleccionar un máximo de 2 pares. Por favor, elimina un producto antes de agregar otro.");
      $select.val(''); // Reset the select to empty
      return false; // No se agregó el producto
    }

    // Remove previous value if it exists (only remove one instance)
    // Only remove if prevVal is different from currentVal
    if (prevVal && prevVal !== currentVal) {
      const index = summaryArray.indexOf(prevVal);
      if (index !== -1) {
        summaryArray.splice(index, 1);
      }
    }

    // Add new value
    summaryArray.push(currentVal);
    // console.log('Array de productos después de agregar:', summaryArray);

    // Mostrar notificación de éxito
    $select.closest('.form-group').find('.avisoagregado').remove(); // Remove any existing message
    $select.closest('.form-group').prepend('<p class="avisoagregado">¡Agregado a tu pedido!</p>');

    // Store the current value as previous value for future reference
    $select.data('pre', currentVal);

    // Update the summary input and display
    var finalSummaryText = summaryArray.join(', ');
    // console.log('Texto final para el campo de productos:', finalSummaryText);

    // Actualizar ambos campos independientemente de la página
    // Asegurarse de que ambos campos existan antes de actualizarlos
    if ($('#286442883').length) {
        $('#286442883').val(finalSummaryText);
        // console.log('Campo #286442883 actualizado a:', $('#286442883').val());
    } else {
        // console.warn('Campo #286442883 no encontrado');
    }

    if ($('#1471599855').length) {
        $('#1471599855').val(finalSummaryText);
        // console.log('Campo #1471599855 actualizado a:', $('#1471599855').val());
    } else {
        // console.warn('Campo #1471599855 no encontrado');
    }

    // Asegurarse de que el campo de resumen también esté actualizado
    if (summaryInput.length) {
        summaryInput.val(finalSummaryText);
        // console.log('Campo summaryInput actualizado a:', summaryInput.val());
    } else {
        // console.warn('Campo summaryInput no encontrado');
    }

    var finalSummary = summaryInput.val();
    $("#help-modelostallesseleccionados").text(finalSummary || '-'); // Original display element
    if (summaryDisplay) {
      summaryDisplay.text(finalSummary || 'Aquí verás tu selección...'); // Update new display element
    }

    // Disparar evento change para que otros scripts lo detecten
    summaryInput.trigger('change');
    $('#286442883').trigger('change');
    $('#1471599855').trigger('change');

    // Update cart items
    updateCart(summaryArray);

    // Mostrar mensajes en el carrito y mostrar el menú automáticamente
    var isContrareembolso = (typeof IS_CONTRAREEMBOLSO_PAGE !== 'undefined' && IS_CONTRAREEMBOLSO_PAGE);

    // Para el primer par:
    if (summaryArray.length === 1) {
      // Mostrar el carrito automáticamente usando el sistema unificado
      cartState.open();
      console.log('🛒 Carrito mostrado automáticamente después de agregar producto');

      // Mensaje único y claro con toda la información necesaria
      setTimeout(() => {
        $('#cart-messages').empty();
        if (isContrareembolso) {
          showCartMessage('¡Perfecto! Has agregado tu primer par. ¡Agregá un segundo par por solo $30.000 más ($42.500 cada uno) y llevátelos a un precio especial!', 'success');
        } else {
          showCartMessage('¡Perfecto! Has agregado tu primer par. ¡Agregá un segundo par por solo $35.000 más ($47.500 cada uno) y llevátelos a un precio especial!', 'success');
        }
      }, 500);
    }

    // Para el segundo par:
    if (summaryArray.length === 2) {
      // Abrir el carrito automáticamente cuando se agrega el segundo par
      cartState.open();
      console.log('🛒 Carrito mostrado automáticamente después de agregar segundo producto');

      // Mensaje único consolidado con toda la información
      setTimeout(() => {
        $('#cart-messages').empty();
        if (isContrareembolso) {
          showCartMessage('🎉 ¡Perfecto! 2 pares por $85.000 ($42.500 c/u) - ¡Ahorraste $35.000! El descuento se aplicó automáticamente.', 'success');
        } else {
          showCartMessage('🎉 ¡Perfecto! 2 pares por $95.000 ($47.500 c/u) - ¡Ahorraste $45.000! El descuento se aplicó automáticamente.', 'success');
        }
      }, 500);
    }

    // Update price display based on number of pairs
    var pairCount = summaryArray.length;
    var totalPriceText = "Elige tus modelos y talles para ver el total";
    var totalPrice = 0;

    // Detectar si estamos en la página de contrareembolso
    var isContrareembolso = (typeof IS_CONTRAREEMBOLSO_PAGE !== 'undefined' && IS_CONTRAREEMBOLSO_PAGE);

    if (pairCount >= 1) {
      // Activate checkout button
      checkoutBtn.removeClass('btn-disabled').text('Finalizar Compra');

      // Make checkout section active if there are items in cart
      if (pairCount === 1) {
        // Usar precios diferentes según la página
        if (isContrareembolso) {
          totalPrice = 60000; // Precio para 1 par en contrareembolso
          totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="60000">60.000</span> x 1 par</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Añade otro par por solo $30.000 más!</small>'; // Updated text
        } else {
          totalPrice = 60000; // Precio para 1 par en prepago
          totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="60000">60.000</span> x 1 par</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Añade otro par por solo $35.000 más!</small>'; // Updated text
        }

        // Siempre mostrar el formulario cuando hay al menos un producto en el carrito
        // Mostrar y activar la sección de checkout, pero sin forzar el foco
        restOfForm.removeClass('hidden inactive').addClass('active');

        // Ya no mostramos notificación aquí, se mostrará solo una vez más abajo

        // No forzamos el scroll al formulario, solo lo hacemos visible
    } else if (pairCount === 2) {
      // Usar precios diferentes según la página
      if (isContrareembolso) {
        totalPrice = 85000; // Precio para 2 pares en contrareembolso
        totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="85000">85.000</span> x 2 pares</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Excelente precio ($42.500 c/u)!</small>'; // Updated text
      } else {
        totalPrice = 95000; // Precio para 2 pares en prepago
        totalPriceText = 'TOTAL: <span class="price">🔥 $<span class="preciototalaobservar" data-original-price="95000">95.000</span> x 2 pares</span> + <span class="shipping">ENVÍO GRATIS</span> <br><small>¡Excelente precio ($47.500 c/u)!</small>'; // Updated text
      }

        // Asegurarse de que el formulario esté visible
        restOfForm.removeClass('hidden inactive').addClass('active');

        // No forzamos el scroll al formulario, solo lo hacemos visible
      } else {
        totalPriceText = "Has seleccionado más de 2 pares. Revisa tu selección.";
      }

      // Ya no mostramos notificación aquí, se mostrará solo una vez más abajo
    } else {
      totalPrice = 0;
      totalPriceText = "Elige tus modelos y talles para ver el total";

      // Disable checkout button
      checkoutBtn.addClass('btn-disabled').text('Carrito vacío');

      // Ocultar el formulario si no hay productos en el carrito
      restOfForm.addClass('hidden').removeClass('active');
    }

    // Actualizar el total en el resumen del pedido
    $("#preciototal").html(totalPriceText);
    // console.log("Actualizando #preciototal con:", totalPriceText);

    // Recalculate price based on payment method
    $("#comoabona").trigger('change');

    // No mostrar notificación popup - los mensajes aparecerán en el área de mensajes del carrito

    // Actualizar la visibilidad del botón flotante y el formulario
    cartState.updateFloatingButton();

    // Indicar que se agregó el producto correctamente
    return true;
  }

  // Initialize select elements with empty previous value
  $("#todoslosmodelos select.talle").data('pre', '');

  // Continue to checkout button click handlers - para el botón flotante
  $("#floating-continue-to-checkout, #fixed-checkout-button").on('click', function(e) {
    e.preventDefault();
    // console.log('Botón de continuar al envío clickeado');

    // Check if there are items in the cart
    if (cartItems.length > 0) {
      // Mostrar y activar la sección de checkout
      restOfForm.removeClass('hidden inactive').addClass('active');

      // Scroll to the checkout section
      // window.scrollTo({
      //  top: $("#restodelform").offset().top,
     //   behavior: 'smooth'
     // });

      
      // Update checkout progress
      currentStep = 2;
      updateCheckoutProgress(currentStep);

      // Focus the first field
      setTimeout(function() {
        if ((typeof IS_CONTRAREEMBOLSO_PAGE !== 'undefined' && IS_CONTRAREEMBOLSO_PAGE)) {
          $("#1214200077").focus();
        } else {
          $("#1465946249").focus();
        }
      }, 500);

      // Mostrar notificación según la cantidad de productos
      var isContrareembolso = (typeof IS_CONTRAREEMBOLSO_PAGE !== 'undefined' && IS_CONTRAREEMBOLSO_PAGE);
      if (cartItems.length === 1) {
        if (isContrareembolso) {
          showNotification('Completa tus datos para finalizar la compra. ¡Recuerda que puedes agregar otro par por solo $30.000 más!', 'info');
        } else {
          showNotification('Completa tus datos para finalizar la compra. ¡Recuerda que puedes agregar otro par por solo $35.000 más!', 'info');
        }
      } else {
        if (isContrareembolso) {
          showNotification('Completa tus datos para finalizar la compra con tu precio especial de $85.000 por 2 pares', 'success');
        } else {
          showNotification('Completa tus datos para finalizar la compra con tu precio especial de $95.000 por 2 pares', 'success');
        }
      }

      // Ocultar el botón flotante cuando se muestra el formulario
      $('#floating-checkout-button').addClass('hidden').css('display', 'none');
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
      cartState.close();

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
      var isContrareembolso = (typeof IS_CONTRAREEMBOLSO_PAGE !== 'undefined' && IS_CONTRAREEMBOLSO_PAGE);
      if (cartItems.length === 1) {
        if (isContrareembolso) {
          showNotification('Completa tus datos para finalizar la compra. ¡Recuerda que puedes agregar otro par por solo $30.000 más!', 'info');
        } else {
          showNotification('Completa tus datos para finalizar la compra. ¡Recuerda que puedes agregar otro par por solo $35.000 más!', 'info');
        }
      } else {
        if (isContrareembolso) {
          showNotification('Completa tus datos para finalizar la compra con tu precio especial de $85.000 por 2 pares', 'success');
        } else {
          showNotification('Completa tus datos para finalizar la compra con tu precio especial de $95.000 por 2 pares', 'success');
        }
      }
    } else {
      showNotification('Agrega productos a tu carrito para continuar', 'error');
    }
  });

  // --- Size Guide Toggle ---
  $('.size-guide-toggle').on('click', function() {
    var $container = $(this).closest('.size-guide-container');
    $container.toggleClass('open');
    var $icon = $(this).find('.toggle-icon');
    if ($container.hasClass('open')) {
      $icon.text('−'); // Minus sign for open state
    } else {
      $icon.text('+');
    }
  });

}); // End document ready
