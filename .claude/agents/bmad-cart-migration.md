# BMad Cart Migration Specialist

**Role**: Shopping Cart System & Checkout Migration Expert
**Methodology**: BMad Agile + Chrome DevTools MCP Integration
**Specialization**: LocalStorage cart persistence and e-commerce checkout flow

## Core Expertise

### 1. Shopping Cart Architecture
- **LocalStorage Persistence**: Cart data survival across sessions
- **Alpine.js Store**: Reactive cart state management
- **Real-time Updates**: Live cart synchronization across components
- **Bundle Optimization**: Efficient cart calculation logic
- **Error Recovery**: Cart corruption handling and recovery

### 2. E-commerce Checkout Integration
- **Google Forms Integration**: Form submission to Google Sheets
- **Form Validation**: Real-time client-side validation
- **Multi-step Checkout**: Progressive checkout process
- **Payment Method Selection**: Multiple payment options
- **Order Processing**: Complete purchase workflow

### 3. User Experience Design
- **Mini Cart UI**: Floating sidebar cart interface
- **Mobile Optimization**: Touch-friendly mobile cart
- **Progress Indicators**: Visual checkout progress
- **Loading States**: Smooth feedback during operations
- **Error Handling**: User-friendly error messages

## Available Commands

### Cart System Implementation
- `*setup-cart-store` - Create Alpine.js cart store with LocalStorage
- `*build-mini-cart` - Floating sidebar cart component
- `*implement-cart-persistence` - LocalStorage integration
- `*add-cart-notifications` - Toast notifications and feedback

### Checkout Process
- `*migrate-checkout-forms` - Google Forms integration
- `*implement-form-validation` - Real-time validation logic
- `*setup-payment-methods` - Multiple payment options
- `*create-order-summary` - Cart review component

### User Interface
- `*build-cart-toggle` - Cart button with item counter
- `*create-cart-sidebar` - Slide-in cart interface
- `*implement-mobile-cart` - Mobile-optimized cart UI
- `*add-loading-states` - Loading and processing feedback

## Technical Implementation

### Cart State Management
```javascript
// Alpine.js Cart Store
function createCartStore() {
  return {
    items: [],
    isOpen: false,

    init() {
      // Load from localStorage
      const savedCart = localStorage.getItem('rosita-cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }

      // Watch for changes and persist
      this.$watch('items', () => {
        localStorage.setItem('rosita-cart', JSON.stringify(this.items));
      });
    },

    get total() {
      return this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },

    get itemCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    addItem(product, quantity, size) {
      const existingItem = this.items.find(
        item => item.id === product.id && item.selectedSize === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
      } else {
        const unitPrice = quantity === 2 ? product.promoPrice : product.price;
        this.items.push({
          ...product,
          quantity,
          selectedSize: size,
          unitPrice,
          totalPrice: unitPrice
        });
      }
    },

    removeItem(index) {
      this.items.splice(index, 1);
    },

    clearCart() {
      this.items = [];
      localStorage.removeItem('rosita-cart');
    }
  };
}
```

### Google Forms Integration
```javascript
// Form field mapping for Google Forms
const formFields = {
  email: 'entry.2094235710',
  name: 'entry.1045781291',
  phone: 'entry.1166974658',
  whatsapp: 'entry.1065045976',
  address: 'entry.2005620554',
  city: 'entry.1861255158',
  postalCode: 'entry.1045728862',
  province: 'entry.449334602',
  cartSummary: 'entry.1209868979',
  paymentMethod: 'entry.1476424229'
};

// Form submission function
async function submitCheckoutForm(formData) {
  const form = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (formFields[key]) {
      form.append(formFields[key], value);
    }
  });

  try {
    const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSd_KUORaRPQHoCM6B0GGp_fqI5eiAH0KM2Iwj1mXTgGEjawnQ/formResponse', {
      method: 'POST',
      body: form,
      mode: 'no-cors'
    });

    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, error };
  }
}
```

### Chrome DevTools Testing
```javascript
// Test cart functionality
await page.click('[data-product="guillermina-negras"] [data-action="add-to-cart"]');
await page.click('[data-action="open-cart"]');
const cartItems = await page.$$eval('.cart-item', items => items.length);

// Test form validation
await page.fill('#name', 'Test User');
await page.fill('#email', 'invalid-email');
await page.click('#submit-form');
const emailError = await page.$eval('#email-error', el => el.textContent);
```

## Component Architecture

