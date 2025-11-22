# Plan de Tareas: Fusión de index.html y index-contrareembolso.html (Versión para Agente de IA)

## Resumen Ejecutivo
Crear `contrareembolso-moderno.html` combinando el diseño visual de `index.html` con la lógica de negocio y precios de `index-contrareembolso.html`. Validar cada cambio usando Chrome DevTools vía MCP.

---

## FASE 1: INVESTIGACIÓN Y ANÁLISIS

### Tarea 1.1: Analizar index-contrareembolso.html
**Objetivo:** Identificar todos los archivos dependientes y la lógica de negocio.

**Pasos:**
1. Abrir `index-contrareembolso.html` en Chrome usando MCP chrome-devtools
2. Capturar screenshot de la página completa
3. Inspeccionar el formulario para identificar:
   - El atributo `action` del formulario (URL de Google Apps Script)
   - Todos los campos del formulario: nombres, IDs, tipos
   - Campos ocultos críticos, especialmente el campo `id="286442883"` (resumen del pedido)
4. Identificar todos los archivos JavaScript cargados por la página
5. Identificar todos los archivos CSS cargados por la página
6. Identificar llamadas a APIs externas (especialmente validación de WhatsApp)
7. Documentar los precios mostrados:
   - Precio de 1 par
   - Precio de 2 pares
   - Texto del encabezado principal de la oferta
8. Identificar los scripts responsables de:
   - Validación de WhatsApp con odontolab.co
   - Redirección a páginas de "gracias" después del envío
   - Actualización dinámica del resumen del pedido

**Entregable:**
- Lista completa de archivos .js críticos para contrareembolso
- Lista completa de archivos .css
- Estructura del formulario (todos los campos y sus atributos)
- Precios actuales
- Screenshots de la página
- Funcionalidades JavaScript identificadas

---

### Tarea 1.2: Analizar index.html
**Objetivo:** Comprender el diseño visual y componentes de UI.

**Pasos:**
1. Abrir `index.html` en Chrome usando MCP
2. Capturar screenshot de la página completa
3. Inspeccionar la estructura visual:
   - Cómo están construidos los carruseles de productos
   - Estructura HTML de las tarjetas de productos (`.product-item`)
   - Clases CSS utilizadas para el diseño
   - Estructura actual del formulario (si existe)
4. Identificar todos los scripts JavaScript de UI:
   - Scripts de carruseles (carousel-unified.js, carousel-init.js, etc.)
   - Script del carrito (otono-elegante2.js)
   - Cualquier otro script de interactividad
5. Identificar todos los archivos CSS:
   - Estilos de carruseles (carousel-unified.css)
   - Estilos de badges y elementos visuales (badges.css)
   - Otros archivos de estilos
6. Documentar la estructura de precios actuales:
   - Ubicación de los elementos de precio (clase `.option-price` u otra)
   - Precios actuales mostrados
7. Entender cómo funciona el carrito de compras:
   - Cómo se agregan productos
   - Dónde se almacena la información del carrito
   - Cómo se muestra el resumen del carrito

**Entregable:**
- Lista de scripts de UI/carruseles
- Lista de estilos
- Estructura HTML de los bloques de productos
- Descripción del funcionamiento del carrito actual
- Screenshots de diferentes secciones

---

## FASE 2: CREACIÓN Y PRIMERA VALIDACIÓN

### Tarea 2.1: Crear contrareembolso-moderno.html
**Pasos:**
1. Copiar el archivo `index.html` completo (contenido íntegro)
2. Guardarlo como `contrareembolso-moderno.html` en el mismo directorio
3. Abrir `contrareembolso-moderno.html` en Chrome usando MCP
4. Verificar que la página se renderiza idénticamente a index.html:
   - Capturar screenshot y comparar con el de index.html
   - Verificar que todos los recursos (CSS, JS, imágenes) se cargan correctamente
   - Verificar que no hay errores en la consola del navegador
   - Verificar que los carruseles funcionan
   - Verificar que el carrito funciona

**Criterio de éxito:** La nueva página se ve y funciona exactamente igual que index.html

---

## FASE 3: ACTUALIZACIÓN DE PRECIOS Y OFERTAS

