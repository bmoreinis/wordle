var colors = ["b", "r", "y", "g", "c", "w"];
var answer = [];
var cloneAnswer = [];
var guessArray = [];
var blackTokens = 0;
var whiteTokens = 0;
var guessTranscript = [];
var guessRecord = [];


//Enter Button:
function enterInput() {
  let turnCount = 0;
  turnCount++;
  console.log("Turn count: "+turnCount);
  guessInput();
  console.log(cloneGuess); //why does alert work, but log returns a null value?
  giveFeedback();
  if (blackTokens == 4) {
    alert("You Won in "+ turnCount +" turns!");
  }
  else alert("Black Tokens: " + blackTokens + "\nWhite Tokens: " + whiteTokens);
  makeGuessRecord();
  blackTokens = 0;
  whiteTokens = 0;
}

function makeGuessRecord() {
  //guessTranscript defined in guessInput()
  guessTranscript.push("   ");
  guessTranscript.push(blackTokens);
  guessTranscript.push(whiteTokens);
  guessTranscript.push("\n");
  guessRecord.push(guessTranscript);
  alert(JSON.stringify(guessRecord));
  //do stringify first, and then insert white space and \n with for loop
  for (i = 1; i <= guessRecord.length; i++) {
    let guessLog = guessRecord;
    JSON.stringify(guessLog);
  }
}

//Play Button:

function createAnswer() {
  for (let i = 0; i <= 3; i++) {
    answer[i] = Math.floor(Math.random() * 6);
  }
  //answer = [0,0,0,0]
  console.log(answer);
}

//Extracts values from User input in dropdown menus
function guessInput() {
  guessArray = [];
  for (let i = 1; i <= 4; i++) {
    let input = document.getElementById("guess" + i);
    guessArray.push(parseInt(input.value));
  }
  cloneGuess = guessArray.slice();
  guessTranscript = guessArray.slice();
}

function giveFeedback() {
  cloneAnswer = answer.slice();
  blackTokens = 0;
  whiteTokens = 0;
  blackCheck();
  whiteCheck();
  console.log("black tokens: " + blackTokens);
  console.log("white tokens: " + whiteTokens);
}

//Checks if the indices of both the current selection in the guessArray and cloneAnswer are equal
function blackCheck() {
  for (let i = 0; i <= 3; i++) {
    if (guessArray[i] == cloneAnswer[i]) {
      blackTokens++;
      cloneAnswer[i] = null;
      guessArray[i] = null;
    }
  }
}

//Checks if there is a value in guessArray that is also in cloneAnswer
function whiteCheck() {
  for (let i = 0; i <= 3; i++) {
    if (guessArray[i] != null) {
      for (let guessPos = 0; guessPos <= 3; guessPos++) {
        if (guessArray[guessPos] != null)
          for (let answerPos = 0; answerPos <= 3; answerPos++) {
            if (guessArray[guessPos] == cloneAnswer[answerPos]) {
              if (guessPos != answerPos) {
                whiteTokens++;
                guessArray[guessPos] = null;
                cloneAnswer[answerPos] = null;
                break;
              }
            } //match
          }
      }
    }//checks if guess array current index is a null value (from black token check)
  }//iterate through each position of guessArray
}