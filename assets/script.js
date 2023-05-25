const jokeButton = document.querySelector(".getJoke");
const jokeHolder = document.querySelector(".joke");

async function fetchJoke() {
    const response = await fetch("http://icanhazdadjoke.com", {
        headers: {
            Accept: "application/json",
        },
        });
    const joke = await response.json();
    console.log(joke);
}
    
fetchJoke();