<objective>
Implement specific UI/UX improvements to the Rosita Rococó website e-commerce checkout flow, focusing on four key areas: promotional banner optimization, checkout flow behavior, checkout steps alignment, and cart data formatting.
</objective>

<context>
This is a women's footwear e-commerce website (rositarococo.com) built with HTML/CSS/JavaScript. The improvements target the checkout experience to reduce friction and improve conversion. The changes affect customer-facing elements during the shopping cart and checkout process.

Key areas to address:
1. Promotional banner - simplify messaging and improve visual appeal
2. Checkout button behavior - improve flow from cart to checkout form
3. Checkout steps indicator - fix alignment issues
4. Cart data formatting - ensure compatibility with original funnel format

These improvements aim to maintain the existing functionality while enhancing user experience and visual consistency.
</context>

<requirements>
1. **Promotional Banner Updates:**
   - Replace the current star emoji with a more appropriate, visually appealing emoji or icon
   - Simplify the promotional title to focus on the core message: "2 pares por $95.000"
   - Remove the redundant "3 cuotas sin interés y envío gratis" text (already displayed elsewhere at the top)
   - Keep the "Podés combinar modelos" text as it provides important product flexibility information
   - Maintain the gradient background and responsive layout

2. **Checkout Button Behavior:**
   - When users click "Continuar al Envío →", the system should:
     - Automatically close/hide the shopping cart
     - Scroll to and focus on the checkout form at the bottom of the page
     - Ensure smooth transition between cart and checkout states

3. **Checkout Steps Alignment:**
   - Fix the alignment of the three checkout steps:
     - Step numbers (1, 2, 3) should start at the same vertical line
     - All text elements should be properly aligned horizontally
     - Maintain the active/inactive state styling
   - Ensure consistent spacing and visual hierarchy

4. **Cart Data Formatting:**
   - Format the selected sizes (talles) in the original funnel format:
     - Single item: `39-guillermina-negras`
     - Multiple items: `38-guillermina-negras, 38-guillermina-camel` (comma-separated)
   - Apply this formatting to the cart data before it's stored or displayed
   - Ensure compatibility with existing backend systems

All changes must maintain the existing color scheme, typography, and responsive design patterns.
</requirements>

<implementation>
Approach:
1. Examine the current HTML/CSS/JS structure to understand the implementation
2. Update the promotional banner HTML with improved emoji and simplified text
3. Modify the checkout button click handler to implement cart closing and form focusing
4. Adjust CSS for checkout steps alignment (flexbox or grid properties)
5. Implement cart data formatting function to convert selections to required format
6. Test the changes across different screen sizes to ensure responsiveness

Things to avoid:
- Don't break existing cart functionality
- Don't change the color scheme or overall design language
- Don't remove the gradient background or responsive behavior
- Don't alter the step indicator logic, only the alignment
</implementation>

<output>
Create/modify these files:
- Find and update the HTML file containing the promotional banner
- Update the JavaScript file handling the checkout button functionality
- Adjust CSS files for checkout steps alignment
- Implement cart data formatting in the relevant JavaScript module

Expected outcomes:
1. Visually appealing promotional banner with clear messaging
2. Smooth transition from cart to checkout form
3. Perfectly aligned checkout steps indicator
4. Properly formatted cart data compatible with original funnel format
</output>

<verification>
Before declaring complete, verify:
1. Promotional banner displays correctly with new emoji and simplified text
2. Clicking "Continuar al Envío" closes cart and focuses on checkout form
3. All three checkout steps are perfectly aligned horizontally and vertically
4. Selected sizes are formatted correctly in the original funnel format
5. All functionality works on both desktop and mobile devices
6. No JavaScript errors in browser console

**Testing Requirements with Chrome DevTools MCP:**
- Use Chrome DevTools to inspect the promotional banner changes
- Test the checkout button behavior by clicking and verifying cart closes and form focuses
- Use element inspection to verify checkout steps alignment (check flexbox/grid properties)
- Test cart data formatting by adding products and verifying the output format matches examples
- Test responsive behavior using Chrome DevTools device emulation
- Check console for any JavaScript errors during the entire flow

**Quality Assurance Checklist:**
- [ ] Promotional banner: New emoji visible, simplified text, redundant info removed
- [ ] Checkout button: Cart closes, form focuses, smooth transition
- [ ] Checkout steps: Perfect vertical alignment of step numbers, horizontal alignment of text
- [ ] Cart data: Format matches examples exactly (e.g., "38-guillermina-negras, 38-guillermina-camel")
- [ ] Responsive: Works correctly on mobile, tablet, desktop views
- [ ] No errors: Clean browser console throughout testing
</verification>

<success_criteria>
- Promotional banner is more visually appealing and less cluttered
- Checkout flow feels seamless with smooth cart-to-form transition
- Checkout steps are perfectly aligned and professional-looking
- Cart data format matches exactly the examples provided
- All changes work across different browsers and screen sizes
- All Chrome DevTools testing passes successfully
</success_criteria>

<deployment>
After implementation and local testing:
1. Use GitHub MCP to commit the changes with descriptive commit message
2. Push changes to the repository
3. Test the deployed version with Chrome DevTools to ensure production functionality
4. Create a pull request if needed for review

Commit message example: "Improve checkout UI/UX: optimize promotional banner, fix alignment, enhance cart-to-form flow, and standardize data formatting"
</deployment>