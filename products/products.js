const url = "https://api.topheinz.com/"
let products

async function fetchProducts()
{
    products = (await axios.get(url+`products/all`)).data;
}

function filterProducts()
{
    let prodFiltered = products.filter(p => p.name.toLowerCase().includes(document.querySelector("#search").value))

    document.querySelector("#products-list").innerHTML = ''

    for (const product of prodFiltered) {
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

fetchProducts().then(() => filterProducts());


$("#search").keyup(() => {
    filterProducts();
})




