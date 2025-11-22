# Prompt para Claude Sonnet 4.5 — Parches Exactos (AXObjectRoles + Carrito Guillerminas Negras)

Actúa como: senior front-end engineer + Astro/Vite expert + accessibility tooling expert.

Objetivo (estado ACTUAL, real):

Tienes un proyecto Astro real con múltiples iteraciones previas. Varias mejoras ya fueron aplicadas (wrapper de a11y, refuerzos CSS, estructura del carrito), pero persisten dos problemas críticos:

1) Error en consola relacionado con `AXObjectRoles`:
   - Un `a11y.js` sigue intentando importar `AXObjectRoles` directamente desde `axobject-query/lib/index.js`.
   - El navegador muestra un error de módulo ESM en tiempo de ejecución.

2) Problema visual en el carrito flotante del componente [`CarruselGuillerminasNegras.astro`](rositaastro/src/components/CarruselGuillerminasNegras.astro:1):
   - La “X” (`.remove-item-btn`) destinada a eliminar ítems del carrito:
     - Debería estar fija en la esquina superior derecha de cada `.cart-item`.
     - En el runtime real sigue apareciendo mal posicionada (abajo/izquierda o mezclada con el contenido), a pesar de tener reglas específicas y `position: absolute; top: 4px; right: 4px` con alta especificidad.

Tu tarea: Analizar el código REAL incluido abajo y devolver diffs/paches concretos que:
- Corrijan definitivamente el error `AXObjectRoles`.
- Garanticen la posición correcta de la “X” en el carrito flotante, sin hacks JS innecesarios y respetando el scoping de estilos de Astro.

El prompt es autocontenido. No hay referencias a herramientas internas. Usa únicamente la información y rutas provistas aquí.

---

## 1. Contexto del proyecto

- Proyecto Astro principal: [`rositaastro/`](rositaastro/:1)
- Ruta de test actual: `http://localhost:4335/test-carrusel`
- Componente clave: [`rositaastro/src/components/CarruselGuillerminasNegras.astro`](rositaastro/src/components/CarruselGuillerminasNegras.astro:1)

Este componente:

- Renderiza:
  - Carrusel Swiper para Guillerminas Negras.
  - Carrito flotante con:
    - `#floating-cart`
    - `#cart-items`
    - Totales y promo 2 pares x $95.000
    - Botón “🛒 Finalizar Compra”
    - Botón flotante `#floating-cart-btn` (fijo abajo derecha con items).
- Define en `<script>`:
  - `window.addToCartSimplificado`
  - `window.updateCart`
  - `window.removeFromCart`
  - `window.toggleCart`
  - `window.forceCartImageSizes`
  - `window.showNotification`
  - `window.goToCheckout`
  - `window.clearCart`
  - `window.showModal` / `window.closeModal`
- Incluye CSS scoped para:
  - `.floating-cart`
  - `#cart-items`
  - `.cart-item`
  - `.cart-item-thumbnail`
  - `.cart-item-details`
  - `.cart-item-image`
  - `.remove-item-btn`
  - Incluyendo un bloque de “corrección final” con `#floating-cart #cart-items .cart-item .remove-item-btn { ... !important }`.

Aun así:
- El error de `AXObjectRoles` persiste.
- La “X” del carrito no se mantiene en top-right como corresponde.

---

## 2. Código REAL relevante

### 2.1 Wrapper de accesibilidad actual (correcto pero no aprovechado por el a11y.js problemático)

Archivo: [`rositaastro/src/lib/a11y.js`](rositaastro/src/lib/a11y.js:1)

