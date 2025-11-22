# Plan de Migración: Rosita Rococó e-commerce a Astro + Tailwind
**Fecha:** 11 de Noviembre de 2025
**Método:** Desarrollo Iterativo con Validación MCP Continua

---

## 🎯 OBJETIVO Y ENFOQUE

### Objetivo Principal
Migrar completamente dos embudos de eCommerce a Astro + Tailwind CSS implementando un **proceso iterativo de mejora continua** donde cada fase incluye:

1. **Planificación** → Diseño técnico detallado
2. **Programación** → Implementación del componente
3. **Testeo** → Validación funcional con chrome-devtools-mcp
4. **Visión** → Análisis visual con ai-vision-mcp
5. **Mejora** → Optimización iterativa hasta OK ✅

### Filosofía de Validación Continua
```
Cada componente/página debe pasar por:
┌─────────────────────────────────────────────────────┐
│ 1. CAPTURA: chrome-devtools-mcp toma screenshots     │
│    - Estado actual/desktop/móvil                      │
│    - Logs y errores                                   │
│    - Network requests                                 │
│    - Performance metrics                              │
├─────────────────────────────────────────────────────┤
│ 2. ANÁLISIS: ai-vision-mcp interpreta resultados     │
│    - Comparación vs original                          │
│    - Detección de errores visuales                   │
│    - Análisis de texto y precios                     │
│    - Validación de interacciones                     │
├─────────────────────────────────────────────────────┤
│ 3. VALIDACIÓN: OK/WARN/FAIL por cada elemento        │
│    - OK: Funciona igual o mejor que original         │
│    - WARN: Funciona con mejoras potenciales           │
│    - FAIL: Requiere corrección inmediata             │
├─────────────────────────────────────────────────────┤
│ 4. MEJORA: Iterar hasta alcanzar OK en todo          │
│    - Ajustes de CSS                                   │
│    - Corrección de JavaScript                         │
│    - Optimización de performance                      │
│    - Mejoras de UX/Accesibilidad                     │
└─────────────────────────────────────────────────────┘
```

---

## 🏗️ ARQUITECTURA ASTRO + TAILWIND

### Estructura del Proyecto
```
rositaastro/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   └── LoadingSpinner.astro
│   │   ├── product/
│   │   │   ├── ProductCard.astro
│   │   │   ├── ProductCarousel.astro
│   │   │   ├── ProductGallery.astro
│   │   │   ├── SizeSelector.astro
│   │   │   └── PriceDisplay.astro
│   │   ├── cart/
│   │   │   ├── MiniCart.astro
│   │   │   ├── CartItem.astro
│   │   │   ├── CartSummary.astro
│   │   │   └── CheckoutButton.astro
│   │   ├── forms/
│   │   │   ├── CheckoutForm.astro
│   │   │   ├── ContactForm.astro
│   │   │   ├── ShippingForm.astro
│   │   │   └── FormValidation.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Badge.astro
│   │   │   ├── Modal.astro
│   │   │   └── WhatsAppWidget.astro
│   │   └── layout/
│   │       ├── MainLayout.astro
│   │       ├── ProductLayout.astro
│   │       └── CheckoutLayout.astro
│   ├── pages/
│   │   ├── index.astro              # Previo Pago
│   │   ├── contrarreembolso.astro   # Contrarreembolso
│   │   ├── gracias.astro            # Thank you pages
│   │   └── api/
│   │       ├── webhook.js           # Form submissions
│   │       └── validate.js          # Phone validation
│   ├── data/
│   │   ├── products.json            # Product catalog
│   │   ├── pricing.json             # Pricing rules
│   │   └── locations.json           # Shipping zones
│   ├── lib/
│   │   ├── cart.js                  # Cart state management
│   │   ├── forms.js                 # Form handling
│   │   ├── validation.js            # Input validation
│   │   └── analytics.js             # Pixel/analytics
│   └── styles/
│       ├── globals.css              # Base styles
│       └── components.css           # Component overrides
├── public/
│   ├── images/
│   │   ├── products/                # Optimized product images
│   │   ├── ui/                      # UI assets
│   │   └── logos/                   # Brand assets
│   ├── js/                          # Client-side scripts
│   └── icons/                       # SVG icons
├── astro.config.mjs
├── tailwind.config.js
├── package.json
└── README.md
```

