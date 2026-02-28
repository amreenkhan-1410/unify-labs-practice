
let allProducts = [];

async function loadProducts() {
    const res = await fetch('http://localhost:5000/api/products');
    allProducts = await res.json();
    displayProducts();
}

function displayProducts() {
    const container = document.getElementById('products');
    container.innerHTML = '';

    allProducts.forEach(p => {
        container.innerHTML += `
            <div class="product">
                <img src="${p.image}" width="150" />
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <button onclick="addToCart('${p._id}')">Add to Cart</button>
            </div>
        `;
    });
}

loadProducts();