```js
/**
 * Capa local de compatibilidad para AXObjectRoles.
 *
 * Importante:
 * - Ningún código debe importar directamente desde 'axobject-query'.
 * - Cualquier módulo que necesite AXObjectRoles debe importar desde este archivo.
 *
 * Ejemplo correcto:
 *   import { AXObjectRoles } from './lib/a11y.js';
 */

import { AXObjects } from 'axobject-query';

const AXObjectRoles = new Map();

for (const [axObjectName, axObjectDef] of AXObjects.entries()) {
  if (!axObjectDef || !Array.isArray(axObjectDef.relatedConcepts)) continue;

  for (const concept of axObjectDef.relatedConcepts) {
    if (
      concept &&
      concept.module === 'ARIA' &&
      concept.concept &&
      typeof concept.concept.name === 'string'
    ) {
      const roleName = concept.concept.name;
      if (!AXObjectRoles.has(roleName)) {
        AXObjectRoles.set(roleName, []);
      }
      AXObjectRoles.get(roleName).push(axObjectName);
    }
  }
}

export { AXObjectRoles };
```

Este archivo es la implementación local deseada.
El problema es que el `a11y.js` que genera el error NO está usando este wrapper.

---

### 2.2 a11y.js que genera el error (estado real del problema)

Error exacto observado en consola (estado actual):

```text
a11y.js:26 Uncaught (in promise) SyntaxError: The requested module '/@fs/C:/Users/.../rositaastro/node_modules/axobject-query/lib/index.js?v=f5fe4032' does not provide an export named 'AXObjectRoles'
```

Puntos clave:

- El error viene de un archivo llamado `a11y.js` que:
  - Se carga en el navegador en contexto Astro/Vite.
  - Intenta hacer algo equivalente a:
    `import { AXObjectRoles } from 'axobject-query/lib/index.js';`
- La versión actual de `axobject-query` en `node_modules`:
  - No exporta `AXObjectRoles` como named export de `lib/index.js`.
  - Por eso el import falla y Vite lanza el error ESM.
- El wrapper `src/lib/a11y.js` existe, pero:
  - No está siendo utilizado por este `a11y.js` problemático.
- Además, se observa en `node_modules/astro/dist/runtime/client/dev-toolbar/apps/audit/rules/index.js`:
  - `import { a11y } from "./a11y.js";`
  - Lo que indica que el tooling de Astro (dev-toolbar / audit) está involucrado.

Tu responsabilidad:

- Asumir que existe un `a11y.js` concreto (en tooling o en raíz del proyecto) que debe ser modificado.
- Proponer el patch exacto para ese archivo:
  - Reemplazar el import roto desde `axobject-query/lib/index.js`.
  - Usar:
    - O bien el wrapper local `src/lib/a11y.js`.
    - O la forma correcta de importar desde `axobject-query` según su API real.
  - Ajustar la ruta relativa en función de que este `a11y.js` viva, por ejemplo, en la raíz de `rositaastro/` (caso típico):
    - `import { AXObjectRoles } from './src/lib/a11y.js';`
- Debes entregar un diff claro y aplicable sobre ese `a11y.js` que sigue rompiendo.

---

### 2.3 Fragmentos relevantes de CarruselGuillerminasNegras.astro

Archivo: [`rositaastro/src/components/CarruselGuillerminasNegras.astro`](rositaastro/src/components/CarruselGuillerminasNegras.astro:1)

A continuación, solo las partes necesarias para tu análisis del carrito.

#### 2.3.1 HTML del carrito flotante y botón flotante

```html
<!-- Carrito Flotante -->
<div class="floating-cart" id="floating-cart" style="display: none;">
  <div class="cart-header">
    <h4>Tu Carrito</h4>
    <button class="cart-close" onclick="toggleCart()">&times;</button>
  </div>
  <div class="cart-content">
    <div id="cart-items"></div>

    <!-- Bloque de totales prominente -->
    <div class="cart-total">
      <div id="cart-total-main">
        <strong>Total: $<span id="cart-total">0</span></strong>
      </div>
      <div id="cart-promo-message" class="cart-promo-message" style="display: none;">
        Total 2 pares: <strong>$95.000</strong> <span class="promo-label">(promo aplicada)</span>
      </div>
    </div>

    <div class="cart-actions">
      <button class="checkout-btn" onclick="goToCheckout()">
        🛒 Finalizar Compra
      </button>
    </div>
  </div>
</div>

<!-- Botón Flotante del Carrito (siempre fijo abajo derecha cuando hay items) -->
<button class="floating-cart-btn" id="floating-cart-btn" onclick="toggleCart()" style="display: none;">
  🛒
  <span class="cart-count" id="cart-count">0</span>
</button>
```

