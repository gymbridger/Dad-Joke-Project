// chuck fetch code with button
var joke = document.getElementById("populate-joke");
var button = document.getElementById("joke-button");

function getChuck() {

    var requestURL = "https://api.chucknorris.io/jokes/random";

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (chuckJoke) {
            console.log(chuckJoke.value);
            joke.textContent = chuckJoke.value
        })
};


button.addEventListener("click", getChuck);