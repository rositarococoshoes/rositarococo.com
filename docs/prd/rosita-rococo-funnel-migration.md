# Product Requirements Document (PRD)
## Rosita Rococó E-commerce Funnel Migration to Astro

**Project ID:** RR-FUNNEL-2025-01
**Date:** 2025-11-12
**Status:** Ready for Development
**Methodology:** BMad Agile with Chrome DevTools MCP Integration

---

## 1. Executive Summary

### Problem Statement
The current Rosita Rococó website (`index.html`) is a fully functional e-commerce funnel with product showcases, shopping cart, testimonials, and checkout forms. The migration to Astro is incomplete, missing critical e-commerce functionality and conversion elements.

### Business Objective
Complete migration of the original HTML funnel to Astro + Tailwind CSS while preserving 100% of conversion functionality and improving performance.

### Success Criteria
- **100% Feature Parity** - All original e-commerce functionality preserved
- **Performance Improvement** - Faster load times and Core Web Vitals
- **Mobile Excellence** - Superior mobile experience
- **Conversion Rate Maintenance** - Same or better conversion rate

---

## 2. Current State Analysis

### 2.1 Original Funnel Components (Complete)
Based on Chrome DevTools MCP analysis:

#### ✅ Existing Functional Elements:
- **Header with Benefits Bar**: "3 CUOTAS SIN INTERÉS | ENVÍO GRATIS A TODO EL PAÍS"
- **Mini Shopping Cart**: Functional with localStorage persistence
- **Product Showcase**: 6 product categories with images
- **Testimonials Section**: Dynamic testimonials with images
- **Google Forms Integration**: Complete checkout process
- **Facebook Pixel Tracking**: ID 1052677351596434

#### ✅ Product Catalog:
- Guillerminas Negras (12 images)
- Guillerminas Blancas (16 images)
- Guillerminas Camel (18 images)
- Birks Negras (6 images)
- Birks Camel (12 images)
- Birks Blancas (12 images)

### 2.2 Current Astro State (Incomplete)
Based on AI Vision comparison analysis:

#### ❌ Missing Critical Components:
1. **Benefits Bar** - Top promotional banner
2. **Product Carrusels** - Swiper.js image galleries
3. **Interactive Shopping Cart** - Add/remove functionality
4. **Checkout Process** - Google Forms integration
5. **Dynamic Testimonials** - Load more functionality
6. **Product Quantity Selectors** - 1 pair / 2 pairs pricing
7. **Size Selection System** - Interactive size guides
8. **Floating Action Buttons** - Cart and checkout CTAs

---

## 3. Detailed Requirements

### 3.1 User Stories

#### Epic 1: Product Showcase Enhancement
**As a** potential customer
**I want to** browse products with high-quality image galleries
**So that** I can examine products from all angles before purchasing

**Acceptance Criteria:**
- [ ] Swiper.js carrusel for each product (main + thumbnails)
- [ ] Lazy loading for performance optimization
- [ ] Touch/swipe gestures for mobile
- [ ] Keyboard navigation accessibility
- [ ] Image zoom functionality on desktop
- [ ] Fallback for failed images

#### Epic 2: Shopping Cart System
**As a** shopper
**I want to** add products to a shopping cart and manage my order
**So that** I can purchase multiple items efficiently

**Acceptance Criteria:**
- [ ] Floating cart button with item counter
- [ ] Mini cart sidebar with product list
- [ ] Add/remove product functionality
- [ ] Quantity adjustment (1-2 pairs per product)
- [ ] Price calculation with 2x1 promotions
- [ ] LocalStorage persistence
- [ ] Empty cart state with instructions

#### Epic 3: Product Configuration
**As a** customer
**I want to** select sizes and quantities for each product
**So that** I receive the correct items

**Acceptance Criteria:**
- [ ] Size selector (35-40) with measurements
- [ ] Quantity selector (1 pair / 2 pairs)
- [ ] Promotional pricing display
- [ ] Size guide with measurement instructions
- [ ] Validation preventing incomplete selections
- [ ] Visual feedback for selected options

#### Epic 4: Testimonials System
**As a** prospective customer
**I want to** see social proof from other customers
**So that** I feel confident in my purchase decision

**Acceptance Criteria:**
- [ ] Dynamic testimonials grid (masonry layout)
- [ ] Load more functionality (8 items per load)
- [ ] Lazy loading with IntersectionObserver
- [ ] Hover effects and animations
- [ ] Mobile-responsive grid (1-4 columns)
- [ ] Image error handling

