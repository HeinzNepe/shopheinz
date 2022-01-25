
async function loadProducts()
{
    const products = (await axios.get("http://localhost:5241/products/all")).data;

    for (const product of products) {
        console.log(product)
        document.querySelector("#products-list").innerHTML += `
            <div class="card">
                <img src="${product.imageUrl}" width="192">
                <h2>${product.name}</h2>
                <p>${product.stock} på lager</p>
                <i>${product.price} kr</i>
                <a href="#">Order</a>
            </div>
        `
    }
}

loadProducts();



