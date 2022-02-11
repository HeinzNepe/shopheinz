const url = "https://api.topheinz.com:5000/"



//  Auth thing for getting token
    $("#login-button").click(auth)

    async function auth(){
        username = document.querySelector("#username-input").value;
        passphrase = document.querySelector("#pass-input").value;
        const result = (await axios({
            method: "get",
            url: `${url}auth`,
            headers: {
                user: username,
                pass: passphrase
            }
        })).data;
        // If result isn't empty, saves to localstorage
        if (result !== "") {
            localStorage["token"] = result
            document.querySelector("#login-status").innerHTML=``
            console.log("Login success")
            // noinspection JSVoidFunctionReturnValueUsed
            setTimeout(window.location.replace("/"),1)

        }
        else {
            document.querySelector("#login-status").innerHTML=`
            <p>Login failed! Try again</p>`
            console.log("Login failed!")
        }
    }

// Input field listeners
$("#username-input").keyup(e =>
{
    if (e.keyCode === 13) $("#pass-input").focus();
});

$("#pass-input").keyup(e =>
{
    if (e.keyCode === 13) auth()
});