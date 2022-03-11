/*    TABLE OF CONTENTS
   1  Setup
     1.1 Variables
     1.2 URL arguments
   2  updateCartPage
     2.1 Cart is longer than 0
     2.2 Cart is 0
     2.3 Event listeners
   3  updateCheckoutPage
     3.1 Input fields
     3.2 Dynamic user load
     3.3 Event listeners
   4  Send with API
     4.1 createAddress
     4.2 createOrder
     4.3 addProductsOrder


================================*/

// 1.1 Variables
    const url = "https://api.shop.topheinz.com/";
    token = localStorage["token"] || "";
    let cart = [];
    let totalprice = 0;
    let user = JSON.parse(localStorage["user"]);
    let error = 0;

// 1.2 URL arguments
    // Inputs registering fields if argument ?new is used
    if (window.location.search === "?cart") // Sign up
    {
        document.title = "ShopHeinz - Cart";
        updateCartPage()
    }

    if (window.location.search === "?checkout") // Sign up
    {
        document.title = "ShopHeinz - Checkout";
        updateCheckoutPage()
    }


// 2  updateCartPage
    function updateCartPage()
    {

            cart = JSON.parse(localStorage.getItem("cart"))||false;


        // 2.1 If cart longer than 0
        document.querySelector("#buy-page").innerHTML = ``
        if (cart.length > 0 )
        {
            document.querySelector("#buy-page").innerHTML = `
            <section id="cart-area"><h1>Here are the products currently in your cart</h1>
            <table id="cart-fill">
            </section>
            
    
            `
            // For every item, print HTML
            for (const item of cart) {
                document.querySelector("#cart-fill").innerHTML +=`
                <tr>
                    <td>
                        <img class="sixrem-img" src="${item.product.imageUrl}">
                    </td>
                    <td>
                        <h3>Name:</h3>
                        <p>${item.product.name}</p>
                    </td>
                    <td>
                        <h3>Description:</h3>
                        <p>${item.product.description}</p>
                    </td>
                    <td>
                        <h3>Quantity:</h3>
                        <input class="num-input " type="number" min="0" max="${item.product.stock}" data-cart-index="${cart.indexOf(item)}" value="${item.quantity}"/>
                    </td>
                    <td>
                        <h3>Cost:</h3>
                        <p id="itemCost">${(item.product.price * item.quantity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</p>
                    </td>
                </tr>
                `
            }
            // End table after loop
            document.querySelector("#cart-fill").innerHTML += `
               </table>
            `

            // Adds buttons on the back
            document.querySelector("#buy-page").innerHTML += `
            <div class="horizontal center-text width30">
                <button class="red-button width40" id="button-shopping">Continue shopping</button>
                <button class="red-button width40" id="button-checkout">Go to checkout</button>
            </div>
            `
        }
        //  2.2 If cart 0
        else
        {
            if(token.length === 0) {
                document.querySelector("#buy-page").innerHTML = `
                <h1>You are not logged in and your shoppingcart appears to be empty.<br>Log in, add to your cart and come back later!</h1>
                `
            }else
            {
                document.querySelector("#buy-page").innerHTML = `
                <h1>Your shoppingcart appears to be empty.<br>Add to your cart and come back later!</h1>
                `
            }
        }

        //  2.3 Event listeners

        $("#button-shopping").click(() => window.location.replace("/products/"))

        //  When anything with the class add-cart, it gets the id of that product from the list
        $(".num-input").change(e => {
            const chosen = cart[e.currentTarget.getAttribute("data-cart-index")];
            const index = e.currentTarget.getAttribute("data-cart-index")
            chosen.quantity = parseInt(e.currentTarget.value);
            for (const item of cart) {
                if (item.product.id === chosen.product.id) {
                    item.quantity = chosen.quantity;
                    localStorage["cart"] = JSON.stringify(cart);
                }
                if (item.quantity === 0) {
                    cart.splice(parseInt(index), 1);
                    localStorage["cart"] = JSON.stringify(cart);
                }

            }
            updateCartPage()
        })
        $("#button-checkout").click( e => {
            window.location.replace("/buy/?checkout")
        })


    }



//3  updateCheckoutPage

