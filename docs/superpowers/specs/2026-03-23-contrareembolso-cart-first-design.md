# Contrareembolso Cart-First Design

**Date:** 2026-03-23
**Scope:** `2026` funnel de contrareembolso en Next.js
**Primary user:** compradoras mobile-first, incluyendo personas mayores que necesitan un flujo muy claro, corto y perdonable

## Goal

Reemplazar la lógica actual de selección de pares por una mecánica de compra centrada en el carrito, donde cada interacción agrega exactamente un par y la promo de 2 pares se activa automáticamente al completar el segundo agregado.

## Context

El flujo actual mezcla dos modelos mentales:

- elegir un producto individual
- configurar una promo de 2 pares dentro de una sola card

Eso introduce fricción innecesaria:

- etiquetas como `Talle par 1` no son naturales
- obliga a pensar la promo antes de empezar a comprar
- complica escenarios que deberían ser simples:
  - 2 pares del mismo modelo
  - 2 pares de modelos distintos
  - 2 pares del mismo talle
  - 2 pares de talles distintos

La nueva experiencia debe hacer que todas esas variantes salgan del mismo patrón simple.

## Design Principles

- `1 toque = 1 par agregado`
- la card de producto no decide el pedido completo
- el carrito es la fuente de verdad del estado del pedido
- la promo se explica en la card, pero se resuelve en el carrito
- el flujo debe priorizar celulares y ser comprensible para personas mayores
- evitar modales y overlays que interrumpan o tapen acciones críticas

## Proposed Interaction Model

### 1. Product card

Cada card debe mostrar:

- fotos del modelo
- precio de `1 par`
- precio promo de `2 pares`
- selector único de talle
- botón `Agregar al pedido`

Cada clic en `Agregar al pedido` suma una línea nueva al carrito con:

- modelo
- talle
- miniatura

La card no debe mostrar:

- `Talle par 1`
- `Talle par 2`
- configuradores de bundle
- botones distintos para “agregar primer par” vs “agregar segundo par”

### 2. Promo behavior

Reglas:

- `1 par` => `$70.000`
- `2 pares` => `$110.000` con envío gratis
- el segundo par puede ser:
  - del mismo modelo
  - de otro modelo
  - del mismo talle
  - de otro talle
- el embudo mantiene tope de `2 pares`

La promo se activa sola al existir 2 líneas en el carrito.

### 3. Feedback after add

Después de agregar el primer par:

- mostrar confirmación contextual visible pero discreta
- no abrir modal
- no forzar scroll a checkout
- no bloquear botones de producto

Contenido recomendado:

- `Agregaste 1 par al pedido`
- `Suma otro par y activa la promo de 2 pares por $110.000`

Acciones sugeridas:

- `Seguir viendo modelos`
- `Ver pedido`

El segundo agregado debe confirmar:

- `Promo activada`
- `2 pares por $110.000 con envío gratis`

### 4. Cart design

El carrito debe ser mobile-first y mostrar líneas independientes, no grupos.

Cada línea incluye:

- miniatura
- nombre del modelo
- talle
- botón `Quitar`

No agrupar por modelo+talle en esta versión, porque el usuario pidió líneas independientes y eso hace más explícito qué pidió exactamente.

### 5. Cart states

#### Empty

- `Todavía no agregaste pares`
- CTA suave para seguir viendo productos

#### One pair

- `Tienes 1 de 2 pares`
- total actual: `$70.000`
- mensaje de incentivo:
  - `Te falta 1 par para activar la promo`
- acciones:
  - `Seguir agregando`
  - `Finalizar con 1 par`

#### Two pairs

- `Promo activada`
- total final: `$110.000`
- mensaje:
  - `Envío gratis incluido`
- acción principal:
  - `Finalizar pedido`

## UX Copy Changes

### Replace

- `Talle par 1`
- `Agregar este par y elegir el segundo`
- `Primer par listo`

### With

- `Selecciona tu talle`
- `Agregar al pedido`
- `Agregaste 1 par al pedido`
- `Suma otro par para activar la promo`

## Mobile Constraints

- ningún toast, barra o CTA flotante puede interceptar taps sobre botones de producto
- el estado del carrito debe seguir siendo visible sin ocupar demasiado alto de pantalla
- el CTA flotante debe ser compacto cuando hay 1 par y puede crecer cuando ya hay 2 pares
- el recorrido principal sigue siendo:
  - ver producto
  - elegir talle
  - agregar
  - repetir si quiere promo

## Scenarios That Must Work

1. 1 par de un modelo, checkout directo
2. 2 pares de modelos distintos
3. 2 pares del mismo modelo y mismo talle
4. 2 pares del mismo modelo y distinto talle
5. agregar 1 par, quitarlo, seguir comprando
6. agregar 2 pares y quitar uno, volviendo al estado de 1 par

## Testing Requirements

- probar cada escenario en móvil real o emulado
- validar que ninguna capa flotante tape el segundo agregado
- confirmar que el total cambia correctamente:
  - 1 línea => `$70.000`
  - 2 líneas => `$110.000`
- validar que el checkout resume exactamente las líneas del carrito

## Files Likely Affected

- `2026/_next-src/src/components/ContrareembolsoLanding.js`
- `2026/_next-src/app/globals.css`
- `2026/_next-src/src/lib/funnel-utils.js`
- `2026/index-contrareembolso.html`

## Recommendation

Implementar el flujo `cart-first` manteniendo los precios promocionales visibles en cada card, pero moviendo toda la lógica del pedido al carrito. Es la opción más clara, menos ambigua y más robusta para mobile y para usuarias con baja tolerancia a interfaces complejas.
