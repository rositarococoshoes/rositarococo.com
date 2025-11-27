// Botón flotante del carrito con estado real
class CartButton extends HTMLElement {
  constructor() {
    super();
    this.cartCount = 0;
    this.cartItems = [];
  }

  connectedCallback() {
    this.innerHTML = `
      <div id="cart-button" class="fixed bottom-4 right-4 bg-pink-600 text-white p-3 rounded-full shadow-lg z-40 flex items-center cursor-pointer transition-all duration-300 hover:bg-pink-700">
        <span class="cart-button-icon text-xl mr-2">🛒</span>
        <span class="cart-button-count bg-white text-pink-600 px-2 py-1 rounded-full text-sm font-bold">0</span>
      </div>
    `;

    this.attachEvents();
    this.loadCartFromStorage();
  }

  attachEvents() {
    const button = this.querySelector('#cart-button');
    if (button) {
      button.addEventListener('click', () => this.toggleCart());
    }
  }

  loadCartFromStorage() {
    try {
      const stored = localStorage.getItem('rosita-cart');
      if (stored) {
        const cart = JSON.parse(stored);
        this.cartItems = cart.items || [];
        this.cartCount = cart.count || 0;
        this.updateButton();
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  updateButton() {
    const countElement = this.querySelector('.cart-button-count');
    const button = this.querySelector('#cart-button');
    
    if (countElement) {
      countElement.textContent = this.cartCount;
    }
    
    if (button) {
      if (this.cartCount > 0) {
        button.classList.add('animate-pulse');
        setTimeout(() => {
          button.classList.remove('animate-pulse');
        }, 1000);
      }
    }
  }

  toggleCart() {
    // Emitir evento global para que otros componentes lo escuchen
    window.dispatchEvent(new CustomEvent('toggle-cart'));
  }
}

customElements.define('cart-button', CartButton);
