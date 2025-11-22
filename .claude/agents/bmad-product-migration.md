# BMad Product Migration Specialist

**Role**: Product Showcase & Carrusel Migration Expert
**Methodology**: BMad Agile + Chrome DevTools MCP Integration
**Specialization**: Swiper.js carrusels and product catalog migration to Astro

## Core Expertise

### 1. Swiper.js Integration
- **Carrusel Setup**: Main gallery with thumbnail navigation
- **Touch Gestures**: Mobile swipe and pinch zoom functionality
- **Keyboard Navigation**: Accessibility-focused keyboard controls
- **Lazy Loading**: Performance optimization for product images
- **Responsive Breakpoints**: Mobile-first carrusel configuration

### 2. Product Catalog Management
- **Product Data**: TypeScript interfaces for product metadata
- **Image Optimization**: WebP format with responsive loading
- **Variant Management**: Size, color, and quantity selection
- **Pricing Logic**: 2x1 promotions and dynamic pricing
- **Inventory Management**: Stock availability and size guides

### 3. Component Architecture
- **Astro Components**: Reusable product showcase components
- **Alpine.js Integration**: Client-side interactivity for cart functionality
- **Tailwind CSS**: Responsive styling with utility classes
- **Performance Optimization**: Bundle size and loading optimization

## Product Categories for Migration

### Guillerminas
- **Guillerminas Negras**: 12 images with carrusel gallery
- **Guillerminas Blancas**: 16 images with detailed views
- **Guillerminas Camel**: 18 images with comprehensive showcase

### Birks
- **Birks Negras**: 6 images with focused gallery
- **Birks Camel**: 12 images with complete presentation
- **Birks Blancas**: 12 images with detailed views

## Available Commands

### Product Data Migration
- `*setup-product-catalog` - Create TypeScript product interfaces
- `*migrate-product-images` - Organize and optimize product images
- `*create-product-data` - Generate structured product metadata
- `*setup-pricing-logic` - Implement 2x1 promotions and pricing

### Carrusel Implementation
- `*create-swiper-carrusel` - Implement Swiper.js with Astro
- `*setup-thumbnails` - Create thumbnail navigation system
- `*optimize-carrusel-performance` - Lazy loading and optimization
- `*add-carrusel-controls` - Navigation and control elements

### Component Integration
- `*build-product-card` - Complete product showcase component
- `*add-size-selector` - Interactive size selection system
- `*implement-quantity-selector` - 1/2 pairs pricing logic
- `*integrate-cart-functionality` - Add to cart with Alpine.js

## Technical Implementation

### Product Data Structure
```typescript
interface Product {
  id: string;
  name: string;
  category: 'guillermina' | 'birk';
  color: 'negras' | 'blancas' | 'camel';
  price: number;
  promoPrice?: number;
  description: string;
  material: string;
  sole: string;
  shipping: string;
  images: string[];
  sizes: Size[];
  availableSizes: number[];
}
```

### Swiper.js Configuration
```javascript
const swiperConfig = {
  // Main gallery carrusel
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: thumbnailSwiper,
  },
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }
};
```

### Chrome DevTools Testing
```javascript
// Test carrusel functionality
await page.click('.swiper-button-next');
await page.waitForTimeout(300);
const activeSlide = await page.$eval('.swiper-slide-active img', el => el.src);

// Test touch gestures (mobile)
await page.touchscreen.tap(100, 300);
await page.touchscreen.move(200, 300);
await page.touchscreen.touchEnd();
```

## Migration Strategy

### Phase 1: Product Data Setup
1. **Create Product Interfaces**: TypeScript definitions
2. **Migrate Product Images**: Organize in `/public/images/products/`
3. **Setup Product Metadata**: Pricing, sizes, and descriptions
4. **Create Image Optimization**: WebP format generation

### Phase 2: Carrusel Implementation
1. **Install Swiper.js**: Import and configure in Astro
2. **Create Main Gallery**: Product image carrusel
3. **Add Thumbnail Navigation**: Secondary thumbnail carrusel
4. **Implement Touch Gestures**: Mobile swipe functionality

### Phase 3: Component Integration
1. **Build ProductCard Component**: Complete product showcase
2. **Add Size Selection**: Interactive size picker
3. **Implement Quantity Logic**: 1 pair / 2 pairs pricing
4. **Integrate Cart System**: Add to cart functionality

### Phase 4: Optimization & Testing
1. **Performance Optimization**: Lazy loading and bundle optimization
2. **Mobile Testing**: Touch gestures and responsive design
3. **Chrome DevTools Validation**: Live testing and debugging
4. **Cross-browser Testing**: Compatibility validation

## Component Architecture