#### Epic 5: Checkout Process
**As a** buyer
**I want to** complete my purchase with a simple checkout process
**So that** I can receive my products

**Acceptance Criteria:**
- [ ] Google Forms integration (ID: 1FAIpQLSd_KUORaRPQHoCM6B0GGp_fqI5eiAH0KM2Iwj1mXTgGEjawnQ)
- [ ] Contact information form (name, email, phone, DNI)
- [ ] Shipping address form (street, postal code, location, province)
- [ ] Payment method selection (card, Mercado Pago, transfer)
- [ ] Cart summary integration
- [ ] Form validation (real-time)
- [ ] Success confirmation page

#### Epic 6: Conversion Optimization
**As a** business owner
**I want to** maintain conversion elements throughout the funnel
**So that** I don't lose sales during the migration

**Acceptance Criteria:**
- [ ] Benefits bar with promotional messaging
- [ ] Floating CTA buttons for cart and checkout
- [ ] Price promotions visibility
- [ ] Urgency and scarcity indicators
- [ ] Social proof integration
- [ ] Mobile-first responsive design

### 3.2 Technical Requirements

#### 3.2.1 Performance Requirements
- **First Contentful Paint (FCP)**: < 1.2s
- **Largest Contentful Paint (LCP)**: < 2.0s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Image Optimization**: WebP format with lazy loading

#### 3.2.2 SEO Requirements
- Meta tags optimization (title, description, OG)
- Structured data for products
- Semantic HTML structure
- Image alt tags and accessibility
- Mobile-friendly design

#### 3.2.3 Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast ratios

#### 3.2.4 Browser Support
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile iOS Safari 14+
- Mobile Chrome 90+

### 3.3 Integration Requirements

#### 3.3.1 Third-Party Services
- **Google Forms**: Checkout form submission
- **Facebook Pixel**: Conversion tracking (ID: 1052677351596434)
- **Google Fonts**: Playfair Display, Lato
- **Swiper.js**: Image carrusels

#### 3.3.2 Data Management
- **Product Catalog**: TypeScript interfaces in `src/data/products.ts`
- **Testimonials**: Dynamic loading from `/images/testimonials/`
- **Cart Data**: LocalStorage persistence
- **Form Data**: Google Forms field mapping

---

## 4. Technical Architecture

### 4.1 Technology Stack
- **Framework**: Astro 5.15.5 (Static Site Generation)
- **Styling**: Tailwind CSS 3.4+ (Utility-first)
- **Interactivity**: Alpine.js 3.x (Lightweight reactivity)
- **Carrusels**: Swiper.js 11.x (Touch-enabled)
- **TypeScript**: Static typing and interfaces
- **Images**: WebP format with fallbacks

### 4.2 Project Structure
```
src/
├── components/
│   ├── ProductCard.astro          # Product showcase with carrusel
│   ├── MiniCart.astro              # Shopping cart sidebar
│   ├── Testimonials.astro          # Dynamic testimonials
│   └── CheckoutForm.astro          # Checkout process
├── data/
│   ├── products.ts                 # Product catalog
│   └── testimonials.ts             # Testimonials data
├── pages/
│   └── index.astro                 # Main funnel page
└── layouts/
    └── MainLayout.astro            # Base layout
```

### 4.3 State Management
- **Cart**: Alpine.js store with LocalStorage
- **UI State**: Alpine.js reactive components
- **Form State**: HTML5 validation + Alpine.js

### 4.4 Chrome DevTools Integration
- **Live Testing**: MCP Chrome DevTools for debugging
- **Performance Monitoring**: Core Web Vitals measurement
- **Visual Regression**: Automated screenshot comparison
- **Responsive Testing**: Multi-device validation

---

## 5. Design Specifications

### 5.1 Visual Identity
- **Primary Color**: #a05941 (Rosita burgundy)
- **Secondary Color**: #d68c45 (Orange accent)
- **Success Color**: #10b981 (Green)
- **Typography**: Playfair Display (headers), Lato (body)

### 5.2 Layout Specifications
- **Mobile First**: Responsive breakpoints (sm: 640px, lg: 1024px)
- **Grid System**: Tailwind CSS grid utilities
- **Spacing**: Consistent spacing scale (4, 8, 12, 16, 20, 24px)
- **Component Spacing**: 16-24px between sections

### 5.3 Interaction Design
- **Hover States**: All interactive elements with hover feedback
- **Loading States**: Skeleton screens and spinners
- **Error States**: Clear error messages and recovery actions
- **Success States**: Confirmation messages and next steps

---

## 6. Testing Strategy

