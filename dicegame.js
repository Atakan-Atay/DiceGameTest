class Player {
  constructor(number, name) {
    this.number = number;
    this.name = name;
    this.total = 0;
    this.backgroundColor = "#ffabff";
  }

  addScore(score) {
    this.total += score;
  }

  resetScore() {
    this.total = 0;
  }
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

const players = [new Player(1, "Player 1"), new Player(2, "Player 2")];
let currentPlayerIndex = 0;
let gameEnded = false;

const finishScore = 20;

const playersContainer = document.getElementById("playersContainer");
const rollButton = document.getElementById("rollButton");
const resetButton = document.getElementById("resetButton");
const addPlayerButton = document.getElementById("addPlayerButton");
const deletePlayerButton = document.getElementById("deletePlayerButton");
const diceEl = document.querySelector(".dice");
const turnElement = document.getElementById("turn");
const gameResultElement = document.getElementById("result");

function showResultAndRoll(roll) {
  const currentRollElement = document.getElementById(
    `roll${currentPlayerIndex + 1}`
  );
  const currentTotalElement = document.getElementById(
    `total-${currentPlayerIndex + 1}`
  );
  currentRollElement.textContent = players[currentPlayerIndex].total;
  currentTotalElement.textContent = roll;
}

/*function showResultAndRoll(roll) {
  document.getElementById(`total-${currentPlayerIndex + 1}`).textContent = roll;
  document.getElementById(`roll${currentPlayerIndex + 1}`).textContent = players[currentPlayerIndex].total;

}
*/

function switchPlayer(roll) {
  if (roll !== 6) {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // after the 4th player rolls the dice, it goes back to the 1st player.
    turnElement.textContent = players[currentPlayerIndex].name + "'s Turn";
  } else {
    turnElement.textContent =
      players[currentPlayerIndex].name + "'s Turn (Roll Again)";
  }
}

function updateTotal(roll) {
  if (roll === 1) {
    players[currentPlayerIndex].resetScore();
  } else {
    players[currentPlayerIndex].addScore(roll);
  }
}

function checkGameEnd() {
  players.find((player) => {
    if (player.total >= finishScore) {
      gameResultElement.textContent = player.name + " Wins!!!";
      gameEnded = true;
      setTimeout(() => {
        alert("Game over, start a new game.");
      }, 1000);
     rollButton.disabled=true;
    }
  });
}

function showRoll() {
 
  let roll = rollDie();
  disablePlayerButtons();
  updateTurnDisplay();
  updateTotal(roll);
  showResultAndRoll(roll);
  checkGameEnd();
  switchPlayer(roll);
  updateDiceImage(roll);
  updateTable();
  if (gameEnded) return;
}

function updateTable() {
  const scoreboardContainer = document.getElementById("scoreBoard");
  scoreboardContainer.innerHTML = ""; // Scoreboard'u temizle

  const sortedPlayers = players.slice().sort((a, b) => b.total - a.total); //slice ı boş göndermek diziyi kopyalar.
  const scoreboardTitle = document.createElement('div');
  scoreboardTitle.innerHTML = '<h3>ScoreBoard</h3>';
  scoreboardContainer.appendChild(scoreboardTitle);
  sortedPlayers.forEach((player, index) => {
    const scoreElement = document.createElement('div');
    
    scoreElement.classList.add('score');
    scoreElement.textContent = `${index + 1}. ${player.name} - ${player.total}`;
    scoreboardContainer.appendChild(scoreElement);
  });
}
function updateTurnDisplay() {
  players.forEach(( _, index) => {
    const playerElement = document.getElementById(`player-${index + 1}`);
    playerElement.style.backgroundColor =
      index === currentPlayerIndex ? "red" : "#ffabff";
  });
}

function updateDiceImage(roll) {
  diceEl.src = `dice-${roll}.png`;
  diceEl.classList.add("dice-roll-animation");
  setTimeout(() => {
    diceEl.classList.remove("dice-roll-animation");
  }, 300);
}

function resetGame() {
  // players.forEach((player) => player.resetScore());

  players.forEach((player, index) => {

    player.resetScore()

    document.getElementById(`roll${index + 1}`).textContent = "0";
    document.getElementById(`total-${index + 1}`).textContent = "0";

    const playerElement = document.getElementById(`player-${index + 1}`);
    playerElement.style.backgroundColor = "#ffabff";
    gameResultElement.textContent = "";
  });
  gameEnded = true;
  currentPlayerIndex = 0;
  turnElement.textContent = players[currentPlayerIndex].name + "'s Turn";

  deletePlayerButton.disabled = false;
  addPlayerButton.disabled = false;
  rollButton.disabled=false;
  
  updateTable();
}
function deletePlayer() {
  if (players.length <= 2) {
    alert("you can't delete more players");
    return;
  } else {
    players.splice(players.length - 1, 1); // ? ChatGpt Burada pop kullanımını önerdi. Hangisini kullanmak daha mantıklı?
    //console.log("delete");

    const playerToRemove = playersContainer.lastChild;
    playersContainer.removeChild(playerToRemove);
    updateTable();
  }
}
function disablePlayerButtons() {
  addPlayerButton.disabled = true;
  deletePlayerButton.disabled = true;
}

function addPlayer() {
  if (players.length > 4) {
    alert("you can't add more players");
    return;
  } else {
    const newPlayerNumber = players.length + 1;
    const newPlayer = new Player(newPlayerNumber, `Player ${newPlayerNumber}`);
    players.push(newPlayer); // Add as the last element of the array

    const newPlayerElement = document.createElement("div");
    newPlayerElement.classList.add("player");
    newPlayerElement.id = `player-${newPlayerNumber}`;
    newPlayerElement.innerHTML = `
    <h2>Player-${newPlayerNumber}'s Total Score</h2>
    <p id="roll${newPlayerNumber}">0</p>
    <div class="current-score">
      <h2 id="Current">Current</h2>
      <p id="total-${newPlayerNumber}">0</p>
    </div>
  `;
    playersContainer.appendChild(newPlayerElement);
    updateTable();
  }
}

resetButton.addEventListener("click", resetGame);
rollButton.addEventListener("click", showRoll);
addPlayerButton.addEventListener("click", addPlayer);
deletePlayerButton.addEventListener("click", deletePlayer);
