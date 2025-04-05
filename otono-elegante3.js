// Otoño Elegante - Funcionalidad principal

// Toggle hamburger menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Toggle cart drawer
const cartButton = document.querySelector('.cart-button');
const cartDrawer = document.querySelector('.cart-drawer');
const closeCart = document.querySelector('.close-cart');

cartButton.addEventListener('click', () => {
  cartDrawer.classList.toggle('open');
  cartDrawer.setAttribute('aria-hidden', cartDrawer.classList.contains('open') ? 'false' : 'true');
});

closeCart.addEventListener('click', () => {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
});

// Cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = [];

// Add product to cart
addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const product = e.target.closest('.product');
    const title = product.querySelector('h2').innerText;
    const priceText = product.querySelector('p').innerText.replace('$', '').replace(',', '');
    const price = parseFloat(priceText);

    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ title, price, quantity: 1 });
    }
    updateCart();
  });
});

// Update cart UI and total
function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.textContent = `${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    cartItemsContainer.appendChild(li);
  });
  cartTotal.innerText = total.toFixed(2);
}

// Checkout multi-step navigation
const checkoutSection = document.querySelector('.checkout');
const checkoutButton = document.querySelector('.checkout-button');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');
const steps = document.querySelectorAll('.checkout-step');

// Open checkout
checkoutButton.addEventListener('click', () => {
  checkoutSection.classList.add('active');
  checkoutSection.setAttribute('aria-hidden', 'false');
  showStep(0);
});

// Show specific step
function showStep(index) {
  steps.forEach((step, i) => {
    if (i === index) {
      step.hidden = false;
    } else {
      step.hidden = true;
    }
  });
}

// Next step buttons
nextButtons.forEach((button, idx) => {
  button.addEventListener('click', () => {
    showStep(idx + 1);
  });
});

// Previous step buttons
prevButtons.forEach((button, idx) => {
  button.addEventListener('click', () => {
    showStep(idx);
  });
});

// Confirm order button
const confirmOrderButton = document.querySelector('.confirm-order');
confirmOrderButton.addEventListener('click', () => {
  alert('¡Gracias por tu compra!');
  checkoutSection.classList.remove('active');
  checkoutSection.setAttribute('aria-hidden', 'true');
  cart = [];
  updateCart();
});