#### 2.3.2 JS relevante — window.updateCart (versión actual usada en runtime)

Dentro del `<script>` de `CarruselGuillerminasNegras.astro`:

```js
if (typeof window !== 'undefined') {
  window.cartGuillerminas = window.cartGuillerminas || [];
  window.cartTotal = window.cartTotal || 0;

  // Agregar al carrito simplificado (versión actual)
  window.addToCartSimplificado = function(productId) {
    console.log('🛒 Agregar al carrito simplificado:', productId);

    const talleSelect = document.getElementById('talle-select-' + productId + '-unificado');
    if (!talleSelect) {
      console.log('❌ Selector de talle unificado no encontrado:', productId);
      showModal('Error', 'No se pudo encontrar el selector de talle. Por favor, recarga la página.');
      return;
    }

    const selectedTalle = talleSelect.value;
    if (!selectedTalle) {
      console.log('❌ No se seleccionó talle');
      showModal('Talle requerido', 'Por favor selecciona tu talle antes de agregar al carrito.');
      return;
    }

    const currentPairs = window.cartGuillerminas.reduce((total, item) => total + item.quantity, 0);
    if (currentPairs >= 2) {
      console.log('❌ Límite excedido:', currentPairs, '>= 2');
      showModal(
        'Límite alcanzado',
        '⚠️ Límite máximo: 2 pares por compra.\nYa tienes 2 pares en el carrito. Para agregar más, primero elimina un par del carrito.'
      );
      return;
    }

    const productName = 'Guillerminas Negras';
    let price, quantity;

    if (currentPairs === 0) {
      quantity = 1;
      price = 60000;
      showNotification(`${productName} (1 par) agregado. ¡Agrega otro par y aprovecha la oferta!`);
      const mensajeIncentivador = document.getElementById('mensaje-incentivador');
      if (mensajeIncentivador) {
        mensajeIncentivador.style.display = 'block';
      }
    } else {
      quantity = 1;
      price = 35000;
      if (window.cartGuillerminas.length > 0) {
        window.cartGuillerminas[0].price = 60000;
      }
      showNotification(`¡Oferta aplicada! ${productName} (2° par) agregado. Total: 2 pares por $95.000`);
      const mensajeIncentivador = document.getElementById('mensaje-incentivador');
      if (mensajeIncentivador) {
        mensajeIncentivador.style.display = 'none';
      }
    }

    const cartItem = {
      id: productId + '-' + Date.now(),
      product: productName,
      talle: selectedTalle,
      price: price,
      quantity: quantity
    };

    window.cartGuillerminas.push(cartItem);
    console.log('✅ Item agregado:', cartItem);

    updateCart();

    const floatingCart = document.getElementById('floating-cart');
    const floatingCartBtn = document.getElementById('floating-cart-btn');
    if (floatingCart && floatingCartBtn && window.cartGuillerminas.length > 0) {
      floatingCart.style.display = 'block';
      floatingCart.dataset.open = 'true';
      floatingCartBtn.style.display = 'flex';
    }

    talleSelect.value = '';
  };

  // Actualizar carrito (versión actual)
  window.updateCart = function() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartPromoMessage = document.getElementById('cart-promo-message');
    const floatingCart = document.getElementById('floating-cart');
    const floatingCartBtn = document.getElementById('floating-cart-btn');

    if (!cartCount || !cartItems || !cartTotalElement || !floatingCart || !floatingCartBtn) {
      console.log('❌ Elementos del carrito no encontrados');
      return;
    }

    const totalPairs = window.cartGuillerminas.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalPairs;

    window.cartTotal = window.cartGuillerminas.reduce((total, item) => total + item.price, 0);
    cartTotalElement.textContent = window.cartTotal.toLocaleString();

    if (window.cartGuillerminas.length > 0) {
      floatingCartBtn.style.display = 'flex';
      floatingCartBtn.style.position = 'fixed';
      floatingCartBtn.style.bottom = '20px';
      floatingCartBtn.style.right = '20px';

      if (floatingCart.dataset.open === 'true') {
        floatingCart.style.display = 'block';
      } else {
        floatingCart.style.display = 'none';
      }

      // Render items del carrito con thumbnail fijo
      cartItems.innerHTML = window.cartGuillerminas
        .map((item, index) => {
          const talleLabel = item.talle.split('-')[0];
          return `
            <div class="cart-item">
              <div class="cart-item-thumbnail" style="width:40px;height:40px;min-width:40px;min-height:40px;max-width:40px;max-height:40px;overflow:hidden;border-radius:4px;display:flex;align-items:center;justify-content:center;background:#f8f8f8;flex-shrink:0;">
                <img
                  src="/images/productos/guillerminas/negras/1.webp"
                  alt="${item.product} - Thumbnail"
                  loading="lazy"
                  class="cart-item-image"
                  style="width:40px;height:40px;max-width:40px;max-height:40px;min-width:40px;min-height:40px;object-fit:cover;object-position:center;display:block;flex-shrink:0;"
                  onerror="this.src='/images/productos/guillerminas/negras/1.webp'"
                />
              </div>
              <div class="cart-item-details">
                <div class="cart-item-title">${item.product}</div>
                <div class="cart-item-meta">
                  <span class="cart-item-size">Talle: ${talleLabel}</span>
                  <span class="cart-item-pair">Par ${index + 1}</span>
                </div>
                <div class="cart-item-price">
                  $${item.price.toLocaleString()}
                </div>
              </div>
              <button
                class="remove-item-btn"
                onclick="removeFromCart('${item.id}')"
                title="Eliminar este par"
              >
                ✕
              </button>
            </div>
          `;
        })
        .join('');

      if (cartPromoMessage) {
        if (totalPairs === 2 && window.cartTotal === 95000) {
          cartPromoMessage.style.display = 'block';
        } else {
          cartPromoMessage.style.display = 'none';
        }
      }

      setTimeout(() => {
        window.forceCartImageSizes();
      }, 50);

      console.log(
        '✅ Carrito actualizado:',
        window.cartGuillerminas.length,
        'items, Total:',
        window.cartTotal
      );
    } else {
      floatingCart.style.display = 'none';
      floatingCartBtn.style.display = 'none';

      if (cartPromoMessage) {
        cartPromoMessage.style.display = 'none';
      }

      console.log('📦 Carrito vacío');
    }
  };

  // (El mismo script define removeFromCart, clearCart, showModal, closeModal, etc.)
}
```

