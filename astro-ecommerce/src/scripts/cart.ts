// Cart State
declare global {
  interface Window {
    cart: CartItem[];
    cartCount: number;
    isCartOpen: boolean;
    addToCart: typeof addToCart;
    removeFromCart: typeof removeFromCart;
    handleAddToCart: typeof handleAddToCart;
    goToCheckoutForm: typeof goToCheckoutForm;
    updateCartUI: typeof updateCartUI;
    showWhatsappModal: () => void;
    closeWhatsappModal: () => void;
    pendingCartAdd: { model: string; size: string } | null;
    confirmAddToCart: typeof confirmAddToCart;
  }
}

interface CartItem {
  id: number;
  model: string;
  name: string;
  size: string;
  price: number;
  image: string;
}

interface Product {
  name: string;
  price: number;
  image: string;
}

const basePath = '/astro-ecommerce';
const products: Record<string, Product> = {
  'negras': { name: 'Guillerminas Negras', price: 60000, image: `${basePath}/guillerminafotos/1.webp` },
  'camel': { name: 'Guillerminas Camel', price: 60000, image: `${basePath}/guillerminafotos/guillerminascamel/1.webp` },
  'blancas': { name: 'Guillerminas Blancas', price: 60000, image: `${basePath}/guillerminafotos/guillerminasblancas/1.webp` },
  'birk-negras': { name: 'Birk Negras', price: 60000, image: `${basePath}/birknegras/1.webp` },
  'birk-camel': { name: 'Birk Camel', price: 60000, image: `${basePath}/birkcamel/1.webp` },
  'birk-blancas': { name: 'Birk Blancas', price: 60000, image: `${basePath}/birkblancas/1.webp` },
  'argos': { name: 'Argos', price: 60000, image: `${basePath}/argos/1.webp` }
};

// Initialize cart
if (typeof window !== 'undefined') {
  window.cart = window.cart || [];
  window.cartCount = window.cartCount || 0;
  window.isCartOpen = window.isCartOpen || false;
}

export function addToCart(model: string, size: string): void {
  if (!size) {
    showMessage('Por favor selecciona un talle', 'warning');
    return;
  }

  const product = products[model];
  if (!product) {
    showMessage('Producto no encontrado', 'error');
    return;
  }

  if (window.cartCount >= 2) {
    showMessage('⚠️ Límite alcanzado: Solo puedes agregar máximo 2 pares por pedido', 'warning');
    return;
  }

  // Check if WhatsApp modal should be shown (first product and not shown before)
  const whatsappShown = localStorage.getItem('whatsappModalShown');
  if (window.cartCount === 0 && !whatsappShown && typeof window.showWhatsappModal === 'function') {
    window.pendingCartAdd = { model, size };
    window.showWhatsappModal();
    return;
  }

  confirmAddToCart(model, size);
}

export function confirmAddToCart(model: string, size: string): void {
  const product = products[model];
  if (!product) return;

  const cartItem: CartItem = {
    id: Date.now(),
    model,
    name: product.name,
    size,
    price: product.price,
    image: product.image
  };

  window.cart.push(cartItem);
  window.cartCount++;
  updateCartUI();

  if (window.cartCount === 1) {
    showMessage('✅ ¡Agregá un segundo par para activar el descuento de $25.000!', 'success');
    openCart();
  } else if (window.cartCount === 2) {
    showMessage('🎉 ¡Promoción activada! 2 pares por $95.000 - Completá tus datos', 'success');
    openCart();
    // Auto scroll to checkout form after 1.5 seconds
    setTimeout(() => {
      goToCheckoutForm();
    }, 1500);
  }
}

export function removeFromCart(itemId: number): void {
  window.cart = window.cart.filter(item => item.id !== itemId);
  window.cartCount = window.cart.length;
  updateCartUI();

  if (window.cartCount === 0) {
    showMessage('🛒 Carrito vacío', 'info');
  } else if (window.cartCount === 1) {
    showMessage('✅ Agregá otro par para activar descuento', 'warning');
  }
}

export function calculateCartTotal(): number {
  if (window.cartCount === 0) return 0;
  if (window.cartCount === 1) return 60000;
  return 95000; // Promoción 2 pares
}