### Tarea 3.1: Modificar encabezado principal
**Pasos:**
1. Localizar el elemento `<h1>` principal que muestra la oferta
2. Cambiar el texto para reflejar la oferta de contrareembolso: **"2 pares por $80.000"**
3. Guardar el archivo
4. Recargar la página en Chrome usando MCP
5. Capturar screenshot del encabezado modificado
6. Verificar que no hay errores en la consola

**Criterio de éxito:** El encabezado muestra "2 pares por $80.000"

---

### Tarea 3.2: Actualizar todos los precios en los bloques de productos
**Pasos:**
1. Localizar todos los bloques de productos en el HTML
2. Para cada producto, encontrar las opciones de compra (1 par, 2 pares)
3. Actualizar los precios:
   - **Opción "1 par":** Cambiar a **$55.000**
   - **Opción "2 pares":** Cambiar a **$80.000**
4. Actualizar el texto de ahorro en la opción de 2 pares:
   - Calcular: (55.000 × 2) - 80.000 = 30.000 de ahorro
   - Actualizar texto de ahorro a: "Ahorras $30.000"
   - Actualizar precio por par: "Cada par a $40.000" o similar
5. Guardar el archivo
6. Recargar en Chrome
7. Inspeccionar visualmente cada producto para verificar los nuevos precios
8. Capturar screenshots de al menos 2 productos diferentes mostrando los nuevos precios
9. Verificar que el layout no se rompió con los cambios de texto

**Criterio de éxito:** 
- Todos los productos muestran $55.000 (1 par) y $80.000 (2 pares)
- Los textos de ahorro están actualizados correctamente
- El diseño visual se mantiene intacto

---

## FASE 4: INTEGRACIÓN DEL FORMULARIO DE CONTRAREEMBOLSO

### Tarea 4.1: Reemplazar el formulario completo
**Pasos:**
1. En `contrareembolso-moderno.html`, localizar la etiqueta `<form>` actual
2. Eliminar completamente el formulario de index.html
3. Copiar el formulario completo de `index-contrareembolso.html` (desde `<form>` hasta `</form>`)
4. Pegar el formulario en la misma ubicación donde estaba el anterior
5. Verificar que el formulario incluye:
   - Atributo `action` apuntando a: `https://script.google.com/macros/s/AKfycbzGtF3OryfbupUz-8IlK1K4Ew0P0H1QSjabGnsHcswkbDzldXLWPDEdF26tLUkSjz6MSQ/exec`
   - Todos los campos visibles: nombre, WhatsApp, dirección, ciudad, etc.
   - Todos los campos ocultos (`<input type="hidden">`)
   - **CAMPO CRÍTICO:** El campo con `id="286442883"` que almacena el resumen del pedido en formato texto
6. Guardar el archivo
7. Recargar en Chrome usando MCP
8. Inspeccionar el formulario en la página:
   - Verificar que todos los campos están presentes
   - Verificar que el atributo `action` del formulario es correcto
   - Verificar visualmente que el formulario se ve bien dentro del diseño
9. Capturar screenshot del formulario completo

**Criterio de éxito:** 
- Formulario presente con todos los campos de index-contrareembolso.html
- Campo `id="286442883"` existe
- Atributo `action` apunta a la URL correcta de Google Apps Script
- No hay errores visuales o de consola

---

## FASE 5: INTEGRACIÓN DE SCRIPTS DE CONTRAREEMBOLSO

### Tarea 5.1: Verificar scripts de index.html
**Pasos:**
1. Verificar que los siguientes scripts de index.html están presentes y funcionando:
   - Swiper (librería de carruseles)
   - carousel-unified.js
   - carousel-init.js
   - otono-elegante2.js (manejo del carrito)
   - Cualquier otro script identificado en la Tarea 1.2
2. NO eliminar ninguno de estos scripts

---

### Tarea 5.2: Agregar scripts críticos de index-contrareembolso.html
**Pasos:**
1. Identificar en `index-contrareembolso.html` los scripts responsables de:
   - Validación de WhatsApp (comunicación con odontolab.co)
   - Manejo de la redirección después de enviar el formulario (a páginas gracias-1par-c.html, gracias-2pares-c.html, etc.)
   - Actualización dinámica del resumen del pedido
2. Copiar estos scripts de `index-contrareembolso.html`
3. Pegarlos en `contrareembolso-moderno.html` al final del `<body>`, **después** de los scripts de index.html
4. Mantener el orden de carga: primero scripts de UI de index.html, luego scripts de lógica de index-contrareembolso.html
5. Guardar el archivo
6. Recargar en Chrome usando MCP
7. Verificar en la consola del navegador que:
   - Todos los scripts se cargan sin errores
   - No hay conflictos entre scripts
   - No hay errores de JavaScript

