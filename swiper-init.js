// Inicialización de Swiper para todos los carruseles

document.addEventListener('DOMContentLoaded', function() {

    // Esperar a que Swiper esté completamente cargado
    setTimeout(function() {
        initSwipers();
    }, 100);

    function initSwipers() {
        // Configuración común para todos los carruseles
        const commonConfig = {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 500,
            grabCursor: true,
            preloadImages: true,
            updateOnImagesReady: true,
            watchSlidesProgress: true,
            // Importante: Usar selectores específicos para cada carrusel
            // Estos se configurarán individualmente en cada inicialización
            pagination: {
                clickable: true,
            },
            navigation: {
                enabled: true,
            },
            a11y: {
                prevSlideMessage: 'Imagen anterior',
                nextSlideMessage: 'Imagen siguiente',
                firstSlideMessage: 'Esta es la primera imagen',
                lastSlideMessage: 'Esta es la última imagen',
                paginationBulletMessage: 'Ir a la imagen {{index}}'
            }
        };

        // Inicializar carruseles de productos por ID
        initProductSwiper('swiper-roma-negras', commonConfig);
        initProductSwiper('swiper-roma-suela', commonConfig);
        initProductSwiper('swiper-siena2025', commonConfig);
        initProductSwiper('swiper-venecia-negras', commonConfig);

        // Inicializar carruseles de Paris (una sola imagen)
        initProductSwiper('swiper-paris-negras', {...commonConfig, loop: false});
        initProductSwiper('swiper-paris-camel', {...commonConfig, loop: false});
        initProductSwiper('swiper-paris-verde', {...commonConfig, loop: false});

        // Inicializar el carrusel de testimonios
        const testimoniosEl = document.getElementById('swiper-testimonios');
        if (testimoniosEl) {

            // Configuración específica para el carrusel de testimonios
            const testimoniosConfig = {
                ...commonConfig,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                effect: 'slide',
                pagination: {
                    ...commonConfig.pagination,
                    el: '#swiper-testimonios .swiper-pagination'
                },
                navigation: {
                    ...commonConfig.navigation,
                    nextEl: '#swiper-testimonios .swiper-button-next',
                    prevEl: '#swiper-testimonios .swiper-button-prev'
                },
                a11y: {
                    prevSlideMessage: 'Testimonio anterior',
                    nextSlideMessage: 'Testimonio siguiente',
                    firstSlideMessage: 'Este es el primer testimonio',
                    lastSlideMessage: 'Este es el último testimonio',
                    paginationBulletMessage: 'Ir al testimonio {{index}}'
                }
            };

            // Inicializar el carrusel
            const testimoniosSwiper = new Swiper('#swiper-testimonios', testimoniosConfig);

            // Agregar event listeners adicionales para asegurar que funcionen
            const prevBtn = testimoniosEl.querySelector('.swiper-button-prev');
            const nextBtn = testimoniosEl.querySelector('.swiper-button-next');

            if (prevBtn) {
                prevBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    testimoniosSwiper.slidePrev();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    testimoniosSwiper.slideNext();
                });
            }
        } else {
            // Carrusel de testimonios no encontrado (normal si se usa el nuevo diseño)
        }
    }

    // Función para inicializar un carrusel de producto por ID
    function initProductSwiper(id, config) {
        const el = document.getElementById(id);
        if (el) {

            // Configurar selectores específicos para este carrusel
            const swiperConfig = {
                ...config,
                effect: 'slide',
                pagination: {
                    ...config.pagination,
                    el: `#${id} .swiper-pagination`
                },
                navigation: {
                    ...config.navigation,
                    nextEl: `#${id} .swiper-button-next`,
                    prevEl: `#${id} .swiper-button-prev`
                }
            };

            // Inicializar el carrusel con la configuración específica
            const swiper = new Swiper(`#${id}`, swiperConfig);

            // Verificar que los botones de navegación funcionen

            // Agregar event listeners adicionales para asegurar que funcionen
            const prevBtn = el.querySelector('.swiper-button-prev');
            const nextBtn = el.querySelector('.swiper-button-next');

            if (prevBtn) {
                prevBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    swiper.slidePrev();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    swiper.slideNext();
                });
            }

            return swiper;
        } else {
            return null;
        }
    }

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

    // Ejecutar la función cuando cambie el tamaño de la ventana
    window.addEventListener('resize', function() {
        // Seleccionar todos los títulos de productos
        document.querySelectorAll('.product-item h2').forEach(title => {
            title.style.margin = '0';
            title.style.padding = '0';
            title.style.lineHeight = '1';
        });
    });

    // Reinicializar los carruseles cuando la página esté completamente cargada
    window.addEventListener('load', function() {
        setTimeout(function() {
            initSwipers();
        }, 500);
    });
});
