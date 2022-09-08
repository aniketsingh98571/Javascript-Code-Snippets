'use strict';
const diceRoll = document.querySelector('.btn--roll');
const diceHold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const diceImage = document.querySelector('.dice');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
let diceValue = 0;
let activePlayer = 0;
let playing = true;
let finalScores = [0, 0];
let currentScore = 0;

//resetting everything
const newGameStart = () => {
  diceValue = 0;
  activePlayer = 0;
  playing = true;
  finalScores = [0, 0];
  currentScore = 0;
  document.querySelector('#score--0').textContent = currentScore;
  document.querySelector('#score--1').textContent = currentScore;
  document.querySelector('#current--0').textContent = finalScores[0];
  document.querySelector('#current--1').textContent = finalScores[1];
  playerTwo.classList.remove('player--winner');
  playerOne.classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
};
window.addEventListener('load', newGameStart);

//when we click on hold
const switchRoles = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};
diceRoll.addEventListener('click', () => {
  if (playing) {
    diceValue = Math.trunc(Math.random() * 6) + 1; //Dice values ranges from 1 to 6
    diceImage.src = `dice-${diceValue}.png`; //showing dice images based on dice value
    diceImage.classList.remove('hidden'); //initially when the page renders, dice is not visible since the user hasn't clicked the //roll button, so when he clicks the roll button, a number is generated between 1 to 6   //and based on the number a image is displayed
    if (diceValue !== 1) {
      //if the dice value is not 1 then keep the player playing, else switch the player with  its current score set to 1
      currentScore = currentScore + diceValue;
      document.getElementById(`current--${activePlayer}`).textContent = //dynamically setting the score to the UI by using dynamic ID.
        currentScore;
    } else {
      switchRoles();
    }
  }
});
diceHold.addEventListener('click', () => {
  if (playing) {
    finalScores[activePlayer] = currentScore + finalScores[activePlayer]; //when the user clicks on hold button we have to add the current score to its final score array, which in turn will be used to check the winner.
    document.querySelector(`#score--${activePlayer}`).textContent =
      finalScores[activePlayer];
    if (finalScores[activePlayer] >= 20) {
      //if a player has its final score greater than equal 20,he wins
      document
        .querySelector(`.player--${activePlayer}`) //adding winner class to the active player
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false; //this is a state which we are maintaining, like if a user wins the game then they cannot click the buttons anymore. setting the playing to true resumes the game
    } else {
      switchRoles();
    }
  }
});
newGame.addEventListener('click', () => {
  newGameStart();
});
