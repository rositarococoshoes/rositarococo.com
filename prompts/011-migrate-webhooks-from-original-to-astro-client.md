<objective>
Migrate and fix all webhook functionality from the original index.html funnel to the Astro Client version (astrocline folder). The current Astro Client implementation incorrectly uses Google Forms instead of the original webhooks, causing critical functionality to break.

The migration must ensure that:
1. Order submission uses the original order webhook (not Google Forms)
2. WhatsApp validation and storage use the same webhooks as the original
3. Payment processing (Mercado Pago links, transfers) works exactly like the original
4. All webhook integrations maintain the same data flow and validation logic

This is critical because the current Astro Client version is not properly saving orders or validating WhatsApp numbers, breaking the entire sales funnel.
</objective>

<context>
This is an e-commerce sales funnel migration from a traditional HTML-based checkout to an Astro-powered version. The original funnel (index.html in root) uses specific webhooks for:

- Order submission and storage
- WhatsApp number validation and storage
- Mercado Pago payment link generation
- Transfer redirection handling

The migrated version (astrocline folder) incorrectly replaced these webhooks with Google Forms posting, which doesn't integrate with the existing order management system.

Critical files to examine:
- @index.html - Original funnel with working webhooks
- @astrocline/ - Migrated version that needs webhook fixes
- Look for form submissions, fetch() calls, and webhook endpoints
- Check JavaScript files in astrocline/ for webhook-related code

The business impact is severe: orders are not being saved, WhatsApp numbers aren't being validated, and payment processing is broken.
</context>

<requirements>
1. **Analyze Original Webhook Implementation**:
   - Examine index.html to identify ALL webhook endpoints and their usage
   - Document the order submission webhook (URL, payload format, when it's called)
   - Document WhatsApp validation webhook (URL, validation logic, error handling)
   - Document WhatsApp storage webhook (modal form submission)
   - Document payment processing webhooks (Mercado Pago link generation, transfer handling)

2. **Compare with Current Astro Implementation**:
   - Examine astrocline implementation to identify current (incorrect) Google Forms usage
   - Identify which webhook integrations are missing or broken
   - Compare data structures and validation logic between versions

3. **Implement Webhook Migration**:
   - Replace Google Forms posting with original webhook endpoints
   - Ensure same payload formats and data structures
   - Replicate exact validation logic from original funnel
   - Maintain same error handling and user feedback mechanisms

4. **Specific Functionality to Replicate**:
   - **Order Storage**: When checkout form submits, call original order webhook
   - **WhatsApp Modal**: First cart addition shows WhatsApp modal, save to webhook
   - **WhatsApp Validation**: Both cart modal and checkout validate via same webhook
   - **Payment Processing**: Mercado Pago link generation via original webhook
   - **Transfer Redirect**: Same redirection logic for bank transfers

5. **Testing and Validation**:
   - Verify all webhook calls match original implementation exactly
   - Test WhatsApp validation flow in both cart modal and checkout
   - Test order submission and storage
   - Test payment processing for both credit card and transfer options
</requirements>

<implementation>
**Analysis Phase**:
1. Start with index.html to understand the complete webhook ecosystem
2. Search for all fetch() calls, form actions, and webhook URLs
3. Map out the data flow: user action → webhook call → response handling
4. Document payload structures, headers, and authentication if any

**Migration Strategy**:
1. Identify all JavaScript files in astrocline that handle form submissions
2. Replace Google Forms URLs with original webhook URLs
3. Update payload structures to match original format
4. Implement same validation logic and error handling
5. Ensure same success/failure feedback mechanisms

**Critical Considerations**:
- Webhook URLs may be hardcoded or stored in configuration
- Payload field names must match exactly (case-sensitive)
- Authentication headers or API keys may need to be replicated
- Error handling logic should provide same user experience
- Success callbacks should trigger the same follow-up actions

**What to Avoid**:
- Do not use Google Forms for any critical business logic
- Do not modify webhook payloads from the original format
- Do not skip validation steps that exist in the original
- Do not change the timing or sequence of webhook calls
</implementation>

<research>
Thoroughly examine both versions to understand the complete webhook ecosystem. Look for:

1. **Original Implementation (index.html)**:
   - All webhook URLs and their purposes
   - Form submission handlers
   - AJAX/fetch calls to webhooks
   - Data validation and transformation logic
   - Success/error handling patterns

2. **Current Implementation (astrocline/)**:
   - Current Google Forms integration points
   - Missing webhook integrations
   - Different validation or handling logic
   - JavaScript files that need modification

3. **Integration Points**:
   - WhatsApp modal (first cart addition)
   - Checkout form submission
   - Payment method selection
   - Order confirmation processing
</research>

<output>
**Deliverables**:

1. **Analysis Document**: `./webhook-migration-analysis.md`
   - Complete mapping of original webhook endpoints
   - Comparison with current implementation
   - Identification of all required changes

2. **Modified Files**:
   - Update any JavaScript files in astrocline/ that handle webhooks
   - Update any configuration files with webhook URLs
   - Ensure HTML forms have correct action attributes

3. **Testing Results**: `./webhook-migration-testing.md`
   - Verification of all webhook integrations
   - Test results for WhatsApp validation flows
   - Confirmation of order submission functionality
   - Payment processing verification

**Key Implementation Changes**:
- Replace Google Forms endpoint(s) with original order webhook URL
- Implement WhatsApp validation using original webhook
- Add Mercado Pago webhook integration for payment links
- Ensure transfer redirection matches original behavior
</output>

<verification>
Before declaring this migration complete, verify:

1. **Order Storage Test**:
   - Submit a test order through the astrocline checkout
   - Confirm it's saved to the same system as original funnel
   - Verify data structure matches exactly

2. **WhatsApp Flow Test**:
   - Add first item to cart to trigger WhatsApp modal
   - Submit WhatsApp number and confirm webhook storage
   - Proceed to checkout and validate WhatsApp works
   - Verify both validation points use same webhook

3. **Payment Processing Test**:
   - Test credit card option generates correct Mercado Pago link
   - Test transfer option redirects to correct pages
   - Verify payment status tracking works

4. **Data Integrity Check**:
   - Compare stored data format between original and new implementation
   - Ensure no data loss or corruption during migration
   - Verify all required fields are captured correctly

**Success Criteria**:
- All webhook integrations work identically to original funnel
- Orders are properly saved to the original system
- WhatsApp validation and storage work correctly
- Payment processing generates correct links and redirects
- No functionality regression from the original implementation
</verification>

<success_criteria>
The migration is successful when:

1. **Order Management**: All submitted orders from astrocline are saved to the original order management system (not Google Forms)

2. **WhatsApp Integration**:
   - WhatsApp modal storage works via original webhook
   - WhatsApp validation works in both cart and checkout contexts
   - Same validation logic and error handling as original

3. **Payment Processing**:
   - Credit card payments generate correct Mercado Pago links
   - Transfer payments redirect to original confirmation pages
   - Payment status tracking works identically to original

4. **Data Consistency**: All data captured, stored, and processed matches the original format and flow exactly

5. **User Experience**: The checkout flow works seamlessly without any broken functionality or incorrect redirects

The business impact should be: Orders are properly captured and managed, WhatsApp numbers are validated and stored correctly, and all payment methods work as expected, restoring the full sales funnel functionality.
</success_criteria>