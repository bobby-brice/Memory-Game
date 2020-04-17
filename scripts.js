const cards = document.querySelectorAll('.memory-card');
const startButton = document.getElementById('btn__reset');
const timerDisplay = document.querySelector('.display__time-left');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let timeLimit = 60;


//Match Card
//When we click the first card, it needs to wait until another card is flipped so you need vars to managed the flip state. In case there is no card flipped

function startGame() {
  document.getElementById('overlay').style.display = 'none';  
  
  let countdown = setInterval(() => {
    if (timeLimit <= 0) {
      clearInterval(countdown);
      gameOver(false);
    }
    document.getElementById('progressBar').value = 60 - timeLimit;
    timeLimit -= 1
  }, 1000);
}

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
    checkForWin();
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
  
  function shuffle() {
    cards.forEach(card => {
      let random = Math.floor(Math.random() * 16);
      card.style.order = random;
    });
  };

  function checkForWin() {
    const flip = document.querySelectorAll(".flip");
    if (flip.length === cards.length) {
      gameOver(true);
      
    } else {
      return false;
    }
  }

  function gameOver(gameWon) {
    const overlay = document.getElementById('overlay');
    const message = document.getElementById('game-over-message');
    overlay.style.display = 'flex';

    if (gameWon === true) {
      overlay.setAttribute('class', 'win');
      message.innerHTML = 'You Win!';
      overlay.style.backgroundImage = "url('assets/winner.jpg')";
      timeLimit = 60;
      resetGame();
      
    } else if (gameWon == false) {
      message.innerHTML = 'Carol Fucking Basking!';
      overlay.setAttribute('class', 'lose');
      overlay.style.backgroundImage = "url('assets/loser.jpg')";
      timeLimit = 60;
      resetGame();
    }
  }

  function resetGame() {
    if(gameOver) {
      const cards = document.querySelectorAll('.flip');
      console.log(cards);
      cards.forEach(card => card.classList.remove('flip'));
      cards.forEach(card => card.addEventListener('click', flipCard));  
    }
  }
  
  startButton.addEventListener('click', function () {
    shuffle();
    startGame();
  });
  
  cards.forEach(card => card.addEventListener('click', flipCard));