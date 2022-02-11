const hurl = "https://api.topheinz.com:5000/"

token = localStorage["token"];


async function loadUser() {
    const user = (await axios.get(hurl + `user/user?token=` + token)).data;
    document.querySelector("#header-login-sec").innerHTML = `
    <a href="/profile"><img id="header-pfp" src="${user.pfp}"></a>
    `
}



if(token)
{
    loadUser()
}
else {console.log("No token in localstorage!")}