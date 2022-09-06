'use strict';
// document.querySelector('.message').textContent = '🎉Correct Number';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);
const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
document.querySelector('.score').textContent = score;
let highscoreNUmber = 0;
document.querySelector('.check').addEventListener('click', () => {
  const guessNumber = Number(document.querySelector('.guess').value);
  if (guessNumber) {
    if (guessNumber === secretNumber) {
      document.querySelector('.message').textContent = '🎉Correct Number!';
      document.body.style.background = 'green';
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('.number').textContent = secretNumber;
      if (score > highscoreNUmber) {
        highscoreNUmber = score;
        document.querySelector('.highscore').textContent = highscoreNUmber;
      }
    } else if (guessNumber > secretNumber) {
      if (score > 1) {
        document.querySelector('.message').textContent = '⏫Too high!';
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        document.querySelector('.message').textContent = '😥You Lost the Game!';
      }
    } else if (guessNumber < secretNumber) {
      if (score > 1) {
        document.querySelector('.message').textContent = '⏬Too low!';
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        document.querySelector('.message').textContent = '😥You Lost the Game!';
      }
    }
  } else {
    document.querySelector('.message').textContent = ' ❌ No Number!';
  }
});
document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  document.body.style.background = '#222';
  document.querySelector('.highscore').value = 0;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
});
