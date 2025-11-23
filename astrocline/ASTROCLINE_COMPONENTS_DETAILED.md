# 🏗️ **DOCUMENTACIÓN DETALLADA DE COMPONENTES - /ASTROCLINE**
**Análisis completo de arquitectura, webhooks, componentes y funcionalidades**

---

## 🎯 **ARQUITECTURA GENERAL**

### **Stack Tecnológico:**
```
Frontend: HTML5 + Tailwind CSS + Vanilla JavaScript
Carousel: Embla Carousel v7.1.0+
Hosting: GitHub Pages
Dominio: rositarococo.com
Analytics: Facebook Pixel
Forms: Custom Webhooks (reemplaza Google Forms)
```

### **Flujo de Datos:**
```
Usuario → Componente UI → Event Listener → JavaScript Logic → API Webhook → Backend
     ↓                                                           ↓
  UI Updates ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```

---

## 🎠 **COMPONENTE CARRUSEL (EMBLA CAROUSEL)**

### **Estructura HTML Completa:**
```html
<!-- Carousel Principal -->
<div class="embla" data-product-id="producto-unico" data-autoplay>
  <!-- Viewport: Contenedor visible -->
  <div class="embla__viewport">
    <!-- Container: Contenedor deslizante -->
    <div class="embla__container">
      <!-- Slide: Individual -->
      <div class="embla__slide">
        <div class="embla__slide__inner">
          <img class="embla__slide__img"
               src="/ruta/imagen.webp"
               alt="Descripción imagen"
               loading="lazy"
               decoding="async">
        </div>
      </div>
      <!-- ... más slides ... -->
    </div>
  </div>

  <!-- Botones de Navegación -->
  <button class="embla__button embla__button--prev" type="button">
    <svg class="embla__button__svg" viewBox="0 0 24 24">
      <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2"/>
    </svg>
  </button>
  <button class="embla__button embla__button--next" type="button">
    <svg class="embla__button__svg" viewBox="0 0 24 24">
      <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2"/>
    </svg>
  </button>

  <!-- Thumbnails Container -->
  <div class="embla-thumbs">
    <div class="embla-thumbs__viewport">
      <div class="embla-thumbs__container">
        <button class="embla-thumbs__slide embla-thumbs__slide--selected" type="button">
          <img class="embla-thumbs__slide__img" src="/ruta/thumb.webp" alt="Miniatura">
        </button>
        <!-- ... más thumbnails ... -->
      </div>
    </div>
  </div>
</div>
```

### **Configuración JavaScript (carousel.js):**
```javascript
function initializeCarousels() {
    // 1. Verificar EmblaCarousel cargado
    if (typeof EmblaCarousel === 'undefined') return;

    // 2. Delay para asegurar DOM ready
    setTimeout(() => {
        const carouselNodes = document.querySelectorAll('.embla');

        carouselNodes.forEach((node, index) => {
            const viewport = node.querySelector('.embla__viewport');
            if (!viewport) return;

            try {
                // 3. Inicializar Carousel Principal
                const emblaNode = EmblaCarousel(viewport, {
                    align: 'start',           // Alineación inicial
                    containScroll: 'keepSnaps', // Mantiene snaps visibles
                    dragFree: true,           // Arrastre libre
                    loop: false,              // Sin loop infinito
                    slidesToScroll: 1,        // Slides por scroll
                });

                // 4. Configurar Botones de Navegación
                setupNavigationButtons(node, emblaNode);

                // 5. Configurar Thumbnails
                setupThumbnails(node, emblaNode);

                console.log(`✅ Carrusel ${index} inicializado correctamente`);
            } catch (error) {
                console.error(`❌ Error carrusel ${index}:`, error);
            }
        });
    }, 1000);
}

function setupNavigationButtons(node, emblaNode) {
    const prevBtn = node.querySelector('.embla__button--prev');
    const nextBtn = node.querySelector('.embla__button--next');

    if (prevBtn) prevBtn.addEventListener('click', () => emblaNode.scrollPrev());
    if (nextBtn) nextBtn.addEventListener('click', () => emblaNode.scrollNext());
}

function setupThumbnails(node, emblaNode) {
    const thumbsViewport = node.parentElement?.querySelector('.embla-thumbs__viewport');
    if (!thumbsViewport) return;

    // Inicializar Carousel de Thumbnails
    const thumbsEmblaNode = EmblaCarousel(thumbsViewport, {
        containScroll: 'keepSnaps',
        dragFree: false,  // Thumbnails sin arrastre libre
    });

    // Configurar Click en Thumbnails
    const thumbs = thumbsEmblaNode.slideNodes();
    thumbs.forEach((thumbNode, thumbIndex) => {
        thumbNode.addEventListener('click', () => {
            emblaNode.scrollTo(thumbIndex);  // Navegar a slide principal
        });
    });

    // Sincronizar estados seleccionados
    emblaNode.on('select', () => {
        const selected = emblaNode.selectedScrollSnap();
        updateThumbnailSelection(thumbs, selected);
    });
}

function updateThumbnailSelection(thumbs, selectedIndex) {
    thumbs.forEach((thumbNode, thumbIndex) => {
        if (thumbIndex === selectedIndex) {
            thumbNode.classList.add('embla-thumbs__slide--selected');
        } else {
            thumbNode.classList.remove('embla-thumbs__slide--selected');
        }
    });
}
```

### **Eventos y Estados:**
```javascript
// Eventos disponibles en emblaNode
emblaNode.on('init', () => console.log('Carousel inicializado'));
emblaNode.on('select', () => console.log('Slide seleccionado'));
emblaNode.on('settle', () => console.log('Animation completada'));
emblaNode.on('scroll', () => console.log('Scroll en progreso'));

// Métodos útiles
emblaNode.scrollTo(index)        // Navegar a slide específico
emblaNode.scrollNext()           // Siguiente slide
emblaNode.scrollPrev()           // Slide anterior
emblaNode.selectedScrollSnap()   // Obtener índice seleccionado
emblaNode.slideNodes()           // Obtener todos los slides
emblaNode.destroy()              // Destruir instancia
```