#### 2.3.3 CSS relevante — carrito, items y botón X

Del `<style>` de `CarruselGuillerminasNegras.astro` (extracto relevante):

```css
/* Carrito flotante */
.floating-cart {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  max-width: calc(100vw - 40px);
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

/* Items */
.cart-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 8px 6px 8px 6px;
  border-bottom: 1px solid #e0e0e0;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-details {
  flex: 1;
  margin-left: 6px;
  padding-right: 28px; /* espacio para la X */
}

/* Botón X base */
.remove-item-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #f44336;
  color: #fff;
  border: none;
  font-size: 12px;
  padding: 2px 6px;
  min-width: 20px;
  height: 20px;
  line-height: 1;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-item-btn:hover {
  background: #d32f2f;
  transform: scale(1.05);
  box-shadow: 0 2px 4px rgba(244, 67, 54, 0.3);
}

.remove-item-btn:active {
  transform: scale(0.95);
}

/* Corrección final específica (alta especificidad) */
#floating-cart #cart-items .cart-item {
  position: relative !important;
  display: flex !important;
  align-items: flex-start !important;
  padding: 8px 6px 8px 6px !important;
  border-bottom: 1px solid #e0e0e0 !important;
}

#floating-cart #cart-items .cart-item:last-child {
  border-bottom: none !important;
}

#floating-cart #cart-items .cart-item .cart-item-details {
  flex: 1 !important;
  margin-left: 6px !important;
  padding-right: 40px !important;
  min-width: 0 !important;
  overflow: hidden !important;
}

/* Forzar botón X arriba-derecha dentro del ítem */
#floating-cart #cart-items .cart-item .remove-item-btn {
  position: absolute !important;
  top: 4px !important;
  right: 4px !important;
  z-index: 20 !important;

  margin: 0 !important;
  padding: 2px 6px !important;
  border: none !important;

  background: #f44336 !important;
  color: #fff !important;
  font-size: 12px !important;
  line-height: 1 !important;
  border-radius: 4px !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 20px !important;
  height: 20px !important;

  cursor: pointer !important;

  float: none !important;
  clear: none !important;
  transform: none !important;
  box-sizing: border-box !important;
}

#floating-cart #cart-items .cart-item .remove-item-btn:hover {
  background: #d32f2f !important;
  transform: scale(1.05) !important;
  box-shadow: 0 2px 4px rgba(244, 67, 54, 0.3) !important;
}

#floating-cart #cart-items .cart-item .remove-item-btn:active {
  transform: scale(0.95) !important;
}
```

