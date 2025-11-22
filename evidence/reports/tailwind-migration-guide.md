# Tailwind CSS Migration Guide: Rosita Rococó

## Overview
This guide provides specific Tailwind CSS class mappings for the current Rosita Rococó design system to ensure brand consistency during the Astro migration.

---

## 1. Custom Tailwind Configuration

### tailwind.config.js
```javascript
module.exports = {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a05941',    // Marrón rojizo
          dark: '#7a3f2b',       // Marrón rojizo oscuro
          light: '#d68c45',      // Naranja tostado
        },
        accent: {
          DEFAULT: '#5a8f3e',    // Verde oliva
        },
        text: {
          DEFAULT: '#3a3a3a',    // Gris oscuro
          light: '#6d6d6d',      // Gris medio
        },
        background: {
          DEFAULT: '#faf7f2',    // Crema claro
          alt: '#f5efe5',        // Crema más oscuro
        },
        border: {
          DEFAULT: '#f0e9e0',    // Borde suave
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
        ui: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 5px 20px rgba(0, 0, 0, 0.05)',
        medium: '0 8px 25px rgba(0, 0, 0, 0.08)',
        strong: '0 12px 30px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      transitionDuration: {
        fast: '300ms',
        medium: '400ms',
      }
    },
  },
  plugins: [],
}
```

---

## 2. Component Class Mappings

### Header Components

#### Top Benefits Bar
```css
/* Original CSS */
.top-benefits-bar {
  background-color: rgba(160, 89, 65, 0.85);
  color: rgba(255, 255, 255, 1);
  padding: 2px 15px;
  font-family: 'Lato', sans-serif;
  font-size: 0.6rem;
  position: fixed;
  top: 0;
  z-index: 1000;
}

/* Tailwind Equivalent */
<div class="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-sm text-white px-4 py-0.5 text-xs font-ui">
```

#### Main Header
```css
/* Original */
.main-header {
  text-align: center;
  padding: 20px;
}

/* Tailwind */
<header class="text-center py-5">
```

### Product Components

#### Product Card Container
```css
/* Original */
.product-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  padding: 15px;
  margin: 10px 0;
  transition: all 0.4s ease;
}

/* Tailwind */
<div class="bg-white rounded-xl shadow-medium p-4 my-2.5 transition-all duration-medium hover:shadow-strong">
```

#### Product Badges
```css
/* Original */
.badge {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  position: absolute;
  top: 10px;
  left: 10px;
}

.badge-bestseller {
  background-color: #2e7d32;
}

/* Tailwind */
<span class="absolute top-2.5 left-2.5 px-3 py-1.5 bg-green-700 text-white text-xs font-bold uppercase rounded-sm tracking-wide">
  BESTSELLER
</span>
```

#### Price Display
```css
/* Original */
.price-single, .price-double {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  background-color: #f9f5f2;
  border-radius: 6px;
  text-align: center;
  width: 100%;
  padding: 6px 10px;
}

/* Tailwind */
<div class="w-full text-center bg-background text-lg font-bold text-text rounded-md py-1.5 px-2.5">
```

### Form Components

#### Form Fields
```css
/* Original */
.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-family: 'Lato', sans-serif;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #a05941;
  outline: none;
  box-shadow: 0 0 0 3px rgba(160, 89, 65, 0.1);
}

/* Tailwind */
<input class="w-full px-3 py-3 border border-gray-300 rounded-md font-ui transition-all duration-fast focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
```

#### Labels
```css
/* Original */
.form-label {
  display: block;
  font-weight: 700;
  color: #3a3a3a;
  margin-bottom: 8px;
  font-size: 0.95em;
}

/* Tailwind */
<label class="block text-text font-bold text-sm mb-2">
  Label Text
</label>
```

### Quantity-Price Selector
```css
/* Original */
.quantity-price-option {
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-price-option:hover {
  border-color: #a05941;
}

.quantity-price-option:has(input[type="radio"]:checked) {
  border-color: #a05941;
  background-color: rgba(160, 89, 65, 0.05);
}

/* Tailwind */
<div class="flex items-center p-2 border border-gray-300 rounded-md cursor-pointer transition-all duration-fast hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
  <input type="radio" class="mr-2.5">
  <div class="flex-1">
    <!-- Option content -->
  </div>
</div>
```

### Mini Cart Component

#### Cart Drawer
```css
/* Original */
.mini-cart {
  position: fixed;
  top: 0;
  right: -100%;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 9999;
}

.mini-cart.active {
  right: 0;
}

/* Tailwind */
<div class="fixed top-0 right-0 h-screen w-96 bg-white shadow-xl transform translate-x-full transition-transform duration-fast z-[9999] data-[active]:translate-x-0">
```

