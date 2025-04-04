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
            
            const slides = carousel.querySelectorAll('.carousel-slide');
            const prevBtn = carousel.querySelector('.carousel-button.prev');
            const nextBtn = carousel.querySelector('.carousel-button.next');
            
            if (!slides.length) {
                console.error('No hay slides en el carrusel:', id);
                return;
            }
            
            console.log('Inicializando carrusel:', id, 'con', slides.length, 'slides');
            
            // Ocultar todos los slides excepto el primero
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = i === 0 ? 'block' : 'none';
            }
            
            // Configurar botones
            if (prevBtn) {
                prevBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Encontrar el slide visible actual
                    let currentIndex = 0;
                    for (let i = 0; i < slides.length; i++) {
                        if (slides[i].style.display === 'block') {
                            currentIndex = i;
                            break;
                        }
                    }
                    
                    // Calcular el índice anterior
                    let prevIndex = currentIndex - 1;
                    if (prevIndex < 0) prevIndex = slides.length - 1;
                    
                    // Ocultar todos y mostrar el anterior
                    for (let i = 0; i < slides.length; i++) {
                        slides[i].style.display = 'none';
                    }
                    slides[prevIndex].style.display = 'block';
                    
                    // Actualizar indicadores
                    const indicators = carousel.querySelectorAll('.carousel-indicators li');
                    if (indicators.length) {
                        for (let i = 0; i < indicators.length; i++) {
                            if (i === prevIndex) {
                                indicators[i].classList.add('active');
                            } else {
                                indicators[i].classList.remove('active');
                            }
                        }
                    }
                    
                    return false;
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Encontrar el slide visible actual
                    let currentIndex = 0;
                    for (let i = 0; i < slides.length; i++) {
                        if (slides[i].style.display === 'block') {
                            currentIndex = i;
                            break;
                        }
                    }
                    
                    // Calcular el índice siguiente
                    let nextIndex = currentIndex + 1;
                    if (nextIndex >= slides.length) nextIndex = 0;
                    
                    // Ocultar todos y mostrar el siguiente
                    for (let i = 0; i < slides.length; i++) {
                        slides[i].style.display = 'none';
                    }
                    slides[nextIndex].style.display = 'block';
                    
                    // Actualizar indicadores
                    const indicators = carousel.querySelectorAll('.carousel-indicators li');
                    if (indicators.length) {
                        for (let i = 0; i < indicators.length; i++) {
                            if (i === nextIndex) {
                                indicators[i].classList.add('active');
                            } else {
                                indicators[i].classList.remove('active');
                            }
                        }
                    }
                    
                    return false;
                });
            }
        }
        
        // Inicializar cada carrusel individualmente
        initSingleCarousel('carousel-roma-negras');
        initSingleCarousel('carousel-roma-suela');
        initSingleCarousel('carousel-siena2025');
        initSingleCarousel('carousel-testimonios');
    }, 500);
});
