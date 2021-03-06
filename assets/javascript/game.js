	// Out of guesses messages
	var noMoreGuesses = document.createElement("p");
	var noMoreGuessesText = document.createTextNode("No more lives! Refresh the page to start over!");
	noMoreGuesses.setAttribute("class","text-white bg-danger border border-dark rounded p-2");
	noMoreGuesses.appendChild(noMoreGuessesText);
	
	// Button to be used to advance to next city after player has guess city correctly
	var nextCityButton = document.createElement("button"); // Create a <button> element
	var nextCitybuttonClicked = false;
	var nextCityButtonText = document.createTextNode("Next City!"); // Create a text node
	nextCityButton.setAttribute("type","button");
	nextCityButton.setAttribute("class","btn btn-success d-block mx-auto border border-dark"); // Set class using bootstrap
	nextCityButton.setAttribute("id","nextCityButtonID"); // Set id
	nextCityButton.appendChild(nextCityButtonText); // Append the text to <button>

	// Instuctional message to appear with 'Next City' button 
	var nextCityMessage1 = document.createElement("p");
	var nextCityMessage2 = document.createElement("p");
	var nextCityMessageText1 = document.createTextNode("First click the 'Next City!' button");
	var nextCityMessageText2 = document.createTextNode("Then press any key to continue playing");
	nextCityMessage1.setAttribute("class","text-center font-italic bg-light border border-dark rounded")
	nextCityMessage2.setAttribute("class","text-center font-italic bg-light border border-dark rounded")
	nextCityMessage1.appendChild(nextCityMessageText1);
	nextCityMessage2.appendChild(nextCityMessageText2);

	// Button function to determine if 'Next City' button has been clicked
	function nextCityButtonFunction() {
	nextCitybuttonClicked = true;
	return nextCitybuttonClicked;
}
	
	//hangMan Object createded to store values and arrays used throughout the game
	var hangMan = {
	iterations: 0,
	firstKeyPressed: false,
	cityGuessed: false,
	playerLives: 15,
	wins: 0,
	currentCity: "",
	citiesChoicesArray: ["Amsterdam", "Athens", "Tokyo", "Bejing", "Buenos Aires", "Barcelona", "Copenhagen", "Dublin",
		"Madrid", "Shanghai", "Hong Kong", "Rome", "Istanbul", "Seoul", "Mumbai", "Mexico City", "Munich", "London", "Paris", "Perth",
		"Prague", "Berlin", "New York", "Los Angeles", "Rio de Janeiro", "San Diego", "San Francisco", "Santiago", "Stockholm",
		"Sydney", "Vancouver", "Toronto", "Montreal"
	],
	lettersGuessedCorrect: [],
	lettersGuessedArray: [],
	indices: [],
	selectRandomCity: function () {
		currentCity = hangMan.citiesChoicesArray[Math.floor(Math.random() * hangMan.citiesChoicesArray.length)];
		hangMan.currentCity = currentCity;
		return currentCity;
	},

	updateCurrentCityHTML: function (currentCity, currentCityText) {
		for (var i = 0; i < currentCity.length; i++) {

			if (currentCity.charAt(i) !== " ") {
				console.log("Theres no space at: " + i);
				// currentCityText.textContent = currentCity;
				hangMan.lettersGuessedCorrect.push("_ ");
				// console.log("counter: " + i + "" + hangMan.lettersGuessedCorrect);
				currentCityText.textContent = hangMan.lettersGuessedCorrect.join("");
				console.log(hangMan.lettersGuessedCorrect.join(""));
			} else if (currentCity.charAt(i) == " ") {
				console.log("Theres a space at: " + i);
				// currentCityText.textContent = currentCity;
				hangMan.lettersGuessedCorrect.push(" ");
				// console.log("counter: " + i + "" + hangMan.lettersGuessedCorrect);
				currentCityText.textContent = hangMan.lettersGuessedCorrect.join("");
			}
		}
		return currentCityText.textContent;
	},

	isLetter: function (charc) {
		return charc.toLowerCase() != charc.toUpperCase();
	},

	decreaseLives: function (documentText) {
		hangMan.playerLives--;
		return documentText.textContent = "Guesses left: " + hangMan.playerLives
	},

	increaseWins: function (documentText) {
		hangMan.wins++;
		return documentText.textContent = "Wins: " + hangMan.wins
	}
}

	document.onkeyup = function (event) {
	var userGuess = event.key; // Responsible for picking up key pressed
	var messageNode = document.getElementById("messages"); // Parent element. Used to delete Next City button and corresponding message

	// HTML elements to be manipulated
	var directionsText = document.getElementById("initialInstructions");
	var gameScreenText = document.getElementById("gameScreen");
	var currentCityText = document.getElementById("currentCity");
	var lettersGuessedText = document.getElementById("lettersGuessed");
	var playerLivesText = document.getElementById("guessesLeft");
	var winsText = document.getElementById("wins");

	if (!hangMan.firstKeyPressed && hangMan.iterations == 0) {

		hangMan.firstKeyPressed = true; // First key has been clicked

		hangMan.cityGuessed = false; // City has not been guessed


		// Should only happen once to clear instructions first seen
		// Clears the 'Press and key to get started!' Instructions
		if ((userGuess !== null)) {
			
			// Get rid of initial instructions for the game
			directionsText.textContent = "";
			document.getElementById("jumbotron").removeChild(document.getElementById("thematicBreak")); // Get rid of thematic break 

			// Provides random city from citiesChoicesArray
			console.log(hangMan.selectRandomCity());
			console.log("Length of current City: " + hangMan.currentCity.length);

			// Provide '_' or ' ' for city selected above
			console.log(hangMan.updateCurrentCityHTML(hangMan.currentCity, currentCityText));
		}
	}

	hangMan.iterations++;
	console.log("Number of iterations " + hangMan.iterations);
	console.log("Has the current city been guessed? " + hangMan.cityGuessed);

	if (hangMan.firstKeyPressed && hangMan.iterations >= 2 && !hangMan.cityGuessed) {
		// Responsible for updating Letters Guessed array with unique values
		if (hangMan.isLetter(userGuess)) {

			// Responsible for decreasing Guesses Left
			// Checks the letter guessed both in lower case and upper case
			// MAKE INTO METHOD OF HANGMAN???
			if (!hangMan.currentCity.includes(userGuess) && !hangMan.currentCity.includes(userGuess.toUpperCase())) {
				if (!hangMan.lettersGuessedArray.includes(userGuess)) {
					hangMan.decreaseLives(playerLivesText);
					hangMan.lettersGuessedArray.push(userGuess);
					lettersGuessedText.textContent = hangMan.lettersGuessedArray;
					
					if(hangMan.playerLives <= 0) {
						document.getElementById("outOfLives").appendChild(noMoreGuesses)
					}
				}

			} else if (hangMan.currentCity.includes(userGuess) || hangMan.currentCity.includes(userGuess.toUpperCase())) {

				// Uncover letters guessed correctly
				for (var i = 0; i < hangMan.currentCity.length; i++) {
					if (hangMan.currentCity.charAt(i) == userGuess && !hangMan.indices.includes(i)) {
						console.log(userGuess + " is at the following index " + i);
						hangMan.indices.push(i);
						hangMan.lettersGuessedCorrect.splice(i, 1, userGuess);
					} else if (hangMan.currentCity.charAt(i) == userGuess.toUpperCase() && !hangMan.indices.includes(i)) {
						console.log(userGuess.toUpperCase() + " is at the following index " + i);
						hangMan.indices.push(i);
						hangMan.lettersGuessedCorrect.splice(i, 1, userGuess.toUpperCase());
					} else if (hangMan.currentCity.charAt(i) == " " && !hangMan.indices.includes(i)) {
						console.log("space is at the following index " + i)
						hangMan.indices.push(i)
						hangMan.lettersGuessedCorrect.splice(i, 1, " ");
					}
				}
				// Display latest letters on Current City
				currentCityText.textContent = hangMan.lettersGuessedCorrect.join("");

				// Update Wins
				if (!hangMan.lettersGuessedCorrect.includes("_ ")) {
					console.log("Congrats you got the city!");
					hangMan.increaseWins(winsText);
					hangMan.cityGuessed = true;

					// Removes city from citiesChoicesArray
					for (var i = 0; i < hangMan.citiesChoicesArray.length; i++) {
						if (hangMan.citiesChoicesArray[i] == hangMan.currentCity) {
							hangMan.citiesChoicesArray.splice(i, 1);
						}
					}
					console.log("The player has guessed the following city: "+hangMan.cityGuessed);
					document.getElementById("messages").appendChild(nextCityMessage1); // Append button message to HTML DOC
					document.getElementById("messages").appendChild(nextCityMessage2); // Append button message to HTML DOC
					document.getElementById("messages").appendChild(nextCityButton); // Append button to HTML DOC
					document.getElementById("nextCityButtonID").addEventListener("click", nextCityButtonFunction); // Next city button function onclick
				}
			}
		}
	}else if (hangMan.cityGuessed && !nextCitybuttonClicked){
		console.log("Player has not clicked 'Next City' button");
		alert("First click the green 'Next City' button and then press any key to play the next round!");
		
	} else if (hangMan.cityGuessed && nextCitybuttonClicked) {
		hangMan.cityGuessed = false;
		nextCitybuttonClicked = false;
		hangMan.lettersGuessedCorrect.splice(0, hangMan.lettersGuessedCorrect.length);
		hangMan.lettersGuessedArray.splice(0, hangMan.lettersGuessedArray.length);
		hangMan.indices.splice(0, hangMan.indices.length);

		hangMan.selectRandomCity();
		console.log(hangMan.currentCity);
		console.log(hangMan.updateCurrentCityHTML(hangMan.currentCity, currentCityText));
		messageNode.removeChild(nextCityButton);
		messageNode.removeChild(nextCityMessage1);
		messageNode.removeChild(nextCityMessage2);
	}

}

