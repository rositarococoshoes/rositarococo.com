// Script para reinicializar los carruseles después de que la página esté completamente cargada
window.addEventListener('load', function() {
    console.log('Página completamente cargada, reinicializando carruseles...');
    
    // Función para reinicializar un carrusel específico
    function reinitCarousel(id) {
        const carousel = document.getElementById(id);
        if (!carousel) {
            console.error('Carrusel no encontrado para reinicialización:', id);
            return;
        }
        
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        
        if (!container || !slides.length) {
            console.error('Contenedor o slides no encontrados en carrusel:', id);
            return;
        }
        
        console.log('Reinicializando carrusel:', id, 'con', slides.length, 'slides');
        
        // Configurar el ancho del contenedor
        container.style.width = (slides.length * 100) + '%';
        
        // Configurar el ancho de cada slide
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.width = (100 / slides.length) + '%';
            slides[i].style.display = 'flex';
        }
        
        // Resetear a la primera imagen
        container.style.transform = 'translateX(0)';
        
        // Actualizar indicadores
        const indicators = carousel.querySelectorAll('.carousel-indicators li');
        if (indicators.length) {
            for (let i = 0; i < indicators.length; i++) {
                if (i === 0) {
                    indicators[i].classList.add('active');
                } else {
                    indicators[i].classList.remove('active');
                }
            }
        }
    }
    
    // Reinicializar todos los carruseles
    setTimeout(function() {
        reinitCarousel('carousel-roma-negras');
        reinitCarousel('carousel-roma-suela');
        reinitCarousel('carousel-siena2025');
        reinitCarousel('carousel-venecia-negras');
        reinitCarousel('carousel-testimonios');
    }, 1500);
});

// También reinicializar cuando se redimensiona la ventana
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        console.log('Ventana redimensionada, reinicializando carruseles...');
        
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
                slide.style.display = 'flex';
            });
        });
    }, 300);
});
