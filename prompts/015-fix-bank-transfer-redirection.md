<objective>
Fix the bank transfer URL redirection issue in AstroClient and ensure the transfer pages have identical content and aesthetics to the original funnel. The current problem is that when users select "pagar con transferencia bancaria" in AstroClient, they are redirected to the root directory CBU transfer pages instead of the specific AstroClient folder pages.
</objective>

<context>
This is for the Rosita Rococó e-commerce website where we have two main areas:
1. Root directory - contains the original funnel pages (transferenciacbu-1par/index.html, transferenciacbu-2pares/index.html)
2. AstroClient folder (/astrocline/) - contains the new Astro implementation that should have its own transfer pages

The issue: When users select bank transfer payment in AstroClient (located in /astrocline/), the redirection points to root directory pages instead of the specific /astrocline/ transfer pages, breaking the user flow and context.

Key files to examine:
- @astrocline/transferenciacbu-1par/index.html - Target page for 1 pair transfers in AstroClient
- @astrocline/transferenciacbu-2pares/index.html - Target page for 2 pairs transfers in AstroClient
- @transferenciacbu-1par/index.html - Source content to replicate (1 pair)
- @transferenciacbu-2pares/index.html - Source content to replicate (2 pairs)
- Any form handling or checkout files in astrocline/ that handle the redirection logic
</context>

<requirements>
1. **URL Redirection Fix:**
   - Identify where the bank transfer redirection logic is implemented in AstroClient
   - Update the redirection URLs to point to the correct /astrocline/ folder pages:
     - For 1 pair: /astrocline/transferenciacbu-1par/ (not root /transferenciacbu-1par/)
     - For 2 pairs: /astrocline/transferenciacbu-2pares/ (not root /transferenciacbu-2pares/)
   - Ensure the redirection logic preserves any URL parameters needed for the checkout flow

2. **Content Consistency:**
   - Copy the exact content from root directory transfer pages to the AstroClient versions
   - Ensure all text, images, styling, and functionality are identical between versions
   - Maintain any dynamic elements like payment instructions, bank details, etc.

3. **Aesthetic Consistency:**
   - Verify that the AstroClient transfer pages have the same visual appearance as the original pages
   - Ensure CSS styles are properly applied and consistent with the overall AstroClient design
   - Test responsive behavior matches the original implementation

4. **Testing Verification:**
   - Test the complete flow from AstroClient checkout to transfer pages
   - Verify that URLs redirect correctly and content loads properly
   - Confirm that the user experience is seamless and maintains context
</requirements>

<implementation>
1. First, examine the current /astrocline/ checkout process to identify where the bank transfer redirection is configured
2. Compare the current /astrocline/ transfer pages with the original root directory versions
3. Update the redirection URLs in the appropriate form or configuration files
4. Copy any missing content or styling from the original pages to the AstroClient versions
5. Test the complete user flow to ensure everything works correctly

Things to avoid:
- Don't modify the root directory transfer pages - they should remain as reference
- Don't break any existing functionality in the AstroClient checkout process
- Don't create duplicate CSS conflicts between AstroClient and root directory styles
</implementation>

<output>
Examine and modify the following files as needed:
- Any checkout or form files in @astrocline/ that handle bank transfer redirection
- @astrocline/transferenciacbu-1par/index.html - ensure content matches original
- @astrocline/transferenciacbu-2pares/index.html - ensure content matches original
- Any CSS files related to the transfer pages in astrocline/

Create a summary report of changes made and verification results at: `./reports/bank-transfer-redirection-fix.md`
</output>

<verification>
Before declaring this task complete, verify:
1. Clicking "pagar con transferencia bancaria" in AstroClient redirects to the correct astrocline/ URLs
2. The AstroClient transfer pages load with identical content to the original pages
3. All styling and functionality works properly on both desktop and mobile
4. The complete checkout flow works end-to-end without breaking
5. No console errors or broken links exist on the transfer pages

Test the redirection manually or use browser dev tools to confirm the correct URLs are being used.
</verification>

<success_criteria>
- Bank transfer option in AstroClient redirects to /astrocline/transferenciacbu-1par/ or /astrocline/transferenciacbu-2pares/ as appropriate
- AstroClient transfer pages have identical content, styling, and functionality to the original root directory pages
- No redirection errors or 404s occur during the checkout flow
- The user experience is seamless and maintains AstroClient context throughout the process
- All responsive design elements work correctly on mobile, tablet, and desktop viewports
</success_criteria>