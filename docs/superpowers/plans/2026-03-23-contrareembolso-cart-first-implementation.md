# Contrareembolso Cart-First Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir el embudo `2026` de contrareembolso a una mecánica cart-first donde cada agregado suma un solo par y la promo de 2 pares se resuelve solo en el carrito.

**Architecture:** La lógica de estados y mensajes del carrito se extrae a helpers testeables en `funnel-utils.js`. `ContrareembolsoLanding.js` simplifica las cards de producto, renderiza el carrito con líneas independientes y usa esos helpers para copy, CTA y estados. El export estático final sigue saliendo a `2026/`.

**Tech Stack:** Next.js 16 static export, React client components, Node test runner, Playwright MCP.

---

### Task 1: Modelar estados cart-first en helpers

**Files:**
- Modify: `2026/_next-src/src/lib/funnel-utils.js`
- Test: `2026/_next-src/test/funnel-utils.test.mjs`

- [ ] **Step 1: Write failing tests for cart-first state**

Agregar tests para:
- `getCartPhase(0|1|2)`
- `getCartHeadline(0|1|2)`
- `getPostAddMessage(1|2)`

- [ ] **Step 2: Run test to verify it fails**

Run: `node test\\funnel-utils.test.mjs`
Expected: FAIL por funciones inexistentes.

- [ ] **Step 3: Implement minimal helpers**

Implementar helpers pequeños y puros para:
- estado del carrito
- headline del carrito
- mensajes después de agregar

- [ ] **Step 4: Run test to verify it passes**

Run: `node test\\funnel-utils.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add 2026/_next-src/src/lib/funnel-utils.js 2026/_next-src/test/funnel-utils.test.mjs
git commit -m "Add cart-first funnel helpers"
```

### Task 2: Simplificar card de producto a 1 agregado por vez

**Files:**
- Modify: `2026/_next-src/src/components/ContrareembolsoLanding.js`

- [ ] **Step 1: Remove pair-intent UI from product cards**

Eliminar:
- selector `1 par / 2 pares`
- copy `Talle par 1`
- copy `Agregar este par y elegir el segundo`

Dejar:
- precios visibles
- selector único de talle
- botón `Agregar al pedido`

- [ ] **Step 2: Wire product add to single-line cart entries**

Cada click debe agregar exactamente:
- `productId`
- `size`
- `id`

- [ ] **Step 3: Verify local behavior manually in component logic**

Revisar que ningún branch siga dependiendo de `bundleIntent`.

- [ ] **Step 4: Commit**

```bash
git add 2026/_next-src/src/components/ContrareembolsoLanding.js
git commit -m "Simplify product cards to single-pair add flow"
```

### Task 3: Rehacer carrito mobile-first con líneas independientes

**Files:**
- Modify: `2026/_next-src/src/components/ContrareembolsoLanding.js`
- Modify: `2026/_next-src/app/globals.css`

- [ ] **Step 1: Replace grouped cart rendering with independent lines**

Cada línea debe mostrar:
- miniatura
- modelo
- talle
- botón `Quitar`

- [ ] **Step 2: Add cart states and contextual copy**

Estados:
- vacío
- 1 par
- 2 pares

Mensajes:
- incentivo a sumar segundo par
- promo activada

- [ ] **Step 3: Make CTA non-blocking on mobile**

Mantener CTA discreto cuando hay 1 par y más claro cuando hay 2, sin interceptar taps sobre productos.

- [ ] **Step 4: Commit**

```bash
git add 2026/_next-src/src/components/ContrareembolsoLanding.js 2026/_next-src/app/globals.css
git commit -m "Rework cart to cart-first mobile flow"
```

### Task 4: Export, publish and verify scenarios

**Files:**
- Modify: `2026/` export artifacts

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 2: Export static site**

Run: `npm run export:site`
Expected: export actualizado en `2026/`.

- [ ] **Step 3: Verify scenarios with Playwright**

Verificar:
- 1 par checkout directo
- 2 pares distintos
- 2 pares mismo modelo mismo talle
- 2 pares mismo modelo distinto talle

- [ ] **Step 4: Push**

```bash
git push origin HEAD:master
```
