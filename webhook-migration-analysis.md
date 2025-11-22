# Webhook Migration Analysis: Original Funnel → Astro Client

## Executive Summary

**Critical Issue Identified**: The Astro Client implementation (astrocline folder) is incorrectly using Google Forms instead of the original webhook infrastructure, causing complete breakdown of order processing, WhatsApp validation, and payment systems.

**Impact**: All order submissions from astrocline are being sent to Google Forms instead of the original order management system, resulting in lost orders and broken functionality.

## Original Webhook Implementation (Root index.html)

### 1. Order Submission Webhooks

**Primary Order Endpoint**:
```
https://sswebhookss.odontolab.co/webhook/a5dcd3c9-48a3-46a1-a781-475737a634ca
```
- Used in `enviarDatosAlNuevoEndpoint()` function
- Handles general order submissions with form data
- Includes IP tracking, user agent, Facebook parameters

**Contrareembolso (Cash on Delivery) Orders**:
```
https://sswebhookss.odontolab.co/webhook/1e214d4e-5481-4ded-8936-c63ff9ce7743
```
- Specialized endpoint for cash-on-delivery orders
- Processes order data with specific COD logic

### 2. WhatsApp Integration Webhooks

**WhatsApp Validation**:
```
https://sswebhookss.odontolab.co/webhook/02eb0643-1b9d-4866-87a7-f892d6a945ea
```
- Validates WhatsApp numbers in real-time
- Used in both inline validation and modal validation
- Returns `{exists: true/false}` response

**WhatsApp Storage**:
```
https://sswebhookss.odontolab.co/webhook/1d018fb5-b798-4218-9c57-b48e3a71c6a7
```
- Saves validated WhatsApp numbers to database
- Stores cart state and user information
- Includes timestamp and source tracking

### 3. Payment Processing Webhooks

**MercadoPago Link Generation**:
```
https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30
```
- Generates personalized MercadoPago payment links
- Receives: `{comprador, monto, fbp}` payload
- Returns: `{linkpersonalizadomp}` response

**Facebook Events Tracking**:
```
https://sswebhookss.odontolab.co/webhook/9dfb840b-2a21-4277-8aec-1666bfaaac89
```
- Facebook Conversions API integration
- Tracks: PageView, InitiateCheckout events
- Includes hashed emails, IP addresses, FBC/FBP parameters

## Current Astro Client Implementation Issues

### ❌ **CRITICAL: Google Forms Integration**

**Found in astrocline/index.html (line ~55)**:
```html
<form action="https://docs.google.com/forms/d/e/1FAIpQLSd_KUORaRPQHoCM6B0GGp_fqI5eiAH0KM2Iwj1mXTgGEjawnQ/formResponse" method="POST" target="_self" novalidate>
```

**Problem**: All form submissions are being sent to Google Forms instead of the original webhook endpoints.

**Fields being sent to Google Forms**:
- `entry.286442883` - Product selection
- `entry.1465946249` - Email
- `entry.1460904554` - Name
- `entry.53830725` - WhatsApp
- `entry.951592426` - Address
- `entry.1743418466` - Locality
- `entry.1005165410` - Postal code
- `entry.59648134` - Province
- `entry.541001873` - DNI

### ✅ **Working: WhatsApp Integration**

The astrocline carousel.js file **DOES** contain the correct WhatsApp endpoints:

```javascript
const validateWhatsappEndpoint = "https://sswebhookss.odontolab.co/webhook/02eb0643-1b9d-4866-87a7-f892d6a945ea";
const saveWhatsappEndpoint = "https://sswebhookss.odontolab.co/webhook/1d018fb5-b798-4218-9c57-b48e3a71c6a7";
```

**Status**: ✅ Working correctly

### ❌ **MISSING: Order Processing Logic**

The astrocline implementation **lacks**:
1. `enviarDatosAlNuevoEndpoint()` function
2. Payment method detection (tarjeta/mercadopago/cbu/contrareembolso)
3. MercadoPago link generation logic
4. Facebook Pixel integration and server-side tracking
5. Proper form validation and bot protection
6. Error handling and user feedback mechanisms

### ❌ **MISSING: Payment Flow**

The astrocline implementation **lacks**:
1. MercadoPago payment processing
2. CBU transfer flow
3. Cash on delivery (contrareembolso) handling
4. Payment method routing logic
5. Price calculation based on payment method

## Migration Plan

### Phase 1: Fix Form Submission (CRITICAL)

**Replace Google Forms with webhook endpoints**:

1. **Remove Google Forms action**:
   ```html
   <!-- REMOVE -->
   <form action="https://docs.google.com/forms/..." method="POST">
   ```

