# Plan de Migración Detallado: index.html y contrareembolsonueva.html

## 1. Configuración y Acceso al Entorno de Desarrollo

Esta sección detalla cómo se configuró el entorno de desarrollo en la carpeta `rosita2` y cómo acceder a él para continuar con la migración.

### 1.1. Instalación de Astro (Proceso Manual)

Debido a que el entorno de ejecución del agente no permite comandos interactivos como `npm create astro`, el proyecto se inicializó manualmente siguiendo estos pasos:

1.  **Creación del Directorio Principal:** Se creó la carpeta `rosita2` para aislar el nuevo proyecto.
2.  **Creación de Archivos de Configuración:** Se crearon los siguientes archivos en la raíz de `rosita2/`:
    *   `package.json`: Define el proyecto, sus dependencias (inicialmente solo `astro`) y los scripts de ejecución (`dev`, `build`).
    *   `astro.config.mjs`: Archivo de configuración principal de Astro.
    *   `tsconfig.json`: Archivo de configuración de TypeScript, requerido por Astro.
3.  **Creación de la Estructura de Carpetas:** Se generó la estructura de carpetas esencial de Astro:
    *   `public/`: Para archivos estáticos que no se procesan (como imágenes, favicons).
    *   `src/assets/`: Para archivos que Astro puede procesar (ej. imágenes a optimizar).
    *   `src/components/`: Para componentes reutilizables de Astro.
    *   `src/layouts/`: Para las plantillas de página.
    *   `src/pages/`: Para las rutas y páginas del sitio.

### 1.2. Instalación de Dependencias

- **Acción (Realizada por el usuario):** Se ejecutó el comando `npm install` dentro de la carpeta `rosita2/`.
- **Resultado:** Esta acción creó la carpeta `node_modules/`, que contiene todo el código del framework Astro y otras dependencias necesarias para que el servidor de desarrollo y el proceso de construcción funcionen.

### 1.3. Cómo Acceder al Sitio Localmente

Para ver el sitio en desarrollo y verificar los cambios en tiempo real, sigue estos pasos:

1.  **Abre una terminal.**
2.  **Navega al directorio del nuevo proyecto:**
    ```bash
    cd c:\Users\sflic\Documents\GitHub\rositarococo.com\rosita2
    ```
3.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
4.  **Accede desde el navegador:** Una vez que el servidor esté en funcionamiento, verás un mensaje en la terminal. Abre tu navegador web y ve a la siguiente dirección:
    -   **URL Local:** `http://localhost:4321/`

El servidor se recargará automáticamente cada vez que se guarde un cambio en un archivo dentro de la carpeta `src/`.

---

## 2. Visión General y Principios

- **Objetivo:** Reconstruir completamente los embudos de `index.html` (Pago Previo) y `contrarreembolsonueva.html` (Contrarreembolso) como páginas y componentes reutilizables dentro del proyecto Astro en la carpeta `rosita2`.
- **Principio de Aislamiento:** Todas las acciones (creación de archivos, copia de assets) deben ocurrir **exclusivamente dentro de la carpeta `rosita2/`**. No se debe modificar ningún archivo fuera de este directorio.
- **Estrategia de Imágenes:** Para evitar errores de metadatos (`NoImageMetadata`), todas las imágenes se copiarán a la carpeta `rosita2/public/` y se referenciarán en el código a través de etiquetas `<img>` estándar, no con el componente `<Image>` de Astro. Esto asegura que las imágenes se muestren correctamente, aunque se posponga la optimización automática.
- **Componentes Reutilizables:** La migración se centrará en crear componentes (ej. `ProductItem.astro`) que puedan ser reutilizados en ambas páginas (`index.astro` y `contrareembolso.astro`) para mantener un código limpio y fácil de mantener.

---

## 3. Fase 1: Migración del Embudo Principal (`index.html`)

