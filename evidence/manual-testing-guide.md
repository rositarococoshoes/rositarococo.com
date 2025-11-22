# Manual Testing Guide - Chrome DevTools Analysis
**URL:** http://localhost:8000/index.html
**Purpose:** Comprehensive e-commerce funnel analysis for Astro migration

## Setup Instructions

### 1. Open Chrome DevTools
1. Navigate to `http://localhost:8000/index.html`
2. Open Chrome DevTools:
   - **Windows/Linux:** `Ctrl + Shift + I` or `F12`
   - **Mac:** `Cmd + Opt + I`
3. Organize DevTools layout:
   - Dock to right for best visibility
   - Enable device toolbar for responsive testing

### 2. Console Tab Setup
1. Clear console: `Ctrl + L` (Windows/Linux) or `Cmd + K` (Mac)
2. Filter settings:
   - Show: All levels
   - Preserve log: ✅ (checked)
   - Hide network: ❌ (unchecked)

### 3. Network Tab Setup
1. Clear network log
2. Filter settings:
   - Show: All
   - Preserve log: ✅ (checked)
3. Set connection speed: "Slow 3G" for testing
4. Enable "Disable cache" for accurate testing

## Testing Checklist

### Phase 1: Initial Page Load Analysis

#### 1.1 Console Monitoring
**Expected Logs to Capture:**
```
🔵 Iniciando carga de Facebook Pixel...
🔵 Facebook Pixel script insertado
✅ fbq está disponible
✅ Facebook Pixel inicializado con ID: 1052677351596434
✅ PageView event enviado via sendDualEvent
🔵 Página cargada completamente
✅ Facebook Pixel confirmado después de load
```

**Screenshot Tasks:**
- [ ] Full page screenshot (Ctrl + Shift + P → "Capture full size screenshot")
- [ ] Console tab showing initial logs
- [ ] Network tab showing initial requests

#### 1.2 Network Request Analysis
**Key Requests to Verify:**
- [ ] Facebook Pixel: `connect.facebook.net/en_US/fbevents.js`
- [ ] Google Fonts: Multiple font files
- [ ] Swiper.js: `cdn.jsdelivr.net/npm/swiper@11/`
- [ ] jQuery: `cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/`
- [ ] Custom CSS: `otono-elegante2.css`, `swiper-custom.css`, etc.
- [ ] Product Images: First batch of `.webp` files
- [ ] Custom JS: All `.js` files in footer

**Save HAR File:**
- Right-click in Network tab → "Save all as HAR with content"
- Save as: `evidence/network/index-initial-load.har`

### Phase 2: Interactive Element Testing

#### 2.1 Product Carousel Testing
**For each product (Guillerminas Negras, Camel, Blancas, Birk variants, Paris):**

**Actions:**
1. Click next button → Capture screenshot
2. Click previous button → Capture screenshot
3. Click thumbnail navigation → Capture screenshot
4. Swipe/drag on carousel (mobile view) → Capture screenshot
5. Test keyboard navigation (arrow keys) → Capture screenshot

**Console Monitoring:**
- Look for Swiper.js initialization messages
- Check for any JavaScript errors during navigation

**Network Monitoring:**
- Image loading for visible slides
- Any AJAX requests for additional images

**File Naming Convention:**
- `evidence/screenshots/index-carousel-guillermina-negras-next.png`
- `evidence/screenshots/index-carousel-guillermina-camel-thumbnails.png`

#### 2.2 Price Selection Testing
**For each product:**

**Actions:**
1. Screenshot before interaction
2. Click "1 par" → Screenshot after + console log
3. Click "2 pares" → Screenshot after + console log
4. Verify price changes display correctly

**Expected Behavior:**
- Price updates from $55.990 to $95.000
- Visual feedback on selected option
- No JavaScript errors

**File Naming:**
- `evidence/screenshots/index-price-selection-guillermina-1par.png`
- `evidence/screenshots/index-price-selection-guillermina-2pares.png`

#### 2.3 Add to Cart Testing
**For each product variant:**

**Actions:**
1. Screenshot cart before addition
2. Click "🛒 Agregar al carrito"
3. Screenshot cart after addition
4. Check floating cart button count
5. Check mini-cart if it opens

**Console Monitoring:**
- Cart addition success messages
- Cart count updates
- Any error messages

**Expected Elements to Test:**
- Cart count increases from 0 to 1+
- Mini-cart shows added item
- Price calculation updates
- "Continuar al Envío" button becomes enabled

**File Naming:**
- `evidence/screenshots/index-addtocart-guillermina-negras-1par-before.png`
- `evidence/screenshots/index-addtocart-guillermina-negras-1par-after.png`
- `evidence/console/index-addtocart-guillermina.txt`

#### 2.4 Mini-Cart Functionality

**Actions:**
1. Click cart icon to open mini-cart
2. Screenshot mini-cart open state
3. Test item removal (if X button visible)
4. Test cart close button
5. Test "Continuar al Envío" button

**Network Monitoring:**
- Any AJAX requests for cart operations
- Google Forms interactions

#### 2.5 Checkout Form Testing

**Actions:**
1. Click "Continuar al Envío" (with items in cart)
2. Screenshot form appearance
3. Test form validation (submit empty fields)
4. Fill in sample form data
5. Test form submission

**Console Monitoring:**
- Form validation errors
- Submission success/failure messages
- Google Forms response

**Expected Form Fields:**
- Name, Email, Phone, Address
- Product selection pre-filled
- Total amount calculated

