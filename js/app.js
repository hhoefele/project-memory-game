
//Create a list that holds all of your cards

const allCards = document.querySelectorAll('.card');
//console.log(allCards); returns Node list.

const allIcons = document.querySelectorAll('ul.deck i.fa');
//console.log(allCards); returns Node list of all icons.

function allCardsList(cards) {
  let allCardsArray = [];
  for (let i =0; i < cards.length; i++) {
    //console.log(cards[i]);
    //convert Node list to an array.
    allCardsArray.push(cards[i]);
  }
  return allCardsArray;
  //console.log([i], allIcons[i]);
}

//display all cards in array - for testing purposes
//console.log(allCardsList(allCards));
//console.log(allCardsList(allIcons));

 //Show all cards

function showCards(cards) {
    let allCardsArray = [];
    for (let i =0; i < cards.length; i++) {
        cards[i].classList.add('open');
        cards[i].classList.add('show');
        allCardsArray.push(cards[i]);
      }
    return allCardsArray;
}

//Loop through each card and remove any cards with class: match, open, or show

function removeActions(cards) {
  for (let i =0; i < cards.length; i++) {
      if (cards[i].classList.contains('open')) {
        cards[i].classList.remove('open');
        console.log("removed 'open' class: ", cards[i]);
      }
      if (cards[i].classList.contains('show')) {
        cards[i].classList.remove('show');
        console.log("removed 'show' class: ", cards[i]);
      }
      if (cards[i].classList.contains('match')) {
        cards[i].classList.remove('match');
        // console.log("removed 'match' class: ", cards[i]);
      }
  }
}

//shuffle the list of cards using the provided "shuffle" method below
//loop through each card and replace it's HTML

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }

 //display cards in the shuffled cards array - for testing purposes
 //console.log(allCardsList(shuffledCards));


//loop through each card and create its HTML (replace orginal deck with shuffled cards)
function replaceClassIcon(cards) {
  for (let i =0; i < cards.length; i++) {
  allCardsList(cards)[i].outerHTML = allCardsList(shuffledCards)[i].outerHTML;
  }
}



var shuffledCards=[];
var shuffledCards = shuffle(allCardsList(allCards));

function initGame(cards) {
  allCardsList(cards);
  removeActions(cards);
  replaceClassIcon(cards);
  //reset star counter
  var stars = document.querySelector('.score-panel .stars');
      while (stars.hasChildNodes()) {
        stars.removeChild(stars.firstChild);
      }
}


initGame(allCards);
//showCards(allCardsList(shuffledCards)); //works after initGame, keep for testing purposes
//replaceClassIcon(allCards);
//console.log(shuffledCards); //keep for testing



var deck = document.querySelector(".deck");
var openCards = [];

//set up the event listener for a card, when list item is clicked, call checkCard()
deck.addEventListener("click", checkCard, false);

function checkCard(event) {
  // .closest = looks for the closest matching parent to an element that has a selector that you pass in.
  let cardSelected = event.target.closest('.card');
  // if card is already selected, do nothing.
  if (cardSelected.classList.contains('open')) {
    return
  }
  // If the event target doesn't match bail
  if (!event.target.closest('.card')) return;
  // show the selected card
  cardSelected.setAttribute("class", "card open show");
  //add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  openCards.push(cardSelected);
  //call checkMatch() function
  checkMatch(openCards);

  //return  console.log(event.target, openCards, cardSelected, cardSelected.classList);
  return  console.log(cardSelected);

	// Otherwise, run...
  console.log("otherwise");
};

/*
* increment the move & star counter and display it on the page after checking for match
*/

var moveCounter = 0;
var stars = document.querySelector('.score-panel .stars');


function checkMatch(cards) {
  var moves = document.querySelector('.score-panel .moves');

    if(cards.length == 2){
      if (cards[0].innerHTML == cards[1].innerHTML ){
          cards[0].classList.add('match');
          cards[1].classList.add('match');
          openCards = [];
          moveCounter = moveCounter + 1;
          stars.insertAdjacentHTML('beforeend','<li><i class="fa fa-star"></i></li>');
      }
        setTimeout (function wait(){
        cards[0].classList.remove('open');
        cards[1].classList.remove('open');
        cards[0].classList.remove('show');
        cards[1].classList.remove('show');
        }, 750);
        openCards = [];
        moveCounter = moveCounter + 1;
    }
      moves.outerHTML = '<span class="moves">'+ moveCounter + '</span>';
      console.log(openCards, "moveCounter: ", moveCounter, "stars: ", document.querySelectorAll(".stars li").length);
      //if starCount reaches max then game is over
      gameOver();
  };

//if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

function gameOver(){
  setTimeout (function wait(){
      let starCount = document.querySelectorAll(".stars li").length;
        if (starCount==8) {
          deck.removeEventListener("click", checkCard, false);
          alert("Game Over");
        }
    }, 750);
};

//reset the game when reset icon is clicked

var resetIcon = document.querySelector('.score-panel .restart');
resetIcon.addEventListener("click", resetGame, false);

function resetGame() {
  const allCards = document.querySelectorAll('.card');
  //console.log(allCards); returns Node list.

  const allIcons = document.querySelectorAll('ul.deck i.fa');
  //console.log(allCards); returns Node list of all icons.
  var moveCounter = 0;
  var shuffledCards=[];
  var shuffledCards = shuffle(allCardsList(allCards));
  initGame(allCards);
};