A pesar de estas reglas, en el render real:

- `.cart-item` sí es `position: relative`.
- `.remove-item-btn` tiene las propiedades absolutas esperadas.
- Pero la “X” sigue viéndose alineada hacia abajo/izquierda o desplazada, como si:
  - Alguna regla global de `button`/layout sobrescribiera `position`, `display` o `padding`.
  - O existiera alguna interacción con estilos heredados (por ejemplo, `display: block`, `width: 100%`, etc.) que afectan su caja.

Tu trabajo es detectar por qué, con este HTML+CSS, puede seguir ocurriendo eso y proponer el fix mínimo y seguro.

---

## 3. Problemas actuales observados (estado REAL tras aplicar fixes)

### 3.1 Error AXObjectRoles / a11y.js

Texto exacto de consola (forma real observada):

```text
a11y.js:26 Uncaught (in promise) SyntaxError: The requested module '/@fs/C:/Users/.../rositaastro/node_modules/axobject-query/lib/index.js?v=f5fe4032' does not provide an export named 'AXObjectRoles'
```

Hechos:

- Existe un `a11y.js` (no el de `src/lib/a11y.js`) que:
  - Se ejecuta en el navegador.
  - Importa directamente desde `axobject-query/lib/index.js`.
  - Espera un named export `AXObjectRoles` que ya no existe.
- El wrapper correcto (`src/lib/a11y.js`) no está siendo usado por ese archivo.
- Resultado:
  - Aunque el wrapper está bien implementado, el browser sigue cargando el `a11y.js` incorrecto y generando el error.

Lo que necesitas definir con precisión:

- Cómo modificar exactamente ese `a11y.js` problemático para:
  - Dejar de importar `AXObjectRoles` desde `axobject-query/lib/index.js`.
  - En su lugar:
    - Importar `AXObjectRoles` desde el wrapper local (`./src/lib/a11y.js`) si el archivo vive en la raíz del proyecto Astro.
    - O usar la API correcta de `axobject-query` para construir `AXObjectRoles`, de forma equivalente al wrapper.
- Debes asumir un escenario concreto y devolver el patch como diff:
  - Por ejemplo, si el archivo que rompe está en `rositaastro/a11y.js` o en otro punto raíz del proyecto, el import correcto sería:
    ```js
    import { AXObjectRoles } from './src/lib/a11y.js';
    ```
  - Ajusta el diff en consecuencia.

### 3.2 Posición de la “X” (`.remove-item-btn`) en el carrito flotante

Situación real:

- En el código:
  - `.cart-item` es `position: relative`.
  - `.remove-item-btn` tiene `position: absolute; top: 4px; right: 4px` con alta especificidad.
- En runtime (dev server Astro con estilos globales y del layout):
  - La “X” aparece:
    - Debajo del contenido textual, alineada a la izquierda o desfasada.
    - No queda firmemente en top-right de cada `.cart-item`.

Lo que debes hacer:

