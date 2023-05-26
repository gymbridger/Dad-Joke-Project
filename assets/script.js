
const jokeButton = document.querySelector(".btn-primary");
const jokeHolder = document.querySelector(".populate-joke");

async function fetchJoke() {
    const response = await fetch("http://icanhazdadjoke.com", {
        headers: {
            Accept: "application/json",
        },
        });
    const joke = await response.json();
    console.log(joke.joke)
    jokeHolder.textContent = joke.joke;
    }

    async function handleClick() {
        await fetchJoke();

      }
      
      jokeButton.addEventListener("click", handleClick);

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

let remove = document.createElement("button")
  remove.setAttribute('id', 'delete-btn')
  remove.innerText = "remove favorite"
  remove.addEventListener("click", function(event) {
  })

  