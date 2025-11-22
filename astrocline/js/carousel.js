// Variables globales para el carrito - Protección contra cargas múltiples
if (typeof window.cart === 'undefined') {
    window.cart = [];
    window.cartCount = 0;
    window.isCartOpen = false;
}

// Usar referencias a las variables globales en lugar de redeclarar
// const cart = window.cart;  // REMOVED - This causes redeclaration
// const cartCount = window.cartCount;  // REMOVED - This causes redeclaration  
// const isCartOpen = window.isCartOpen;  // REMOVED - This causes redeclaration

// Productos disponibles
const products = {
    'negras': {
        name: 'Guillerminas Negras',
        price: 60000,
        image: '/guillerminafotos/1.webp'
    },
    'camel': {
        name: 'Guillerminas Camel', 
        price: 60000,
        image: '/guillerminafotos/guillerminascamel/1.webp'
    },
    'blancas': {
        name: 'Guillerminas Blancas',
        price: 60000,
        image: '/guillerminafotos/guillerminasblancas/1.webp'
<<<<<<< Updated upstream
=======
    },
    'birk-negras': {
        name: 'Birk Negras',
        price: 60000,
        image: '/astrocline/birknegras/1.webp'
    },
    'birk-camel': {
        name: 'Birk Camel',
        price: 60000,
        image: '/astrocline/birkcamel/1.webp'
    },
    'birk-blancas': {
        name: 'Birk Blancas',
        price: 60000,
        image: '/astrocline/birkblancas/1.webp'
    },
    'argos': {
        name: 'Argos',
        price: 60000,
        image: '/astrocline/argos/1.webp'
>>>>>>> Stashed changes
    }
};

// Función para agregar productos al carrito
function addToCart(model, size) {
    // Validar que se haya seleccionado un talle
    if (!size) {
        showCartMessage('Por favor selecciona un talle', 'warning');
        return;
    }

    const product = products[model];
    if (!product) {
        showCartMessage('Producto no encontrado', 'error');
        return;
    }

    // Validar límite de 2 pares por pedido
    if (window.cartCount >= 2) {
        showCartMessage('⚠️ Límite alcanzado: Solo puedes agregar máximo 2 pares por pedido', 'warning', 4000);
        return;
    }

    // Agregar producto al carrito
    const cartItem = {
        id: Date.now(),
        model: model,
        name: product.name,
        size: size,
        price: product.price,
        image: product.image
    };

    window.cart.push(cartItem);
    window.cartCount++;
    
    // Actualizar interfaz
    updateCartUI();
    
    // Mostrar mensaje contextual según cantidad
    if (window.cartCount === 1) {
        showCartMessage('✅ ¡Producto agregado! Agregá un segundo par y ahorrá $25.000', 'success');
    } else if (window.cartCount === 2) {
        showCartMessage('🎉 ¡Promoción activada! 2 pares por $95.000 (ahorraste $25.000)', 'success');
    }
    
    // Abrir carrito automáticamente
    openCart();
    
    console.log('Producto agregado al carrito:', cartItem);
}

// Función para eliminar un producto del carrito
function removeFromCart(itemId) {
    window.cart = window.cart.filter(item => item.id !== itemId);
    window.cartCount = window.cart.length;
    updateCartUI();
    
    // Mostrar mensaje si el carrito queda vacío
    if (window.cartCount === 0) {
        showCartMessage('Carrito vacío', 'info');
    } else if (window.cartCount === 1) {
        showCartMessage('Promoción desactivada. Agregá otro par para activar el descuento.', 'warning');
    } else {
        showCartMessage('Promoción activada. 2 pares por $95.000', 'success');
    }
    
    console.log('Producto eliminado del carrito. Items restantes:', window.cartCount);
}

// Función para calcular el total del carrito
function calculateCartTotal() {
    if (window.cartCount === 0) return 0;
    if (window.cartCount === 1) return 60000;
    return window.cartCount * 47500; // Promoción 2x $95.000
}

