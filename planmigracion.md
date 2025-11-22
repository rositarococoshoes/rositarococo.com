# Plan de Optimización y Mejora de E-commerce con Astro

## Objetivo

Este plan detalla las estrategias y pasos para optimizar el rendimiento del sitio `rositarococo.com` y mejorar la experiencia de e-commerce utilizando las capacidades de Astro.

---

### Parte 1: Optimización Extrema del Rendimiento

**Objetivo:** Lograr que el sitio web cargue de manera casi instantánea, mejorando el SEO y la experiencia de usuario.

**Estrategias Clave:**

1.  **Optimización de Imágenes:**
    -   **Acción:** Utilizar el componente `<Image />` de Astro (`astro:assets`) para todas las imágenes de productos y contenido.
    -   **Detalles:**
        -   Mover todas las imágenes de `public/` a `src/assets/`.
        -   Reemplazar las etiquetas `<img>` por el componente `<Image />` de Astro.
        -   Astro optimizará automáticamente las imágenes, generando formatos modernos como `.webp` o `.avif`, redimensionándolas y aplicando carga diferida (`lazy-loading`) por defecto.
    -   **Ejemplo:**
        ```astro
        ---
        import { Image } from 'astro:assets';
        import miImagen from '../assets/imagen.png';
        ---
        <Image src={miImagen} alt="Descripción de la imagen" />
        ```

2.  **Carga Selectiva de JavaScript (Astro Islands):**
    -   **Acción:** Minimizar el JavaScript en el cliente, cargando componentes interactivos solo cuando sea necesario.
    -   **Detalles:**
        -   Identificar todos los componentes que requieren interactividad (carruseles, menús desplegables, botones de "añadir al carrito").
        -   Por defecto, Astro no envía JS al cliente. Para los componentes interactivos, usar directivas `client:*`.
        -   `client:load`: Carga el JS del componente inmediatamente. Usar para elementos críticos visibles al cargar la página (ej. header interactivo).
        -   `client:idle`: Carga el JS cuando el navegador está inactivo. Ideal para componentes de prioridad media.
        -   `client:visible`: Carga el JS solo cuando el componente entra en el viewport. Perfecto para carruseles, galerías de productos y elementos "below the fold".
    -   **Ejemplo:**
        ```astro
        <ProductCarousel client:visible />
        ```

3.  **CSS Crítico y Optimización de Estilos:**
    -   **Acción:** Asegurar que solo el CSS necesario para el renderizado inicial se cargue de forma bloqueante.
    -   **Detalles:**
        -   Astro extrae y embebe automáticamente el CSS crítico para cada página.
        -   Utilizar `<style>` tags dentro de los componentes de Astro para estilos con ámbito local. Esto evita la colisión de clases y reduce el tamaño del CSS global.
        -   Para CSS global, mantener un archivo `global.css` importado en el layout principal.

4.  **Prefetching para Navegación Instantánea:**
    -   **Acción:** Habilitar el prefetching para que las páginas se carguen en segundo plano antes de que el usuario haga clic en un enlace.
    -   **Detalles:**
        -   En la configuración de Astro (`astro.config.mjs`), habilitar el prefetching.
        -   Cuando un usuario pasa el cursor sobre un enlace, Astro comenzará a cargar la página de destino.
    -   **Configuración (`astro.config.mjs`):**
        ```javascript
        import { defineConfig } from 'astro/config';

        export default defineConfig({
          prefetch: true
        });
        ```

---

### Parte 2: Mejora de la Experiencia de E-commerce

**Objetivo:** Crear una experiencia de compra fluida, rápida y moderna.

**Estrategias Clave:**

1.  **Catálogo de Productos con Content Collections:**
    -   **Acción:** Gestionar los productos de forma centralizada y con tipado seguro usando las Colecciones de Contenido de Astro.
    -   **Detalles:**
        -   Definir un esquema para los productos en `src/content/config.ts`. Esto asegura que todos los productos tengan los mismos campos (nombre, precio, imágenes, descripción, etc.).
        -   Crear un archivo Markdown (`.md`) para cada producto en `src/content/products/`.
        -   Utilizar `getCollection('products')` para obtener y mostrar los productos en las páginas de listado.
    -   **Ejemplo de Esquema (`src/content/config.ts`):**
        ```typescript
        import { defineCollection, z } from 'astro:content';

        const productsCollection = defineCollection({
          schema: z.object({
            title: z.string(),
            price: z.number(),
            images: z.array(z.string()),
            description: z.string(),
          }),
        });

        export const collections = {
          'products': productsCollection,
        };
        ```

2.  **Carrito de Compras Persistente y Reactivo:**
    -   **Acción:** Implementar un carrito de compras que mantenga su estado entre páginas y se actualice dinámicamente sin recargar la página.
    -   **Detalles:**
        -   Utilizar un framework de UI como Preact o Svelte (más ligeros que React) para el componente del carrito.
        -   Gestionar el estado del carrito con una "store" de Nano Stores, que es un gestor de estado global muy ligero y compatible con Astro.
        -   El componente del carrito (`<Cart />`) será una "isla" (`client:load`) para que esté siempre disponible.
        -   Los botones "Añadir al carrito" también serán componentes interactivos que actualizan el estado de la store.

3.  **Páginas de Producto Generadas Dinámicamente:**
    -   **Acción:** Crear una única plantilla de página de producto que genere una página para cada producto del catálogo.
    -   **Detalles:**
        -   Crear un archivo `src/pages/products/[slug].astro`.
        -   Usar `getStaticPaths` para generar una ruta para cada producto de la colección de contenido.
        -   La página recibirá el `slug` del producto como parámetro y podrá obtener todos sus datos para renderizar la vista de detalle.

4.  **Checkout Fluido (Integración con Pasarelas de Pago):**
    -   **Acción:** Mejorar el proceso de pago para que sea rápido y seguro.
    -   **Detalles:**
        -   Para un sitio estático, la mejor opción es integrar una solución de checkout "headless" como Stripe Checkout o Mercado Pago Checkout Pro.
        -   Al hacer clic en "Finalizar Compra", se redirige al usuario a la pasarela de pago con la información del carrito.
        -   Si se requiere una integración más profunda, se puede pasar a modo SSR (`output: 'server'`) y crear endpoints de API en Astro para comunicarse con la pasarela de pago en el servidor, manteniendo la seguridad de las claves de API.

5.  **View Transitions para una Experiencia de App Nativa:**
    -   **Acción:** Utilizar la API de View Transitions de Astro para animaciones suaves entre páginas.
    -   **Detalles:**
        -   Importar y añadir el componente `<ViewTransitions />` en el `<head>` del layout principal.
        -   Astro se encargará de interceptar la navegación y aplicar transiciones por defecto (fundido).
        -   Se pueden personalizar las transiciones, por ejemplo, haciendo que la imagen de un producto se expanda desde la lista hasta la página de detalle, dando una sensación de fluidez y modernidad.
    -   **Ejemplo (`MainLayout.astro`):**
        ```astro
        ---
        import { ViewTransitions } from 'astro:transitions';
        ---
        <head>
          <ViewTransitions />
        </head>
        ...
        ```

Este plan transformará `rositarococo.com` en un e-commerce de alto rendimiento, aprovechando al máximo las ventajas que ofrece Astro para sitios orientados al contenido y la velocidad.