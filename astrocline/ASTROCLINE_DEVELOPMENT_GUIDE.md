# 🔧 **GUÍA PRÁCTICA DE DESARROLLO - /ASTROCLINE**
**Para futuras sesiones:** Contexto completo para editar sin romper + deploy seguro

---

## 🎯 **ESTADO BASE ACTUAL (Referencia Obligatoria)**

### **Commits ESTABLES - No cambiar sin revisión:**
```
ba8cea5 - Fix Embla Carousel TypeError (carouseles funcionando)
67d7848 - Fix logo path references (logo cargando)
1a9cfed - Add complete documentation (documentación creada)
```

### **¿Qué funciona PERFECTAMENTE?**
- ✅ **Carouseles:** Sliding + thumbnails + navegación
- ✅ **Logo:** Cargando en todas las páginas
- ✅ **Carrito:** E-commerce funcional completo
- ✅ **Formularios:** Webhooks activos y funcionando
- ✅ **Producción:** https://rositarococo.com/astrocline/ estable

---

## 🚨 **REGLAS DE ORO - NO ROMPER ESTO**

### **1. ARCHIVOS CRÍTICOS (CUIDADO EXTREMO):**
```
astrocline/js/carousel.js          ❌ NO CAMBIAR CONFIGURACIÓN
astroline/css/unified.css         ❌ NO CAMBIAR ESTILOS CARRUSEL
astrocline/index.html            ❌ NO CAMBIAR ESTRUCTURA HTML
```

### **2. ARCHIVOS PROHIBIDOS:**
```
astrocline/_astro/clean-main.js    ❌ ELIMINADO PERMANENTEMENTE
astroline/app/node_modules/*     ❌ NO MODIFICAR NUNCA
```

### **3. RUTAS FIJAS (No cambiar):**
```javascript
// CDN Dependencies (NO CAMBIAR VERSIONES)
https://cdn.tailwindcss.com
https://unpkg.com/embla-carousel@latest/embla-carousel.umd.js
https://unpkg.com/embla-carousel-autoplay@latest/embla-carousel-autoplay.umd.js

// Logo Path (FIJO)
/astrocline/rosita-form.webp
```

---

## 🛠️ **GUÍA DE EDICIÓN SEGURA**

### **A. Cambios PERMITIDOS (Seguros):**

#### **1. Contenido de Productos:**
```html
<!-- ✅ SEGURO: Precios, descripciones, talles -->
<h2>Guillerminas Negras</h2>
<p>$60.000</p>
<option value="35">35 (23 cm)</option>
```

#### **2. Imágenes (Mantener estructura):**
```html
<!-- ✅ SEGURO: Cambiar src, mantener alt y loading -->
<img class="embla__slide__img" src="NUEVA_IMAGEN.webp"
     alt="Descripción actualizada" loading="lazy">
```

#### **3. Textos y Copy:**
```html
<!-- ✅ SEGURO: Títulos, descripciones, mensajes -->
<h1>Nuevo título principal</h1>
<p>Nueva descripción del producto</p>
```

#### **4. Colores (CSS Custom):**
```css
/* ✅ SEGURO: Variables de color */
.bg-pink-600 { background-color: #nuevo-color; }
.text-pink-800 { color: #nuevo-color-texto; }
```

### **B. Cambios RESTRINGIDOS (Cuidado):**

#### **1. Estructura HTML de Carouseles:**
```html
<!-- ⚠️ CUIDADO: NO CAMBIAR CLASES NI ESTRUCTURA -->
<div class="embla" data-product-id="...">
  <div class="embla__viewport">
    <div class="embla__container">
      <div class="embla__slide"> <!-- MANTENER -->
        <div class="embla__slide__inner"> <!-- MANTENER -->
          <img class="embla__slide__img"> <!-- MANTENER -->
        </div>
      </div>
    </div>
  </div>
</div>
```

