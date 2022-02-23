const url = "https://api.topheinz.com/"
let cart = []

cart = JSON.parse(localStorage["cart"]);


// Inputs registering fields if argument ?new is used
if (window.location.search === "?cart") // Sign up
{
    if (cart.length > 0 )
    {
        document.querySelector("#buy-page").innerHTML = `
        <section id="cart-area"><h1>Here are the products currently in your cart</h1></section>
        `


        for (const item of cart) {

            document.querySelector("#cart-area").innerHTML +=`
            <div class="cart-order horizontal space-around">
                <div>
                    <img class="sixrem-img" src="${item.product.imageUrl}">
                </div>
                <div class="phantom"></div>
                <div>
                    <h3>Name:</h3>
                    <p>${item.product.name}</p>
                </div>
                <div>
                    <h3>Description:</h3>
                    <p>${item.product.description}</p>
                </div>
                <div>
                    <h3>Quantity:</h3>
                    <input class="num-input" type="number" data-cart-index="${cart.indexOf(item)}" value="${item.quantity}"/>
                </div>
                <div>
                    <h3>Quantity:</h3>
                    <p>${item.product.price * item.quantity} kr</p>
                </div>
            </div>
            <hr>
            `
        }
    }
    else
    {
        document.querySelector("#buy-page").innerHTML = `
        <h1>Your shoppingcart appears to be empty.<br> Add to your cart and come back later!</h1>
        `
    }
}

//  When anything with the class add-cart, it gets the id of that product from the list
$(".num-input").change(e => {
    const chosen = cart[e.currentTarget.getAttribute("data-cart-index")];
    chosen.quantity = e.currentTarget.value;

    for (const item of cart) {
        if (item.product.id === chosen.product.id) {
            item.quantity = chosen.quantity;
            localStorage["cart"] = JSON.stringify(cart);
        }
    }
})