**Criterio de éxito:**
- Todos los scripts de ambas páginas están presentes
- No hay errores en la consola
- Los scripts se cargan en el orden correcto

---

## FASE 6: ADAPTAR LA LÓGICA DEL CARRITO

### Tarea 6.1: Crear función de conversión de carrito a formato de texto
**Objetivo:** El carrito de index.html guarda los productos en un formato (probablemente objetos JavaScript), pero el backend de index-contrareembolso.html espera un formato de texto específico.

**Pasos:**
1. Investigar cómo el script `otono-elegante2.js` almacena la información del carrito:
   - ¿En qué variable se guarda?
   - ¿Qué estructura tiene? (array, objeto, etc.)
   - ¿Qué información contiene de cada producto? (talla, modelo, color)
2. Crear una nueva función JavaScript que:
   - Lea los productos del carrito actual
   - Convierta cada producto al formato de texto: `"TALLA-MODELO-COLOR, "`
   - Ejemplo: Si el carrito tiene 2 productos, generar: `"37-guillermina-negras, 39-birk-camel, "`
   - Retorne el string completo con todos los productos
3. Crear una función de checkout que:
   - Llame a la función de conversión
   - Tome el string resultante
   - Lo inyecte en el campo `id="286442883"` del formulario
   - Envíe el formulario
4. Modificar el botón de "Finalizar compra" o "Checkout" para que ejecute esta nueva función en lugar de la lógica anterior
5. Guardar el archivo
6. Recargar en Chrome
7. Probar el flujo completo:
   - Agregar 2-3 productos al carrito (diferentes modelos y tallas)
   - Click en el botón de checkout
   - Inspeccionar que el campo `id="286442883"` recibió el texto correcto
   - Verificar el formato: `"talla-modelo-color, talla-modelo-color, "`

**Formato esperado del texto:**
- Cada producto separado por coma y espacio
- Formato de cada producto: `TALLA-MODELO-COLOR`
- Ejemplo: `"37-guillermina-negras, 39-birk-camel, 40-botín-marron, "`

**Criterio de éxito:**
- El carrito visual funciona igual que en index.html
- Al hacer checkout, los productos se convierten correctamente al formato de texto
- El campo oculto `id="286442883"` contiene el string en el formato correcto
- El formulario se envía con esta información

---

## FASE 7: PRUEBAS FUNCIONALES INTEGRADAS

### Tarea 7.1: Prueba de validación de WhatsApp
**Pasos:**
1. Abrir `contrareembolso-moderno.html` en Chrome
2. Agregar un producto al carrito
3. Llenar el formulario con datos de prueba, pero usar un número de WhatsApp **inválido** (ej: "123")
4. Intentar enviar el formulario
5. Verificar que aparece un mensaje de error indicando que el WhatsApp es inválido
6. Capturar screenshot del mensaje de error
7. Probar con un WhatsApp válido (formato correcto) y verificar que no hay error

**Criterio de éxito:** La validación de WhatsApp funciona correctamente

---

### Tarea 7.2: Prueba de actualización dinámica del resumen
**Pasos:**
1. Abrir `contrareembolso-moderno.html` en Chrome
2. Agregar un producto al carrito
3. Verificar que el resumen del pedido (si es visible en la página) se actualiza mostrando el producto
4. Agregar otro producto diferente
5. Verificar que el resumen ahora muestra ambos productos
6. Eliminar un producto del carrito
7. Verificar que el resumen se actualiza reflejando el cambio
8. Capturar screenshots del antes y después

**Criterio de éxito:** El resumen del pedido se actualiza dinámicamente al agregar/quitar productos

---

### Tarea 7.3: Prueba end-to-end completa
**IMPORTANTE:** Coordinar con el equipo antes de realizar esta prueba para saber si se puede hacer un envío real o solo simulado.

**Pasos:**
1. Abrir `contrareembolso-moderno.html` en Chrome
2. Agregar 2 productos al carrito (diferentes modelos/tallas/colores)
3. Llenar el formulario completo con datos de prueba válidos:
   - Nombre
   - WhatsApp válido
   - Dirección completa
   - Ciudad
   - Cualquier otro campo requerido
