let currentPuzzle = {};
let level = 1;
let score = 0;

function generatePuzzle() {
  let range = level < 5 ? 9 : level < 10 ? 12 : 20;
  let nums = [];
  while (nums.length < 4) {
    const n = Math.floor(Math.random() * range) + 1;
    if (!nums.includes(n)) nums.push(n);
  }

  const [A, B, C, D] = nums;
  currentPuzzle = { A, B, C, D };

  document.getElementById("A").value = "";
  document.getElementById("B").value = "";
  document.getElementById("C").value = "";
  document.getElementById("D").value = "";

  document.querySelector(".clue-row:nth-of-type(1)").textContent = `A + B = ${A + B} →`;
  document.querySelector(".clue-row:nth-of-type(2)").textContent = `C - D = ${C - D} →`;
  document.querySelector(".clue-column").innerHTML = `
    ↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br />
    A − C = ${A - C}<br />
    B − D = ${B - D}
  `;

  document.getElementById("result").textContent = "";
  document.querySelector(".puzzle-area").classList.remove("unlocked");
  updateStats();
}

function getVal(id) {
  return parseInt(document.getElementById(id).value);
}

function checkPuzzle() {
  const A = getVal("A");
  const B = getVal("B");
  const C = getVal("C");
  const D = getVal("D");

  const resultBox = document.getElementById("result");

  if ([A, B, C, D].some(n => isNaN(n))) {
    resultBox.textContent = "❗ Fill all boxes with numbers!";
    return;
  }

  const valid =
    (A + B === currentPuzzle.A + currentPuzzle.B) &&
    (C - D === currentPuzzle.C - currentPuzzle.D) &&
    (A - C === currentPuzzle.A - currentPuzzle.C) &&
    (B - D === currentPuzzle.B - currentPuzzle.D) &&
    (new Set([A, B, C, D]).size === 4);

  if (valid) {
    document.querySelector(".puzzle-area").classList.add("unlocked");
    resultBox.textContent = "🔓 Vault Unlocked! You cracked it! 💥";
    score++;
    level++;
    updateStats();
    setTimeout(generatePuzzle, 2500);
  } else {
    resultBox.textContent = "❌ Incorrect logic — try again!";
  }
}

function updateStats() {
  document.getElementById("score").textContent = score;
  document.getElementById("level").textContent = level;
}

window.onload = generatePuzzle;
