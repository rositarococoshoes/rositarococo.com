<objective>
Mejorar y optimizar el sistema de miniaturas existente en los carruseles de productos del sitio /astrocline para que las miniaturas estén contenidas dentro del contenedor principal del carrusel, se ubiquen debajo de la imagen principal con un diseño minimalista, permitan clickear para cargar esa imagen como principal, y permitan deslizar las miniaturas para navegar por todas las fotos del producto.

El objetivo es mantener la funcionalidad existente pero mejorar la disposición y estética para una mejor experiencia de usuario, especialmente en dispositivos móviles.
</objective>

<context>
Este proyecto es un sitio de e-commerce para Rosita Rococó ubicado en /astrocline/ que vende calzado femenino. Utiliza:

- **Astro** como framework de desarrollo (aunque renderizado como HTML estático)
- **Embla Carousel** para la funcionalidad de carruseles
- **Tailwind CSS** para estilos principales (clases inline) + CSS customizado en unified.css
- **HTML vanilla con JavaScript** para la funcionalidad
- Los productos tienen múltiples fotos (entre 14-18 imágenes por producto)
- Los carruseles ya tienen thumbnails implementados pero necesitan mejoras

Tecnologías clave:
- Framework: Astro (genera HTML estático)
- CSS: Tailwind CSS + CSS customizado
- Carousel: Embla Carousel library
- JavaScript: Vanilla JS para funcionalidad del carrusel

Estructura actual:
- Carrusel principal con .embla__viewport y .embla__container
- Thumbnails separados en .embla-thumbs abajo del carrusel
- Cada producto tiene su propio carrusel con data-product-id

@/astrocline/index.html - Estructura HTML actual con carruseles
@/astrocline/css/unified.css - Estilos CSS actuales
@/astrocline/js/carousel.js - Lógica JavaScript del carrusel

Target audience: Clientas de calzado femenino que necesitan ver múltiples ángulos y detalles de los productos antes de comprar.
</context>

<requirements>
Requisitos específicos para las miniaturas:

1. **Contenedor integrado**: Las miniaturas deben estar DENTRO del contenedor principal del carrusel (no separadas como están ahora)

2. **Posicionamiento**: Ubicadas debajo de la imagen principal, pero dentro del mismo carrusel

3. **Diseño minimalista**:
   - Miniaturas pequeñas y discretas
   - Bordes sutiles con hover effects
   - Indicador visual de la miniatura activa
   - Sin elementos decorativos innecesarios

4. **Funcionalidad de clic**: Clickear una miniatura debe cargar esa imagen como la principal inmediatamente

5. **Deslizamiento horizontal**: Las miniaturas deben poder deslizarse horizontalmente cuando hay muchas (14-18 por producto)

6. **Responsive**: Optimizado para móvil (miniaturas más pequeñas en pantallas pequeñas)

7. **Rendimiento**: Lazy loading para miniaturas y transiciones suaves
</requirements>

<implementation>
Análisis del código actual necesario:

1. **HTML Structure**: Examinar la estructura actual en /astrocline/index.html para entender cómo están organizados los carruseles
   - Cada producto tiene un div.embla con data-product-id
   - Los thumbnails están en .embla-thumbs fuera del carrusel principal

2. **CSS Analysis**: Revisar estilos en /astrocline/css/unified.css y clases Tailwind en HTML
   - Estilos actuales para .embla, .embla-thumbs, .embla__slide, etc.
   - Clases Tailwind existentes para diseño responsive
   - Media queries y breakpoints de Tailwind

3. **JavaScript Logic**: Analizar /astrocline/js/carousel.js
   - Lógica actual de sincronización entre carrusel principal y thumbnails
   - Event listeners para click en thumbnails
   - Configuración de Embla Carousel

Cambios a implementar:

1. **Reestructurar HTML**:
   - Mover .embla-thumbs DENTRO de .embla (después de .embla__viewport)
   - Mantener estructura de thumbnails pero integrada

2. **Modificar CSS y Tailwind**:
   - Actualizar estilos en unified.css para nuevo layout integrado
   - Añadir/modificar clases Tailwind para diseño minimalista
   - Ajustar tamaños y posicionamiento con flexbox/grid
   - Optimizar para responsive usando breakpoints de Tailwind (sm:, md:, lg::)

3. **Actualizar JavaScript**:
   - Adaptar lógica para nueva estructura DOM
   - Mantener funcionalidad existente
   - Optimizar sincronización