**File Naming:**
- `evidence/screenshots/index-checkout-form-open.png`
- `evidence/screenshots/index-checkout-form-validation-errors.png`
- `evidence/screenshots/index-checkout-form-filled.png`

#### 2.6 WhatsApp Widget Testing

**Actions:**
1. Screenshot WhatsApp floating button
2. Click WhatsApp button
3. Test modal/window opening
4. Test pre-filled message content
5. Test different WhatsApp contact points

**Expected Behavior:**
- WhatsApp Web/Desktop app opens
- Message pre-filled with product information
- Phone number format correct

**File Naming:**
- `evidence/screenshots/index-whatsapp-widget.png`
- `evidence/screenshots/index-whatsapp-chat-open.png`

### Phase 3: Responsive Testing

#### 3.1 Device Testing
**Test viewports:**
1. **Desktop (1920x1080):** Full functionality
2. **Tablet (768x1024):** Touch interactions
3. **Mobile (375x667):** Mobile-optimized view
4. **Mobile Landscape (667x375):** Horizontal mobile

**For each viewport:**
- [ ] Full page screenshot
- [ ] Carousel functionality
- [ ] Form usability
- [ ] Button sizes and spacing
- [ ] Text readability

**File Naming:**
- `evidence/screenshots/index-responsive-desktop.png`
- `evidence/screenshots/index-responsive-tablet.png`
- `evidence/screenshots/index-responsive-mobile.png`
- `evidence/screenshots/index-responsive-mobile-landscape.png`

### Phase 4: Performance Testing

#### 4.1 Performance Metrics
**In DevTools → Performance tab:**

1. **Recording Setup:**
   - Clear browser cache
   - Set throttling to "Slow 3G"
   - Disable browser extensions

2. **Record Actions:**
   - Page load (0-5 seconds)
   - Carousel interactions (5-10 seconds)
   - Add to cart (10-15 seconds)
   - Form interactions (15-20 seconds)

3. **Save Results:**
   - Export performance profile
   - Note key metrics:
     - First Contentful Paint
     - Largest Contentful Paint
     - Time to Interactive
     - Cumulative Layout Shift

#### 4.2 Lighthouse Analysis
**Run Lighthouse audit:**
- Performance
- Accessibility
- Best Practices
- SEO

**Save Report:**
- HTML report: `evidence/reports/index-lighthouse.html`
- JSON report: `evidence/reports/index-lighthouse.json`

### Phase 5: Error Handling Testing

#### 5.1 Network Failure Simulation
**In DevTools → Network tab:**
1. Go offline (Ctrl + Shift + P → "Offline")
2. Test interactions:
   - Carousel navigation
   - Add to cart
   - Form submission
3. Note error handling and user feedback

#### 5.2 JavaScript Error Testing
**In Console tab:**
1. Intentionally break functions if possible
2. Test error recovery
3. Check for unhandled promise rejections

### File Organization Structure

```
evidence/
├── screenshots/
│   ├── index-initial-load-desktop.png
│   ├── index-initial-load-mobile.png
│   ├── index-carousel-[product]-[action].png
│   ├── index-price-selection-[product]-[option].png
│   ├── index-addtocart-[product]-[state].png
│   ├── index-checkout-[state].png
│   ├── index-whatsapp-[state].png
│   ├── index-responsive-[device].png
│   └── index-errors-[type].png
├── console/
│   ├── index-initial-load.txt
│   ├── index-carousel-interactions.txt
│   ├── index-cart-operations.txt
│   ├── index-form-submission.txt
│   ├── index-network-errors.txt
│   └── index-performance.txt
├── network/
│   ├── index-initial-load.har
│   ├── index-carousel-interactions.har
│   ├── index-cart-operations.har
│   ├── index-form-submission.har
│   └── index-offline-testing.har
└── reports/
    ├── index-analysis.md (already created)
    ├── index-lighthouse.html
    ├── index-lighthouse.json
    ├── manual-testing-guide.md (this file)
    └── testing-summary.md
```

## Completion Checklist

### Before Starting:
- [ ] Chrome browser updated to latest version
- [ ] Local server running on port 8000
- [ ] All evidence directories created
- [ ] Screenshot tool configured

### During Testing:
- [ ] Every interaction has before/after screenshots
- [ ] Console logs captured for each action
- [ ] Network activity saved as HAR files
- [ ] Performance metrics recorded
- [ ] Error cases documented

### After Testing:
- [ ] All files properly named and organized
- [ ] Summary report created
- [ ] Key findings documented for migration team
- [ ] Performance benchmarks established

## Notes for Migration Team

### Key Elements to Preserve:
1. **Carousel Functionality:** Swiper.js or equivalent
2. **Cart Logic:** State management and calculations
3. **Form Handling:** Validation and submission
4. **WhatsApp Integration:** Pre-filled messages
5. **Responsive Design:** Mobile-first approach
6. **Performance:** Image optimization and lazy loading

### Technical Debt to Address:
1. **jQuery Dependencies:** Replace with vanilla JS or lightweight alternatives
2. **Multiple JS Files:** Bundle and optimize
3. **Facebook Pixel:** Ensure proper loading timing
4. **Form Security:** Add CSRF protection
5. **Error Handling:** Improve user feedback

### Migration Priority:
1. **High:** Core cart functionality and checkout flow
2. **Medium:** Carousel interactions and responsive design
3. **Low:** WhatsApp widgets and social sharing

This comprehensive testing approach will provide all necessary documentation for successful migration to Astro + Tailwind while maintaining conversion optimization and user experience.