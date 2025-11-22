# Plan de Rediseño para `index-oton.html`

**Objetivo:** Rediseñar la página `index-oton.html` con una estética otoñal y minimalista, mejorando la experiencia de usuario y el flujo de compra, sin alterar la funcionalidad del código base existente.

**1. Análisis y Comprensión:**

*   **Revisión del Código Actual:** Analizar HTML, CSS y JavaScript para identificar dependencias funcionales y elementos modificables estéticamente.
*   **Identificación de Secciones Clave:**
    *   Encabezado e Introducción
    *   Catálogo de Productos (Carruseles, Info, Selección)
    *   Testimonios
    *   Bloques de Información General
    *   Formulario de Datos de Envío y Pago
    *   Scripts y Elementos Flotantes

**2. Propuesta de Estética "Otoñal Minimalista":**

*   **Paleta de Colores:**
    *   Base: Neutros cálidos (beige `#F5F5DC`, crema `#FFF8DC`, topo `#D2B48C`).
    *   Acentos: Toques sutiles de naranja quemado (`#CC5500`), rojo teja (`#B22222`), verde musgo (`#8FBC8F`).
    *   Texto: Negro/gris oscuro (`#333333`).
*   **Tipografía:**
    *   Títulos: Serif elegante (Playfair Display, Lora).
    *   Cuerpo: Sans-serif limpio (Lato, Montserrat, Open Sans).
*   **Imágenes y Carruseles:**
    *   Mayor protagonismo visual de las imágenes.
    *   Controles de carrusel simplificados y discretos.
    *   Transiciones suaves.
*   **Layout y Espaciado:**
    *   Incrementar espacio en blanco.
    *   Reducir bordes duros y sombras.
    *   Aspecto fluido y orgánico.

**3. Propuestas de Rediseño por Sección:**

*   **Encabezado/Intro:** Simplificar bloque inicial de promociones. Mayor impacto visual.
*   **Catálogo Productos:**
    *   Suavizar/eliminar borde de `.contorno`.
    *   Optimizar tamaño de imágenes en carrusel.
    *   Rediseñar sección `novisible` (selección talle/cantidad): considerar mostrar por defecto, mejorar claridad visual, simplificar info repetida.
*   **Testimonios:** Alinear estilo del carrusel con el diseño general.
*   **Info General:** Consolidar información repetida (precios, envío, etc.) en una única sección clara. Simplificar "Cómo Comprar".
*   **Formulario:** Mejorar layout y estilo de campos. Asegurar claridad en la confirmación del pedido. Destacar opciones de pago.
*   **CTAs:** Rediseñar botones ("COMPRAR", selección talle/cantidad) para que sean prominentes y consistentes.
*   **Elementos Flotantes:** Rediseñar notificaciones de venta, mensaje fijo inferior y botón WhatsApp para que coincidan con la nueva estética.

**4. Mejora del Copywriting:**

*   Revisar textos para claridad, concisión y tono adecuado.
*   Enfocarse en beneficios para el cliente.

**5. Consideraciones Técnicas:**

*   **Responsive Design:** Asegurar adaptabilidad a todos los dispositivos.
*   **No Romper Funcionalidad:** Máxima precaución al modificar CSS/HTML para no afectar IDs/clases usados por JS.
*   **Pruebas:** Exhaustivas pruebas visuales y funcionales en diferentes navegadores/dispositivos.

**Diagrama de Flujo Simplificado (Mermaid):**

```mermaid
graph TD
    A[Inicio: Encabezado + Intro] --> B{Catálogo de Productos};
    B -- Modelo 1 --> C1[Carrusel Img 1];
    C1 --> D1(Selección Talle/Qty 1);
    B -- Modelo 2 --> C2[Carrusel Img 2];
    C2 --> D2(Selección Talle/Qty 2);
    B -- ... --> Cn[...];
    Cn --> Dn(...);
    D1 --> E{Información General Consolidada};
    D2 --> E;
    Dn --> E;
    E --> F[Testimonios];
    F --> G[Formulario Datos Envío/Pago];
    G --> H(Confirmación Pedido);
    H --> I[Botón COMPRAR];

    subgraph Elementos Flotantes
        J(Notificaciones Venta)
        K(Botón WhatsApp)
    end

    style A fill:#F5F5DC,stroke:#333,stroke-width:1px
    style B fill:#FFF8DC,stroke:#333,stroke-width:1px
    style C1 fill:#D2B48C,stroke:#333,stroke-width:1px
    style C2 fill:#D2B48C,stroke:#333,stroke-width:1px
    style Cn fill:#D2B48C,stroke:#333,stroke-width:1px
    style D1 fill:#EAE0C8,stroke:#333,stroke-width:1px
    style D2 fill:#EAE0C8,stroke:#333,stroke-width:1px
    style Dn fill:#EAE0C8,stroke:#333,stroke-width:1px
    style E fill:#F5F5DC,stroke:#333,stroke-width:1px
    style F fill:#FFF8DC,stroke:#333,stroke-width:1px
    style G fill:#F5F5DC,stroke:#333,stroke-width:1px
    style H fill:#EAE0C8,stroke:#333,stroke-width:1px
    style I fill:#CC5500,stroke:#333,stroke-width:2px,color:#fff