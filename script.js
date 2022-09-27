var colors = ["b", "r", "y", "g", "c", "w"];
var answer = [];
var guessArray = [];
var blackTokens = 0;
var whiteTokens = 0;

function main() {
  createAnswer();
  guessInput();
  /*if (blackTokens == 4) {
    alert("You Won in x turns");
  }
  else giveFeedback()*/
  giveFeedback(); //remove this afterwards and use above code
}

function createAnswer() {
  for (let i = 0; i <= 3; i++) {
    answer[i] = Math.floor(Math.random() * 6);
  }
  //answer = [0,0,0,0]
  console.log(answer);
}

function guessInput() {
  guessArray = [];
  for (let i = 1; i <= 4; i++) {
    let input = document.getElementById("guess" + i);
    guessArray.push(parseInt(input.value));
  }
  console.log(guessArray);
}

function giveFeedback() {
  let cloneAnswer = answer;
  blackTokens = 0;
  whiteTokens = 0;
  blackCheck();
  whiteCheck();
}

function blackCheck() {
  for (let i = 0; i <= 3; i++) {
    if (guess[i] == cloneAnswer[i]) {
      blackTokens++;
      cloneAnswer[i] = null;
      guess[i] = null;
    }
  }
}

function whiteCheck() {
  for (let guessPos = 0; guessPos <= 3; guessPos++){
    for (i = 0; i <= 3; i++) {
      if (guess[guessPos] == cloneAnswer [i]) {
        if (guessPos == i) {
          i++;
        }
        else {
          whiteToken++;
          cloneAnswer[i] = null;
        }
      }
    }
  }
}