### Configuración Tailwind Customizada
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand Colors (from current design)
        'rosita-primary': '#a05941',
        'rosita-primary-dark': '#7a3f2b',
        'rosita-secondary': '#d68c45',
        'rosita-accent': '#5a8f3e',
        'rosita-background': '#faf7f2',
        'rosita-border': '#f0e9e0',

        // Semantic colors
        'success': '#2e7d32',    // Bestseller green
        'warning': '#c62828',    // Limited edition red
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Open Sans', 'sans-serif'],
        'ui': ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'rosita-soft': '0 5px 20px rgba(0, 0, 0, 0.05)',
        'rosita-medium': '0 8px 25px rgba(0, 0, 0, 0.08)',
        'rosita-strong': '0 12px 30px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

---

## 📦 MAPEO DE COMPONENTES

### Mapeo Original → Astro + Tailwind

| Componente Original | Componente Astro | Tecnologías | Complejidad |
|-------------------|------------------|-------------|-------------|
| Header con benefits bar | `Header.astro` | Astro + Tailwind | Media |
| Product carousel | `ProductCarousel.astro` | Astro + Swiper.js + client:load | Alta |
| Mini cart floating | `MiniCart.astro` | Astro + Alpine.js + client:load | Alta |
| Form validation | `FormValidation.astro` | Astro + native validation + client:load | Alta |
| WhatsApp modal | `WhatsAppWidget.astro` | Astro + client:load | Media |
| Product badges | `Badge.astro` | Astro + Tailwind | Baja |
| Footer links | `Footer.astro` | Astro + Tailwind | Baja |

### Estructura de Datos Centralizada
```javascript
// src/data/products.json
{
  "previo_pago": {
    "guillerminas": {
      "negras": {
        "name": "Guillerminas Negras",
        "sku": "guillerminas-negra",
        "price": 55990,
        "price_bundle": 95000,
        "images": [
          "guillerminas/negra/1.webp",
          "guillerminas/negra/2.webp",
          // ... 40+ images
        ],
        "sizes": [35, 36, 37, 38, 39, 40, 41, 42],
        "badges": ["bestseller"],
        "colors": ["negro"]
      }
      // ... otras variantes
    }
  },
  "contrarreembolso": {
    "milan": {
      "name": "Milán",
      "price": 55000,
      "price_bundle": 85000,
      "images": ["nuevosmodeloscontra/1.webp", ...],
      "shipping_zones": ["caba", "gba", "buenos_aires"]
    }
  }
}
```

---

## 🔄 PROCESO DE DESARROLLO ITERATIVO

### Ciclo de Desarrollo por Componente

#### Fase 1: Planificación del Componente
```javascript
// 1. Analizar componente original con chrome-devtools-mcp
const analysis = await chromeDevTools.analyzeComponent('product-carousel');

// 2. Documentar comportamiento esperado
const expectedBehavior = {
  carouselType: 'swiper',
  imageCount: 40,
  hasThumbnails: true,
  hasTouchSupport: true,
  responsiveBreakpoints: [480, 768, 1024]
};

// 3. Diseñar arquitectura Astro
const componentDesign = {
  name: 'ProductCarousel.astro',
  props: ['images', 'product', 'variant'],
  islands: ['swiper-initialization.js'],
  responsive: true,
  accessibility: 'wcag-aa'
};
```

