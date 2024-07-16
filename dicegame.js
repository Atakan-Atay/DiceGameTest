let total1 = 0;
let total2 = 0;
let currentPlayer = 1;
let gameEnded = false;
const finishScore = 50;

const player1El = document.getElementById("player-1");
const player2El = document.getElementById("player-2");

const rollButton = document.getElementById("rollButton");
const resetButton = document.getElementById("resetButton");
const diceEl = document.querySelector(".dice");
const player1RollsElement = document.getElementById("total-1");
const player2RollsElement = document.getElementById("total-2");
const turnElement = document.getElementById("turn");
const result1Element = document.getElementById("roll1");
const result2Element = document.getElementById("roll2");

const activePlayer = 1 // 1 or 2

// 2 special cases: 1 and 6 
// if dice is 1, change player and set total to 0
// if dice is 6, continue with the same player
// change player otherwise

const players = [
  { number: 1, name: 'Player 1', total: '0'},
  { number: 2, name: 'Player 2', total: '0'}
]

const diceGame = {
  activePlayer: 1,
  // currentDice: 0,
}


function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}
function showResultAndRoll(total1,total2,roll){
if (currentPlayer===1){ 
  result1Element.textContent = total1;
  player1RollsElement.textContent = roll;
}
  else if(currentPlayer === 2){
    result2Element.textContent = total2;
  player2RollsElement.textContent = roll;
}
  }


  // if dice is 6, don't change, change otherwise
  function currentPlayerNow(roll){
    if (roll==6){
      if (currentPlayer === 1)
      currentPlayer = 1;
    else
      currentPlayer = 2;
    }
    else{
      if (currentPlayer===1)
        currentPlayer=2;
      else if(currentPlayer===2){
        currentPlayer=1;
      }
    }

  }

  const nextPlayer = (dice) => {
    if( dice !== 6) {
      // change active player

      diceGame.activePlayer = diceGame.activePlayer === 1 ? 2 : 1
    }

  }
 



  function assignTextContentAndColor(textContent, color1, color2, turnContent) {
  if (textContent) 
    player1RollsElement.textContent = textContent;

  player1El.style.backgroundColor = color1;
  player2El.style.backgroundColor = color2;
  if (turnContent) {
    turnElement.textContent = turnContent; 
  }
}
function updateTotal(roll) {

  // const activePlayer = players.find(player => player.number === diceGame.activePlayer)

  // activePlayer.total += roll 

  // if (currentPlayer === 1) {
  //   if (roll === 1) 
  //     total1 = 0;
  //   else 
  //   total1 += roll;
  // } else {
  //   if (roll === 1) 
  //     total2 = 0;
  //   else total2 += roll;
  // }
}
function showRoll() {
  if (gameEnded) return;

  

  const gameResultElement = document.getElementById("result");

  let roll = rollDie(); // Zar atışı

  if (currentPlayer === 1) {
    if (roll === 1) {
      updateTotal(1, roll);
      showResultAndRoll(total1,total2,roll);
      currentPlayerNow(roll);
      assignTextContentAndColor(roll, "#ffabff", "red", "Player 2's Turn");

      /// assignText(player2)
    } else {
      updateTotal(1, roll);
      showResultAndRoll(total1,total2,roll);

      if (roll === 6) {
        assignTextContentAndColor(roll, "red", "#ffabff", "Player 1's Turn (Roll again)");
      } 
      else {
        currentPlayerNow(roll)
        assignTextContentAndColor(roll, "#ffabff", "red", activePlayer.name + "'s Turn");
      }
    }
  } else if (currentPlayer === 2) {
    if (roll === 1) {
      updateTotal(2, roll);
      showResultAndRoll(total1,total2,roll);
      currentPlayerNow(roll);

      assignTextContentAndColor("", "red", "#ffabff", "Player 1's Turn");
    } else {
      updateTotal(2, roll);
      showResultAndRoll(total1,total2,roll);
      if (roll === 6) {
        assignTextContentAndColor(
          "",
          "#ffabff",
          "red",
          "Player 2's Turn (Roll again)"
        );
      } else {
        currentPlayerNow(roll);

        assignTextContentAndColor("", "red", "#ffabff", "Player 1's Turn");
      }
    }
  }

  if (total1 >= finishScore && total1 > total2) {
    gameResultElement.textContent = "Player 1 Wins!!!";
    gameEnded = true;
    setTimeout(() => {
      alert("Game over, start a new game.");
    }, 3000);
  } else if (total2 >= finishScore && total2 > total1) {
    gameResultElement.textContent = "Player 2 Wins!!!";
    gameEnded = true;
    setTimeout(() => {
      alert("Game over, start a new game.");
    }, 1000);
  }

  switch (roll) {
    case 1:
      diceEl.src = "dice-1.png";
      break;
    case 2:
      diceEl.src = "dice-2.png";
      break;
    case 3:
      diceEl.src = "dice-3.png";
      break;
    case 4:
      diceEl.src = "dice-4.png";
      break;
    case 5:
      diceEl.src = "dice-5.png";
      break;
    case 6:
      diceEl.src = "dice-6.png";
      break;
    default:
      diceEl.src = "dice-1.png";
  }

  // Animasyon
  diceEl.classList.add("dice-roll-animation");
  setTimeout(() => {
    diceEl.classList.remove("dice-roll-animation");
  }, 300);
}

function resetGame() {
  total1 = 0;
  total2 = 0;
  const result1Element = document.getElementById("roll1");
  const result2Element = document.getElementById("roll2");

  const player1RollsElement = document.getElementById("total-1");
  const player2RollsElement = document.getElementById("total-2");

  const turnElement = document.getElementById("turn");

  const gameResultElement = document.getElementById("result");

  result1Element.textContent = "0";
  result2Element.textContent = "0";

  player1RollsElement.textContent = "0";
  player2RollsElement.textContent = "0";
  gameResultElement.textContent = "";

  player1El.style.backgroundColor = "#ffabff"; // Player 1 rengi
  player2El.style.backgroundColor = "#ffabff"; // Player 2 rengi
  gameEnded = false;
  currentPlayer = 1; // Oyuncu sırasını sıfırla
  turnElement.textContent = "Player 1's Turn"; // Oyun sıfırlandığında Player 1'ın sırası
}

// Event Listener'ları ekle
resetButton.addEventListener("click", resetGame);
rollButton.addEventListener("click", showRoll);



// class Player {
//   constructor(name) {
//     this.name
//   }

//   helloWorld(){
//     console.log('func for player: ', this.name)
//   }
// }