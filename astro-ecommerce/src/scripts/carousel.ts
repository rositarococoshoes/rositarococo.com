// Embla Carousel initialization
declare const EmblaCarousel: any;

export function initializeCarousels(): void {
  if (typeof EmblaCarousel === 'undefined') {
    console.error('EmblaCarousel not loaded');
    return;
  }

  const carouselNodes = document.querySelectorAll('.embla');

  carouselNodes.forEach((node, index) => {
    const viewport = node.querySelector('.embla__viewport') as HTMLElement;
    if (!viewport) return;

    try {
      const embla = EmblaCarousel(viewport, {
        align: 'start',
        containScroll: 'keepSnaps',
        dragFree: false,
        loop: true,
      });

      // Navigation buttons
      const prevBtn = node.querySelector('.embla__button--prev');
      const nextBtn = node.querySelector('.embla__button--next');

      prevBtn?.addEventListener('click', () => embla.scrollPrev());
      nextBtn?.addEventListener('click', () => embla.scrollNext());

      // Thumbnails
      const thumbsNode = node.querySelector('.embla-thumbs');
      if (thumbsNode) {
        const thumbsViewport = thumbsNode.querySelector('.embla-thumbs__viewport') as HTMLElement;
        
        if (thumbsViewport) {
          const thumbsEmbla = EmblaCarousel(thumbsViewport, {
            containScroll: 'keepSnaps',
            dragFree: true,
          });

          const thumbSlides = thumbsNode.querySelectorAll('.embla-thumbs__slide');

          // Click on thumbnail
          thumbSlides.forEach((thumb, thumbIndex) => {
            thumb.addEventListener('click', () => {
              embla.scrollTo(thumbIndex);
            });
          });

          // Sync selection
          const updateSelected = () => {
            const selected = embla.selectedScrollSnap();
            thumbSlides.forEach((thumb, i) => {
              thumb.classList.toggle('embla-thumbs__slide--selected', i === selected);
            });
            
            // Scroll thumbnail into view
            if (thumbsEmbla.scrollTo) {
              thumbsEmbla.scrollTo(selected);
            }
          };

          embla.on('select', updateSelected);
          updateSelected();
        }
      }

      console.log(`Carousel ${index} initialized`);
    } catch (error) {
      console.error(`Error initializing carousel ${index}:`, error);
    }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for Embla to load
  setTimeout(initializeCarousels, 500);
});

export {};
