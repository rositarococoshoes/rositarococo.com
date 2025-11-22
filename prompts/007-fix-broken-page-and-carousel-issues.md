<objective>
Fix critical issues that broke the page layout and carousel functionality after recent changes. The page is now broken, carousels don't show images properly when sliding, images appear too small, and the 3-column desktop carousel layout has been lost. Additionally, there's duplicate promotional text that needs removal.

</objective>

<context>
After the recent mobile responsiveness and carousel fixes, several critical issues have emerged on the Rosita Rococó website:

**Critical Issues to Fix:**
1. **Page is broken** - Layout structure has been damaged
2. **Duplicate promotional text** - "Aprovechá hoy 2 pares por $95.000" appears multiple times
3. **Carousel sliding broken** - Images don't show when sliding to next images
4. **Carousel images too small** - Image sizing is incorrect
5. **Lost 3-column layout** - Desktop carousel should show 3 columns but this structure is broken

**Testing Requirement:**
Must use Chrome DevTools MCP server to test on the live site: https://rositarococo.com/astrocline

The recent changes may have introduced CSS conflicts, HTML structure issues, or JavaScript errors that are causing these problems. Need to systematically identify and fix each issue.

**Files likely affected:**
- astrocline/index.html (structure, duplicate content)
- astrocline/css/custom.css (layout conflicts)
- astrocline/css/mobile-fixes.css (may have broken desktop layout)
- astrocline/js/carousel.js (carousel functionality)
- astrocline/css/carousel.css (carousel styling)

This is a critical fix needed to restore the website to working condition.
</context>

<requirements>
1. **Fix broken page layout** - Restore proper page structure and functionality
2. **Remove duplicate promotional text** - Find and eliminate repeated "Aprovechá hoy 2 pares por $95.000"
3. **Fix carousel sliding functionality** - Ensure images display properly when navigating
4. **Correct carousel image sizing** - Make images appropriate size for both desktop and mobile
5. **Restore 3-column desktop layout** - Ensure carousel shows proper 3-column structure on desktop
6. **Test on live site** - Use Chrome DevTools MCP to verify fixes on https://rositarococo.com/astrocline
7. **Ensure mobile responsiveness preserved** - Don't break the mobile fixes that were working
8. **Verify all functionality works** - Test carousels, navigation, checkout, etc.

**Investigation needed:**
- Check for CSS conflicts between new and existing styles
- Verify HTML structure wasn't corrupted
- Ensure JavaScript initialization is working properly
- Check for responsive design conflicts between desktop and mobile
- Identify source of duplicate content
</requirements>

<implementation>
1. **Investigate current issues:**
   - Use Chrome DevTools to inspect the live site and identify specific problems
   - Check browser console for JavaScript errors
   - Analyze CSS conflicts that may be causing layout issues
   - Identify where duplicate promotional text is coming from
   - Check carousel initialization and image loading

2. **Fix page structure and duplicate content:**
   - Locate and remove duplicate promotional text instances
   - Restore proper HTML structure if corrupted
   - Fix any CSS that's breaking the main layout
   - Ensure content containers are properly sized and positioned

3. **Fix carousel issues:**
   - Restore proper image sizing in carousel slides
   - Fix sliding functionality to show all images correctly
   - Re-establish 3-column layout for desktop viewports
   - Ensure responsive behavior works for both desktop and mobile
   - Check carousel initialization and event handling

4. **Resolve CSS conflicts:**
   - Review new CSS files for conflicts with existing styles
   - Ensure desktop-specific styles aren't overridden by mobile styles
   - Fix any conflicting flexbox or grid layouts
   - Restore proper responsive breakpoints

5. **Test and verify:**
   - Use Chrome DevTools MCP server to test on live site
   - Test carousel functionality thoroughly (sliding, thumbnails, sizing)
   - Verify desktop 3-column layout is working
   - Ensure mobile responsiveness is still functional
   - Test all interactive elements and checkout flow
</implementation>

<output>
Create/modify files:
- `astrocline/index.html` - Remove duplicate content, fix structure issues
- `astrocline/css/custom.css` - Resolve layout conflicts, restore proper styling
- `astrocline/css/mobile-fixes.css` - Fix any desktop layout conflicts
- `astrocline/css/carousel.css` - Restore proper carousel layout and sizing
- `astrocline/js/carousel.js` - Fix carousel functionality if needed

**Key fixes to implement:**
- Remove duplicate promotional text instances
- Restore 3-column carousel layout for desktop
- Fix image sizing in carousel slides
- Ensure sliding functionality works properly
- Resolve CSS conflicts between desktop and mobile styles
- Maintain working mobile responsiveness
</output>

<verification>
Before declaring complete, verify:
1. Use Chrome DevTools MCP server to test on live site https://rositarococo.com/astrocline
2. Check that page layout is no longer broken
3. Verify duplicate promotional text has been removed
4. Test carousel sliding - all images should show properly
5. Confirm carousel images are appropriately sized
6. Verify 3-column layout works on desktop
7. Test mobile responsiveness is still functional
8. Check browser console for no JavaScript errors
9. Test all interactive elements (navigation, checkout, etc.)
10. Verify both desktop and mobile views work correctly

**Chrome DevTools testing:**
- Open live site and inspect layout
- Test carousel functionality with devtools
- Check responsive behavior across viewport sizes
- Monitor network requests and console errors
- Verify CSS is applying correctly
</verification>

<success_criteria>
- Page layout is completely fixed and functional
- All instances of duplicate promotional text removed
- Carousel sliding works properly showing all images
- Carousel images are appropriately sized for both desktop and mobile
- 3-column carousel layout restored on desktop viewports
- Mobile responsiveness remains fully functional
- No CSS conflicts breaking layout or functionality
- No JavaScript errors in browser console
- All interactive elements work correctly
- Live site testing with Chrome DevTools shows everything working
- Both desktop and mobile user experiences are optimal
</success_criteria>