4. **Mejoras de diseño**:
   - Miniaturas más pequeñas y compactas
   - Mejor indicador visual de estado activo
   - Transiciones suaves
   - Scroll horizontal para thumbnails cuando exceden el viewport
</implementation>

<output>
Archivos a modificar:

1. **./astrocline/index.html**
   - Reestructurar carruseles para integrar thumbnails dentro del contenedor principal
   - Mover .embla-thumbs dentro de cada .embla
   - Mantener atributos data-product-id y clases existentes

2. **./astrocline/css/unified.css**
   - Actualizar estilos .embla para layout integrado
   - Mejorar estilos .embla-thumbs para diseño minimalista
   - Añadir scroll horizontal para thumbnails
   - Optimizar estilos responsive
   - Mejorar indicador de thumbnail activo

3. **./astrocline/js/carousel.js**
   - Adaptar selectores para nueva estructura DOM
   - Mantener funcionalidad de sincronización
   - Optimizar performance
   - Asegurar compatibilidad con estructura nueva

El resultado debe mantener toda la funcionalidad existente pero con un diseño más limpio, minimalista e integrado.

**IMPORTANTE: Commit y Push final**
Una vez completados todos los cambios y verificado que funcionan correctamente en local:
1. **Comitear los cambios a GitHub** con un mensaje descriptivo
2. **Hacer push al repositorio** para poder visualizar los cambios en producción
3. Verificar que los cambios se reflejen correctamente en el sitio publicado

Pasos para Git:
```bash
git add ./astrocline/index.html ./astrocline/css/unified.css ./astrocline/js/carousel.js
git commit -m "Mejorar miniaturas de carrusel: diseño minimalista integrado con scroll horizontal y click para navegación

- Integrar thumbnails dentro del contenedor principal del carrusel
- Implementar diseño minimalista con Tailwind CSS
- Añadir scroll horizontal para 14-18 miniaturas por producto
- Optimizar responsive para desktop/tablet/móvil
- Mantener funcionalidad de click y sincronización"

git push origin master
```
**Verificación final con MCP Chrome DevTools**:
Después del push, usar MCP Chrome DevTools para verificar los cambios en https://rositarococo.com/astrocline:

1. Navegar a: https://rositarococo.com/astrocline
2. Usar las herramientas de MCP Chrome DevTools para:
   - Tomar screenshots del antes y después
   - Verificar que las miniaturas estén dentro del contenedor principal
   - Probar funcionalidad de click en thumbnails
   - Verificar scroll horizontal en móviles (responsive testing)
   - Validar que no haya broken images o errores de consola
   - Revisar que el diseño sea minimalista como especificado

Pasos MCP Chrome DevTools:
```bash
# Navegar al sitio
mcp__chrome-devtools__navigate_page --type="url" --url="https://rositarococo.com/astrocline" --ignoreCache=true --timeout=10000

# Tomar screenshot completo para verificar diseño
mcp__chrome-devtools__take_screenshot --fullPage=true --filePath="verification-screenshot.png" --format="png" --quality=90

# Probar funcionalidad click en thumbnails
mcp__chrome-devtools__take_snapshot --verbose=false --filePath="carousel-structure-snapshot.txt"
```

Verificar que los cambios se reflejen correctamente en el sitio publicado antes de declarar la tarea completada.

**IMPORTANTE: Verificación visual con AI Vision MCP**
Después de tomar screenshots con MCP Chrome DevTools, es obligatorio usar el MCP AI Vision para analizar las imágenes ya que el modelo de razonamiento usado para programar no tiene capacidad de visión:

```bash
# Analizar screenshots tomados con AI Vision MCP
mcp__ai-vision-mcp__analyze_image --imageSource="astroline-carousel-after-changes.png" --prompt="Analizar este screenshot del carrusel de productos y verificar que las miniaturas estén integradas dentro del contenedor principal, que el diseño sea minimalista, y que la estructura sea correcta según los requisitos"

mcp__ai-vision-mcp__analyze_image --imageSource="mobile-view.png" --prompt="Verificar el diseño responsive del carrusel en móvil, asegurándose de que las miniaturas sean pequeñas pero funcionales y permitan scroll horizontal"

mcp__ai-vision-mcp__analyze_image --imageSource="tablet-view.png" --prompt="Validar el diseño responsive del carrusel en tablet, confirmando que las miniaturas se adapten correctamente al tamaño intermedio"
```

