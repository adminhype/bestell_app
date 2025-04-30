const deliveryFee = 2.00;
const serviceFee = 0.99;
let currentMode = 'delivery';
//#region initialisieren
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
        dishSection.innerHTML += renderDishesTemplate(dish);
    }
}
function renderDefaultCart() {
    document.getElementById('cart-section').innerHTML = renderCartHeaderContent();
}
//#endregion initialsieren
//#region rendern
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
    basket.innerHTML += `
    <div id="cart-summary">${renderCartTotal(subtotal, deliveryFee, serviceFee, total)}</div>
    <div id="checkout-button">${renderCheckoutButton()}</div>`;
}
function renderOverlayCart() {
    const overlayCart = document.getElementById('overlay-cart-content');
    overlayCart.innerHTML = "";
    const subtotal = calculateSubtotal();
    let total = calculateTotal(subtotal);
    for (let i = 0; i < myDishes.length; i++) {
        const dish = myDishes[i];
        if (dish.amount > 0) {
            overlayCart.innerHTML += renderOverlayCartDishes(dish);
        }
    }
    overlayCart.innerHTML += `
    <div id="overlay-summary">${renderCartTotal(subtotal, deliveryFee, serviceFee, total)}</div>
    <div id="overlay-checkout">${renderCheckoutButton()}</div>
`;
}
//#endregion rendern
//#region update-logik
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
            updateCartItemById(id);
            updateOverlayItemById(id);
            break;
        }
    }
}
function updateCartItemById(id) {
    const dish = myDishes.find(d => d.id === id);
    const item = document.getElementById(`cart-item-${id}`);
    const basket = document.getElementById('cart-section');
    const summary = document.querySelector('.price-summary');
    if (dish.amount > 0) {
        const html = renderCartDishes(dish);
        if (item) {
            item.outerHTML = html;
        } else if (summary) {
            summary.insertAdjacentHTML('beforebegin', html);
        } else {
            basket.insertAdjacentHTML('beforeend', html);
        }
    } else if (item) { item.remove(); }
    updateCartSummary();
}
function updateOverlayItemById(id) {
    const dish = myDishes.find(d => d.id === id);
    const item = document.getElementById(`overlay-cart-item-${id}`);
    const overlay = document.getElementById('overlay-cart-content');
    const summary = document.getElementById('overlay-summary');

    if (dish.amount > 0) {
        const html = renderOverlayCartDishes(dish);
        if (item) {
            item.outerHTML = html;
        } else if (summary) {
            summary.insertAdjacentHTML('beforebegin', html);
        } else {
            overlay.insertAdjacentHTML('beforeend', html);
        }
    } else if (item) {
        item.remove();
    }

    updateOverlaySummary();
}
function updateCartSummary() {
    const subtotal = calculateSubtotal();
    const total = calculateTotal(subtotal);
    const summary = document.getElementById('cart-summary');
    if (summary) {
        summary.innerHTML = renderCartTotal(subtotal, deliveryFee, serviceFee, total);
    }
}
function updateOverlaySummary() {
    const subtotal = calculateSubtotal();
    const total = calculateTotal(subtotal);
    const summary = document.getElementById('overlay-summary');

    if (summary) {
        summary.innerHTML = renderCartTotal(subtotal, deliveryFee, serviceFee, total);
    }
}
//#endregion update-logik
//#region hilfs-funktionen
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
//#endregion
//#region interaktion
function selectMode(mode) {
    currentMode = mode;
    renderCart();
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
function placeOrder() {
    for (let i = 0; i < myDishes.length; i++) {
        const dish = myDishes[i];
        myDishes[i].amount = 0;
    }
    renderCart();
    closeBasketOverlay();
    openOrderSuccessOverlay();
}
function openBasketOverlay() {
    document.getElementById('cart-overlay').classList.remove('d-none');
    renderOverlayCart();
}
function closeBasketOverlay() {
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
//#endregion interaktion