#### Fase 2: Implementación Base
```astro
<!-- src/components/product/ProductCarousel.astro -->
---
import { Image } from '@astrojs/image';

export interface Props {
  images: string[];
  alt: string;
  product: string;
}

const { images, alt, product } = Astro.props;
---

<div class="product-carousel" data-product={product}>
  <!-- Main Swiper Container -->
  <div class="swiper main-swiper">
    <div class="swiper-wrapper">
      {images.map((img, index) => (
        <div class="swiper-slide">
          <Image
            src={img}
            alt={`${alt} - Imagen ${index + 1}`}
            width={800}
            height={600}
            format="webp"
            loading={index === 0 ? 'eager' : 'lazy'}
            class="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
  </div>

  <!-- Thumbnail Swiper -->
  <div class="swiper thumbnail-swiper">
    <div class="swiper-wrapper">
      {images.map((img, index) => (
        <div class="swiper-slide">
          <Image
            src={img}
            alt={`${alt} - Thumbnail ${index + 1}`}
            width={100}
            height={75}
            format="webp"
            class="w-full h-auto cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          />
        </div>
      ))}
    </div>
  </div>
</div>

<style>
  .product-carousel {
    @apply bg-white rounded-lg shadow-rosita-medium overflow-hidden;
  }
  .swiper {
    @apply w-full;
  }
  .swiper-slide img {
    @apply rounded-t-lg;
  }
  .thumbnail-swiper {
    @apply mt-4 px-4;
  }
  .thumbnail-swiper .swiper-slide {
    @apply opacity-60 hover:opacity-100 transition-opacity cursor-pointer;
  }
</style>

<script client:load>
  import Swiper from 'swiper/bundle';
  import 'swiper/css/bundle';

  document.addEventListener('DOMContentLoaded', () => {
    // Initialize main carousel
    const mainSwiper = new Swiper('.main-swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      thumbs: {
        swiper: thumbnailSwiper,
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 },
      },
    });

    // Initialize thumbnail carousel
    const thumbnailSwiper = new Swiper('.thumbnail-swiper', {
      spaceBetween: 10,
      slidesPerView: 6,
      freeMode: true,
      watchSlidesProgress: true,
    });
  });
</script>
```

#### Fase 3: Validación con chrome-devtools-mcp
```javascript
// Testing script para cada componente
const validateComponent = async (componentName) => {
  console.log(`🔍 Validando componente: ${componentName}`);

  // 1. Capturar estado inicial
  const initialCapture = await chromeDevTools.captureFullPage({
    url: `http://localhost:4321/${componentName}`,
    viewport: 'desktop',
    savePath: `evidence/screenshots/${componentName}-initial.png`
  });

  // 2. Probar interacciones
  const interactions = await testComponentInteractions(componentName);

  // 3. Capturar post-interacciones
  const postInteractionCapture = await chromeDevTools.captureFullPage({
    url: `http://localhost:4321/${componentName}`,
    viewport: 'desktop',
    savePath: `evidence/screenshots/${componentName}-after-interaction.png`
  });

  // 4. Analizar performance
  const performance = await chromeDevTools.analyzePerformance({
    url: `http://localhost:4321/${componentName}`,
    metrics: ['FCP', 'LCP', 'CLS', 'FID']
  });

  return {
    initial: initialCapture,
    interactions,
    postInteraction: postInteractionCapture,
    performance
  };
};
```

#### Fase 4: Análisis Visual con ai-vision-mcp
```javascript
// Validación visual automatizada
const validateVisual = async (originalImage, newImage) => {
  const analysis = await aiVision.compareImages({
    original: originalImage,
    new: newImage,
    checks: [
      'text_accuracy',      // Precisión de texto y precios
      'layout_consistency', // Consistencia de layout
      'color_accuracy',     // Precisión de colores marca
      'component_visibility', // Visibilidad de componentes
      'interaction_states',  // Estados de interacción
      'responsiveness'      // Responsive behavior
    ]
  });

  return {
    status: analysis.overallScore >= 0.9 ? 'OK' :
            analysis.overallScore >= 0.7 ? 'WARN' : 'FAIL',
    score: analysis.overallScore,
    issues: analysis.issues,
    recommendations: analysis.recommendations
  };
};
```

#### Fase 5: Iteración hasta OK
```javascript
// Proceso iterativo de mejora
const iterativeImprovement = async (componentName) => {
  let status = 'FAIL';
  let iteration = 1;

  while (status !== 'OK' && iteration <= 5) {
    console.log(`🔄 Iteración ${iteration} para ${componentName}`);

    // Validar componente
    const validation = await validateComponent(componentName);
    const visual = await validateVisual(
      `evidence/screenshots/${componentName}-original.png`,
      validation.postInteraction.path
    );

    // Generar reporte
    await generateReport({
      component: componentName,
      iteration,
      validation,
      visual,
      status: visual.status
    });

    if (visual.status === 'OK') {
      console.log(`✅ ${componentName} - Validación completa`);
      status = 'OK';
    } else {
      // Aplicar mejoras sugeridas
      await applyImprovements(componentName, visual.recommendations);
      iteration++;
    }
  }

  return status === 'OK' ? 'SUCCESS' : 'REQUIRES_MANUAL_REVIEW';
};
```

---

## 📅 PLAN DE IMPLEMENTACIÓN POR FASES

### Semana 1: Configuración y Layout Base
**Objetivo:** Establecer fundación técnica

#### Día 1-2: Project Setup
```bash
# 1. Inicializar proyecto Astro
npm create astro@latest rositaastro
cd rositaastro

