# product.md

Rosita Rococó es un ecommerce especializado en calzado femenino cómodo, moderno, estético y accesible para Argentina, con foco absoluto en conversión desde tráfico pago (principalmente Meta Ads) y experiencia mobile-first.

## Problema que resuelve

- Mujeres que buscan calzado cómodo para el día a día, con diseño actual y precios alcanzables.
- Necesidad de una experiencia de compra rápida, clara y confiable desde el celular, sin fricción técnica ni confusión en el flujo.
- Negocio que requiere embudos de venta medibles, escalables y fáciles de ajustar sin depender de una plataforma compleja.

## Cómo debe funcionar el producto digital

1. Embudos principales

- Embudo de pago anticipado:
  - Punto de entrada histórico: [`index.html`](index.html:1).
  - Migración a Astro en [`rositaastro/`](rositaastro/:1) como flujo oficial.
  - Presentación clara de beneficios, modelos, talles y combos.
  - Selección de productos + minicart con resumen.
  - Checkout/lead con datos completos para pago anticipado.
  - Tracking correcto de eventos clave (pageview, view content, add to cart, initiate checkout, purchase/lead).

- Embudo de contra reembolso:
  - Punto de entrada histórico: `contrarreembolsonueva.html` y variantes.
  - Migración a Astro en [`rositaastro/`](rositaastro/:1) como flujo oficial.
  - Mensaje enfocado en confianza: pago al recibir, envío a todo el país, política clara.
  - Formulario optimizado para capturar datos necesarios para logística y confirmación.
  - Minimizar pasos y campos irrelevantes.
  - Tracking de leads y performance del embudo.

2. Reglas clave del producto

- Mobile-first:
  - Todo el diseño, tipografía, spacing, CTAs y formularios priorizan uso desde smartphone.
  - Sin scroll horizontal, sin zoom obligatorio, sin elementos tapados.

- Performance:
  - Landings ultra livianas.
  - Carga rápida incluso con 3G/4G.
  - Sin dependencias pesadas innecesarias.

- Claridad comercial:
  - Beneficios arriba (hero fuerte).
  - Pruebas sociales (testimonios, reseñas, tiempo vendiendo).
  - Información de envíos, cambios, medios de pago siempre visible o fácil de encontrar.

- Confianza:
  - Señales visuales: logo, identidad consistente, colores coherentes.
  - Mensajes de garantía, soporte por WhatsApp, años de experiencia.

- Simplicidad operativa:
  - Formularios que se integran con herramientas ya usadas por el negocio (Google Forms, planillas, CRMs simples, notificaciones).
  - Evitar lógica de backend compleja: todo debe resolverse con servicios externos o automatizaciones conectadas al front.

## Objetivos medibles

- Incrementar tasa de conversión de sesiones a leads/pedidos en ambos embudos.
- Reducir errores:
  - Cero JS errors en consola en producción.
  - Cero 404 en assets críticos.
- Homogeneizar experiencia entre embudos:
  - Mismo nivel de calidad visual y técnica en pago anticipado y contra reembolso.
- Asegurar que todo pueda publicarse como sitio estático (GitHub Pages) sin requerir infraestructura adicional, respetando rutas y configuración del repo.

## Lineamientos para cualquier cambio futuro

- Cualquier nueva landing, variante, test A/B o ajuste debe:
  - Encajar dentro de la arquitectura en Astro.
  - Reutilizar componentes establecidos (header, product card, testimonials, minicart, checkout).
  - Mantener compatibilidad con publicación estática en GitHub Pages.
  - Mantener el foco en los dos embudos principales: pago anticipado y contra reembolso, evitando dispersión en funcionalidades no estratégicas.
