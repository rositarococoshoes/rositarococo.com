# tech.md

## Stack principal

- Frontend legacy:
  - HTML5 + CSS3 + JavaScript vanilla.
  - Landings específicas para:
    - Embudo pago anticipado basado en [`index.html`](index.html:1).
    - Embudo contra reembolso basado en `contrarreembolsonueva.html` y variantes `contrareembolso*.html`.
- Nuevo stack:
  - Astro v5 (proyecto en [`rositaastro/`](rositaastro/:1)).
  - Objetivo: generar HTML estático + assets estáticos, sin backend propio.
- Hosting:
  - GitHub Pages sobre el repositorio `rositarococo.com`.
  - Requisito: todo el output del proyecto debe ser servible como contenido estático puro.

## Herramientas y dependencias clave

- Astro:
  - Config central en [`rositaastro/astro.config.mjs`](rositaastro/astro.config.mjs:1).
  - Actualmente: `defineConfig({})` sin `base` ni `outDir` custom.
- npm:
  - Uso estándar:
    - `npm install`
    - `npm run dev` dentro de [`rositaastro/`](rositaastro/:1) para desarrollo.
    - `npm run build` para generar el sitio estático.

## Flujo de desarrollo recomendado

1. Desarrollo local:
   - Ejecutar:
     - `cd rositaastro`
     - `npm install` (primera vez o cuando cambian dependencias).
     - `npm run dev`
   - Acceso local:
     - `http://localhost:4321/`
   - Testear:
     - Embudo pago anticipado (página principal Astro).
     - Embudo contra reembolso (ruta específica Astro cuando exista).
   - Utilizar MCP Chrome DevTools para:
     - Validar mobile-first.
     - Verificar consola sin errores.
     - Revisar solicitudes de red (sin 404 críticos).

2. Build estático:
   - `npm run build` dentro de [`rositaastro/`](rositaastro/:1).
   - Output por defecto:
     - Carpeta `dist/` dentro de `rositaastro/`.
   - Este output debe alinearse con cómo GitHub Pages sirve los archivos.

## Estrategia de deploy en GitHub Pages

Objetivo: exponer el embudo Astro bajo:

- `https://rositarococo.com/rositaastro`

Condiciones técnicas necesarias:

- En [`astro.config.mjs`](rositaastro/astro.config.mjs:1):
  - Definir:
    - `base: '/rositaastro'` (cuando se decida servir todo el sitio Astro bajo esa subruta).
  - Opcional pero recomendado:
    - `outDir` apuntando a la carpeta que GitHub Pages va a publicar como `/rositaastro` (por ejemplo, copiar el contenido de `dist` a `/rositaastro` en la raíz del repo).
- GitHub Pages:
  - Debe estar configurado para servir:
    - El branch correcto (por ejemplo `main`).
    - La carpeta donde residen los archivos estáticos finales:
      - Ejemplo: si se copia el build de Astro a `/rositaastro`, entonces `https://rositarococo.com/rositaastro` encontrará un `index.html` válido.
- Si `base` no está configurado:
  - Astro genera rutas relativas a `/`.
  - Si luego se intenta acceder vía `/rositaastro`, se produce 404.
  - Este fue el origen del problema detectado para `https://rositarococo.com/rositaastro`.

## Principios técnicos clave

- Todo estático:
  - Sin SSR ni funciones serverless propias.
  - Integraciones externas permitidas (formularios, tracking, etc.).
- Mobile-first:
  - Layouts y componentes pensados primero para viewport móvil.
- Sin errores en producción:
  - Consola limpia (sin JS errors).
  - Sin 404 en JS, CSS o imágenes críticas.
- Reutilización:
  - En Astro, usar componentes compartidos:
    - Header, ProductCard, MiniCart, CheckoutForm, Testimonials.
  - Centralizar data:
    - Archivo de data (por ejemplo [`productData.ts`](rositaastro/src/data/productData.ts:1)) como fuente única de verdad.
- Aislamiento:
  - Legacy puede convivir, pero la evolución oficial y mantenible está en [`rositaastro/`](rositaastro/:1).
  - Solo migrar elementos que pertenecen directamente a:
    - Embudo pago anticipado.
    - Embudo contra reembolso.

## Restricciones y buenas prácticas

- Mantener el tamaño de assets bajo para mejorar performance (campañas desde mobile 3G/4G).
- Evitar librerías pesadas innecesarias.
- Mantener estructura de rutas consistente entre:
  - Desarrollo local (`/` en `localhost:4321`).
  - Producción (`/rositaastro` cuando se configure `base`).
- Documentar siempre:
  - Cambios relevantes en configuración.
  - Flujos de deploy (cómo del `npm run build` se pasa a archivos dentro del repo servidos por GitHub Pages).
