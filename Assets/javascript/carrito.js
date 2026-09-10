let cart = JSON.parse(localStorage.getItem("cart")) || [];

let toastTimer;


/* =========================
   ABRIR / CERRAR CARRITO
========================= */

function toggleCart(){

    const cartElement = document.getElementById("cart");

    if(!cartElement){
        return;
    }

    cartElement.classList.toggle("show");

    document.body.classList.toggle(
        "cart-open",
        cartElement.classList.contains("show")
    );
}


/* =========================
   TOAST
========================= */

function showToast(message){

    const element = document.getElementById("toast");

    if(!element){
        return;
    }

    element.textContent = message;

    element.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        element.classList.remove("show");

    },2200);

}


/* =========================
   AGREGAR PRODUCTO
========================= */

function addToCart(name,price){

    cart.push({
        name:name,
        price:Number(price)
    });

    saveCart();

    updateCart();

    showToast(
        name + " agregado a tu pedido ✓"
    );

    const cartElement = document.getElementById("cart");

    if(
        cartElement &&
        !cartElement.classList.contains("show")
    ){

        toggleCart();

    }

}


/* =========================
   GUARDAR
========================= */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* =========================
   ACTUALIZAR CARRITO
========================= */

function updateCart(){

    const items = document.getElementById("cart-items");

    const count = document.getElementById("cart-count");

    const total = document.getElementById("cart-total");


    if(!items){
        return;
    }


    items.innerHTML = "";

    let totalPrice = 0;


    cart.forEach((item,index) => {

        totalPrice += Number(item.price) || 0;


        items.innerHTML += `

            <div class="cart-item">

                <span>
                    ${escapeHtml(item.name)}
                </span>

                <button
                    onclick="removeFromCart(${index})"
                    aria-label="Eliminar producto"
                >
                    ×
                </button>

            </div>

        `;

    });


    if(count){

        count.textContent = cart.length;

    }


    if(total){

        total.textContent = totalPrice;

    }

}


/* =========================
   ELIMINAR PRODUCTO
========================= */

function removeFromCart(index){

    cart.splice(index,1);

    saveCart();

    updateCart();

    showToast(
        "Producto eliminado"
    );

}


/* =========================
   VACIAR CARRITO
========================= */

function clearCart(){

    if(!cart.length){

        showToast(
            "El pedido ya está vacío"
        );

        return;

    }


    cart = [];

    saveCart();

    updateCart();

    showToast(
        "Pedido vaciado"
    );

}


/* =========================
   WHATSAPP
========================= */

function sendToWhatsApp(){

    if(!cart.length){

        showToast(
            "Tu pedido está vacío"
        );

        return;

    }


    const total = cart.reduce(
        (acc,item) =>
            acc + (Number(item.price) || 0),
        0
    );


    const products = cart
        .map(
            item =>
                "- " +
                item.name +
                " (USD " +
                item.price +
                ")"
        )
        .join("\n");


    const message =
        "Hola AlwaysFull! Quiero hacer un pedido:\n\n" +
        products +
        "\n\nTotal: USD " +
        total;


    const whatsappUrl =
        "https://wa.me/5491138070685?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappUrl,
        "_blank",
        "noopener"
    );

}


/* =========================
   SEGURIDAD HTML
========================= */

function escapeHtml(value){

    return String(value)

        .replaceAll("&","&amp;")

        .replaceAll("<","&lt;")

        .replaceAll(">","&gt;")

        .replaceAll('"',"&quot;")

        .replaceAll("'","&#039;");

}


/* =========================
   MENÚ + ANIMACIONES
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCart();


        /* MENÚ */

        const toggle =
            document.getElementById(
                "menu-toggle"
            );

        const nav =
            document.getElementById(
                "nav"
            );


        if(toggle && nav){

            toggle.addEventListener(
                "click",
                () => {

                    nav.classList.toggle(
                        "open"
                    );

                    toggle.classList.toggle(
                        "open"
                    );

                }
            );


            nav
                .querySelectorAll("a")
                .forEach(link => {

                    link.addEventListener(
                        "click",
                        () => {

                            nav.classList.remove(
                                "open"
                            );

                            toggle.classList.remove(
                                "open"
                            );

                        }
                    );

                });

        }


        /* ANIMACIONES AL HACER SCROLL */

        const elements =
            document.querySelectorAll(
                ".reveal"
            );


        if("IntersectionObserver" in window){

            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if(
                                    entry.isIntersecting
                                ){

                                    entry.target.classList.add(
                                        "visible"
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold:.12
                    }
                );


            elements.forEach(
                element =>
                    observer.observe(element)
            );

        }else{

            elements.forEach(
                element =>
                    element.classList.add(
                        "visible"
                    )
            );

        }

    }
);
