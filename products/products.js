
async function loadProducts()
{
    const products = (await axios.get("htts://api.topheinz.com:5000/products/all")).data;

    for (const product of products) {
        console.log(product)
        document.querySelector("#products-list").innerHTML += `
            <div class="card rounded">
                <img class="rounded" src="${product.imageUrl}" width="192" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.stock} på lager</p>
                <div class="horizontal">
                    <p><i>${product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</i></p>
                    <a href="#">Order</a>
                </div>
            </div>
        `
    }
}

loadProducts();



