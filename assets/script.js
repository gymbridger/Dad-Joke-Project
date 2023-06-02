const jokeButton = document.querySelector(".joke-creator-button");
const jokeHolder = document.querySelector("#populate-joke");
const dadJokesURL = "http://icanhazdadjoke.com";
const chuckJokesURL = "https://api.chucknorris.io/jokes/random";
const randomButton = document.querySelector("#random");
const dadButton = document.querySelector("#dad");
const chuckButton = document.querySelector("#chuck");

jokeButton.addEventListener("click", handleClick);
const favoritesButton = document.querySelector(".emoji-button");
const favoritesList = document.querySelector(".list-group");


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
};

// Event listener for the "my-favorites" button
favoritesButton.addEventListener("click", saveJokeToFavorites);

// Function to save a joke to the "my favorites" list
function saveJokeToFavorites() {
  // Get the current joke text
  const jokeText = jokeHolder.textContent;

  // Retrieve the favorite jokes from local storage or initialize an empty array
  let favoriteJokes = JSON.parse(localStorage.getItem("jokeHolder")) || [];

  // Add to the favorite jokes list
  favoriteJokes.push(jokeText);

  // Save the updated favorite jokes list to local storage
  localStorage.setItem("jokeHolder", JSON.stringify(favoriteJokes));

  // Update the "my favorites" list in the HTML
  updateFavoritesList(favoriteJokes);
}

// Function to update the "my favorites" list in the HTML
function updateFavoritesList(jokes) {
  // Clear the current "my favorites" list
  favoritesList.innerHTML = "";

  // Add each joke to the "my favorites" list
  jokes.forEach((joke) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = joke;

    // Create a button to remove the joke
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger", "btn-sm");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeJokeFromFavorites(joke);
    });

    // Append the remove button to the list item
    listItem.appendChild(removeButton);

    // Append the list item to the "my favorites" list
    favoritesList.appendChild(listItem);
  });
}

// Function to remove a joke from the "my favorites" list
function removeJokeFromFavorites(joke) {
  // Retrieve the favorite jokes from local storage
  const favoriteJokes = JSON.parse(localStorage.getItem("jokeHolder"));

  // Remove the selected joke from the favorite jokes list
  const updatedJokes = favoriteJokes.filter((j) => j !== joke);

  // Save the updated favorite jokes list to local storage
  localStorage.setItem("jokeHolder", JSON.stringify(updatedJokes));

  // Update the "my favorites" list in the HTML
  updateFavoritesList(updatedJokes);
}

// Function to populate the "my favorites" list from local storage
function populateFavoritesListFromStorage() {
  // Retrieve the favorite jokes from local storage
  const favoriteJokes = JSON.parse(localStorage.getItem("jokeHolder"));

  // If there are favorite jokes, update the "my favorites" list in the HTML
  if (favoriteJokes) {
    updateFavoritesList(favoriteJokes);
  }
}

// Populate the "my favorites" list from local storage when the page loads
populateFavoritesListFromStorage();