# 2. Instalar dependencias
npm install @astrojs/tailwind @astrojs/image alpinejs
npm install swiper @tailwindcss/forms @tailwindcss/typography

# 3. Configurar Tailwind con brand colors
# 4. Setup estructura de carpetas
# 5. Migrar assets (logos, images)
```

#### Día 3-4: Layout Components
```astro
<!-- MainLayout.astro -->
<Header />
<slot />
<Footer />

<!-- Header.astro (validar MCP) -->
<!-- Navigation.astro (validar MCP) -->
<!-- Footer.astro (validar MCP) -->
```

**Validación MCP:**
- chrome-devtools-mcp: Capturar header en desktop/mobile
- ai-vision-mcp: Comparar vs original, validar colores y layout

#### Día 5: Basic Pages Structure
```astro
<!-- index.astro (previo pago) -->
<MainLayout>
  <Hero />
  <ProductGrid />
  <MiniCart />
  <CheckoutForm />
</MainLayout>

<!-- contrarreembolso.astro -->
<MainLayout>
  <ContrareembolsoHero />
  <ProductGrid />
  <WhatsAppIntegration />
  <CheckoutForm />
</MainLayout>
```

### Semana 2: Product Components
**Objetivo:** Implementar sistema de productos

#### Día 6-7: Product Display System
```astro
<!-- ProductCard.astro -->
<ProductCarousel />
<ProductInfo />
<SizeSelector />
<AddToCartButton />

<!-- Validación MCP por cada componente -->
```

#### Día 8-9: Carousel System
```astro
<!-- ProductCarousel.astro -->
<MainSwiper />
<ThumbnailSwiper />

<!-- Validar con MCP: -->
- Capturar screenshots de carousel funcionando
- Probar touch/swipe en mobile
- Validar lazy loading de imágenes
- Analizar performance de carga
```

#### Día 10: Size Selection & Pricing
```astro
<!-- SizeSelector.astro -->
<SizeOptions />
<PriceDisplay />

<!-- Validar con MCP: -->
- Capturar screenshots de todos los tamaños
- Probar selección interactiva
- Validar cambios de precio dinámicos
- Analizar comparación vs original
```

### Semana 3: Cart & Form Systems
**Objetivo:** Implementar conversión core

#### Día 11-12: Shopping Cart
```astro
<!-- MiniCart.astro -->
<CartItems />
<CartSummary />
<CheckoutButton />

<!-- Validar con MCP: -->
- Probar agregar/remover productos
- Capturar estados vacío/lleno
- Validar cálculos de precio
- Probar mobile responsiveness
```

#### Día 13-14: Form Systems
```astro
<!-- CheckoutForm.astro -->
<ContactInfo />
<ShippingInfo />
<PaymentOptions />
<SubmitButton />

<!-- Validar con MCP: -->
- Capturar todos los estados del formulario
- Probar validación en tiempo real
- Validar errores y mensajes
- Probar submission (test endpoint)
```

#### Día 15: WhatsApp Integration
```astro
<!-- WhatsAppWidget.astro -->
<FloatingButton />
<ContactModal />
<PhoneValidation />

