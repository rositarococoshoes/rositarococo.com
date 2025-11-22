// Clean main script without broken references
// Embla Carousel functionality

document.addEventListener("DOMContentLoaded", function() {
    initCarousels();
});

function initCarousels() {
    document.querySelectorAll(".embla").forEach(function(container) {
        const viewport = container.querySelector(".embla__viewport");
        const thumbsViewport = container.querySelector(".embla-thumbs__viewport");

        if (!viewport) return;

        const options = {
            align: "start",
            loop: true,
            skipSnaps: false,
            containScroll: "keepSnaps",
            dragFree: false
        };

        const plugins = [];

        if (container.dataset.autoplay === "true") {
            plugins.push(EmblaCarouselAutoplay({
                delay: 3000,
                stopOnInteraction: true,
                playOnInit: true
            }));
        }

        try {
            const embla = EmblaCarousel(viewport, options, plugins);

            // Setup navigation buttons
            const prevBtn = container.querySelector(".embla__button--prev");
            const nextBtn = container.querySelector(".embla__button--next");

            if (prevBtn) prevBtn.addEventListener("click", embla.scrollPrev, false);
            if (nextBtn) nextBtn.addEventListener("click", embla.scrollNext, false);

            // Setup thumbs if present
            let thumbsEmbla = null;
            if (thumbsViewport) {
                thumbsEmbla = EmblaCarousel(thumbsViewport, {
                    containScroll: "keepSnaps",
                    dragFree: true
                });

                const syncScrollSnap = () => {
                    const selected = embla.selectedScrollSnap();
                    thumbsEmbla.scrollTo(selected);

                    // Update selected class
                    container.querySelectorAll(".embla-thumbs__slide").forEach(function(slide, index) {
                        if (index === selected) {
                            slide.classList.add("embla-thumbs__slide--selected");
                        } else {
                            slide.classList.remove("embla-thumbs__slide--selected");
                        }
                    });
                };

                // Add click handlers to thumbs
                container.querySelectorAll(".embla-thumbs__slide").forEach(function(thumb, index) {
                    thumb.addEventListener("click", function() {
                        embla.scrollTo(index);
                    }, false);
                });

                embla.on("select", syncScrollSnap);
                syncScrollSnap();
            }

            // Setup button states
            const setupButtonStates = (prevDisabled, nextDisabled) => {
                if (prevBtn) prevBtn.disabled = prevDisabled;
                if (nextBtn) nextBtn.disabled = nextDisabled;
            };

            embla.on("select", () => {
                const prevDisabled = !embla.canScrollPrev();
                const nextDisabled = !embla.canScrollNext();
                setupButtonStates(prevDisabled, nextDisabled);
            });

            embla.on("init", () => {
                const prevDisabled = !embla.canScrollPrev();
                const nextDisabled = !embla.canScrollNext();
                setupButtonStates(prevDisabled, nextDisabled);
            });

        } catch (error) {
            console.error("Error initializing carousel:", error);
        }
    });
}