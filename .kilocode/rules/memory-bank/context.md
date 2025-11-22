# context.md

## Estado actual del proyecto

- El repositorio contiene:
  - Landings legacy estáticas en la raíz (por ejemplo [`index.html`](index.html:1) y múltiples variantes de contra reembolso).
  - Carpeta [`rositaastro/`](rositaastro/:1) con un proyecto Astro inicializado y servidor de desarrollo funcionando correctamente en `http://localhost:4321/`.
  - Scripts de fixes y reportes detallados sobre el embudo de contra reembolso, performance, carrito, WhatsApp y redirecciones, que evidencian una etapa de debugging intensivo sobre la versión legacy.

- Configuración Astro actual:
  - [`astro.config.mjs`](rositaastro/astro.config.mjs:1) está vacío de opciones (`defineConfig({})`), sin `base` ni ajustes de `outDir`.
  - Esto provoca que el build de Astro asuma raíz `/` y no `/rositaastro`, generando actualmente un 404 al acceder a `https://rositarococo.com/rositaastro` porque:
    - No existe una publicación estática coherente en esa subruta o
    - El contenido generado no está alineado con la estructura que GitHub Pages sirve.

## Trabajo reciente

- Se levantó el servidor de desarrollo Astro con éxito para testear localmente el embudo en `http://localhost:4321/`.
- Se identificó y documentó la causa técnica del 404 en `/rositaastro`:
  - Falta de configuración de `base` y de estrategia clara de deploy estático para servir el build de Astro desde esa ruta.
- Se inicializó parcialmente el Memory Bank creando [`product.md`](.kilocode/rules/memory-bank/product.md:1) con la definición del producto y lineamientos clave.

## Próximos pasos prioritarios

- Completar la inicialización del Memory Bank:
  - Crear y mantener actualizados:
    - [`architecture.md`](.kilocode/rules/memory-bank/architecture.md:1) (estructura de embudos, componentes Astro, relación con legacy).
    - [`tech.md`](.kilocode/rules/memory-bank/tech.md:1) (stack, flujo de build/deploy en GitHub Pages, herramientas).
- Definir y documentar estrategia de deploy Astro:
  - Configurar `base: '/rositaastro'` en [`astro.config.mjs`](rositaastro/astro.config.mjs:1) si el embudo se servirá en esa subruta.
  - Ajustar `outDir` y flujo de publicación para que el contenido de `dist` se exponga en la ruta correcta en GitHub Pages.
- Migrar de forma completa y ordenada:
  - Embudo de pago anticipado (derivado de [`index.html`](index.html:1)) a Astro dentro de [`rositaastro/`](rositaastro/:1).
  - Embudo de contra reembolso (a partir de `contrarreembolsonueva.html` y variantes) a Astro dentro del mismo proyecto.
- Validar con el flujo de testeo establecido:
  - Usar MCP Chrome DevTools para testear mobile-first + desktop.
  - Verificar ausencia de errores JS, 404 y problemas de tracking antes de considerar cualquier embudo “listo producción”.
