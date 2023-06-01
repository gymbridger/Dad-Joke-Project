
const jokeButton = document.querySelector(".btn-primary");
const jokeHolder = document.querySelector("#populate-joke");
const dadJokesURL = "http://icanhazdadjoke.com";
const chuckJokesURL = "https://api.chucknorris.io/jokes/random";
const randomButton = document.querySelector("#random");
const dadButton = document.querySelector("#dad");
const chuckButton = document.querySelector("#chuck");

//start array set to 'random' configuration by default, use a choice function to determine final array to fetch jokes from
apiArray = [dadJokesURL, chuckJokesURL];



//button clicks reset array then push chosen URLs. NOTE** This method does not scale easily if more APIs are added in the future and the user wants to filter multiple APIs. **
randomButton.addEventListener("click", function() {
    apiArray = []
    this.setAttribute("class", "btn btn-success me-2");
    dadButton.setAttribute("class", "btn btn-outline-success me-2");
    chuckButton.setAttribute("class", "btn btn-outline-success me-2");
    apiArray.push(dadJokesURL, chuckJokesURL);
    console.log(apiArray);
})

dadButton.addEventListener("click", function() {
    apiArray = []
    this.setAttribute("class", "btn btn-success me-2");
    randomButton.setAttribute("class", "btn btn-outline-success me-2");
    chuckButton.setAttribute("class", "btn btn-outline-success me-2");
    apiArray.push(dadJokesURL);
    console.log(apiArray);
})

chuckButton.addEventListener("click", function() {
    apiArray = []
    this.setAttribute("class", "btn btn-success me-2");
    randomButton.setAttribute("class", "btn btn-outline-success me-2");
    dadButton.setAttribute("class", "btn btn-outline-success me-2");
    apiArray.push(chuckJokesURL);
    console.log(apiArray);
})


function getAPI() {
    const randomizer = Math.floor(Math.random() * apiArray.length);
    const newAPI = apiArray[randomizer];
    console.log(newAPI)
    return newAPI;
    
};


async function fetchJoke() {

    //uses whichever array is created from the buttons to provide the URLs
    var newAPI = getAPI();

    const response = await fetch(newAPI, {
        headers: {
            Accept: "application/json",
        },
        });
    const joke = await response.json();
    console.log(joke)
    jokeHolder.textContent = joke.joke || joke.value;  
    
};

async function handleClick() {
        await fetchJoke();
}

jokeButton.addEventListener("click", handleClick);
