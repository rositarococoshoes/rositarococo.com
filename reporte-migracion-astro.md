# Reporte de Estado Actual de la Migración a Astro – Rosita Rococó

## 1. Cobertura actual en Astro

### Embudo de pago anticipado

- Embudo completo y operativo en [`rositaastro/src/pages/index.astro`](rositaastro/src/pages/index.astro:1).
- Utiliza [`MainLayout.astro`](rositaastro/src/layouts/MainLayout.astro:1) como layout unificado:
  - Estructura HTML optimizada.
  - Metadatos, preconnect, preload y carga de scripts centralizada.
  - Integración de Facebook Pixel y dual tracking.
- Catálogo dinámico basado en [`indexProducts` de `productData.ts`](rositaastro/src/data/productData.ts:29).
- Presentación uniforme de productos con [`ProductCard.astro`](rositaastro/src/components/ProductCard.astro:1).
- Minicart unificado mediante [`MiniCart.astro`](rositaastro/src/components/MiniCart.astro:19).
- Testimonios centralizados con [`Testimonials.astro`](rositaastro/src/components/Testimonials.astro:1).
- Checkout integrado con [`CheckoutForm.astro`](rositaastro/src/components/CheckoutForm.astro:1), compatible con lógica y endpoints legacy.
- Resultado: embudo principal ya migrado a Astro con componentes reutilizables y experiencia consistente.

### Embudo de contra reembolso

- Embudo específico en [`rositaastro/src/pages/contrarreembolsonueva.astro`](rositaastro/src/pages/contrarreembolsonueva.astro:1).
- Usa [`MainLayout.astro`](rositaastro/src/layouts/MainLayout.astro:14) con flag `isContrareembolso` para ajustar scripts y tracking.
- Integra [`Header.astro`](rositaastro/src/components/Header.astro:1) con mensajes adaptados.
- Usa [`contrareembolsoProducts` de `productData.ts`](rositaastro/src/data/productData.ts:275) con [`ProductCard.astro`](rositaastro/src/components/ProductCard.astro:35).
- Incluye [`MiniCart.astro`](rositaastro/src/components/MiniCart.astro:1), [`Testimonials.astro`](rositaastro/src/components/Testimonials.astro:1) y [`CheckoutForm.astro`](rositaastro/src/components/CheckoutForm.astro:1) configurados para contrareembolso.
- Resultado: embudo de contrareembolso funcional en Astro, apoyado fuertemente en lógica JS legacy para carrito, carruseles, fechas y resumen.

### Síntesis de cobertura

- Pago anticipado y contra reembolso ya cuentan con versiones en Astro sobre un mismo layout y set de componentes.
- La capa de presentación está mayormente unificada en Astro, manteniendo compatibilidad con la lógica legacy.

---

## 2. Dependencias del legacy todavía críticas

- Scripts legacy cargados global o condicionalmente desde [`MainLayout.astro`](rositaastro/src/layouts/MainLayout.astro:148):
  - jQuery, jQuery UI, jQuery Form.
  - Swiper desde CDN.
  - `/js/otono-elegante2.js` y similares para carrito, totales, promos, steps.
  - `/js/form-handler.js` y variantes de contrareembolso.
  - `/js/chat-widget.js`, `/js/chat-widget-contrareembolso.js`.
  - `/js/whatsapp-float.js`.
  - `/js/carrusel-nuevos.js` y otros scripts visuales.
- Contratos estructurales mantenidos en componentes Astro:
  - [`MiniCart.astro`](rositaastro/src/components/MiniCart.astro:1), [`ProductCard.astro`](rositaastro/src/components/ProductCard.astro:1) y [`CheckoutForm.astro`](rositaastro/src/components/CheckoutForm.astro:1) exponen IDs, clases y `name` de campos alineados al JS legacy y formularios externos.
  - Botones, anchors y modales dependen de funciones globales (por ejemplo `updateCartSummary`, navegación al checkout, WhatsApp, etc.).
- Landings legacy activas en el código:
  - [`index.html`](index.html:1), [`contrarreembolsonueva.html`](contrarreembolsonueva.html:1) y múltiples variantes históricas siguen en la raíz.
- Conclusión:
  - La lógica de negocio crítica (carrito, precios, validaciones, orquestación de checkout, parte del tracking) sigue residiendo en el stack legacy y es consumida por Astro mediante convenciones rígidas.

---

## 3. Estado de componentes reutilizables

- [`MainLayout.astro`](rositaastro/src/layouts/MainLayout.astro:1)
  - Shell común para embudos en Astro.
  - Alta madurez funcional.
  - Sobrecarga de responsabilidades: estructura, estilos, tracking, helpers y lógica de negocio.

