let products = [];

function addProduct() {

    let name = document.getElementById("name").value;
    let category = document.getElementById("category").value;
    let price = Number(document.getElementById("price").value);
    let stock = Number(document.getElementById("stock").value);

    if(name === "" || price === 0 || stock === "") {
        alert("Please fill all fields");
        return;
    }

    let product = {
        name,
        category,
        price,
        stock,
        featured: false
    };

    products.push(product);

    showProducts();
}

function increaseElectronicsPrice() {

    products.forEach(product => {

        if(product.category === "Electronics") {

            product.price += 10;

        }

    });

    showProducts();
}

function setFeatured() {

    products.forEach(product => {

        if(product.price > 500) {

            product.featured = true;

        }

    });

    showProducts();
}

function deleteOutOfStock() {

    products = products.filter(product => product.stock !== 0);

    showProducts();

}

function countProducts() {

    document.getElementById("count").innerText =
        "Total Products: " + products.length;

}

function showProducts() {

    let list = document.getElementById("productList");

    list.innerHTML = "";

    products.forEach(product => {

        list.innerHTML += `
        
        <div class="product">

            <h3>${product.name}</h3>

            <p>Category: ${product.category}</p>

            <p>Price: ₹${product.price}</p>

            <p>Stock: ${product.stock}</p>

            <p>Featured: ${product.featured}</p>

        </div>
        
        `;

    });

}