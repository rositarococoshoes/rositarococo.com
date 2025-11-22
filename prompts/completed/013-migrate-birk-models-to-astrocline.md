<objective>
Migrate the Birk models (Birk Negras, Birk Camel, Birk Blancas) from the original index.html funnel to the /astrocline page, maintaining the same aesthetic, format, and functionality while preserving all images and materials information.
</objective>

<context>
This is a product migration task for the Rosita Rococó e-commerce site. The original index.html contains Birk model products that need to be integrated into the modern /astrocline page.

**Current Situation:**
- Original index.html has 3 Birk models with complete carousels, product information, and shopping functionality
- /astrocline currently displays only Guillerminas models (Negras, Camel, Blancas)
- /astrocline already has the image directories: birknegras/, birkcamel/, birkblancas/ with all product images
- Both pages use similar pricing structures and shopping cart functionality

**Target Structure:**
- /astrocline uses Embla Carousel with modern Tailwind CSS styling
- Products are displayed in a responsive grid layout (1-3 columns)
- Each product has: main carousel, thumbnails, product details, size selector, add to cart button
- Consistent pricing: 2 pairs for $95,000, individual $60,000, free shipping

**Image Analysis Required:**
- Birk Negras: 7 product images (1.webp through 7.webp) in /astrocline/birknegras/
- Birk Camel: 12 product images (1.webp through 12.webp) in /astrocline/birkcamel/
- Birk Blancas: 12 product images (1.webp through 12.webp) in /astrocline/birkblancas/
</context>

<research>
Thoroughly analyze the original index.html to understand:

1. **Birk Models Product Information:**
   - Exact product names and descriptions
   - Materials specifications (what materials are used)
   - Pricing structure and any special offers
   - Size ranges and availability
   - Product badges and special features

2. **Carousel Structure:**
   - Number of images per model
   - Image naming patterns and alt text structure
   - Thumbnail navigation implementation
   - Any special carousel features or configurations

3. **Form Integration:**
   - How size selectors work (quantity options, size ranges)
   - Add to cart button functionality and data attributes
   - Integration with the existing shopping cart system

4. **Design Patterns:**
   - Product card layout and styling
   - Typography and color schemes
   - Responsive behavior
   - Any special visual elements or branding

After analyzing the original, examine /astrocline/index.html to understand:
- Current product grid structure
- Embla Carousel implementation patterns
- Tailwind CSS classes and styling approach
- JavaScript integration for cart functionality
- Responsive design patterns

Use this research to ensure perfect migration of functionality while maintaining astrocline's modern aesthetic.
</research>

<requirements>
1. **Complete Product Migration:**
   - Add all 3 Birk models to the existing product grid in /astrocline
   - Maintain exact product information, materials, and specifications from original
   - Preserve all images with proper alt text and loading optimization

2. **Consistent Design Integration:**
   - Use the same product card structure as existing Guillerminas in /astrocline
   - Apply identical Tailwind CSS styling and responsive design
   - Maintain the same Embla Carousel configuration and behavior
   - Use consistent typography, colors, and spacing

3. **Functional Parity:**
   - Implement identical size selectors (35-40) with proper form integration
   - Ensure add to cart buttons work with existing shopping cart system
   - Maintain same pricing display and promotional information
   - Preserve any special product features or badges

4. **Image Optimization:**
   - Use existing images in /astrocline/birknegras/, /astrocline/birkcamel/, /astrocline/birkblancas/
   - Apply proper lazy loading and fetchpriority settings
   - Generate appropriate thumbnails for each product
   - Ensure responsive image behavior

5. **Code Quality:**
   - Follow the existing HTML structure and naming conventions
   - Use semantic HTML and accessibility best practices
   - Maintain clean, readable code with proper comments where needed
   - Ensure no conflicts with existing JavaScript or CSS
</requirements>

<implementation>
**Step 1: Analysis and Planning**
- Examine original index.html Birk model sections thoroughly
- Extract exact product information, materials, and specifications
- Document image counts and naming patterns for each model
- Understand pricing structure and promotional messaging

