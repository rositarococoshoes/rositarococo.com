## Argos Model Card Fix Analysis

**ISSUE IDENTIFIED:**
The Argos product card HTML has been incorrectly inserted inside the "Agregar al Carrito" button of the Birk Blancas product. This is causing:
- Carousel functionality to be broken
- Layout issues and overlaps
- Malformed button with excessive text content
- Argos images not properly displayed as a separate product

**CURRENT MALFORMED STRUCTURE:**
```html
<button class="add-to-cart-btn..." data-model="birk-blancas">
  <svg>...</svg>
  Agregar al Carrito
  <!-- PRODUCTO: Argos --> [ENTIRE ARGOS PRODUCT CARD HTML HERE]
</button>
```

**REQUIRED FIX:**
1. Remove the Argos content from inside the Birk Blancas button
2. Create a proper Argos product card as a separate element in the product grid
3. Ensure the Argos card follows the same structure as working models (Guillermina/Birk)

**CORRECT STRUCTURE NEEDED:**
```html
<!-- PRODUCTO: Argos -->
<div class="rounded-lg border bg-card text-card-foreground shadow-sm {className}" data-astro-cid-tjdfhdqb="">
  <div class="product-content" data-astro-cid-tjdfhdqb="">
    <!-- Product Title -->
    <h2 class="text-base md:text-lg font-bold text-gray-900 mb-2 text-center" data-astro-cid-tjdfhdqb="">Argos</h2>
    
    <!-- Carousel with 16 images (1.webp through 16.webp) -->
    <!-- Thumbnails -->
    <!-- Product Details -->
    <!-- Size Selector -->
    <!-- Add to Cart Button -->
  </div>
</div>
```

**ARGOS SPECIFICATIONS:**
- Images: /astrocline/argos/1.webp through 16.webp (16 images total)
- Description: "Dale brillo a tus pasos con estas sandalias negras estilo T-strap y faja de strass. Fusionan tendencia y confort gracias a su suela cómoda y punta cuadrada, ideales para elevar tus looks de día y noche con un toque sofisticado."
- Material: Ecocuero
- Suela: Antideslizante
- Price: Same as other models ($60.000 individual, $95.000 for 2 pairs)
- Product ID: "argos"