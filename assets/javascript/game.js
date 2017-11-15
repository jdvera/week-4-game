

// I couldn't figure out how to add an image between the name and hp in each button. 
// - I could get the image as the background of the button, but that made the name and HP hard to read. 
// - I also tried adding html between them, but couldn't propery escape(?) the slashes in the src 
// - I think I could have figured it our if I hadn't made everything <button>s, but didnt have time to change it


window.onload = function() {

// Define Global Variable
var robb = {
	name: "Robb Stark",
	hp: 200,
	att: 5,
	baseAtt: 5,
	counterAtt: 20,
};

var joffrey = {
	name: "Joffrey 'Baratheon'",
	hp: 150,
	att: 15,
	baseAtt: 15,
	counterAtt: 18
};

var balon = {
	name: "Balon Greyjoy",
	hp: 140,
	att: 7,
	baseAtt: 7,
	counterAtt: 25
};

var stannis = {
	name: "Stannis Baratheon",
	hp: 100,
	att: 8,
	baseAtt: 8,
	counterAtt: 30
};

var renly = {
	name: "Renly Baratheon",
	hp: 95,
	att: 9,
	baseAtt: 9,
	counterAtt: 30
};

var characterList = [robb, joffrey, stannis, renly, balon];

var defenderSelected = false;
var gameOver = false;

var player = {};
var defender = {};



//--------------------------------------------------- Start New Game
var newGame = function() {
	// Reset Character's HP and att
	robb.hp = 200;
	robb.att = 5;
	joffrey.hp = 150;
	joffrey.att = 15;
	balon.hp = 140;
	balon.att = 7;
	stannis.hp = 100;
	stannis.att = 8;
	renly.hp = 95;
	renly.att = 9;

	// Clear the HTML divs
	$("#character-list").empty();
	$("#player-character").empty();
	$("#enemy-list").empty();
	$("#defender").empty();
	$("#restart").empty();

	// Reset other global variable
	player = {};
	defender = {};
	defenderSelected = false;
	gameOver = false;

	// Generate list of playable characters
	for (var i = 0; i < characterList.length; i++) {
		characterButton("charBtn", "available-character", "#character-list", i);
    }
};




//----------------------------------------------------- Select your Player Character
var selectPC = function() {
	// Get the value of the button clicked
	var num = $(this).val();

	// Clear the list of available characters
	$("#character-list").empty();

	for (var i = 0; i < characterList.length; i++) {
		// Make the clicked character the Player Character
		if (num == i){
			characterButton("pc", "portrait", "#player-character", i);
			player = characterList[i];
		}

		// Make all other characters Enemies
		else {
			characterButton("notPC", "enemy", "#enemy-list", i);
		}
	}
}



//--------------------------------------------------- Select a Defender
var selectDefender = function() {
	if (defenderSelected == false && gameOver == false) {
		// Get the value of the clicked character
		var num = $(this).val();

		for (var i = 0; i < characterList.length; i++) {
			if (num == i){
				// Make it so we can't select a second Defender
				defenderSelected = true;

				// Remove the selected enemy's name from the list of enemies
				removeName(i);

				// Display the selected enemy in the defender div
				characterButton("def", "defender", "#defender", i);

				// Copy the character's stats into the defender
				defender = characterList[i];
			}
		}
	}

	else {
		console.log("There is already a defender selected, or the game is over");
	}
};



// ------------------------------------------------- Fight Defender
var fight = function() {
	// Only want this ran if there is a Defender selected
	if (defenderSelected == true && gameOver == false) {
		// Get values from original Objects
		var j = $(".portrait").val();
		var i = $(".defender").val();

		// Damage defender
		defender.hp = defender.hp - player.att;

		// Increase Att power
		player.att = player.att + characterList[j].baseAtt;
		
		// When the defender dies
		if (defender.hp < 1) {

			// Remove ememy from Defender area
			$("#defender").empty();

			// Check if we've won
			if ($('#enemy-list .enemy').length == 0) {
				console.log("You Win");
				newGameButton();
				gameOver = true;
				return;
			}

			// Allow the user to select a new enemy
			defenderSelected = false;
		}
		
		// If we didn't kill the Defender
		else {
			// Redisplay Defender with new HP
			$("#defender").empty();
			characterButton("def", "defender", "#defender", i);

			// Defender damages player
			player.hp = player.hp - defender.counterAtt;

			// Display new hp
			$("#player-character").empty();
			characterButton("pc", "portrait", "#player-character", j);

			if (player.hp < 1) {
				console.log("You Lose")
				newGameButton();
				gameOver = true;
			}
		}
	}

	else {
		console.log("You have not selected a defender, or the game is over");
	}
};



//-------------------------------------------------- Character Button
var characterButton = function (buttonName, desiredClass, htmlId, i) {
	var buttonName = $("<button>");
	buttonName.addClass(desiredClass);
	buttonName.attr("value", i);
	buttonName.html(characterList[i].name + "<br><br>" + characterList[i].hp);
	$(htmlId).append(buttonName);
};



//-------------------------------------------------- Remove Name
var removeName = function(num) {
	if (characterList[num].name == "Robb Stark") {
		$("button").remove(':contains(Robb Stark)');
	}
	else if (characterList[num].name == "Joffrey 'Baratheon'") {
		$("button").remove(":contains(Joffrey 'Baratheon')");
	}
	else if (characterList[num].name == "Balon Greyjoy") {
		$("button").remove(':contains(Balon Greyjoy)');
	}
	else if (characterList[num].name == "Stannis Baratheon") {
		$("button").remove(':contains(Stannis Baratheon)');
	}
	else if (characterList[num].name == "Renly Baratheon") {
		$("button").remove(':contains(Renly Baratheon)');
	}
};



//-------------------------------------------------- Restart button
var newGameButton = function() {
	var restartButton = $("<button>");
	restartButton.addClass("restart");
	restartButton.html("New Game");
	$("#restart").append(restartButton);
};



//-------------------------------------------------- Start Game and define button clicks onload
	newGame();
	$("#game").on("click", "#restart", newGame);
	$("#game").on("click", ".available-character", selectPC);
	$("#game").on("click", ".enemy", selectDefender);
	$("#game").on("click", "#fight", fight);

};