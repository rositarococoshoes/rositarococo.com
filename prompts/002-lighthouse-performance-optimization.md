<objective>
Analyze the Lighthouse performance report for https://rositarococo.com/astrocline/ and implement optimizations to improve the Performance score from 59 to 80+ while maintaining aesthetic quality and functionality. Focus on the critical issues identified: image optimization, caching, render-blocking resources, and main-thread work reduction.
</objective>

<context>
This is an e-commerce website for Rosita Rococó footwear with an "Otoño-Elegante" design theme. The site features product carousels, shopping cart functionality, and WhatsApp integration. Performance is critical for user experience and conversion rates, but the aesthetic quality and functionality must not be compromised.

Current Lighthouse scores:
- Performance: 59 (needs improvement)
- Accessibility: 80
- Best Practices: 100
- SEO: 92

Key performance issues to address:
1. **Image optimization**: 3,063 KiB potential savings from oversized images (1080x1350 displayed at 362x453)
2. **Cache efficiency**: 2,384 KiB potential savings with longer cache TTL
3. **Render-blocking resources**: CSS and fonts blocking initial render
4. **Total blocking time**: 1,080 ms (too high)
5. **Network payload**: 3,529 KiB total size

The website uses:
- Astro framework
- WebP images for products
- Swiper carousel
- Custom carousel functionality
- Google Fonts
- WhatsApp integration
</context>

<requirements>
1. **Image Optimization** (Priority: High)
   - Implement responsive images with appropriate sizes for different viewports
   - Use WebP format with fallbacks
   - Consider lazy loading for below-the-fold images
   - Generate multiple image sizes for responsive delivery
   - Target at least 50% reduction in image payload size

2. **Caching Strategy** (Priority: High)
   - Implement proper cache headers for static assets
   - Use cache-control headers with long TTL (1 year for immutable assets)
   - Implement versioning for cache busting

3. **Render-Blocking Resources** (Priority: Medium)
   - Optimize CSS delivery (inline critical CSS, defer non-critical)
   - Implement font loading optimization (preload, font-display)
   - Consider async loading for non-critical JavaScript

4. **Main-Thread Work Reduction** (Priority: Medium)
   - Analyze and optimize JavaScript execution
   - Reduce script evaluation time
   - Consider code splitting for better performance

5. **Network Optimization** (Priority: Medium)
   - Minimize total payload size
   - Implement resource prioritization
   - Consider compression optimizations

**Critical Constraints:**
- DO NOT reduce image quality or affect visual appeal
- Maintain all existing functionality (carousel, cart, WhatsApp)
- Preserve the "Otoño-Elegante" aesthetic design
- Ensure mobile responsiveness is maintained
- No breaking changes to user experience
</requirements>

<implementation>
1. **First, analyze the current structure:**
   - Examine the astrocline directory structure
   - Review current image handling and optimization
   - Check existing caching headers and asset delivery
   - Analyze CSS and JS loading patterns

2. **Implement optimizations systematically:**
   - Start with image optimization (highest impact)
   - Add proper caching headers
   - Optimize critical resources loading
   - Test each optimization to ensure no functionality loss

3. **Use performance measurement:**
   - Take baseline performance measurements
   - Measure after each optimization
   - Verify Lighthouse score improvements
   - Ensure visual quality is maintained

4. **Technical approach:**
   - Use Astro's built-in image optimization features
   - Implement responsive image components
   - Use modern CSS loading techniques
   - Leverage browser caching best practices
</implementation>

<analysis_focus>
Thoroughly analyze these specific areas from the Lighthouse report:

1. **Image Delivery Issues:**
   - All images oversized by ~3x (1080x1350 → 362x453)
   - Potential 3,063 KiB savings
   - Need responsive images with proper sizing

2. **Cache Inefficiency:**
   - 4-hour cache TTL too short for static assets
   - 2,384 KiB potential savings with proper caching

3. **Render-Blocking Resources:**
   - CSS files blocking initial render
   - Google Fonts loading slowly (840ms)
   - Swiper CSS blocking (880ms)

4. **Main-Thread Performance:**
   - 12.3 seconds total main-thread work
   - 1,080ms total blocking time
   - 11 long tasks identified

5. **Network Payload:**
   - 3,529 KiB total page size
   - Multiple large images contributing to payload
</analysis_focus>

<output>
Create/modify the following files as needed:

- `./astrocline/` - Optimized HTML files with responsive images
- Image optimization scripts or configurations
- Cache header configurations
- CSS optimization implementations
- Performance monitoring tools
- Before/after performance analysis report

Document all changes made with performance impact measurements.
</output>

<verification>
Before declaring complete, verify:

1. **Performance Improvements:**
   - Lighthouse Performance score improves from 59 to 80+
   - FCP reduces from 2.5s to under 1.5s
   - LCP reduces from 4.2s to under 2.5s
   - TBT reduces from 1080ms to under 300ms
   - Total payload size reduces by at least 30%

2. **Quality Assurance:**
   - All images maintain visual quality
   - Carousel functionality works perfectly
   - Shopping cart and WhatsApp integration unaffected
   - Mobile responsiveness preserved
   - No layout shifts or visual regressions

3. **Technical Validation:**
   - Responsive images work across all viewports
   - Cache headers properly implemented
   - No console errors or warnings
   - Cross-browser compatibility maintained

4. **User Experience Testing:**
   - Manual testing of all interactive elements
   - Visual comparison with original design
   - Performance testing on different network conditions
</verification>

<success_criteria>
- Lighthouse Performance score: 80+ (improvement of +21 points)
- Image payload reduction: 50%+ (saving 1.5+ GB)
- Cache efficiency: 1+ year TTL for static assets
- Render-blocking resources eliminated
- Total blocking time: under 300ms
- Zero visual quality degradation
- All functionality preserved
- Mobile responsiveness maintained
- No console errors
- Positive user experience validation
</success_criteria>