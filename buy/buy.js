const url = "https://api.topheinz.com/"

// Inputs registering fields if argument ?new is used
if (window.location.search === "?cart") // Sign up
{
    document.querySelector("#buy-page").innerHTML = `
    <section id="cart-area"></section>
    `
}