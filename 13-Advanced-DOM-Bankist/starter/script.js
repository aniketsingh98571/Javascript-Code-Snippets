'use strict';



///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo=document.querySelector('.btn--scroll-to')
const section1=document.querySelector('#section--1')
const tabs=document.querySelectorAll('.operations__tab')
const tabsContainer=document.querySelector('.operations__tab-container')
const tabsContent=document.querySelectorAll('.operations__content')
const nav=document.querySelector('.nav')
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
  // alert('addEventListener: Great! You are reading the heading')
  h1.removeEventListener('mouseenter',headingFunction)
}
const h1=document.querySelector('h1');
h1.addEventListener('mouseenter',headingFunction)

//old school way of writing event listeners
// h1.onmouseenter=function(e){
//   alert('addEventListener: Great! You are reading the heading')
// }

//smooth scroll for different sections of Nav
//the problem with this method is that for each nav element this function will be created and called which is inefficient for performance.
// document.querySelectorAll('.nav__link').forEach((data,index)=>{
//   data.addEventListener('click',function(e){
//     e.preventDefault()
//     console.log("Link")
//     const id=this.getAttribute("href")
//     console.log(id)
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//   })
// })

//event delegation - its better to select the parent of those nav elements and on that create an event.
//efficient method
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault()
  if(e.target.classList.contains('nav__link')){
    console.log(e.target)
    const id=e.target.getAttribute("href")
    console.log(id)
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
})

//Tabbed component
tabsContainer.addEventListener('click',function(e){
  const clicked=e.target.closest('.operations__tab')
  // console.log(clicked)
  if(!clicked) return;
  //first removing active class from all elements of tabs
  tabs.forEach(t=>t.classList.remove('operations__tab--active'))
  //then adding it to the clicked element
  clicked.classList.add("operations__tab--active")
  //removing all the active class from contents container
  tabsContent.forEach(t=>t.classList.remove('operations__content--active'))
  //adding the active class to the selected tab
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

//menu fade animation
const handleHover=function(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target
    const siblings=link.closest('.nav').querySelectorAll('.nav__link')
    const logo=link.closest('.nav').querySelector('img')
    siblings.forEach((el)=>{
      if(el!==link){
        el.style.opacity=this
      }
    })
    logo.style.opacity=this
  }
}
nav.addEventListener('mouseover',(e)=>handleHover.bind(0.5))
nav.addEventListener('mouseout',(e)=>handleHover.bind(1))

//sticky navigation using scroll event
// const initialCoords=section1.getBoundingClientRect()
// window.addEventListener('scroll',function(e){
//   console.log(window.scrollY)
//   if(window.scrollY>initialCoords.top){
//     nav.classList.add('sticky')
//   }
//   else
//   nav.classList.remove('sticky')
  
// })

//sticky navigation with Intersection Observer API
const stickyNav=(entries,observer)=>{
  const [entry]=entries
  console.log(entry)
  if(!entry.isIntersecting)
   nav.classList.add('sticky')
  else
  nav.classList.remove('sticky')
}
const headerElement=document.querySelector('.header')
const navHeight=nav.getBoundingClientRect().height
const headerElementObserver=new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`${navHeight}px`
})
headerElementObserver.observe(headerElement)

//revealing elements using Intersection Observer API
const allSectionsElements=document.querySelectorAll('section')
const revealSection=function(entries,observer){
  const [entry]=entries
  console.log(entry)
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}
const sectionObserver=new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15
})
allSectionsElements.forEach((section)=>{
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

//lazy loading images using Intersection Observer
const loadImg=(entries,observer)=>{
  const [entry]=entries
  if(!entry.isIntersecting){
    return;
  }
  //replace the src with data-src
  entry.target.src=entry.target.dataset.src
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}
const imgTargets=document.querySelectorAll('img[data-src]')
const imgObserver=new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin:'200px'
})
imgTargets.forEach((img)=>{
  imgObserver.observe(img)
})

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
//rgb(255,255,255)
const randomInt=(min,max)=>Math.floor(Math.random()*(max-min+1)+min)
const randomColor=()=>`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`
console.log(randomColor())
document.querySelector('.nav__link').addEventListener('click',function(e){
  console.log("Single Nav Link")
  console.log(e.target)//the place where the first event occured, it is not dependent on addition of event handler on the element.
  //in this scenario the single nav element caused the event to fire on "Single Nav Link","parent Nav Link","header Nav Link"
  //this is known as event bubbling:target--->parent
  console.log(e.currentTarget)//the place where the event handler occured

  //this in event listeners corresponds to the elements to which the event listeners are attached
  console.log(this)

   //stop propagation for the parent elements if there are any
   // e.stopPropagation()
})
//addEventListener method captures the event during the bubbling phase not capturing phase.
document.querySelector('.nav__links').addEventListener('click',function(e){
  console.log("parent Nav Link")
  console.log(e.target)//the place where the first event occured, it is not dependent on addition of event handler on the element.
  console.log(e.currentTarget)//the place where the event handler occured
})
document.querySelector('.nav').addEventListener('click',function(e){
  console.log("header Nav Link")
  console.log(e.target)//the place where the first event occured, it is not dependent on addition of event handler on the element.
  console.log(e.currentTarget)//the place where the event handler occured
})
//if we want to add capturing phase to addEventListener method then we pass a third parameter to addEventListener method as "true".
//bu default it is set to false
// document.querySelector('.nav').addEventListener('click',function(e){
//   console.log("header Nav Link")
//   console(e.target)//the place where the first event occured, it is not dependent on addition of event handler on the element.
//   console.log(e.currentTarget)//the place where the event handler occured
// },true)


//DOM traversing
const heading1=document.querySelector('h1')

//going downwards in the chidren of h1
//the below statement returns the nodelist which has class named 'highlight' in h1 element
console.log(heading1.querySelectorAll('.highlight'))
//below statement returns the nodelist which has all the nodes which are child of h1 element
console.log(heading1.childNodes)
//below statement returns the HTMLCollection which has all the direct children of h1 element
console.log(heading1.children)
//setting style of first direct children of h1 element
// heading1.firstElementChild.style.color="white"

//going upwards in the parent of h1
//below statement prints the direct parent of h1 element
console.log(heading1.parentNode)
//below statement prints the parent of h1 element
console.log(heading1.parentElement)

//accessing sibling
console.log(heading1.previousElementSibling)
console.log(heading1.nextElementSibling)
