let score = 0;
let highScore = 0;
let bombSet = new Set();

function startGame() {
  const grid = document.getElementById("grid");
  const size = parseInt(document.getElementById("gridSize").value);
  const bombs = parseInt(document.getElementById("bombCount").value);
  const totalCells = size * size;

  // Reset
  grid.innerHTML = "";
  score = 0;
  document.getElementById("score").textContent = score;
  grid.style.gridTemplateColumns = `repeat(${size}, 50px)`;
  bombSet.clear();

  // Generate random bomb positions
  while (bombSet.size < bombs) {
    bombSet.add(Math.floor(Math.random() * totalCells));
  }

  // Create boxes
  for (let i = 0; i < totalCells; i++) {
    const box = document.createElement("div");
    box.className = "box";
    box.dataset.index = i;
    box.addEventListener("click", handleBoxClick);
    grid.appendChild(box);
  }
}

function handleBoxClick(event) {
  const box = event.target;
  const index = parseInt(box.dataset.index);

  if (box.classList.contains("clicked")) return;

  if (bombSet.has(index)) {
    box.classList.add("bomb");
    revealAllBombs();
    setTimeout(() => {
      alert("💣 Boom! Game Over");
      if (score > highScore) {
        highScore = score;
        document.getElementById("highScore").textContent = highScore;
      }
      startGame();
    }, 600);
  } else {
    box.classList.add("clicked");
    box.style.backgroundColor = "#2ecc71";
    box.textContent = "+1";
    score++;
    document.getElementById("score").textContent = score;
  }
}

function revealAllBombs() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box, i) => {
    if (bombSet.has(i)) {
      box.classList.add("bomb");
    }
    box.removeEventListener("click", handleBoxClick);
  });
}
