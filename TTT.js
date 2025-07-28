const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let isXTurn = true;

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = ""; // Clear previous moves
    cell.addEventListener('click', handleClick, { once: true });
  });
  setStatus("X's Turn");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  cell.textContent = isXTurn ? "X" : "O";

  if (checkWin(currentClass)) {
    setStatus(`${isXTurn ? "X" : "O"} Wins! 🎉`);
    endGame();
  } else if (isDraw()) {
    setStatus("It's a Draw! 🤝");
    endGame();
  } else {
    isXTurn = !isXTurn;
    setStatus(`${isXTurn ? "X" : "O"}'s Turn`);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBOS.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function setStatus(message) {
  statusText.innerText = message;
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

restartBtn.addEventListener('click', startGame);
