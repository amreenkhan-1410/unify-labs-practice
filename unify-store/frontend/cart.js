
let cart = JSON.parse(localStorage.getItem('unify_cart')) || [];

function addToCart(productId) {
    const product = allProducts.find(p => p._id === productId);

    const existing = cart.find(item => item._id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('unify_cart', JSON.stringify(cart));
    alert("Added to cart!");
}
