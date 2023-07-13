'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal))
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Lectures
//Selecting entire document
console.log(document.documentElement)

//selecting head
console.log(document.head)

//selecting body
console.log(document.body)

//querySelector() - it matches the first element which we pass in it.
const header=document.querySelector('.header')//in this the first occurence of '.head' element will be selected

//querySelectorAll()-it helps to select all the elements with that attribute name which we pass in it.
const allSections=document.querySelectorAll('.section') //in the all the elements with ".section" attribute will be selected
console.log(allSections) //returns NodesList with all the element with attribute named ".section"
document.getElementById('section--1');
const allButtons=document.getElementsByTagName('button')
console.log(allButtons) //returns HTMLCollection
console.log(document.getElementsByClassName('btn')) //returns HTMLCollection

//creating and inserting elements
//.insertAdjacentHTML
const message=document.createElement('div')
message.classList.add('cookie-message');
message.textContent="We use cookies for improved functionality and analytics"
message.innerHTML='We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it! </button'
// header.prepend(message)//inserting as first child of element
header.append(message)//inserting as last child of element
// header.before(message)//top sibling of the header
// header.after(message)//bottom sibling of the header 
document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove()//remove element from DOM
  // message.parentElement.removeChild(message)//previous JS method of deleting child nodes
})