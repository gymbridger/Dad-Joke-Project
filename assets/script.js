const jokeButton = document.querySelector(".joke-creator-button");
const jokeHolder = document.querySelector("#populate-joke");
const dadJokesURL = "https://icanhazdadjoke.com";
const chuckJokesURL = "https://api.chucknorris.io/jokes/random";
const randomButton = document.querySelector("#random");
const dadButton = document.querySelector("#dad");
const chuckButton = document.querySelector("#chuck");
const favoritesList = document.querySelector(".list-group");
const favoritesButton = document.querySelector(".emoji-button");

// setting blank array to manage saved joke history
var jokeHistory = [];

// listens for user click on joke button to run the API fetch
jokeButton.addEventListener("click", function () {
  handleClick.call(this);
  this.blur();
});

//start array set to 'random' configuration by default, use a choice function to determine final array to fetch jokes from
apiArray = [dadJokesURL, chuckJokesURL];

//button clicks reset array then push chosen URLs. NOTE** This method does not scale easily if more APIs are added in the future and the user wants to filter multiple APIs. **
randomButton.addEventListener("click", function () {
  apiArray = [];
  this.setAttribute("class", "btn btn-dark me-2");
  dadButton.setAttribute("class", "btn btn-light btn-outline-dark me-2");
  chuckButton.setAttribute("class", "btn btn-light btn-outline-dark me-2");
  apiArray.push(dadJokesURL, chuckJokesURL);
});

dadButton.addEventListener("click", function () {
  apiArray = [];
  this.setAttribute("class", "btn btn-dark me-2");
  randomButton.setAttribute("class", "btn btn-light btn-outline-dark me-2");
  chuckButton.setAttribute("class", "btn btn-light btn-outline-dark me-2");
  apiArray.push(dadJokesURL);
});

chuckButton.addEventListener("click", function () {
  apiArray = [];
  this.setAttribute("class", "btn btn-dark me-2");
  randomButton.setAttribute("class", "btn btn-outline-dark me-2");
  dadButton.setAttribute("class", "btn btn-outline-dark me-2");
  apiArray.push(chuckJokesURL);
});

function getAPI() {
  const randomizer = Math.floor(Math.random() * apiArray.length);
  const newAPI = apiArray[randomizer];
  return newAPI;
}

async function fetchJoke() {
  //uses whichever array is created from the buttons to provide the URLs
  var newAPI = getAPI();
  const response = await fetch(newAPI, {
    headers: {
      Accept: "application/json",
    },
  });
  const joke = await response.json();
  jokeHolder.textContent = joke.joke || joke.value;
}

async function handleClick() {
  await fetchJoke();
}

function showFavorites() {
  favoritesList.innerHTML = "";
  updateFavoritesList();
};

function updateFavoritesList() {
  // Add each joke to the "my favorites" list
  for(var i = 0; i < jokeHistory.length; i++) {
    var joke = jokeHistory[i];
    var listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.setAttribute("data-index", i);
    listItem.textContent = joke;

    // Create a button to remove the joke
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger", "btn-sm");
    removeButton.textContent = "Remove";

    // Append the remove button to the list item
    listItem.appendChild(removeButton);

    // Append the list item to the "my favorites" list
    favoritesList.prepend(listItem);
  };
};

//called at the very end of JS
function getFavorites() { 
  var myFavorites = JSON.parse(localStorage.getItem("jokeHolder"));
  if(myFavorites !== null) {
    jokeHistory = myFavorites;
  }
  //renders key values from local storage
  showFavorites();
};

// Function to save a joke to the "my favorites" list
function saveJokeToFavorites() {
  // Get the current joke text
  var jokeText = jokeHolder.textContent;

  // Check if the joke holder is empty
  if (jokeText.trim() === "") {
    return; // Exit the function if there's no joke
  }
  // Add to the favorite jokes list
  jokeHistory.push(jokeText);

  // creates a new array by checking the favorite jokes history array and filtering out exact value matches to prevent duplicate jokes from being saved
  var myFavorites = jokeHistory.filter(function(a) {
    if(!this[a]) {
        this[a] = 1; return a;
    }}, {
  });
  // calls new array
  myFavorites;

  // Save the updated, filtered favorite jokes list to local storage
  localStorage.setItem("jokeHolder", JSON.stringify(myFavorites));

};

// Event listener for the "my-favorites" button, checks stored jokes to avoid dupes, then gets the list so it has a current version without refresh, then renders
favoritesButton.addEventListener("click", function () {
  saveJokeToFavorites();
  getFavorites();
  showFavorites();
  this.blur();
});

// Event listener function checks HTML class "list group" for any button elements, targets the parent of that "remove" button and deletes it based on the index attribute set when the list element was created in the save joke function
favoritesList.addEventListener("click", function(event) {
  var remove = event.target;

  if(remove.matches("button") === true) {
    var index = remove.parentElement.getAttribute("data-index");
    jokeHistory.splice(index, 1);

    localStorage.setItem("jokeHolder", JSON.stringify(jokeHistory));
    showFavorites();
  }
});

//displays stored favorites when browser loads/refreshes
getFavorites();