---

## 🛍️ **COMPONENTE TARJETA DE PRODUCTO**

### **Estructura HTML Completa:**
```html
<div class="rounded-lg border bg-card text-card-foreground shadow-sm">
  <div class="product-content">
    <!-- Título del Producto -->
    <h2 class="text-base md:text-lg font-bold text-gray-900 mb-2 text-center">
      Nombre del Producto
    </h2>

    <!-- Carrusel del Producto -->
    <div class="embla" data-product-id="product-id">
      <!-- [Carousel structure from above] -->
    </div>

    <!-- Detalles del Producto -->
    <div class="product-details mt-2 space-y-3 p-3">
      <!-- Badges -->
      <div class="flex flex-wrap gap-2 justify-center">
        <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 border-purple-200">
          NUEVA TEMPORADA
        </div>
        <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800 border-red-200">
          STOCK LIMITADO
        </div>
      </div>

      <!-- Descripción -->
      <p class="text-gray-700 text-sm leading-relaxed text-center">
        Descripción detallada del producto...
      </p>

      <!-- Especificaciones Grid -->
      <div class="grid grid-cols-3 gap-2 text-xs text-center">
        <div class="bg-gray-50 p-2 rounded border border-gray-200">
          <p class="font-medium text-gray-600">Material</p>
          <p class="text-gray-800">Tela reforzada</p>
        </div>
        <div class="bg-gray-50 p-2 rounded border border-gray-200">
          <p class="font-medium text-gray-600">Suela</p>
          <p class="text-gray-800">Expanso</p>
        </div>
        <div class="bg-green-50 p-2 rounded border border-green-200">
          <p class="font-medium text-green-700">Envío</p>
          <p class="text-green-800 font-bold">GRATIS 🚚</p>
        </div>
      </div>

      <!-- Precios -->
      <div class="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg border border-pink-200 shadow-md">
        <div class="text-center space-y-2">
          <div class="bg-pink-600 text-white p-2 rounded-md shadow-sm">
            <p class="text-xs font-bold mb-1">🎉 PROMO ESPECIAL</p>
            <p class="text-sm font-bold">2 PARES POR</p>
            <p class="text-lg font-extrabold">$95.000</p>
            <p class="text-xs mt-1 bg-white text-pink-600 inline-block px-2 py-1 rounded-full">
              AHORRÁS $25.000
            </p>
          </div>
          <p class="text-xs text-gray-500">Precio individual: $60.000</p>
          <p class="text-xs text-gray-600 italic">* Podés combinar cualquier modelo y color</p>
        </div>
      </div>

      <!-- Selector de Talle -->
      <div class="flex gap-3 mt-4">
        <div class="flex-1">
          <div class="select-wrapper">
            <select id="talle-producto" name="talle-producto" class="flex h-auto min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-pink-500 text-sm" required>
              <option value="" selected disabled>-- Selecciona Talle --</option>
              <option value="35">35 (23 cm de largo de plantilla)</option>
              <option value="36">36 (23,5 cm de largo de plantilla)</option>
              <option value="37">37 (24 cm de largo de plantilla)</option>
              <option value="38">38 (24,7 cm de largo de plantilla)</option>
              <option value="39">39 (25,3 cm de largo de plantilla)</option>
              <option value="40">40 (26 cm de largo de plantilla)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Botón Agregar al Carrito -->
      <div class="mt-4">
        <button class="add-to-cart-btn w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none" type="button" data-model="producto-key" onclick="handleAddToCart(this)">
          <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
          </svg>
          Agregar al Carrito
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## 🛒 **COMPONENTE CARRITO DESPLEGABLE**

### **Estructura HTML:**
```html
<!-- Carrito Flotante -->
<div id="mini-cart" class="fixed right-4 top-20 bg-white rounded-lg shadow-2xl p-4 w-96 z-50 transform transition-all duration-300 max-h-[80vh] overflow-y-auto"
     style="transform: translateX(100%); opacity: 0; pointer-events: none;">

  <!-- Área de Mensajes del Carrito -->
  <div id="cart-messages" class="cart-messages-area mb-4">
    <!-- Mensajes dinámicos se insertan aquí -->
  </div>

  <!-- Header del Carrito -->
  <div class="mini-cart-header flex items-center justify-between mb-4">
    <span class="cart-icon text-2xl mr-2">🛒</span>
    <span class="cart-title text-lg font-semibold">Tu Carrito</span>
    <span class="cart-count bg-pink-600 text-white px-2 py-1 rounded-full text-sm">0</span>
    <button class="cart-close text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
  </div>

  <!-- Contenido del Carrito -->
  <div class="mini-cart-body">
    <!-- Mensaje de Oferta Contextual -->
    <div id="cart-offer-message" class="hidden mb-3 p-3 bg-pink-50 border border-pink-200 rounded-lg">
      <p class="text-sm text-pink-800 font-medium">🎉 ¡Agrega un segundo par y ahorra $25.000!</p>
      <p class="text-xs text-pink-700 mt-1">2 pares por $95.000 con envío gratis</p>
    </div>

    <!-- Mensaje de Carrito Vacío -->
    <p class="empty-cart-message text-gray-500 text-center py-4">Tu carrito está vacío</p>

    <!-- Items del Carrito (dinámicos) -->
    <div class="cart-items space-y-3">
      <!-- Items se insertan aquí dinámicamente -->
    </div>

    <!-- Instrucciones -->
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
        Haz clic en "Finalizar Compra"
      </p>
    </div>
  </div>

  <!-- Footer del Carrito -->
  <div class="mini-cart-footer flex justify-between items-center pt-4 border-t">
    <div class="cart-total text-lg font-semibold">Total: <span>$0</span></div>
    <button id="checkout-btn" class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed" onclick="goToCheckoutForm()">
      Continuar al Envío →
    </button>
  </div>
</div>

