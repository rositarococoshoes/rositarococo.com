# ANÁLISIS COMPLETO - EMBUDO ORIGINAL DE PREVIO PAGO
## Archivo de Referencia: otono-elegante.html

---

## 1. ESTRUCTURA GENERAL DEL EM BUDO

### Header Principal
- **Logo**: `rosita-form.webp` centrado
- **Título Principal**: "🍂 Colección Otoño-Invierno 2025 🍂"
- **Subtítulo**: "Diseños exclusivos que abrazan tus pasos con estilo y confort"
- **Badge Temporada**: "NUEVA TEMPORADA" (badge naranja)
- **Gradiente de fondo**: Crema con patrón sutil SVG

### Banner de Beneficios Destacados
- **Diseño**: Gradiente marrón con 2 columnas
- **Beneficio 1**: "🚚 ENVÍO GRATIS a todo el país"
- **Beneficio 2**: "💳 3 CUOTAS SIN INTERÉS con todas las tarjetas"
- **Icons**: Fondos blancos circulares con emojis

### Sección de Precios
- **Tarjeta de precios**: fondo blanco con bordes redondeados
- **Opción 1 par**: "$70.000"
- **Opción 2 pares**: "$110.000" (destacada como mejor opción)
- **Descuento adicional**: "10% OFF EXTRA pagando por Transferencia"

### Productos Identificados
1. **Botineta Roma Negras** - 7 imágenes
2. **Botineta Roma Suela** - 4 imágenes
3. **Borcego Siena 2025** - 2 imágenes
4. **Venecia Negras** - 4 imágenes
5. **London Café** - continua...
6. **Toscana** - continua...
7. **Verona** - continua...
8. **Sydney** - continua...
9. **Milan** - continua...

---

## 2. PALETA DE COLORES EXACTA (CSS Variables)

```css
:root {
  --color-primary: #a05941;        /* Marrón rojizo principal */
  --color-primary-dark: #7a3f2b;   /* Marrón rojizo oscuro */
  --color-secondary: #d68c45;      /* Naranja tostado */
  --color-accent: #5a8f3e;         /* Verde oliva */
  --color-text: #3a3a3a;           /* Gris oscuro */
  --color-text-light: #6d6d6d;     /* Gris medio */
  --color-background: #faf7f2;     /* Crema claro */
  --color-background-alt: #f5efe5; /* Crema más oscuro */
  --color-border: #f0e9e0;         /* Borde suave */
}
```

---

## 3. TIPOGRAFÍA EXACTA

### Fonts
- **Principal**: 'Playfair Display', serif (títulos)
- **Secundaria**: 'Lato', sans-serif (párrafos y texto)
- **Google Fonts**: Preload con ambas tipografías

### Jerarquía Típográfica
- **H1 Principal**: 2.6em, weight: 700, color: var(--color-primary)
- **H2 Productos**: 1.6em, weight: 700, centrado
- **Subtítulos**: 1.3em, weight: 400, italic
- **Textos descriptivos**: 1.05em, italic, centrados

---

## 4. LAYOUT Y GRID SYSTEM

### Container Principal
- **Max-width**: 1140px
- **Padding**: 0 20px
- **Centrado**: margin: 0 auto

### Product Grid
- **Desktop**: grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))
- **Gap**: 35px entre productos
- **Tablet**: minmax(280px, 1fr) con gap de 25px
- **Mobile**: 1 columna con gap de 25px

### Product Item Structure
```css
.product-item {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
```

---

## 5. COMPONENTES VISUALES DETALLADOS

### Carousel de Imágenes
- **Tipo**: Simple carousel con navegación manual
- **Controles**: Botones circulares blancos (< y >)
- **Indicadores**: Puntos circulres abajo de las imágenes
- **Transición**: transform 0.5s ease
- **Imágenes**: max-height específico para cada breakpoint

### Tarjeta de Precios
```css
.price-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
```

### Best Value Badge
- **Texto**: "¡Mejor opción!"
- **Posición**: Absoluta arriba del centro
- **Estilo**: Fondo var(--color-primary), texto blanco, bordes redondeados

### Selección de Talles
- **Radio buttons**: Cantidad (1 par / 2 pares)
- **Select dropdown**: Talles del 35 al 40 con medidas en cm
- **Doble selección**: Permite elegir 2 pares con talles diferentes

---

## 6. FORMULARIO DE CONTACTO Y ENVÍO

### Sección Oculta (display: none)
- **ID**: #restodelform
- **Disparador**: Cuando se seleccionan productos
- **Scroll smooth**: Hacia #datos-envio

