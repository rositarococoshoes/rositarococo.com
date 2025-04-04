// Inicialización de Swiper para todos los carruseles

document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que Swiper esté completamente cargado
    setTimeout(function() {
        initSwipers();
    }, 100);

    function initSwipers() {
        // Inicializar los carruseles de productos
        const productSwipers = document.querySelectorAll('.product-item .swiper');

        productSwipers.forEach(function(swiperElement, index) {
            const swiper = new Swiper(swiperElement, {
                // Opciones básicas
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,

                // Paginación
                pagination: {
                    el: swiperElement.querySelector('.swiper-pagination'),
                    clickable: true,
                },

                // Navegación
                navigation: {
                    nextEl: swiperElement.querySelector('.swiper-button-next'),
                    prevEl: swiperElement.querySelector('.swiper-button-prev'),
                },

                // Efecto de transición
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },

                // Opciones de accesibilidad
                a11y: {
                    prevSlideMessage: 'Imagen anterior',
                    nextSlideMessage: 'Imagen siguiente',
                    firstSlideMessage: 'Esta es la primera imagen',
                    lastSlideMessage: 'Esta es la última imagen',
                    paginationBulletMessage: 'Ir a la imagen {{index}}'
                }
            });
        });

        // Inicializar el carrusel de testimonios
        const testimonialsSwiper = new Swiper('.testimonials-carousel', {
            // Opciones básicas
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },

            // Paginación
            pagination: {
                el: '.testimonials-carousel .swiper-pagination',
                clickable: true,
            },

            // Efecto de transición
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },

            // Opciones de accesibilidad
            a11y: {
                prevSlideMessage: 'Testimonio anterior',
                nextSlideMessage: 'Testimonio siguiente',
                firstSlideMessage: 'Este es el primer testimonio',
                lastSlideMessage: 'Este es el último testimonio',
                paginationBulletMessage: 'Ir al testimonio {{index}}'
            }
        });

        // Función para ajustar el espacio entre títulos y carruseles
        function fixSpacing() {
            // Seleccionar todos los títulos de productos
            document.querySelectorAll('.product-item h2').forEach(title => {
                title.style.margin = '0';
                title.style.padding = '0';
                title.style.lineHeight = '1';
            });
        }

        // Ejecutar la función al cargar la página
        fixSpacing();
    }

    // Ejecutar la función cuando cambie el tamaño de la ventana
    window.addEventListener('resize', function() {
        // Seleccionar todos los títulos de productos
        document.querySelectorAll('.product-item h2').forEach(title => {
            title.style.margin = '0';
            title.style.padding = '0';
            title.style.lineHeight = '1';
        });
    });
});
