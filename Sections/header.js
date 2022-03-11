const hurl = "https://api.shop.topheinz.com/"

let token = localStorage["token"] || "";
user = localStorage["user"]

// Loads user preview in the header
async function loadUser() {
    const user = ((await axios({
        method: "get",
        url: `${hurl}user/user`,
        headers: {
            token: token
        }
    })).data)
    document.querySelector("#header-login-sec").innerHTML = `
    <a href="/buy/?cart"><img src="/img/system/white_cart.png" width="32"></a>
    <a href="/profile"><img id="header-pfp" src="${user.pfp}"></a>
    <a href="/profile">${user.firstName} ${user.lastName}</a>
    `
    localStorage["user"] = JSON.stringify(user);
}

function logout() {
    localStorage.clear()
    window.location.replace("/");
}

// Only loads if token
if(token.length > 0)
{
    loadUser()
}
else {console.log("No token in localstorage!")}

