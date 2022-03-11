const url = "https://api.topheinz.com/"

let token = localStorage['token']
let adresse;
let orderids = [];

// Function loads the entire profile page.
async function loadUser()
{
    // Gets user data and turns in into json
    const user = ((await axios({
        method: "get",
        url: `${url}user/user`,
        headers: {
            token: token
        }
    })).data)

    var uid = parseInt(user.id)
    localStorage["uid"] = uid;

    localStorage["user"] = JSON.stringify(user)

    // Gets recent orders from user into JSON, reverses them and grabs the address from the last order
    const orders = (await axios.get( url+`order/user?id=`+uid)).data.reverse();
    if(orders.length > 0) {
        adresse = orders[0].address.addressLine
    }
    else{
        adresse = "No orders yet"
    }





    //  Fills inn the pfp and the username
    document.querySelector("#img-div").innerHTML = `
                    <!--suppress CheckImageSize -->
                    <img class="img" alt="ProfilePicture" width="100" src="${user.pfp}">
                    <div class="column" id="name">
                        <h3>Username:</h3>
                        <p id="id-input">${user.credentials.username}</p>
                    </div>`

    // Fills in full name, last address, phonenumber and email
    document.querySelector("#bottom-area").innerHTML = `
            <div>
                <h3>Full name:</h3>
                <p id="name-input">${user.firstName} ${user.lastName}</p>
            </div>
            <div>
                <h3>Last address:</h3>
                <p id="address-input">${adresse}</p>
            </div>
            <div>
                <h3>Phone:</h3>
                <p id="nmbr-input">${user.phoneNumber}</p>
            </div>
            <div>
                <h3>E-post:</h3>
                <p id="mail-input">${user.email}</p>
            </div>`



    //filters orders so that if there are no orders, it doesnt display
    if(orders.length !== 0){


        document.querySelector("#order-section").innerHTML=`        
        <h1 class="center-text">Recent orders:</h1><hr>`


        //  Recent orders displayed at bottom
        for (const order of orders) {
            orderids.push(order.id)
            document.querySelector("#order-section").innerHTML += `
            <div class="order">
            <div>
                <h3>Ordernr:</h3>
                <p>#${order.id}</p>
            </div>
            <div class="phantom"></div>
            <div>
                <h3>Order time:</h3>
                <p>${order.orderTime.replace("T", " ").replace(/-/g, "/")}</p>
            </div>
            <div>
                <h3>Status:</h3>
                <p>${order.status}</p>
            </div>
            <div>
                <h3>Address:</h3>
                <p>${order.address.addressLine}</p>
            </div>
            <div>
                <h3>Total price:</h3>
                <p>${order.totalPrice} kr</p>
            </div>
            </div>
            <hr>
        `
        }
    }
    else
    {
        document.querySelector("#order-section").innerHTML=`        
        <h1 class="center-text">Once you've ordered from us, they'll show up here!</h1>`
    }

}



// Function to delete a user
async function deleteUser() {
    let username = window.prompt("Enter your username (NOTE this will permanently delete your user): ");

    const userjs = JSON.parse(localStorage["user"])


    // Tries given commands and catches the errors if any occur
    if(username === userjs.credentials.username)
    {
        //  Deletes all of the orders
        for (const orderid of orderids) {
            try {
                await axios({
                    method: 'delete',
                    url: url + 'order/cancel?orderId=' + parseInt(orderid),
                })
            } catch {
                console.log("Could not delete order");
            }
        }

        try {
            // Deletes the user
            await axios({
                method: 'delete',
                url: url + 'user/delete',
                data: {
                    Username:username
                }
            });

        } catch {
            console.log("Could not delete user");
        }
    }
    localStorage.clear()
    window.location.replace("/");
}

//  Logout
$("#logout-button").click(()=>{
    logout()
})

//  Delete user
$("#delete-button").click(()=>{
    deleteUser()
})



// Loads the entire page :-)
loadUser();