2. **Add JavaScript form handler**:
   ```javascript
   // ADD to astrocline/js/form-handler.js
   document.getElementById('checkout-form').addEventListener('submit', handleOrderSubmission);
   ```

3. **Implement order submission logic**:
   ```javascript
   async function handleOrderSubmission(event) {
       event.preventDefault();

       // Determine payment method
       const paymentMethod = document.getElementById('comoabona').value;

       // Route to appropriate endpoint
       if (paymentMethod === 'contrareembolso') {
           await submitContrareembolsoOrder();
       } else {
           await submitStandardOrder();
       }
   }
   ```

### Phase 2: Add Payment Processing

**Implement missing payment flows**:

1. **MercadoPago integration**:
   ```javascript
   async function generateMercadoPagoLink(monto, comprador) {
       const response = await fetch('https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ comprador, monto, fbp: getFBP() })
       });
       return response.json();
   }
   ```

2. **CBU transfer flow**:
   - Generate transfer instructions
   - Calculate 10% discount
   - Redirect to transfer confirmation page

3. **Cash on delivery flow**:
   - Validate order total
   - Generate COD-specific processing
   - Redirect to thank you pages

### Phase 3: Add Facebook Integration

**Implement server-side tracking**:

1. **PageView tracking**:
   ```javascript
   async function trackPageView() {
       const facebookEventData = {
           event_name: 'PageView',
           event_time: getArgentinaTimestamp(),
           // ... user data
       };

       await fetch('https://sswebhookss.odontolab.co/webhook/9dfb840b-2a21-4277-8aec-1666bfaaac89', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ data: [facebookEventData] })
       });
   }
   ```

2. **InitiateCheckout tracking**:
   - Track payment method selection
   - Include cart value and items
   - Hash email addresses for privacy

### Phase 4: Data Flow Validation

**Ensure data consistency**:

1. **Form data mapping**:
   - Map astrocline form fields to original webhook format
   - Maintain compatibility with existing backend systems
   - Preserve data structures for order processing

2. **WhatsApp integration**:
   - ✅ Already working correctly
   - Ensure cart data is preserved during WhatsApp validation
   - Maintain existing user experience

## Files to Modify

### New Files Required:
- `astrocline/js/form-handler.js` - Order processing logic
- `astrocline/js/payment-processing.js` - Payment method handling
- `astrocline/js/facebook-tracking.js` - Facebook integration

### Files to Modify:
- `astrocline/index.html` - Remove Google Forms, add form event handlers
- `astrocline/js/carousel.js` - Add integration with new form handlers
- `astrocline/css/unified.css` - Add styling for loading states, error messages

## Success Criteria

### ✅ **Order Processing**:
- Orders sent to original webhook endpoints (not Google Forms)
- All payment methods working (MercadoPago, CBU, Contrareembolso)
- Proper error handling and user feedback

### ✅ **WhatsApp Integration**:
- Validation working with original endpoints
- Cart recovery functionality preserved
- WhatsApp modal functioning correctly

### ✅ **Payment Processing**:
- MercadoPago link generation working
- CBU discount calculation working
- Contrareembolso order processing working

### ✅ **Facebook Integration**:
- Server-side tracking events firing
- Proper user data hashing
- Event deduplication working

### ✅ **Data Integrity**:
- Form data properly mapped to webhook format
- IP tracking and user agent collection
- Facebook parameters (FBC/FBP) preserved

## Risk Assessment

### 🚨 **HIGH RISK**:
- **Orders currently going to Google Forms**: This is causing immediate business impact
- **No payment processing**: Users cannot complete purchases
- **Lost customer data**: No integration with existing order management

### 📊 **Business Impact**:
- 100% of astrocline orders are failing
- Revenue loss due to broken payment flow
- Poor customer experience due to broken checkout process

### 🛡️ **Migration Safety**:
- WhatsApp integration is already working correctly
- Original webhook endpoints are proven and stable
- Backward compatibility can be maintained

## Immediate Actions Required

1. **Stop using Google Forms** - Replace form action immediately
2. **Implement order submission handler** - Add JavaScript processing
3. **Add payment method routing** - Implement payment flows
4. **Test end-to-end order process** - Verify all webhook integrations
5. **Monitor webhook responses** - Ensure orders are being processed correctly

## Implementation Priority

1. **CRITICAL** (Fix immediately): Replace Google Forms with webhook endpoints
2. **HIGH** (Fix within 24 hours): Implement payment processing logic
3. **MEDIUM** (Fix within 48 hours): Add Facebook integration
4. **LOW** (Fix within 1 week): Optimize and add enhanced features

This migration analysis reveals a critical system failure in the astrocline implementation that requires immediate attention to restore proper order processing functionality.