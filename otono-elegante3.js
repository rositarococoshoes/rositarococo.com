/* Rosita Rococó Otoño 2025 Script */
/* Modular, minimalistic, clean */

$(function() {
  // --- Product Catalog ---
  const products = [
    { id: 'roma-negras', name: 'Botineta Roma Negras', price1: 70000, price2: 110000, img: 'roma-negras-1a.jpg' },
    { id: 'roma-suela', name: 'Botineta Roma Suela', price1: 70000, price2: 110000, img: 'roma-suela-1a.jpg' },
    { id: 'siena2025', name: 'Borcego Siena 2025', price1: 70000, price2: 110000, img: 'siena2025-1.webp' },
    { id: 'venecia-negras', name: 'Venecia Negras', price1: 70000, price2: 110000, img: 'venecia-negras-1a.jpg' }
  ];

  // --- Cart State ---
  let cart = [];

  // --- Render Products ---
  function renderProducts() {
    const $container = $('.carousel-container').empty();
    products.forEach(prod => {
      const $card = $(`
        <div class="product-card">
          <img src="${prod.img}" alt="${prod.name}">
          <div class="product-info">
            <h3>${prod.name}</h3>
            <div class="size-selector">
              <label>Talle:
                <select>
                  <option value="">Elegí un talle</option>
                  <option>35</option>
                  <option>36</option>
                  <option>37</option>
                  <option>38</option>
                  <option>39</option>
                  <option>40</option>
                </select>
              </label>
            </div>
            <button class="add-to-cart-btn" data-id="${prod.id}">Agregar al carrito</button>
          </div>
        </div>
      `);
      $container.append($card);
    });
  }

  // --- Update Cart UI ---
  function updateCart() {
    const $list = $('.cart-items').empty();
    cart.forEach(item => {
      $('<li>').text(`${item.name} - Talle ${item.size}`).appendTo($list);
    });

    const total = cart.length === 2 ? 110000 : cart.length === 1 ? 70000 : 0;
    $('#cart-total').text(total.toLocaleString('es-AR'));
    $('#cart-count').text(cart.length);
  }

  // --- Toggle Cart Drawer ---
  function toggleCart(open) {
    const $drawer = $('#cart-drawer');
    if(open === undefined) open = !$drawer.hasClass('open');
    $drawer.toggleClass('open', open);
  }

  // --- Add to Cart ---
  function addToCart(productId, size) {
    if(cart.length >= 2) {
      alert('Máximo 2 pares por pedido.');
      return;
    }
    const product = products.find(p => p.id === productId);
    if(!product) return;

    cart.push({ id: productId, name: product.name, size });
    updateCart();
  }

  // --- Event Bindings ---
  $(document)
    .on('click', '.add-to-cart-btn', function() {
      const productId = $(this).data('id');
      const size = $(this).closest('.product-info').find('select').val();
      if(!size) {
        alert('Selecciona un talle');
        return;
      }
      addToCart(productId, size);
    })
    .on('click', '#cart-toggle', function() {
      toggleCart();
    })
    .on('click', '#checkout-btn', function() {
      toggleCart(false);
      $('#checkout-section').removeClass('hidden');
      $('html, body').animate({ scrollTop: $('#checkout-section').offset().top }, 500);
    })
    .on('click', '.payment-option', function() {
      $('.payment-option').removeClass('active');
      $(this).addClass('active');
      $('input[name="payment"]').val($(this).data('method'));
      $('.payment-error').addClass('hidden');
      validateCheckout();
    })
    .on('submit', '#checkout-form', function(e) {
      e.preventDefault();
      if(cart.length === 0){
        showFormMessage('Tu carrito está vacío.', true);
        return;
      }
      if(!$('input[name="payment"]').val()){
        showFormMessage('Selecciona un método de pago.', true);
        return;
      }
      showFormMessage('¡Gracias por tu compra!');
      cart = [];
      updateCart();
      this.reset();
      $('.payment-option').removeClass('active');
      validateCheckout();
    })
    .on('input change', '#checkout-form input', validateCheckout);

  // --- Checkout Validation ---
  function validateCheckout() {
    const name = $('input[name="name"]').val().trim();
    const email = $('input[name="email"]').val().trim();
    const whatsapp = $('input[name="whatsapp"]').val().trim();
    const address = $('input[name="address"]').val().trim();
    const payment = $('input[name="payment"]').val().trim();

    const valid = name && email && whatsapp && address && payment && cart.length > 0;
    $('#submit-order').prop('disabled', !valid);
  }

  // --- Show Form Message ---
  function showFormMessage(msg, isError=false) {
    const $msg = $('#form-message');
    $msg.text(msg).css('color', isError ? '#BC4749' : '#6A994E').fadeIn(200).delay(2000).fadeOut(400);
  }

  // --- Initialize ---
  renderProducts();
  updateCart();

  // --- Scroll to products on CTA click ---
  $('#see-products-btn').on('click', function() {
    $('html, body').animate({ scrollTop: $('#products').offset().top }, 500);
  });
});
