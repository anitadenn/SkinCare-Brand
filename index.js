
const navLinks = document.querySelectorAll("nav a");
const currentPage = window.location.pathname.split("/").pop();

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");



navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if(linkPage === currentPage || (currentPage === "" && linkPage === "index.html")){
        link.classList.add("active");
    }
});


function openCart(){
    cartPanel.classList.add("open");
    cartOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeCartPanel(){
    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("show");
    document.body.style.overflow = "";
}

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);
cartOverlay.addEventListener("click", closeCartPanel)




let cart = {};

function addToCart(product){
    if (cart[product.id]){
        cart[product.id].qty += 1;
    }
    else{
        cart[product.id] = {...product, qty: 1};
    }
    renderCart();

}


function renderCart(){
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    for(let id in cart){
        const item = cart[id];
        total += item.price * item.qty;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `<span>${item.name}</span>
        <span>$${item.price.toLocaleString()}</span>
        <div class="qty-controls">
            <button class="minus" data-id="${id}">-</button>
            <span>${item.qty}</span>
            <button class="plus" data-id="${id}">+</button>
        </div>
        `;
        cartItems.appendChild(itemDiv);
    }

    cartTotal.textContent = `$${total.toLocaleString()}`;

    addQtyListeners();
}


function addQtyListeners(){
    const plusBtns = document.querySelectorAll(".plus");
    const minusBtns = document.querySelectorAll(".minus");

    plusBtns.forEach(button => {
        button.addEventListener("click", () => {
            const id = btn.dataset.id;
            cart[id].qty += 1;
            renderCart();
        });
    });

    minusBtns.forEach(button => {
        button.addEventListener("click", () => {
            const id = btn.dataset.id;
            cart[id].qty -= 1;
            if(cart[id].qty <= 0) delete cart[id];
            renderCart();
        });
    });

}


const products = [
    {id: 1, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "acne"},
    {id: 2, name: 'Glow Cleanser', price:8500, type: "serum", concern: "dryness"},
    {id: 3, name: 'Glow Cleanser', price:8500, type: "serum", concern: "dryness"},
    {id: 4, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "dryness"},
    {id: 5, name: 'Glow Cleanser', price:8500, type: "serum", concern: "acne"},
    {id: 6, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "acne"},
    {id: 7, name: 'Glow Cleanser', price:8500, type: "serum", concern: "acne"},
    {id: 8, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "acne"},
    {id: 9, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "dryness"},
    {id: 10, name: 'Glow Cleanser', price:8500, type: "serum", concern: "dryness"},
    {id: 11, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "acne"},
    {id: 12, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "dry"},
    {id: 13, name: 'Glow Cleanser', price:8500, type: "serum", concern: "acne"},
    {id: 14, name: 'Glow Cleanser', price:8500, type: "serum", concern: "acne"},
    {id: 15, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "dryness"},
    {id: 16, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "dryness"},
    {id: 17, name: 'Glow Cleanser', price:8500, type: "serum", concern: "acne"},
    {id: 18, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "acne"},
    {id: 19, name: 'Glow Cleanser', price:8500, type: "serum", concern: "acne"},
    {id: 20, name: 'Glow Cleanser', price:8500, type: "cleanser", concern: "acne"},
    
]


renderProducts();

function renderProducts(filtered){
    const container = document.getElementById("productsGrid");
    container.innerHTML = "";

    filtered.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `<h3>${product.name}</h3>
        <p>$${product.price.toLocaleString()}</p>
        <button onclick="addToCart(${JSON.stringify(product)})">Add to cart</button>
        `;
        container.appendChild(div);
    });
}

function filterProducts(){
    const skin = document.getElementById("filterConcern").Value;
    const type = document.getElementById("filterType").Value;
    const price = document.getElementById("filterPrice").Value;
}















