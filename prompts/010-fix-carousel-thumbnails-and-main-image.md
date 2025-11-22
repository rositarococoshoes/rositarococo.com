<objective>
Fix carousel thumbnail styling issues and optimize main carousel image display on the local server at http://localhost:3000/astrocline/. The thumbnails have excessive spacing between them and are overlapping background text. Additionally, the main carousel image should display as large as possible without cropping or distortion across all devices.

</objective>

<context>
The Rosita Rococó website's carousel thumbnails need styling improvements and the main carousel image needs optimization. Current issues:

**Thumbnail Issues:**
1. **Excessive spacing** - Too much gap between each thumbnail
2. **Text overlap** - Thumbnails are positioned over background text, obscuring content
3. **Poor visual hierarchy** - Thumbnails lack proper styling prominence

**Main Carousel Image Issues:**
1. **Cropping/distortion** - Main image may be cropped or improperly sized
2. **Suboptimal display size** - Image could be larger without quality loss
3. **Responsive inconsistency** - Different behavior across device sizes

**Target Environment:**
- Local server: http://localhost:3000/astrocline/
- Must work across all device sizes (mobile, tablet, desktop)
- Should maintain existing carousel functionality

**MCP Testing Strategy:**
When testing is required, delegate to specialized subagents with clear instructions:
- For Chrome DevTools testing: use subagent to run console tests, capture screenshots, and use AI Vision MCP to interpret results
- For visual verification: use AI Vision MCP through subagents since the main language model lacks vision capabilities
- For console logs and debugging: use subagent with Chrome DevTools MCP to gather objective, deterministic information
- Testing priority: Always prioritize console tests for objective/deterministic data, then use element-specific screenshots analyzed by AI Vision

**Files to examine and modify:**
- `astrocline/index.html` - Thumbnail structure and positioning
- `astrocline/css/carousel.css` - Thumbnail spacing, positioning, and styling
- `astrocline/css/custom.css` - Overall carousel layout and main image sizing
- `astrocline/css/mobile-fixes.css` - Responsive thumbnail behavior
- `astrocline/js/carousel.js` - May need thumbnail positioning adjustments
</context>

<requirements>
1. **Reduce thumbnail spacing** - Eliminate excessive gaps between carousel thumbnails
2. **Fix text overlap** - Reposition thumbnails so they don't cover background text
3. **Improve thumbnail styling** - Enhance visual design and prominence of thumbnails
4. **Optimize main carousel image** - Display as large as possible without cropping or distortion
5. **Ensure responsive consistency** - Fix must work properly across all device sizes
6. **Preserve carousel functionality** - Don't break existing carousel navigation and interaction
7. **Maintain performance** - Solutions should not impact page load times significantly

**Specific requirements:**
- Thumbnails should have appropriate, consistent spacing
- Thumbnails should be positioned in a dedicated area, not overlapping content
- Main carousel image should use maximum available space without distortion
- All fixes must be responsive and work on mobile, tablet, and desktop
- Visual design should be professional and consistent with brand aesthetics
</requirements>

<implementation>
1. **Analyze current thumbnail layout:**
   - Use Chrome DevTools to inspect thumbnail container and spacing
   - Identify CSS rules causing excessive gaps between thumbnails
   - Determine current positioning and why thumbnails overlap text
   - Review thumbnail container structure and z-index issues

2. **Fix thumbnail spacing and positioning:**
   - Adjust CSS gap/margin properties between thumbnail items
   - Reposition thumbnail container to dedicated area away from main content
   - Ensure proper z-index layering to prevent text overlap
   - Optimize thumbnail container layout for different screen sizes

3. **Optimize main carousel image display:**
   - Review current image sizing constraints and object-fit properties
   - Adjust image container to use maximum available space
   - Ensure proper aspect ratio maintenance without cropping
   - Implement responsive sizing that adapts to different viewport sizes

4. **Enhance thumbnail visual design:**
   - Improve thumbnail styling for better visual prominence
   - Add proper hover states and transitions
   - Ensure thumbnails are easily clickable and accessible
   - Maintain consistency with overall site design

5. **Test responsive behavior:**
   - Verify fixes work across mobile, tablet, and desktop viewports
   - Test carousel functionality after changes
   - Ensure thumbnails remain properly positioned during responsive transitions
   - Validate main image displays optimally on all device sizes
</implementation>

<output>
Create/modify files:
- `astrocline/css/carousel.css` - Fix thumbnail spacing, positioning, and styling
- `astrocline/css/custom.css` - Optimize main carousel image display
- `astrocline/css/mobile-fixes.css` - Ensure responsive thumbnail behavior
- `astrocline/index.html` - Adjust thumbnail container structure if needed
- `astrocline/js/carousel.js` - Update thumbnail positioning logic if required

**Key improvements to implement:**
- Reduce excessive gaps between carousel thumbnails
- Position thumbnails in dedicated area away from main content
- Optimize main carousel image for maximum display size without distortion
- Ensure proper responsive behavior across all device sizes
- Maintain and enhance existing carousel functionality
</output>

<verification>
Before declaring complete, verify:
1. Test on local server: http://localhost:3000/astrocline/
2. Use Chrome DevTools to inspect thumbnail spacing and positioning
3. Verify thumbnails no longer overlap background text
4. Check that spacing between thumbnails is appropriate and consistent
5. Test main carousel image displays at optimal size without cropping
6. Verify responsive behavior works correctly on mobile, tablet, and desktop
7. Test carousel navigation and thumbnail clicking functionality
8. Check browser console for any JavaScript or CSS errors
9. Test across different screen sizes and orientations
10. Verify performance is not impacted by changes

**MCP Testing Approach:**
Use subagent delegation for comprehensive testing:
1. **Console Tests (Priority)**: Use Chrome DevTools MCP subagent to gather objective data:
   - Check browser console for JavaScript errors
   - Inspect CSS computed values for spacing and positioning
   - Verify responsive breakpoints are working correctly
   - Monitor network requests and performance metrics

2. **Visual Verification**: Use AI Vision MCP through subagents to analyze screenshots:
   - Capture screenshots of thumbnail spacing before and after fixes
   - Verify thumbnails are positioned away from background text
   - Confirm main carousel image displays at optimal size
   - Test responsive behavior across different viewport sizes
   - Analyze layout for any shifts or visual inconsistencies

3. **Element-Specific Testing**:
   - Take targeted screenshots of thumbnail containers
   - Capture main carousel image display areas
   - Test interactive states (hover, active, clicked)
   - Verify z-index layering prevents text overlap
</verification>

<success_criteria>
- Thumbnail spacing is optimized with appropriate, consistent gaps
- Thumbnails are positioned in dedicated area without overlapping text
- Main carousel image displays at maximum possible size without distortion
- Responsive behavior works perfectly across all device sizes
- Carousel functionality remains fully operational
- Visual design is professional and consistent with brand
- No performance degradation from changes
- All interactive elements work as expected
- Layout is stable with no unwanted shifts or overlaps
- Solution provides optimal user experience on all devices
</success_criteria>