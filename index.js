
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
        cart[product.id].qty ++;
    }
    else{
        cart[product.id] = {...product, qty: 1};
    }
    renderCart();
    console.log(cart);

}


function renderCart(){
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        console.error("Cart DOM elements not found");
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    Object.values(cart).forEach(item => {
        total += item.price * item.qty;
        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `<img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
            <p>${item.name}</p>
            <p>${item.price.toLocaleString()}</p>
            <div class="qty-controls">
                <button class="minus" data-id="${item.id}">-</button>
                <span>${item.qty}</span>
                <button class="plus" data-id="${item.id}">+</button>
            </div>
        </div>
        
            
        `;
        cartItems.appendChild(row);
    });
    
    cartTotal.textContent = `₦${total.toLocaleString()}`;
    addQtyListeners(); 
}


function addQtyListeners(){
    const plusBtns = document.querySelectorAll(".plus");
    const minusBtns = document.querySelectorAll(".minus");

    plusBtns.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            cart[id].qty ++;
            renderCart();
        });
    });

    minusBtns.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            cart[id].qty -= 1;
            if(cart[id].qty <= 0) delete cart[id];
            renderCart();
        });
    });

}


const products = [
    {id: 1, name: 'Glow Cleanser', price:30000, type: "cleanser", concern: "acne", image: "images/sc1.jpeg",featured: false},
    {id: 2, name: 'Hydra Serum', price:10500, type: "serum", concern: "dryness", image: "images/sc2.jpeg",featured: false},
    {id: 3, name: 'Daily Moisturizer', price:10000, type: "serum", concern: "dryness" , image: "images/sc3.jpeg",featured: false},
    {id: 4, name: 'Fepair Cream', price:200000, type: "cleanser", concern: "dryness", image: "images/sc4.jpeg",featured: false},
    {id: 5, name: 'Brightening Essence', price:5000, type: "serum", concern: "acne", image: "images/sc5.jpeg",featured: false},
    {id: 6, name: 'Toner', price:80000, type: "cleanser", concern: "acne", image: "images/sc6.jpeg",featured: false},
    {id: 7, name: 'Barrier Boost Serum', price:1000000, type: "serum", concern: "acne", image: "images/sc7.jpeg", featured: true},
    {id: 8, name: 'Vitamin C ', price:8500, type: "cleanser", concern: "acne", image: "images/sc8.jpeg",featured: false},
    {id: 9, name: 'Exfoliating Gel', price:700000, type: "cleanser", concern: "dryness", image: "images/sc9.jpeg", featured: true},
    {id: 10, name: 'Oil Control Lotion', price:8500, type: "serum", concern: "dryness", image: "images/sc10.jpeg", featured: true},
    {id: 11, name: 'Hydrating Face Mist', price:300000, type: "cleanser", concern: "acne", image: "images/sc11.jpeg",featured: false},
    {id: 12, name: 'Renewal Night Cream', price:40000, type: "cleanser", concern: "dryness", image: "images/sc12.jpeg",featured: false},
    {id: 13, name: 'Pore Mask', price:16000, type: "serum", concern: "acne", image: "images/sc13.jpeg",featured: false},
    {id: 14, name: 'Skin Cleanser', price:30000, type: "serum", concern: "acne", image: "images/sc14.jpeg",featured: false},
    {id: 15, name: 'Retinol Serum', price:57000, type: "cleanser", concern: "dryness", image: "images/sc15.jpeg",featured: false},
    {id: 16, name: 'Glow Eye Cream', price:8500, type: "cleanser", concern: "acne", image: "images/sc16.jpeg", featured: true},
    {id: 17, name: 'SPF Defense', price:36000, type: "serum", concern: "acne", image: "images/sc17.jpeg",featured: false},
    {id: 18, name: 'Sunscreen', price:8500, type: "cleanser", concern: "acne", image: "images/sc18.jpeg",featured: false},
    {id: 19, name: 'Clay Mask', price:2300, type: "serum", concern: "acne", image: "images/sc19.jpeg",featured: false},
    {id: 20, name: 'Face Oil', price:200000, type: "cleanser", concern: "acne", image: "images/sc20.jpeg", featured: true},
    
]

const filters = {
    concern: "all",
    type: "all",
    price: "all"
} 


function renderProducts(filtered){
    const container = document.getElementById("productsGrid");
    container.innerHTML = "";

    filtered.forEach(product => {
        const card = document.createElement("div");
        // card.className = "product-card";
        card.classList.add("product-card");

        if (product.featured) {
            card.classList.add("featured");
            const badge = document.createElement("span");
            badge.className = "badge";
            badge.textContent = "Featured";
            card.appendChild(badge);
        }


        card.innerHTML = `<img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₦${product.price.toLocaleString()}</p>
        <button class="add-to-cart-btn">Add to cart <i class="fa-solid fa-cart-shopping" aria-hidden="true"></button>
        `;

        if (!product.featured) {
            card.classList.remove("featured");
        }

        card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
            addToCart(product)});

        container.appendChild(card);
       
    });
}




function filterProducts(){
    const filtered = products.filter(product => {
        if(filters.concern !== "all" && product.concern !== filters.concern){
            return false;
        };
        if(filters.type !== "all" && product.type !== filters.type){
            return false;
        }
        if(filters.price !== "all"){
            if(filters.price === "low" && product.price > 10000) return false;
            if(filters.price === "mid" && (product.price <= 30000 || product.price > 100000)) return false;
            if(filters.price === "high" && product.price <= 30000) return false;

        };
        return true;
    });

    renderProducts(filtered);
}




function renderHomepageFeatured() {
  const container = document.getElementById("featuredProductsGrid");
  if (!container) return;

  const featuredIds = [7, 9, 10];

  const featuredProducts = featuredIds.map(id => products.find(p => p.id === id));

  featuredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card", "featured");

    card.innerHTML = `
      <span class="badge">Featured</span>
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₦${product.price.toLocaleString()}</p>
      <button class="add-to-cart-btn">Add to cart <i class="fa-solid fa-cart-shopping"></i></button>
    `;

    card.querySelector(".add-to-cart-btn")
        .addEventListener("click", () => addToCart(product));

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHomepageFeatured();
});





document.getElementById("filterConcern").addEventListener("change", e => {
    filters.concern = e.target.value;
    filterProducts();
});
document.getElementById("filterType").addEventListener("change", e => {
    filters.type = e.target.value;
    filterProducts();
});
document.getElementById("filterPrice").addEventListener("change", e => {
    filters.price = e.target.value;
    filterProducts();
});


// https://github.com/anitadenn/SkinCare-Brand.git


document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
});









