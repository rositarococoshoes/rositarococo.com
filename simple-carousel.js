// JavaScript para un carrusel simple y efectivo

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los carruseles
    const carousels = document.querySelectorAll('.simple-carousel');

    console.log('Inicializando carruseles. Encontrados:', carousels.length);

    carousels.forEach(function(carousel) {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');
        const indicators = carousel.querySelectorAll('.carousel-indicators li');

        if (!container || slides.length === 0) {
            console.error('Carrusel incompleto: falta contenedor o slides');
            return;
        }

        console.log('Carrusel inicializado con', slides.length, 'slides');

        // Asegurarse de que el contenedor tenga el ancho correcto
        container.style.width = (slides.length * 100) + '%';

        // Asegurarse de que cada slide tenga el ancho correcto
        slides.forEach(function(slide) {
            slide.style.width = (100 / slides.length) + '%';
        });

        let currentIndex = 0;
        const slideCount = slides.length;

        function showSlide(index) {
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }

            currentIndex = index;
            container.style.transform = 'translateX(-' + (currentIndex * (100 / slideCount)) + '%)';
            console.log('Mostrando slide', currentIndex, 'transform:', container.style.transform);

            if (indicators && indicators.length > 0) {
                indicators.forEach(function(indicator, i) {
                    if (i === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
        }

        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showSlide(currentIndex - 1);
                return false;
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showSlide(currentIndex + 1);
                return false;
            });
        }

        if (indicators && indicators.length > 0) {
            indicators.forEach(function(indicator, index) {
                indicator.addEventListener('click', function(e) {
                    e.preventDefault();
                    showSlide(index);
                    return false;
                });
            });
        }

        carousel.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                showSlide(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showSlide(currentIndex + 1);
            }
        });

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
                showSlide(currentIndex + 1);
            } else if (touchEndX > touchStartX + 50) {
                showSlide(currentIndex - 1);
            }
        }

        // Iniciar el carrusel mostrando la primera imagen
        showSlide(0);
    });
});

// Evitar que los botones del carrusel activen formularios
document.addEventListener('click', function(e) {
    if (e.target.closest('.carousel-button')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}, true);

// Función para reinicializar los carruseles si es necesario
function reinitializeCarousels() {
    const carousels = document.querySelectorAll('.simple-carousel');

    carousels.forEach(function(carousel) {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');

        if (!container || slides.length === 0) return;

        // Asegurarse de que el contenedor tenga el ancho correcto
        container.style.width = (slides.length * 100) + '%';

        // Asegurarse de que cada slide tenga el ancho correcto
        slides.forEach(function(slide) {
            slide.style.width = (100 / slides.length) + '%';
        });

        // Resetear a la primera imagen
        container.style.transform = 'translateX(0)';
    });
}

// Llamar a reinitializeCarousels después de que la página esté completamente cargada
window.addEventListener('load', function() {
    console.log('Página completamente cargada, reinicializando carruseles');
    reinitializeCarousels();
});

// También reinicializar si se redimensiona la ventana
window.addEventListener('resize', function() {
    console.log('Ventana redimensionada, reinicializando carruseles');
    reinitializeCarousels();
});