// Función para calcular el total con descuento de transferencia
function calculateCartTotalWithDiscount() {
    let baseTotal = calculateCartTotal();
    
    // Obtener método de pago seleccionado
    const paymentMethod = document.getElementById('comoabona');
    if (paymentMethod && paymentMethod.value === 'cbu') {
        // Aplicar 10% de descuento adicional para transferencia
        baseTotal = Math.round(baseTotal * 0.9);
    }
    
    return baseTotal;
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
    // Actualizar contador
    const cartCountElements = document.querySelectorAll('.cart-count, .cart-button-count');
    cartCountElements.forEach(element => {
        element.textContent = window.cartCount;
    });

    // Actualizar items del carrito
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyMessage = document.querySelector('.empty-cart-message');
    
    if (window.cartCount === 0) {
        cartItemsContainer.innerHTML = '';
        if (emptyMessage) emptyMessage.style.display = 'block';
    } else {
        if (emptyMessage) emptyMessage.style.display = 'none';
        
        // Generar HTML de los items - BOTÓN ELIMINAR A LA DERECHA DEL NOMBRE
        cartItemsContainer.innerHTML = window.cart.map(item => `
            <div class="cart-item bg-gray-50 p-3 rounded-lg relative" data-item-id="${item.id}">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3 flex-1">
                        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                        <div>
                            <h4 class="font-semibold text-sm">${item.name}</h4>
                            <p class="text-xs text-gray-600">Talle: ${item.size}</p>
                        </div>
                    </div>
                    <button class="remove-item text-red-500 hover:text-red-700 text-xl font-bold w-6 h-6 rounded-full bg-white shadow-md z-10 flex-shrink-0" 
                            onclick="removeFromCart(${item.id})" title="Eliminar producto">
                        ×
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Actualizar total con descuento si corresponde
    const total = calculateCartTotalWithDiscount();
    const totalElements = document.querySelectorAll('.cart-total span');
    totalElements.forEach(element => {
        element.textContent = `$${total.toLocaleString('es-AR')}`;
    });

    // Actualizar estado del botón de checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        if (window.cartCount > 0) {
            checkoutBtn.disabled = false;
            checkoutBtn.className = 'bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-300 cursor-pointer';
        } else {
            checkoutBtn.disabled = true;
            checkoutBtn.className = 'bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed';
        }
    }

    // Mostrar automáticamente el formulario de checkout si hay items
    const checkoutSection = document.getElementById('restodelform');
    if (checkoutSection) {
        if (window.cartCount > 0) {
            checkoutSection.classList.remove('hidden');
            // Actualizar progreso del checkout
            updateCheckoutProgress(2);
            
            // Mostrar notificación suave
            showCartMessage('🛒 ¡Carrito listo! Puedes continuar con tu compra.', 'info', 3000);
        } else {
            checkoutSection.classList.add('hidden');
        }
    }

    // Actualizar formulario de pedido
    updateOrderSummary();
}

// Función para actualizar el resumen del pedido
function updateOrderSummary() {
    const summaryElement = document.getElementById('286442883');
    const reviewElement = document.getElementById('review-modelostallesseleccionados');
    
    if (window.cartCount > 0 && summaryElement) {
        const summaryText = window.cart.map(item => `${item.name} - Talle ${item.size}`).join(', ');
        summaryElement.value = summaryText;
        
        if (reviewElement) {
            reviewElement.textContent = summaryText;
        }
    } else {
        if (summaryElement) summaryElement.value = '';
        if (reviewElement) reviewElement.textContent = '-';
    }
    
    // Actualizar precio total en el resumen con descuento si corresponde
    const totalElement = document.getElementById('preciototal');
    if (totalElement) {
        const total = calculateCartTotalWithDiscount();
        if (window.cartCount > 0) {
            const paymentMethod = document.getElementById('comoabona');
            const isTransfer = paymentMethod && paymentMethod.value === 'cbu';
            
            if (isTransfer) {
                totalElement.innerHTML = `<strong>Total: $${total.toLocaleString('es-AR')} <span class="text-green-600 text-sm">(10% OFF por transferencia)</span></strong>`;
            } else {
                totalElement.innerHTML = `<strong>Total: $${total.toLocaleString('es-AR')}</strong>`;
            }
        } else {
            totalElement.textContent = 'Elige modelos y talles para ver el total';
        }
    }
}

// Función para mostrar mensajes inline (modal dentro del contenido)
function showInlineMessage(message, type = 'info', duration = 5000) {
    // Crear modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.right = '0';
    modalOverlay.style.bottom = '0';
    modalOverlay.style.zIndex = '9999';
    
    // Crear modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl transform transition-all';
    
    let bgColor = 'bg-blue-100 border-blue-400 text-blue-800';
    let icon = 'ℹ️';
    
    switch(type) {
        case 'success':
            bgColor = 'bg-green-100 border-green-400 text-green-800';
            icon = '✅';
            break;
        case 'warning':
            bgColor = 'bg-yellow-100 border-yellow-400 text-yellow-800';
            icon = '⚠️';
            break;
        case 'error':
            bgColor = 'bg-red-100 border-red-400 text-red-800';
            icon = '❌';
            break;
    }
    
    modalContent.innerHTML = `
        <div class="${bgColor} border-l-4 p-4 rounded-lg">
            <div class="flex items-center">
                <span class="text-2xl mr-3">${icon}</span>
                <p class="flex-1 font-medium">${message}</p>
                <button onclick="this.closest('.fixed').remove()" 
                        class="ml-3 text-gray-500 hover:text-gray-700 text-xl font-bold">×
                </button>
            </div>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Auto cerrar después del tiempo especificado
    if (duration > 0) {
        setTimeout(() => {
            if (modalOverlay.parentNode) {
                modalOverlay.remove();
            }
        }, duration);
    }
    
    // Cerrar al hacer clic fuera
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}

// Función para mostrar mensajes en el carrito (mantenida para compatibilidad)
function showCartMessage(message, type = 'info', duration = 5000) {
    showInlineMessage(message, type, duration);
}

// Función para abrir/cerrar el carrito
function toggleCart() {
    const miniCart = document.getElementById('mini-cart');
    if (!miniCart) return;
    
    window.isCartOpen = !window.isCartOpen;
    
    if (window.isCartOpen) {
        miniCart.style.transform = 'translateX(0)';
        miniCart.style.opacity = '1';
        miniCart.style.pointerEvents = 'auto';
    } else {
        miniCart.style.transform = 'translateX(100%)';
        miniCart.style.opacity = '0';
        miniCart.style.pointerEvents = 'none';
    }
}

function openCart() {
    const miniCart = document.getElementById('mini-cart');
    if (miniCart && !window.isCartOpen) {
        window.isCartOpen = true;
        miniCart.style.transform = 'translateX(0)';
        miniCart.style.opacity = '1';
        miniCart.style.pointerEvents = 'auto';
    }
}

function closeCart() {
    const miniCart = document.getElementById('mini-cart');
    if (miniCart && window.isCartOpen) {
        window.isCartOpen = false;
        miniCart.style.transform = 'translateX(100%)';
        miniCart.style.opacity = '0';
        miniCart.style.pointerEvents = 'none';
    }
}

// Función para ir al formulario de checkout
function goToCheckoutForm() {
    if (window.cartCount === 0) {
        showCartMessage('Debes agregar productos antes de continuar', 'warning');
        return;
    }
    
    // Cerrar carrito
    closeCart();
    
    // Mostrar formulario de checkout
    const checkoutSection = document.getElementById('restodelform');
    const productsSection = document.getElementById('todoslosmodelos');
    
    if (checkoutSection && productsSection) {
        checkoutSection.classList.remove('hidden');
        checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Actualizar进度栏
        updateCheckoutProgress(2);
    }
    
    console.log('Navegando al formulario de checkout');
}

// Función para actualizar el progreso del checkout
function updateCheckoutProgress(step) {
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((stepElement, index) => {
        const stepNumber = index + 1;
        const stepNumberEl = stepElement.querySelector('.step-number');
        const stepNameEl = stepElement.querySelector('.step-name');
        
        if (stepNumber < step) {
            // Pasos completados
            stepElement.classList.add('completed');
            stepNumberEl.className = 'step-number bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2';
            stepNameEl.className = 'step-name text-sm font-medium text-green-600';
        } else if (stepNumber === step) {
            // Paso actual
            stepElement.classList.add('active');
            stepNumberEl.className = 'step-number bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2';
            stepNameEl.className = 'step-name text-sm font-medium';
        } else {
            // Pasos futuros
            stepElement.classList.remove('active', 'completed');
            stepNumberEl.className = 'step-number bg-gray-300 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2';
            stepNameEl.className = 'step-name text-sm font-medium text-gray-600';
        }
    });
}

// Función para volver a productos
function backToProducts() {
    const checkoutSection = document.getElementById('restodelform');
    const productsSection = document.getElementById('todoslosmodelos');
    
    if (checkoutSection && productsSection) {
        checkoutSection.classList.add('hidden');
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Actualizar进度栏
        updateCheckoutProgress(1);
    }
}

// Función para actualizar dinámicamente los campos de revisión
function updateReviewFields() {
    // Actualizar campos de contacto
    const nombreField = document.getElementById('1460904554');
    const whatsappField = document.getElementById('53830725');
    const emailField = document.getElementById('1465946249');
    const dniField = document.getElementById('541001873');
    
    // Actualizar campos de dirección
    const calleField = document.getElementById('951592426');
    const localidadField = document.getElementById('1743418466');
    const cpField = document.getElementById('1005165410');
    const provinciaField = document.getElementById('59648134');
    
    // Actualizar elementos de revisión
    const nombreReview = document.getElementById('help-nombre');
    const whatsappReview = document.getElementById('help-wapp');
    const emailReview = document.getElementById('help-email');
    const dniReview = document.getElementById('help-dni');
    const calleReview = document.getElementById('help-calleyaltura');
    const localidadReview = document.getElementById('help-localidad');
    const cpReview = document.getElementById('help-cp');
    const provinciaReview = document.getElementById('help-provincia');
    
    // Actualizar campos de contacto en tiempo real
    if (nombreField && nombreReview) {
        nombreReview.textContent = nombreField.value || '-';
    }
    
    if (whatsappField && whatsappReview) {
        whatsappReview.textContent = whatsappField.value || '-';
    }
    
    if (emailField && emailReview) {
        emailReview.textContent = emailField.value || '-';
    }
    
    if (dniField && dniReview) {
        dniReview.textContent = dniField.value || '-';
    }
    
    // Actualizar campos de dirección en tiempo real
    if (calleField && calleReview) {
        calleReview.textContent = calleField.value || '-';
    }
    
    if (localidadField && localidadReview) {
        localidadReview.textContent = localidadField.value || '-';
    }
    
    if (cpField && cpReview) {
        cpReview.textContent = cpField.value || '-';
    }
    
    if (provinciaField && provinciaReview) {
        const selectedOption = provinciaField.options[provinciaField.selectedIndex];
        provinciaReview.textContent = selectedOption ? selectedOption.text : '-';
    }
}

// Variable global para prevenir duplicados
let isProcessingAddToCart = false;

// Función global para manejar clics en botones de agregar al carrito
function handleAddToCart(button) {
    console.log('🛒 handleAddToCart called', button);
    
    // Prevenir múltiples clics simultáneos
    if (isProcessingAddToCart) {
        console.log('⚠️ Ya se está procesando un agregado al carrito');
        return;
    }
    
    isProcessingAddToCart = true;
    
    try {
        const model = button.getAttribute('data-model');
        console.log('📦 Model:', model);
        
        const selectId = `talle-${model}`;
        console.log('🔍 Looking for select ID:', selectId);
        
        // Buscar el select dentro del mismo product-card
        const productCard = button.closest('.product-card');
        let selectElement = null;
        
        if (productCard) {
            selectElement = productCard.querySelector(`#${selectId}`);
            console.log('📋 Select found in product card:', !!selectElement);
        } else {
            // Fallback: búsqueda global por ID
            selectElement = document.getElementById(selectId);
            console.log('📋 Select found globally:', !!selectElement);
        }
        
        if (selectElement) {
            console.log('📊 Select value:', selectElement.value);
            console.log('📊 Select selectedIndex:', selectElement.selectedIndex);
            
            // Resetear todos los otros selects para evitar confusiones
            const allSelects = document.querySelectorAll('select[id^="talle-"]');
            allSelects.forEach(select => {
                if (select.id !== selectId) {
                    console.log('🔄 Resetting other select:', select.id);
                    select.selectedIndex = 0;
                }
            });
            
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            console.log('📝 Selected option:', selectedOption);
            
            const sizeText = selectedOption ? selectedOption.textContent.split(' (')[0] : '';
            console.log('👟 Size extracted:', sizeText);
            
            if (sizeText && sizeText !== '-- Selecciona Talle --') {
                addToCart(model, sizeText);
            } else {
                showCartMessage('Por favor selecciona un talle', 'warning');
                console.log('⚠️ Size validation failed');
            }
        } else {
            showCartMessage('Error: No se encontró el selector de talle', 'error');
            console.log('❌ Select element not found');
        }
    } finally {
        // Restablecer el flag después de un breve período
        setTimeout(() => {
            isProcessingAddToCart = false;
        }, 500);
    }
}

// Función para inicializar los eventos del carrito
function initializeCart() {
    // Event listeners para los botones de agregar al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleAddToCart(this);
        });
    });

    // Event listener para el botón del carrito
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', toggleCart);
    }

    // Event listener para cerrar el carrito
    const cartClose = document.querySelector('.cart-close');
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    // Event listener para volver a productos
    const backToProductsBtn = document.getElementById('back-to-products');
    if (backToProductsBtn) {
        backToProductsBtn.addEventListener('click', backToProducts);
    }

    // Event listener para el botón de checkout en el carrito
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', goToCheckoutForm);
    }

    // Event listeners para actualización en tiempo real de campos de revisión
    const formFields = [
        '1460904554', '53830725', '1465946249', '541001873', // Contacto
        '951592426', '1743418466', '1005165410', '59648134' // Dirección
    ];
    
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', updateReviewFields);
            field.addEventListener('change', updateReviewFields);
        }
    });

    // Event listener para cambios en método de pago
    const paymentMethodSelect = document.getElementById('comoabona');
    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', function() {
            updateOrderSummary(); // Actualizar precio cuando cambia el método de pago
        });
    }

    // Inicializar UI del carrito
    updateCartUI();
    
    // Inicializar campos de revisión
    updateReviewFields();
}