- [`Header.astro`](rositaastro/src/components/Header.astro:1)
  - Encabezado parametrizable con beneficios y mensajes.
  - Uso consistente en contrarreembolso.
  - En index.astro parte del header sigue inline: reutilización parcial.

- [`ProductCard.astro`](rositaastro/src/components/ProductCard.astro:1)
  - Componente central sólido.
  - Reutilizado en pago anticipado y contrareembolso.
  - Mantiene compatibilidad con scripts legacy.

- [`MiniCart.astro`](rositaastro/src/components/MiniCart.astro:1)
  - Marco visual único del minicart.
  - Depende totalmente de lógica JS externa.
  - Presenta cierta duplicación interna de estructura.

- [`CheckoutForm.astro`](rositaastro/src/components/CheckoutForm.astro:1)
  - Uno de los componentes más maduros.
  - Unifica flujo de pago anticipado y contrareembolso.
  - Respeta contratos con handlers legacy y sistemas externos.

- [`Testimonials.astro`](rositaastro/src/components/Testimonials.astro:1)
  - Centraliza layout y comportamiento de testimonios.
  - Usa mecanismo de inicialización controlada.
  - Muy cercano al ideal de componente único reutilizable.

- [`productData.ts`](rositaastro/src/data/productData.ts:1)
  - Fuente única de datos de productos en Astro.
  - Tipado claro y organizado por embudo.

- Conclusión:
  - Existe ya un sistema de componentes robusto y compartido.
  - Falta terminar de alinear todos los usos (ej. headers) y separar mejor lógica transversal.

---

## 4. Riesgos técnicos

1. Dependencia alta del legacy
   - Cambios en scripts legacy o estructura esperada pueden romper los embudos Astro.
   - Dificulta pruebas, versionado y control de calidad.

2. Sobrecarga en [`MainLayout.astro`](rositaastro/src/layouts/MainLayout.astro:1)
   - Un solo archivo concentra layout, tracking, WhatsApp, helpers y más.
   - Incrementa complejidad y riesgo de efectos colaterales.

3. Duplicaciones e inconsistencias
   - Headers y barras de beneficios parcialmente duplicados entre componentes y páginas.
   - Estructura del MiniCart con elementos repetidos.
   - Potencial doble fuente para testimonios si se replica lógica fuera del componente dedicado.

4. Convivencia de landings legacy
   - HTML antiguos en raíz sin estrategia explícita de desactivación/redirect.
   - Riesgo de campañas apuntando a versiones desactualizadas.
   - Fragmentación de métricas y experiencia.

5. Tracking distribuido y complejo
   - Eventos definidos en Astro + scripts legacy.
   - Riesgo de doble disparo, datos inconsistentes y baja trazabilidad.

6. Performance
   - Carga global de múltiples librerías (jQuery, Swiper, scripts pesados).
   - Aprovechamiento parcial de las ventajas de Astro (islas, carga selectiva).

---

## 5. Siguientes pasos recomendados de migración (alto nivel)

- Definir URLs canónicas:
  - Establecer oficialmente las páginas Astro como destino único de cada embudo clave y ajustar campañas/redirecciones.

- Modularizar el layout:
  - Extraer de [`MainLayout.astro`](rositaastro/src/layouts/MainLayout.astro:1) módulos dedicados para:
    - Tracking.
    - WhatsApp / chat.
    - Mensajes globales / overlays.
    - Estilos y scripts específicos por sección o embudo.

- Unificar encabezados:
  - Normalizar el uso de [`Header.astro`](rositaastro/src/components/Header.astro:1) (o variantes configurables) en todos los embudos Astro para mensajes coherentes.

- Consolidar testimonios y minicart:
  - Asegurar que [`Testimonials.astro`](rositaastro/src/components/Testimonials.astro:1) sea única fuente de testimonios.
  - Simplificar [`MiniCart.astro`](rositaastro/src/components/MiniCart.astro:1) y documentar su contrato como referencia central.

- Migrar lógica crítica al ecosistema Astro:
  - Identificar funciones clave del legacy (carrito, totales, promos, validaciones, fechas de entrega).
  - Reimplementarlas progresivamente en módulos internos, manteniendo adaptadores temporales.

- Depurar landings legacy:
  - Inventariar HTML antiguos.
  - Archivar, eliminar o redirigir según estrategia comercial y SEO.

- Ordenar el tracking:
  - Definir una arquitectura única de medición sobre Astro.
  - Eliminar redundancias, normalizar eventos y facilitar auditoría.

- Optimizar carga de recursos:
  - Revisar librerías y scripts realmente necesarios por embudo.
  - Aplicar carga condicionada y patrones de islas para maximizar performance mobile.