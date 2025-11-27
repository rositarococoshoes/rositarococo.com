// Validaciones y manejo de formulario de productos
class ProductForm {
  constructor() {
    this.products = {
      'negras': { name: 'Guillerminas Negras', price: 60000, image: '/guillerminafotos/1.webp' },
      'camel': { name: 'Guillerminas Camel', price: 60000, image: '/guillerminafotos/guillerminascamel/1.webp' },
      'blancas': { name: 'Guillerminas Blancas', price: 60000, image: '/guillerminafotos/guillerminasblancas/1.webp' }
    };
    
    this.cart = this.loadCart();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem('rosita-cart');
      return stored ? JSON.parse(stored) : { items: [], count: 0, total: 0 };
    } catch (error) {
      console.error('Error loading cart:', error);
      return { items: [], count: 0, total: 0 };
    }
  }

  saveCart(cart) {
    try {
      localStorage.setItem('rosita-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  calculateTotals(items) {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Lógica de descuentos
    let total = 0;
    if (count >= 2) {
      total = (count / 2) * 95000 + (count % 2) * 60000;
    } else {
      total = count * 60000;
    }
    
    return { count, total };
  }

  validateSize(model, size) {
    if (!size || size.trim() === '') {
      return { valid: false, message: 'Por favor selecciona un talle' };
    }
    
    const validSizes = ['35', '36', '37', '38', '39', '40'];
    if (!validSizes.includes(size)) {
      return { valid: false, message: 'Talle no válido' };
    }
    
    return { valid: true, message: '' };
  }

  addToCart(model, size) {
    // Validar talle
    const validation = this.validateSize(model, size);
    if (!validation.valid) {
      this.showNotification(validation.message, 'error');
      return false;
    }

    const product = this.products[model];
    if (!product) {
      this.showNotification('Producto no encontrado', 'error');
      return false;
    }

    // Verificar si ya existe
    const existingItem = this.cart.items.find(
      item => item.model === model && item.size === size
    );

    let newItems;
    let message;
    if (existingItem) {
      // Incrementar cantidad
      newItems = this.cart.items.map(item =>
        item.model === model && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      message = product.name + ' actualizado en el carrito';
    } else {
      // Agregar nuevo item
      const newItem = {
        id: model + '-' + size + '-' + Date.now(),
        model,
        size,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      };
      newItems = [...this.cart.items, newItem];
      message = product.name + ' agregado al carrito';
    }

    const { count, total } = this.calculateTotals(newItems);
    const newCart = { ...this.cart, items: newItems, count, total };
    
    this.cart = newCart;
    this.saveCart(newCart);
    this.showNotification(message, 'success');
    
    // Emitir evento global
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: newCart }));
    
    return true;
  }

  showNotification(message, type) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full bg-green-500 text-white';
    notification.innerHTML = '<div class="flex items-center"><span class="mr-2">' + (type === 'success' ? '✅' : '❌') + '</span><span>' + message + '</span></div>';

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Método global para botones
  static init() {
    const instance = new ProductForm();
    
    // Hacer disponibles las funciones globalmente
    window.handleAddToCart = function(button) {
      const model = button.dataset.model;
      const select = document.getElementById('talle-' + model);
      const size = select ? select.value : '';
      
      const success = instance.addToCart(model, size);
      
      if (success) {
        // Resetear selector
        if (select) {
          select.value = '';
        }
        
        // Feedback visual en el botón
        const originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<svg class="w-5 h-5 mr-2 inline animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0114 12c0 1.79-.425 3.48-1.188 4.793l1.347 1.347A8.002 8.002 0 0012 20.588a8.002 8.002 0 0011.653-2.291z"></path></svg> Agregando...</svg>';
        
        setTimeout(() => {
          button.disabled = false;
          button.innerHTML = originalText;
        }, 1000);
      }
    };

    // Otras funciones globales
    window.updateItemQuantity = function(itemId, quantity) {
      if (quantity <= 0) {
        instance.removeFromCart(itemId);
        return;
      }
      
      const newItems = instance.cart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const { count, total } = instance.calculateTotals(newItems);
      const newCart = { ...instance.cart, items: newItems, count, total };
      
      instance.cart = newCart;
      instance.saveCart(newCart);
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: newCart }));
    };

    window.removeFromCartById = function(itemId) {
      instance.removeFromCart(itemId);
    };
  }

  removeFromCart(itemId) {
    const newItems = this.cart.items.filter(item => item.id !== itemId);
    const { count, total } = this.calculateTotals(newItems);
    const newCart = { ...this.cart, items: newItems, count, total };
    
    this.cart = newCart;
    this.saveCart(newCart);
    this.showNotification('Producto eliminado del carrito', 'success');
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: newCart }));
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  ProductForm.init();
});