// Función para inicializar los carruseles Embla
function initializeSwipers() {
    console.log('🎠 Inicializando carruseles Embla...');
    
    // Los carruseles ahora se inicializan automáticamente con Embla Carousel
    // Esta función queda para compatibilidad pero los carruseles ya funcionan por sí solos
    console.log('✅ Carruseles Embla ya inicializados automáticamente');
}

// Función global para inicialización (llamada desde Layout.astro)
window.initCarousels = initializeSwipers;
window.initializeSwipers = initializeSwipers;

// Función para inicializar guías de talles
function initializeSizeGuides() {
    const sizeGuideContainers = document.querySelectorAll('.size-guide-container');
    
    sizeGuideContainers.forEach(container => {
        const toggle = container.querySelector('.size-guide-toggle');
        const content = container.querySelector('.size-guide-content');
        const icon = container.querySelector('.toggle-icon');
        
        if (toggle && content && icon) {
            toggle.addEventListener('click', function() {
                const isOpen = container.classList.contains('open');
                
                if (isOpen) {
                    container.classList.remove('open');
                    content.classList.add('hidden');
                    icon.textContent = '+';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    container.classList.add('open');
                    content.classList.remove('hidden');
                    icon.textContent = '-';
                    icon.style.transform = 'rotate(45deg)';
                }
            });
        }
    });
}