4. Antes de enviar, prepararte para observar el comportamiento
5. Click en el botón de envío del formulario
6. Observar qué sucede:
   - ¿Se envía el formulario?
   - ¿Hay algún error?
   - ¿A qué página redirige? (debe ser gracias-1par-c.html o gracias-2pares-c.html dependiendo de cuántos pares ordenaste)
7. Verificar que la redirección es correcta según la cantidad de pares:
   - 1 par → gracias-1par-c.html
   - 2 pares → gracias-2pares-c.html
8. Capturar screenshots del proceso completo

**Criterio de éxito:**
- El formulario se envía sin errores
- Los datos llegan al backend (Google Apps Script)
- La redirección a la página de "gracias" es correcta
- Todo el flujo funciona de principio a fin

---

## FASE 8: VALIDACIÓN VISUAL Y DE EXPERIENCIA DE USUARIO

### Tarea 8.1: Comparación visual con index.html
**Pasos:**
1. Abrir `index.html` en una pestaña de Chrome
2. Abrir `contrareembolso-moderno.html` en otra pestaña
3. Comparar visualmente ambas páginas:
   - Layout general
   - Diseño de los carruseles
   - Tarjetas de productos
   - Botones y elementos interactivos
   - Colores y tipografía
4. Capturar screenshots de ambas páginas en la misma resolución
5. Documentar cualquier diferencia visual no intencional

**Criterio de éxito:** 
- Ambas páginas se ven prácticamente idénticas
- Solo cambian los precios (según lo esperado)
- El diseño visual se mantiene intacto

---

### Tarea 8.2: Prueba responsive (múltiples dispositivos)
**Pasos:**
1. Abrir `contrareembolso-moderno.html` en Chrome
2. Activar el modo de dispositivos móviles en DevTools
3. Probar en diferentes resoluciones:
   - **Mobile:** 375x667 (iPhone SE) o similar
   - **Tablet:** 768x1024 (iPad) o similar  
   - **Desktop:** 1920x1080 o la resolución estándar de escritorio
4. Para cada resolución:
   - Verificar que todos los elementos se ven correctamente
   - Verificar que los carruseles funcionan
   - Verificar que el formulario es usable
   - Verificar que no hay elementos rotos o superpuestos
   - Capturar screenshot
5. Probar la interacción completa en mobile:
   - Agregar productos al carrito
   - Llenar el formulario
   - Verificar que todo es funcional en pantalla táctil simulada

**Criterio de éxito:**
- La página funciona correctamente en mobile, tablet y desktop
- No hay elementos rotos en ninguna resolución
- La experiencia de usuario es fluida en todos los dispositivos

---

### Tarea 8.3: Verificación de rendimiento
**Pasos:**
1. Abrir `contrareembolso-moderno.html` en Chrome
2. Ejecutar un análisis de rendimiento usando Lighthouse en DevTools
3. Revisar los scores de:
   - Performance (rendimiento)
   - Accessibility (accesibilidad)
   - Best Practices (mejores prácticas)
4. Comparar con los scores de `index.html` (ejecutar Lighthouse también en index.html)
5. Documentar cualquier issue crítico o advertencia importante
6. Si hay problemas significativos de rendimiento, identificar la causa (scripts pesados, imágenes no optimizadas, etc.)

**Criterio de éxito:**
- Los scores de Lighthouse son similares o mejores que index.html
- No hay problemas críticos de rendimiento
- La página carga en tiempo razonable

---

## FASE 9: VALIDACIÓN FINAL Y CHECKLIST

### Tarea 9.1: Checklist exhaustivo
**Verificar cada punto marcando como completado:**

**Precios y Ofertas:**
- [ ] Encabezado principal muestra "2 pares por $80.000"
- [ ] Todos los productos muestran $55.000 para 1 par
- [ ] Todos los productos muestran $80.000 para 2 pares
- [ ] Textos de ahorro actualizados ($30.000)
- [ ] Precio por par en opción de 2 pares muestra $40.000

**Formulario:**
- [ ] Formulario de index-contrareembolso.html está presente
- [ ] Atributo `action` apunta a: `https://script.google.com/macros/s/AKfycbzGtF3OryfbupUz-8IlK1K4Ew0P0H1QSjabGnsHcswkbDzldXLWPDEdF26tLUkSjz6MSQ/exec`
- [ ] Campo `id="286442883"` existe y funciona
- [ ] Todos los campos visibles están presentes
- [ ] Todos los campos ocultos están presentes

