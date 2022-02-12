const url = "https://api.topheinz.com:5000/"

let token = localStorage['token']


async function loadUser()
{
    const user = (await axios.get(url+`user/user?token=`+token)).data;

    var uid = parseInt(user.id)
    localStorage["uid"] = uid;

    document.querySelector("#img-div").innerHTML = `
                <!--suppress CheckImageSize -->
                <img class="img" alt="ProfilePicture" width="100" src="${user.pfp}">
                <div class="column" id="name">
                    <h3>Username:</h3>
                    <p id="id-input">${user.credentials.username}</p>
                </div>`

    document.querySelector("#bottom-area").innerHTML = `
        <div>
            <h3>Full name:</h3>
            <p id="name-input">${user.firstName} ${user.lastName}</p>
        </div>
        <div>
            <h3>Adress:</h3>
            <p id="address-input">Coming soon</p>
        </div>
        <div>
            <h3>Phone:</h3>
            <p id="nmbr-input">${user.phoneNumber}</p>
        </div>
        <div>
            <h3>E-post:</h3>
            <p id="mail-input">${user.email}</p>
        </div>`

    const orders = (await axios.get( url+`order/user?id=`+uid)).data;

    for (const order of orders) {
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


loadUser();






