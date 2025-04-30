function renderHeroSection() {
    return `
    <div class="image-container">
        <div class="restaurant-header-img">
        <img src="./assets/img/baguette-background.png" alt="" />
        </div>
        <div class="restaurant-header-icon">
            <img src="./assets/img/baguette-logo.png">
        </div>
    </div>
    `;
}

function renderDishesTemplate(dish) {
    return `
    <div class="dish-cart" onclick="addToCart('${dish.id}')">
        <div class="dish-info">
            <h3> ${dish.name}</h3>
            <p>${dish.description}</p>
            <p>ab ${dish.price.toFixed(2)}€</p>
            </div>
            <div class="dishContainer">
            <img class="dishImg"src="${dish.src}" />
            <button id="addCartBtn">
            <img src="./assets/img/icons/plus-icon.svg" alt="Warenkorb" class="icon">
            </button>
            </div> 
    </div>`
}

function renderCartHeaderContent() {
    return `
        <h2 class="cartBasket">Warenkorb</h2>
            <div class="switchContainer">
            <button id="deliveryBtn" onclick="selectMode('delivery')">
                <img src="./assets/img/icons/bike.svg" alt="Lieferung Icon" class="icon">
                Lieferung
            </button>

            <button id="pickupBtn" onclick="selectMode('pickup')">
                <img src="./assets/img/icons/pickup.svg" alt="Abholung Icon" class="icon">
                Abholung
            </button>
            </div>
        <div id="empty-cart" class="empty-cart">
            <img src="./assets/img/icons/buy-cart.png" alt="Basket Icon">
            <h2>Fülle deinen Warenkorb</h2>
            <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.
            </div>
    `;
}

function renderCartTitle() {
    return `<h2 class="cartBasket">Warenkorb</h2>`;
}

function renderCheckoutButton() {
    return `<button onclick="placeOrder()">Bezahlen</button>`;
}

function renderCartDishes(dish) {
    return `
    <div class="cartItem" id="cart-item-${dish.id}">
        <p>${dish.name}</p>       
        <p>${(dish.price * dish.amount).toFixed(2)} €</p>       
        <p>Anzahl: ${dish.amount}</p>       
        <button onclick="updateCartAmount('${dish.id}', 'increase')">
            <img src="./assets/img/icons/plus-icon.svg" alt="erhöhen">
        </button>
        <button onclick="updateCartAmount('${dish.id}', 'decrease')">
            <img src="./assets/img/icons/minus-icon.svg" alt="verringern">
        </button>
        <button onclick="updateCartAmount('${dish.id}', 'remove')">
            <img src="./assets/img/icons/delete-icon.svg" alt="löschen">
        </button>
    </div>`;
}

function renderOverlayCartDishes(dish) {
    return `
    <div class="cartItem" id="overlay-cart-item-${dish.id}">
        <p>${dish.name}</p>       
        <p>${(dish.price * dish.amount).toFixed(2)} €</p>       
        <p>Anzahl: ${dish.amount}</p>       
        <button onclick="updateCartAmount('${dish.id}', 'increase')">
            <img src="./assets/img/icons/plus-icon.svg" alt="erhöhen">
        </button>
        <button onclick="updateCartAmount('${dish.id}', 'decrease')">
            <img src="./assets/img/icons/minus-icon.svg" alt="verringern">
        </button>
        <button onclick="updateCartAmount('${dish.id}', 'remove')">
            <img src="./assets/img/icons/delete-icon.svg" alt="löschen">
        </button>
    </div>`;
}

function renderCartTotal(subtotal, deliveryFee, serviceFee, total) {
    return `
    <div class="price-summary">
        <p>Zwischensumme: ${subtotal.toFixed(2)} €</p>
        <p>Lieferkosten: ${deliveryFee.toFixed(2)} €</p>
        <p>Servicegebühr: ${serviceFee.toFixed(2)} €</p>
        <hr>
        <p><strong>Gesamtsumme: ${total.toFixed(2)} €</strong></p>
    </div>
`;
}

function renderOrderSuccessOverlay() {
    return `
    <div class="order-success-overlay-content">
        <h2>🎉 Deine Testbestellung war erfolgreich!</h2>
        <button onclick="closeOrderSuccessOverlay()">Schließen</button>
    </div>
    `;
}