#### Cart Header
```css
/* Original */
.mini-cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background: var(--color-primary);
  color: white;
  font-weight: bold;
}

/* Tailwind */
<div class="flex items-center justify-between p-4 bg-primary text-white font-bold">
```

### Button Components

#### Primary CTA Buttons
```css
/* Original */
.btn-primary {
  background: linear-gradient(135deg, #a05941, #d68c45);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(160, 89, 65, 0.3);
}

/* Tailwind */
<button class="bg-gradient-to-r from-primary to-primary-light text-white border-0 py-4 px-8 rounded-full font-bold uppercase tracking-wide cursor-pointer transition-all duration-fast hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30">
  Button Text
</button>
```

#### Secondary Buttons
```css
/* Original */
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 12px 25px;
  border-radius: 20px;
  font-weight: bold;
  transition: all 0.3s ease;
}

/* Tailwind */
<button class="bg-transparent text-primary border-2 border-primary py-3 px-6 rounded-xl font-bold transition-all duration-fast hover:bg-primary hover:text-white">
  Button Text
</button>
```

---

## 3. Layout Components

### Container System
```css
/* Original */
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 5px;
}

/* Tailwind */
<div class="w-full max-w-4xl mx-auto px-1.5 sm:px-4 lg:px-6">
```

### Grid System for Products
```css
/* Original */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

/* Tailwind */
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
```

### Flex Components
```css
/* Original */
.product-benefits {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin: 5px 0 8px;
}

/* Tailwind */
<div class="flex items-center justify-between gap-1.5 my-1.5">
```

---

## 4. Responsive Design Patterns

### Mobile-First Approach
```css
/* Original - Mobile First */
@media (min-width: 769px) {
  .desktop-only {
    display: block;
  }
}

/* Tailwind - Mobile First */
<div class="hidden md:block">
  <!-- Desktop content -->
</div>
```

### Responsive Typography
```css
/* Original */
.hero-title {
  font-size: 2rem;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
}

/* Tailwind */
<h1 class="text-2xl md:text-3xl lg:text-4xl">
  Hero Title
</h1>
```

### Responsive Spacing
```css
/* Original */
.section {
  padding: 20px;
}

@media (min-width: 768px) {
  .section {
    padding: 40px;
  }
}

/* Tailwind */
<section class="p-5 md:p-10">
```

---

## 5. Animation and Transitions

### Hover Effects
```css
/* Original */
.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

/* Tailwind */
<div class="transition-all duration-medium hover:-translate-y-1.5 hover:shadow-strong">
```

### Focus States
```css
/* Original */
.form-control:focus {
  border-color: #a05941;
  box-shadow: 0 0 0 3px rgba(160, 89, 65, 0.1);
}

/* Tailwind */
<input class="focus:border-primary focus:ring-2 focus:ring-primary/20">
```

### Loading States
```css
/* Original */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

/* Tailwind */
<div class="opacity-60 pointer-events-none">
```

---

## 6. Utility Classes

### Text Utilities
```css
/* Original */
.text-primary {
  color: #a05941;
}

.text-center {
  text-align: center;
}

.font-bold {
  font-weight: 700;
}

/* Tailwind */
.text-primary
.text-center
.font-bold
```

### Spacing Utilities
```css
/* Original */
.mt-4 { margin-top: 1rem; }
.p-2 { padding: 0.5rem; }
.gap-4 { gap: 1rem; }

/* Tailwind */
.mt-4
.p-2
.gap-4
```

### Background Utilities
```css
/* Original */
.bg-cream {
  background-color: #faf7f2;
}

.bg-pattern {
  background-image: url('pattern.svg');
  background-size: 100px 100px;
}

/* Tailwind */
.bg-background
.bg-[url('pattern.svg')]
.bg-[length:100px_100px]
```

---

## 7. Custom Component Examples