// Función para inicializar testimonios
function initializeTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    const loadMoreBtn = document.getElementById('load-more-testimonials');
    const loadingIndicator = document.getElementById('testimonials-loading');
    
    if (!testimonialsGrid) return;

    // Lista de testimonios disponibles
    const allTestimonials = [
        { src: 'comentarios/comentariorecibi1.webp', alt: 'Captura de comentario positivo de clienta 1' },
        { src: 'comentarios/comentariorecibi2.webp', alt: 'Captura de comentario positivo de clienta 2' },
        { src: 'comentarios/comentariorecibi4.webp', alt: 'Captura de comentario positivo de clienta 3' },
        { src: 'comentarios/comentariorecibi5.webp', alt: 'Captura de comentario positivo de clienta 4' },
        { src: 'comentarios/comentariorecibi6.webp', alt: 'Captura de comentario positivo de clienta 5' },
        { src: 'comentarios/comentariorecibi7.webp', alt: 'Captura de comentario positivo de clienta 6' },
        { src: 'comentarios/comentariorecibi8.webp', alt: 'Captura de comentario positivo de clienta 7' },
        { src: 'comentarios/comentariosig.webp', alt: 'Comentarios de Instagram' },
        { src: 'comentarios/comentario1-min.webp', alt: 'Testimonio destacado 1' },
        { src: 'comentarios/comentario2-min.webp', alt: 'Testimonio destacado 2' },
        { src: 'comentarios/comentario3-min.webp', alt: 'Referencia de clienta satisfecha 1' },
        { src: 'comentarios/comentario4-min.webp', alt: 'Referencia de clienta satisfecha 2' },
        { src: 'comentarios/comentario5-min.webp', alt: 'Referencia de clienta satisfecha 3' }
    ];

    let currentIndex = 0;
    const itemsPerLoad = 6;

    function loadTestimonials() {
        const endIndex = Math.min(currentIndex + itemsPerLoad, allTestimonials.length);
        
        for (let i = currentIndex; i < endIndex; i++) {
            const testimonial = allTestimonials[i];
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial-item bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 mb-4';
            testimonialElement.innerHTML = `
                <img src="${testimonial.src}" alt="${testimonial.alt}" 
                     class="w-full h-auto object-cover" 
                     loading="lazy">
            `;
            testimonialsGrid.appendChild(testimonialElement);
        }
        
        currentIndex = endIndex;
        
        // Ocultar botón de cargar más si no hay más testimonios
        if (currentIndex >= allTestimonials.length && loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Cargar testimonios iniciales
    loadTestimonials();

    // Event listener para cargar más testimonios
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            if (loadingIndicator) {
                loadingIndicator.style.display = 'block';
                loadMoreBtn.style.display = 'none';
            }
            
            // Simular carga y mostrar más después de un momento
            setTimeout(() => {
                loadTestimonials();
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
                if (currentIndex < allTestimonials.length) {
                    loadMoreBtn.style.display = 'inline-block';
                }
            }, 800);
        });
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando aplicación...');
    
    // Inicializar carrito
    initializeCart();
    
    // Inicializar guías de talles
    initializeSizeGuides();
    
    // Inicializar testimonios
    initializeTestimonials();
    
    // Inicializar Swiper con un pequeño delay para asegurar que todo esté cargado
    setTimeout(initializeSwipers, 200);
    
    console.log('✅ Aplicación inicializada correctamente');
});