<!-- Validar con MCP:**
- Probar apertura de modal
- Validar formatos de teléfono
- Probar integración con API
- Capturar todos los estados
```

### Semana 4: Optimization & Testing
**Objetivo:** Perfeccionamiento y QA completo

#### Día 16-17: Performance Optimization
```javascript
// Optimización de imágenes
const optimizeImages = async () => {
  await chromeDevTools.analyzeImageLoading();
  // Generar reporte de optimización
  // Implementar mejoras
};

// Validar con MCP:**
- Análisis de performance pre/post optimización
- Validar Core Web Vitals
- Probar en conexiones lentas
```

#### Día 18-19: Cross-browser & Mobile Testing
```javascript
// Testing multi-dispositivo
const devices = ['mobile', 'tablet', 'desktop'];
const browsers = ['chrome', 'safari', 'firefox'];

devices.forEach(device => {
  browsers.forEach(browser => {
    validateComponent(device, browser);
  });
});
```

#### Día 20: Final QA & Documentation
```javascript
// QA final completo
const finalQA = async () => {
  const components = await getAllComponents();

  for (const component of components) {
    const result = await validateCompleteComponent(component);
    await generateFinalReport(component, result);
  }

  await generateMigrationReport();
};
```

---

## 🎯 MATRIZ DE VALIDACIÓN MCP

### Checklist de Validación por Componente

#### Para cada componente se debe validar:

| Elemento | chrome-devtools-mcp | ai-vision-mcp | Status |
|----------|-------------------|--------------|---------|
| **Visual Baseline** | Captura screenshot original | Análisis de diseño | ✅ Required |
| **Desktop Display** | Screenshot 1920x1080 | Comparación layout | ✅ Required |
| **Tablet Display** | Screenshot 768x1024 | Comparación responsive | ✅ Required |
| **Mobile Display** | Screenshot 375x667 | Comparación mobile | ✅ Required |
| **Interactive States** | Captura durante interacción | Análisis de estados | ✅ Required |
| **Performance Metrics** | Lighthouse audit | N/A | ✅ Required |
| **Console Logs** | Captura de errores | N/A | ✅ Required |
| **Network Requests** | Análisis de peticiones | N/A | ✅ Required |
| **Text Content** | N/A | Extracción de texto | ✅ Required |
| **Pricing Accuracy** | N/A | Validación de precios | ✅ Required |
| **Color Accuracy** | N/A | Análisis de colores | ✅ Required |
| **Component Visibility** | N/A | Detección de elementos | ✅ Required |

### Criterios de Aprobación

#### ✅ OK - Componente Aprobado
- Diferencia visual < 5% vs original
- Performance ≥ Lighthouse score 90
- Mobile usability 100%
- Sin errores en console
- Todos los textos y precios correctos
- Interacciones funcionando igual o mejor

#### ⚠️ WARN - Aprobado con Mejoras
- Diferencia visual 5-15% vs original
- Performance Lighthouse 80-89
- Minor issues en mobile
- Warnings no críticos en console
- Pequeñas diferencias en styling

#### ❌ FAIL - Requiere Corrección
- Diferencia visual > 15% vs original
- Performance Lighthouse < 80
- Errores críticos de funcionalidad
- Problemas mobile blocking
- Textos o precios incorrectos

---

## 🚀 AUTOMATIZACIÓN DE VALIDACIÓN

### Scripts de Validación Automatizada

#### MCP Validation Pipeline
```javascript
// scripts/mcp-validation.js
class MCPValidationPipeline {
  constructor() {
    this.chrome = new ChromeDevToolsMCP();
    this.vision = new AIVisionMCP();
    this.results = [];
  }

