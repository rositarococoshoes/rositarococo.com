# comotestear.md

Guía oficial de cómo testear cambios antes de producción

Esta guía define el flujo estándar y OBLIGATORIO para validar en forma consistente todos los cambios de código, componentes y funcionalidades del proyecto, usando EXCLUSIVAMENTE el MCP Chrome DevTools (ya disponible) para simular escenarios reales tanto en mobile como en desktop y asegurar que cada embudo en [`rositaastro/`](rositaastro/:1) esté listo para producción.

## Principio clave (muy importante)

- TODOS los testeos estructurados, debug y validaciones visuales/funcionales deben hacerse usando el MCP Chrome DevTools, no con el navegador manual directo.
- Siempre se deben probar:
  - Viewport mobile (prioridad absoluta).
  - Viewport desktop.
- Lo que funcione correctamente en MCP Chrome DevTools es lo que se considera representativo del comportamiento real en producción.

## Objetivo

Garantizar que:
- Los embudos derivados de [`index.html`](index.html:1) y `contrarreembolsonueva.html` migrados a [`rositaastro/`](rositaastro/:1) funcionen sin errores, sin dependencias rotas y con tracking correcto.
- Cada cambio pase por una verificación visual, funcional y técnica en entorno controlado:
  - Usando MCP Chrome DevTools.
  - Usando las URLs locales y finales esperadas.

## Flujo de testeo paso a paso (OBLIGATORIO)

1. Preparar entorno
   - Asegurarse de tener el proyecto actualizado (branch correcto).
   - Levantar el entorno correspondiente:
     - Si es Astro:
       - `cd rositaastro`
       - `npm install` (si hace falta)
       - `npm run dev`
       - URL local base: `http://localhost:4321/`
     - Si se testean landings legacy:
       - Levantar un servidor local simple apuntando al root del repo (no usar `file://`).
   - Confirmar la URL local a utilizar en MCP Chrome DevTools.

2. Iniciar sesión de prueba con MCP Chrome DevTools (SIEMPRE)
   - Lanzar el navegador controlado por MCP apuntando a la URL del embudo a testear:
     - Embudo pago anticipado Astro:
       - Página basada en [`rositaastro/src/pages/index.astro`](rositaastro/src/pages/index.astro:1).
     - Embudo contra reembolso Astro:
       - Página basada en [`rositaastro/src/pages/contrarreembolsonueva.astro`](rositaastro/src/pages/contrarreembolsonueva.astro:1) (cuando exista).
     - Legacy sólo si es necesario comparar o debuguear.
   - Con MCP Chrome DevTools se debe:
     - Obtener capturas de pantalla.
     - Leer logs de consola (errores, warnings).
     - Revisar Network (404, 5xx, CORS, tracking).
     - Repetir los pasos del usuario de forma reproducible.

3. Test en viewport mobile (PRIORIDAD ABSOLUTA)
   - En MCP Chrome DevTools:
     - Configurar viewport móvil (ej: 360x640, 375x667).
   - Validar:
     - Render inicial:
       - Hero, beneficios, productos, minicart, testimonios, formulario.
     - Interacciones:
       - Scroll fluido.
       - Selección de modelos/talles en [`ProductCard.astro`](rositaastro/src/components/ProductCard.astro:1).
       - Actualización del [`MiniCart.astro`](rositaastro/src/components/MiniCart.astro:1).
       - Acceso y uso del [`CheckoutForm.astro`](rositaastro/src/components/CheckoutForm.astro:1).
     - Responsividad:
       - Sin desborde horizontal.
       - CTAs visibles y clickeables.
   - Consola (MCP):
     - Cero errores JS relacionados con Astro, legacy, tracking o assets faltantes.
   - Network (MCP):
     - Sin 404 en CSS/JS/imágenes críticos.

4. Test en viewport desktop
   - En MCP Chrome DevTools:
     - Ajustar viewport a tamaño escritorio (ej: 1366x768 o similar).
   - Repetir:
     - Validación visual (layout limpio, sin solapamientos).
     - Flujo completo de interacción (productos → minicart → formulario).
   - Confirmar:
     - Elementos de confianza visibles (sellos, medios de pago, etc.).
     - Sin diferencias funcionales con mobile (solo cambia el layout).

5. Validación funcional del flujo completo del embudo
   - Para cada embudo (pago anticipado y contra reembolso) usando MCP:
     - Seleccionar producto(s) vía [`ProductCard.astro`](rositaastro/src/components/ProductCard.astro:1).
     - Verificar que el [`MiniCart.astro`](rositaastro/src/components/MiniCart.astro:1) refleja:
       - Productos.
       - Cantidades.
       - Totales.
     - Completar [`CheckoutForm.astro`](rositaastro/src/components/CheckoutForm.astro:1):
       - Campos obligatorios.
       - Validaciones básicas.
       - Opciones de envío/pago (según aplique).
     - En el submit:
       - Sin errores JS en consola (MCP).
       - Requests correctas a formularios externos/webhooks (sin 4xx/5xx críticos).

6. Monitoreo de errores (MCP Chrome DevTools)

   - Consola:
     - Cualquier error o warning recurrente relacionado con:
       - Componentes Astro.
       - Scripts legacy.
       - Tracking.
       - Assets faltantes.
     - Debe considerarse BLOCKER hasta resolverlo.
   - Network:
     - Verificar:
       - Sin 404 críticos.
       - Sin errores CORS en recursos clave.
       - Scripts de tracking cargan correctamente.

7. Verificación de tracking básico
   - Usando MCP Chrome DevTools:
     - Confirmar que scripts de tracking incluidos en [`MainLayout.astro`](rositaastro/src/layouts/MainLayout.astro:1) cargan sin errores.
     - Verificar que los eventos clave no rompen el JS:
       - PageView.
       - ViewContent.
       - AddToCart.
       - InitiateCheckout.
       - Lead/Purchase (según embudo).
   - No es necesario validar negocio interno de la plataforma externa, sí la integridad técnica del front.

8. Re-test después de cambios (OBLIGATORIO)
   - Cada vez que se modifique:
     - [`MainLayout.astro`](rositaastro/src/layouts/MainLayout.astro:1)
     - [`ProductCard.astro`](rositaastro/src/components/ProductCard.astro:1)
     - [`MiniCart.astro`](rositaastro/src/components/MiniCart.astro:1)
     - [`CheckoutForm.astro`](rositaastro/src/components/CheckoutForm.astro:1)
     - [`Testimonials.astro`](rositaastro/src/components/Testimonials.astro:1)
     - [`Header.astro`](rositaastro/src/components/Header.astro:1)
     - [`productData.ts`](rositaastro/src/data/productData.ts:1)
     - Cualquier JS crítico de legacy relacionado con los embudos.
   - Ejecutar de nuevo TODO el flujo:
     - Mobile (MCP) → Desktop (MCP) → Console → Network.
   - Ningún cambio se considera “listo producción” sin pasar este ciclo.

## Principios clave resumidos

- Siempre testear con MCP Chrome DevTools.
- Siempre mobile-first y luego desktop.
- Siempre URLs claras:
  - Local Astro: `http://localhost:4321/` (o ruta específica).
  - Producción esperada: `https://rositarococo.com/rositaastro` cuando el deploy Astro esté bien configurado.
- No se aprueba ningún cambio si:
  - Hay errores JS en consola.
  - Hay 404 en recursos críticos.
  - El formulario no envía correctamente.
  - El minicart no refleja bien la selección.
  - El layout se rompe en mobile o desktop.
