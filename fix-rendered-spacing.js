// Script para eliminar espacios entre títulos y carruseles en el HTML renderizado

document.addEventListener('DOMContentLoaded', function() {
    // Función para eliminar espacios
    function fixRenderedSpacing() {
        // Seleccionar todos los títulos de productos
        const productTitles = document.querySelectorAll('.product-item h2');
        
        // Para cada título, ajustar el carrusel siguiente
        productTitles.forEach(title => {
            // Obtener el carrusel siguiente
            const carousel = title.nextElementSibling;
            if (carousel && carousel.classList.contains('slick-initialized')) {
                // Las reglas de espaciado ahora se manejan en otono-elegante.css
                // Se eliminaron las siguientes líneas que aplicaban estilos inline:
                // title.style.margin = '0';
                // title.style.padding = '0';
                // title.style.lineHeight = '1';
                // title.style.display = 'block';
                // title.style.position = 'relative';
                // title.style.zIndex = '10';
                // carousel.style.margin = '0';
                // carousel.style.marginTop = '-5px'; // <- Eliminado el margen negativo problemático
                // carousel.style.padding = '0';
                // carousel.style.position = 'relative';
                // carousel.style.zIndex = '5';
            }
        });
        
        // Ajustar los slides activos
        const activeSlides = document.querySelectorAll('.slick-slide.slick-current.slick-active');
        activeSlides.forEach(slide => {
            slide.style.margin = '0';
            slide.style.padding = '0';
            slide.style.position = 'relative';
            slide.style.top = '0';
        });
        
        // Ajustar las imágenes dentro de los slides
        const images = document.querySelectorAll('.slick-slide img');
        images.forEach(img => {
            img.style.margin = '0 auto';
            img.style.padding = '0';
            img.style.display = 'block';
        });
        
        // Ajustar el track
        const tracks = document.querySelectorAll('.slick-track');
        tracks.forEach(track => {
            track.style.margin = '0';
            track.style.padding = '0';
        });
        
        // Ajustar la lista
        const lists = document.querySelectorAll('.slick-list');
        lists.forEach(list => {
            list.style.margin = '0';
            list.style.padding = '0';
        });
        
        // Ajustar los puntos de navegación
        const dots = document.querySelectorAll('.slick-dots');
        dots.forEach(dot => {
            dot.style.margin = '0';
            dot.style.padding = '0';
            dot.style.bottom = '0';
        });
    }
    
    // Ejecutar la función al cargar la página
    fixRenderedSpacing();
    
    // Ejecutar la función después de que se inicialicen los carruseles
    setTimeout(fixRenderedSpacing, 100);
    setTimeout(fixRenderedSpacing, 500);
    setTimeout(fixRenderedSpacing, 1000);
    
    // Ejecutar la función cuando cambie el tamaño de la ventana
    window.addEventListener('resize', fixRenderedSpacing);
    
    // Ejecutar la función cuando se carguen todas las imágenes
    window.addEventListener('load', fixRenderedSpacing);
    
    // Ejecutar la función periódicamente para asegurarse de que se aplique
    setInterval(fixRenderedSpacing, 500);
});
