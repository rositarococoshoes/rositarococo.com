<objective>
Fix the Argos model card and carousel that currently has broken functionality and inconsistent styling. The carousel doesn't work, it overlaps with the "add to cart" button of the model above, and it doesn't follow the same structure as other working models (Guillermina or Birk). Clone a working model structure and adapt it for Argos with proper images and content.
</objective>

<context>
This is for the Rosita Rococó footwear website where each product model has its own card with carousel functionality. The Argos model currently has significant issues:
- Carousel functionality is broken
- Visual layout doesn't match other models
- Overlaps with product above it
- Different structure from working models (Guillermina, Birk)

The website uses a consistent card structure across all models with:
- Product name and description
- Image carousel with thumbnails
- Add to cart functionality
- Consistent styling and layout

Working models to use as reference:
- @./astrocline/guillerminafotos/ (working Guillermina model)
- @./astrocline/birkblancas/, @./astrocline/birkcamel/, @./astrocline/birknegras/ (working Birk models)
- @./astrocline/argos/ contains the images to be used (12 webp files)
</context>

<requirements>
1. Examine working model structures (Guillermina or Birk) to understand the correct implementation
2. Create a new Argos model card by cloning the structure from a working model
3. Fix carousel functionality to match working models
4. Ensure proper spacing to avoid overlap with other models
5. Adapt the cloned structure with Argos-specific content:
   - Use images from @./astrocline/argos/ (1.webp through 12.webp)
   - Update product name to "Argos"
   - Update description and model-specific information
6. Maintain consistent styling with other models
7. Test carousel functionality thoroughly
</requirements>

<implementation>
1. First analyze the structure of working models (start with Guillermina as it's likely the most complete)
2. Identify the key differences between working models and the current Argos implementation
3. Clone the complete HTML/CSS/JS structure from a working model
4. Replace all references to the original model with Argos
5. Update image paths to use @./astrocline/argos/ directory
6. Update product information (name, description, pricing)
7. Ensure the carousel JavaScript works correctly with the new images
8. Fix any CSS positioning issues that cause overlap

Things to avoid:
- Don't just patch the current broken Argos - clone from working
- Don't leave any references to the original model after cloning
- Don't use different CSS classes or structure from working models
- Don't assume the current Argos files are salvageable
</implementation>

<research>
Before implementing, examine these files to understand the correct structure:
- Find and analyze the main HTML file containing Guillermina model card
- Examine the carousel JavaScript implementation
- Review CSS styling for consistent layout
- Check how images are organized and referenced in working models
</research>

<output>
Create/modify files:
- Update the Argos model card implementation (exact file path to be determined during analysis)
- Ensure all carousel functionality works with @./astrocline/argos/*.webp images
- Any necessary CSS updates for proper spacing and layout

The final implementation should match the structure and functionality of working models exactly, with only the content (images, text, model name) changed to Argos.
</output>

<verification>
After implementation:
1. Use Chrome DevTools MCP to navigate to the page containing Argos model
2. Take screenshots of the Argos model card
3. Use AI Vision MCP to analyze the screenshots and verify:
   - Carousel displays correctly with proper images
   - No overlap with other models
   - Visual consistency with other model cards
   - All interactive elements (carousel controls, thumbnails) are visible and functional
4. Test carousel functionality manually:
   - Main image changes when clicking thumbnails
   - Navigation arrows work
   - All 12 Argos images load correctly
5. Verify responsive behavior on different screen sizes
</verification>

<success_criteria>
- Argos model card has identical structure and styling as working models
- Carousel functionality works perfectly with all 12 images
- No visual overlap with other model cards
- Proper responsive behavior on mobile and desktop
- All images load correctly from @./astrocline/argos/ directory
- Add to cart functionality works without interference
- Visual consistency across all model cards on the page
</success_criteria>