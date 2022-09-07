'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');

//since on the html we have three buttons with same class name,so if we select them with the help of "QuerySelector" then it will
//return only one button element. So in order to select all buttons we use "QuerySelectorAll", QuertSelectorAll returns the nodeslist with
//all the button elements inside it.
//Example-NodeList(3) [button.show-modal, button.show-modal, button.show-modal]
const btnsOpenModal = document.querySelectorAll('.show-modal');
const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//there are three keyboard events-keyup,keydown and keypress.
//keypress is now deprecated
//each event listener takes an event as a parameter for its callback function,
//we can use that event parameter to get which key is pressed, its keycode etc
//keycode is now deprecated so instead use key to get which key is pressed
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
