// Componente del mini-carrito con estado real
class MiniCart extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.cartItems = [];
    this.cartCount = 0;
    this.cartTotal = 0;
  }

  connectedCallback() {
    this.innerHTML = `
      <!-- Backdrop -->
      <div id="cart-backdrop" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden" style="display: none;"></div>

      <!-- Mini Cart -->
      <div id="mini-cart" class="fixed right-2 sm:right-4 top-16 sm:top-20 bg-white rounded-lg shadow-2xl p-4 w-80 sm:w-96 z-50 transform transition-all duration-300 max-h-[80vh] overflow-y-auto" style="transform: translateX(100%); opacity: 0; pointer-events: none;">
        <div class="mini-cart-header flex items-center justify-between mb-4">
          <span class="cart-icon text-2xl mr-2">🛒</span>
          <span class="cart-title text-lg font-semibold">Tu Carrito</span>
          <span class="cart-count bg-pink-600 text-white px-2 py-1 rounded-full text-sm">0</span>
          <button class="cart-close text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        
        <div class="mini-cart-body">
          <!-- Contextual Offer Message -->
          <div id="cart-offer-message" class="hidden mb-3 p-3 bg-pink-50 border border-pink-200 rounded-lg">
            <p class="text-sm text-pink-800 font-medium">🎉 <span id="offer-text">¡Agrega un segundo par y ahorra $25.000!</span></p>
            <p class="text-xs text-pink-700 mt-1">2 pares por $95.000 con envío gratis</p>
          </div>
          
          <p class="empty-cart-message text-gray-500 text-center py-4">Tu carrito está vacío</p>
          <div class="cart-items space-y-3"></div>
          
          <div class="cart-instructions space-y-3 mt-4 p-4 bg-gray-50 rounded">
            <p class="instruction-step flex items-center">
              <span class="step-number bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">1</span>
              Selecciona tus productos favoritos
            </p>
            <p class="instruction-step flex items-center">
              <span class="step-number bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">2</span>
              Revisa tu carrito
            </p>
            <p class="instruction-step flex items-center">
              <span class="step-number bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">3</span>
              Haz clic en "Finalizar pedido"
            </p>
          </div>
        </div>
        
        <div class="mini-cart-footer flex justify-between items-center pt-4 border-t">
          <div class="cart-total text-lg font-semibold">Total: <span>$0</span></div>
          <button id="checkout-btn" class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed" onclick="goToCheckoutForm()">
            Continuar al Envío → 
          </button>
        </div>
      </div>
    `;

    this.attachEvents();
    this.loadCartFromStorage();
  }

  attachEvents() {
    // Escuchar eventos globales
    window.addEventListener('toggle-cart', () => this.toggleCart());
    window.addEventListener('cart-updated', (e) => this.updateCart(e.detail));

    // Eventos locales
    const closeButton = this.querySelector('.cart-close');
    const backdrop = this.querySelector('#cart-backdrop');
    const checkoutBtn = this.querySelector('#checkout-btn');

    if (closeButton) closeButton.addEventListener('click', () => this.closeCart());
    if (backdrop) backdrop.addEventListener('click', () => this.closeCart());
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => this.goToCheckout());
  }

  loadCartFromStorage() {
    try {
      const stored = localStorage.getItem('rosita-cart');
      if (stored) {
        const cart = JSON.parse(stored);
        this.cartItems = cart.items || [];
        this.cartCount = cart.count || 0;
        this.cartTotal = cart.total || 0;
        this.updateUI();
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  toggleCart() {
    this.isOpen = !this.isOpen;
    this.updateVisibility();
  }

  closeCart() {
    this.isOpen = false;
    this.updateVisibility();
  }

  updateVisibility() {
    const miniCart = this.querySelector('#mini-cart');
    const backdrop = this.querySelector('#cart-backdrop');
    
    if (!miniCart || !backdrop) return;

    if (this.isOpen) {
      miniCart.style.transform = 'translateX(0)';
      miniCart.style.opacity = '1';
      miniCart.style.pointerEvents = 'auto';
      backdrop.style.display = 'block';
      backdrop.classList.remove('hidden');
    } else {
      miniCart.style.transform = 'translateX(100%)';
      miniCart.style.opacity = '0';
      miniCart.style.pointerEvents = 'none';
      backdrop.style.display = 'none';
      backdrop.classList.add('hidden');
    }
  }

  updateCart(cartData = null) {
    if (cartData) {
      this.cartItems = cartData.items || [];
      this.cartCount = cartData.count || 0;
      this.cartTotal = cartData.total || 0;
    }
    this.updateUI();
    this.saveToStorage();
  }

  updateUI() {
    const countElement = this.querySelector('.cart-count');
    const totalElement = this.querySelector('.cart-total span');
    const emptyMessage = this.querySelector('.empty-cart-message');
    const cartItemsElement = this.querySelector('.cart-items');
    const checkoutBtn = this.querySelector('#checkout-btn');
    const offerMessage = this.querySelector('#cart-offer-message');
    const offerText = this.querySelector('#offer-text');

    // Actualizar contador y total
    if (countElement) countElement.textContent = this.cartCount;
    if (totalElement) totalElement.textContent = `$${this.cartTotal.toLocaleString()}`;

    // Habilitar/deshabilitar checkout
    if (checkoutBtn) {
      if (this.cartCount > 0) {
        checkoutBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        checkoutBtn.classList.add('bg-green-600', 'hover:bg-green-700');
      } else {
        checkoutBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
        checkoutBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
      }
    }

    // Mostrar/ocultar oferta
    if (offerMessage && offerText) {
      if (this.cartCount === 1) {
        offerMessage.classList.remove('hidden');
        offerText.textContent = '¡Agrega un segundo par y ahorra $25.000!';
      } else if (this.cartCount >= 2) {
        offerMessage.classList.remove('hidden');
        offerText.textContent = '¡Excelente! Estás ahorrando $25.000 en tu compra';
      } else {
        offerMessage.classList.add('hidden');
      }
    }

    // Actualizar items
    if (emptyMessage && cartItemsElement) {
      if (this.cartItems.length === 0) {
        emptyMessage.style.display = 'block';
        cartItemsElement.innerHTML = '';
      } else {
        emptyMessage.style.display = 'none';
        cartItemsElement.innerHTML = this.cartItems.map(item => `
          <div class="cart-item border-b pb-3">
            <div class="flex items-start gap-3">
              <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
              <div class="flex-1">
                <h4 class="font-semibold text-sm">${item.name}</h4>
                <p class="text-xs text-gray-600">Talle: ${item.size}</p>
                <p class="text-xs text-gray-600">Cantidad: ${item.quantity}</p>
                <div class="flex items-center gap-2 mt-1">
                  <button onclick="updateItemQuantity('${item.id}', ${item.quantity - 1})" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <span class="text-sm">${item.quantity}</span>
                  <button onclick="updateItemQuantity('${item.id}', ${item.quantity + 1})" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                  <button onclick="removeFromCartById('${item.id}')" class="text-red-500 hover:text-red-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // Emitir evento para actualizar otros componentes
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: this.getCartData() }));
  }

  getCartData() {
    return {
      items: this.cartItems,
      count: this.cartCount,
      total: this.cartTotal
    };
  }

  saveToStorage() {
    try {
      localStorage.setItem('rosita-cart', JSON.stringify(this.getCartData()));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  goToCheckout() {
    if (this.cartCount > 0) {
      console.log('🛒 Going to checkout with:', this.cartItems);
      // Por ahora, mostramos un mensaje
      alert('🚀 Redirigiendo al formulario de checkout...');
      // Aquí iría la redirección real
      // window.location.href = '/checkout';
    }
  }
}

customElements.define('mini-cart', MiniCart);