### Campos del Formulario
1. **Email**: required, type="email"
2. **Nombre y Apellido**: required, placeholder descriptivo
3. **WhatsApp**: required, placeholder con formato
4. **Dirección**: Calle, Número, Piso/Dpto
5. **Código Postal**: required
6. **Localidad**: required
7. **Provincia**: dropdown con todas las provincias
8. **DNI**: required
9. **Forma de Pago**: Tarjeta / MercadoPago / Transferencia

### Integración con Google Forms
- **Action**: URL específica de Google Forms
- **Hidden fields**: Para tracking y campos adicionales
- **Botón submit**: "Confirmar y Pagar 🛒"

---

## 7. ELEMENTOS INTERACTIVOS

### Floating Cart Summary
- **Posición**: Fixed (posición fija)
- **Contenido**: "TU SELECCIÓN: ..." y resumen de precios
- **Botón**: "Completar Datos ↓" (visible solo con productos)

### WhatsApp Widget
- **Display**: None por defecto
- **Teléfono**: 5491127595502
- **Texto predefinido**: "Quiero consultar por el calzado"

### Loading Overlay
- **Spinner**: Animación de carga
- **Mensaje**: "Estamos preparando tu pago seguro..."
- **Background**: Semi-transparente

---

## 8. RESPONSIVE DESIGN BREAKPOINTS

### Desktop (>1200px)
- Product grid: minmax(320px, 1fr)
- H1: 2.6em

### Tablet (992px - 1200px)
- Product grid: minmax(280px, 1fr)
- H1: 2.2em

### Mobile (<768px)
- Product grid: 1 columna
- Benefits banner: Vertical
- H1: 2em

### Small Mobile (<480px)
- Precios: Layout vertical completo
- Reducción de padding y márgenes

---

## 9. JAVASCRIPT FUNCTIONALITY

### Carousels
- **Archivo**: simple-carousel.js
- **Función**: Navegación manual con botones e indicadores

### Form Processing
- **Archivo**: otono-elegante.js
- **Features**: Validación, cálculo de totales, redirección de pago

### Google Forms Integration
- **jQuery**: Para procesamiento de formularios
- **Ajax**: Para envío sin recargar página

---

## 10. ARCHIVOS Y DEPENDENCIAS

### CSS Files
- `otono-elegante.css` - Estilos principales
- `carousel-fix.css` - Fixes para carruseles

### JavaScript Files
- `simple-carousel.js` - Lógica de carruseles
- `otono-elegante.js` - Funcionalidad principal
- jQuery 3.6.0
- jQuery Form 4.3.0
- jQuery UI 1.12.1

### External Dependencies
- Swiper Carousel CSS (v10)
- Google Fonts: Playfair Display + Lato
- Facebook Pixel tracking

### Images (referenciadas)
- `rosita-form.webp` - Logo principal
- `roma-negras-1.jpg` a `roma-negras-5a.jpg`
- `roma-suela-1a.jpg` a `roma-suela-2.jpg`
- `siena2025-1.webp` a `siena2025-2.webp`
- `venecia-negras-1a.jpg` a `venecia-negras-4a.jpg`
- [Y otras imágenes de productos...]

---

## 11. ESPECIFICACIONES PARA REPLICA EN ASTRO

### Component Structure (Astro + Tailwind)
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
├── layouts/
│   └── MainLayout.astro
└── pages/
    └── index.astro
```

### Tailwind Configuration Requirements
```javascript
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
  }
}
```

### State Management
- **Carrito**: Context API o Zustand
- **Form validation**: React Hook Form + Zod
- **Image carousel**: Swiper.js (compatible con Astro)

---

## 12. PASOS SIGUIENTES PARA IMPLEMENTACIÓN

1. **Capturar screenshots** del diseño original para referencia visual
2. **Analizar componentes visuales** con IA para detectar detalles sutiles
3. **Configurar proyecto Astro** con Tailwind + dependencias
4. **Crear componentes base** replicando estilos exactos
5. **Implementar funcionalidad** de carrito y formularios
6. **Testing responsive** en todos los breakpoints
7. **Validación final** contra diseño original

---

### Archivo Original Analizado: `C:\Users\sflic\Documents\GitHub\rositarococo.com\otono-elegante.html`
### CSS Original: `C:\Users\sflic\Documents\GitHub\rositarococo.com\otono-elegante.css`
### Fecha del Análisis: 11 de Noviembre 2025

Este documento servirá como blueprint exacto para la réplica 1:1 en Astro + Tailwind.