#### **2. JavaScript Core:**
```javascript
// ⚠️ CUIDADO: NO CAMBIAR LÓGICA PRINCIPAL
function initializeCarousels() {
  // Configuración EmblaCarousel - MANTENER
  const emblaNode = EmblaCarousel(viewport, {
      align: 'start',
      containScroll: 'keepSnaps',
      dragFree: true,
      loop: false,
      slidesToScroll: 1,
  });
}
```

---

## 🔄 **FLUJO DE TRABAJO SEGURO**

### **Paso 1: Desarrollo Local**
```bash
# Iniciar servidor local SIEMPRE
node -e "const express = require('express'); const path = require('path'); const app = express(); app.use('/astrocline', express.static(path.join(__dirname, 'astrocline'))); app.listen(8000, () => console.log('Servidor corriendo en http://localhost:8000/astrocline'));"

# Probar en: http://localhost:8000/astrocline/
```

### **Paso 2: Verificación CRÍTICA**
```javascript
// Verificar en browser console:
console.log('🎠 Carruseles inicializados: ' + document.querySelectorAll('.embla').length);
console.log('🖼️ Logo cargando: ' + (document.querySelector('img[src*="rosita-form"]') !== null));
```

### **Paso 3: Tests Obligatorios**
- [ ] **Carouseles:** Sliding funciona
- [ ] **Thumbnails:** Click navega entre imágenes
- [ ] **Logo:** Se muestra sin 404
- [ ] **Carrito:** Agregar productos funciona
- [ ] **Formularios:** Validación activa
- [ ] **Responsive:** Mobile/desktop funcionan

### **Paso 4: Deploy Seguro**
```bash
# 1. Agregar SOLO archivos modificados
git add astrocline/index.html  # ej: solo precios
git add astrocline/css/unified.css  # ej: solo colores

# 2. Commit descriptivo
git commit -m "Update product prices and colors

- Modified Guillerminas prices to $65.000
- Updated primary color scheme
- Verified carousel functionality intact
- Tested on local: http://localhost:8000/astrocline/

🤖 Generated with Claude Code"

# 3. Push
git push origin master

# 4. Esperar 2-5 minutos y verificar producción
# https://rositarococo.com/astrocline/
```

---

## 🚨 **SEÑALES DE ALERTA - CUANDO PARAR**

### **Errores que INDICAN RIESGO:**
```javascript
// ❌ ESTOS ERRORES REQUIEREN PARAR Y REVERTIR
TypeError: e is not a function          // carousel.js roto
Cannot read property 'scrollPrev'       // Embla no inicializado
GET http://localhost:8000/rosita-form.webp 404  // Logo roto
Uncaught ReferenceError: EmblaCarousel  // CDN no cargado
```

### **Procedimiento de Emergencia:**
```bash
# 1. Identificar último commit estable
git log --oneline -5

# 2. Revertir si algo se rompió
git reset --hard ba8cea5  # Último estable conocido
git push origin master --force

# 3. Verificar producción
# Esperar 5-10 minutos
# https://rositarococo.com/astrocline/
```

---

## 🎯 **EDITAR COMPONENTES ESPECÍFICOS**

### **1. Editar Producto Existente:**
```html
<!-- Encontrar producto en index.html -->
<div class="product-content">
  <!-- Cambiar título -->
  <h2>Nuevo Nombre del Producto</h2>

  <!-- Cambiar precio -->
  <div class="bg-pink-600 text-white p-2">
    <p class="text-lg font-extrabold">$NUEVO_PRECIO</p>
  </div>

  <!-- Cambiar descripción -->
  <p class="text-gray-700 text-sm">Nueva descripción...</p>
</div>
```

