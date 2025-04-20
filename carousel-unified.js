// Script unificado para carruseles
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando carruseles unificados...');

    // Esperar un momento para asegurarse de que las imágenes estén cargadas
    setTimeout(function() {
        initAllCarousels();
    }, 100);

    // Función para inicializar todos los carruseles
    function initAllCarousels() {
        const carousels = document.querySelectorAll('.simple-carousel');
        console.log('Carruseles encontrados:', carousels.length);

        carousels.forEach(function(carousel) {
            initSingleCarousel(carousel);
        });
    }

    // Función para inicializar un carrusel específico
    function initSingleCarousel(carousel) {
        if (!carousel) return;

        const id = carousel.id || '';
        console.log('Inicializando carrusel:', id);

        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-button.prev');
        const nextBtn = carousel.querySelector('.carousel-button.next');
        const indicators = carousel.querySelectorAll('.carousel-indicators li');

        if (!container || !slides.length) {
            console.error('No hay contenedor o slides en el carrusel:', id);
            return;
        }

        // Configurar el ancho del contenedor y de los slides
        const slideCount = slides.length;
        container.style.width = (slideCount * 100) + '%';

        // Configurar cada slide
        slides.forEach(function(slide) {
            slide.style.width = (100 / slideCount) + '%';
            slide.style.display = 'flex';
            slide.style.alignItems = 'center';
            slide.style.justifyContent = 'center';
        });

        // Variable para rastrear el slide actual
        let currentIndex = 0;

        // Función para mostrar un slide específico
        function showSlide(index) {
            // Ajustar el índice si está fuera de rango
            if (index < 0) index = slideCount - 1;
            if (index >= slideCount) index = 0;

            // Actualizar el índice actual
            currentIndex = index;

            // Mover el contenedor para mostrar el slide actual
            const offset = -(currentIndex * (100 / slideCount));
            container.style.transform = 'translateX(' + offset + '%)';

            // Actualizar indicadores
            if (indicators.length) {
                indicators.forEach(function(indicator, i) {
                    if (i === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
        }

        // Configurar botones de navegación
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showSlide(currentIndex - 1);
                return false;
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showSlide(currentIndex + 1);
                return false;
            });
        }

        // Configurar indicadores
        if (indicators.length) {
            indicators.forEach(function(indicator, index) {
                indicator.addEventListener('click', function(e) {
                    e.preventDefault();
                    showSlide(index);
                    return false;
                });
            });
        }

        // Configurar gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                showSlide(currentIndex + 1); // Deslizar a la izquierda
            } else if (touchEndX > touchStartX + 50) {
                showSlide(currentIndex - 1); // Deslizar a la derecha
            }
        }

        // Mostrar el primer slide
        showSlide(0);
    }

    // Reinicializar cuando la ventana cambia de tamaño
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            console.log('Ventana redimensionada, reinicializando carruseles...');
            initAllCarousels();
        }, 200);
    });

    // También inicializar cuando la página está completamente cargada
    window.addEventListener('load', function() {
        console.log('Página completamente cargada, reinicializando carruseles...');
        setTimeout(initAllCarousels, 500);

        // Reinicializar nuevamente después de un tiempo más largo para asegurar que todas las imágenes estén cargadas
        setTimeout(initAllCarousels, 2000);
    });

    // Inicializar específicamente cada carrusel por ID para asegurar que todos funcionen
    setTimeout(function() {
        const carouselIds = [
            'carousel-roma-negras',
            'carousel-roma-suela',
            'carousel-siena2025',
            'carousel-venecia-negras',
            'carousel-testimonios'
        ];

        carouselIds.forEach(function(id) {
            const carousel = document.getElementById(id);
            if (carousel) {
                console.log('Inicializando carrusel específico:', id);
                initSingleCarousel(carousel);
            }
        });
    }, 1000);
});
