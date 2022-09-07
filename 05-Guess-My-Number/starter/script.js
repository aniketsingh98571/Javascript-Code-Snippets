'use strict';

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
document.querySelector('.score').textContent = score;
let highscoreNUmber = 0;
const setMessage = message => {
  document.querySelector('.message').textContent = message;
};
const checkScoreCriteria = message => {
  if (score > 1) {
    setMessage(message);
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    setMessage('😥You Lost the Game!');
  }
};
const resetEveryThing = () => {
  document.querySelector('.score').textContent = score;
  setMessage('Start guessing...');
  document.querySelector('.guess').value = '';
  document.body.style.background = '#222';
  document.querySelector('.highscore').value = 0;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
};
const successChanges = () => {
  setMessage('🎉Correct Number!');
  document.body.style.background = 'green';
  document.querySelector('.number').style.width = '30rem';
  document.querySelector('.number').textContent = secretNumber;
};
document.querySelector('.check').addEventListener('click', () => {
  const guessNumber = Number(document.querySelector('.guess').value);
  if (guessNumber) {
    if (guessNumber === secretNumber) {
      successChanges();
      if (score > highscoreNUmber) {
        highscoreNUmber = score;
        document.querySelector('.highscore').textContent = highscoreNUmber;
      }
    } else if (guessNumber > secretNumber) {
      checkScoreCriteria('Too High!');
    } else if (guessNumber < secretNumber) {
      checkScoreCriteria('Too Low!');
    }
  } else {
    setMessage(' ❌ No Number!');
  }
});
document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  resetEveryThing();
});
