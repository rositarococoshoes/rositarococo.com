<objective>
Fix mobile responsiveness issues across the Rosita Rococó website to eliminate overflow problems and ensure proper display on all mobile devices. The current implementation has layout breaking issues on smartphones with horizontal scrolling and content spilling outside viewport boundaries.

</objective>

<context>
This addresses critical mobile UX issues for the Rosita Rococó e-commerce website. Currently the site is not fully responsive, causing overflow problems on mobile devices that make navigation and shopping difficult.

Key areas to examine:
- Product carousel and image galleries
- Checkout flow and form layouts
- Navigation and header elements
- Product grid layouts
- Footer and general content layout
- Typography scaling on small screens

Files to examine and modify:
- astrocline/index.html (main layout structure)
- astrocline/css/custom.css (responsive styles)
- Any CSS files affecting layout
- JavaScript that might manipulate dimensions or layouts

This builds on previous styling improvements and ensures the site works properly across all devices.
</context>

<requirements>
1. Eliminate all horizontal scrolling on mobile devices
2. Fix content overflow issues where elements spill outside viewport
3. Ensure proper scaling of text, images, and interactive elements
4. Optimize touch targets for mobile interaction (minimum 44px)
5. Fix any layout breaking issues in product displays
6. Ensure checkout flow works smoothly on mobile
7. Test across different mobile viewport sizes (320px to 768px)
8. Maintain functionality while improving responsive behavior
9. Ensure all images scale properly without distortion
10. Fix any CSS that causes fixed widths incompatible with mobile

For specific issues to address:
- Search for fixed pixel widths that don't adapt to viewport
- Identify elements causing horizontal overflow
- Check for improperly scaled images or text
- Review flexbox/grid layouts for mobile compatibility
- Ensure proper viewport meta tag configuration
</requirements>

<implementation>
1. Audit current responsive issues:
   - Use Chrome DevTools to identify overflow sources
   - Test various mobile viewport sizes
   - Identify elements with fixed dimensions
   - Check for CSS that prevents proper scaling

2. Implement mobile-first responsive fixes:
   - Add proper viewport meta tag if missing
   - Convert fixed widths to responsive units (%, vw, rem)
   - Implement proper breakpoints for mobile devices
   - Use CSS Grid and Flexbox with mobile-first approach
   - Add overflow: hidden or appropriate handling where needed

3. Optimize images and media:
   - Ensure images scale with max-width: 100%
   - Implement proper aspect ratio handling
   - Use srcset or responsive images where appropriate

4. Fix typography and spacing:
   - Scale font sizes appropriately for mobile
   - Adjust padding and margins for smaller screens
   - Ensure touch targets meet accessibility standards

5. Test interactive elements:
   - Verify buttons, links, and form elements work on mobile
   - Ensure proper tap target sizes
   - Test carousel and gallery functionality on touch devices
</implementation>

<output>
Create/modify files:
- `astrocline/css/custom.css` - Add comprehensive mobile responsive styles
- `astrocline/index.html` - Update structure with proper viewport settings, add mobile-specific classes if needed
- Any additional CSS files that need responsive improvements

Key responsive fixes to implement:
- Proper viewport meta configuration
- Mobile-first CSS with appropriate breakpoints
- Flexible layouts using CSS Grid/Flexbox
- Responsive typography and spacing
- Touch-friendly interactive elements
- Proper image scaling
</output>

<verification>
Before declaring complete, verify:
1. Use Chrome DevTools Device Mode to test various mobile viewports (320px, 375px, 414px, 768px)
2. Check for any horizontal scrolling across all pages
3. Test all interactive elements (buttons, links, forms) on mobile
4. Verify product carousel and gallery work with touch gestures
5. Ensure checkout flow completes properly on mobile
6. Check that images scale properly without distortion
7. Test navigation and menu functionality on small screens
8. Verify no content spills outside viewport boundaries
9. Test on actual mobile devices if possible
10. Check Google PageSpeed Insights for mobile usability

Performance verification:
- Monitor layout shift (CLS) on mobile
- Ensure touch response times are acceptable
- Verify no horizontal layout shift during page load
</verification>

<success_criteria>
- Zero horizontal scrolling on any mobile device
- All content properly contained within viewport boundaries
- Touch targets meet minimum 44px accessibility standard
- Text remains readable at all mobile viewport sizes
- Images scale properly without distortion or overflow
- All interactive elements work correctly with touch input
- Navigation is fully functional on mobile devices
- Checkout flow works smoothly on smartphones
- No CSS layout breaking issues across mobile breakpoints
- Site passes Google mobile usability test
- Fast loading and smooth interaction on mobile networks
</success_criteria>