/**
 * Script para corregir el comportamiento del carrito en contrarreembolsonueva.html
 * Este script evita la sobreescritura de productos en el carrito y
 * habilita correctamente el selector de 2 pares.
 */

(function() {
  // Inicializar cuando el DOM esté listo
  $(document).ready(function() {
    // Configuración inicial de productos
    var models = ['milan', 'trento', 'parma'];
    
    // Función para mostrar/ocultar el segundo selector según la cantidad seleccionada
    function showSecondFieldset(model) {
      var selectedQty = $('input[name="hwA-qty-' + model + '"]:checked').val();
      var $parentSelection = $('.product-item#modeload-' + model + ' .product-selection');

      if (selectedQty === '2') {
        $parentSelection.find('fieldset#hwA-' + model + '-2').slideDown('fast');
      } else {
        $parentSelection.find('fieldset#hwA-' + model + '-2').slideUp('fast');
        $parentSelection.find('fieldset#hwA-' + model + '-2 select.talle').val('');
        $parentSelection.find('fieldset#hwA-' + model + '-2 select.talle').trigger('change');
      }
    }

    // Configurar eventos para los radio buttons de cantidad
    models.forEach(function(model) {
      $('input[name="hwA-qty-' + model + '"]').click(function() {
        showSecondFieldset(model);
      });
    });

    // Establecer estado inicial para los radio buttons ya seleccionados
    models.forEach(function(model) {
      if ($('input[name="hwA-qty-' + model + '"]:checked').length > 0) {
        showSecondFieldset(model);
      }
    });

    // Asegurar que ambos campos de resumen estén sincronizados
    function syncHiddenFields() {
      var value286442883 = $('#286442883').val() || '';
      var value1471599855 = $('#1471599855').val() || '';

      // Si hay un valor en 286442883 pero no en 1471599855, sincronizar
      if (value286442883 && !value1471599855) {
        $('#1471599855').val(value286442883);
        console.log('Campo #1471599855 sincronizado con #286442883:', value286442883);
      }
      // Si hay un valor en 1471599855 pero no en 286442883, sincronizar
      else if (value1471599855 && !value286442883) {
        $('#286442883').val(value1471599855);
        console.log('Campo #286442883 sincronizado con #1471599855:', value1471599855);
      }
    }

    // Llamar a la sincronización al inicio
    syncHiddenFields();

    // Configurar un intervalo para mantener los campos sincronizados
    setInterval(syncHiddenFields, 2000);

    // Sobrescribir la función addToCartFromButton para evitar la sobreescritura de productos
    if (typeof window.addToCartFromButton === 'function') {
      // Crear la nueva función con la lógica corregida
      window.addToCartFromButton = function(button) {
        var $button = $(button);
        var modelId = $button.data('model');
        console.log('Agregando al carrito desde botón con data-model:', modelId);

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
          $select = $button.closest('fieldset').find('select.talle');
        }

        // Si aún no encontramos el selector, buscar dentro del botón que se hizo clic
        if ($select.length === 0) {
          $select = $button.closest('fieldset').find('select.talle');
        }

        // Verificar que se encontró el selector
        if ($select.length === 0) {
          console.error('No se encontró el selector para el modelo:', modelId);
          alert('Error al agregar al carrito. Por favor, intenta de nuevo.');
          return false;
        }

        // Obtener el elemento del producto actual
        var $currentItem = $select.closest('.product-item');

        // Verificar si se seleccionó un talle
        var currentVal = $select.val();
        if (!currentVal) {
          alert('Por favor, selecciona un talle antes de agregar al carrito');
          $select.focus();
          return false;
        }

        // IDs dinámicos según la página
        var isContrareembolso = window.location.href.includes('contrareembolso');
        var summaryInput = isContrareembolso ? $("#286442883") : $("#1471599855");

        // Obtener el contenido actual del campo de productos
        var summaryContent = summaryInput.val() || "";
        var summaryArray = summaryContent.split(', ').filter(item => item && item.trim() !== '');

        // Verificar si el producto ya está en el carrito
        if (summaryArray.includes(currentVal)) {
          alert("Ya has seleccionado este producto. Puedes seleccionar otro par o modificar tu pedido.");
          return false;
        }

        // Verificar si se excede el máximo de pares permitidos
        if (summaryArray.length >= 2) {
          alert("Puedes seleccionar un máximo de 2 pares. Por favor, elimina un producto antes de agregar otro.");
          $select.val('');
          return false;
        }

        // Agregar el nuevo valor al array
        summaryArray.push(currentVal);
        console.log('Array de productos después de agregar:', summaryArray);

        // Mostrar notificación de éxito
        $select.closest('.form-group').find('.avisoagregado').remove();
        $select.closest('.form-group').prepend('<p class="avisoagregado">¡Agregado a tu pedido!</p>');

        // Actualizar el campo de productos
        var finalSummaryText = summaryArray.join(', ');
        summaryInput.val(finalSummaryText);

        // Asegurar que ambos campos estén sincronizados
        syncHiddenFields();

        // Actualizar el resumen del pedido
        $("#help-modelostallesseleccionados").text(finalSummaryText || '-');

        // Disparar evento change para que otros scripts lo detecten
        summaryInput.trigger('change');
        $('#286442883').trigger('change');
        $('#1471599855').trigger('change');

        // Actualizar el carrito usando la función existente
        if (typeof window.updateCart === 'function') {
          window.updateCart(summaryArray);
        }

        // Añadir mensaje de éxito al carrito
        if (summaryArray.length === 1) {
          if (typeof window.showCartMessage === 'function') {
            window.showCartMessage('¡Perfecto! Has agregado tu primer par. ¡Agregá un segundo par por solo $25.000 más ($42.500 cada uno) y llevátelos a un precio especial!', 'success');
          }
        } else if (summaryArray.length === 2) {
          if (typeof window.showCartMessage === 'function') {
            window.showCartMessage('🎉 ¡Perfecto! 2 pares por $85.000 ($42.500 c/u) - ¡Ahorraste $35.000! El descuento se aplicó automáticamente.', 'success');
          }
        }

        // El producto se agregó correctamente
        return true;
      };
    }
  });
})();
