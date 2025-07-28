document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById('gameBoard');
  const scoreDisplay = document.getElementById('score');
  const movesDisplay = document.getElementById('moves');
  const timerDisplay = document.getElementById('timer');
  const message = document.getElementById('message');

  const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥝', '🍍'];
  let cards = [];
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matches = 0;
  let moves = 0;
  let timeElapsed = 0;
  let timerStarted = false;
  let timerInterval;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startTimer() {
    if (timerStarted) return;
    timerStarted = true;
    timerInterval = setInterval(() => {
      timeElapsed++;
      timerDisplay.textContent = timeElapsed;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function createBoard() {
    gameBoard.innerHTML = '';
    message.textContent = '';
    matches = 0;
    moves = 0;
    timeElapsed = 0;
    timerStarted = false;
    clearInterval(timerInterval);
    scoreDisplay.textContent = matches;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = 0;

    cards = [...symbols, ...symbols];
    shuffle(cards);

    cards.forEach(symbol => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.symbol = symbol;
      card.textContent = '';
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
    });
  }

  function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

    startTimer();
    this.textContent = this.dataset.symbol;
    this.classList.add('flipped');

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }

  function checkMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matches++;
      scoreDisplay.textContent = matches;
      resetTurn();

      if (matches === symbols.length) {
        message.textContent = "🎉 You matched all cards!";
        stopTimer();
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetTurn();
      }, 1000);
    }
  }

  function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  window.resetGame = function () {
    createBoard();
  };

  createBoard();
});