### Complete Product Card
```html
<div class="bg-white rounded-xl shadow-medium p-4 transition-all duration-medium hover:shadow-strong hover:-translate-y-1">
  <!-- Product Image -->
  <div class="relative mb-4">
    <img
      src="product-image.jpg"
      alt="Product Name"
      class="w-full h-64 object-cover rounded-lg"
    >

    <!-- Badges -->
    <div class="absolute top-2 left-2 space-y-1">
      <span class="inline-block px-2 py-1 bg-green-700 text-white text-xs font-bold uppercase rounded-sm tracking-wide">
        BESTSELLER
      </span>
    </div>

    <!-- Hover Overlay -->
    <div class="absolute inset-0 bg-black/10 rounded-lg opacity-0 transition-opacity duration-fast hover:opacity-100">
      <button class="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Product Info -->
  <h3 class="font-serif text-lg font-bold text-text mb-2 text-center">
    Georgia Negras
  </h3>

  <!-- Product Benefits -->
  <div class="flex items-center justify-between gap-1.5 my-1.5 bg-background/70 rounded-sm p-1 text-xs font-ui text-primary">
    <span class="bg-primary/10 rounded-sm px-1.5 py-0.5 font-semibold">
      🚚 Envío Gratis
    </span>
    <span class="text-primary/50">|</span>
    <span class="bg-primary/10 rounded-sm px-1.5 py-0.5 font-semibold">
      ✨ Premium
    </span>
  </div>

  <!-- Price Options -->
  <div class="space-y-2 mt-3">
    <div class="flex items-center p-2 border border-gray-300 rounded-md cursor-pointer transition-all duration-fast hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
      <input type="radio" name="quantity" class="mr-2.5">
      <div class="flex-1 flex items-center justify-between">
        <span class="text-sm">1 par</span>
        <span class="font-bold text-text">$70.000</span>
      </div>
    </div>

    <div class="flex items-center p-2 border border-gray-300 rounded-md cursor-pointer transition-all duration-fast hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
      <input type="radio" name="quantity" class="mr-2.5">
      <div class="flex-1 flex items-center justify-between">
        <span class="text-sm">2 pares</span>
        <div>
          <span class="font-bold text-text">$110.000</span>
          <span class="text-red-600 text-xs font-bold block">¡Ahorra $30.000!</span>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA Button -->
  <button class="w-full mt-4 bg-gradient-to-r from-primary to-primary-light text-white border-0 py-3 px-6 rounded-full font-bold uppercase tracking-wide cursor-pointer transition-all duration-fast hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30">
    Agregar al Carrito
  </button>
</div>
```

### Complete Form Section
```html
<form class="space-y-4 bg-white rounded-xl shadow-medium p-6">
  <h2 class="font-serif text-2xl font-bold text-text mb-6">
    Información de Envío
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Name Field -->
    <div class="form-group">
      <label for="name" class="block text-text font-bold text-sm mb-2">
        Nombre Completo <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        required
        class="w-full px-3 py-3 border border-gray-300 rounded-md font-ui transition-all duration-fast focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        placeholder="Tu nombre completo"
      >
    </div>

    <!-- Phone Field -->
    <div class="form-group">
      <label for="phone" class="block text-text font-bold text-sm mb-2">
        WhatsApp <span class="text-red-500">*</span>
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        required
        class="w-full px-3 py-3 border border-gray-300 rounded-md font-ui transition-all duration-fast focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        placeholder="Ej: 1156457057 (sin 0 ni 15)"
      >
    </div>
  </div>

  <!-- Email Field -->
  <div class="form-group">
    <label for="email" class="block text-text font-bold text-sm mb-2">
      Email <span class="text-red-500">*</span>
    </label>
    <input
      type="email"
      id="email"
      name="email"
      required
      class="w-full px-3 py-3 border border-gray-300 rounded-md font-ui transition-all duration-fast focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
      placeholder="tuemail@ejemplo.com"
    >
  </div>

  <!-- Address Field -->
  <div class="form-group">
    <label for="address" class="block text-text font-bold text-sm mb-2">
      Dirección <span class="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="address"
      name="address"
      required
      class="w-full px-3 py-3 border border-gray-300 rounded-md font-ui transition-all duration-fast focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
      placeholder="Calle, número, piso, departamento"
    >
  </div>

  <!-- Submit Button -->
  <button
    type="submit"
    class="w-full bg-gradient-to-r from-primary to-primary-light text-white border-0 py-4 px-8 rounded-full font-bold uppercase tracking-wide cursor-pointer transition-all duration-fast hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Confirmar Pedido
  </button>
</form>
```

---

## 8. Migration Strategy

### Phase 1: Setup and Configuration
1. Install Tailwind CSS and configure custom colors
2. Create base layout components
3. Set up responsive utilities

### Phase 2: Component Migration
1. Migrate header and navigation components
2. Convert product cards and badges
3. Update form components and inputs

### Phase 3: Layout and Spacing
1. Convert container and grid systems
2. Update spacing and typography
3. Implement responsive design patterns

### Phase 4: Optimization
1. Remove unused CSS classes
2. Optimize component performance
3. Test across all breakpoints

### Phase 5: Testing and Validation
1. Cross-browser testing
2. Accessibility testing
3. Performance optimization

---

This comprehensive migration guide ensures that the brand identity and design consistency of Rosita Rococó are maintained while taking advantage of Tailwind CSS's utility-first approach for improved performance and maintainability.