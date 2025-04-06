// Rosita Rococó Premium E-commerce Script
// Handles product rendering, cart logic, checkout, and UI interactions

$(function() {
  // Product catalog (preserved core data)
  const products = [
    { id: 'roma-negras', name: 'Botineta Roma Negras', price1: 70000, price2: 110000, img: 'roma-negras-1.jpg' },
    { id: 'roma-suela', name: 'Botineta Roma Suela', price1: 70000, price2: 110000, img: 'roma-suela-1a.jpg' },
    { id: 'siena2025', name: 'Borcego Siena 2025', price1: 70000, price2: 110000, img: 'siena2025-1.webp' },
    { id: 'venecia-negras', name: 'Venecia Negras', price1: 70000, price2: 110000, img: 'venecia-negras-1a.jpg' }
  ];

  const cart = [];

  // Update cart UI and total price
  function updateCartDisplay() {
    const $list = $('.cart-items').empty();
    cart.forEach(item => {
      $('<li>').text(`${item.name} - Talle ${item.size}`).appendTo($list);
    });
    const total = cart.length === 2 ? 110000 : cart.length === 1 ? 70000 : 0;
    $('#total-price').text(`Total: $${total.toLocaleString('es-AR')}`);
    // Show or hide cart summary based on cart content
    if(cart.length > 0){
      $('#cart-summary').addClass('active');
    } else {
      $('#cart-summary').removeClass('active');
    }
  }

  // Show cart feedback message
  function showCartMessage(msg, isError = false) {
    $('#cart-message')
      .text(msg)
      .stop(true, true)
      .css('color', isError ? '#8b3a2e' : '#5a8f3e')
      .fadeIn(200)
      .delay(1500)
      .fadeOut(400);
  }

  // Show checkout form feedback message
  function showFormMessage(msg, isError = false) {
    $('#form-message')
      .text(msg)
      .stop(true, true)
      .css('color', isError ? '#8b3a2e' : '#5a8f3e')
      .fadeIn(200)
      .delay(2000)
      .fadeOut(400);
  }

  // Add product to cart with size validation
  function addToCart(product, size) {
    if (cart.length >= 2) {
      showCartMessage('Máximo 2 pares por pedido.', true);
      return;
    }
    cart.push({ name: product.name, size });
    updateCartDisplay();
    showCartMessage('Producto agregado al carrito');
  }

  // Generate product cards dynamically
  products.forEach(prod => {
    const $card = $('<div class="product-card" tabindex="0"></div>');
    $card.append(`<img src="${prod.img}" alt="${prod.name}">`);
    $card.append(`<h3>${prod.name}</h3>`);
    const $sizeSelect = $(`
      <select aria-label="Selecciona talle">
        <option value="">Talle</option>
        <option value="35">35</option>
        <option value="36">36</option>
        <option value="37">37</option>
        <option value="38">38</option>
        <option value="39">39</option>
        <option value="40">40</option>
      </select>`);
    $card.append($sizeSelect);
    const $btn = $('<button>Agregar al carrito</button>');
    $btn.on('click', () => {
      const size = $sizeSelect.val();
      if (!size) {
        showCartMessage('Selecciona un talle', true);
        return;
      }
      addToCart(prod, size);
    });
    $card.append($btn);
    $('.product-list').append($card);
  });

  // Handle checkout form submission
  $('#checkout-form').on('submit', function(e) {
    e.preventDefault();
    if(cart.length === 0){
      showFormMessage('Tu carrito está vacío.', true);
      return;
    }
    const data = $(this).serializeArray();
    console.log('Pedido:', cart, 'Datos cliente:', data);
    showFormMessage('¡Gracias por tu compra!');
    cart.length = 0;
    updateCartDisplay();
    this.reset();
  });
});
