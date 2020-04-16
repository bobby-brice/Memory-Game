const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

//Match Card
//When we click the first card, it needs to wait until another card is flipped so you need vars to managed the flip state. In case there is no card flipped

// let game;
// const startButton = document.getElementById('btn__reset');

 function startGame() {
  document.getElementById('overlay').style.display = 'none';
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  resetBoard();

 }



// startButton.addEventListener('click', function () {
//   game = new Game();
//   game.startGame();
// });

function flipCard() {
  if(lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  //use conditional statement to check if the dataset value matches
  //otherwise, trigger unFlip() Fn
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');  
    secondCard.classList.remove('flip');
    
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 16);
    card.style.order = random;
  });
})();

 












cards.forEach(card => card.addEventListener('click', flipCard));