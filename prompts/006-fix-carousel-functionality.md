<objective>
Fix carousel functionality across the Rosita Rococó website to enable proper sliding/swiping gestures and thumbnail navigation. The current implementation has non-functional carousels that don't respond to gestures or thumbnail clicks, preventing users from browsing product images properly.

</objective>

<context>
This addresses critical carousel functionality issues for the Rosita Rococó e-commerce website. Currently the product image carousels are completely non-functional:

1. Sliding/swiping gestures don't work between images
2. Thumbnail navigation clicks don't switch main images
3. Carousel controls are unresponsive
4. Users cannot browse product image galleries effectively

This severely impacts the shopping experience as customers can't view product details from multiple angles.

Key files to examine:
- astrocline/js/carousel.js (main carousel implementation)
- astrocline/index.html (carousel HTML structure)
- Any CSS files affecting carousel behavior
- JavaScript libraries or dependencies for carousel functionality

Previous work has focused on styling and checkout flow, but the core carousel functionality remains broken.
</context>

<requirements>
1. Implement working sliding/swipe gestures for carousel navigation
2. Enable thumbnail click functionality to switch main images
3. Add responsive touch support for mobile devices
4. Ensure smooth transitions between carousel slides
5. Implement proper image preloading for better performance
6. Add carousel controls (prev/next buttons) if missing or broken
7. Ensure keyboard navigation support (arrow keys)
8. Add proper error handling for missing images
9. Implement auto-advance functionality (optional, can be disabled)
10. Ensure carousel works across all device types (desktop, tablet, mobile)
11. Test carousel accessibility with screen readers
12. Fix any JavaScript errors preventing carousel initialization

Technical requirements:
- Use modern JavaScript event handling (addEventListener)
- Implement touch event handlers for mobile gestures
- Ensure proper cleanup of event listeners
- Use efficient DOM manipulation for smooth performance
- Implement proper image loading states
- Handle edge cases (empty galleries, single images, broken images)
</requirements>

<implementation>
1. Audit current carousel implementation:
   - Examine existing JavaScript code in carousel.js
   - Check HTML structure in index.html for proper carousel elements
   - Identify any JavaScript errors or initialization issues
   - Review CSS that might interfere with carousel functionality
   - Test current event handlers and identify what's broken

2. Implement working carousel functionality:
   - Create robust slide switching mechanism
   - Add touch event handlers for mobile swiping
   - Implement thumbnail click event listeners
   - Add smooth CSS transitions between slides
   - Create prev/next navigation controls
   - Implement keyboard navigation support

3. Optimize performance and UX:
   - Add image preloading for smooth transitions
   - Implement loading states and error handling
   - Add proper ARIA labels for accessibility
   - Ensure responsive behavior across devices
   - Optimize touch gesture sensitivity and timing

4. Add enhanced features:
   - Optional auto-advance with pause on hover
   - Image zoom functionality (if appropriate)
   - Lazy loading for image optimization
   - Proper focus management for accessibility
   - Indicators showing current slide position

5. Test thoroughly:
   - Test all interaction methods (touch, click, keyboard)
   - Verify functionality across different browsers
   - Test with varying numbers of images
   - Check performance with large image sets
   - Validate accessibility compliance
</implementation>

<output>
Create/modify files:
- `astrocline/js/carousel.js` - Complete rewrite or fix of carousel functionality
- `astrocline/index.html` - Update carousel HTML structure if needed
- `astrocline/css/custom.css` - Add carousel-specific styles for smooth transitions

Key functionality to implement:
- Touch/swipe gesture detection and handling
- Thumbnail click event listeners
- Smooth slide transitions with CSS
- Navigation controls (prev/next buttons)
- Keyboard event handlers
- Image preloading and loading states
- Accessibility attributes and ARIA labels
- Error handling for broken or missing images
- Mobile-optimized touch targets and gestures
</output>

<verification>
Before declaring complete, verify:
1. Test carousel swiping gestures on mobile devices
2. Verify thumbnail clicks properly switch main images
3. Test prev/next navigation buttons functionality
4. Check keyboard navigation (arrow keys) works
5. Test carousel with different numbers of images (1, 2, 5+ images)
6. Verify smooth transitions between slides
7. Test on different browsers (Chrome, Safari, Firefox)
8. Check performance with larger image sets
9. Test accessibility with screen readers
10. Verify responsive behavior across device sizes
11. Test error handling for broken images
12. Check memory leaks and event listener cleanup

Functional verification:
- Open Chrome DevTools and monitor for JavaScript errors
- Test all carousel interactions systematically
- Verify touch events work properly on mobile devices
- Check that focus management works for keyboard users
- Confirm ARIA labels are properly set for screen readers
- Test carousel auto-advance if implemented
</verification>

<success_criteria>
- Swiping gestures work smoothly on mobile devices
- Thumbnail clicks immediately switch to corresponding main image
- Navigation buttons (prev/next) function correctly
- Keyboard navigation works with arrow keys
- Smooth CSS transitions between all slides
- No JavaScript errors in browser console
- Proper image loading states and error handling
- Full accessibility support with ARIA labels
- Responsive behavior works across all device sizes
- Fast performance with minimal layout shift
- Clean event listener management (no memory leaks)
- Robust handling of edge cases (single images, broken images)
- Intuitive user experience with clear visual feedback
</success_criteria>