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
const switchRoles = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};
diceRoll.addEventListener('click', () => {
  if (playing) {
    diceValue = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `dice-${diceValue}.png`;
    diceImage.classList.remove('hidden');
    if (diceValue !== 1) {
      currentScore = currentScore + diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchRoles();
    }
  }
});
diceHold.addEventListener('click', () => {
  if (playing) {
    finalScores[activePlayer] = currentScore + finalScores[activePlayer];
    document.querySelector(`#score--${activePlayer}`).textContent =
      finalScores[activePlayer];
    if (finalScores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      switchRoles();
    }
  }
});
newGame.addEventListener('click', () => {
  newGameStart();
});
