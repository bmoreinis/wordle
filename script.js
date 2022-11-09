var colors = ["r", "o", "y", "g", "c", "v"];
var answer = [];
var guessRecord = [];
var turnCount = 0;
var score = [];
var winFlag = 0;
var guessArray = [];

//https://press.rebus.community/programmingfundamentals/chapter/loading-an-array-from-a-text-file/

/* ENTERINPUT
 * By Kevin @105372kl 
 * Record a new guess triggered by a button event handled by guessInput 
 * which reads values from drop-down HTML menus
 * @param: none
 * @return: none
 * @error: none 
 * Sample documentation @mbm
 */
// Enter Button:
function enterInput() {

  /*if (winFlag == 1) {
    clear();
    winFlag = 0;
    let turnButton = document.getElementById("play");
  turnButton.innerHTML = "Play Turn";
  } */
  turnCount++;
  console.log("Turn count: " + turnCount);
  let guessClone = guessArray.slice(); // moved from guessInput @mbm
  console.log(JSON.stringify(guessClone)); //why does alert work, but log returns a null value?
  let feedback = giveFeedback(guessClone); // calls function and receives array @mbm
  // feedback.push("Turns: "+turnCount); @removed per refactoring
  if (feedback[4] == "b") {
    win();
  }
  displayGuessRecord(feedback);
}

function win() {
  alert("You Won in " + turnCount + " turns!");
  score.push(turnCount);
  let scoreTotal = 0;
  for (let i = 0; i < score.length; i++) {
    scoreTotal += score[i];
  }
  let avgScore = scoreTotal / score.length;
  let scoreDisplay = document.getElementById("score");
  let turnButton = document.getElementById("play");
  turnButton.innerHTML = "Play Again";
  winFlag = 1;
}

function clear() {
  turnCount = 0;
  createAnswer();
  guessRecord = [];
  let feedback = document.getElementById("feedbackOL");
  feedback.innerHTML = "";
  //console.log("clear");
}

function makeGuessRecord(guessArray, feedback) {
  //guessTranscript defined in guessInput()
  let guessTranscript = [];
  let colorGuess = convertGuess(guessArray);
  guessTranscript.push(colorGuess);
  guessTranscript.push(feedback);
  guessRecord.push(guessTranscript);
  console.log("Guess Record: " + JSON.stringify(guessRecord));
  return colorGuess;
}


//ol -> li for each turn -> ul for guess array + ul for feedback; ul guessArray -> li for each color; ul feedback -> li for each token 
function displayGuessRecord(feedback) {
  let turnMain = document.createElement("li");
  turnMain.style.width = "625px";
  let turnGuess = document.createElement("ul");
  for (let i = 0; i <= 4; i++) {
    let turnGuessLetter = document.createElement("div");
    turnGuessLetter.innerHTML = guessArray[i].toUpperCase();
    turnGuessLetter.classList.add("guess");
    turnGuessLetter.classList.add(feedback[i][1]);
    turnGuess.appendChild(turnGuessLetter);
  }
  /*for (let i = 0; i < feedback.length; i++) {
    turnFeedbackColor.classList.add(feedback[i]);
    turnFeedback.appendChild(turnFeedbackColor);
  }*/
  turnMain.appendChild(turnGuess);
  document.getElementById("feedbackOL").appendChild(turnMain);
}

function instructions() {
  alert("Solve for a secret four-color password! \n\nHints will be displayed on the right: \n\n     Black Tokens indicate that one color exists in \n     the correct position in the password. \n\n     White Tokens indicate that one color exists, but is in the wrong \n     position in the password.");
}

//Play Button:

function createAnswer() {
  turnCount = 0;
  answer = [];
  let answerSelect = answersCollection[Math.floor(Math.random() * answersCollection.length)];
  answerSelect = "bonus";
  //console.log(answerSelect);
  //console.log(answerSelect.length);
  guessRecord = [];
  for (let i = 0; i <= answerSelect.length; i++) {
    answer.push(answerSelect[i]);
  }
  //answer = [0,0,0,0]
  console.log("Answer: " + answer);
}

createAnswer()


//Extracts values from User input in dropdown menus

function guessInput(event) {
  let keyPress = event.key;
  if (keyPress == "Backspace") {
    for (let i = 5; i => 1; i--) {
      let key = document.getElementById("guess" + i);
      if (key.innerHTML != "") {
        guessArray.splice(-1)
        let displayKey = document.getElementById("guess" + i);
        displayKey.innerHTML = "";
        break;
      }
    }
  }
  else if (keyPress == "Enter") {
    if (guessArray.length != 5) {
      alert("Not Enough Letters!");
    }
    else {
      let word = guessArray.join("");
      if (dictionary.indexOf(word) == -1 && answersCollection.indexOf(word) ==-1) {
        alert("Not a word!");
        console.log("Guess: " + word);
      }
      else {
        enterInput();  
      }
    }
  }
  else if (keyPress.length == 1) {
    for (let i = 1; i <= 5; i++) {
      let key = document.getElementById("guess" + i);
      if (key.innerHTML == "") {
        guessArray.push(keyPress);
        let displayKey = document.getElementById("guess" + i);
        displayKey.innerHTML = keyPress.toUpperCase();
        //displayKey.classList.add("")
        break;
      }
    }
  }
  //console.log(guessArray);
}

function giveFeedback(guessClone) {
  // refactoring with parameters to track versions of arrays
  let tempTranscript = blackCheck(guessClone);
  let feedback = whiteCheck(tempTranscript);
  console.log("Feedback"+JSON.stringify(feedback));
  return feedback;
}

//Checks if the indices of both the current selection in the guessArray and answerClone are equal
function blackCheck(guessClone) {
  let feedback = guessArray.slice();
  for (let i = 0; i <=4; i++) {
    feedback[i] = Array.from(feedback[i]);
  }
  //console.log(JSON.stringify(feedback));
  let answerClone = answer.slice();
  for (let i = 0; i <= 4; i++) {
    if (guessClone[i] == answerClone[i]) {
      feedback[i].push("b");
      answerClone[i] = null;
      guessClone[i] = null;
    }
  }
  let tempTranscript = [];
  tempTranscript.push(answerClone); // add nullified answer
  tempTranscript.push(guessClone); // add nullified guess
  tempTranscript.push(feedback); // add feedback
  return tempTranscript;
}

//Checks if there is a value in guessArray that is also in answerClone
function whiteCheck(tempTranscript) {
  let answerClone = tempTranscript[0].slice();
  let guessArray = tempTranscript[1].slice();
  let feedback = tempTranscript[2].slice();
  for (let i = 0; i <= 4; i++) {
    if (guessArray[i] != null) {
      for (let guessPos = 0; guessPos <= 4; guessPos++) {
        if (guessArray[guessPos] != null)
          for (let answerPos = 0; answerPos <= 4; answerPos++) {
            if (guessArray[guessPos] == answerClone[answerPos]) {
              if (guessPos != answerPos) {
                feedback[guessPos].push("w");
                guessArray[guessPos] = null;
                answerClone[answerPos] = null;
                break ;
              }
            } //match
          }
      }
    }//checks if guess array current index is a null value (from black token check)
  }//iterate through each position of guessArray
  return feedback; // we don't need answerClone anymore @mbm
}
