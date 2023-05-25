// chuck fetch code with button
var joke = document.getElementById("chuck");
var button = document.getElementById("button");

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
}



button.addEventListener("click", getChuck);