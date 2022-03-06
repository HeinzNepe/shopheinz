/*    TABLE OF CONTENTS
   1  Setup
     1.1 Variables
     1.2 URL arguments
   2  updateCartPage
     2.1 Utility classes
     2.2 Header
     2.3 Flex for content
   3  Site content
     3.1 Index
     3.2 Products
     3.3 About us
     3.4 Log in
     3.5 Buy
   4  Profile related


================================*/

// 1.1 Variables
    const url = "https://api.topheinz.com/"
    let cart = []

// 1.2 URL arguments
    // Inputs registering fields if argument ?new is used
    if (window.location.search === "?cart") // Sign up
    {
        updateCartPage()
    }

    if (window.location.search === "?checkout") // Sign up
    {
        updateCheckoutPage()
    }


// 2  updateCartPage
    function updateCartPage()
    {
        cart = JSON.parse(localStorage["cart"]);
        document.querySelector("#buy-page").innerHTML = ``
        if (cart.length > 0 )
        {
            document.querySelector("#buy-page").innerHTML = `
            <section id="cart-area"><h1>Here are the products currently in your cart</h1>
            <table id="cart-fill">
            </section>
            
    
            `

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
            document.querySelector("#cart-fill").innerHTML += `
               </table>
            `
            document.querySelector("#buy-page").innerHTML += `
            <div class="horizontal center-text width30">
                <button class="red-button width40" id="button-shopping">Continue shopping</button>
                <button class="red-button width40" id="button-checkout">Go to checkout</button>
            </div>
            `
        }
        else
        {
            document.querySelector("#buy-page").innerHTML = `
            <h1>Your shoppingcart appears to be empty.<br> Add to your cart and come back later!</h1>
            `
        }

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

    }




function updateCheckoutPage() {
    cart = JSON.parse(localStorage["cart"]);
    document.querySelector("#buy-page").innerHTML = ``
    if (cart.length > 0 )
    {
        document.querySelector("#buy-page").innerHTML += `
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
                    <h3>Cost:</h3>
                    <p id="itemCost">${(item.product.price * item.quantity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kr</p>
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