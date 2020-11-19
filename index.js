//setting up the await ask function
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//start guessing game
start();

// random number generator outside async function, to be called upon whenever
function randomInt(min, max) {
  let range = Math.floor((max - min) / 2); //smarter guessing range for less guesses to hit target number
  let decimal = Math.random() * range;
  let int = Math.floor(decimal) + min;

  return int;
}

async function start() {
  //set min value
  let min = 1;
  //set max value
  let max = 100;
  //setting the computer guess, to be updated after every guess
  let compGuess = randomInt(min, max);

  //initial cosole log to be displayed after the function is ran
  console.log(
    "Let's play a game where you, puny human, make up a number and I, vastly superior computer, try to guess it. "
  );
  //prompt for user to pick a number between 1 & 100 that the computer will guess
  let secretNumber = await ask(
    "What is your secret number?\nPick a number between 1 & 100:  "
  );
  //repeats entered number
  console.log("You entered: " + secretNumber + " ");
  //computers first guess, if guessed right on first try display winning message
  let winLoss = await ask(`Is your number ${compGuess}` + "? ");
  if (winLoss === "yes") {
    console.log("Damn, I'm good! ");
    process.exit();
  } // loop computer guesses. Reset min/max after every guess
  else
    while (winLoss === "no") {
      if (parseInt(secretNumber) === compGuess && winLoss === "no") {
        // parseInt turned secretNumber into an actual number not string
        //if a range has already been eliminated and user says their number is in that range, display the cheating message
        console.log("Don't lie! Rebel scum...");
        process.exit();
      }
      //after user says no to computer guess, computer asks higher or lower
      let highLow = await ask("Is it higher or lower? ");
      if (secretNumber > compGuess && highLow === "lower") {
        //cheating message
        console.log("Don't lie! Rebel scum...");
        process.exit();
      }
      if (secretNumber < compGuess && highLow === "higher") {
        //cheating message
        console.log("Don't lie! Rebel scum...");
        process.exit();
      }
      //resetting the range, new min is the computer guess plus 1
      if (highLow === "higher") {
        min = compGuess + 1;
        compGuess = randomInt(min, max);
        //resetting the range, new max is the computer guess minus 1
      } else if (highLow === "lower") {
        max = compGuess - 1;
        compGuess = randomInt(min, max);
      } else {
        //if anything other than required response is entered, display this message
        console.log("No, no, no.... try again!");
      }
      winLoss = await ask(`Is your number ${compGuess}` + "? ");
      //winnging message when computer guesses the right number
      if (winLoss === "yes") {
        console.log("Finally!!");
        process.exit();
      }
    }
}
