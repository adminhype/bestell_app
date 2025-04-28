const deliveryFee = 2.00;
const serviceFee = 0.99;
let currentMode = 'delivery';

function init() {
    createHeroSection();
    renderDishes();
    renderDefaultCart();
}

function createHeroSection() {
    const heroImg = document.getElementById('hero-section');
    heroImg.innerHTML = renderHeroSection();
}

function renderDishes() {
    const dishSection = document.getElementById('dish-section');
    for (let i = 0; i < myDishes.length; i++) {
        const dish = myDishes[i];
        dishSection.innerHTML += dishTemplate(dish);
    }
}

function renderDefaultCart() {
    document.getElementById('cart-section').innerHTML = renderCartHeaderContent();
}

function selectMode(mode) {
    currentMode = mode;
    renderCart();
}

function renderCart() {
    const basket = document.getElementById('cart-section');
    basket.innerHTML = renderCartTitle();
    const subtotal = calculateSubtotal();
    let total = calculateTotal(subtotal);

    for (let i = 0; i < myDishes.length; i++) {
        const dish = myDishes[i];
        if (dish.amount > 0) {
            basket.innerHTML += renderCartDishes(dish);
        }
    }

    basket.innerHTML += renderCartTotal(subtotal, deliveryFee, serviceFee, total);
    basket.innerHTML += renderCheckoutButton();
}


function addToCart(id) {
    for (let i = 0; i < myDishes.length; i++) {
        const dish = myDishes[i];
        if (dish.id === id) {
            dish.amount += 1;
            renderCart();
        }
    }
}

function calculateTotal(subtotal) {
    if (currentMode === 'delivery') {
        return subtotal + deliveryFee + serviceFee;
    } else if (currentMode === 'pickup') {
        return subtotal;
    }
}

function calculateSubtotal() {
    let subtotal = 0;
    for (let i = 0; i < myDishes.length; i++) {
        const dish = myDishes[i];
        if (dish.amount > 0) {
            subtotal += dish.price * dish.amount;
        }
    }
    return subtotal;
}

function placeOrder() {
    for (let i = 0; i < myDishes.length; i++) {
        const dish = myDishes[i];
        myDishes[i].amount = 0;
    }
    renderCart();
    openOrderSuccessOverlay();
}

function updateCartAmount(id, action) {
    for (let i = 0; i < myDishes.length; i++) {
        const dish = myDishes[i];
        if (dish.id === id) {
            if (action === "increase") {
                dish.amount += 1;
            } else if (action === "decrease" && dish.amount > 0) {
                dish.amount -= 1;
            } else if (action === "remove") {
                dish.amount = 0;
            }
            renderCart();
            break;
        }
    }
}

function renderOverlayCart() {
    const overlayCart = document.getElementById('overlay-cart-content');
    overlayCart.innerHTML = "";
    const subtotal = calculateSubtotal();
    let total = calculateTotal(subtotal);
    for (let i = 0; i < myDishes.length; i++) {
        const dish = myDishes[i];
        if (dish.amount > 0) {
            overlayCart.innerHTML += renderCartDishes(dish);
        }
    }
}

function openBasketOverlay() {
    document.getElementById('cart-overlay').classList.remove('d-none');
    renderOverlayCart();
}

function cloveBasketOverlay() {
    document.getElementById('cart-overlay').classList.add('d-none');
}

function openOrderSuccessOverlay() {
    const overlay = document.getElementById('order-success-overlay');
    overlay.classList.remove('d-none');
    overlay.innerHTML = renderOrderSuccessOverlay();
}

function closeOrderSuccessOverlay() {
    document.getElementById('order-success-overlay').classList.add('d-none');
}