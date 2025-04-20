// Script para inicializar los carruseles manualmente
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que la página esté completamente cargada
    setTimeout(function() {
        console.log('Inicializando carruseles manualmente...');

        // Función para inicializar un carrusel específico
        function initSingleCarousel(id) {
            const carousel = document.getElementById(id);
            if (!carousel) {
                console.error('Carrusel no encontrado:', id);
                return;
            }

            const container = carousel.querySelector('.carousel-container');
            const slides = carousel.querySelectorAll('.carousel-slide');
            const prevBtn = carousel.querySelector('.carousel-button.prev');
            const nextBtn = carousel.querySelector('.carousel-button.next');

            if (!slides.length || !container) {
                console.error('No hay slides o contenedor en el carrusel:', id);
                return;
            }

            console.log('Inicializando carrusel:', id, 'con', slides.length, 'slides');

            // Configurar el ancho del contenedor y de los slides
            container.style.width = (slides.length * 100) + '%';

            for (let i = 0; i < slides.length; i++) {
                slides[i].style.width = (100 / slides.length) + '%';
                slides[i].style.display = 'flex';
            }

            // Variable para rastrear el slide actual
            let currentIndex = 0;

            // Función para mostrar un slide específico
            function showSlide(index) {
                // Ajustar el índice si está fuera de rango
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;

                // Actualizar el índice actual
                currentIndex = index;

                // Mover el contenedor para mostrar el slide actual
                const offset = -(currentIndex * (100 / slides.length));
                container.style.transform = 'translateX(' + offset + '%)';
                console.log('Mostrando slide', currentIndex, 'en carrusel', id);

                // Actualizar indicadores
                const indicators = carousel.querySelectorAll('.carousel-indicators li');
                if (indicators.length) {
                    for (let i = 0; i < indicators.length; i++) {
                        if (i === currentIndex) {
                            indicators[i].classList.add('active');
                        } else {
                            indicators[i].classList.remove('active');
                        }
                    }
                }
            }

            // Configurar botones
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
            const indicators = carousel.querySelectorAll('.carousel-indicators li');
            if (indicators.length) {
                for (let i = 0; i < indicators.length; i++) {
                    indicators[i].addEventListener('click', function(e) {
                        e.preventDefault();
                        showSlide(i);
                        return false;
                    });
                }
            }

            // Mostrar el primer slide
            showSlide(0);
        }

        // Inicializar cada carrusel individualmente
        initSingleCarousel('carousel-roma-negras');
        initSingleCarousel('carousel-roma-suela');
        initSingleCarousel('carousel-siena2025');
        initSingleCarousel('carousel-venecia-negras');
        initSingleCarousel('carousel-testimonios');
    }, 1000); // Aumentar el tiempo de espera para asegurar que todos los elementos estén cargados

    // Reinicializar carruseles cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        console.log('Ventana redimensionada, reinicializando carruseles...');
        setTimeout(function() {
            initSingleCarousel('carousel-roma-negras');
            initSingleCarousel('carousel-roma-suela');
            initSingleCarousel('carousel-siena2025');
            initSingleCarousel('carousel-venecia-negras');
            initSingleCarousel('carousel-testimonios');
        }, 200);
    });
});