function updateCheckoutPage() {
    cart = JSON.parse(localStorage["cart"]);
    document.querySelector("#buy-page").innerHTML = ``
    if (cart.length > 0 )
    {

        // 3.1 Input fields
        document.querySelector("#buy-page").innerHTML = `
            <section id="cart-area"><h1>Here are the products currently in your cart</h1>
            <div class="vertical center-text" id="order-input-area">
                <label>
                    <input class="input lessmargin" id="AddressLine-input" placeholder="Address Line">
                </label>
                <label>
                    <input class="input lessmargin" id="postalnumber-input" placeholder="Postal number">
                </label>
                <label>
                    <input class="input lessmargin" id="country-input" placeholder="Country">
                </label>
                <button class="red-button width30" id="purchase-button">Purchase</button>
            </div>
            <table id="cart-fill">   
            </table>
            </section>
            `

        // 3.2 Dynamic user load
        for (const item of cart) {
            totalprice = totalprice + item.quantity * item.product.price;
            document.querySelector("#cart-fill").innerHTML +=`
                <tr>
                    <td>
                        <img class="sixrem-img" src="${item.product.imageUrl}">
                    </td>
                    <td>
                        <h3>Name:</h3>
                        <p>${item.product.name}</p>
                    </td>
                    <td>
                        <h3>Quantity:</h3>
                        <p>${item.quantity}</p>
                    </td>
                    <td>
                        <h3>Cost:</h3>
                        <p id="itemCost">${(item.product.price * item.quantity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</p>
                    </td>
                </tr>
                `
        }
        document.querySelector("#buy-page").innerHTML += `
              <h3>Total price:</h3>
              <p>${totalprice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</p>
            `
    }
    else
    {
        if(token.length === 0) {
            document.querySelector("#buy-page").innerHTML = `
                <h1>You are not logged in and your shoppingcart appears to be empty.<br>Log in, add to your cart and come back later!</h1>
                `
        }else
        {
            document.querySelector("#buy-page").innerHTML = `
                <h1>Your shoppingcart appears to be empty.<br>Add to your cart and come back later!</h1>
                `
        }
    }

// 3.3 Event Listeners
    //  When anything with the class add-cart, it gets the id of that product from the list
    $(".num-input").change(e => {
        const chosen = cart[e.currentTarget.getAttribute("data-cart-index")];
        const index = e.currentTarget.getAttribute("data-cart-index")
        chosen.quantity = parseInt(e.currentTarget.value);
        for (const item of cart) {
            if (item.product.id === chosen.product.id) {
                item.quantity = chosen.quantity;
                localStorage["cart"] = JSON.stringify(cart);
            }
            if (item.quantity === 0) {
                cart.splice(parseInt(index), 1);
                localStorage["cart"] = JSON.stringify(cart);
            }

        }
        updateCartPage()
    })

    $("#purchase-button").click(e => {
        sendOrder()
    })
}


// 4.1 createAddress
//Creates address
async function createAddress(){
    // Create address to be used in the order
    let Address = document.querySelector("#AddressLine-input").value;
    let PostalNumber = document.querySelector("#postalnumber-input").value;
    let Country = document.querySelector("#country-input").value;

    const result = (await axios({
        method: "post",
        url: `${url}order/new/address`,
        data: {
            AddressLine : Address,
            PostalNumber : parseInt(PostalNumber),
            Country : Country
        }
    })).data;

    // If result isn't empty, saves token to localstorage and redirects to main page
    if (result !== 0) {
        localStorage["aid"] = result
        console.log("Create address success")
        // noinspection JSVoidFunctionReturnValueUsed

    }
    // If nothing is returned, informs that login failed
    else {
        console.log("Create address failed!")
        error++
    }
}


// 4.2 createOrder
//Create order
async function createOrder(){
    // Create address to be used in the order
    let user = JSON.parse(localStorage["user"])
    let uid = user.id
    let Address = localStorage["aid"];

    const result = (await axios({
        method: "post",
        url: `${url}order/new/order`,
        data: {
            UserId : uid,
            AddressId : Address,
            TotalPrice : totalprice
        }
    })).data;

    // If result isn't empty, saves token to localstorage and redirects to main page
    if (result !== 0) {
        localStorage["oid"] = result
        console.log("Create order success")
        // noinspection JSVoidFunctionReturnValueUsed
    }
    // If nothing is returned, informs that login failed
    else {
        console.log("Create order failed!")
        error++;
    }
}



//  4.3 addProductsOrder
//Add product to order
async function addProductsOrder(){
    // Create address to be used in the order
    let oid = localStorage["oid"]
    let cart = JSON.parse(localStorage["cart"])

    for (const item of cart) {
        try {
            const result = (await axios({
                method: "post",
                url: `${url}order/link`,
                data: {
                    OrderId: oid,
                    ProductId: item.product.id,
                    Quantity: item.quantity
                }
            })).data;

            // If result isn't empty, saves token to localstorage and redirects to main page
            if (result === true) {
                console.log("Product " + item.product.name + " added")
                // noinspection JSVoidFunctionReturnValueUsed

            }
            // If nothing is returned, informs that login failed
            else {
                console.log("Create order failed!")
                error++;
            }
        } catch (error) {
        console.log("Failed adding " + item.product.name + " to cart")
        error++;
        }



    }
}

//Function to do it all in order
async function sendOrder(){
        await (createAddress())
        await (createOrder())
        await (addProductsOrder())

        if (error === 0) {
            console.log("Order succsessfull")
            document.querySelector("#order-input-area").innerHTML = `
            <h3>Order succsessfull</h3>
            `
            localStorage["cart"] = []
        }
        else {
            console.log("Something went wrong with your order!")
            document.querySelector("#order-input-area").innerHTML = `
            <h3>Something in your order failed!</h3>
            <p>Check your connection to the internet</p>
            `
        }

}