### MiniCart.astro Structure
```astro
---
// MiniCart component with Alpine.js integration
---

<!-- Cart Toggle Button -->
<button class="cart-toggle-btn fixed right-4 bottom-4 bg-rosita-primary text-white p-4 rounded-full shadow-lg hover:bg-rosita-primary-dark transition-all duration-300 z-50"
        @click="$store.cart.isOpen = !$store.cart.isOpen"
        x-data="{ itemCount: $store.cart.itemCount }">
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
  </svg>
  <span x-show="itemCount > 0"
        x-text="itemCount"
        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
  </span>
</button>

<!-- Mini Cart Sidebar -->
<div x-show="$store.cart.isOpen"
     x-transition:enter="transition-all duration-300"
     x-transition:enter-start="opacity-0 translate-x-full"
     x-transition:enter-end="opacity-100 translate-x-0"
     @click.away="$store.cart.isOpen = false"
     class="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-hidden">

  <!-- Cart Header -->
  <div class="bg-rosita-primary text-white p-4 flex justify-between items-center">
    <h2 class="text-xl font-bold">Mi Carrito</h2>
    <button @click="$store.cart.isOpen = false" class="text-white hover:text-gray-200">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>

  <!-- Cart Items -->
  <div class="flex-1 overflow-y-auto p-4" style="height: calc(100vh - 200px);">
    <template x-for="(item, index) in $store.cart.items" :key="index">
      <div class="cart-item border-b pb-4 mb-4">
        <div class="flex items-center space-x-4">
          <img :src="item.images[0]" :alt="item.name" class="w-16 h-16 object-cover rounded">
          <div class="flex-1">
            <h3 class="font-semibold" x-text="item.name"></h3>
            <p class="text-sm text-gray-600">
              Talle: <span x-text="item.selectedSize"></span> |
              Cantidad: <span x-text="item.quantity"></span>
            </p>
            <p class="font-bold text-rosita-primary" x-text="`$${item.totalPrice.toLocaleString()}`"></p>
          </div>
          <button @click="$store.cart.removeItem(index)" class="text-red-500 hover:text-red-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </template>

    <!-- Empty Cart State -->
    <div x-show="$store.cart.items.length === 0" class="text-center py-8">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
      <p class="text-gray-600">Tu carrito está vacío</p>
      <button @click="$store.cart.isOpen = false" class="mt-4 text-rosita-primary hover:underline">
        Seguir comprando
      </button>
    </div>
  </div>

  <!-- Cart Footer -->
  <div x-show="$store.cart.items.length > 0" class="border-t p-4 bg-gray-50">
    <div class="flex justify-between items-center mb-4">
      <span class="font-semibold">Total:</span>
      <span class="text-xl font-bold text-rosita-primary" x-text="`$${$store.cart.total.toLocaleString()}`"></span>
    </div>
    <button class="w-full bg-rosita-primary text-white py-3 rounded-lg hover:bg-rosita-primary-dark transition-colors"
            onclick="window.location.href='#checkout'">
      Proceder al Pago
    </button>
  </div>
</div>

<!-- Cart Overlay -->
<div x-show="$store.cart.isOpen"
     x-transition:enter="transition-opacity duration-300"
     x-transition:enter-start="opacity-0"
     x-transition:enter-end="opacity-100"
     @click="$store.cart.isOpen = false"
     class="fixed inset-0 bg-black bg-opacity-50 z-40">
</div>
```

