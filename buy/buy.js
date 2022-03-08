/*    TABLE OF CONTENTS
   1  Setup
     1.1 Variables
     1.2 URL arguments
   2  updateCartPage
     2.1 Cart is longer than 0
     2.2 Cart is 0
     2.3 Event listeners
   3
     3.1
     3.2
     3.3
   4


================================*/

// 1.1 Variables
    const url = "https://api.topheinz.com/"
    let cart = []
    let totalprice

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
        // 2.1 If cart longer than 0
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

        //  2.2 If cart 0
        else
        {
            document.querySelector("#buy-page").innerHTML = `
            <h1>Your shoppingcart appears to be empty.<br> Add to your cart and come back later!</h1>
            `
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




function updateCheckoutPage() {
    cart = JSON.parse(localStorage["cart"]);
    document.querySelector("#buy-page").innerHTML = ``
    if (cart.length > 0 )
    {

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
            <table id="cart-fill"></table>
            </section>
            `


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
                        <h3>Description:</h3>
                        <p>${item.product.description}</p>
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
              <p>${totalprice}</p>
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