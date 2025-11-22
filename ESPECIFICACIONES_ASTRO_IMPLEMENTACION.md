# ESPECIFICACIONES DETALLADAS PARA IMPLEMENTACIÓN EN ASTRO

## COMPONENTES ASTRO REQUERIDOS

### 1. MainLayout.astro
```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Preconnect optimizations -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />

  <!-- Swiper CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

  <style is:global>
    :root {
      --color-primary: #a05941;
      --color-primary-dark: #7a3f2b;
      --color-secondary: #d68c45;
      --color-accent: #5a8f3e;
      --color-text: #3a3a3a;
      --color-text-light: #6d6d6d;
      --color-background: #faf7f2;
      --color-background-alt: #f5efe5;
      --color-border: #f0e9e0;
      --shadow-soft: 0 5px 20px rgba(0, 0, 0, 0.05);
      --shadow-medium: 0 8px 25px rgba(0, 0, 0, 0.08);
      --shadow-strong: 0 12px 30px rgba(0, 0, 0, 0.12);
      --border-radius-medium: 12px;
      --transition-fast: 0.3s ease;
      --transition-medium: 0.4s ease;
    }

    body {
      font-family: 'Lato', sans-serif;
      line-height: 1.6;
      color: var(--color-text);
      background-color: var(--color-background);
      background-image:
        linear-gradient(to bottom, rgba(250, 247, 242, 0.8), rgba(250, 247, 242, 0.8)),
        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L52 48 L50 46 L48 48 Z' fill='%23d68c4522' /%3E%3C/svg%3E");
      background-size: 100px 100px;
      background-attachment: fixed;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      color: var(--color-text);
      line-height: 1.3;
      margin-bottom: 0.8em;
    }
  </style>
</head>
<body>
  <slot />
</body>
</html>
```

### 2. Header.astro
```astro
---
// Header.astro
---

<header class="main-header">
  <img
    src="/images/rosita-form.webp"
    alt="Rosita Rococó Logo"
    class="header-logo"
    width="300"
    height="auto"
  />
  <h1>🍂 Colección Otoño-Invierno 2025 🍂</h1>
  <p class="subtitle">Diseños exclusivos que abrazan tus pasos con estilo y confort</p>
  <span class="season-badge">NUEVA TEMPORADA</span>
</header>

<style>
  .main-header {
    text-align: center;
    padding: 45px 0 35px;
    position: relative;
    background: linear-gradient(to bottom, var(--color-background), var(--color-background-alt));
    border-bottom: 1px solid rgba(160, 89, 65, 0.15);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  }

  .main-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary), var(--color-accent));
    opacity: 0.8;
  }

  .header-logo {
    max-width: 100%;
    width: auto;
    height: auto;
    margin: 0 auto 30px;
    filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.1));
  }

  .main-header h1 {
    font-size: clamp(2em, 5vw, 2.6em);
    color: var(--color-primary);
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: 1.2px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
  }

  .subtitle {
    font-size: clamp(1.1em, 3vw, 1.3em);
    color: var(--color-text-light);
    font-weight: 400;
    font-style: italic;
    margin-bottom: 18px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .season-badge {
    display: inline-block;
    background-color: var(--color-primary);
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 0.95em;
    font-weight: 600;
    margin-top: 15px;
    box-shadow: var(--shadow-soft);
    transition: transform var(--transition-fast);
  }

  .season-badge:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .main-header {
      padding: 30px 15px 25px;
    }

    .header-logo {
      margin-bottom: 20px;
    }
  }
</style>
```

### 3. BenefitsBanner.astro
```astro
---
// BenefitsBanner.astro
---

<div class="benefits-banner">
  <div class="benefit-item">
    <span class="benefit-icon">🚚</span>
    <span class="benefit-text">
      <strong>ENVÍO GRATIS</strong><br>
      a todo el país
    </span>
  </div>
  <div class="benefit-item">
    <span class="benefit-icon">💳</span>
    <span class="benefit-text">
      <strong>3 CUOTAS SIN INTERÉS</strong><br>
      con todas las tarjetas
    </span>
  </div>
</div>

<style>
  .benefits-banner {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 0 auto 30px;
    padding: 15px;
    background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
    border-radius: var(--border-radius-medium);
    box-shadow: var(--shadow-medium);
    color: white;
    max-width: 800px;
  }

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
  }

  .benefit-icon {
    font-size: 2.2rem;
    background-color: rgba(255, 255, 255, 0.2);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .benefit-text {
    font-size: 1rem;
    line-height: 1.3;
  }

  .benefit-text strong {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    display: block;
  }

  @media (max-width: 600px) {
    .benefits-banner {
      flex-direction: column;
      gap: 15px;
      padding: 15px 10px;
    }

    .benefit-item {
      justify-content: center;
      text-align: center;
    }

    .benefit-icon {
      font-size: 1.8rem;
      width: 45px;
      height: 45px;
    }
  }
</style>
```

