<objective>
Fix the logo height distortion issue on https://rositarococo.com/astrocline/ where the logo appears taller than its actual image size, causing visual distortion. The problem is caused by the CSS class .h-16 applying a fixed height of 4rem to the logo image.
</objective>

<context>
This is for the Rosita Rococó e-commerce website specializing in women's footwear. The logo distortion affects the brand presentation and visual consistency of the site header. The logo image should display at its natural aspect ratio without being stretched or compressed.

Current problematic code:
```html
<img src="/astrocline/rosita-form.webp" alt="Rosita Rococó Logo" class="mx-auto h-16">
```

The .h-16 CSS class applies: `height: 4rem;` which forces the image to be taller than its natural dimensions.
</context>

<requirements>
1. Remove the height distortion from the logo image
2. Ensure the logo displays at its natural aspect ratio
3. Maintain responsive behavior across different screen sizes
4. Preserve the centered alignment (mx-auto)
5. Keep the logo appropriately sized relative to the header layout
6. Ensure the fix works across desktop, tablet, and mobile viewports

</requirements>

<implementation>
Examine the current logo implementation in the astrocline directory and identify the specific file(s) containing the problematic logo element. Replace the fixed height approach with one of these solutions:

1. **Option 1: Use max-height instead of fixed height**
   - Replace `h-16` with `max-h-16` to allow natural aspect ratio while limiting maximum height

2. **Option 2: Use object-fit with explicit dimensions**
   - Apply both width and height constraints with `object-fit: contain` to maintain aspect ratio

3. **Option 3: Use responsive sizing**
   - Implement responsive height classes that adapt to different viewport sizes

Choose the approach that best maintains the visual hierarchy while preventing distortion.

Avoid:
- Fixed height without width constraints (causes distortion)
- Removing all sizing constraints (may make logo too large/small)
- Hard-coded pixel values (breaks responsiveness)
</implementation>

<output>
Fix the logo sizing issue by modifying the relevant HTML file(s) in the ./astrocline/ directory:
- Identify the file containing `<img src="/astrocline/rosita-form.webp" alt="Rosita Rococó Logo" class="mx-auto h-16">`
- Update the CSS classes to prevent height distortion
- Test the fix across different screen sizes
</output>

<verification>
Before declaring complete, verify your work:
1. Check that the logo displays at its natural aspect ratio (no stretching/compression)
2. Test responsiveness across desktop, tablet, and mobile viewports
3. Confirm the logo remains appropriately sized relative to header elements
4. Validate that the centered alignment (mx-auto) is preserved
5. Ensure no other elements are affected by the CSS changes

Use browser developer tools to inspect the logo element and confirm the rendered dimensions match the image's natural aspect ratio.
</verification>

<success_criteria>
The logo displays at its natural aspect ratio without any height distortion, maintains appropriate sizing across all viewports, and preserves the centered alignment in the header.
</success_criteria>