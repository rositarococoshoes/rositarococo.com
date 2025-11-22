# architecture.md

## Visión general

El repositorio `rositarococo.com` combina:

- Landings legacy estáticas en la raíz:
  - Embudo de pago anticipado principal basado en [`index.html`](index.html:1).
  - Varias variantes de contra reembolso (`contrareembolso*.html`) con JS/CSS asociados.
- Proyecto Astro en [`rositaastro/`](rositaastro/:1):
  - Destino final para migrar los dos embudos principales:
    - Pago anticipado.
    - Contra reembolso.
  - Debe generar output 100% estático compatible con GitHub Pages.

Regla estructural clave:
- Solo migrar y mantener en Astro lo que pertenece directa y funcionalmente a:
  - Embudo pago anticipado.
  - Embudo contra reembolso.
- No arrastrar assets o páginas irrelevantes.

## Embudos

### 1. Embudo pago anticipado (legacy → Astro)

- Origen: [`index.html`](index.html:1).
- Contenido típico:
  - Hero con propuesta de valor y beneficios.
  - Listado de productos (cards) con talles y precios.
  - Combos / selección múltiple.
  - Minicart / resumen de pedido.
  - Formulario / checkout para pago anticipado.
  - Sellos de confianza, testimonios, FAQs.
- Meta en Astro:
  - Página principal en [`rositaastro/src/pages/index.astro`](rositaastro/src/pages/index.astro:1) (o equivalente) con:
    - Componentes reutilizables:
      - Header.
      - ProductCard.
      - MiniCart.
      - CheckoutForm.
      - Testimonials.
    - Integración de tracking (Meta, etc.) via layout base.

### 2. Embudo contra reembolso (legacy → Astro)

- Origen: `contrarreembolsonueva.html` y otras variantes `contrareembolso*.html`.
- Contenido típico:
  - Mensaje fuerte de pago al recibir.
  - Explicación clara de condiciones, envíos, devoluciones.
  - Formulario optimizado para datos logísticos:
    - Nombre, teléfono, dirección, provincia/localidad, modelo/talle.
- Meta en Astro:
  - Página específica (ejemplo recomendado):
    - [`rositaastro/src/pages/contrarreembolsonueva.astro`](rositaastro/src/pages/contrarreembolsonueva.astro:1)
  - Reutilizar mismos componentes base donde aplique.
  - Mantener UX ultra simple (un solo formulario, pocas distracciones).

## Componentes clave (esperados en Astro)

Aunque el detalle exacto de cada archivo puede iterar, la arquitectura objetivo incluye:

- Layouts:
  - [`rositaastro/src/layouts/MainLayout.astro`](rositaastro/src/layouts/MainLayout.astro:1)
    - Contiene:
      - `<head>` estándar.
      - Meta tags.
      - Carga de fuentes y estilos globales.
      - Scripts de tracking.
    - Debe garantizar:
      - `<meta charset="utf-8">`.
      - Preparación para base `/rositaastro` cuando se configure.

- Componentes:
  - [`ProductCard.astro`](rositaastro/src/components/ProductCard.astro:1)
    - Render de cada modelo:
      - Imagen, nombre, precio, talles disponibles.
      - Botón “Agregar” / seleccionar combo.
  - [`MiniCart.astro`](rositaastro/src/components/MiniCart.astro:1)
    - Resumen dinámico:
      - Productos seleccionados.
      - Cantidades.
      - Totales.
  - [`CheckoutForm.astro`](rositaastro/src/components/CheckoutForm.astro:1)
    - Formulario reutilizable (o variantes) para:
      - Pago anticipado.
      - Contra reembolso.
    - Validaciones básicas en front.
  - [`Testimonials.astro`](rositaastro/src/components/Testimonials.astro:1)
    - Bloques de prueba social.
  - [`Header.astro`](rositaastro/src/components/Header.astro:1)
    - Branding, beneficios superiores, navegación mínima.

- Data:
  - [`productData.ts`](rositaastro/src/data/productData.ts:1)
    - Fuente única de verdad para:
      - Modelos, colores, talles, precios.
    - Permite mantener lógica desacoplada del markup.

## Flujo de datos y lógica

- Sin backend propio:
  - Formularios envían datos a servicios externos:
    - Google Forms, webhooks, planillas, etc.
  - JS solo para:
    - Manejo de carrito/minicart.
    - Validación básica.
    - Tracking.

- Patrones:
  - Centralizar data de productos y variantes.
  - Mantener componentes puros y reutilizables.
  - Evitar lógica repetida entre embudos.

## Rutas y deploy estático

- Local:
  - `npm run dev` dentro de [`rositaastro/`](rositaastro/:1) → `http://localhost:4321/`.

- Producción (GitHub Pages):
  - Dominio: `https://rositarococo.com`.
  - Meta objetivo:
    - Servir el build de Astro bajo `/rositaastro`:
      - URL final: `https://rositarococo.com/rositaastro`.
  - Requisito técnico:
    - Configurar [`astro.config.mjs`](rositaastro/astro.config.mjs:1) con:
      - `base: '/rositaastro'` (cuando se defina la estrategia final).
      - `outDir` apuntando a la ruta que GitHub Pages publica.
    - Asegurar que el contenido de `dist` contenga `index.html` y assets compatibles con ese `base`.

Actualmente:
- `defineConfig({})` sin `base`:
  - El build asume raíz `/`.
  - Si simplemente se copia tal cual, `/rositaastro` en producción devuelve 404.
- Es crítico alinear:
  - Config Astro.
  - Carpeta publicada en GitHub Pages.
  - Estructura de rutas esperada.

## Principios arquitectónicos

- Mobile-first:
  - Diseño y componentes optimizados para viewport móvil.
- Mantenibilidad:
  - Uso de Astro + componentes para reducir duplicación entre embudos.
- Aislamiento:
  - Legacy HTML/JS puede convivir, pero el futuro está en [`rositaastro/`](rositaastro/:1).
- Estricto enfoque en:
  - Embudo pago anticipado.
  - Embudo contra reembolso.
  - Nada fuera de eso entra en la arquitectura core.