Esta fase se enfoca en replicar la funcionalidad y apariencia de `index.html`.

### 3.1. Copia de Activos Gráficos (Assets)

Se deben copiar los siguientes recursos desde la raíz del proyecto a la subcarpeta correspondiente dentro de `rosita2/public/` para que sean accesibles a través de URLs relativas (ej. `/rosita-form.webp`).

- **Logo Principal:**
  - **Origen:** `rosita-form.webp`
  - **Destino:** `rosita2/public/rosita-form.webp`

- **Imágenes de Productos (Guillerminas):**
  - **Origen:** Todos los archivos de las carpetas `guillerminafotos/`, `birknegras/`, `birkcamel/`, `birkblancas/`.
  - **Destino:** Crear carpetas idénticas dentro de `rosita2/public/` (ej. `rosita2/public/guillerminafotos/`, `rosita2/public/birknegras/`, etc.) y copiar los archivos.

- **Imágenes de Testimonios:**
  - **Origen:** Todos los archivos de `comentarios/` y las imágenes de testimonios sueltas (ej. `comentario1-min.webp`).
  - **Destino:** `rosita2/public/comentarios/`.

### 3.2. Creación y Refinamiento de Componentes Astro

- **`src/layouts/Layout.astro` (Ya completado):**
  - Contiene la estructura HTML base, la importación de fuentes de Google, los estilos globales de `otono-elegante2.css` y la librería Swiper.js.

- **`src/components/Header.astro` (Ya completado):**
  - Contiene la barra de beneficios superior, el banner promocional y el logo.

- **`src/components/ProductItem.astro` (Refinamiento Necesario):**
  - **Estado Actual:** Muestra el carrusel de imágenes, guía de talles y selectores de cantidad/talle.
  - **Acción:** Añadir la lógica de JavaScript para la interactividad:
    1.  Crear un bloque `<script>` dentro del componente.
    2.  Añadir un event listener para el `.size-guide-toggle` que muestre/oculte el `.size-guide-content`.
    3.  Añadir listeners para los `input[type="radio"]` de cantidad para manejar la selección de 1 o 2 pares.

- **`src/components/Testimonials.astro` (Por crear):**
  - **Acción:** Crear este nuevo componente.
  - **Contenido HTML:** Migrar la sección de testimonios del `index.html` original.
  - **Lógica JS:** Migrar el script de carga dinámica de testimonios, que mezcla el array de imágenes y las añade al DOM en lotes.

- **`src/components/CheckoutForm.astro` (Por crear):**
  - **Acción:** Crear este nuevo componente.
  - **Contenido HTML:** Migrar toda la estructura del formulario que se encuentra dentro de la sección `#restodelform` en `index.html`, incluyendo los campos de datos personales, dirección y el resumen del pedido.

### 3.3. Ensamblaje de la Página `index.astro`