Esta verificación visual con AI Vision MCP es obligatoria para confirmar que los cambios se vean correctamente antes de declarar la tarea completada.
</output>

<verification>
Antes de declarar completo, verificar:

1. **Funcionalidad completa**:
   - Click en thumbnails cambia imagen principal
   - Navegación con flechas sigue funcionando
   - Deslizamiento horizontal de thumbnails funciona
   - Touch/swipe gestures funcionan en móvil

2. **Diseño responsive**:
   - Desktop: Miniaturas visibles y navegables
   - Tablet: Diseño adaptado correctamente
   - Móvil: Miniaturas pequeñas pero funcionales

3. **Performance**:
   - Lazy loading implementado correctamente
   - Transiciones suaves sin lag
   - No hay JavaScript errors en consola

4. **Experiencia de usuario**:
   - Miniaturas claramente identificables
   - Estado activo claramente visible
   - Navegación intuitiva
   - Sin overflow horizontal no deseado

Probar en múltiples dispositivos y navegadores antes de finalizar.

**VERIFICACIÓN OBLIGATORIA CON MCP CHROME DEVTOOLS**:
Antes de declarar la tarea completada, después del push usar MCP Chrome DevTools para:

1. **Navegación y carga**:
   ```bash
   mcp__chrome-devtools__navigate_page --type="url" --url="https://rositarococo.com/astrocline" --ignoreCache=true --timeout=15000
   ```

2. **Screenshots de verificación**:
   ```bash
   mcp__chrome-devtools__take_screenshot --fullPage=true --filePath="astroline-carousel-after-changes.png" --format="png" --quality=95
   ```

3. **Testing responsive**:
   ```bash
   mcp__chrome-devtools__resize_page --width=375 --height=812  # iPhone
   mcp__chrome-devtools__take_screenshot --filePath="mobile-view.png" --format="png" --quality=90
   mcp__chrome-devtools__resize_page --width=768 --height=1024  # Tablet
   mcp__chrome-devtools__take_screenshot --filePath="tablet-view.png" --format="png" --quality=90
   ```

4. **Verificación estructura DOM**:
   ```bash
   mcp__chrome-devtools__take_snapshot --verbose=true --filePath="carousel-dom-structure.txt"
   ```

5. **Testing funcionalidad click**:
   - Identificar elementos thumbnails con take_snapshot
   - Probar clicks en thumbnails usando mcp__chrome-devtools__click
   - Verificar cambio de imagen principal

Solo declarar la tarea completada después de verificar exitosamente con MCP Chrome DevTools y AI Vision MCP que:
- Las miniaturas están integradas dentro del contenedor principal
- El click en thumbnails funciona correctamente
- El scroll horizontal está implementado
- El diseño es minimalista como solicitado
- Funciona correctamente en mobile/tablet/desktop
- **Verificación visual confirmada con AI Vision MCP**: Los screenshots han sido analizados con el MCP AI Vision y confirman que el diseño se ve correctamente según los requisitos especificados
</verification>

<success_criteria>
Criterios de éxito:

1. **Estructura correcta**: Thumbnails están DENTRO del contenedor .embla principal

2. **Diseño minimalista**:
   - Miniaturas discretas y elegantes
   - Sin elementos decorativos innecesarios
   - Indicador sutil de estado activo

3. **Funcionalidad completa**:
   - Click en thumbnails carga imagen principal
   - Deslizamiento horizontal funciona con 14-18 thumbnails
   - Navegación por flechas y touch gestures funcionan

4. **Responsive optimizado con Tailwind**:
   - Desktop (lg:): 6-8 thumbnails visibles
   - Tablet (md:): 4-6 thumbnails visibles
   - Móvil (sm:): 3-4 thumbnails visibles con scroll horizontal

5. **Performance**: Sin impacto negativo en tiempos de carga, mantener lazy loading

6. **Consistencia**: Todos los productos (3 modelos: negras, camel, blancas) tienen el mismo comportamiento

7. **Git Integration**: Cambios correctamente commit y push para visualización en producción

8. **MCP Chrome DevTools + AI Vision MCP Verification**: Verificación completa con screenshots, testing responsive, funcionalidad y análisis visual con AI Vision MCP en https://rositarococo.com/astrocline
</success_criteria>