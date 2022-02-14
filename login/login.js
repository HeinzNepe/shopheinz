const url = "https://api.topheinz.com/"

var firstname = "";
var lastname = "";
var user = "";
var email = "";
var phonenumber = "";
var pass = "";
var pfp = "";

if (window.location.search === "?new") // Sign up
{
    document.title = "ShopHeinz - Signup Page";
    document.querySelector("#login-page").innerHTML = `
     <h1>Signup page</h1>
        <div class="vertical" id="signup-area">
        <label>
            <input id="firstname-input" placeholder="First name">
        </label>
         <label>
            <input id="lastname-input" placeholder="Last name">
        </label>
        <label>
            <input id="user-input" placeholder="Username">
        </label>
        <label>
            <input id="email-input" placeholder="Email">
        </label>
        <label>
            <input id="number-input" placeholder="Phone number">
        </label>
        <label>
            <input id="pass-input" placeholder="Password" type="password">
        </label>
        <label>
            <input id="pass-input" placeholder="Password" type="password">
        </label>
        <button class="red-button" id="signup-button">Login</button>
    `
}
else // Log in
{
    document.querySelector("#login-page").innerHTML = ` 
    <h1>Login page</h1>
     <div class="vertical" id="login-area">
        <label>
            <input id="username-input" placeholder="Username">
        </label>
        <label>
            <input id="pass-input" placeholder="Password" type="password">
        </label>
        <button class="red-button" id="login-button">Login</button>
        <div id="login-status">
        </div>

        <div id="login-status">
        </div>
    </div>
    `
}


//  LOGIN
//  Auth thing for getting token
    $("#login-button").click(auth)

//  Gets value from the input fields
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



//  Register User

    var config = {
        method: 'post',
        url: 'https://api.topheinz.com/user/create',
        headers: {
            'firstName': firstname ,
            'lastName': lastname,
            'username': user,
            'email': email,
            'phoneNumber': phonenumber,
            'pass': pass,
            'pfp': pfp
        }
    };