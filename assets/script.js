
const jokeButton = document.querySelector(".btn-primary");
const jokeHolder = document.querySelector("#populate-joke");
const dadJokes = "http://icanhazdadjoke.com";
const chuckJokes = "https://api.chucknorris.io/jokes/random";
var dadButton = document.querySelector("#dadButton")
var chuckButton = document.querySelector("#chuckButton")

selectorArray= [];

async function fetchJoke() {
    const response = await fetch("http://icanhazdadjoke.com", {
        headers: {
            Accept: "application/json",
        },
        });
    const joke = await response.json();
    jokeHolder.textContent = joke.joke;    
    
};
async function fetchJoke2() {
    const response = await fetch("https://api.chucknorris.io/jokes/random", {
        headers: {
            Accept: "application/json",
        },
        });
    const joke = await response.json();
    jokeHolder.textContent = joke.joke; 
    };

if (dadButton = )
async function handleClick() {
    await fetchJoke();
};

jokeButton.addEventListener("click", handleClick);







    

// function getChuck() {

//     var requestURL = chuckJokes;

//     fetch(requestURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (chuckJoke) {
//             console.log(chuckJoke.value);
//             jokeHolder.textContent = chuckJoke.value
//         })
// };



// jokeButton.addEventListener("click", getChuck);

let remove = document.createElement("button")
  remove.setAttribute('id', 'delete-btn')
  remove.innerText = "remove favorite"
  remove.addEventListener("click", function(event) {
  })

  