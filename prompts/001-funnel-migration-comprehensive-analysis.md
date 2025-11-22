<objective>
Realizar un análisis exhaustivo y comparación detallada entre el embudo de conversión original del sitio web Rosita Rococó y la versión migrada a Astro Client. El objetivo es identificar todas las diferencias de contenido, estructura, funcionalidad y comportamiento entre ambas versiones para asegurar que la migración se ha completado correctamente sin pérdida de características o errores críticos.

Este análisis será utilizado para:
- Validar la integridad de la migración a Astro
- Identificar regresiones funcionales o de contenido
- Generar un reporte ejecutivo con recomendaciones específicas
- Proporcionar evidencia técnica y visual de todas las diferencias encontradas
- Crear un plan de acción para corregir cualquier problema detectado
</objective>

<context>
Proyecto: Sitio web de e-commerce Rosita Rococó (calzado femenino)
Arquitectura original: HTML/CSS/JavaScript estático con múltiples páginas de checkout
Arquitectura migrada: Astro Client (Astro framework)

Componentes críticos del embudo a analizar:
- Página principal (index.html) - catálogo de productos
- Carrito de compras y validaciones
- Formularios de checkout (múltiples opciones de pago)
- Páginas de confirmación y pago exitoso
- Integraciones con WhatsApp para soporte
- Tracking y analíticas (Facebook Pixel, Google Analytics)
- Comportamiento responsive y mobile-first
- Validaciones de formularios y UX del flujo de compra

Archivos y directorios relevantes:
- Directorio raíz: index.html y archivos asociados del embudo original
- Directorio astroline/: versión migrada a Astro Client
- Assets externos, imágenes, scripts de tracking
- Hojas de estilos CSS y comportamientos JavaScript
</context>

<requirements>
Tareas específicas a ejecutar:

1. INVENTARIO COMPLETO DE PÁGINAS:
   - Mapear todas las páginas del embudo original comenzando desde index.html
   - Identificar todas las rutas, redirecciones y flujos de navegación
   - Catalogar las páginas equivalentes en astroline/
   - Documentar la estructura completa del funnel en ambas versiones

2. ANÁLISIS DE CONTENIDO Y ESTRUCTURA:
   - Comparación página por página de contenido textual
   - Análisis de estructura DOM y elementos HTML
   - Comparación de metadatos, títulos, descripciones
   - Validación de imágenes, videos y assets multimedia
   - Revisión de enlaces internos y redirecciones
   - Análisis de estilos CSS y clases aplicadas

3. ANÁLISIS FUNCIONAL COMPLETO:
   - Scripts JavaScript y manipulación del DOM
   - Validaciones de formularios y lógica de negocio
   - Comportamiento del carrito de compras
   - Flujos de pago simulados y procesamiento
   - Integraciones con plataformas externas (WhatsApp, pasarelas)
   - Tracking y analíticas (píxeles, eventos, conversiones)
   - Comportamiento responsive y mobile compatibility

4. ANÁLISIS TÉCNICO PROFUNDO:
   - Revisión de consola para errores y warnings
   - Análisis de red (network) para requests fallidas
   - Validación de carga de assets externos
   - Performance y tiempos de carga
   - Accesibilidad y usabilidad
   - SEO y metadatos estructurados

Herramientas obligatorias a utilizar:
- Chrome DevTools MCP para inspección técnica y capturas
- Sequential Thinking MCP para razonamiento estructurado
- AI Vision MCP para análisis visual comparativo
- Video local semántico para análisis de comportamientos grabados si existe material relevante
- Análisis de logs y console outputs
- Capturas de pantalla comparativas
</requirements>

<methodology>
Ejecución paso a paso:

1. PREPARACIÓN (Método Sequential Thinking):
   - Analizar estructura del proyecto original
   - Identificar todas las páginas y rutas del embudo
   - Mapear correspondencias con versión Astro
   - Planificar análisis sistemático

2. ANÁLISIS TÉCNICO (Chrome DevTools):
   - Abrir cada página en modo incógnito
   - Capturar screenshots en múltiples resoluciones
   - Analizar consola para errores y warnings
   - Revisar pestaña Network para requests fallidas
   - Inspeccionar DOM y estilos computados
   - Probar funcionalidades interactivas

3. COMPARACIÓN VISUAL (AI Vision):
   - Capturar pantallas comparativas lado a lado
   - Analizar diferencias visuales, layout, contenido
   - Identificar elementos faltantes o incorrectos
   - Validar renderizado de imágenes y assets