**Funcionalidad del Carrito:**
- [ ] Se pueden agregar productos al carrito
- [ ] Se pueden eliminar productos del carrito
- [ ] El carrito muestra visualmente los productos agregados
- [ ] La conversión de carrito a texto funciona correctamente
- [ ] El formato del texto es: "talla-modelo-color, talla-modelo-color, "

**Scripts y Lógica:**
- [ ] Carruseles funcionan correctamente
- [ ] Validación de WhatsApp funciona
- [ ] Redirección post-envío funciona (a página de gracias correcta)
- [ ] Resumen de pedido se actualiza dinámicamente
- [ ] No hay errores en la consola del navegador
- [ ] Todos los recursos (CSS, JS, imágenes) cargan correctamente

**Visual y UX:**
- [ ] Página se ve igual a index.html (excepto precios)
- [ ] Responsive funciona en mobile
- [ ] Responsive funciona en tablet
- [ ] Responsive funciona en desktop
- [ ] No hay elementos visuales rotos
- [ ] Botones e interacciones funcionan correctamente

**Testing:**
- [ ] Prueba end-to-end completada exitosamente
- [ ] Validación de WhatsApp testeada
- [ ] Redirección testeada
- [ ] Flujo completo de compra funciona

---

### Tarea 9.2: Documentación final
**Crear un documento que incluya:**

1. **Resumen ejecutivo:**
   - Qué se hizo
   - Qué archivos se crearon/modificaron
   - Estado final del proyecto

2. **Cambios realizados:**
   - Lista detallada de modificaciones
   - Precios antiguos vs nuevos
   - Formulario: qué se reemplazó
   - Scripts: qué se agregó

3. **Archivos involucrados:**
   - `contrareembolso-moderno.html` (creado)
   - Scripts agregados de index-contrareembolso.html
   - Scripts mantenidos de index.html

4. **Evidencia visual (screenshots):**
   - Página completa en desktop
   - Página completa en mobile
   - Formulario
   - Precios actualizados de varios productos
   - Consola del navegador sin errores
   - Flujo de checkout completo

5. **Funcionalidades validadas:**
   - Lista de todas las pruebas realizadas
   - Resultados de cada prueba
   - Cualquier issue encontrado y cómo se resolvió

6. **Próximos pasos:**
   - ¿La página está lista para producción?
   - ¿Hay algo pendiente?
   - ¿Alguna recomendación adicional?

---

## NOTAS CRÍTICAS PARA EL AGENTE

### 🎯 Prioridades Absolutas

1. **Campo id="286442883":** Este campo es CRÍTICO. Debe contener el resumen del pedido en formato de texto exacto: `"talla-modelo-color, talla-modelo-color, "`. Sin este campo funcionando correctamente, los pedidos no llegarán bien al backend.

2. **No eliminar scripts de index.html:** Solo AGREGAR los scripts de index-contrareembolso.html, nunca reemplazar o eliminar los existentes.

3. **Orden de carga de scripts:** Primero deben cargar los scripts de UI de index.html, luego los de lógica de index-contrareembolso.html.

4. **Validación continua con Chrome DevTools:** En CADA fase, debes abrir la página en Chrome y verificar visualmente y funcionalmente los cambios. No avances sin validar.

5. **Screenshots:** Toma capturas de pantalla de cada cambio importante. Esto será crucial para la documentación y validación final.

6. **URL del action del formulario:** Debe ser exactamente: `https://script.google.com/macros/s/AKfycbzGtF3OryfbupUz-8IlK1K4Ew0P0H1QSjabGnsHcswkbDzldXLWPDEdF26tLUkSjz6MSQ/exec`

7. **Formato de precios:** Usar puntos como separadores de miles: $55.000 y $80.000 (no usar comas).

---

### 🔍 Enfoque de Trabajo

- **Big Picture:** Entiende que estás fusionando la belleza visual de index.html con la lógica de negocio de index-contrareembolso.html.
- **Incremental:** Haz cambios paso a paso, validando cada uno antes de avanzar.
- **Contextual:** Tienes acceso a todo el proyecto, explora los archivos para entender las dependencias.
- **Validación:** Usa Chrome DevTools MCP en cada paso para confirmar que todo funciona.