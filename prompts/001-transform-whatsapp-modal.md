<objective>
Transform the current WhatsApp modal from a commercial/promotional approach to a shopping cart-saving experience that aligns with the original funnel strategy. The modal should focus on saving the user's cart and allowing them to continue their order process, rather than collecting leads for marketing purposes.

Context: The current modal shows "¡OFERTA EXCLUSIVA! 🔥 Sumate y recibí un 10% OFF" which is purely commercial. We need to change it to match the original cart-saving functionality that existed in the original index.html where it said "Dejanos tu número de WhatsApp para guardar tu carrito. Si agregás dos pares de cualquier modelo o talle, tenés descuento importante por par y envío gratis."

The modal must maintain the same webhook validation system and visual styling but with cart-focused messaging.
</objective>

<context>
This is for the Rosita Rococó e-commerce website where users can add shoes to their cart and checkout. The WhatsApp modal appears when users interact with the shopping cart, and its primary purpose should be to save their cart information and enable order continuation, not lead generation.

Current situation: The modal has commercial messaging ("10% OFF", "ofertas especiales") but it should have cart-saving messaging like the original implementation.

Files to examine:
- @index.html - Reference the original WhatsApp modal implementation (lines ~2337-2346)
- Current WhatsApp modal implementation in astrocline files
- Webhook validation system using: https://sswebhookss.odontolab.co/webhook/02eb0643-1b9d-4866-87a7-f892d6a945ea
- Save endpoint: https://sswebhookss.odontolab.co/webhook/1d018fb5-b798-4218-9c57-b48e3a71c6a7

Available tools:
- Chrome DevTools MCP for testing in browser
- AI Vision MCP for analyzing screenshots
- Shadcn components for UI improvements if needed
</context>

<requirements>
1. Change modal messaging from commercial to cart-saving focus
2. Maintain existing WhatsApp webhook validation system
3. Update headline, description, and button text to reflect cart-saving purpose
4. Keep the same visual design and user experience
5. Ensure the modal mentions cart-saving benefits (discounts for multiple pairs, free shipping)
6. Preserve the form validation and WhatsApp formatting logic
7. Test the updated modal using Chrome DevTools MCP
8. Take screenshots for validation using AI Vision MCP

Specific text changes needed:
- Remove: "🔥 ¡OFERTA EXCLUSIVA! 🔥" and "Sumate y recibí un 10% OFF en tu primera compra"
- Replace with cart-saving messaging similar to: "Guarda tu carrito y continúa tu compra"
- Update benefits to focus on: "descuentos por cantidad y envío gratis"
- Change button from "¡Sumarme!" to "Guardar y Continuar" or similar
- Remove marketing-focused bullet points about "ofertas especiales" and "sorteos"
</requirements>

<implementation>
1. First, examine the current WhatsApp modal implementation across all astrocline files to understand the structure
2. Use Chrome DevTools MCP to navigate to the site and trigger the current modal to see exactly what needs to be changed
3. Take screenshots of the current modal for reference using AI Vision MCP
4. Update the modal content in the relevant files, changing from commercial to cart-saving messaging
5. Test the updated modal with Chrome DevTools MCP to ensure it appears correctly
6. Verify that WhatsApp validation still works with the webhook endpoints
7. Take final screenshots to confirm the transformation is complete

Key changes to implement:
- Modal header: Change from promotional headline to cart-saving headline
- Modal body: Update message to focus on saving cart and order continuation
- Benefits: Change from marketing benefits to purchase benefits (bulk discounts, free shipping)
- Button text: Change from "¡Sumarme!" to action-oriented cart-saving text
- Keep all form validation, webhook integration, and visual styling intact
</implementation>

<output>
Update the WhatsApp modal implementation in the relevant astrocline files:
- Find and update modal HTML structure with new cart-focused messaging
- Ensure CSS classes and styling remain unchanged
- Preserve all JavaScript validation and webhook functionality
- Test using Chrome DevTools MCP and validate with AI Vision MCP

The modal should transform from a commercial lead capture to a cart-saving utility that helps users continue their purchase process.
</output>

<verification>
Before declaring complete, verify your work:

1. Use Chrome DevTools MCP to navigate to the site and trigger the modal
2. Take screenshots of the updated modal using AI Vision MCP
3. Confirm the modal headline is now cart-saving focused (not commercial)
4. Verify the body text mentions saving cart and continuing purchase
5. Check that benefits mention "dos pares", "descuento por par", and "envío gratis"
6. Test WhatsApp validation still works with webhook endpoints
7. Ensure the button text is action-oriented for cart saving
8. Compare screenshots with the original implementation to ensure consistency
9. Create a git commit with the changes using GitHub MCP
10. Push the changes to the repository
</verification>

<success_criteria>
- Modal headline focuses on cart saving, not commercial offers
- Modal body explains the purpose is to save cart and continue shopping
- Benefits mention specific purchase incentives (bulk discounts, free shipping)
- WhatsApp validation with webhook continues to work correctly
- Button text reflects cart-saving action (e.g., "Guardar y Continuar")
- Visual design and user experience remain consistent
- Screenshots confirm the transformation matches the original cart-saving approach
- Changes are committed and pushed to GitHub with a descriptive commit message
</success_criteria>

<github_commit>
After completing the WhatsApp modal transformation and validation:

1. Use GitHub MCP to commit the changes with a descriptive message:
   - Stage all modified files: git add .
   - Create commit: git commit -m "Transform WhatsApp modal from commercial to cart-saving approach

   Changes:
   - Remove promotional '10% OFF' and 'OFERTA EXCLUSIVA' messaging
   - Update modal to focus on cart saving and order continuation
   - Add cart-saving benefits (bulk discounts, free shipping)
   - Update button text to 'Guardar y Continuar'
   - Preserve WhatsApp webhook validation functionality
   - Maintain visual design and user experience

   🤖 Generated with Claude Code
   Co-Authored-By: Claude <noreply@anthropic.com>"

2. Push the changes to the remote repository: git push
3. Verify the changes are visible on GitHub
</github_commit>