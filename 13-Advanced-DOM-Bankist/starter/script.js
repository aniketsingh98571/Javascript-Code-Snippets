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

//smooth scroll
const btnScrollTo=document.querySelector('.btn--scroll-to')
const section1=document.querySelector('#section--1')
btnScrollTo.addEventListener('click',function(e){
  const s1coords=section1.getBoundingClientRect()
  console.log(s1coords)
  console.log(e.target.getBoundingClientRect())
  console.log('Current Scroll (X/y)',window.pageXOffset,window.pageYOffset)
  console.log(window.scrollX,window.scrollY)
  console.log('Height/width viewport',document.documentElement.clientHeight,document.documentElement.clientWidth)
  //scrolling logic
  //method one
  // window.scrollTo(s1coords.left+window.scrollX,s1coords.top+window.window.scrollY)
  //this is old method but supported in every browser
  window.scrollTo({
    left:s1coords.left+window.scrollX,
    top:s1coords.top+window.scrollY,
    behavior:'smooth'
  })
  //this is another way of implementing smooth scroll
  //this is supported in modern browsers
  section1.scrollIntoView({behavior:'smooth'})
})
//mousenter ==hover
const headingFunction=function(e){
  alert('addEventListener: Great! You are reading the heading')
  h1.removeEventListener('mouseenter',headingFunction)
}
const h1=document.querySelector('h1');
h1.addEventListener('mouseenter',headingFunction)

//old school way of writing event listeners
// h1.onmouseenter=function(e){
//   alert('addEventListener: Great! You are reading the heading')
// }


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

//styles in js
//the style that we set here are in-line styles
message.style.backgroundColor='#37383d'
message.style.width="100%"

//to get the computed style of an element 
// console.log(getComputedStyle('message'))
message.style.height=Number.parseFloat(getComputedStyle(message).height)+40+'px'

//if we are using any css variables using :root  then we can change the value of it using below method
// document.documentElement.style.setProperty('--color-primary','orange')

//attributes of elements
const logo=document.querySelector('.nav__logo')
//these are the standard attributes on img elements
console.log(logo.src)
logo.alt="minimalist Logo"
console.log(logo.alt)

//non standard attribute of img element
console.log(logo.designer)

//get attribute
//but still if you want to get the non-standard attribute also then you can use below method
console.log(logo.getAttribute('designer'))

//setting attribute to an element
logo.setAttribute('company',"Bankist")
console.log(logo.getAttribute('class'))

const link=document.querySelector('.twitter-link')
console.log(link.href)

//all the data attributes of an element are stored in dataset object
console.log(logo.dataset.versionNumber)

//classes
logo.classList.add('c')
logo.classList.remove('c')
logo.classList.toggle('c')
logo.classList.contains('c')
