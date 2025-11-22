document.addEventListener('DOMContentLoaded', () => {
    const emblaNode = document.querySelector('.embla');
    const emblaThumbsNode = document.querySelector('.embla-thumbs');

    if (emblaNode && emblaThumbsNode) {
        const embla = EmblaCarousel(emblaNode);
        const emblaThumbs = EmblaCarousel(emblaThumbsNode, {
            containScroll: 'keepSnaps',
            dragFree: true,
        });

        const onThumbClick = (index) => {
            embla.scrollTo(index);
        };

        const onSelect = () => {
            const selectedIndex = embla.selectedScrollSnap();
            emblaThumbs.scrollTo(selectedIndex);
            const slides = emblaThumbs.slideNodes();
            slides.forEach((slide, index) => {
                if (index === selectedIndex) {
                    slide.classList.add('embla-thumbs__slide--selected');
                } else {
                    slide.classList.remove('embla-thumbs__slide--selected');
                }
            });
        };

        embla.on('select', onSelect);
        emblaThumbs.slideNodes().forEach((slide, index) => {
            slide.addEventListener('click', () => onThumbClick(index), false);
        });

        onSelect();
    }
});
