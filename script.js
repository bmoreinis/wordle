var colors = ["b", "r", "y", "g", "c", "w"];
var answer = [];
var guessRecord = [];
var turnCount = 0;

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
  turnCount++;
  console.log("Turn count: " + turnCount);
  let guessArray = guessInput(); // calls function and receives guess array @mbm
  let guessClone = guessArray.slice(); // moved from guessInput @mbm
  console.log(JSON.stringify(guessClone)); //why does alert work, but log returns a null value?
  let feedback = giveFeedback(guessClone); // calls function and receives array @mbm
  // feedback.push("Turns: "+turnCount); @removed per refactoring
  if (feedback[3] == "B") {
    alert("You Won in " + turnCount + " turns!");
  }
  else alert("Guess: " + (JSON.stringify(guessArray)) + "Feedback: " + (JSON.stringify(feedback)));
  //makeGuessRecord(guessArray, feedback);
  let colorGuess = makeGuessRecord(guessArray, feedback);
  displayGuessRecord(colorGuess, feedback);
}

function makeGuessRecord(guessArray, feedback) {
  //guessTranscript defined in guessInput()
  let guessTranscript = [];
  let colorGuess = convertGuess(guessArray);
  guessTranscript.push(colorGuess);
  guessTranscript.push(feedback);
  guessRecord.push(guessTranscript);
  console.log("Guess Record: "+JSON.stringify(guessRecord));
  return colorGuess;
}

function convertGuess(guessArray) {
  /*let colorGuess  = guessArray.slice();
  for (let i = 0; i < colorGuess.length; i++) {
    for (let guessPos = 0; guessPos <= colors.length; guessPos++ ) {
      colorGuess[i] = colors.indexOf(guessArray[i]);
      if (colorGuess[i] == guessPos) {
        colorGuess[i] = colors[guessPos];
      }
    }
  }
  return colorGuess;                               <--                          old code @kl */
  let colorGuess  = [];
  for (let i = 0; i < 4; i++) {
    colorGuess.push(colors[guessArray[i]]);
  }
  return colorGuess;
}
//ol -> li for each turn -> ul for guess array + ul for feedback; ul guessArray -> li for each color; ul feedback -> li for each token 
function displayGuessRecord(colorGuess, feedback) {
  let turnMain = document.createElement("li");
  let turnGuess = document.createElement("ul")//style("none"); <-- work on this later
  //let turnFeedback = document.createElement("ul").style.listStyleType("none");
  //let turnFeedbackColor = document.createElement("li");  
  for (let i = 0; i < 4; i++) {
    let turnGuessColor = document.createElement("li");
    turnGuessColor.innerHTML = colorGuess[i]; 
    turnGuess.appendChild(turnGuessColor);
  }



  //work on below:

  
  /*for (let i = 0; i < 4; i++) {
    let turnGuessColor = document.createElement("li");
    turnGuessColor.innerHTML = colorGuess[i]; 
    turnGuess.appendChild(turnGuessColor);
  }*/





  
  turnMain.appendChild(turnGuess);
  //turnMain.appendChild(turnFeedback);
  document.getElementById("feedbackOL").appendChild(turnMain);
  //                                              <--                       work on this code @kl 
  /*let turnMain = document.createElement("li");
  for (let i = 0; i < guessRecord.length; i++) {
    turnMain.innerHTML = guessRecord[i];
    document.getElementById("feedbackOL").appendChild(turnMain);
  }                                                *///                          old/stub code - @kl 
}

//Play Button:

function createAnswer() {
  turnCount = 0;
  answer = [];
  guessRecord = [];
  for (let i = 0; i <= 3; i++) {
    answer[i] = Math.floor(Math.random() * 6);
  }
  //answer = [0,0,0,0]
  console.log("Answer: " + answer);
  
}

//Extracts values from User input in dropdown menus
function guessInput() {
  let guessArray = [];
  for (let i = 1; i <= 4; i++) {
    let input = document.getElementById("guess" + i);
    guessArray.push(parseInt(input.value));
  }
  // guessTranscript = guessArray.slice();
  return guessArray; // added to track passed values between functions @mbm
}

function giveFeedback(guessClone) {
  // refactoring with parameters to track versions of arrays
  let tempTranscript = blackCheck(guessClone);
  let feedback = whiteCheck(tempTranscript);
  console.log("feedback: " + feedback);
  return feedback;
}

//Checks if the indices of both the current selection in the guessArray and answerClone are equal
function blackCheck(guessClone) {
  let feedback = [];
  let answerClone = answer.slice();
  for (let i = 0; i <= 3; i++) {
    if (guessClone[i] == answerClone[i]) {
      feedback.push("B");
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
  for (let i = 0; i <= 3; i++) {
    if (guessArray[i] != null) {
      for (let guessPos = 0; guessPos <= 3; guessPos++) {
        if (guessArray[guessPos] != null)
          for (let answerPos = 0; answerPos <= 3; answerPos++) {
            if (guessArray[guessPos] == answerClone[answerPos]) {
              if (guessPos != answerPos) {
                feedback.push("W");
                guessArray[guessPos] = null;
                answerClone[answerPos] = null;
                break;
              }
            } //match
          }
      }
    }//checks if guess array current index is a null value (from black token check)
  }//iterate through each position of guessArray
  return feedback; // we don't need answerClone anymore @mbm
}