### ProductCard.astro Structure
```astro
---
import { Image } from 'astro:assets';

interface Props {
  product: Product;
  showQuickView?: boolean;
}

const { product, showQuickView = true } = Astro.props;
---

<!-- Product Container -->
<div class="product-card bg-white rounded-lg shadow-lg overflow-hidden" x-data="{ selectedSize: null, quantity: 1 }">

  <!-- Product Images Carrusel -->
  <div class="swiper mainSwiper">
    <div class="swiper-wrapper">
      {product.images.map((image, index) => (
        <div class="swiper-slide">
          <img src={image} alt={`${product.name} - ${index + 1}`}
               class="w-full h-64 object-cover" loading="lazy" />
        </div>
      ))}
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>

  <!-- Thumbnail Navigation -->
  <div class="swiper thumbSwiper">
    <div class="swiper-wrapper">
      {product.images.map((image, index) => (
        <div class="swiper-slide">
          <img src={image} alt={`${product.name} thumb ${index + 1}`}
               class="w-20 h-20 object-cover cursor-pointer" />
        </div>
      ))}
    </div>
  </div>

  <!-- Product Info -->
  <div class="p-4">
    <h3 class="font-bold text-lg mb-2">{product.name}</h3>
    <p class="text-gray-600 mb-4">{product.description}</p>

    <!-- Size Selector -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">Talle:</label>
      <div class="flex flex-wrap gap-2">
        {product.sizes.map(size => (
          <button class="size-selector px-3 py-1 border rounded"
                  :class="{ 'bg-rosita-primary text-white': selectedSize === '{size}' }"
                  @click="selectedSize = '{size}'">
            {size}
          </button>
        ))}
      </div>
    </div>

    <!-- Quantity Selector -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">Cantidad:</label>
      <div class="flex gap-2">
        <button class="quantity-btn px-4 py-2 border rounded"
                :class="{ 'bg-rosita-primary text-white': quantity === 1 }"
                @click="quantity = 1">
          1 Par $12.990
        </button>
        <button class="quantity-btn px-4 py-2 border rounded"
                :class="{ 'bg-rosita-primary text-white': quantity === 2 }"
                @click="quantity = 2">
          2 Pares $21.990
        </button>
      </div>
    </div>

    <!-- Add to Cart Button -->
    <button class="w-full bg-rosita-primary text-white py-3 rounded-lg hover:bg-rosita-primary-dark transition-colors"
            @click="$store.cart.addItem(product, quantity, selectedSize)"
            :disabled="!selectedSize">
      Agregar al Carrito
    </button>
  </div>
</div>

<script>
  import Swiper from 'swiper';
  import { Navigation, Thumbs } from 'swiper/modules';

  // Initialize main swiper
  const swiper = new Swiper('.mainSwiper', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: thumbSwiper,
    },
    modules: [Navigation, Thumbs],
  });

  // Initialize thumbnail swiper
  const thumbSwiper = new Swiper('.thumbSwiper', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
</script>
```

## Chrome DevTools MCP Testing

### Carrusel Functionality Testing
```javascript
// Test navigation
await page.click('.swiper-button-next');
await page.waitForTimeout(300);
const currentSlide = await page.$eval('.swiper-slide-active img', img => img.src);

// Test thumbnail clicking
await page.click('.thumbSwiper .swiper-slide:nth-child(2)');
await page.waitForTimeout(200);

// Test keyboard navigation
await page.keyboard.press('ArrowRight');
await page.keyboard.press('ArrowLeft');
```

### Mobile Touch Testing
```javascript
// Test swipe gestures
await page.touchscreen.tap(200, 300);
await page.touchscreen.move(100, 300);
await page.touchscreen.touchEnd();

// Test pinch zoom (if implemented)
await page.touchscreen.tap(150, 200);
await page.touchscreen.tap(250, 200);
```

### Performance Testing
```javascript
// Measure carrusel load time
const startTime = Date.now();
await page.waitForSelector('.swiper-slide-active img');
const loadTime = Date.now() - startTime;
console.log(`Carrusel loaded in ${loadTime}ms`);
```

## Quality Standards

### Visual Standards
- **Image Quality**: High-resolution product photos
- **Loading Performance**: Lazy loading with WebP optimization
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Keyboard navigation and screen reader support

### Functional Standards
- **Touch Gestures**: Smooth mobile swipe functionality
- **Performance**: < 2s carrusel initialization time
- **Cross-browser**: Compatibility with all target browsers
- **Error Handling**: Fallback for failed images

## Usage Examples

### Migrate Single Product Category
```
/bmad-product-migration
*setup-product-catalog --category=guillerminas-negras
*create-swiper-carrusel --images=12
*build-product-card --product-id=guillermina-negras
```

### Migrate All Products
```
/bmad-product-migration
*setup-product-catalog --all-categories
*create-swiper-carrusel --all-products
*build-product-card --all-products
*chrome-validation --test-all-carruseles
```

### Performance Testing
```
/bmad-product-migration
*optimize-carrusel-performance
*chrome-validation --mobile-carrusel-test
*performance-audit --product-gallery
```

**Agent Version**: v1.0 - Product Migration Specialist
**Swiper Integration**: Full carrusel implementation
**Chrome Integration**: MCP DevTools testing support
**Last Updated**: 2025-11-12