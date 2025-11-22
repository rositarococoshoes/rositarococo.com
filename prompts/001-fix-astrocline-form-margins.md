<objective>
Fix the margin issues in the astrocline checkout form sections where the "Resumen de Pedido" and "Formulario de Contacto" content expands to touch the screen edges without proper lateral margins, making it look bad on both mobile and desktop.

The goal is to apply consistent lateral margins that match the rest of the website pages, ensuring the content is properly contained, centered, and aligned consistently instead of being flush against the browser edges.
</objective>

<context>
This is for the Rosita Rococó e-commerce website located at `/astrocline/index.html`. The site uses Astro and Tailwind CSS.

The problematic section is the checkout form (`#restodelform`) which contains:
- Resumen de tu Pedido (Order Summary)
- Información de Contacto (Contact Information)
- Dirección de Envío (Shipping Address)
- Forma de Pago (Payment Method)

Currently, this section lacks proper container classes and margin/padding that other sections of the site have, causing it to span edge-to-edge on the viewport.

The site already uses consistent container classes like `max-w-7xl mx-auto px-4` in other sections like:
- Header navigation
- Product grid container
- Testimonials section

These existing patterns should be applied to the checkout form section for consistency.
</context>

<requirements>
1. Examine the current structure of the checkout form section in `/astrocline/index.html`
2. Identify the existing margin/padding patterns used in other sections of the site
3. Apply the same container classes to the checkout form section to ensure consistent lateral margins
4. Ensure the fix works responsively across both mobile and desktop viewports
5. Verify that the form content is properly contained and centered like other sections
6. Test that the styling is consistent with the rest of the website

The solution should use Tailwind CSS classes and match the existing design patterns already established in the codebase.
</requirements>

<implementation>
1. Read and analyze the current `/astrocline/index.html` file structure
2. Identify the problematic `#restodelform` section that lacks proper container classes
3. Examine how other sections (like product grid, testimonials, header) implement margins using classes like `max-w-7xl mx-auto px-4`
4. Apply the same container wrapper pattern to the checkout form section
5. Ensure the responsive design works correctly across different screen sizes
6. Test the implementation by checking the visual consistency with other sections

Key focus areas:
- The `#restodelform` div needs to be wrapped with proper container classes
- Form content should have consistent lateral margins matching other sections
- Mobile and desktop responsive behavior should be maintained
- No existing functionality should be broken
</implementation>

<output>
Modify the file `/astrocline/index.html` to fix the margin issues in the checkout form section by:

1. Adding proper container wrapper with classes like `max-w-7xl mx-auto px-4` around the `#restodelform` section
2. Ensuring the form content has consistent lateral margins that match other website sections
3. Maintaining responsive design across all viewport sizes

The fix should make the checkout form section visually consistent with the rest of the website's margin and spacing patterns.
</output>

<verification>
Before declaring the task complete, verify:

1. The checkout form section no longer spans edge-to-edge on the viewport
2. Lateral margins are consistent with other sections (header, product grid, testimonials)
3. Content is properly contained and centered on both mobile and desktop
4. Responsive behavior works correctly across different screen sizes
5. No existing form functionality is broken
6. Visual consistency is achieved throughout the website
7. Form elements are still accessible and usable

Test the solution on multiple viewport sizes to ensure the margins work consistently across devices.
</verification>

<success_criteria>
- The checkout form section has the same lateral margins as other website sections
- Content is properly contained and not touching screen edges on any device
- Visual consistency is maintained throughout the website
- Responsive design works correctly on mobile, tablet, and desktop
- All form functionality remains intact
- The solution follows existing Tailwind CSS patterns used in the codebase
- No additional horizontal scroll is introduced on smaller screens
</success_criteria>