### 4. PriceCard.astro
```astro
---
// PriceCard.astro
---

<div class="price-card">
  <div class="price-option">
    <span class="price-label">1 par:</span>
    <span class="price-amount">🔥 $70.000</span>
  </div>
  <div class="price-option best-value">
    <span class="price-label">2 pares:</span>
    <span class="price-amount">🔥 $110.000</span>
    <span class="price-detail">($55.000 c/u - ¡Tu mejor opción!)</span>
  </div>
</div>

<p class="discount-info">
  💰 <span class="highlight-discount">10% OFF EXTRA</span> pagando por Transferencia! 💰
</p>

<style>
  .price-card {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 25px auto;
    max-width: 500px;
    background-color: #fff;
    border-radius: var(--border-radius-medium);
    padding: 20px;
    box-shadow: var(--shadow-soft);
  }

  .price-option {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-radius: 8px;
    background-color: #f9f7f4;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    position: relative;
  }

  .price-option:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-soft);
  }

  .best-value {
    background-color: rgba(160, 89, 65, 0.08);
    border: 2px solid rgba(160, 89, 65, 0.15);
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(160, 89, 65, 0.15);
    z-index: 1;
    padding-top: 20px;
  }

  .best-value::before {
    content: '¡Mejor opción!';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-primary);
    color: white;
    padding: 4px 15px;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: 600;
    white-space: nowrap;
    box-shadow: var(--shadow-soft);
  }

  .price-label {
    font-size: 1.2em;
    font-weight: 700;
    color: var(--color-text);
    margin-right: 10px;
  }

  .price-amount {
    font-size: 1.4em;
    font-weight: 700;
    color: var(--color-primary);
    padding: 5px 10px;
    background-color: rgba(160, 89, 65, 0.1);
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    white-space: nowrap;
  }

  .price-detail {
    width: 100%;
    text-align: center;
    margin-top: 8px;
    font-size: 0.9em;
    color: var(--color-text-light);
    font-weight: 600;
  }

  .discount-info {
    text-align: center;
    font-size: 0.95em;
    color: #666;
    margin-top: 15px;
  }

  .highlight-discount {
    color: var(--color-primary);
    font-weight: 700;
    text-decoration: underline;
    text-decoration-style: wavy;
  }

  @media (max-width: 768px) {
    .price-card {
      padding: 15px 10px;
      margin: 20px auto;
    }

    .price-option {
      padding: 12px 8px;
      flex-direction: column;
      text-align: center;
      gap: 8px;
    }

    .best-value {
      transform: scale(1.03);
      padding-top: 25px;
    }

    .price-label {
      font-size: 1.1em;
      margin-right: 0;
      margin-bottom: 4px;
    }

    .price-amount {
      font-size: 1.3em;
    }

    .price-detail {
      margin-top: 5px;
    }
  }
</style>
```

