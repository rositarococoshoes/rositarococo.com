// Product Data
const products = [
  {
    id: 'roma-negras',
    name: 'BOTAS ROMA NEGRAS',
    description: 'Material: Cuero genuino - Suela: Expanso',
    images: [
      { src: 'roma-negras-1.jpg', alt: 'Roma Negras Vista 1' },
      { src: 'roma-negras-1a.jpg', alt: 'Roma Negras Vista 2', lazy: true },
      { src: 'roma-negras-5a.jpg', alt: 'Roma Negras Vista 3', lazy: true }
      // Add more images if available in original HTML or assets
    ],
    sizes: [
      { value: '35-roma-negras', text: '35 (23 cm)' },
      { value: '36-roma-negras', text: '36 (23.5 cm)' },
      { value: '37-roma-negras', text: '37 (24 cm)' },
      { value: '38-roma-negras', text: '38 (25 cm)' },
      { value: '39-roma-negras', text: '39 (25.5 cm)' }
      // Add 40 if available
    ],
    priceSingle: 70000,
    priceDouble: 110000 // Assuming this price applies if 2 pairs total are bought
  },
  {
    id: 'roma-suela',
    name: 'BOTAS ROMA SUELA',
    description: 'Material: Cuero genuino - Suela: Expanso',
    images: [
      { src: 'roma-suela-1a.jpg', alt: 'Roma Suela Vista 1' },
      { src: 'roma-suela-2a.jpg', alt: 'Roma Suela Vista 2', lazy: true }
      // Add more images if available
    ],
    sizes: [
      { value: '35-roma-suela', text: '35 (23 cm)' },
      { value: '36-roma-suela', text: '36 (23.5 cm)' },
      { value: '37-roma-suela', text: '37 (24 cm)' },
      { value: '38-roma-suela', text: '38 (25 cm)' },
      { value: '39-roma-suela', text: '39 (25.5 cm)' }
      // Add 40 if available
    ],
    priceSingle: 70000,
    priceDouble: 110000
  },
  {
    id: 'siena2025',
    name: 'BOTAS SIENA 2025',
    description: 'Material: Cuero genuino - Suela: Expanso',
    images: [
      { src: 'siena2025-1.webp', alt: 'Siena 2025 Vista 1' },
      { src: 'siena2025-2.webp', alt: 'Siena 2025 Vista 2', lazy: true }
    ],
    sizes: [
      { value: '35-siena2025', text: '35 (23 cm)' },
      { value: '36-siena2025', text: '36 (23.5 cm)' },
      { value: '37-siena2025', text: '37 (24 cm)' },
      { value: '38-siena2025', text: '38 (25 cm)' },
      { value: '39-siena2025', text: '39 (25.5 cm)' }
      // Add 40 if available
    ],
    priceSingle: 70000,
    priceDouble: 110000
  }
];

