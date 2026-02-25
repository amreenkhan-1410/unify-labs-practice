let products = [];

function addProduct() {
    let name = document.getElementById("name").value;
    let category = document.getElementById("category").value;
    let price = parseFloat(document.getElementById("price").value);
    let stock = parseInt(document.getElementById("stock").value);

    if (!name || isNaN(price) || isNaN(stock)) {
        alert("Fill all fields properly");
        return;
    }

    products.push({
        name,
        category,
        price,
        stock,
        featured: false
    });

    showAll();
}

// MASS UPDATE 1: Increase Electronics price by 10
function increaseElectronics() {
    products.forEach(p => {
        if (p.category === "Electronics") {
            p.price += 10;
        }
    });
    showAll();
}

// MASS UPDATE 2: Set featured true if price > 500
function setFeatured() {
    products.forEach(p => {
        if (p.price > 500) {
            p.featured = true;
        }
    });
    showAll();
}

// CLEANUP: Delete products where stock = 0
function deleteOutOfStock() {
    products = products.filter(p => p.stock !== 0);
    showAll();
}

// COUNT DOCUMENTS
function countProducts() {
    document.getElementById("countDisplay").innerText =
        "Total Products: " + products.length;
}

// DISPLAY
function showAll() {
    let output = document.getElementById("output");
    output.innerHTML = "";

    products.forEach(p => {
        output.innerHTML += `
            <div class="product">
                <h3>${p.name}</h3>
                <p>Category: ${p.category}</p>
                <p>Price: ₹${p.price}</p>
                <p>Stock: ${p.stock}</p>
                <p>Featured: ${p.featured}</p>
            </div>
        `;
    });
}