<objective>
Completely repair the product carousel module which currently has visual issues: thumbnails showing with strange borders, overlapping with text, misalignment, and failing to meet the site's visual standards. The goal is to achieve a modern, elegant, and professionally functioning carousel that works seamlessly across desktop, tablet, and mobile devices.
</objective>

<context>
This is for the Rosita Rococó website (rositarococo.com), a women's fall footwear catalog with an "Otoña-Elegante" design theme. The current carousel implementation has significant aesthetic and functional problems that need to be resolved. The site uses Astro with TypeScript and has shadcn components available as devDependencies. This carousel is a critical component for showcasing products and must meet high visual standards.

Current project structure:
- Working directory: . (rositarococo.com root)
- Tech stack: Astro, TypeScript, shadcn
- Existing carousel files: Need to explore the codebase to locate current carousel implementation
- Dependencies: shadcn@^3.5.0 available in devDependencies
</context>

<requirements>
Follow this exact 6-step process in order:

1. **Search shadcn MCP for pre-built carousel components**
   - Search for components under these names: carousel, slider, image-carousel, gallery, product-carousel, thumbnails-carousel
   - Check all relevant categories: UI, components, marketing, ecommerce
   - Document all suitable options found with their features and Astro compatibility

2. **Verify Astro compatibility for each found component**
   - Identify if Astro version exists
   - For React-only versions, evaluate portability to Astro with minimal changes
   - Discard components that aren't portable to Astro
   - Select only components implementable without breaking dependencies

3. **Choose solution and apply significant aesthetic improvements**
   - IF suitable shadcn component found: Replace current implementation with that component
   - IF no suitable component found: Repair current carousel with major aesthetic improvements
   - Ensure thumbnails have uniform size, clean borders, no cropping
   - Clear separation between thumbnails and text (no overlap)
   - Review containers, z-index, overflow, spacing for professional presentation
   - Adjust margins, paddings, proportions for modern, clean look
   - Results must be visually superior to current implementation

4. **Validate visual results across devices**
   - Test carousel functionality on desktop, tablet, and mobile
   - Ensure consistent, elegant design without visual faults
   - Confirm no overlap, deformation, flickering, overflow issues, or poor spacing

5. **Commit final changes**
   - Commit all modified files with clear message describing carousel improvements
   - Ensure everything is ready for MCP Chrome DevTools testing

6. **Document solution used**
   - Confirm which shadcn component was found (if any)
   - Indicate whether component was used or current implementation was improved
   - Confirm commit is complete and ready for testing
</requirements>

<implementation>
Thoroughly explore multiple solutions and deeply consider the best approach for this project. Go beyond basic fixes to create a truly professional carousel implementation.

Key considerations:
- Prioritize shadcn components for consistency and reliability
- Maintain the site's "Otoña-Elegante" design theme
- Ensure mobile-first responsive design
- Focus on significant visual improvements, not just functional fixes
- Consider performance implications of different solutions

What to avoid:
- Don't make minor tweaks when major improvements are needed
- Don't use components that break Astro compatibility
- Don't accept solutions with remaining visual issues
- Don't overlook cross-device consistency
</implementation>

<research>
First explore the codebase to understand the current carousel implementation:
- Search for carousel-related files and components
- Examine current carousel structure and styling
- Identify specific visual issues that need addressing
- Review existing CSS and JavaScript for carousel functionality

Then use the shadcn MCP server to search for carousel components:
- mcp__shadcn__search_items_in_registries for finding components
- mcp__shadcn__view_items_in_registries for detailed component information
- mcp__shadcn__get_item_examples_from_registries for usage examples
</research>

<output>
Modified files may include (depending on solution chosen):
- Carousel component files (location to be determined during research)
- CSS/styling files for carousel improvements
- Any additional configuration or integration files
- Commit message with detailed description of changes made

If shadcn component is used:
- New component files for the shadcn carousel integration
- Updated import/usage files
- Integration documentation

If current carousel is repaired:
- Enhanced existing carousel files
- Improved styling and functionality
- Responsive design improvements
</output>

<verification>
Before declaring complete, verify:
- Carousel works perfectly on desktop, tablet, and mobile
- No visual issues: borders are clean, no overlap, proper alignment
- Thumbnails display correctly without cropping or distortion
- Smooth navigation and proper functionality
- Cross-browser compatibility
- Performance is acceptable
- Design matches site's aesthetic standards
- All changes are committed with descriptive message
- Ready for Chrome DevTools testing validation
</verification>

<success_criteria>
- Carousel functions flawlessly across all device types
- Significant visual improvement over current implementation
- Professional, modern appearance that meets site standards
- No overlapping text, misalignment, or border issues
- Responsive design works seamlessly
- Either shadcn component successfully integrated OR current carousel dramatically improved
- Clean commit history with descriptive changes
- Ready for production testing
</success_criteria>