<!-- Botón Flotante del Carrito -->
<div id="cart-button" class="fixed bottom-4 right-4 bg-pink-600 text-white p-3 rounded-full shadow-lg z-40 flex items-center cursor-pointer transition-all duration-300 hover:bg-pink-700">
  <span class="cart-button-icon text-xl mr-2">🛒</span>
  <span class="cart-button-count bg-white text-pink-600 px-2 py-1 rounded-full text-sm font-bold">0</span>
</div>
```

### **Lógica JavaScript del Carrito (carousel.js):**
```javascript
// === VARIABLES GLOBALES DEL CARRITO ===
if (typeof window.cart === 'undefined') {
    window.cart = [];
    window.cartCount = 0;
    window.isCartOpen = false;
}

// === PRODUCTOS DISPONIBLES ===
const products = {
    'negras': {
        name: 'Guillerminas Negras',
        price: 60000,
        image: '/guillerminafotos/1.webp'
    },
    'camel': {
        name: 'Guillerminas Camel',
        price: 60000,
        image: '/guillerminafotos/guillerminascamel/1.webp'
    },
    'blancas': {
        name: 'Guillerminas Blancas',
        price: 60000,
        image: '/guillerminafotos/guillerminasblancas/1.webp'
    },
    // ... más productos
};