4. VALIDACIÓN FUNCIONAL:
   - Ejecutar flujos completos de usuario
   - Probar formularios y validaciones
   - Verificar comportamiento del carrito
   - Testear integraciones externas

5. DOCUMENTACIÓN:
   - Registrar cada diferencia con evidencia
   - Clasificar por criticidad (Crítico/Alto/Medio/Bajo)
   - Asociar con impacto en negocio/conversión
   - Generar recomendaciones específicas
</methodology>

<output>
Archivo de reporte principal:
- `./reporte-migracion-embudo-Astro-Client.md` - Reporte completo con todo el análisis

Carpeta de evidencias (crear si no existe):
- `./evidencias-migracion/` - Capturas de pantalla, logs, archivos de soporte
- Organizar por página y tipo de diferencia
- Incluir timestamps y referencias cruzadas

El reporte principal debe incluir:

1. RESUMEN EJECUTIVO:
   - Objetivo del análisis
   - Metodología utilizada
   - Hallazgos principales
   - Impacto general en el negocio

2. METODOLOGÍA Y HERRAMIENTAS:
   - Descripción del proceso analítico
   - Herramientas MCP utilizadas
   - Criterios de evaluación
   - Limitaciones del análisis

3. INVENTARIO DE PÁGINAS:
   - Embudo original: lista completa de páginas y rutas
   - Versión Astro: correspondencias y estado
   - Matriz de trazabilidad entre versiones

4. ANÁLISIS COMPARATIVO DETALLADO:
   - Comparación página por página
   - Diferencias de contenido detectadas
   - Diferencias funcionales identificadas
   - Problemas técnicos encontrados
   - Análisis de performance y UX

5. CLASIFICACIÓN DE DIFERENCIAS:
   - Diferencias Críticas (bloquean conversion)
   - Diferencias Altas (afectan UX o tracking)
   - Diferencias Medias (cosméticas o menores)
   - Diferencias Bajas (optimizables)

6. EVIDENCIAS:
   - Referencias a capturas en carpeta evidencias-migracion/
   - Logs de consola y errores
   - Análisis visual comparativo
   - Pruebas funcionales ejecutadas

7. RECOMENDACIONES:
   - Plan de acción prioritario
   - Pasos específicos para corrección
   - Responsables y plazos sugeridos
   - Métricas para validar correcciones

8. ANEXOS:
   - Glosario de términos
   - Referencias técnicas
   - Scripts o comandos utilizados
   - Contacto para consultas
</output>

<constraints>
RESTRICCIONES IMPORTANTES:

- NO modificar ningún archivo existente del proyecto
- NO publicar cambios en GitHub
- NO realizar cambios en producción
- SOLO realizar análisis de lectura y captura
- Respetar la estructura existente de archivos
- Mantener copias de seguridad de cualquier evidencia generada
- Documentar TODAS las diferencias encontradas, por menores que sean

CONSIDERACIONES CRÍTICAS:
- El embudo de conversión es crítico para ingresos del negocio
- Cualquier diferencia puede impactar tasas de conversión
- El tracking y analíticas deben ser idénticos
- La experiencia mobile debe ser prioridad
- Las validaciones de formularios son esenciales
- El rendimiento afecta conversión significativamente

CRITERIOS DE CRITICIDAD:
- Crítico: Bloquea completamente el flujo de compra
- Alto: Degrada significativamente la UX o afecta tracking
- Medio: Impacta visualmente o causa confusión menor
- Bajo: Diferencia cosmética o optimizable
</constraints>

<success_criteria>
El análisis se considerará completo cuando:

1. Todas las páginas del embudo original han sido identificadas y analizadas
2. Cada página tiene su correspondiente en la versión Astro (o se identifica como faltante)
3. Todas las diferencias (contenido, funcionalidad, visual) han sido documentadas
4. Cada diferencia tiene evidencia técnica o visual respaldatoria
5. Las diferencias están clasificadas por criticidad con impacto estimado
6. El reporte Markdown contiene todas las secciones requeridas
7. Las recomendaciones son específicas, accionables y priorizadas
8. La carpeta de evidencias contiene soporte visual y técnico organizado
9. El análisis utiliza todas las herramientas MCP especificadas
10. El reporte final es entregable para toma de decisiones ejecutivas

VERIFICACIÓN OBLIGATORIA ANTES DE FINALIZAR:
- Revisar que no quede ninguna página sin analizar
- Validar que todas las capturas de pantalla sean claras
- Confirmar que todos los logs de consola han sido revisados
- Asegurar que el reporte tenga formato profesional y ejecutivo
- Verificar que las recomendaciones sean implementables específicamente
</success_criteria>