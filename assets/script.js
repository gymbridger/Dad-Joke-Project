
const jokeButton = document.querySelector(".btn-primary");
const jokeHolder = document.querySelector("#populate-joke");
const dadJokes = "http://icanhazdadjoke.com";
const chuckJokes = "https://api.chucknorris.io/jokes/random";


selectorArray= [];

async function fetchJoke() {
    const response = await fetch("http://icanhazdadjoke.com", {
        headers: {
            Accept: "application/json",
        },
        });
    const joke = await response.json();
    console.log(joke)
    jokeHolder.textContent = joke.joke;    
    
};

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

