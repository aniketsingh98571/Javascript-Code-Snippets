'use strict';
//Default Parameters
const createBooking = function (flightName, numPassengers, price) {
  console.log(
    `Flight Name is ${flightName} carrying ${numPassengers} worth of ${price}`
  );
};
//As we can see here that we are passing only one parameter to the function call but the function definition accepts 3 arguments, so only the first argument of the function definition will get value assigned and rest other arguments will be undefined.
createBooking('LH2CB');

//In order to prevent the above undefined scenario, we assign default values to the function definition arguments something like below:-
//Note:-We can also add expressions as the default values [check price arguments]
const createBooking2 = function (
  flightName = 'LH2CB',
  numPassengers = 4,
  price = 25 * numPassengers
) {
  console.log(
    `Flight Name is ${flightName} carrying ${numPassengers} passengers worth of ${price}`
  );
};
//here also we are passing single argument but since we have used default values so if a argument is absent then that default values will be used.
createBooking2('LH2CG');
//If we pass all the arguments properly then the default values will be replaced by actual arguments
createBooking2('LH2CB', 4, 100);

//if you dont want to pass a particular argument then add 'undefined' at the place of that argument.
createBooking2('LK@j', undefined, 100);

//Pass by value and pass by reference
const flightNumber = 'LH2CBJH';
const person = {};
person.name = 'Aniket Singh';
person.age = 21;
console.log(person);

const checkIn = (flightNumber, person) => {
  //As  we can see here that, we are modifying a primitive type and a reference type.
  flightNumber = 'JKHJB1';
  person.name = 'Mr. Aniket Singh';
};
checkIn(flightNumber, person);
// so here the primitive type value remains the same like which we have declared at the top of code because wehen we pass any primitive type value as argument to a function, a copy of that variable gets created and passed to the function so if we modify the value then it will be affected in that scope only,not globally
console.log(flightNumber);
//but if we pass any reference type variables like arrays and objects to the function then their actual reference is passed to the function, not the copy so if we try to modify it, it will affect the original variable also since the object is stored in heap memory which has a reference in stack.
console.log(person);

//Higher Order Function
const oneWord = str => {
  '/ /g is a regex for detecting spaces in the string, g is for global matching';
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = str => {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), others].join(' ');
};

//here transformer function is a higher order function which takes upperFirstWord,note upperFirstWord is also called callback function as parameter and do the required thing
const transformer = (str, fn) => {
  console.log('Original string', str);
  console.log('transformed string ', fn(str));
  //functions has some properties and one of the properties is name which gives name of the function
  console.log(' transformed by ', fn.name);
};
transformer('Javascript is really fun', upperFirstWord);

transformer('Javascript is really fun', oneWord);
const high5 = () => {
  console.log('High5');
};
//here addEventListener is Higher Order Function and high5 is the callback function
document.body.addEventListener('click', high5);

//function returning other function
const greet = greeting => {
  return name => {
    console.log(`${greeting} ${name}`);
  };
};
const greetHey = greet('Hey');
greetHey('Aniket');

//you can also call the greet and the returned function like below:-
greet('Hey')('Jonas');

//CALL,APPLY, BIND of functions
//lets consider a usecase where a airline named lufthansa has to allow customers to book flights and also maintain an array of bookings,so inorder to do that we have created an object with the flight details and a book method
const lufthansa = {
  name: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNumber, name) {
    console.log(
      `${name} booked a flight at ${this.name}, numbered ${flightNumber} ${this.iataCode}`
    );
    this.bookings.push({
      name: { name },
      number: `${flightNumber} ${this.iataCode}`,
    });
    console.log(this.bookings);
  },
};
//bookings of customers
lufthansa.book(2538, 'Aniket');
lufthansa.book(2539, 'Jonas');

//after some years lufthansa airlines has changed his name to eurowings with some more edits and now they want to take over all the bookings from lufthansa to eurowings.
//Now the thing is the book method of lufhtansa and eurowing will remain same and we dont want to rewrite that function again in eurowing's object.
const eurowings = {
  name: 'EuroWings',
  iataCode: 'EW',
  bookings: [],
};

//In order to prevent rewriting of the function,we can extract the function of book in lufthansa to a variable and now the book is a first class function.
const book = lufthansa.book;

//calling the book method of lufthansa object like this will not work because, now the book function has become normal function or say first class function. So in first class function, the this property points to undefined.And also there is no separation as in whether we are calling book function of lufthansa object or eurowings object.
// book(254, 'Schmedtmann');

//In  order to prevent above problem we make use of call function on methods like this.
//call method takes max n arguments
//first argument is the scope in which object's function we are referring[this scope] to and after that the arguments that the actual function takes.
book.call(lufthansa, 250, 'Nick');
book.call(eurowings, 234, 'Paul');
function check() {
  console.log(this);
}
check.call();

