const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard;
let secondCard;

//Match Card
//When we click the first card, it needs to wait until another card is flipped so you need vars to managed the flip state. In case there is no card flipped

function flipCard() {
  this.classList.add('flip');

  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlippedCard = false;

  checkForMatch();
}

function checkForMatch() {
  //use conditional statement to check if the dataset value matches
  //otherwise, trigger unFlip() Fn
  if(firstCard.dataset.image === secondCard.dataset.image) {
    disableCards();
    return;
  }
  unFlipCards();
}

function disableCards() {
  
}

unFlipCards() {

}

 












cards.forEach(card => card.addEventListener('click', flipCard));