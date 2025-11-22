/**
 * Premium Carousel Implementation for Rosita Rococó
 * Enhanced JavaScript with better performance, touch support, and visual feedback
 */

(function() {
    'use strict';

    // Carousel configuration
    const CONFIG = {
        transitionDuration: 500,
        autoplay: false,
        autoplayInterval: 5000,
        touchThreshold: 50,
        preloadImages: true,
        lazyLoad: false
    };

    // Carousel class
    class PremiumCarousel {
        constructor(element, options = {}) {
            this.element = element;
            this.options = { ...CONFIG, ...options };
            this.currentIndex = 0;
            this.isTransitioning = false;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.autoplayTimer = null;

            this.init();
        }

        init() {
            // Find carousel elements
            this.container = this.element.querySelector('.carousel-container');
            this.slides = this.element.querySelectorAll('.carousel-slide');
            this.prevBtn = this.element.querySelector('.carousel-button.prev');
            this.nextBtn = this.element.querySelector('.carousel-button.next');
            this.indicators = this.element.querySelectorAll('.carousel-indicators li');

            if (!this.container || this.slides.length === 0) {
                console.warn('Carousel: Invalid carousel structure', this.element);
                return;
            }

            // Set initial state
            this.slideCount = this.slides.length;
            this.setupCarousel();
            this.bindEvents();
            this.preloadImages();
            this.showSlide(0);

            // Mark as initialized
            this.element.classList.add('carousel-initialized');
            this.element.classList.remove('carousel-loading');

            // Start autoplay if enabled
            if (this.options.autoplay && this.slideCount > 1) {
                this.startAutoplay();
            }
        }

        setupCarousel() {
            // Set container width for smooth transitions
            this.container.style.width = `${this.slideCount * 100}%`;

            // Set individual slide widths
            this.slides.forEach((slide, index) => {
                slide.style.width = `${100 / this.slideCount}%`;
                slide.setAttribute('data-slide-index', index);
            });

            // Update indicators
            this.updateIndicators();
        }

        bindEvents() {
            // Navigation button events
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.previous();
                });
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.next();
                });
            }

            // Indicator events
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.goToSlide(index);
                });
            });

            // Touch events for mobile
            this.element.addEventListener('touchstart', (e) => {
                this.handleTouchStart(e);
            }, { passive: true });

            this.element.addEventListener('touchend', (e) => {
                this.handleTouchEnd(e);
            }, { passive: true });

            // Keyboard navigation
            this.element.addEventListener('keydown', (e) => {
                this.handleKeyboard(e);
            });

            // Pause autoplay on hover
            this.element.addEventListener('mouseenter', () => {
                this.stopAutoplay();
            });

            this.element.addEventListener('mouseleave', () => {
                if (this.options.autoplay) {
                    this.startAutoplay();
                }
            });

            // Visibility API to pause when tab is not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.stopAutoplay();
                } else if (this.options.autoplay) {
                    this.startAutoplay();
                }
            });
        }

        handleTouchStart(e) {
            this.touchStartX = e.touches[0].clientX;
        }

        handleTouchEnd(e) {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipeGesture();
        }

        handleSwipeGesture() {
            const swipeDistance = this.touchEndX - this.touchStartX;
            const isSignificantSwipe = Math.abs(swipeDistance) > this.options.touchThreshold;

            if (isSignificantSwipe) {
                if (swipeDistance > 0) {
                    this.previous();
                } else {
                    this.next();
                }
            }
        }

        handleKeyboard(e) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previous();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.next();
            }
        }

        showSlide(index, direction = 'next') {
            if (this.isTransitioning || index === this.currentIndex) {
                return;
            }

            this.isTransitioning = true;

            // Calculate new position
            const translateX = -index * (100 / this.slideCount);

            // Apply transition with enhanced visual feedback
            this.container.style.transform = `translateX(${translateX}%)`;

            // Add transition class for visual enhancements
            this.element.classList.add('carousel-transitioning');

            // Update current index
            this.currentIndex = index;

            // Update indicators
            this.updateIndicators();

            // Update button states
            this.updateButtonStates();

            // Clear transition state after animation
            setTimeout(() => {
                this.isTransitioning = false;
                this.element.classList.remove('carousel-transitioning');
            }, this.options.transitionDuration);
        }

        next() {
            if (this.slideCount <= 1) return;

            const nextIndex = (this.currentIndex + 1) % this.slideCount;
            this.showSlide(nextIndex, 'next');
        }

        previous() {
            if (this.slideCount <= 1) return;

            const prevIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
            this.showSlide(prevIndex, 'prev');
        }

        goToSlide(index) {
            if (index >= 0 && index < this.slideCount) {
                this.showSlide(index);
            }
        }

        updateIndicators() {
            this.indicators.forEach((indicator, index) => {
                if (index === this.currentIndex) {
                    indicator.classList.add('active');
                    indicator.setAttribute('aria-current', 'true');
                } else {
                    indicator.classList.remove('active');
                    indicator.removeAttribute('aria-current');
                }
            });
        }

        updateButtonStates() {
            // Update ARIA attributes
            if (this.prevBtn) {
                this.prevBtn.setAttribute('aria-label', `Imagen anterior (${this.currentIndex + 1} de ${this.slideCount})`);
            }

            if (this.nextBtn) {
                this.nextBtn.setAttribute('aria-label', `Imagen siguiente (${this.currentIndex + 1} de ${this.slideCount})`);
            }
        }

        preloadImages() {
            if (!this.options.preloadImages) return;

            this.slides.forEach(slide => {
                const img = slide.querySelector('img');
                if (img && !img.complete) {
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        img.classList.add('image-loaded');
                    };
                    tempImg.src = img.src;
                }
            });
        }

        startAutoplay() {
            if (this.slideCount <= 1) return;

            this.stopAutoplay(); // Clear any existing timer
            this.autoplayTimer = setInterval(() => {
                this.next();
            }, this.options.autoplayInterval);
        }

        stopAutoplay() {
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
        }

        destroy() {
            // Clean up event listeners and timers
            this.stopAutoplay();

            // Remove classes
            this.element.classList.remove('carousel-initialized', 'carousel-loading', 'carousel-transitioning');

            // Reset styles
            this.container.style.transform = '';
            this.container.style.width = '';

            this.slides.forEach(slide => {
                slide.style.width = '';
            });
        }

        // Public API methods
        getCurrentIndex() {
            return this.currentIndex;
        }

        getSlideCount() {
            return this.slideCount;
        }

        isAnimating() {
            return this.isTransitioning;
        }
    }

    // Initialize carousels on DOM content loaded
    function initCarousels() {
        const carousels = document.querySelectorAll('.simple-carousel');

        carousels.forEach(carousel => {
            // Skip if already initialized
            if (carousel.classList.contains('carousel-initialized')) {
                return;
            }

            // Add loading state
            carousel.classList.add('carousel-loading');

            // Initialize with small delay for visual feedback
            setTimeout(() => {
                new PremiumCarousel(carousel, {
                    autoplay: carousel.classList.contains('testimonials-carousel') // Only autoplay for testimonials
                });
            }, 100);
        });

        console.log(`Premium Carousel: Initialized ${carousels.length} carousels`);
    }

    // Reinitialize carousels (useful for dynamic content)
    function reinitCarousels() {
        // Destroy existing carousels first
        const existingCarousels = document.querySelectorAll('.simple-carousel.carousel-initialized');
        existingCarousels.forEach(carousel => {
            if (carousel.premiumCarousel) {
                carousel.premiumCarousel.destroy();
            }
        });

        // Reinitialize
        initCarousels();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousels);
    } else {
        initCarousels();
    }

    // Global API for external access
    window.PremiumCarousel = PremiumCarousel;
    window.initPremiumCarousels = initCarousels;
    window.reinitPremiumCarousels = reinitCarousels;

    // Expose for debugging
    window.premiumCarousels = [];

    // Track initialized carousels
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            document.querySelectorAll('.simple-carousel.carousel-initialized').forEach(carousel => {
                window.premiumCarousels.push(carousel);
            });
        }, 1000);
    });

})();