// Script para arreglar los carruseles
window.onload = function() {
    console.log('Inicializando carruseles...');

    // Función para inicializar un carrusel
    function initCarousel(carouselElement) {
        console.log('Inicializando carrusel:', carouselElement);

        if (!carouselElement) {
            console.error('Carrusel no encontrado');
            return;
        }

        const slides = carouselElement.querySelectorAll('.carousel-slide');
        const prevBtn = carouselElement.querySelector('.carousel-button.prev');
        const nextBtn = carouselElement.querySelector('.carousel-button.next');
        const indicators = carouselElement.querySelectorAll('.carousel-indicators li');

        console.log('Slides encontrados:', slides.length);
        console.log('Botones:', prevBtn ? 'Prev OK' : 'No Prev', nextBtn ? 'Next OK' : 'No Next');
        console.log('Indicadores:', indicators.length);

        if (!slides.length) {
            console.error('No hay slides en este carrusel');
            return;
        }

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Función para mostrar un slide específico
        function showSlide(index) {
            console.log('Mostrando slide:', index);

            // Ajustar el índice si está fuera de rango
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            // Actualizar el índice actual
            currentIndex = index;

            // Ocultar todos los slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }

            // Mostrar el slide actual
            slides[currentIndex].style.display = 'block';

            // Actualizar indicadores si existen
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

        // Configurar botones de navegación
        if (prevBtn) {
            prevBtn.onclick = function(e) {
                console.log('Botón anterior clickeado');
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                showSlide(currentIndex - 1);
                return false;
            };
        }

        if (nextBtn) {
            nextBtn.onclick = function(e) {
                console.log('Botón siguiente clickeado');
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                showSlide(currentIndex + 1);
                return false;
            };
        }

        // Configurar indicadores
        if (indicators.length) {
            for (let i = 0; i < indicators.length; i++) {
                indicators[i].onclick = function(e) {
                    console.log('Indicador clickeado:', i);
                    if (e) {
                        e.preventDefault();
                    }
                    showSlide(i);
                    return false;
                };
            }
        }

        // Mostrar el primer slide
        showSlide(0);

        // Devolver funciones para uso externo
        return {
            next: function() { showSlide(currentIndex + 1); },
            prev: function() { showSlide(currentIndex - 1); },
            goTo: function(index) { showSlide(index); }
        };
    }

    // Inicializar todos los carruseles
    const carousels = document.querySelectorAll('.simple-carousel');
    console.log('Carruseles encontrados:', carousels.length);

    // Crear un objeto global para acceder a los carruseles
    window.carouselControls = {};

    carousels.forEach(function(carousel, index) {
        const id = carousel.id || 'carousel-' + index;
        window.carouselControls[id] = initCarousel(carousel);
    });

    // Agregar manejadores de eventos globales para los botones
    document.addEventListener('click', function(e) {
        const target = e.target;

        // Verificar si el clic fue en un botón de carrusel
        if (target.classList.contains('carousel-button')) {
            console.log('Botón de carrusel clickeado');
            e.preventDefault();
            e.stopPropagation();

            // Encontrar el carrusel padre
            const carousel = target.closest('.simple-carousel');
            if (!carousel) return;

            // Determinar la acción (prev o next)
            if (target.classList.contains('prev')) {
                const prevBtn = carousel.querySelector('.carousel-button.prev');
                if (prevBtn && prevBtn.onclick) {
                    prevBtn.onclick();
                }
            } else if (target.classList.contains('next')) {
                const nextBtn = carousel.querySelector('.carousel-button.next');
                if (nextBtn && nextBtn.onclick) {
                    nextBtn.onclick();
                }
            }

            return false;
        }

        // Verificar si el clic fue en un indicador
        if (target.parentElement && target.parentElement.classList.contains('carousel-indicators')) {
            console.log('Indicador de carrusel clickeado');
            e.preventDefault();
            e.stopPropagation();

            // Encontrar el carrusel padre
            const carousel = target.closest('.simple-carousel');
            if (!carousel) return;

            // Encontrar el índice del indicador
            const indicators = carousel.querySelectorAll('.carousel-indicators li');
            for (let i = 0; i < indicators.length; i++) {
                if (indicators[i] === target) {
                    const indicator = indicators[i];
                    if (indicator && indicator.onclick) {
                        indicator.onclick();
                    }
                    break;
                }
            }

            return false;
        }
    }, true);
};