// También inicializar cuando la ventana esté completamente cargada
window.addEventListener('load', function() {
    console.log('🔄 Re-inicializando Swiper después de load...');
    setTimeout(initializeSwipers, 100);
});

// Función global para inicialización manual (para debugging)
window.debugSwipers = function() {
    console.log('🐛 Debug Swipers');
    console.log('Swiper disponible:', typeof Swiper !== 'undefined');
    
    // Verificar si los elementos existen
    ['guillermina-negras', 'guillermina-camel', 'guillermina-blancas'].forEach(product => {
        const mainElement = document.getElementById(`swiper-${product}`);
        const thumbElement = document.getElementById(`swiper-thumbnails-${product}`);
        console.log(`Producto ${product}:`, {
            main: !!mainElement,
            thumb: !!thumbElement,
            mainId: `swiper-${product}`,
            thumbId: `swiper-thumbnails-${product}`
        });
    });
    
    // Intentar inicializar
    initializeSwipers();
};

// Estilos CSS para mensajes del carrito (se agregan dinámicamente)
const cartStyles = `
    /* Mini Cart Responsive */
    #mini-cart {
        position: fixed;
        right: 1rem;
        top: 5rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        padding: 1rem;
        width: 24rem;
        max-width: 90vw;
        z-index: 50;
        transform: translateX(100%);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        max-height: 70vh;
        overflow-y: auto;
    }
    
    @media (max-width: 768px) {
        #mini-cart {
            position: fixed;
            right: 0;
            top: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            max-width: 100vw;
            max-height: 100vh;
            border-radius: 0;
            transform: translateX(100%);
        }
    }
    
    .cart-message {
        position: relative;
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        animation: slideInMessage 0.4s ease-out;
    }
    
    .cart-message:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .message-text {
        flex-grow: 1;
        font-weight: 500;
        line-height: 1.4;
    }
    
    .message-close {
        background: transparent;
        border: none;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.4);
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        transition: all 0.2s ease;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .message-close:hover {
        background: rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.7);
        transform: scale(1.1);
    }
    
    @keyframes slideInMessage {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .testimonial-item {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .testimonial-item:nth-child(n) {
        animation-delay: calc(n * 0.1s);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .cart-item {
        transition: all 0.3s ease;
    }
    
    .cart-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .remove-item {
        transition: all 0.2s ease;
    }
    
    .remove-item:hover {
        background: rgba(239, 68, 68, 0.1);
        transform: scale(1.1);
    }
`;

// Agregar estilos al head
const styleSheet = document.createElement('style');
styleSheet.textContent = cartStyles;
document.head.appendChild(styleSheet);
