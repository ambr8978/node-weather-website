console.log("Client side js")

// Fetching weather data from our weather node endpoint


const weatherForm = document.querySelector("form")
const searchInput = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = searchInput.value;

    message1.textContent = "Loading...";
    message2.textContent = "";

    const locationSearchUrl = getLocationSearchUrl(location);
    fetch(locationSearchUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        })
    })
})

const getLocationSearchUrl = (locationSearchInput) => {
    return ("/weather?address=" + locationSearchInput);
}