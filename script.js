// Game Variables
let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = false;
let playerXName = "Player X";
let playerOName = "Player O";

// DOM Elements
const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("game-status");
const resetBtn = document.getElementById("reset-btn");
const startGameBtn = document.getElementById("start-game-btn");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
const gameBoard = document.getElementById("game-board");
const themeToggleBtn = document.getElementById("theme-toggle-btn");

// Sound Effects
const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");
const tieSound = new Audio("tie.mp3");
const resetSound = new Audio("reset.mp3");

// Winning Combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Functions
const handleCellClick = (e) => {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (board[index] || !isGameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");
  clickSound.play();

  checkWinner();
  if (isGameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const nextPlayerName = currentPlayer === "X" ? playerXName : playerOName;
    gameStatus.textContent = `Current Player: ${nextPlayerName}`;
  }
};

const checkWinner = () => {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameActive = false;
      const winnerName = currentPlayer === "X" ? playerXName : playerOName;
      gameStatus.textContent = `${winnerName} Wins! 🎉`;
      winSound.play();
      highlightWinningCells([a, b, c]);
      return;
    }
  }

  if (!board.includes(null)) {
    isGameActive = false;
    gameStatus.textContent = "It's a Tie! 🤝";
    tieSound.play();
  }
};

const highlightWinningCells = (combination) => {
  combination.forEach((index) => {
    cells[index].classList.add("winning");
  });
};

const resetGame = () => {
  board = Array(9).fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken", "winning");
  });
  currentPlayer = "X";
  isGameActive = true;
  const firstPlayerName = currentPlayer === "X" ? playerXName : playerOName;
  gameStatus.textContent = `Current Player: ${firstPlayerName}`;
  resetSound.play();
};

const startGame = () => {
  playerXName = playerXInput.value || "Player X";
  playerOName = playerOInput.value || "Player O";
  gameBoard.classList.remove("hidden");
  resetBtn.classList.remove("hidden");
  isGameActive = true;
  gameStatus.textContent = `Current Player: ${playerXName}`;
};

const toggleTheme = () => {
  document.body.classList.toggle("dark-mode");
};

// Event Listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
startGameBtn.addEventListener("click", startGame);
themeToggleBtn.addEventListener("click", toggleTheme);
