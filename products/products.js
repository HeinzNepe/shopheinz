const url = "https://api.topheinz.com/"
let products
let cart = []

// Fetches products, puts in list
async function fetchProducts()
{
    products = (await axios.get(url+`products/all`)).data;
}

// Takes fetched products and filters according to search field. Then adds card in product listing
function filterProducts()
{
    let prodFiltered = products.filter(p => p.name.toLowerCase().includes(document.querySelector("#search").value))

    document.querySelector("#products-list").innerHTML = ''

    for (const product of prodFiltered) {
        document.querySelector("#products-list").innerHTML += `
            <div class="card rounded">
                <img class="rounded" src="${product.imageUrl}" width="192" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.stock} på lager</p>
                <p><i>${product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</i></p>
                <button class="bordered-button add-cart" data-product-index="${products.indexOf(product)}">Add to cart</button>
            </div>
        `
    }


    //  When anything with the class add-cart, it gets the id of that product from the list
    $(".add-cart").click(e => {
        if (localStorage["token"]) {
            const chosen = products[e.currentTarget.getAttribute("data-product-index")];
            let saved = false;

            //  Adds product based on chosen.id, increases the quantity. Then sets saved to true
            for (const product of cart) {
                if (product.product.id === chosen.id) {
                    product.quantity++;
                    saved = true;
                }
            }
            //  If product isn't saved, will add product to array and set quantity to 1
            if (!saved) {
                cart.push({
                    product: chosen,
                    quantity: 1
                });
            }
            localStorage["cart"] = JSON.stringify(cart);
        } else {
            alert("You need to be logged in to add things to cart!")
        }
    })
}

fetchProducts().then(() => filterProducts());


$("#search").keyup(() => {
    filterProducts();
})