  async validateComponent(componentName, url) {
    console.log(`🚀 Iniciando validación MCP para: ${componentName}`);

    try {
      // 1. Capturas con chrome-devtools-mcp
      const captures = await this.captureAllStates(url, componentName);

      // 2. Análisis con ai-vision-mcp
      const analysis = await this.analyzeVisuals(captures);

      // 3. Performance analysis
      const performance = await this.analyzePerformance(url);

      // 4. Console y errors
      const console = await this.analyzeConsole(url);

      // 5. Generar resultado
      const result = this.generateResult({
        component: componentName,
        captures,
        analysis,
        performance,
        console
      });

      this.results.push(result);
      return result;

    } catch (error) {
      console.error(`❌ Error validando ${componentName}:`, error);
      return { status: 'ERROR', error };
    }
  }

  async captureAllStates(url, component) {
    const states = ['desktop', 'tablet', 'mobile'];
    const captures = {};

    for (const state of states) {
      captures[state] = {
        initial: await this.chrome.capture({
          url,
          viewport: state,
          savePath: `evidence/screenshots/${component}-${state}-initial.png`
        }),
        interaction: await this.chrome.captureInteraction({
          url,
          viewport: state,
          interaction: this.getInteractionForComponent(component),
          savePath: `evidence/screenshots/${component}-${state}-interaction.png`
        })
      };
    }

    return captures;
  }

  async analyzeVisuals(captures) {
    const analysis = {};

    for (const [viewport, capture] of Object.entries(captures)) {
      analysis[viewport] = await this.vision.compare({
        new: capture.initial.path,
        reference: `evidence/screenshots/original-${viewport}.png`,
        checks: [
          'layout_consistency',
          'text_accuracy',
          'color_match',
          'component_visibility',
          'spacing_accuracy'
        ]
      });
    }

    return analysis;
  }

  generateResult(data) {
    const scores = Object.values(data.analysis).map(a => a.overall_score);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    let status;
    if (avgScore >= 0.95) status = 'OK';
    else if (avgScore >= 0.85) status = 'WARN';
    else status = 'FAIL';

    return {
      component: data.component,
      status,
      score: avgScore,
      performance: data.performance,
      issues: this.identifyIssues(data),
      recommendations: this.generateRecommendations(data),
      timestamp: new Date().toISOString()
    };
  }
}
```

#### Automated Validation Runner
```javascript
// scripts/run-validation.js
const validator = new MCPValidationPipeline();

const components = [
  'Header',
  'ProductCarousel',
  'ProductCard',
  'MiniCart',
  'CheckoutForm',
  'WhatsAppWidget',
  'Footer'
];

async function runFullValidation() {
  console.log('🔄 Iniciando validación completa MCP...');

  const results = [];

  for (const component of components) {
    const url = `http://localhost:4321/components/${component}`;
    const result = await validator.validateComponent(component, url);
    results.push(result);

    console.log(`${component}: ${result.status} (${result.score})`);

    if (result.status === 'FAIL') {
      console.log(`  Issues: ${result.issues.join(', ')}`);
      console.log(`  Recomendations: ${result.recommendations.join(', ')}`);
    }
  }

  // Generate final report
  await generateValidationReport(results);
  console.log('✅ Validación completa - Reporte generado');
}

runFullValidation();
```

---

## 📊 MÉTRICAS DE ÉXITO Y KPIs

### Performance Targets
```javascript
const performanceTargets = {
  // Web Vitals
  firstContentfulPaint: '< 1.5s',
  largestContentfulPaint: '< 2.5s',
  firstInputDelay: '< 100ms',
  cumulativeLayoutShift: '< 0.1',

  // Size Metrics
  totalPageSize: '< 2MB',
  jsBundleSize: '< 200KB',
  cssBundleSize: '< 50KB',

  // Image Optimization
  imageOptimization: '> 90%',
  webpSupport: '100%',
  lazyLoadingCoverage: '> 80%'
};
```

### Conversion Metrics
```javascript
const conversionTargets = {
  // User Experience
  mobileUsabilityScore: '> 95',
  accessibilityScore: '> 90',
  seoScore: '> 90',

  // Business Metrics
  pageLoadVsConversion: '< 3s threshold',
  formCompletionRate: '> 80%',
  cartAbandonmentRate: '< 60%',

  // Technical Metrics
  mcpValidationScore: '> 95%',
  componentApprovalRate: '100%',
  crossBrowserCompatibility: '> 95%'
};
```

### MCP-Specific Metrics
```javascript
const mcpMetrics = {
  // Validation Success Rate
  componentOkRate: '100%',
  visualSimilarityScore: '> 95%',
  functionalParityScore: '100%',

  // Performance Comparison
  performanceImprovement: '> 50%',
  bundleSizeReduction: '> 40%',

  // Development Efficiency
  validationTimePerComponent: '< 15 min',
  iterationToApprovalRate: '< 3 iterations',
  automatedTestCoverage: '> 90%'
};
```

---

## 🎮 ESTRATEGIA DE DESPLIEGUE

### Staging Validation Pipeline
```
1. Development Branch
   ├── Component development
   ├── MCP validation per component
   └── Iterative improvement until OK

