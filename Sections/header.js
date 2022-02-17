const hurl = "https://api.topheinz.com/"

token = localStorage["token"];

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
    <a href="/profile"><img id="header-pfp" src="${user.pfp}"></a>
    <a href="/profile">${user.firstName} ${user.lastName}</a>
    `

}

// Only loads if token
if(token)
{
    loadUser()
}
else {console.log("No token in localstorage!")}