### 5. ProductData.ts (TypeScript)
```typescript
// src/data/productData.ts

export interface Product {
  id: string;
  name: string;
  images: {
    src: string;
    alt: string;
  }[];
  specs: {
    material: string;
    suela: string;
    altura: string;
  };
  description: string;
  price: {
    onePair: number;
    twoPairs: number;
  };
  talles: {
    number: number;
    cm: string;
  }[];
}

export const products: Product[] = [
  {
    id: 'roma-negras',
    name: 'Botineta Roma Negras',
    images: [
      { src: '/images/roma-negras-1.jpg', alt: 'Botineta Roma Negras - Vista 1' },
      { src: '/images/roma-negras-1a.jpg', alt: 'Botineta Roma Negras - Vista 2' },
      { src: '/images/roma-negras-5a.jpg', alt: 'Botineta Roma Negras - Vista 3' },
      { src: '/images/roma-negras-2a.jpg', alt: 'Botineta Roma Negras - Vista 4' },
      { src: '/images/roma-negras-3a.jpg', alt: 'Botineta Roma Negras - Vista 5' },
      { src: '/images/roma-negras-4a.jpg', alt: 'Botineta Roma Negras - Vista 6' },
      { src: '/images/roma-negras-2.jpg', alt: 'Botineta Roma Negras - Vista 7' }
    ],
    specs: {
      material: 'Cuero',
      suela: 'Expanso',
      altura: 'Media'
    },
    description: 'Un clásico atemporal y versátil, perfecto para elevar cualquier look diario con comodidad y estilo.',
    price: {
      onePair: 70000,
      twoPairs: 110000
    },
    talles: [
      { number: 35, cm: '23 cm de plantilla' },
      { number: 36, cm: '23,5 cm de plantilla' },
      { number: 37, cm: '24 cm de plantilla' },
      { number: 38, cm: '25 cm de plantilla' },
      { number: 39, cm: '25,5 cm de plantilla' },
      { number: 40, cm: '26 cm de plantilla' }
    ]
  },
  {
    id: 'roma-suela',
    name: 'Botineta Roma Suela',
    images: [
      { src: '/images/roma-suela-1a.jpg', alt: 'Botineta Roma Suela - Vista 1' },
      { src: '/images/roma-suela-2a.jpg', alt: 'Botineta Roma Suela - Vista 2' },
      { src: '/images/roma-suela-1.jpg', alt: 'Botineta Roma Suela - Vista 3' },
      { src: '/images/roma-suela-2.jpg', alt: 'Botineta Roma Suela - Vista 4' }
    ],
    specs: {
      material: 'Cuero',
      suela: 'Expanso',
      altura: 'Media'
    },
    description: 'El tono cálido ideal para complementar tus outfits de otoño, aportando un toque natural y sofisticado.',
    price: {
      onePair: 70000,
      twoPairs: 110000
    },
    talles: [
      { number: 35, cm: '23 cm de plantilla' },
      { number: 36, cm: '23,5 cm de plantilla' },
      { number: 37, cm: '24 cm de plantilla' },
      { number: 38, cm: '25 cm de plantilla' },
      { number: 39, cm: '25,5 cm de plantilla' },
      { number: 40, cm: '26 cm de plantilla' }
    ]
  },
  {
    id: 'siena2025',
    name: 'Borcego Siena 2025',
    images: [
      { src: '/images/siena2025-1.webp', alt: 'Borcego Siena 2025 - Vista 1' },
      { src: '/images/siena2025-2.webp', alt: 'Borcego Siena 2025 - Vista 2' }
    ],
    specs: {
      material: 'Cuero',
      suela: 'Expanso',
      altura: 'Alta'
    },
    description: 'Robusto, chic y con carácter. El borcego Siena está listo para acompañarte en cualquier aventura urbana con actitud.',
    price: {
      onePair: 70000,
      twoPairs: 110000
    },
    talles: [
      { number: 35, cm: '23 cm de plantilla' },
      { number: 36, cm: '23,5 cm de plantilla' },
      { number: 37, cm: '24 cm de plantilla' },
      { number: 38, cm: '25 cm de plantilla' },
      { number: 39, cm: '25,5 cm de plantilla' },
      { number: 40, cm: '26 cm de plantilla' }
    ]
  },
  {
    id: 'venecia-negras',
    name: 'Venecia Negras',
    images: [
      { src: '/images/venecia-negras-1a.jpg', alt: 'Venecia Negras - Vista 1' },
      { src: '/images/venecia-negras-2a.jpg', alt: 'Venecia Negras - Vista 2' },
      { src: '/images/venecia-negras-3a.jpg', alt: 'Venecia Negras - Vista 3' },
      { src: '/images/venecia-negras-4a.jpg', alt: 'Venecia Negras - Vista 4' }
    ],
    specs: {
      material: 'Cuero',
      suela: 'Expanso',
      altura: 'Media'
    },
    description: 'Elegancia urbana con un toque italiano. Perfectas para tanto el trabajo como una salida especial.',
    price: {
      onePair: 70000,
      twoPairs: 110000
    },
    talles: [
      { number: 35, cm: '23 cm de plantilla' },
      { number: 36, cm: '23,5 cm de plantilla' },
      { number: 37, cm: '24 cm de plantilla' },
      { number: 38, cm: '25 cm de plantilla' },
      { number: 39, cm: '25,5 cm de plantilla' },
      { number: 40, cm: '26 cm de plantilla' }
    ]
  }
  // ... completar con los demás productos: London Café, Toscana, Verona, Sydney, Milan
];

export const prices = {
  onePair: 70000,
  twoPairs: 110000,
  discountTransfer: 0.1 // 10%
};
```