2. Staging Environment
   ├── Full integration testing
   ├── End-to-end MCP validation
   └── Performance benchmarking

3. Production Readiness
   ├── Final MCP audit
   ├── Performance validation
   └── SEO validation
```

### A/B Testing Framework
```javascript
// Configuración de pruebas A/B con validación MCP
const abTestConfig = {
  testUrl: 'https://rositaastro.alejandria.io',
  controlUrl: 'https://rositarococo.com',

  mcpValidation: {
    sampleSize: 1000,
    conversionMetrics: true,
    performanceComparison: true,
    visualParityCheck: true
  },

  successCriteria: {
    conversionRate: '>= current',
    pageLoadTime: '< current by 50%',
    bounceRate: '< current by 20%'
  }
};
```

---

## 🚨 PLAN DE CONTINGENCIA

### Rollback Strategy
```javascript
const rollbackPlan = {
  triggers: [
    'MCP validation score < 90%',
    'Conversion rate drop > 20%',
    'Performance degradation > 30%',
    'Critical component failures'
  ],

  procedure: [
    '1. Instant DNS rollback to original',
    '2. Alert development team',
    '3. Analyze MCP validation logs',
    '4. Implement hotfix',
    '5. Re-run MCP validation',
    '6. Gradual re-deployment'
  ],

  monitoring: {
    'Real-time MCP validation checks',
    'Performance monitoring alerts',
    'Conversion rate tracking',
    'Error rate monitoring'
  }
};
```

---

## 📋 ENTREGABLES

### Documentación de la Migración
1. **diagnosis.md** - Análisis completo del sistema actual ✅
2. **plan_migracion.md** - Plan detallado de implementación ✅
3. **component-mapping.md** - Mapeo de componentes original→Astro
4. **mcp-validation-reports/** - Reportes de validación por componente
5. **performance-comparison.md** - Comparación before/after
6. **deployment-guide.md** - Guía de despliegue

### Artefactos Técnicos
1. **rositaastro/** - Código completo del proyecto migrado
2. **mcp-validation-scripts/** - Scripts de automatización
3. **evidence/** - Evidencia visual y técnica completa
4. **reports/** - Reportes de análisis y validación

### Validación Final
1. **qa-checklist.md** - Checklist de QA completo
2. **launch-readiness-report.md** - Reporte de listos para producción
3. **post-launch-monitoring.md** - Plan de monitoreo post-lanzamiento

---

## 🎯 CONCLUSIÓN

Este plan de migración establece un **proceso robusto y validado** donde:

✅ **Cada componente se valida rigurosamente** con chrome-devtools-mcp y ai-vision-mcp
✅ **El desarrollo es iterativo** hasta alcanzar 100% de paridad funcional
✅ **La performance se optimiza continuamente** con métricas claras
✅ **La calidad visual se garantiza** con análisis de imágenes automatizado
✅ **El riesgo se mitiga** con validaciones exhaustivas y planes de contingencia

El resultado será una plataforma **moderna, performante y mantenible** que preserva la identidad de marca y optimización de conversión de Rosita Rococó, con la confianza de que cada componente ha sido validado exhaustivamente antes del lanzamiento.

**Siguiente paso:** Iniciar la **FASE 3 – EJECUCIÓN Y VALIDACIÓN** implementando este plan con validación MCP continua.