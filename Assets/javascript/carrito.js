let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart() {
    document.getElementById("cart").classList.toggle("show");
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    updateCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <button onclick="removeFromCart(${index})">x</button>
            </div>`;
    });

    cartCount.innerText = cart.length;
    cartTotal.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function sendToWhatsApp() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let message = "Hola! Quiero hacer un pedido:%0A";
    cart.forEach(item => {
        message += `- ${item.name} (USD ${item.price})%0A`;
    });

    let total = cart.reduce((acc, item) => acc + item.price, 0);
    message += `%0ATotal: USD ${total}`;

    window.open(`https://wa.me/5491138070685?text=${message}`, "_blank");
}

document.addEventListener("DOMContentLoaded", updateCart);
