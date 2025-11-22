<objective>
Fix product name pluralization and standardize order data formatting to match original funnel patterns. This ensures consistency in product naming and order storage format for proper data synchronization.

</objective>

<context>
This is for the Rosita Rococó e-commerce website (astrocline/ subdirectory). The current system has inconsistent product naming where "Guillerminas Camels" should be "Guillerminas Camel" (singular), and order data isn't being saved in the same format as the original funnel system.

Key files to examine and modify:
- astrocline/js/carousel.js (main product catalog and cart logic)
- astrocline/index.html (product display elements)
- Any cart storage/formatting functions

The order format should match these examples from original funnel:
- 39-guillermina-negras
- 37-birk-camel, 37-birk-negras
- 39-guillermina-camel, 39-guillermina-negras
</context>

<requirements>
1. Fix all instances of "Guillerminas Camels" to "Guillerminas Camel" throughout the codebase
2. Update cart storage format to use the pattern: [talle]-[modelo]-[color] with hyphens
3. For multiple items: separate with comma and space (", ")
4. Ensure color names follow consistent pattern (camel, negras, blancas)
5. Update any display logic that shows product names to users
6. Maintain backward compatibility with existing cart functionality

Search comprehensively for:
- Product name variables and arrays
- Cart storage functions
- Display elements showing product names
- Order formatting functions
</requirements>

<implementation>
1. Search for all occurrences of "Guillerminas Camels" (case-sensitive search)
2. Locate cart data storage mechanisms (localStorage, cart object creation)
3. Find where order data gets formatted for display or storage
4. Update product catalog arrays/objects
5. Modify cart add/edit functions to use correct format
6. Update any order summary displays to reflect new formatting

Format should be: "{talle}-{modelo}-{color}"
Example: "37-guillermina-camel" NOT "Guillerminas Camel - Talle 37"

For multiple items: "38-guillermina-negras, 38-guillermina-camel"
</implementation>

<output>
Create/modify files:
- `astrocline/js/carousel.js` - Update product names and cart formatting
- `astrocline/index.html` - Fix any hardcoded product names in HTML
- Any other files containing the incorrect product name or formatting

Changes should include:
- Product catalog arrays/objects
- Cart item creation and storage functions
- Order summary display formatting
- Any validation or processing logic
</output>

<verification>
Before declaring complete, verify:
1. Search entire codebase for any remaining "Guillerminas Camels" instances
2. Test adding items to cart and verify storage format matches examples
3. Check that order display shows correct format
4. Ensure existing cart functionality still works properly
5. Validate that multiple items display correctly with comma separation

Use Chrome DevTools to:
- Add products to cart
- Check localStorage for correct formatting
- Verify order summary display
- Test with different product combinations
</verification>

<success_criteria>
- Zero instances of "Guillerminas Camels" remain in codebase
- Cart storage format matches original funnel exactly
- Order display follows [talle]-[modelo]-[color] pattern
- Multiple items display with proper comma separation
- All existing cart functionality preserved
- No breaking changes to user experience
</success_criteria>