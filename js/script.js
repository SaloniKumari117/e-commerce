document.addEventListener("DOMContentLoaded", () => {
    // Product data
    const products = [
        { id: 1, name: "Product 1", price: 10, img:  "images/item1.png"},
        { id: 2, name: "Product 2", price: 15, img: "images/item2.png" },
        { id: 3, name: "Product 3", price: 20, img: "images/item3.png" }
    ];

    // DOM elements
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    /** Render products dynamically */
    function renderProducts() {
        productList.innerHTML = "";
        products.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("product");
            div.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(div);
        });
    }

    /** Add product to the cart */
    window.addToCart = (id) => {
        const product = products.find(p => p.id === id);
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    };

    /** Update cart UI and save to local storage */
    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const div = document.createElement("div");
            div.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity}
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="decreaseQuantity(${index})">-</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(div);
        });

        cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
        totalPrice.innerText = total.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    /** Increase item quantity */
    window.increaseQuantity = (index) => {
        cart[index].quantity++;
        updateCart();
    };

    /** Decrease item quantity */
    window.decreaseQuantity = (index) => {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
    };

    /** Remove item from cart */
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCart();
    };

    // Initial render
    renderProducts();
    updateCart();
});