// Function to create HTML for a single product card
function createProductCardHTML(product) {
  const imageSlides = product.images.map(img => `
    <div>
      <img ${img.lazy ? 'data-lazy' : 'src'}="${img.src}" alt="${img.alt}">
    </div>
  `).join('');

  const sizeOptions = product.sizes.map(size => `
    <option value="${size.value}">${size.text}</option>
  `).join('');

  // Using Intl.NumberFormat for currency formatting
  const formatCurrency = (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return `
    <div class="contorno" id="modeload-${product.id}" data-product-id="${product.id}">
      <div class="model-carousel">
        ${imageSlides}
      </div>
      <div class="model-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">1 par: ${formatCurrency(product.priceSingle)} | 2 pares: ${formatCurrency(product.priceDouble)}</p>
        <p class="discount">10% OFF adicional por transferencia</p>

        <fieldset>
          <legend>Cantidad (para este modelo):</legend>
          <label><input type="radio" name="qty-${product.id}" value="1" checked> 1 par</label>
          <label><input type="radio" name="qty-${product.id}" value="2"> 2 pares</label>
        </fieldset>

        <fieldset class="size-selector-set" data-pair="1">
          <legend>Talle Par 1:</legend>
          <select class="form-control talle" data-pair-index="1">
            <option value="">-- Seleccione --</option>
            ${sizeOptions}
          </select>
        </fieldset>

        <fieldset class="size-selector-set" data-pair="2" style="display: none;">
          <legend>Talle Par 2:</legend>
          <select class="form-control talle" data-pair-index="2">
            <option value="">-- Seleccione --</option>
            ${sizeOptions}
          </select>
        </fieldset>
      </div>
    </div>
  `;
}

// Function to show notification (from original inline script)
function showNotification(message) {
  const notification = $(`
    <div class="notification show">
      <div class="order-info">
        <h3>¡Carrito actualizado!</h3>
        <p>${message}</p>
      </div>
      <div class="close">×</div>
    </div>
  `);

  $('#notification-container').append(notification);

  setTimeout(() => {
    notification.removeClass('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);

  notification.find('.close').click(function() {
    notification.removeClass('show');
    setTimeout(() => notification.remove(), 300);
  });
}

// Form validation function (from original inline script)
function validateForm() {
  let isValid = true;
  $('.error-message').removeClass('show').text(''); // Clear previous errors

  const email = $('#email').val();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Basic email format check
    $('#email-error').text('Por favor ingresa un email válido').addClass('show');
    isValid = false;
  }

  const whatsapp = $('#whatsapp').val();
  // Basic validation: check if it contains only digits and has a reasonable length
  if (!whatsapp || !/^\d{8,15}$/.test(whatsapp)) {
    $('#whatsapp-error').text('Por favor ingresa un número de WhatsApp válido (solo números)').addClass('show');
    isValid = false;
  }

  // Check required fields
  $('#bootstrapForm [required]').each(function() {
      if (!$(this).val()) {
          isValid = false;
          // Optionally add error messages near empty required fields
          $(this).after('<div class="error-message show">Campo requerido</div>');
      }
  });


  return isValid;
}


// Main script execution
$(document).ready(function() {
  const productContainer = $('.model-container');
  let cartItems = []; // Array to hold selected items { uniqueId, id, name, size, fullValue, pairIndex }
  const MAX_ITEMS_TOTAL = 2;

  // --- Generate Product Cards ---
  products.forEach(product => {
    const cardHTML = createProductCardHTML(product);
    productContainer.append(cardHTML);
  });

  // --- Initialize Carousels (after content is added) ---
  $('.model-carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    lazyLoad: 'ondemand',
    adaptiveHeight: true,
    accessibility: false // Keep disabled based on previous file experience
  });

  $('.testimonials-carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    accessibility: false // Keep disabled
  });

  // --- Event Handlers using Delegation ---

  // Handle Quantity Radio Button Changes
  productContainer.on('change', 'input[type="radio"][name^="qty-"]', function() {
    const $radio = $(this);
    const $card = $radio.closest('.contorno');
    const productId = $card.data('product-id');
    const selectedQty = parseInt($radio.val());

    const $secondPairFieldset = $card.find('.size-selector-set[data-pair="2"]');
    const $secondSelect = $secondPairFieldset.find('select.talle');

    if (selectedQty === 2) {
      $secondPairFieldset.slideDown('fast');
    } else {
      $secondPairFieldset.slideUp('fast');
      // If quantity reduced to 1, remove the second item of this product from cart if it exists
      const secondItemValue = $secondSelect.val();
      if (secondItemValue) {
          const itemIndex = cartItems.findIndex(item => item.uniqueId === secondItemValue && item.pairIndex === 2);
          if (itemIndex > -1) {
              cartItems.splice(itemIndex, 1);
              showNotification(`Se quitó el segundo par de ${$card.find('h3').text()}`);
              updateCartSummary(); // Update summary if needed
          }
      }
      $secondSelect.val(''); // Reset the second dropdown
      $secondSelect.data('previous-value', ''); // Clear its previous value
    }
  });

  // Handle Size Selection Changes
  productContainer.on('change', 'select.talle', function() {
    const $select = $(this);
    const selectedValue = $select.val();
    const $card = $select.closest('.contorno');
    const productId = $card.data('product-id');
    const productName = $card.find('h3').text();
    const pairIndex = $select.data('pair-index'); // 1 or 2
    const uniqueItemId = selectedValue ? `${selectedValue}-${pairIndex}` : null; // e.g., "37-roma-negras-1"
    const previousValue = $select.data('previous-value'); // e.g., "36-roma-negras-1"

    // 1. Remove previous item for this specific dropdown instance if it existed
    if (previousValue) {
      const previousItemIndex = cartItems.findIndex(item => item.uniqueId === previousValue);
      if (previousItemIndex > -1) {
        cartItems.splice(previousItemIndex, 1);
      }
    }

    // 2. Add new item if a size is selected and total cart limit not reached
    if (uniqueItemId) {
      if (cartItems.length >= MAX_ITEMS_TOTAL) {
        alert(`Puedes seleccionar un máximo de ${MAX_ITEMS_TOTAL} pares en total.`);
        $select.val(''); // Reset current dropdown
        $select.data('previous-value', null); // Clear previous value data
      } else {
        cartItems.push({
          uniqueId: uniqueItemId,
          id: productId,
          name: productName,
          size: selectedValue.split('-')[0],
          fullValue: selectedValue, // e.g., "37-roma-negras"
          pairIndex: pairIndex
        });
        showNotification(`${productName} - Talle ${selectedValue.split('-')[0]} (Par ${pairIndex}) agregado.`);
        $select.data('previous-value', uniqueItemId); // Store current unique ID as previous
      }
    } else {
      // Size deselected, clear previous value data
      $select.data('previous-value', null);
    }

    console.log("Cart:", cartItems); // For debugging
    updateCartSummary(); // Update summary display if needed
  });

  // Function to update cart summary (example)
  function updateCartSummary() {
      // You would update relevant elements in your HTML here
      // e.g., update a hidden input for form submission, display selected items, update total price
      console.log(`Cart updated, ${cartItems.length} items total.`);
      // Example: Update a hidden input for the form
      // $('#hidden-cart-input').val(JSON.stringify(cartItems));
  }

  // --- Form Submission ---
  $('#bootstrapForm').submit(function(e) {
    e.preventDefault();
    $('.error-message').removeClass('show').text(''); // Clear previous errors

    if (!validateForm()) {
        alert('Por favor, revisa los campos marcados.');
        // Focus first invalid field
         $('#bootstrapForm :invalid').first().focus();
        return false;
    }

    if (cartItems.length === 0) {
        alert('¡No has seleccionado ningún par! Elige tus modelos y talles.');
        // Scroll to products maybe?
        $('html, body').animate({ scrollTop: $(".model-section").offset().top - 20 }, 500);
        return false;
    }
     if (cartItems.length > MAX_ITEMS_TOTAL) {
        // This check should ideally prevent this state, but as a safeguard:
        alert(`Has seleccionado más de ${MAX_ITEMS_TOTAL} pares. Por favor, revisa tu selección.`);
         $('html, body').animate({ scrollTop: $(".model-section").offset().top - 20 }, 500);
        return false;
    }


    $('.loading-overlay').css('display', 'flex'); // Show loading

    // Prepare data for submission (example: log to console)
    const formData = {
        nombre: $('#nombre').val(),
        email: $('#email').val(),
        whatsapp: $('#whatsapp').val(),
        direccion: $('#direccion').val(),
        pedido: cartItems.map(item => `${item.name} Talle ${item.size} (Par ${item.pairIndex})`).join(', ')
        // Add other form fields as needed
    };
    console.log("Submitting data:", formData);

    // --- IMPORTANT ---
    // Replace the setTimeout below with your actual form submission logic
    // (e.g., AJAX call to Google Forms endpoint or your backend)
    // You might need to map `formData` to the specific 'entry.XXXX' fields
    // required by your Google Form.
    // -----------------

    setTimeout(function() { // Simulate processing
      $('.loading-overlay').hide();
      showNotification('Pedido completado con éxito. Te contactaremos por WhatsApp.');

      // Reset form and cart
      $('#bootstrapForm')[0].reset();
      $('select.talle').val('').data('previous-value', null);
      $('input[type="radio"][value="1"]').prop('checked', true); // Reset quantity radios
      $('.size-selector-set[data-pair="2"]').hide(); // Hide second pair fieldsets
      cartItems = [];
      updateCartSummary();
    }, 2000);
  });

  // --- Other Initializations ---
  // WhatsApp input formatting
  $('#whatsapp').on('input', function() {
    $(this).val($(this).val().replace(/\D/g, ''));
  });

}); // End document ready
