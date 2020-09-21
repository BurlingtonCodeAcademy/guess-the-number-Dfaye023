const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

function randomInt(min, max) {
  let range = (max - min) + 1
  let decimal = (Math.random() * range)
  let int = Math.floor(decimal) + min

  return int
} // random number generator outside async function, to be called upon whenever

async function start() {
  let min = 1
  let max = 100
  let compGuess = randomInt(min, max)
  
  console.log("Let's play a game where you, puny human, make up a number and I, vastly superior computer, try to guess it. ")
  let secretNumber = await ask("What is your secret number?\nPick a number between 1 & 100: ");
  console.log('You entered: ' + secretNumber + ' ')
  let winLoss = await ask(`Is your number ${compGuess}` + '? ')
  if (winLoss === 'yes') { 
    console.log('Damn, I\'m good! ')
    process.exit()
  } else // loop computer guesses. Reset min/max after every guess
    while (winLoss === 'no') {
       
      if (parseInt(secretNumber) === compGuess && winLoss === 'no') { // parseInt turned secretNumber into an actual number not string
        console.log('Don\'t lie! Rebel scum...')
        process.exit()
      }
      let highLow = await ask('Is it higher or lower? ')
      if (secretNumber > compGuess && highLow === 'lower') {
        console.log('Don\'t lie! Rebel scum...')
        process.exit()
      }
      if (secretNumber < compGuess && highLow === 'higher') {
        console.log('Don\'t lie! Rebel scum...')
        process.exit()
      }
      if (highLow === 'higher') {
        min = compGuess + 1
        compGuess = randomInt(min, max)
      } else if (highLow === 'lower') {
        max = compGuess - 1
        compGuess = randomInt(min, max)
      } else {
        console.log('No, no, no.... try again!')
      }
      winLoss = await ask(`Is your number ${compGuess}` + '? ')
      if (winLoss === 'yes') {
        console.log('Finally!!')
        process.exit()
      }


    }

}







