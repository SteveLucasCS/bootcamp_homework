/**************************************************************************************
 * TODO: 
 * get correct guesses to fill in question spaces
 * DYNAMICALLY CREATE "displayStringArray" BASED ON ANSWER LENGTH
 *  
 *************************************************************************************/

var answerArray = [
  "DEBRINCAT", "TOEWS", "KANE", "HAYDEN", "SCHMALTZ", "KEITH", "SEABROOK"
]

var questionText = document.getElementById("question-container");
var guessText = document.getElementById("guesses-container");
var livesText = document.getElementById("lives-container");
var statusText = document.getElementById("game-status");
var resetBtn = document.getElementById("reset-button");
var guessHistory = [];
var answerIndex = 0;
var currentAnswer = answerArray[answerIndex];
var lives = 10;
var currentQuestion = newQuestion(currentAnswer);


//reset button hidden by default
resetBtn.style.display = "none";


/* Checks if the user's guess is in the answer string *
 * @param guess - the user's guess *
 * @return string - returns string to display as question with correct guesses filled in */
function checkGuess(guess) {
  var guessIndex = currentAnswer.indexOf(guess);

  // Guessed letter is not part of the answer 
  if (guessIndex == -1) {
    lives--;
    if (lives == 0) {
      statusText.innerHTML = "You lost this round, try a different name.";
      currentAnswer = answerArray[answerIndex++];
      lives = 10;
      guessHistory = [];
      currentQuestion = newQuestion(currentAnswer);
      updateUI(currentQuestion);
    }
    return currentQuestion;
  }
  // guessed char is in the user string
  else {
    // if the character was already guessed, doesn't count
    if (currentQuestion.charAt(guessIndex) != "_") {
      statusText.innerHTML = "You already guessed that, guess a different letter!";
      return currentQuestion;
    }
    //set the currentQuestion's char at index of guessIndex to guess
    else {
      //check for all matches and change then to display character
      for (var a = 0; a < currentQuestion.length; a++) {
        if (currentAnswer.charAt(a) != -1) {
          currentQuestion = updateQuestion(currentAnswer, currentQuestion, guessIndex);
        }
      }
    }
    if (currentQuestion == currentAnswer) {
      questionText.innerHTML = currentAnswer;
      gameWon();
    }
    return currentQuestion;
  } // end condition if guess is a NEW correct guess
  // end condition for if char is a correct guess
} // end checkGuess()

/* Updates UI of the page */
/* @param currentQuestion string will be displayed in question-text div */
function updateUI(currentQuestion) {
  questionText.innerHTML = currentQuestion;
  guessText.innerHTML = guessHistory;
  livesText.innerHTML = lives;
}

//user presses a key (makes a guess)
function keypressed() {
  var keyCode = event.which;
  var guess = String.fromCharCode(keyCode);

  //if guess is NOT alphabetical (do nothing)
  guess.toUpperCase();
  guess = guess.match(/[A-Z]/g);
  if (guess == null)
    return;

  guess = guess[0]; //guess converted from array to string 

  //if guess is NOT already part of guessHistory
  if (guessHistory.indexOf(guess) == -1) {
    //checks against currentAnswer
    checkGuess(guess);
    if (currentAnswer.indexOf(guess) == -1)
      guessHistory.push(guess);
  }

  //update page UI
  updateUI(currentQuestion);
}

/* Alerts user that they won and resets the game by resetting UI values and selecting a new answer */
function gameWon() {
  currentQuestion = currentAnswer;
  questionText.innerHTML = currentAnswer;
  statusText.innerHTML = "You Win!";
  if (answerIndex == answerArray.length - 1) {
    statusText.innerHTML = "You've guessed every name, well done!";
    answerIndex = -1;
    //answerIndex will be reset to 0 in the next statement
  }
  /* If button is clicked, next round */
  resetBtn.style.display = "block";
  
}

function newRound() {
  answerIndex++;
  currentAnswer = answerArray[answerIndex];
  lives = 10;
  guessHistory = [];
  currentQuestion = newQuestion(currentAnswer);
  statusText.innerHTML = "Keep Guessing";
  updateUI(currentQuestion);
  resetBtn.style.display = "none";
}

/* Updates the "currentQuestion" string that requires a valid guess input
 * @param currentAnswer - String that represents the current answer to the game
 * @param currentQuestion - String that represents the text in the question-text box
 * @param guessIndex - the index of the guessed value
 * @return returns a string
 */
function updateQuestion(currentAnswer, currentQuestion, guessIndex) {
  var newString = "";
  for (var b = 0; b < currentAnswer.length; b++) {
    //if char is already filled in
    if (currentQuestion.charAt(b) != "_") {
      //if it is the index of the new guess, fill in char
      newString = newString.concat(currentAnswer.charAt(b));
    }
    // correct guess is filled in
    else if (b == guessIndex) {
      newString = newString.concat(currentAnswer.charAt(b));
    }
    // not guessed yet, filled with "_"
    else {
      newString = newString.concat("_");
    }
  }
  return newString;
}

/* Generates a blank question from the currentAnswer
 *returns a string of "_" the length of the answer */
function newQuestion(currentAnswer) {
  var newString = "";
  for (var i = 0; i < currentAnswer.length; i++) {
    newString = newString.concat("_");
  }
  return newString;
}