- Analizar el HTML + CSS provisto (carrito renderizado por `updateCart`) y considerar:
  - Posibles reglas globales de `button`, `*`, etc. que:
    - Cambien `display`, `position`, `margin`, `padding` o `width`.
  - Interacción con estilos scoped de Astro vs globales:
    - Si `.remove-item-btn` está dentro de un `<style>` scoped, pero hay reglas globales fuera que se aplican con más prioridad.
  - El hecho de que `cartItems.innerHTML = ...` genera markup plano donde:
    - `.remove-item-btn` es hijo directo de `.cart-item`.
    - Pero la cascada puede aplicar estilos inesperados.

Debes:

- Identificar la causa más probable basándote en este contexto (por ejemplo: botones globales con `display: block; width: 100%`, etc.).
- Proponer un patch CSS/HTML mínimo que:
  - Blinde la posición:
    - Forzando, si es necesario, una clase extra o mayor especificidad.
    - Asegurando que `.cart-item` sea el contenedor de posicionamiento.
    - Evitando que reglas globales de `button` lo rompan.
  - Evite cambios globales peligrosos.
  - Sea compatible con el scoping de Astro (`<style>` del componente) y/o uso de `:global`.

---

## 4. Tu tarea (Claude Sonnet 4.5)

Basado exclusivamente en el código REAL anterior:

1) Parchar el `a11y.js` que importa mal `AXObjectRoles`:

   - Identifica la causa precisa del error:
     - Diferencia entre lo que exporta realmente `axobject-query` y lo que intenta importar el `a11y.js` problemático.
   - Escribe el patch exacto para ese archivo `a11y.js`:
     - Reemplazando el import roto desde `axobject-query/lib/index.js`.
     - Usando el wrapper local `src/lib/a11y.js` o la API correcta de `axobject-query`.
     - Incluye la ruta relativa concreta en el snippet (por ejemplo, `./src/lib/a11y.js` para un `a11y.js` ubicado en `rositaastro/`).
   - Devuelve el diff listo para aplicar (bloques de código concretos).

2) Diagnosticar por qué `.remove-item-btn` sigue mal posicionada:

   - A partir del HTML+CSS proporcionado:
     - Explica qué tipos de reglas globales (sobre `button`, `.floating-cart`, `.cart-item`, etc.) podrían seguir ganando a pesar del bloque específico.
     - Considera:
       - Estilos globales de botones que establezcan `display: block; width: 100%;` u otras propiedades.
       - Conflictos de scoping en Astro (estilos scoped vs globales).
       - Interacciones con el inline style generado por `innerHTML`.
   - Debes indicar con claridad cuál es el escenario más probable y cómo confirmarlo solo con CSS/estructura (sin pedir nuevas capturas ni info externa).

3) Proponer un patch concreto (HTML/CSS) mínimo y seguro que:

   - Garantice que la “X”:
     - Sea siempre `position: absolute` dentro de cada `.cart-item`.
     - Quede fija en la esquina superior derecha de todos los ítems del carrito flotante.
   - No rompa el layout del resto del contenido:
     - Miniatura izquierda.
     - Texto (talle, “Par X”, precio).
     - Botón “🛒 Finalizar Compra”.
   - Sea compatible con Astro:
     - Puedes usar:
       - Selectores con `:global(...)` si hace falta para asegurar que las reglas se apliquen al HTML generado por `innerHTML`.
       - Una clase extra específica para el botón X (por ejemplo `.cart-item-remove`) si eso simplifica el posicionamiento.
     - Describe el diff de forma que pueda pegarse directamente en:
       - El `<style>` de `CarruselGuillerminasNegras.astro`.
       - Y, si corresponde, en el markup generado en `updateCart`.

Formato esperado de tu respuesta:

- Entregar:
  1. Diagnóstico técnico conciso para:
     - Error `AXObjectRoles` / `a11y.js`.
     - Posicionamiento de `.remove-item-btn`.
  2. Parches de código:
     - Diff exacto para el `a11y.js` que hoy sigue importando mal `AXObjectRoles`.
     - Diff exacto (HTML/CSS) para:
       - El template generado en `updateCart` (si agregas clase/estructura).
       - El bloque de estilos en `CarruselGuillerminasNegras.astro` (incluyendo `:global` si aplica).
- Todos los parches deben ser autocontenidos y aplicables en este proyecto Astro, sin depender de herramientas ni configuraciones externas.