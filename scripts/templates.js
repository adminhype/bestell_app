function dishTemplate(dish) {
    return `
    
    <div class="dishCart">
        <div class="dishInfo">
            <h3>Gerichtname${dish.name}</h3>
            <p>Beschreibung${dish.description}</p>
            <p>Preis${dish.price}</p>
            </div>
            <div class="dishContainer">
            <img class="dishImg"src="${dish.src}" />
            <button onclick="addToCart('${dish.id}')">+</button>
            </div> 

    </div>`
}
function renderCartHeaderContent() {
    return `
        <h2>Warenkorb</h2>
        <div class="switch-container">
            <button onclick="selectDelivery()">Lieferung</button>
            <button onclick="selectPickup()">Abholung</button>
            </div>
        <div id="empty-cart" class="empty-cart">
            <img src="./assets/img/icons/basket-icon.svg" alt="Basket Icon">
            <p>Fülle deinen Warenkorb</p>
            </div>

    `;
}
function renderCartDishes(dish) {
    return `
    <div class="cartItem">
    <p>${dish.name}</p>       
    <p>${(dish.price * dish.amount).toFixed(2)} €
</p >       
    <p>${dish.amount}</p>       
    <button onclick="updateCartAmount('${dish.id}', 'increase')">
                <img src="./assets/img/icons/+Icon.svg" alt="erhöhen">
                </button>
                <button onclick="updateCartAmount('${dish.id}','decrease')">
                    <img src="./assets/img/icons/-Icon.svg" alt="veringern">
                </button>
                <button onclick="updateCartAmount('${dish.id}', 'remove')">
                    <img src="./assets/img/icons/delete-icon.svg" alt="löschen">
                </button>
        </div >
    `
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