### 6. ProductCard.astro
```astro
---
import ProductCarousel from './ProductCarousel.astro';
import SizeSelector from './SizeSelector.astro';
import type { Product } from '../data/productData.ts';

interface Props {
  product: Product;
}

const { product } = Astro.props;
---

<div class="product-item" id={`modelo-${product.id}`}>
  <h2>{product.name}</h2>

  <ProductCarousel
    images={product.images}
    carouselId={`carousel-${product.id}`}
  />

  <div class="product-selection" id={`talles-${product.id}`}>
    <div class="product-info-details">
      <div class="product-specs">
        <span class="spec-item"><strong>Material:</strong> {product.specs.material}</span>
        <span class="spec-item"><strong>Suela:</strong> {product.specs.suela}</span>
        <span class="spec-item"><strong>Altura:</strong> {product.specs.altura}</span>
      </div>
      <p class="product-description">{product.description}</p>
    </div>

    <SizeSelector
      productId={product.id}
      talles={product.talles}
      prices={product.price}
    />
  </div>
</div>

<style>
  .product-item {
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    border: none;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .product-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }

  .product-item h2 {
    font-size: 1.6em;
    padding: 10px 20px 0;
    margin-bottom: 0;
    color: #3a3a3a;
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.5px;
    background-color: #fff;
    line-height: 1;
  }

  .product-selection {
    padding: 20px;
    border-top: none;
    margin-top: 0;
  }

  .product-info-details {
    margin: 5px 0 25px;
    padding: 20px 15px;
    background-color: rgba(250, 248, 245, 0.9);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .product-specs {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px dashed rgba(160, 89, 65, 0.2);
    text-align: center;
  }

  .spec-item {
    font-size: 0.9em;
    color: var(--color-text-light);
  }

  .product-description {
    font-size: 1.05em;
    color: #555;
    text-align: center;
    line-height: 1.6;
    margin: 0;
    padding: 5px 0;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .product-item h2 {
      font-size: 1.4em;
      padding: 8px 10px 0;
    }

    .product-info-details {
      padding: 15px 10px;
      margin: 5px 0 20px;
    }

    .product-specs {
      gap: 8px;
      margin-bottom: 12px;
      padding-bottom: 12px;
    }

    .spec-item {
      font-size: 0.85em;
    }

    .product-description {
      font-size: 1em;
    }
  }
</style>
```

## CONFIGURACIÓN ASTRO REQUERIDA

### astro.config.mjs
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['swiper'],
    },
  },
});
```

### tailwind.config.mjs
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#a05941',
        'primary-dark': '#7a3f2b',
        secondary: '#d68c45',
        accent: '#5a8f3e',
        'text-main': '#3a3a3a',
        'text-light': '#6d6d6d',
        'bg-cream': '#faf7f2',
        'bg-cream-alt': '#f5efe5',
        border: '#f0e9e0'
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'sans-serif']
      },
      borderRadius: {
        'custom': '12px'
      },
      boxShadow: {
        'soft': '0 5px 20px rgba(0, 0, 0, 0.05)',
        'medium': '0 8px 25px rgba(0, 0, 0, 0.08)',
        'strong': '0 12px 30px rgba(0, 0, 0, 0.12)'
      }
    },
  },
  plugins: [],
}
```

## DEPENDENCIAS NECESARIAS

### package.json
```json
{
  "dependencies": {
    "@astrojs/tailwind": "^5.0.0",
    "astro": "^4.0.0",
    "swiper": "^11.0.0",
    "tailwindcss": "^3.0.0"
  },
  "devDependencies": {
    "@types/swiper": "^11.0.0"
  }
}
```

## ESTRUCTURA DE ARCHIVOS FINAL

```
src/
├── components/
│   ├── Header.astro
│   ├── BenefitsBanner.astro
│   ├── PriceCard.astro
│   ├── ProductGrid.astro
│   ├── ProductCard.astro
│   ├── ProductCarousel.astro
│   ├── SizeSelector.astro
│   ├── CheckoutForm.astro
│   └── FloatingCart.astro
├── data/
│   └── productData.ts
├── layouts/
│   └── MainLayout.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css

public/
└── images/
    ├── rosita-form.webp
    ├── roma-negras-1.jpg
    ├── roma-negras-1a.jpg
    └── ... (demás imágenes de productos)
```

---

Este documento proporciona todas las especificaciones técnicas necesarias para replicar exactamente el embudo original en Astro + Tailwind, manteniendo la identidad visual y funcionalidad 1:1.