### 6.1 Manual Testing
- **Chrome DevTools MCP**: Live debugging and performance testing
- **Cross-browser Testing**: Manual validation across target browsers
- **Mobile Testing**: Real device testing where possible
- **Accessibility Testing**: Screen reader and keyboard navigation

### 6.2 Automated Testing
- **Visual Regression**: Screenshot comparison with original funnel
- **Performance Testing**: Core Web Vitals measurement
- **Form Testing**: Google Forms submission validation
- **Link Testing**: All internal and external links

### 6.3 User Acceptance Testing
- **Complete Funnel Flow**: From product discovery to purchase completion
- **Mobile Experience**: Full mobile funnel validation
- **Cart Functionality**: Add, remove, modify cart items
- **Form Submission**: Complete checkout process testing

---

## 7. Deployment Strategy

### 7.1 Development Environment
- **Local Development**: `npm run dev` on port 4328
- **Chrome DevTools**: MCP connection for live testing
- **Image Management**: Local image assets in `/public/images/`
- **Environment Variables**: Google Forms integration

### 7.2 Production Deployment
- **Static Generation**: Astro build process
- **Image Optimization**: WebP format generation
- **Asset Optimization**: CSS and JavaScript minification
- **Performance Monitoring**: Core Web Vitals tracking

### 7.3 Migration Strategy
- **Phased Rollout**: Component-by-component deployment
- **Feature Flags**: Toggle features during migration
- **Rollback Plan**: Quick revert to original if issues arise
- **Monitoring**: Real-time performance and conversion tracking

---

## 8. Success Metrics

### 8.1 Technical Metrics
- **Load Time**: < 2s full page load
- **Time to Interactive**: < 3s
- **Core Web Vitals**: All metrics in green zone
- **Mobile Performance**: 95+ Google PageSpeed score

### 8.2 Business Metrics
- **Conversion Rate**: Maintain or improve from baseline
- **Cart Abandonment Rate**: < 70%
- **Mobile Conversion Rate**: Improve from baseline
- **Page Speed Score**: 90+ on average

### 8.3 User Experience Metrics
- **Task Success Rate**: > 95% for key user flows
- **Error Rate**: < 1% for critical functions
- **Accessibility Score**: WCAG 2.1 AA compliance
- **Mobile Usability**: 100% mobile-friendly

---

## 9. Risk Assessment

### 9.1 Technical Risks
- **Image Loading**: Performance impact of high-quality images
  - **Mitigation**: Lazy loading and WebP optimization
- **JavaScript Dependencies**: Bundle size and loading performance
  - **Mitigation**: Code splitting and async loading
- **Browser Compatibility**: Older browser support
  - **Mitigation**: Progressive enhancement and polyfills

### 9.2 Business Risks
- **Conversion Rate Drop**: Migration impacting sales
  - **Mitigation**: Feature parity testing and gradual rollout
- **Lost Functionality**: Missing critical e-commerce features
  - **Mitigation**: Comprehensive testing and validation
- **Performance Regression**: Slower load times than original
  - **Mitigation**: Performance budget and continuous monitoring

### 9.3 Timeline Risks
- **Development Delays**: Complex component integration
  - **Mitigation**: Phased development and parallel tasks
- **Testing Bottlenecks**: Comprehensive testing requirements
  - **Mitigation**: Automated testing and Chrome DevTools integration
- **Deployment Issues**: Production deployment complications
  - **Mitigation**: Staging environment and rollback procedures

---

## 10. Implementation Timeline

### Phase 1: Foundation (Week 1)
- Project setup and BMad integration
- Chrome DevTools MCP connection
- Image assets organization and optimization
- Base components creation

### Phase 2: Core Components (Week 2-3)
- Product showcase with Swiper carrusels
- Shopping cart system implementation
- Size and quantity selection system
- Basic responsive design

### Phase 3: Advanced Features (Week 3-4)
- Testimonials dynamic loading
- Checkout process with Google Forms
- Form validation and error handling
- Mobile optimization

### Phase 4: Integration & Testing (Week 4-5)
- Component integration and system testing
- Performance optimization
- Chrome DevTools validation
- Cross-browser and mobile testing

### Phase 5: Deployment (Week 5-6)
- Production deployment
- Performance monitoring
- User acceptance testing
- Final optimization and bug fixes

---

## 11. Approval

**Product Manager**: _________________________ **Date**: _______

**Technical Lead**: _________________________ **Date**: _______

**Stakeholder**: _________________________ **Date**: _______

---

*This PRD follows BMad Agile methodology with Chrome DevTools MCP integration for Rosita Rococó e-commerce funnel migration.*