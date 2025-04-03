/**
 * Test Script for Otono-Elegante Redesign
 * 
 * This script tests the functionality of the redesigned website.
 * It should be run in the browser console while viewing otono-elegante.html.
 */

// Test Suite
const TestSuite = {
    results: {
        passed: 0,
        failed: 0,
        total: 0
    },
    
    // Test runner
    test: function(name, testFn) {
        this.results.total++;
        try {
            const result = testFn();
            if (result) {
                console.log(`%c✓ PASS: ${name}`, 'color: green; font-weight: bold');
                this.results.passed++;
            } else {
                console.log(`%c✗ FAIL: ${name}`, 'color: red; font-weight: bold');
                this.results.failed++;
            }
        } catch (error) {
            console.log(`%c✗ ERROR: ${name}`, 'color: red; font-weight: bold');
            console.error(error);
            this.results.failed++;
        }
    },
    
    // Report results
    report: function() {
        console.log('\n----- TEST RESULTS -----');
        console.log(`Total tests: ${this.results.total}`);
        console.log(`%cPassed: ${this.results.passed}`, 'color: green');
        console.log(`%cFailed: ${this.results.failed}`, 'color: red');
        console.log('------------------------\n');
        
        return {
            passed: this.results.passed,
            failed: this.results.failed,
            total: this.results.total
        };
    }
};

// Visual Tests
function runVisualTests() {
    console.log('\n----- RUNNING VISUAL TESTS -----');
    
    // Test color scheme
    TestSuite.test('Color scheme matches design spec', () => {
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        const bgColor = computedStyle.backgroundColor;
        // Check if background color is in the beige/cream family
        return bgColor.includes('rgb(250, 247, 242)') || 
               bgColor.includes('#faf7f2') ||
               bgColor.includes('rgb(245, 245, 220)') ||
               bgColor.includes('#f5f5dc');
    });
    
    // Test typography
    TestSuite.test('Typography uses specified fonts', () => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const body = document.querySelectorAll('p, span, div');
        
        let headingsUseCorrectFont = true;
        let bodyUseCorrectFont = true;
        
        headings.forEach(heading => {
            const fontFamily = window.getComputedStyle(heading).fontFamily.toLowerCase();
            if (!fontFamily.includes('playfair') && !fontFamily.includes('serif')) {
                headingsUseCorrectFont = false;
            }
        });
        
        return headingsUseCorrectFont;
    });
    
    // Test carousel images
    TestSuite.test('Carousel images display properly', () => {
        const carouselImages = document.querySelectorAll('.model-carousel img');
        let allImagesDisplayProperly = true;
        
        if (carouselImages.length === 0) {
            return false;
        }
        
        carouselImages.forEach(img => {
            // Check if image has proper dimensions and object-fit
            const style = window.getComputedStyle(img);
            if (style.objectFit !== 'contain') {
                allImagesDisplayProperly = false;
            }
        });
        
        return allImagesDisplayProperly;
    });
}

// Responsive Tests
function runResponsiveTests() {
    console.log('\n----- RUNNING RESPONSIVE TESTS -----');
    
    // Test container responsiveness
    TestSuite.test('Container is responsive', () => {
        const container = document.querySelector('.container');
        if (!container) return false;
        
        const style = window.getComputedStyle(container);
        return style.maxWidth !== 'none' && style.width.includes('%');
    });
    
    // Test product grid responsiveness
    TestSuite.test('Product grid is responsive', () => {
        const grid = document.querySelector('.product-grid');
        if (!grid) return false;
        
        const style = window.getComputedStyle(grid);
        return style.display === 'grid' && 
               style.gridTemplateColumns.includes('minmax') || 
               style.gridTemplateColumns.includes('repeat');
    });
}

// Functionality Tests
function runFunctionalityTests() {
    console.log('\n----- RUNNING FUNCTIONALITY TESTS -----');
    
    // Test product selection
    TestSuite.test('Product selection works', () => {
        // Select a product
        const firstSelect = document.querySelector('.form-control.talle');
        if (!firstSelect) return false;
        
        // Simulate selection
        const event = new Event('change', { bubbles: true });
        firstSelect.value = firstSelect.options[1].value; // Select first option
        firstSelect.dispatchEvent(event);
        
        // Check if selection is reflected in summary
        const summary = document.getElementById('1471599855');
        return summary && summary.value.includes(firstSelect.value);
    });
    
    // Test quantity selection
    TestSuite.test('Quantity selection shows/hides second size selector', () => {
        // Find first quantity radio button set
        const qtyRadios = document.querySelectorAll('input[type="radio"][name^="hwA-qty-"]');
        if (qtyRadios.length < 2) return false;
        
        // Get the name of the first set
        const name = qtyRadios[0].name;
        const modelId = name.replace('hwA-qty-', '');
        
        // Get the second size selector fieldset
        const secondFieldset = document.getElementById(`hwA-${modelId}-2`);
        if (!secondFieldset) return false;
        
        // Initial state should be hidden
        const initialDisplay = window.getComputedStyle(secondFieldset).display;
        
        // Select quantity 2
        const qtyRadio2 = document.querySelector(`input[name="${name}"][value="2"]`);
        qtyRadio2.checked = true;
        qtyRadio2.dispatchEvent(new Event('click', { bubbles: true }));
        
        // Check if second fieldset is now visible or in process of becoming visible
        const afterClickDisplay = window.getComputedStyle(secondFieldset).display;
        const isBecomingVisible = afterClickDisplay !== 'none' || 
                                 secondFieldset.classList.contains('slick-active') ||
                                 secondFieldset.style.display === 'block';
        
        // Reset to original state
        const qtyRadio1 = document.querySelector(`input[name="${name}"][value="1"]`);
        qtyRadio1.checked = true;
        qtyRadio1.dispatchEvent(new Event('click', { bubbles: true }));
        
        return initialDisplay === 'none' && isBecomingVisible;
    });
    
    // Test form validation
    TestSuite.test('Form validation works', () => {
        const form = document.getElementById('bootstrapForm');
        if (!form) return false;
        
        // Try to submit with empty required fields
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        const wasSubmitted = !form.dispatchEvent(submitEvent);
        
        // If form validation works, the form should not be submitted
        return !wasSubmitted;
    });
}

// Performance Tests
function runPerformanceTests() {
    console.log('\n----- RUNNING PERFORMANCE TESTS -----');
    
    // Test lazy loading
    TestSuite.test('Images use lazy loading', () => {
        const lazyImages = document.querySelectorAll('img[data-lazy]');
        return lazyImages.length > 0;
    });
    
    // Test image optimization
    TestSuite.test('Images have appropriate dimensions', () => {
        const images = document.querySelectorAll('img');
        let appropriateDimensions = true;
        
        images.forEach(img => {
            // Check if image has width and height attributes or style
            if (!img.getAttribute('width') && !img.style.width &&
                !img.getAttribute('height') && !img.style.height) {
                appropriateDimensions = false;
            }
        });
        
        return appropriateDimensions;
    });
}

// Run all tests
function runAllTests() {
    console.log('%c===== STARTING TESTS FOR OTONO-ELEGANTE REDESIGN =====', 'font-size: 16px; font-weight: bold; color: blue;');
    
    runVisualTests();
    runResponsiveTests();
    runFunctionalityTests();
    runPerformanceTests();
    
    return TestSuite.report();
}

// Execute tests
setTimeout(runAllTests, 1000); // Wait for page to fully load
