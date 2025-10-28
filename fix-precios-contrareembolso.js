/**
 * Script para corregir los precios en contrarreembolsonueva.html
 * Este script sobrescribe las funciones de mensajes para mostrar los precios correctos
 * para la página de contrarreembolso ($85.000 en lugar de $95.000 para 2 pares)
 */

(function() {
  // Solo aplicar en la página de contrarreembolso
  if (!window.location.href.includes('contrareembolso')) {
    return;
  }

  // Sobrescribir showCartMessage
  if (typeof window.showCartMessage === 'function') {
    var originalShowCartMessage = window.showCartMessage;
    
    window.showCartMessage = function(message, type) {
      // Si es un mensaje relacionado con el precio de 2 pares, actualizarlo
      if (message.includes('$95.000')) {
        message = message.replace('$95.000', '$85.000');
        message = message.replace('$47.500 c/u', '$42.500 c/u');
        message = message.replace('¡Ahorraste $45.000!', '¡Ahorraste $35.000!');
      }
      
      // Llamar a la función original con el mensaje corregido
      originalShowCartMessage(message, type);
    };
  }

  // Sobrescribir showNotification
  if (typeof window.showNotification === 'function') {
    var originalShowNotification = window.showNotification;
    
    window.showNotification = function(message, type) {
      // Si es un mensaje relacionado con el precio de 2 pares, actualizarlo
      if (message.includes('$95.000')) {
        message = message.replace('$95.000', '$85.000');
      }
      
      // Llamar a la función original con el mensaje corregido
      originalShowNotification(message, type);
    };
  }

  // Sobrescribir función updateCart para asegurar que muestre precios correctos
  if (typeof window.updateCart === 'function') {
    var originalUpdateCart = window.updateCart;
    
    window.updateCart = function(itemsArray) {
      // Llamar a la función original
      originalUpdateCart(itemsArray);
      
      // Si estamos en la página de contrarreembolso y hay 2 pares
      if (window.location.href.includes('contrareembolso') && itemsArray.length === 2) {
        // Asegurar que el total se muestre como $85.000
        var totalElement = document.querySelector('.cart-total span');
        if (totalElement) {
          totalElement.textContent = '$85.000';
        }
        
        // Asegurar que el precio total en el resumen se muestre como $85.000
        var preciototalElement = document.getElementById('preciototal');
        if (preciototalElement) {
          // Solo actualizar si contiene referencias a $95.000
          if (preciototalElement.innerHTML.includes('$95.000')) {
            preciototalElement.innerHTML = preciototalElement.innerHTML.replace('$95.000', '$85.000');
            preciototalElement.innerHTML = preciototalElement.innerHTML.replace('$47.500 c/u', '$42.500 c/u');
            preciototalElement.innerHTML = preciototalElement.innerHTML.replace('¡Excelente precio ($47.500 c/u)!', '¡Excelente precio ($42.500 c/u)!');
          }
        }
      }
    };
  }

  console.log('Fix-precios-contrareembolso.js cargado correctamente');
})();
