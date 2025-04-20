// Carrusel simple y directo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando carruseles...');

    // Esperar un momento para asegurarse de que el DOM esté completamente listo
    setTimeout(function() {
        // Inicializar todos los carruseles
        const carousels = document.querySelectorAll('.simple-carousel');
        carousels.forEach(initCarousel);
    }, 100);

    // También inicializar cuando la página esté completamente cargada
    window.addEventListener('load', function() {
        console.log('Página completamente cargada, reinicializando carruseles...');

        // Inicializar específicamente cada carrusel por ID con un pequeño retraso
        setTimeout(function() {
            console.log('Inicializando carruseles específicos...');
            initCarouselById('carousel-roma-negras');
            initCarouselById('carousel-roma-suela');
            initCarouselById('carousel-siena2025');
            initCarouselById('carousel-venecia-negras');
            initCarouselById('carousel-testimonios');
        }, 300);

        // Reinicializar nuevamente después de un tiempo más largo para asegurar que todas las imágenes estén cargadas
        setTimeout(function() {
            console.log('Reinicialización final de carruseles...');
            initCarouselById('carousel-roma-negras');
            initCarouselById('carousel-roma-suela');
            initCarouselById('carousel-siena2025');
            initCarouselById('carousel-venecia-negras');
            initCarouselById('carousel-testimonios');
        }, 1000);
    });

    // Reinicializar cuando la ventana cambia de tamaño
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            console.log('Ventana redimensionada, reinicializando carruseles...');
            initCarouselById('carousel-roma-negras');
            initCarouselById('carousel-roma-suela');
            initCarouselById('carousel-siena2025');
            initCarouselById('carousel-venecia-negras');
            initCarouselById('carousel-testimonios');
        }, 200);
    });
});

// Función para inicializar un carrusel por ID
function initCarouselById(id) {
    const carousel = document.getElementById(id);
    if (carousel) {
        console.log('Inicializando carrusel:', id);
        initCarousel(carousel);
    } else {
        console.warn('Carrusel no encontrado:', id);
    }
}

function initCarousel(carousel) {
    // Limpiar event listeners anteriores
    const oldContainer = carousel.querySelector('.carousel-container');
    if (oldContainer) {
        const newContainer = oldContainer.cloneNode(true);
        oldContainer.parentNode.replaceChild(newContainer, oldContainer);
    }

    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-button.prev');
    const nextBtn = carousel.querySelector('.carousel-button.next');
    const indicators = carousel.querySelectorAll('.carousel-indicators li');

    if (!container || slides.length === 0) {
        console.warn('Carrusel inválido:', carousel.id);
        return;
    }

    console.log('Inicializando carrusel:', carousel.id, 'con', slides.length, 'slides');

    let currentIndex = 0;

    // Configurar el ancho del contenedor
    container.style.width = (slides.length * 100) + '%';

    // Configurar cada slide
    slides.forEach((slide, i) => {
        slide.style.width = (100 / slides.length) + '%';
        slide.style.position = 'relative';

        // Asegurarse de que las imágenes estén cargadas
        const img = slide.querySelector('img');
        if (img) {
            // Forzar la carga de la imagen si aún no está cargada
            if (!img.complete) {
                img.onload = function() {
                    console.log('Imagen cargada en slide', i, 'de', carousel.id);
                };
            }
        }
    });

    // Función para mostrar un slide específico
    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        currentIndex = index;

        // Mover el contenedor con un pequeño retraso para asegurar que el DOM esté listo
        setTimeout(() => {
            const translateValue = -currentIndex * (100 / slides.length);
            container.style.transform = `translateX(${translateValue}%)`;

            // Actualizar indicadores
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });

            console.log('Mostrando slide', currentIndex, 'en carrusel', carousel.id);

            // Forzar un reflow para asegurar que el navegador aplique los cambios
            void container.offsetWidth;
        }, 10);
    }

    // Limpiar event listeners anteriores para los botones
    if (prevBtn) {
        const newPrevBtn = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
        newPrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(currentIndex - 1);
        });
    }

    if (nextBtn) {
        const newNextBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        newNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(currentIndex + 1);
        });
    }

    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        const newIndicator = indicator.cloneNode(true);
        indicator.parentNode.replaceChild(newIndicator, indicator);
        newIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(index);
        });
    });

    // Mostrar el primer slide con un pequeño retraso para asegurar que todo esté listo
    setTimeout(() => {
        showSlide(0);

        // Forzar un reflow para asegurar que el navegador aplique los cambios
        void carousel.offsetWidth;

        // Aplicar una clase para indicar que el carrusel está listo
        carousel.classList.add('carousel-initialized');
    }, 50);

    // Agregar soporte para gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const swipeThreshold = 50; // Mínima distancia para considerar un swipe
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe izquierda -> siguiente slide
            showSlide(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe derecha -> slide anterior
            showSlide(currentIndex - 1);
        }
    }

    // Verificar periódicamente si el carrusel está visible y reinicializarlo si es necesario
    const visibilityCheck = setInterval(() => {
        if (carousel.offsetParent !== null) {
            // El carrusel es visible, asegurarse de que esté correctamente inicializado
            showSlide(currentIndex);
        }
    }, 1000);

    // Limpiar el intervalo después de 10 segundos para no consumir recursos innecesariamente
    setTimeout(() => {
        clearInterval(visibilityCheck);
    }, 10000);
}
