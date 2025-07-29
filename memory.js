//Grabs element from HTML to update User interface during game 
document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById('gameBoard');
  const scoreDisplay = document.getElementById('score');
  const movesDisplay = document.getElementById('moves');
  const timerDisplay = document.getElementById('timer');
  const message = document.getElementById('message');

  //Symbols for each pair of card
  const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥝', '🍍'];
  
  let cards = []; //Array of card element
  //track selected cards
  let firstCard = null; 
  let secondCard = null;
  //prevents clicking while checking for a match
  let lockBoard = false;
 // count of mathches pair
  let matches = 0;
  let moves = 0; //
  let timeElapsed = 0;  //Time Counter
  let timerStarted = false;  //Ensure timer starts only once 
  let timerInterval;  //Store interval ID for stopping later.

  //in suffling we use Fisher yates Shuffle in array . 
  //It ensures every possible permutation has an equal chance — meaning it's fair and unbiased.
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); //pick ramdom index j from zero and 1.
      [array[i], array[j]] = [array[j], array[i]]; //swaping
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

  //
  function createBoard() {
    gameBoard.innerHTML = '';  //clear the game board
    message.textContent = '';  //clear any winnnig message .
    matches = 0;
    moves = 0;
    timeElapsed = 0;
    timerStarted = false;
    clearInterval(timerInterval);  // stop any running timer
    scoreDisplay.textContent = matches;  //score 0
    movesDisplay.textContent = moves;   //move 0
    timerDisplay.textContent = 0;    //timer reset 0
//
    //duplicate symbol 2 each shuffle the desk.
    cards = [...symbols, ...symbols];
    shuffle(cards);

    cards.forEach(symbol => {
      const card = document.createElement('div'); //create new div
      card.classList.add('card');
      card.dataset.symbol = symbol;  //data symbol 
      card.textContent = '';
      card.addEventListener('click', flipCard); //click
      gameBoard.appendChild(card);
    });
  }

  //Prevent invalid flip:same card, already matched, or board locked.
  function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

   // Starts timer, reveals the emoji, adds visual flip.
    startTimer();
    this.textContent = this.dataset.symbol;
    this.classList.add('flipped');

    //if first card is not slected yet store it 
    //its the second card , update moves and check for a match
    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }

  //Compares both cards symbol
  function checkMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    //if match increment score +1
    if (isMatch) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matches++;
      scoreDisplay.textContent = matches;
      resetTurn();

      //if no match lock the board flip back after 1s , reset turn afterward
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

  //clear selected cards and unlock the board 
  function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  
  window.resetGame = function () {
    createBoard();
  };

  createBoard();
});