//Bind Method
//The bind method takes a reference to 'this' context, and returns a function with the scope equal to the passed 'this' context
const euroBook = book.bind(eurowings);
euroBook(256, 'Jerman');

//we can use bind method with multiple arguments too
// const euroBook = book.bind(eurowings, 256, 'Jerman');
// euroBook();
//and later we can call the function with the specified arguments as and when needed
// euroBook(256, 'Jerman');

//call method practice
const myInfo = {
  name: 'Aniket Singh',
  occupation: 'SDE',
};
const yourInfo = {
  name: 'James Chadwick',
  occupation: 'CA',
};
function printMyInfo() {
  console.log(`My name is ${this.name}, I am a ${this.occupation}`);
}
printMyInfo.call(yourInfo);

lufthansa.planes = 300;
function buyPlane() {
  console.log(this);
  this.planes++;
  console.log(this.planes);
}
document
  .querySelector('.buy')
  .addEventListener('click', buyPlane.bind(lufthansa));

//Partial Application
//with the help of bind method we can preset a value of an entity, see below
//suppose in india, our CGST is 18% and its the amount of a product which gets changed time to time.
const productOne = {
  price: 25,
};
const productTwo = {
  price: 27,
};
function calculateTax(tax, quantity) {
  console.log(this.price * quantity + tax);
}
//here we have preset the value of our tax
const prodOne = calculateTax.bind(productOne, 0.18);
//and here its the quantity which is changing time to time
prodOne(5);
prodOne(6);
const prodTwo = calculateTax.bind(productTwo, 0.18);
prodTwo(7);
prodTwo(8);

//challenge
const addTax = (rate, value) => {
  value = value * rate + value;
  // console.log(value);
  return value;
};
const checkTax = (taxFn, rate, value) => {
  return taxFn(rate, value);
};
console.log(checkTax(addTax, 0.18, 25));

//bind practice
const module1 = {
  x: 42,
  getX: function () {
    console.log(this.x);
  },
};
const module2 = {
  x: 45,
};
const moduleX = module1.getX;
const moduleOneX = moduleX.bind(module1);
moduleOneX();
const moduleTwoX = moduleX.bind(module2);
moduleTwoX();

//coding challenge 1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registNewUser() {
    const choice = Number(
      prompt(`What is your favourite programming language?
    0: JavaScript
    1: Python
    2: Rust
    3: C++
    (Write option number)`)
    );
    if (choice >= 0 && choice <= 3 && typeof choice === 'number') {
      this.answers[choice]++;
    } else {
      alert('Invalid choice');
    }
    displayResults.call(poll, 'string');
    displayResults.call(poll, 'array');
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registNewUser.bind(poll));
function displayResults(choice) {
  if (choice === 'string') {
    console.log(`Poll Results are ${this.answers.toString()}`);
  } else {
    console.log(this.answers);
  }
}
//IIFE - Immediately Invoked Function Expressions
(function () {
  console.log('IIFE One');
})();

(() => {
  console.log('IIFE TWO');
})();

//closures
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
console.dir(booker);
booker();
console.dir(booker);
booker();
console.dir(booker);

//Example 1

//here since we have first called inner(), so the inner() function has got outer in its variable environment and outer has been assigned a function. Now here since the inner() function execution context came to end but still outer() has its variable enviromnent reference just because of closures.
//here since we have first called inner(), so the inner() function has got outer in its variable environment and outer has been assigned a function. Now here since the inner() function execution context came to end but still outer() has its variable enviromnent reference just because of closures.
//And also note here that it is mandatory that we call inner() first becuase outer() is in inner()'s execution context, so if we call outer() first before inner() JS will not get any context about what is outer() and will throw undefined error.
let outer;
const inner = function () {
  const a = 23;
  outer = function () {
    console.log(a * 2);
  };
};

inner();
outer();

//Example 2

//In this example, we have created an innerTwo function and in the innerTwo function we are again reasigning the outer variable to some other function. Now here we have first called above inner() function and then called the outer() function. And on the other hand we have first called innerTwo() function followed by again calling outer() function. Now here the trick is that we have assigned the outer variable two different functions at two different places.
const innerTwo = function () {
  const b = 777;
  outer = function () {
    console.log(b * 2);
  };
};
//in this step, the outer() function has its scope bind to inner function.
inner();
outer();
console.dir(outer);

//in this step, the outer() function has its scope bind to innerTwo function.
innerTwo();
outer();
console.dir(outer);

//Example 3
const boardPassengers = function (n, wait) {
  const peerGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${peerGroup} passengers`);
  }, wait * 1000);
  console.log(`will start boarding in ${wait}`);
};
boardPassengers(180, 3);
