// Variables globales para el carrito - Protección contra cargas múltiples
if (typeof window.cart === 'undefined') {
    window.cart = [];
    window.cartCount = 0;
    window.isCartOpen = false;
}

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
        showCartMessage('✅ ¡Agregá un segundo par!', 'success');
    } else if (window.cartCount === 2) {
        showCartMessage('✅ ¡Promoción activada!', 'success');
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
        showCartMessage('🛒 Carrito vacío', 'info');
    } else if (window.cartCount === 1) {
        showCartMessage('✅ Agregá otro par para activar descuento', 'warning');
    } else {
        showCartMessage('✅ Promoción activada', 'success');
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

        // Generar HTML de los items
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

    // Actualizar estado y texto del botón de checkout simplificado
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        if (window.cartCount === 0) {
            checkoutBtn.disabled = true;
            checkoutBtn.className = 'bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed';
            checkoutBtn.textContent = 'Continuar';
        } else {
            // Botón gris simplificado para 1+ productos
            checkoutBtn.disabled = false;
            checkoutBtn.className = 'bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 cursor-pointer';
            checkoutBtn.textContent = 'Finalizar pedido';
        }
    }

    // Agregar mensaje contextual simple para incentivar segundo par
    const cartOfferMessage = document.getElementById('cart-offer-message');
    if (cartOfferMessage) {
        if (window.cartCount === 1) {
            cartOfferMessage.classList.remove('hidden');
            const offerText = document.getElementById('offer-text');
            if (offerText) {
                offerText.textContent = '¡Agrega otro par para activar el descuento!';
            }
        } else {
            cartOfferMessage.classList.add('hidden');
        }
    }

    // Mostrar automáticamente el formulario de checkout si hay items
    const checkoutSection = document.getElementById('restodelform');
    if (checkoutSection) {
        if (window.cartCount > 0) {
            checkoutSection.classList.remove('hidden');
            updateCheckoutProgress(2);

            // Mostrar notificación suave
            showCartMessage('🛒 ¡Carrito listo!', 'info', 3000);
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
    // Eliminar notificaciones existentes para evitar duplicación
    const existingNotifications = document.querySelectorAll('.fixed.inset-0');
    existingNotifications.forEach(notification => {
        if (notification.querySelector('.bg-white.rounded-lg')) {
            notification.remove();
        }
    });

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

    // Verificar si el mensaje ya contiene emoji para evitar duplicación
    const hasEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(message);

    let iconDisplay = '';
    if (!hasEmoji) {
        switch(type) {
            case 'success':
                iconDisplay = '✅ ';
                break;
            case 'warning':
                iconDisplay = '⚠️ ';
                break;
            case 'error':
                iconDisplay = '❌ ';
                break;
            default:
                iconDisplay = 'ℹ️ ';
        }
    }

    modalContent.innerHTML = `
        <div class="${bgColor} border-l-4 p-4 rounded-lg">
            <div class="flex items-center">
                <p class="flex-1 font-medium">${iconDisplay}${message}</p>
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
    const backdrop = document.getElementById('cart-backdrop');
    if (miniCart && !window.isCartOpen) {
        window.isCartOpen = true;
        miniCart.style.transform = 'translateX(0)';
        miniCart.style.opacity = '1';
        miniCart.style.pointerEvents = 'auto';

        // Mostrar backdrop
        if (backdrop) {
            backdrop.style.display = 'block';
            backdrop.classList.remove('hidden');
        }
    }
}

function closeCart() {
    const miniCart = document.getElementById('mini-cart');
    const backdrop = document.getElementById('cart-backdrop');
    if (miniCart && window.isCartOpen) {
        window.isCartOpen = false;
        miniCart.style.transform = 'translateX(100%)';
        miniCart.style.opacity = '0';
        miniCart.style.pointerEvents = 'none';

        // Ocultar backdrop
        if (backdrop) {
            backdrop.style.display = 'none';
            backdrop.classList.add('hidden');
        }
    }
}

// Función para ir al formulario de checkout - simplificada
function goToCheckoutForm() {
    if (window.cartCount === 0) {
        showCartMessage('Debes agregar productos antes de continuar', 'warning');
        return;
    }

    // Continuar al envío con smooth scrolling para cualquier cantidad > 0
    closeCart();

    // Esperar a que el carrito se cierre completamente
    setTimeout(() => {
        // Mostrar formulario de checkout
        const checkoutSection = document.getElementById('restodelform');

        if (checkoutSection) {
            checkoutSection.classList.remove('hidden');

            // Esperar un frame más para asegurar que el DOM se actualizó
            requestAnimationFrame(() => {
                // Smooth scrolling mejorado al inicio del formulario de envío
                const datosEnvioElement = document.getElementById('datos-envio');

                if (datosEnvioElement) {
                    console.log('Haciendo smooth scroll a datos-envio');
                    smoothScrollToElement(datosEnvioElement);
                } else {
                    console.log('Haciendo smooth scroll a checkoutSection');
                    smoothScrollToElement(checkoutSection);
                }

                updateCheckoutProgress(2);
                showCartMessage('✅ ¡Listo para completar!', 'success');
            });
        } else {
            console.error('No se encontró el elemento checkoutSection');
        }
    }, 600); // Delay aumentado para mejor transición
}

// Función para hacer smooth scroll de manera más controlada
function smoothScrollToElement(element) {
    if (!element) return;

    const startPosition = window.pageYOffset;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 100; // 100px de offset
    const distance = targetPosition - startPosition;
    const duration = 800; // Duración más larga para smoother scroll

    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Función de easing para smooth scroll
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startPosition + (distance * ease));

        if (progress < 1) {
            window.requestAnimationFrame(animation);
        }
    }

    window.requestAnimationFrame(animation);
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

// Función para inicializar los carruseles Embla - Versión simplificada
function initializeCarousels() {
    console.log('🎠 Inicializando carruseles Embla...');

    // Verificar que EmblaCarousel esté disponible
    if (typeof EmblaCarousel === 'undefined') {
        console.error('❌ EmblaCarousel no está cargado');
        return;
    }

    // Esperar a que el DOM esté completamente cargado
    setTimeout(() => {
        // Encontrar todos los carruseles con clase .embla
        const carouselNodes = document.querySelectorAll('.embla');

        if (carouselNodes.length === 0) {
            console.log('❌ No se encontraron carruseles con clase .embla');
            return;
        }

        carouselNodes.forEach((node, index) => {
            const viewport = node.querySelector('.embla__viewport');

            if (!viewport) {
                console.warn(`⚠️ Carrusel ${index}: No se encontró viewport`);
                return;
            }

            try {
                // Inicializar carrusel con configuración simple
                const emblaNode = EmblaCarousel(viewport, {
                    align: 'start',
                    containScroll: 'keepSnaps',
                    dragFree: true,
                    loop: false,
                    slidesToScroll: 1,
                });

                console.log(`✅ Carrusel ${index} inicializado correctamente`);

                // Configurar botones de navegación
                const prevBtn = node.querySelector('.embla__button--prev');
                const nextBtn = node.querySelector('.embla__button--next');

                if (prevBtn) {
                    prevBtn.addEventListener('click', () => emblaNode.scrollPrev(), false);
                }

                if (nextBtn) {
                    nextBtn.addEventListener('click', () => emblaNode.scrollNext(), false);
                }

                // Configurar thumbnails si existen
                const thumbsViewport = node.parentElement?.querySelector('.embla-thumbs__viewport');
                if (thumbsViewport) {
                    const thumbsEmblaNode = EmblaCarousel(thumbsViewport, {
                        containScroll: 'keepSnaps',
                        dragFree: false,
                    });

                    // Configurar clics en thumbnails
                    const thumbs = thumbsEmblaNode.slideNodes();
                    thumbs.forEach((thumbNode, thumbIndex) => {
                        thumbNode.addEventListener('click', () => {
                            emblaNode.scrollTo(thumbIndex);
                        });
                    });

                    // Sincronizar carrusel principal con thumbnails
                    emblaNode.on('select', () => {
                        const selected = emblaNode.selectedScrollSnap();
                        thumbs.forEach((thumbNode, thumbIndex) => {
                            if (thumbIndex === selected) {
                                thumbNode.classList.add('embla-thumbs__slide--selected');
                            } else {
                                thumbNode.classList.remove('embla-thumbs__slide--selected');
                            }
                        });
                    });
                }

            } catch (error) {
                console.error(`❌ Error inicializando carrusel ${index}:`, error);
            }
        });

        console.log(`✅ ${carouselNodes.length} carruseles procesados`);

    }, 1000); // Esperar 1 segundo para asegurar que todo esté cargado
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

    // Event listener para el backdrop (clickear fuera para cerrar)
    const backdrop = document.getElementById('cart-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closeCart);
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

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando aplicación...');

    // Inicializar carrito
    initializeCart();

    // Inicializar guías de talles
    initializeSizeGuides();

    // Inicializar testimonios
    initializeTestimonials();

    // Inicializar carruseles con delay para asegurar que los scripts externos se carguen
    setTimeout(() => {
        initializeCarousels();
    }, 2000);

    console.log('✅ Aplicación inicializada correctamente');
});

// Exponer funciones globales para compatibilidad
window.initCarousels = initializeCarousels;
window.initializeCarousels = initializeCarousels;