**Step 2: Structure Integration**
- Insert 3 new product cards in the existing product grid in /astrocline/index.html
- Follow the exact same HTML structure as existing Guillermina products
- Use appropriate data-attributes and IDs for JavaScript integration
- Maintain consistent CSS classes and Tailwind styling

**Step 3: Carousel Implementation**
- Create Embla Carousel instances for each Birk model
- Generate main carousel slides with all available images
- Create corresponding thumbnail navigation for each product
- Apply autoplay and navigation button configuration matching existing products

**Step 4: Product Information**
- Extract and migrate exact product titles, descriptions, and specifications
- Maintain materials information (likely "cuero" or "material específico")
- Preserve size ranges and availability information
- Apply consistent product badges and promotional messaging

**Step 5: Form Integration**
- Implement size selectors with identical functionality to existing products
- Ensure add to cart buttons have proper data-model attributes
- Maintain integration with existing shopping cart JavaScript
- Test form submission and cart functionality

**Critical Considerations:**
- The original uses Swiper carousel, but /astrocline uses Embla Carousel - adapt accordingly
- Maintain responsive design patterns (mobile-first approach)
- Ensure accessibility compliance with proper ARIA labels and semantic HTML
- Test cross-browser compatibility and responsive behavior
- Verify all image paths resolve correctly in the /astrocline context
</implementation>

<output>
Modify `/astrocline/index.html` to include the 3 Birk models by:

1. **Adding Product Cards:** Insert 3 new product cards in the existing product grid:
   - Birk Negras (7 images from /birknegras/)
   - Birk Camel (12 images from /birkcamel/)
   - Birk Blancas (12 images from /birkblancas/)

2. **Maintaining Structure:** Use the exact same HTML structure as existing Guillermina products:
   ```html
   <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
     <div class="product-content">
       <!-- Product Title, Carousel, Product Details, etc. -->
     </div>
   </div>
   ```

3. **Carousel Implementation:** For each model, create:
   - Main Embla carousel with all product images
   - Thumbnail navigation with corresponding images
   - Navigation buttons and autoplay functionality

4. **Product Details:** Include:
   - Product titles and descriptions
   - Materials and specifications
   - Pricing information ($60,000 individual, $95,000 for 2 pairs)
   - Size selectors (35-40)
   - Add to cart buttons with proper data attributes

The implementation should seamlessly integrate with the existing page while maintaining all functionality from the original Birk models.
</output>

<verification>
Before completing the migration, verify:

1. **Image Integration:**
   - All images load correctly from their respective directories
   - Alt text is descriptive and accurate
   - Lazy loading and optimization work properly

2. **Carousel Functionality:**
   - Main carousels advance properly with autoplay
   - Thumbnail navigation works correctly
   - Navigation buttons function as expected
   - Touch/swipe gestures work on mobile devices

3. **Shopping Cart Integration:**
   - Size selectors allow proper selection
   - Add to cart buttons successfully add products
   - Cart updates correctly with Birk model additions
   - Checkout process works with mixed products

4. **Responsive Design:**
   - Products display correctly on mobile (1 column)
   - Tablet layout works properly (2 columns)
   - Desktop layout maintains 3-column grid
   - All interactive elements remain accessible

5. **Cross-browser Compatibility:**
   - Test functionality in Chrome, Firefox, Safari
   - Ensure consistent behavior across devices
   - Validate HTML structure and CSS styling

Test the complete user flow from product selection through checkout to ensure seamless integration.
</verification>

<success_criteria>
- All 3 Birk models successfully displayed in /astrocline product grid
- Carousels function identically to existing Guillermina products
- Shopping cart properly handles Birk model additions
- Responsive design works across all device sizes
- No JavaScript errors or functionality conflicts
- Images load properly with optimization
- User experience is seamless and consistent
- Migration maintains original product information and functionality
</success_criteria>