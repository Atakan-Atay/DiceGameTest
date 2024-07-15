let total1 = 0;
let total2 = 0;
let currentPlayer = 1;
let gameEnded = false;

const player1El = document.getElementById("player-1");
const player2El = document.getElementById("player-2");

const rollButton = document.getElementById("rollButton");
const resetButton = document.getElementById("resetButton");
const diceEl = document.querySelector(".dice");

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function showRoll() {
  if (gameEnded) return;

  const result1Element = document.getElementById("roll1");
  const result2Element = document.getElementById("roll2");
  const player1RollsElement = document.getElementById("total-1");
  const player2RollsElement = document.getElementById("total-2");
  const turnElement = document.getElementById("turn");
  const gameResultElement = document.getElementById("result");

  let roll = rollDie(); // İlk zar atışı

  if (currentPlayer === 1) {
    if (roll === 1) {
      total1 = 0;
      result1Element.textContent = "0";
      currentPlayer = 2;
      turnElement.textContent = "Player 2's Turn";
      player1RollsElement.textContent = roll;
      player2El.style.backgroundColor = "red";
      player1El.style.backgroundColor = "#ffabff";
    } else {
      total1 += roll;
      result1Element.textContent = total1;
      player1RollsElement.textContent = roll;
      if (roll !== 6) {
        currentPlayer = 2;
        turnElement.textContent = "Player 2's Turn";
        player2El.style.backgroundColor = "red";
        player1El.style.backgroundColor = "#ffabff";
      } else {
        turnElement.textContent = "Player 1's Turn (Roll again)";
        player1El.style.backgroundColor = "red";
        player2El.style.backgroundColor = "#ffabff";
      }
    }
  } else if (currentPlayer === 2) {
    if (roll === 1) {
      total2 = 0;
      result2Element.textContent = "0";
      currentPlayer = 1;
      turnElement.textContent = "Player 1's Turn";
      player2RollsElement.textContent = roll;
      player1El.style.backgroundColor = "red";
      player2El.style.backgroundColor = "#ffabff";
    } else {
      total2 += roll;
      result2Element.textContent = total2;
      player2RollsElement.textContent = roll;
      if (roll !== 6) {
        currentPlayer = 1;
        turnElement.textContent = "Player 1's Turn";
        player1El.style.backgroundColor = "red";
        player2El.style.backgroundColor = "#ffabff";
      } else {
        turnElement.textContent = "Player 2's Turn (Roll again)";
        player2El.style.backgroundColor = "red";
        player1El.style.backgroundColor = "#ffabff";
      }
    }
  }

  if (total1 >= 30 && total1 > total2) {
    gameResultElement.textContent = "Player 1 Wins!!!";
    gameEnded = true;
    setTimeout(() => {
      alert("Game over, start a new game.");
    }, 3000);
  } else if (total2 >= 30 && total2 > total1) {
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

  // animasyon
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

  player1El.style.backgroundColor = "#ffabff";
  player2El.style.backgroundColor = "#ffabff";
  gameEnded = false;
  currentPlayer = 1; // Oyuncu sırasını sıfırla
  turnElement.textContent = "Player 1's Turn"; // Oyun sıfırlandığında Player 1'ın sırası
}

resetButton.addEventListener("click", resetGame);
rollButton.addEventListener("click", showRoll);