export function updateCartUI(): void {
  // Update counters
  document.querySelectorAll('.cart-count, .cart-button-count').forEach(el => {
    el.textContent = String(window.cartCount);
  });

  // Update cart items
  const cartItemsContainer = document.querySelector('.cart-items');
  const emptyMessage = document.querySelector('.empty-cart-message') as HTMLElement;

  if (cartItemsContainer) {
    if (window.cartCount === 0) {
      cartItemsContainer.innerHTML = '';
      if (emptyMessage) emptyMessage.style.display = 'block';
    } else {
      if (emptyMessage) emptyMessage.style.display = 'none';
      cartItemsContainer.innerHTML = window.cart.map(item => `
        <div class="cart-item bg-gray-50 p-3 rounded-lg relative" data-item-id="${item.id}">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3 flex-1">
              <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
              <div>
                <h4 class="font-semibold text-sm">${item.name}</h4>
                <p class="text-xs text-gray-600">Talle: ${item.size}</p>
              </div>
            </div>
            <button class="remove-item text-red-500 hover:text-red-700 text-xl font-bold" onclick="removeFromCart(${item.id})">×</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Update total
  const total = calculateCartTotal();
  document.querySelectorAll('.cart-total span').forEach(el => {
    el.textContent = `$${total.toLocaleString('es-AR')}`;
  });

  // Update checkout button
  const checkoutBtn = document.getElementById('checkout-btn') as HTMLButtonElement;
  if (checkoutBtn) {
    if (window.cartCount === 0) {
      checkoutBtn.disabled = true;
      checkoutBtn.className = 'bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed';
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.className = 'bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer';
    }
  }

  // Update offer message
  const offerMessage = document.getElementById('cart-offer-message');
  if (offerMessage) {
    offerMessage.classList.toggle('hidden', window.cartCount !== 1);
  }

  // Show/hide checkout form
  const checkoutForm = document.getElementById('restodelform');
  if (checkoutForm) {
    checkoutForm.classList.toggle('hidden', window.cartCount === 0);
    if (window.cartCount > 0) {
      checkoutForm.classList.add('has-items');
    } else {
      checkoutForm.classList.remove('has-items');
    }
  }

  updateOrderSummary();
}

function updateOrderSummary(): void {
  const summaryElement = document.getElementById('286442883') as HTMLInputElement;
  if (summaryElement && window.cartCount > 0) {
    summaryElement.value = window.cart.map(item => `${item.name} - Talle ${item.size}`).join(', ');
  }

  const totalElement = document.getElementById('preciototal');
  if (totalElement) {
    const total = calculateCartTotal();
    totalElement.innerHTML = window.cartCount > 0 
      ? `<strong>Total: $${total.toLocaleString('es-AR')}</strong>`
      : 'Elige modelos y talles para ver el total';
  }
}

export function openCart(): void {
  const miniCart = document.getElementById('mini-cart');
  const backdrop = document.getElementById('cart-backdrop');
  
  if (miniCart) {
    window.isCartOpen = true;
    miniCart.classList.add('open');
    miniCart.style.transform = 'translateX(0)';
    miniCart.style.opacity = '1';
    miniCart.style.pointerEvents = 'auto';
  }
  
  if (backdrop) {
    backdrop.classList.remove('hidden');
  }
}

export function closeCart(): void {
  const miniCart = document.getElementById('mini-cart');
  const backdrop = document.getElementById('cart-backdrop');
  
  if (miniCart) {
    window.isCartOpen = false;
    miniCart.classList.remove('open');
    miniCart.style.transform = 'translateX(100%)';
    miniCart.style.opacity = '0';
    miniCart.style.pointerEvents = 'none';
  }
  
  if (backdrop) {
    backdrop.classList.add('hidden');
  }
}

export function toggleCart(): void {
  if (window.isCartOpen) {
    closeCart();
  } else {
    openCart();
  }
}

export function goToCheckoutForm(): void {
  if (window.cartCount === 0) {
    showMessage('Debes agregar productos antes de continuar', 'warning');
    return;
  }

  closeCart();

  setTimeout(() => {
    const checkoutSection = document.getElementById('restodelform');
    const datosEnvio = document.getElementById('datos-envio');
    
    if (checkoutSection) {
      checkoutSection.classList.remove('hidden');
      
      const target = datosEnvio || checkoutSection;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      updateCheckoutProgress(2);
      showMessage('✅ ¡Completa tus datos de envío!', 'success');
    }
  }, 300);
}

function updateCheckoutProgress(step: number): void {
  document.querySelectorAll('.progress-step').forEach((el, index) => {
    const stepNum = index + 1;
    const numberEl = el.querySelector('.step-number');
    const nameEl = el.querySelector('.step-name');
    
    if (numberEl && nameEl) {
      if (stepNum < step) {
        numberEl.className = 'step-number bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1';
        nameEl.className = 'step-name text-sm font-medium text-green-600 text-center';
      } else if (stepNum === step) {
        numberEl.className = 'step-number bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1';
        nameEl.className = 'step-name text-sm font-medium text-center';
      } else {
        numberEl.className = 'step-number bg-gray-300 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1';
        nameEl.className = 'step-name text-sm font-medium text-gray-600 text-center';
      }
    }
  });
}

export function handleAddToCart(button: HTMLElement): void {
  const model = button.getAttribute('data-model');
  if (!model) return;

  const selectId = `talle-${model}`;
  const productCard = button.closest('.product-card');
  const selectElement = productCard?.querySelector(`#${selectId}`) as HTMLSelectElement || document.getElementById(selectId) as HTMLSelectElement;

  if (selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const sizeText = selectedOption?.value;
    
    if (sizeText && sizeText !== '') {
      addToCart(model, sizeText);
    } else {
      showMessage('Por favor selecciona un talle', 'warning');
    }
  }
}

function showMessage(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
  const container = document.getElementById('notification-container');
  if (!container) return;

  const notification = document.createElement('div');
  const colors = {
    info: 'bg-blue-100 border-blue-400 text-blue-800',
    success: 'bg-green-100 border-green-400 text-green-800',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
    error: 'bg-red-100 border-red-400 text-red-800'
  };

  notification.className = `${colors[type]} border-l-4 p-4 rounded shadow-lg animate-fade-in`;
  notification.innerHTML = `
    <div class="flex items-center justify-between">
      <p class="font-medium">${message}</p>
      <button class="ml-4 text-lg font-bold hover:opacity-70" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  container.appendChild(notification);
  setTimeout(() => notification.remove(), 4000);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Cart button click
  document.getElementById('cart-button')?.addEventListener('click', toggleCart);
  
  // Close button
  document.querySelector('.cart-close')?.addEventListener('click', closeCart);
  
  // Backdrop click
  document.getElementById('cart-backdrop')?.addEventListener('click', closeCart);
  
  // Checkout button
  document.getElementById('checkout-btn')?.addEventListener('click', goToCheckoutForm);
  
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleAddToCart(btn as HTMLElement);
    });
  });
  
  // Initialize UI
  updateCartUI();
});

// Expose to window
if (typeof window !== 'undefined') {
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.handleAddToCart = handleAddToCart;
  window.goToCheckoutForm = goToCheckoutForm;
  window.updateCartUI = updateCartUI;
  window.confirmAddToCart = confirmAddToCart;
}

export {};