- **Acción:** Modificar `src/pages/index.astro` para construir la página completa.
- **Estructura:**
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  import ProductItem from '../components/ProductItem.astro';
  import Testimonials from '../components/Testimonials.astro';
  import CheckoutForm from '../components/CheckoutForm.astro';
  ---
  <Layout title="Rosita Rococó - Colección 2025">
    <main class="container">
      <!-- Mapear y renderizar cada producto del index.html original -->
      <ProductItem title="Guillerminas Negras" imageUrls={[...]} />
      <ProductItem title="Guillerminas Camel" imageUrls={[...]} />
      <!-- etc. -->

      <Testimonials />
      <CheckoutForm />
    </main>
  </Layout>
  ```

---

## 4. Fase 2: Migración del Embudo Contrarreembolso (`contrarreembolsonueva.html`)

Esta fase replica la funcionalidad de `contrarreembolsonueva.html`, reutilizando la mayor cantidad de componentes posible.

### 4.1. Copia de Activos Gráficos

- **Imágenes de Productos (Contrarreembolso):**
  - **Origen:** Imágenes de los modelos Milán, Trento, Parma, etc.
  - **Destino:** Crear las carpetas correspondientes en `rosita2/public/` y copiar los archivos.

### 4.2. Creación de la Página `contrareembolso.astro`

- **Acción:** Crear el archivo `src/pages/contrareembolso.astro`.
- **Estructura:** Será muy similar a `index.astro`, pero se le pasarán diferentes propiedades a los componentes.
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  import ProductItem from '../components/ProductItem.astro';
  import InstructionsCR from '../components/InstructionsCR.astro'; // Componente nuevo
  import CheckoutForm from '../components/CheckoutForm.astro';

  // Definir precios y promociones específicas para CR
  const preciosCR = { uno: 55000, dos: 42500 };
  ---
  <Layout title="Rosita Rococó - Pago Contrarreembolso">
    <main class="container">
      <!-- Renderizar productos de CR, pasando precios y promos como props -->
      <ProductItem title="Milán" imageUrls={[...]} precios={preciosCR} />
      <ProductItem title="Trento" imageUrls={[...]} precios={preciosCR} />

      <InstructionsCR />
      <CheckoutForm isContrareembolso={true} />
    </main>
  </Layout>
  ```

- **`src/components/InstructionsCR.astro` (Por crear):**
  - **Acción:** Crear un componente para mostrar las tarjetas de instrucciones específicas del flujo de contrareembolso.

---

## 5. Fase 3: Implementación de Lógica de Negocio (Javascript)

Esta fase se centra en la funcionalidad interactiva y el proceso de compra.

### 5.1. Script del Carrito de Compras (`src/scripts/cart.js`)

- **Acción:** Crear este archivo que no será un componente, sino un script de cliente.
- **Funcionalidad:**
  - **Estado:** Mantendrá un array de productos en `localStorage` para persistir el carrito.
  - **Funciones Globales:** Expondrá funciones en el objeto `window` como `RositaCart.add()`, `RositaCart.remove()`, `RositaCart.getState()`.
  - **Renderizado:** Tendrá una función que actualice la UI del mini-carrito (contador, lista de productos, total).
- **Integración:**
  - El script se importará en `Layout.astro`.
  - Los botones "Agregar al carrito" en `ProductItem.astro` llamarán a `RositaCart.add()`.

### 5.2. Script de Checkout (`src/scripts/checkout.js`)

- **Acción:** Crear este script que será importado y utilizado por el componente `CheckoutForm.astro`.
- **Funcionalidad:**
  - **`handleFormSubmit(event)`:**
    1.  Evitará que el formulario se envíe de la forma tradicional (`event.preventDefault()`).
    2.  Recolectará todos los datos de los campos del formulario.
    3.  Obtendrá los productos del carrito llamando a `RositaCart.getState()`.
    4.  Validará que todos los campos requeridos estén completos.
    5.  Creará un objeto `pedido` con toda la información.
    6.  Hará una petición `fetch` de tipo `POST` al webhook de n8n, enviando el objeto `pedido` en formato JSON.
    7.  Manejará la respuesta: si es exitosa, redirigirá a una página de `gracias.astro`; si falla, mostrará un mensaje de error al usuario.

---

## 6. Fase 4: Despliegue Final

- **6.1. Configuración de Astro:**
  - **Acción:** Editar `astro.config.mjs` para configurar las opciones `site` y `base` para que coincidan con la URL de GitHub Pages.

- **6.2. Proceso de Build:**
  - **Acción:** Ejecutar `npm run build` en la carpeta `rosita2/`.
  - **Resultado:** Se generará una carpeta `dist/` con todos los archivos estáticos (HTML, CSS, JS, imágenes) del sitio final.

- **6.3. Despliegue en GitHub Pages:**
  - **Acción:** El contenido de la carpeta `dist/` es lo que debe subirse a la rama `gh-pages` del repositorio para que el sitio se actualice.