### **2. Agregar Nuevo Producto:**
```html
<!-- Copiar estructura de producto existente -->
<div class="rounded-lg border bg-card text-card-foreground shadow-sm">
  <div class="product-content">
    <h2>Nombre Nuevo Producto</h2>

    <!-- Carousel con nuevas imágenes -->
    <div class="embla" data-product-id="nuevo-producto">
      <div class="embla__viewport">
        <div class="embla__container">
          <div class="embla__slide">
            <div class="embla__slide__inner">
              <img class="embla__slide__img" src="/nuevo-producto/1.webp" alt="...">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### **3. Modificar Carrito:**
```javascript
// En js/carousel.js - Bottom del archivo
const products = {
    'nuevo-producto': {
        name: 'Nuevo Producto',
        price: NUEVO_PRECIO,
        image: '/nuevo-producto/1.webp'
    }
};
```

---

## 📱 **RESPONSIVE - NO ROMPER MOBILE**

### **CSS Classes Mobile-First que FUNCIONAN:**
```html
<!-- ✅ SEGURO: Estas clases ya están configuradas -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div class="text-center py-4">
<img class="mx-auto h-16">
<button class="w-full bg-pink-600 text-white py-3">
```

### **Media Queries Custom (en unified.css):**
```css
/* ✅ SEGURO: Agregar modificaciones respetando mobile-first */
@media (min-width: 768px) {
  .product-grid {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .product-grid {
    max-width: 1200px;
  }
}
```

---

## 🔧 **DEBUG RÁPIDO**

### **Verificar Estado Actual:**
```javascript
// Pegar en console del browser
function checkAstroclineStatus() {
    console.log('🎯 Estado Astrocline:');
    console.log('✅ Carouseles:', document.querySelectorAll('.embla').length);
    console.log('✅ Logo:', !!document.querySelector('img[src*="rosita-form"]'));
    console.log('✅ EmblaCarousel:', typeof EmblaCarousel !== 'undefined');
    console.log('✅ CSS Tailwind:', !!document.querySelector('script[src*="tailwindcss"]'));
    console.log('✅ Products:', window.products ? Object.keys(window.products).length : 'No cargado');
}

checkAstroclineStatus();
```

### **Fixes Comunes Rápidos:**
```bash
# Si el logo no carga:
grep -r "src=\"/rosita-form\.webp\"" astrocline/ --include="*.html"

# Si carouseles no funcionan:
grep -r "EmblaCarouselAutoplay" astrocline/ --include="*.js"

# Si hay errores de CSS:
grep -r "tailwind" astrocline/css/
```

---

## 🚀 **CHECKLIST FINAL ANTES DE PUSH**

### **✅ Verificación Visual:**
- [ ] Homepage carga correctamente
- [ ] Logo visible en header
- [ ] Todos los productos muestran imágenes
- [ ] Carouseles funcionan con swipe
- [ ] Thumbnails responden al click
- [ ] Botones "Agregar al Carrito" funcionan
- [ ] Carrito se abre/cierra correctamente

### **✅ Verificación Técnica:**
- [ ] Console sin errores JavaScript
- [ ] Network sin requests 404
- [ ] Mobile responsive (Chrome DevTools)
- [ ] Performance < 3s load time
- [ ] SEO meta tags presentes

### **✅ Verificación Producción:**
- [ ] URL: https://rositarococo.com/astrocline/ funciona
- [ ] Mismos cambios que en local
- [ ] Formularios submit correctamente
- [ ] Facebook Pixel events activos

---

## 📞 **REFERENCIA RÁPIDA**

### **Comandos Útiles:**
```bash
# Estado actual
git status

# Ver cambios
git diff astrocline/index.html

# Revertir archivo específico
git checkout -- astrocline/index.html

# Ver commits estables
git log --oneline -10

# Forzar deploy limpio
git commit --allow-empty -m "Force GitHub Pages rebuild"
git push origin master
```

### **URLs Importantes:**
- **Local:** http://localhost:8000/astrocline/
- **Producción:** https://rositarococo.com/astrocline/
- **Documentation:** astrocline/ASTROCLINE_COMPLETE_DOCUMENTATION.md

### **Ver en Producción:**
```bash
# Ver estado último deploy
git log --oneline -1

# Si algo falla, volver a estable:
git reset --hard 67d7848  # Logo fix
git push origin master --force
```

---

**🎯 CONSEJO FINAL:** Siempre testea LOCAL primero, luego VERIFICA producción. Cuando dudes, CONSULTA la documentación completa antes de hacer cambios.