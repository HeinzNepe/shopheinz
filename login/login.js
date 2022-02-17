const url = "https://api.topheinz.com/"


if (window.location.search === "?new") // Sign up
{
    document.title = "ShopHeinz - Signup Page";
    document.querySelector("#login-page").innerHTML = `
     <h1>Signup page</h1>
        <div class="vertical" id="signup-area">
        <label>
            <input class="input" id="firstname-input" placeholder="First name">
        </label>
         <label>
            <input class="input" id="lastname-input" placeholder="Last name">
        </label>
        <label>
            <input class="input" id="user-input" placeholder="Username">
        </label>
        <label>
            <input class="input" id="email-input" placeholder="Email">
        </label>
        <label>
            <input class="input" id="number-input" placeholder="Phone number">
        </label>
        <label>
            <input class="input" id="pass-input" placeholder="Password" type="password">
        </label>
        <button class="red-button" id="signup-button">Login</button>
        <div id="login-status">
        </div>
    `
}
else // Log in
{
    document.querySelector("#login-page").innerHTML = ` 
    <h1>Login page</h1>
     <div class="vertical" id="login-area">
        <label>
            <input class="input" id="username-input" placeholder="Username">
        </label>
        <label>
            <input class="input" id="password-input" placeholder="Password" type="password">
        </label>
        <button class="red-button" id="login-button">Login</button>
        <div id="login-status">
        </div>
        <br>
        <div class="horizontal center-text space-around" id="new-user">
        <p>New user? Sign up </p><a class="link" href="?new">here</a>
        </div>
    </div>
    `
}


//  LOGIN
//  Auth thing for getting token
    $("#login-button").click(auth)

//  Gets value from the input fields
    async function auth(){
        let username = document.querySelector("#username-input").value;
        let passphrase = document.querySelector("#password-input").value;

        const result = (await axios({
            method: "post",
            url: `${url}auth`,
            data: {
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
    // Login sec
    $("#username-input").keyup(e =>
    {
        if (e.keyCode === 13) $("#password-input").focus();
    });

    $("#password-input").keyup(e =>
    {
        if (e.keyCode === 13) auth()
    });



    // Signup sec
    $("#firstname-input").keyup(e =>
    {
        if (e.keyCode === 13) $("#lastname-input").focus();
    });

    $("#lastname-input").keyup(e =>
    {
        if (e.keyCode === 13) $("#user-input").focus();
    });

    $("#user-input").keyup(e =>
    {
        if (e.keyCode === 13) $("#email-input").focus();
    });

    $("#email-input").keyup(e =>
    {
        if (e.keyCode === 13) $("#number-input").focus();
    });

    $("#number-input").keyup(e =>
    {
        if (e.keyCode === 13) $("#pass-input").focus();
    });

    $("#pass-input").keyup(e =>
    {
        if (e.keyCode === 13) createUser()
    });






//  NEW USER
//  Register User
//  Auth thing for getting token
    $("#signup-button").click(createUser)

    async function createUser(){
        let firstname = document.querySelector("#firstname-input").value;
        let lastname = document.querySelector("#lastname-input").value;
        let user = document.querySelector("#user-input").value;
        let email = document.querySelector("#email-input").value;
        let phonenumber = document.querySelector("#number-input").value;
        let pass = document.querySelector("#pass-input").value;

        try {

            const createResult  = (await axios({
                method: 'post',
                url: `${url}user/create`,
                data: {
                    'firstName': firstname,
                    'lastName': lastname,
                    'username': user,
                    'email': email,
                    'phoneNumber': phonenumber,
                    'pass': pass,
                    'pfp': "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                }
            })).data;



            // Get user
            const getResult = (await axios({
                method: "post",
                url: `${url}auth`,
                data: {
                    user: user,
                    pass: pass
                }
            })).data;

            // Store success
            const success = createResult === true && getResult !== "";
            console.log(success ? "Account creation successful" : "Something went wrong");
            console.log(createResult , getResult)

            if (success)
            {
                // Store user details
                const user = ((await axios({
                    method: "get",
                    url: `${url}user/user`,
                    headers: {
                        token: getResult
                    }
                })).data)

                localStorage["uid"] = parseInt(user.id)
                localStorage["token"] = user.credentials.token

                // Redirect to front page
                window.location.replace("/");
            }

            // Unsuccessful login
            else {
                document.querySelector("#incorrect").innerHTML = "Noe gikk galt";
            }


        }
        catch {
            document.querySelector("#login-status").innerHTML = "Vennligst fyll inn alle feltene";
        }

    }