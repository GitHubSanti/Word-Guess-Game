	var hangMan = {
	iterations: 0,
	firstKeyPressed: false,
	cityGuessed: true,
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

	// Button to be used to advance to next city
	var nextCityButton = document.createElement("button"); // Create a <button> element
	var nextCityButtonText = document.createTextNode("Next City!"); // Create a text node
	nextCityButton.setAttribute("type","button");
	nextCityButton.setAttribute("class","btn btn-success d-block mx-auto"); // Set class using bootstrap
	nextCityButton.setAttribute("id","nextCityButtonID"); // Set id
	nextCityButton.appendChild(nextCityButtonText); // Append the text to <button>

nextCityButton.onclick = function nextCityButtonFunction() {
	hangMan.lettersGuessedCorrect.splice(0, hangMan.lettersGuessedCorrect.length);
	hangMan.lettersGuessedArray.splice(0, hangMan.lettersGuessedArray.length);
	hangMan.indices.splice(0, hangMan.indices.length);

	hangMan.selectRandomCity();
	console.log(hangMan.currentCity);
}

document.onkeyup = function (event) {
	console.log(hangMan.cityGuessed);
	// Responsible for picking up key pressed
	var userGuess = event.key;

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
			// Start to initialize the rest of webpage
			// WILL CONTINUE TO DEVELOP
			directionsText.textContent = "";

			// Provides random city from citiesChoicesArray
			console.log(hangMan.selectRandomCity());
			console.log("Length of current City: " + hangMan.currentCity.length);

			// Provide '_' or ' ' for city selected above
			console.log(hangMan.updateCurrentCityHTML(hangMan.currentCity, currentCityText));
		}
	}

	if (hangMan.cityGuessed && hangMan.iterations > 0) {
		console.log("This would be the next word played");

		// Clearing Arrays from previous round. Potential Method??
		hangMan.lettersGuessedCorrect.splice(0, hangMan.lettersGuessedCorrect.length);
		hangMan.lettersGuessedArray.splice(0, hangMan.lettersGuessedArray.length);
		hangMan.indices.splice(0, hangMan.indices.length);

		console.log(hangMan.selectRandomCity());
		console.log("Length of current City: " + hangMan.currentCity.length);

		// Provide '_' or ' ' for city selected above
		console.log(hangMan.updateCurrentCityHTML(hangMan.currentCity, currentCityText));
		hangMan.cityGuessed = false;
	}


	hangMan.iterations++;
	console.log("Number of iterations " + hangMan.iterations);
	console.log("Has the current city been guessed? " + hangMan.cityGuessed);

	if (hangMan.firstKeyPressed && hangMan.iterations >= 2 && !hangMan.cityGuessed) {
		// Responsible for providing city

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
				}

			} else if (hangMan.currentCity.includes(userGuess) || hangMan.currentCity.includes(userGuess.toUpperCase())) {
				// console.log("The letter that did pass was: "+userGuess);

				// CODE TO START UNCOVERING letters
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

					// Removes city from citiesChoicesArray
					for (var i = 0; i < hangMan.citiesChoicesArray.length; i++) {
						if (hangMan.citiesChoicesArray[i] == hangMan.currentCity) {
							hangMan.citiesChoicesArray.splice(i, 1);
						}
					}
					
					hangMan.cityGuessed = true;
					console.log("The player has guessed the following city: "+hangMan.cityGuessed);
					
					document.getElementById("labels").appendChild(nextCityButton); // Append button to HTML DOC
				}
			}
		}
	}else if (hangMan.cityGuessed){
		console.log("click the Next City to continue playing!");
	}

}