// === FUNCIÓN PRINCIPAL: AGREGAR AL CARRITO ===
function addToCart(model, size) {
    // 1. Validar talle seleccionado
    if (!size) {
        showCartNotification('Por favor selecciona un talle', 'error');
        return;
    }

    // 2. Verificar producto existente
    const product = products[model];
    if (!product) {
        showCartNotification('Producto no encontrado', 'error');
        return;
    }

    // 3. Buscar si ya existe en carrito
    const existingItemIndex = window.cart.findIndex(item =>
        item.model === model && item.size === size
    );

    if (existingItemIndex !== -1) {
        // Actualizar cantidad si existe
        window.cart[existingItemIndex].quantity++;
    } else {
        // Agregar nuevo item
        window.cart.push({
            id: Date.now() + Math.random(),
            model: model,
            size: size,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    // 4. Actualizar estado y UI
    updateCartDisplay();
    showCartNotification(`${product.name} agregado al carrito`, 'success');

    // 5. Mostrar oferta si aplica
    checkAndShowCartOffers();
}

// === ACTUALIZAR DISPLAY DEL CARRITO ===
function updateCartDisplay() {
    window.cartCount = window.cart.reduce((total, item) => total + item.quantity, 0);

    // Actualizar botones flotantes
    document.querySelector('.cart-button-count').textContent = window.cartCount;
    document.querySelector('.cart-count').textContent = window.cartCount;

    // Actualizar total
    const total = calculateCartTotal();
    document.querySelector('.cart-total span').textContent = `$${total.toLocaleString()}`;

    // Habilitar/deshabilitar botón de checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (window.cartCount > 0) {
        checkoutBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        checkoutBtn.classList.add('bg-pink-600', 'hover:bg-pink-700');
    } else {
        checkoutBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
        checkoutBtn.classList.remove('bg-pink-600', 'hover:bg-pink-700');
    }

    // Renderizar items del carrito
    renderCartItems();
}

// === RENDERIZAR ITEMS DEL CARRITO ===
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyMessage = document.querySelector('.empty-cart-message');

    if (window.cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    cartItemsContainer.innerHTML = window.cart.map(item => `
        <div class="cart-item bg-white border rounded-lg p-3 shadow-sm" data-item-id="${item.id}">
            <div class="flex items-center space-x-3">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-900">${item.name}</h4>
                    <p class="text-sm text-gray-600">Talle: ${item.size}</p>
                    <p class="text-sm font-medium text-pink-600">$${item.price.toLocaleString()}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateCartItemQuantity(${item.id}, -1)"
                            class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                        -
                    </button>
                    <span class="w-8 text-center">${item.quantity}</span>
                    <button onclick="updateCartItemQuantity(${item.id}, 1)"
                            class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                        +
                    </button>
                    <button onclick="removeFromCart(${item.id})"
                            class="text-red-500 hover:text-red-700 ml-2">
                        ×
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// === ACTUALIZAR CANTIDAD DE ITEM ===
function updateCartItemQuantity(itemId, change) {
    const itemIndex = window.cart.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;

    window.cart[itemIndex].quantity += change;

    if (window.cart[itemIndex].quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartDisplay();
    }
}

// === ELIMINAR DEL CARRITO ===
function removeFromCart(itemId) {
    window.cart = window.cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    showCartNotification('Producto eliminado del carrito', 'info');
}

// === CALCULAR TOTAL ===
function calculateCartTotal() {
    return window.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// === CONTROL DE VISIBILIDAD DEL CARRITO ===
function toggleCart() {
    const cart = document.getElementById('mini-cart');
    const isOpen = cart.style.transform !== 'translateX(0px)';

    if (isOpen) {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    const cart = document.getElementById('mini-cart');
    cart.style.transform = 'translateX(0)';
    cart.style.opacity = '1';
    cart.style.pointerEvents = 'auto';
    window.isCartOpen = true;
}

function closeCart() {
    const cart = document.getElementById('mini-cart');
    cart.style.transform = 'translateX(100%)';
    cart.style.opacity = '0';
    cart.style.pointerEvents = 'none';
    window.isCartOpen = false;
}

// === VERIFICAR OFERTAS ===
function checkAndShowCartOffers() {
    const offerMessage = document.getElementById('cart-offer-message');

    if (window.cartCount === 1) {
        offerMessage.classList.remove('hidden');
    } else {
        offerMessage.classList.add('hidden');
    }
}

// === NOTIFICACIONES DEL CARRITO ===
function showCartNotification(message, type = 'info') {
    const messagesContainer = document.getElementById('cart-messages');

    const notification = document.createElement('div');
    notification.className = `cart-notification p-3 rounded-lg mb-2 ${type}`;

    switch(type) {
        case 'success':
            notification.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-200');
            break;
        case 'error':
            notification.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-200');
            break;
        default:
            notification.classList.add('bg-blue-100', 'text-blue-800', 'border', 'border-blue-200');
    }

    notification.textContent = message;
    messagesContainer.appendChild(notification);

    // Auto remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
```

---

## 📝 **COMPONENTE FORMULARIOS**

### **Estructura HTML del Formulario Principal:**
```html
<form id="restodelform" class="max-w-md mx-auto" novalidate>
  <!-- Campos Obligatorios -->
  <div class="mb-4">
    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
    <input type="text" id="name" name="name" required
           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
  </div>

  <div class="mb-4">
    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
    <input type="email" id="email" name="email" required
           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
  </div>

  <div class="mb-4">
    <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
    <input type="tel" id="phone" name="phone" required
           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
  </div>

  <!-- Dirección -->
  <div class="mb-4">
    <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
    <input type="text" id="address" name="address" required
           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
  </div>

  <!-- Honeypot para bots (oculto con CSS) -->
  <input type="text" id="website" name="website" style="display: none;" autocomplete="off">

  <!-- Campo de landing URL requerido -->
  <input type="hidden" id="1209868979" name="1209868979" value="https://rositarococo.com/astrocline/">

  <!-- Botón de Envío -->
  <button type="submit" class="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500">
    Enviar Pedido
  </button>

  <!-- Loading Overlay -->
  <div class="loading-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style="display: none;">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-4"></div>
      <p class="text-gray-700">Enviando pedido...</p>
    </div>
  </div>
</form>
```

### **Sistema de Validación (form-validator.js):**
```javascript
class FormValidator {
    constructor(formId = 'restodelform') {
        this.form = document.getElementById(formId);
        this.errors = new Map();
        this.init();
    }

    init() {
        if (this.form) {
            this.addValidationListeners();
            console.log('✅ Form validator initialized');
        }
    }

    // === VALIDACIONES EN TIEMPO REAL ===
    addValidationListeners() {
        // Validación de nombre
        this.addFieldValidation('name', (value) => {
            if (!value || value.trim().length < 2) {
                return 'El nombre debe tener al menos 2 caracteres';
            }
            if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(value.trim())) {
                return 'El nombre solo puede contener letras y espacios';
            }
            return null;
        });

        // Validación de email
        this.addFieldValidation('email', (value) => {
            if (!value) return 'El email es obligatorio';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value.trim())) {
                return 'Ingrese un email válido';
            }
            return null;
        });

        // Validación de teléfono
        this.addFieldValidation('phone', (value) => {
            if (!value) return 'El teléfono es obligatorio';
            const phoneRegex = /^[0-9\-\s\(\)]+$/;
            if (!phoneRegex.test(value.trim())) {
                return 'Ingrese un teléfono válido';
            }
            if (value.replace(/\D/g, '').length < 10) {
                return 'El teléfono debe tener al menos 10 dígitos';
            }
            return null;
        });

        // Validación de dirección
        this.addFieldValidation('address', (value) => {
            if (!value || value.trim().length < 5) {
                return 'La dirección debe tener al menos 5 caracteres';
            }
            return null;
        });
    }

    // === AGREGAR VALIDACIÓN A CAMPO ===
    addFieldValidation(fieldId, validationFn) {
        const field = document.getElementById(fieldId);
        if (!field) return;

        // Validación en tiempo real mientras escribe
        field.addEventListener('input', (e) => {
            const error = validationFn(e.target.value);
            if (error) {
                this.showFieldError(fieldId, error);
            } else {
                this.showFieldSuccess(fieldId);
            }
        });

        // Validación al perder foco
        field.addEventListener('blur', (e) => {
            const error = validationFn(e.target.value);
            if (error) {
                this.showFieldError(fieldId, error, true); // Con scroll
            } else {
                this.showFieldSuccess(fieldId);
            }
        });
    }

    // === MOSTRAR ERROR DE CAMPO ===
    showFieldError(fieldId, message, scroll = false) {
        const field = document.getElementById(fieldId);
        if (!field) return;

        this.clearFieldError(fieldId);
        this.clearFieldSuccess(fieldId);

        field.classList.add('input-error', 'border-red-500');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-validation-error text-red-500 text-sm mt-1';
        errorDiv.id = `${fieldId}-error`;
        errorDiv.textContent = message;

        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        this.errors.set(fieldId, errorDiv);

        if (scroll) {
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            field.focus();
        }
    }

    // === MOSTRAR ÉXITO DE CAMPO ===
    showFieldSuccess(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return;

        this.clearFieldError(fieldId);
        field.classList.add('input-success', 'border-green-500');
    }

    // === LIMPIAR ESTADOS ===
    clearFieldError(fieldId) {
        const errorDiv = document.getElementById(`${fieldId}-error`);
        if (errorDiv) errorDiv.remove();

        const field = document.getElementById(fieldId);
        if (field) field.classList.remove('input-error', 'border-red-500');
    }

    clearFieldSuccess(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) field.classList.remove('input-success', 'border-green-500');
    }

    // === VALIDAR FORMULARIO COMPLETO ===
    validateForm() {
        let isValid = true;
        let firstErrorField = null;

        // Validar todos los campos requeridos
        const requiredFields = ['name', 'email', 'phone', 'address'];

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const value = field ? field.value.trim() : '';

            if (!value) {
                this.showFieldError(fieldId, 'Este campo es obligatorio', !firstErrorField);
                if (!firstErrorField) firstErrorField = fieldId;
                isValid = false;
            }
        });

        // Verificar protección contra bots
        if (isBot()) {
            alert('Error de validación. Por favor, intente nuevamente.');
            return false;
        }

        return isValid;
    }
}

// === PROTECCIÓN CONTRA BOTS ===
function isBot() {
    // Verificar campo honeypot
    const websiteField = document.getElementById('website');
    if (websiteField && websiteField.value !== '') return true;

    // Verificar landing URL
    const landingUrlField = document.getElementById('1209868979');
    if (landingUrlField && !landingUrlField.value.trim()) return true;

    return false;
}
```

---

## 🔗 **WEBHOOKS E INTEGRACIONES**

### **Endpoints de Webhooks (form-handler.js):**
```javascript
// === ENDPOINTS CONFIGURADOS ===
const ORDER_WEBHOOK = "https://sswebhookss.odontolab.co/webhook/a5dcd3c9-48a3-46a1-a781-475737a634ca";
const CONTRAREEMBOLSO_WEBHOOK = "https://sswebhookss.odontolab.co/webhook/1e214d4e-5481-4ded-8936-c63ff9ce7743";
const MERCADOPAGO_WEBHOOK = "https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30";
const FACEBOOK_WEBHOOK = "https://sswebhookss.odontolab.co/webhook/9dfb840b-2a21-4277-8aec-1666bfaaac89";
```

### **Proceso de Envío de Formulario:**
```javascript
// === FUNCIÓN PRINCIPAL DE ENVÍO ===
async function submitOrderForm(formData) {
    // 1. Mostrar loading
    showLoadingOverlay();

    try {
        // 2. Recolectar información del cliente
        const clientInfo = await collectClientInformation();

        // 3. Preparar datos para webhook
        const webhookData = {
            form_data: formData,
            client_info: clientInfo,
            cart_data: window.cart,
            order_info: {
                total: calculateCartTotal(),
                items_count: window.cartCount,
                currency: 'ARS',
                timestamp: getArgentinaTimestamp()
            },
            source: 'astrocline_rosita_rococo',
            utm_params: getUTMParameters(),
            facebook_params: getFacebookParams()
        };

        // 4. Enviar a webhook principal
        const response = await fetch(ORDER_WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': navigator.userAgent
            },
            body: JSON.stringify(webhookData)
        });

        // 5. Procesar respuesta
        if (response.ok) {
            const result = await response.json();
            handleFormSubmissionSuccess(result);
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

    } catch (error) {
        handleFormSubmissionError(error);
    } finally {
        hideLoadingOverlay();
    }
}

// === RECOLECCIÓN DE INFORMACIÓN DEL CLIENTE ===
async function collectClientInformation() {
    const ip = await getClientIP();

    return {
        ip_address: ip,
        user_agent: navigator.userAgent,
        timestamp: getArgentinaTimestamp(),
        referrer: document.referrer,
        current_url: window.location.href,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        facebook_cookies: getFacebookParams(),
        utm_parameters: getUTMParameters()
    };
}

// === PARÁMETROS UTM ===
function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);

    return {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_term: urlParams.get('utm_term') || '',
        utm_content: urlParams.get('utm_content') || ''
    };
}

// === PARÁMETROS FACEBOOK ===
function getFacebookParams() {
    return {
        fbc: getCookie('_fbc') || localStorage.getItem('facebook_fbc') || '',
        fbp: getCookie('_fbp') || localStorage.getItem('facebook_fbp') || ''
    };
}

// === OBTENER IP DEL CLIENTE ===
async function getClientIP() {
    try {
        // Primer intento: api.ipify.org
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        try {
            // Segundo intento: httpbin.org
            const response2 = await fetch('https://httpbin.org/ip');
            const data2 = await response2.json();
            return data2.origin;
        } catch (error2) {
            return '';
        }
    }
}

// === TIMESTAMP DE ARGENTINA ===
function getArgentinaTimestamp() {
    const now = new Date();
    const argentinaTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
    return Math.floor(argentinaTime.getTime() / 1000);
}

// === HASH DE EMAIL (Facebook) ===
async function hashEmail(email) {
    if (!email) return '';

    const normalizedEmail = email.toLowerCase().trim();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalizedEmail);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// === MANEJO DE RESPUESTAS ===
function handleFormSubmissionSuccess(result) {
    // Limpiar carrito
    window.cart = [];
    updateCartDisplay();

    // Mostrar notificación
    showNotification('¡Pedido enviado con éxito! Nos contactaremos pronto.', 'success');

    // Enviar eventos a Facebook
    sendFacebookEvents('Purchase');

    // Redireccionar a página de éxito
    setTimeout(() => {
        window.location.href = '/astrocline/pago-exitoso/';
    }, 2000);
}

function handleFormSubmissionError(error) {
    console.error('Form submission error:', error);
    showNotification('Error al enviar el pedido. Por favor, inténta nuevamente.', 'error');

    // Enviar evento de error a Facebook
    sendFacebookEvents('InitiateCheckout', { error: error.message });
}

// === FACEBOOK PIXEL EVENTS ===
function sendFacebookEvents(eventName, parameters = {}) {
    if (typeof fbq === 'undefined') return;

    try {
        // Evento estándar
        fbq('track', eventName, parameters);

        // Eventos personalizados según el tipo
        switch(eventName) {
            case 'Purchase':
                fbq('track', 'Purchase', {
                    value: calculateCartTotal(),
                    currency: 'ARS',
                    content_ids: window.cart.map(item => item.model),
                    content_type: 'product'
                });
                break;

            case 'AddToCart':
                fbq('track', 'AddToCart', {
                    content_ids: [parameters.model],
                    content_type: 'product',
                    value: parameters.price,
                    currency: 'ARS'
                });
                break;

            case 'ViewContent':
                fbq('track', 'ViewContent', {
                    content_ids: [parameters.model],
                    content_type: 'product'
                });
                break;
        }
    } catch (error) {
        console.error('Facebook Pixel error:', error);
    }
}
```

---

## 🔄 **SISTEMA DE REDIRECCIONAMIENTO**

### **Flujo de Checkout:**
```javascript
// === REDIRECCIÓN AL FORMULARIO DE ENVÍO ===
function goToCheckoutForm() {
    if (window.cartCount === 0) {
        showCartNotification('Tu carrito está vacío', 'error');
        return;
    }

    // Guardar datos del carrito en localStorage
    localStorage.setItem('cartData', JSON.stringify({
        items: window.cart,
        total: calculateCartTotal(),
        timestamp: Date.now()
    }));

    // Determinar página de checkout según cantidad
    const checkoutPage = getCheckoutPage();
    window.location.href = checkoutPage;
}

function getCheckoutPage() {
    const itemCount = window.cartCount;

    // Determinar página según número de pares
    switch(itemCount) {
        case 1:
            return '/astrocline/transferenciacbu-1par/';
        case 2:
            return '/astrocline/transferenciacbu-2pares/';
        case 3:
            return '/astrocline/gracias-3pares-1par/';
        case 4:
            return '/astrocline/gracias-4pares-1par/';
        case 5:
            return '/astrocline/gracias-5pares-1par/';
        default:
            return '/astrocline/transferenciacbu-1par/';
    }
}

// === RECUPERAR CARRITO EN PÁGINAS DE CHECKOUT ===
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cartData');
    if (!savedCart) return false;

    try {
        const cartData = JSON.parse(savedCart);
        const now = Date.now();
        const maxAge = 30 * 60 * 1000; // 30 minutos

        // Verificar que los datos no sean muy viejos
        if (now - cartData.timestamp > maxAge) {
            localStorage.removeItem('cartData');
            return false;
        }

        // Restaurar carrito
        window.cart = cartData.items;
        updateCartDisplay();
        return true;

    } catch (error) {
        console.error('Error loading cart from storage:', error);
        localStorage.removeItem('cartData');
        return false;
    }
}

// === REDIRECCIÓN A MERCADOPAGO ===
function redirectToMercadoPago(orderData) {
    const mercadoPagoUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${orderData.preference_id}`;

    // Registrar conversión antes de redirigir
    sendFacebookEvents('InitiateCheckout', {
        value: calculateCartTotal(),
        currency: 'ARS',
        content_ids: window.cart.map(item => item.model),
        content_type: 'product'
    });

    window.location.href = mercadoPagoUrl;
}

// === REDIRECCIÓN A PÁGINA DE ÉXITO ===
function redirectToSuccessPage(orderId) {
    // Guardar ID de orden para tracking
    sessionStorage.setItem('lastOrderId', orderId);

    // Enviar evento de conversión final
    sendFacebookEvents('Purchase', {
        value: calculateCartTotal(),
        currency: 'ARS',
        transaction_id: orderId,
        content_ids: window.cart.map(item => item.model),
        content_type: 'product'
    });

    window.location.href = '/astrocline/pago-exitoso/';
}
```

---

## 🎭 **COMPONENTE MODALES**

### **Modal de WhatsApp (Opcional):**
```html
<!-- Botón Flotante de WhatsApp -->
<div id="whatsapp-button" class="fixed bottom-20 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg z-40 cursor-pointer transition-all duration-300 hover:bg-green-600">
  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.817-.333-.966-.331-.063.072-.281.32-.549.597-.766.774-.817.063-.967.32-.833.358-.043.039-.086.097-.086.156 0 .064.032.218.247.462.086.151.345.484.394.652.049.168-.104.221-.335.218-.164.008-.277.008-.483.008-.737 0-.523-.065-1.005-.195-1.42-.13-.416-.195-1.01-.324-1.788-.449-.777-.125-1.64-.195-2.58-.195-.94 0-1.804.07-2.58.195-.777.125-1.37.324-1.789.449-.416.13-.797.354-1.132.647-.235.293-.383.408-.449.465-.064.058-.098.163-.098.281 0 .118.043.217.13.297.098.281.549.748.698.986.151.237.52.674.91.755.393.08.692.12.91.12.218 0 .418-.042.601-.13.185-.087.345-.232.48-.382.149-.15.268-.32.358-.507.094-.187.098-.384.112-.578.112-.195 0-.384-.018-.578-.112-.193-.098-.328-.268-.358-.507z"/>
  </svg>
</div>

<!-- Modal de WhatsApp -->
<div id="whatsapp-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center">
  <div class="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">Contactar por WhatsApp</h3>
      <button onclick="closeWhatsAppModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
    </div>

    <div class="mb-4">
      <p class="text-gray-700 mb-2">¿En qué podemos ayudarte?</p>
      <textarea id="whatsapp-message" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" rows="4" placeholder="Escribe tu mensaje aquí..."></textarea>
    </div>

    <div class="flex space-x-3">
      <button onclick="sendWhatsAppMessage()" class="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
        Enviar Mensaje
      </button>
      <button onclick="closeWhatsAppModal()" class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400">
        Cancelar
      </button>
    </div>
  </div>
</div>

<script>
// === FUNCIONES DEL MODAL WHATSAPP ===
function openWhatsAppModal() {
    document.getElementById('whatsapp-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeWhatsAppModal() {
    document.getElementById('whatsapp-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function sendWhatsAppMessage() {
    const message = document.getElementById('whatsapp-message').value.trim();
    if (!message) {
        alert('Por favor escribe un mensaje');
        return;
    }

    // Preparar número de teléfono
    const phoneNumber = '5491134567890'; // Reemplazar con número real

    // Preparar mensaje con datos del carrito
    let fullMessage = message;

    if (window.cart.length > 0) {
        fullMessage += '\n\n🛒 *Pedido:*';
        window.cart.forEach((item, index) => {
            fullMessage += `\n${index + 1}. ${item.name} - Talle ${item.size} - $${item.price.toLocaleString()} (x${item.quantity})`;
        });
        fullMessage += `\n\n*Total:* $${calculateCartTotal().toLocaleString()}`;
    }

    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Cerrar modal
    closeWhatsAppModal();

    // Tracking
    sendFacebookEvents('Contact', { channel: 'WhatsApp' });
}
</script>
```

---

## 📱 **COMPONENTE RESPONSIVE DESIGN**

### **Breakpoints y Media Queries:**
```css
/* === MEDIA QUERIES (unified.css) === */

/* Mobile (default) */
@media (max-width: 639px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .embla {
    --slide-height: 300px;
  }

  .embla-thumbs {
    margin-top: 0.5rem;
  }

  #mini-cart {
    width: 100%;
    right: 0;
    top: 60px;
    border-radius: 0;
  }

  .checkout-form {
    padding: 1rem;
  }
}

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .embla {
    --slide-height: 400px;
  }

  .checkout-container {
    max-width: 600px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .embla {
    --slide-height: 450px;
  }

  .checkout-container {
    max-width: 800px;
  }

  .hero-section {
    min-height: 80vh;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1200px;
    margin: 0 auto;
  }

  .container {
    max-width: 1200px;
  }
}

/* === CLASES RESPONSIVE DE TAILWIND === */
/* Mobile First */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

/* Responsive Utilities */
@media (min-width: 640px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

---

## ⚡ **OPTIMIZACIONES DE PERFORMANCE**

### **Lazy Loading de Imágenes:**
```html
<!-- Primera imagen con alta prioridad -->
<img class="embla__slide__img"
     src="/imagen-principal.webp"
     alt="Imagen principal"
     loading="eager"
     decoding="async"
     fetchpriority="high">

<!-- Imágenes subsequentes con lazy loading -->
<img class="embla__slide__img"
     src="/imagen-secundaria.webp"
     alt="Imagen secundaria"
     loading="lazy"
     decoding="async"
     fetchpriority="auto">
```

### **Optimización de CSS:**
```css
/* === CSS CRITICAL INLINE === */
/* Estilos críticos para above-the-fold */
.header { display: block; }
.hero-section { min-height: 60vh; }
.loading-spinner { /* styles */ }

/* === CSS NO CRITICAL DEFERRED === */
/* Estilos para below-the-fold se cargan después */
```

### **JavaScript Optimizado:**
```javascript
// === INICIALIZACIÓN DIFERIDA ===
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar carouseles con delay
    setTimeout(initializeCarousels, 1000);

    // Lazy load de formularios cuando se necesiten
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeForm(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.checkout-form').forEach(form => {
        observer.observe(form);
    });
});

// === DEBOUNCE PARA EVENTOS ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar a eventos frecuentes
window.addEventListener('resize', debounce(updateLayout, 250));
window.addEventListener('scroll', debounce(handleScroll, 100));
```

---

## 🔧 **DEBUGGING Y MONITOREO**

### **Función de Diagnóstico:**
```javascript
// === FUNCIÓN DE DEBUG COMPLETA ===
function debugAstroclineState() {
    console.group('🔍 Astrocline Debug Report');

    // Estado del carrito
    console.log('🛒 Cart State:', {
        items: window.cart,
        count: window.cartCount,
        total: calculateCartTotal()
    });

    // Estado de carouseles
    const carousels = document.querySelectorAll('.embla');
    console.log('🎠 Carousels:', {
        total: carousels.length,
        initialized: Array.from(carousels).map((c, i) => ({
            index: i,
            productId: c.dataset.productId,
            hasViewport: !!c.querySelector('.embla__viewport'),
            slideCount: c.querySelectorAll('.embla__slide').length,
            thumbsCount: c.querySelectorAll('.embla-thumbs__slide').length
        }))
    });

    // Estado de formularios
    const form = document.getElementById('restodelform');
    console.log('📝 Form State:', {
        exists: !!form,
        validator: typeof FormValidator !== 'undefined',
        fields: Array.from(form?.elements || []).map(f => ({
            name: f.name,
            type: f.type,
            value: f.value,
            required: f.required
        }))
    });

    // Estado de librerías
    console.log('📚 Libraries:', {
        tailwind: !!document.querySelector('script[src*="tailwindcss"]'),
        embla: typeof EmblaCarousel !== 'undefined',
        jquery: typeof jQuery !== 'undefined'
    });

    // Estado de Facebook Pixel
    console.log('📊 Facebook:', {
        loaded: typeof fbq !== 'undefined',
        pixelId: '1052677351596434',
        cookies: document.cookie.includes('_fbp')
    });

    // Performance metrics
    console.log('⚡ Performance:', {
        loadTime: performance.now(),
        memoryUsage: performance.memory ? {
            used: Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB',
            total: Math.round(performance.memory.totalJSHeapSize / 1048576) + 'MB'
        } : 'N/A'
    });

    console.groupEnd();

    return {
        cart: { items: window.cart, count: window.cartCount },
        carousels: carousels.length,
        form: !!form,
        libraries: {
            tailwind: !!document.querySelector('script[src*="tailwindcss"]'),
            embla: typeof EmblaCarousel !== 'undefined'
        }
    };
}

// Ejecutar diagnóstico
window.debugAstrocline = debugAstroclineState;
```

### **Error Boundary:**
```javascript
// === ERROR BOUNDARY PARA COMPONENTES ===
class ComponentErrorBoundary {
    constructor(componentName) {
        this.componentName = componentName;
    }

    wrap(fn) {
        return async (...args) => {
            try {
                return await fn(...args);
            } catch (error) {
                this.handleError(error);
                return null;
            }
        };
    }

    handleError(error) {
        console.error(`❌ Error in ${this.componentName}:`, error);

        // Enviar error a servicio de monitoreo
        if (typeof fetch !== 'undefined') {
            fetch('/api/log-error', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    component: this.componentName,
                    error: error.message,
                    stack: error.stack,
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                })
            }).catch(() => {
                // Ignorar error de logging
            });
        }

        // Mostrar mensaje amigable al usuario
        if (this.componentName === 'cart') {
            showCartNotification('Ocurrió un error. Por favor, recarga la página.', 'error');
        }
    }
}

// Aplicar a funciones críticas
const cartBoundary = new ComponentErrorBoundary('Cart');
const formBoundary = new ComponentErrorBoundary('Form');
const carouselBoundary = new ComponentErrorBoundary('Carousel');

// Funciones envueltas
window.addToCartSafe = cartBoundary.wrap(addToCart);
window.submitOrderSafe = formBoundary.wrap(submitOrderForm);
window.initializeCarouselsSafe = carouselBoundary.wrap(initializeCarousels);
```

---

## 📈 **ANALYTICS Y TRACKING**

### **Facebook Pixel Events:**
```javascript
// === CONFIGURACIÓN DE PIXEL EVENTS ===
const pixelConfig = {
    pixelId: '1052677351596434',
    advancedMatching: {
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        city: true,
        country: true
    }
};

// === EVENTOS DE E-COMMERCE ===
function trackEcommerceEvents() {
    // ViewContent - Cuando se ve un producto
    function trackProductView(product) {
        fbq('track', 'ViewContent', {
            content_name: product.name,
            content_category: product.category || 'shoes',
            content_ids: [product.model],
            content_type: 'product',
            value: product.price,
            currency: 'ARS'
        });
    }

    // AddToCart - Cuando se agrega al carrito
    function trackAddToCart(product, quantity = 1) {
        fbq('track', 'AddToCart', {
            content_name: product.name,
            content_ids: [product.model],
            content_type: 'product',
            value: product.price * quantity,
            currency: 'ARS'
        });
    }

    // InitiateCheckout - Cuando se inicia checkout
    function trackInitiateCheckout() {
        fbq('track', 'InitiateCheckout', {
            content_ids: window.cart.map(item => item.model),
            content_type: 'product',
            value: calculateCartTotal(),
            currency: 'ARS',
            num_items: window.cartCount
        });
    }

    // Purchase - Cuando se completa la compra
    function trackPurchase(orderId) {
        fbq('track', 'Purchase', {
            content_ids: window.cart.map(item => item.model),
            content_type: 'product',
            value: calculateCartTotal(),
            currency: 'ARS',
            transaction_id: orderId,
            num_items: window.cartCount
        });
    }

    return {
        trackProductView,
        trackAddToCart,
        trackInitiateCheckout,
        trackPurchase
    };
}

// === UTM PARAMETER TRACKING ===
function trackUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content')
    };

    // Guardar en localStorage para persistencia
    Object.keys(utmParams).forEach(key => {
        if (utmParams[key]) {
            localStorage.setItem(key, utmParams[key]);
        }
    });

    return utmParams;
}

// === PAGE VIEW TRACKING ===
function trackPageView() {
    fbq('track', 'PageView');

    // Custom events para tracking específico
    const pageType = getPageType();
    fbq('trackCustom', 'ViewPage', {
        page_type: pageType,
        page_url: window.location.href,
        timestamp: Date.now()
    });
}

function getPageType() {
    const path = window.location.pathname;

    if (path.includes('/astrocline/') && path === '/astrocline/') {
        return 'home';
    } else if (path.includes('/transferenciacbu-')) {
        return 'checkout';
    } else if (path.includes('/gracias-') || path.includes('/pago-exitoso')) {
        return 'thank_you';
    } else {
        return 'other';
    }
}
```

---

## 🔄 **FLUJO COMPLETO DE USUARIO**

### **1. Landing en Homepage:**
```
Usuario llega → Pixel PageView → Carruseles cargan → Productos visibles
    ↓
Usuario explora → ViewContent events → Click en producto → Detalle del producto
    ↓
Usuario selecciona → Elige talle → Click "Agregar al Carrito"
    ↓
JavaScript procesa → addToCart() → Carrito actualizado → AddToCart event → UI update
```

### **2. Gestión del Carrito:**
```
Carrito abierto → Items visibles → Modificar cantidades → Actualizar totales
    ↓
Usuario satisfecho → Click "Finalizar Compra" → Guardar en localStorage
    ↓
Redirección a checkout → Formulario precargado → InitiateCheckout event
```

### **3. Proceso de Checkout:**
```
Formulario completado → Validación en tiempo real → Submit del formulario
    ↓
Información recolectada → Enviar a webhook → Procesar respuesta del servidor
    ↓
Éxito → Limpiar carrito → Purchase event → Redirección a página de gracias
```

### **4. Post-Compra:**
```
Página de éxito → Confirmación visual → WhatsApp option disponible
    ↓
Opcional: Contacto → Modal WhatsApp → Mensaje pre-cargado → Conversión final
```

---

## 📚 **REFERENCIA DE MÉTODOS Y EVENTOS**

### **Métodos JavaScript Disponibles:**
```javascript
// === MÉTODOS DEL CARRITO ===
addToCart(model, size)                    // Agregar producto
removeFromCart(itemId)                  // Eliminar producto
updateCartItemQuantity(itemId, change) // Actualizar cantidad
toggleCart()                           // Abrir/cerrar carrito
calculateCartTotal()                    // Calcular total
clearCart()                            // Vaciar carrito

// === MÉTODOS DE VALIDACIÓN ===
validateForm()                         // Validar formulario completo
showFieldError(fieldId, message)        // Mostrar error de campo
showFieldSuccess(fieldId)               // Mostrar éxito de campo

// === MÉTODOS DE WEBHOOK ===
submitOrderForm(formData)               // Enviar formulario
collectClientInformation()             // Recolectar info cliente
sendWhatsAppMessage()                   // Enviar mensaje WhatsApp

// === MÉTODOS DE ANALYTICS ===
trackProductView(product)               // Track vista de producto
trackAddToCart(product, quantity)       // Track agregar al carrito
trackInitiateCheckout()                 // Track inicio checkout
trackPurchase(orderId)                  // Track compra completada
```

### **Eventos DOM Escuchados:**
```javascript
// === EVENTOS DE FORMULARIO ===
input: validación en tiempo real
blur: validación al perder foco
submit: envío del formulario

// === EVENTOS DE CARRITO ===
click: botones de cantidad y eliminación
change: actualización automática de totales

// === EVENTOS DE CARRUSEL ===
click: thumbnails y botones de navegación
scroll: sincronización de estados
resize: reflow responsive
```

### **Custom Events Disparados:**
```javascript
// === EVENTOS PERSONALIZADOS ===
'cart-updated': cuando el carrito cambia
'form-submitted': cuando el formulario se envía
'checkout-completed': cuando el checkout finaliza
'carousel-ready': cuando los carouseles están listos
```

---

**🎯 ESTA DOCUMENTACIÓN PROPORCIONA UNA VISIÓN COMPLETA Y DETALLADA DE CADA COMPONENTE, WEBHOOK, FLUJO DE DATOS Y FUNCIONALIDAD DEL SISTEMA /ASTROCLINE PARA REFERENCIA FUTURA Y MANTENIMIENTO SEGURO.**