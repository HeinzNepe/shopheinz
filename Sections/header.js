const hurl = "https://api.topheinz.com/"

token = localStorage["token"];


async function loadUser() {
    const user = ((await axios({
        method: "get",
        url: `${hurl}user/user`,
        headers: {
            token: token
        }
    })).data)
    document.querySelector("#header-login-sec").innerHTML = `
    <a href="/profile"><img id="header-pfp" src="${user.pfp}"></a>
    <a href="/" class="center-text" id="logout-button">Logout</a>
    `
    //  Logout
    $("#logout-button").click(()=>{
        localStorage.clear()
        window.location.reload();
    })
}


if(token)
{
    loadUser()
}
else {console.log("No token in localstorage!")}