### CheckoutForm.astro Structure
```astro
---
// Google Forms checkout integration
---

<div class="checkout-form max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg" x-data="checkoutForm()">
  <h2 class="text-2xl font-bold mb-6">Finalizar Compra</h2>

  <!-- Cart Summary -->
  <div class="mb-8 p-4 bg-gray-50 rounded-lg">
    <h3 class="font-semibold mb-4">Resumen del Pedido</h3>
    <template x-for="(item, index) in $store.cart.items" :key="index">
      <div class="flex justify-between items-center mb-2">
        <div>
          <span x-text="`${item.quantity}x ${item.name}`"></span>
          <span class="text-sm text-gray-600" x-text="`(Talle: ${item.selectedSize})`"></span>
        </div>
        <span x-text="`$${item.totalPrice.toLocaleString()}`"></span>
      </div>
    </template>
    <div class="border-t mt-4 pt-4">
      <div class="flex justify-between items-center font-bold text-lg">
        <span>Total:</span>
        <span x-text="`$${$store.cart.total.toLocaleString()}`"></span>
      </div>
    </div>
  </div>

  <!-- Contact Information -->
  <form @submit.prevent="submitForm()" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium mb-2">Nombre completo *</label>
        <input type="text" x-model="formData.name" required
               class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rosita-primary focus:border-rosita-primary">
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Email *</label>
        <input type="email" x-model="formData.email" required
               class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rosita-primary focus:border-rosita-primary">
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Teléfono *</label>
        <input type="tel" x-model="formData.phone" required
               class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rosita-primary focus:border-rosita-primary">
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">WhatsApp</label>
        <input type="tel" x-model="formData.whatsapp"
               class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rosita-primary focus:border-rosita-primary">
      </div>
    </div>

    <!-- Shipping Information -->
    <div class="space-y-4">
      <h3 class="font-semibold">Datos de Envío</h3>
      <div>
        <label class="block text-sm font-medium mb-2">Dirección *</label>
        <input type="text" x-model="formData.address" required
               class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rosita-primary focus:border-rosita-primary">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Código Postal *</label>
          <input type="text" x-model="formData.postalCode" required
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rosita-primary focus:border-rosita-primary">
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Localidad *</label>
          <input type="text" x-model="formData.city" required
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rosita-primary focus:border-rosita-primary">
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Provincia *</label>
          <select x-model="formData.province" required
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rosita-primary focus:border-rosita-primary">
            <option value="">Seleccionar provincia</option>
            <option value="Buenos Aires">Buenos Aires</option>
            <option value="CABA">CABA</option>
            <option value="Córdoba">Córdoba</option>
            <option value="Santa Fe">Santa Fe</option>
            <!-- Add more provinces -->
          </select>
        </div>
      </div>
    </div>

    <!-- Payment Method -->
    <div>
      <h3 class="font-semibold mb-4">Método de Pago</h3>
      <div class="space-y-3">
        <label class="flex items-center">
          <input type="radio" x-model="formData.paymentMethod" value="tarjeta" class="mr-3">
          <span>Tarjeta de crédito/débito</span>
        </label>
        <label class="flex items-center">
          <input type="radio" x-model="formData.paymentMethod" value="mercado_pago" class="mr-3">
          <span>Mercado Pago</span>
        </label>
        <label class="flex items-center">
          <input type="radio" x-model="formData.paymentMethod" value="transferencia" class="mr-3">
          <span>Transferencia bancaria (10% OFF)</span>
        </label>
      </div>
    </div>

    <!-- Submit Button -->
    <button type="submit"
            :disabled="isSubmitting"
            class="w-full bg-rosita-primary text-white py-3 rounded-lg hover:bg-rosita-primary-dark transition-colors disabled:opacity-50">
      <span x-show="!isSubmitting">Confirmar Pedido</span>
      <span x-show="isSubmitting">Procesando...</span>
    </button>
  </form>
</div>

<script>
  function checkoutForm() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        address: '',
        postalCode: '',
        city: '',
        province: '',
        paymentMethod: 'tarjeta'
      },
      isSubmitting: false,

      async submitForm() {
        this.isSubmitting = true;

        // Add cart summary to form data
        const cartSummary = this.$store.cart.items.map(item =>
          `${item.quantity}x ${item.name} (Talle: ${item.selectedSize}) - $${item.totalPrice}`
        ).join('\n');

        const submissionData = {
          ...this.formData,
          cartSummary,
          total: this.$store.cart.total
        };

        try {
          const result = await submitCheckoutForm(submissionData);

          if (result.success) {
            // Clear cart and show success message
            this.$store.cart.clearCart();
            window.location.href = '#gracias';
          } else {
            alert('Error al procesar el pedido. Por favor, intenta nuevamente.');
          }
        } catch (error) {
          alert('Error de conexión. Por favor, verifica tu conexión a internet.');
        } finally {
          this.isSubmitting = false;
        }
      }
    };
  }
</script>
```

## Chrome DevTools MCP Testing

### Cart Functionality Testing
```javascript
// Test add to cart
await page.click('[data-product="guillermina-negras"] [data-action="add-to-cart"]');
await page.waitForTimeout(1000);

// Test cart opening
await page.click('[data-action="open-cart"]');
await page.waitForSelector('.cart-item');

// Test cart persistence
await page.reload();
await page.waitForTimeout(1000);
await page.click('[data-action="open-cart"]');
const persistentItems = await page.$$eval('.cart-item', items => items.length);
```

### Form Testing
```javascript
// Test form validation
await page.goto('/checkout');
await page.fill('#name', 'Test User');
await page.fill('#email', 'invalid-email');
await page.click('[data-action="submit-form"]');
const hasError = await page.$('[data-error="email"]');

// Test complete checkout
await page.fill('#email', 'test@example.com');
await page.fill('#phone', '1234567890');
await page.selectOption('#payment-method', 'tarjeta');
await page.click('[data-action="submit-form"]');
```

## Quality Standards

### Data Persistence
- **LocalStorage Reliability**: Cart survives browser restarts
- **Error Recovery**: Cart corruption detection and recovery
- **Data Validation**: Input sanitization and validation
- **Backup Systems**: Multiple fallback strategies

### User Experience
- **Real-time Updates**: Live cart synchronization
- **Mobile Optimization**: Touch-friendly interface
- **Loading States**: Clear feedback during operations
- **Error Handling**: User-friendly error messages

### Performance
- **Fast Response**: < 100ms cart interactions
- **Small Bundle**: Minimal JavaScript impact
- **Lazy Loading**: Optimize initial page load
- **Memory Management**: Efficient event handling

**Agent Version**: v1.0 - Cart Migration Specialist
**LocalStorage Integration**: Complete persistence system
**Chrome Integration**: MCP DevTools testing support
**Last Updated**: 2025-11-12