<objective>
Fix vertical alignment of checkout step indicators and implement minimalist styling for order review section. The step numbers (1-2-3-4) should align perfectly vertically across all devices, and the order review section should have clean, minimal aesthetic while maintaining readability.

</objective>

<context>
This addresses checkout UI issues on the Rosita Rococó website. Currently:
1. Checkout step indicators (Información de Envío, Método de Pago, Revisar y Confirmar) don't align vertically - the numbers don't start at the same vertical line
2. The order review section (📋 Revisa tu Pedido y Datos) looks too much like an editable form rather than a clean review section

Files to examine and modify:
- astrocline/index.html (checkout step structure)
- astrocline/css/custom.css or inline styles
- Any relevant styling in astrocline/js/carousel.js
- Order review section styling

This builds on the previous prompt's fixes and prepares for the final cleanup steps.
</context>

<requirements>
1. Fix vertical alignment of checkout step indicators (numbers 1-2-3-4)
2. All step numbers must align at the same vertical starting line
3. Ensure alignment works on mobile and desktop devices
4. Redesign order review section with minimalist aesthetic
5. Remove form-like appearance, make it clearly read-only
6. Use clean typography, subtle spacing, minimal borders
7. Maintain full readability and accessibility
8. Consider using shadcn components for modern minimal styling

For the alignment issue:
- Use CSS Flexbox or Grid with consistent spacing
- Ensure all step numbers have same vertical position
- Test across different screen sizes

For minimalist styling:
- Use subtle colors (grays, light backgrounds)
- Minimal borders or dividers
- Clean typography with proper hierarchy
- Ample white space
- No interactive-looking elements
</requirements>

<implementation>
1. Examine current checkout step HTML structure
2. Identify where misalignment occurs (likely inconsistent padding/margins)
3. Implement CSS solution for perfect vertical alignment:
   - Use flexbox with align-items: center or start
   - Or use CSS Grid with proper alignment
   - Ensure consistent spacing for all step items

4. Redesign order review section:
   - Remove input-like styling
   - Use subtle backgrounds and borders
   - Implement clean typography scale
   - Add proper visual hierarchy
   - Consider card-based layout with minimal styling

5. Use shadcn components if available:
   - Card components for section containers
   - Typography utilities for clean text
   - Spacing utilities for consistent layout
   - Color utilities for subtle styling

6. Test responsive behavior:
   - Mobile-first approach
   - Ensure alignment works on all breakpoints
   - Verify readability on small screens
</implementation>

<output>
Modify files:
- `astrocline/index.html` - Update checkout step structure, add necessary classes
- `astrocline/css/custom.css` - Create new CSS rules for alignment and styling
- `astrocline/js/carousel.js` - Update any dynamic styling if needed

Add new CSS classes for:
- `.checkout-step-indicator` (for consistent step styling)
- `.checkout-step-number` (for perfectly aligned numbers)
- `.order-review-section` (minimalist review styling)
- Any utility classes needed for clean design
</output>

<verification>
Before declaring complete, verify:
1. Use Chrome DevTools to inspect checkout step alignment
2. Test on multiple viewport sizes (mobile, tablet, desktop)
3. Verify all step numbers align at exact same vertical position
4. Check that order review section looks minimalist and clean
5. Ensure no form-like interactive elements remain
6. Test accessibility (proper contrast, readable fonts)
7. Verify responsive behavior works correctly
8. Check that styling doesn't conflict with existing functionality

Visual verification:
- Take screenshots before/after for comparison
- Use browser developer tools to measure alignment
- Test on actual mobile devices if possible
</verification>

<success_criteria>
- Step numbers (1-2-3-4) align perfectly at same vertical line
- Alignment works consistently across all device sizes
- Order review section has clean, minimalist appearance
- No form-like interactive styling in review section
- Full accessibility maintained
- Responsive behavior works correctly
- No conflicts with existing functionality
- Modern, professional appearance that matches brand aesthetic
</success_criteria>