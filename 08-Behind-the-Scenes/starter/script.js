'use strict';

//this function is present in global scope.
// birthYear is function scoped.
//age is block scoped

let sum = 6;
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName);
  function printAge() {
    //age variable will be accessible in this function since printAge() is the child function and calcAge() is the parent function,
    //so according to scope chain and variable look up, age will be accessible since it is in the outer parent environment.
    //birthyear follows the same rules as age does

    //firstName will also be accessible since its scope is present in calcAge() so what that means is that printAge() can also access
    //firstName
    let output = `${firstName} age is ${age}`;
    console.log(output);
    if (birthYear === 1991) {
      //as we know that firstName is being used in parent function too, so what we think that this will not work but actually,
      //in the scope chain, the block first performs variable lookup in its own block, if its find the variable then it uses it
      //else move upwards
      const firstName = 'Steven';

      //var variables are function scoped
      var millenial = `omg, you are millenial ${firstName} at age of ${age}`;

      //let and const variables are block scoped
      const str = `omg, you are millenial ${firstName} at age of ${age}`;

      //this will be accessible in the "if" block only
      function add(a, b) {
        return a + b;
      }

      //In this we are re-assigning the value of a variable of the outer scope, so since this block has access to it outer scope environment so it will work and update the value.
      output = 'New Output';

      //if we declare a new variable with the same name as variable of outer scope so, after accessing it outside of the scope
      //it will take the value of outer scope only.
      // const output = 'New Output 2';
    }
    console.log(output);

    //this will not work because functions are block scoped that too in strict mode, so it cannot be accessed outside of the block
    //in which it is defined
    // add();

    //this will work because var variables are function scoped so if they are defined in a block scope they still can be accessed outside of it
    console.log(millenial);

    //this will throw an error because let and const variables are block scoped what that means is they cannot be accessed outside
    //of their block.
    // console.log(str);
  }
  printAge();
  return age;
}

//firstName is a variable defined in global scope, so it will be accessible in the calcAge() via variable lookup
// const firstName = 'Aniket';
// calcAge(1991);

//we cannot access this, since its defined in block scope and also scope chain works from bottom to top, not top to bottom so what that means is age is in child environment and we are accessing it globally which cannot be done
// console.log(age);

//Hoisting in JS
//Starting TDZ for let and const
// console.log(' printing me before declaration ', me); //var hoisting print undefined
// console.log('printing job before declaration ', job); //let hoisting print reference error
// console.log('printing birthYear before declaration ', birthyear); //const hoisting print reference error
var me = 'Aniket';
let job = 'SDE'; //End of TDZ of let
const birthyear = 1991; //End of TDZ of const
printName(); //because of hoisting we can easily access functions declaration before their definition
// printJob(); //works the same way as let hoisting
// printJob();
// printBirthYear()//works the same way as const hoisting, this is in the TDZ
// printJobAgain(); //works the same way as let hoisting this is in the TDZ
// printBirthYearAgain(); //works the same way as const hoisting, this is in the TDZ

// NameAgain(); // since NameAgain is a var hoisting, so it returns undefined here and then we are calling undefined here which in turn returns "not a function" error.
// printNameAgain(); // since printNameAgain is a var hoisting, so it returns undefined here and then we are calling undefined here which in turn returns "not a function" error.
function printName() {
  //function declaration
  console.log(me);
}
let printJob = () => {
  //arrow function
  console.log(job);
};
const printBirthYear = () => {
  //arrow function
  console.log(birthyear);
};
let printJobAgain = function () {
  //anonymous function or function expression
  console.log(job);
};
const printBirthYearAgain = function () {
  //anonymous function
  console.log(birthyear);
};
var NameAgain = function () {
  //anonymous function
  console.log(me);
};
var printNameAgain = () => {
  //arrow function
  console.log(me);
};

if (true) {
  var name12 = 'Yo Somesh';
}
if (true) {
  let name13 = 'Hi Aniket';
}
// console.log(name13); //cannot be accessed since let is blocked scope
console.log(name12); //can be accessed beacuse var is function scoped so if declared inside blocked scope it can be accessed outside
function testThis() {
  console.log(this);
}

testThis();

//this keyword in practice
console.log(this); //window object
function checkThis() {
  console.log(this); //undefined because we are in strict mode, otherwise it should be window object. Normal function calls returns undefined for this keyword
}
const checkThis1 = () => {
  console.log(this); //arrow functions does not has its own 'this' keyword, so the arrow function uses the 'this' keyword of its lexical scope or parent scope this keyword, here it will be window object.
};
checkThis1();
const aniket = {
  birthyear: 1991,
  calcAge: function () {
    console.log(1997 - this.birthyear); //here 'this' refers to aniket object so 'this.birthyear' will be 1991
    function checkMillenial() {
      console.log(this);
    }
    checkMillenial(); //as we know that if we simply call a function and inside the function definition if we accessing this then it will return undefined because simple function calls return undefined even though they are defined inside methods

    const checkMillenial2 = () => {
      console.log(this);
    };
    checkMillenial2(); //here we will be able to access jonas object, because as we know that 'this' is not supported in arrow functions, so the function takes the reference from the 'this' of its parent function.
  },
};
console.log(aniket.calcAge());
const matilda = {
  birthyear: 2017,
};
matilda.calcAge = aniket.calcAge; //borrowing the function calcAge of aniket
console.log(matilda.calcAge()); //now here the 'this' will reference to matilda object, this is the reason we say that 'this' is not static, it changes based on how we call the function
const function2 = matilda.calcAge;
// function2(); //since its a function declaration so inside of the function, if we access 'this', it will be undefined
// var firstName = 'Honal';
var firstName = 'Honal2'; //variable created with var keyword gets stored in window object if declared globally
console.log(this);
aniket.firstName = 'Aniket';
aniket.greet = () => {
  console.log(this.firstName); //if we have a firstName variable declared in global scope with var keyword, then here this will refer to window object and inside window object there will be firstName variable , so here Honal2  will be printed
};
aniket.greet();
//since greet is an arrow function and as we know arrow functions does not support 'this' keyword so it will look for its parent 'this' so the parent of greet function will be window object, but the window object does not contain the firstName variable since firstName is blocked scoped so it will return undefined

const addExp = function (a, b) {
  console.log(arguments); //arguments array is present only for function declaration and expressions but not for arrow functions
  return a + b;
};
console.log(addExp(5, 4));

//primitives vs reference types
let age = 11;
const newAge = age;
age = 12;
console.log(age);
console.log(newAge);
const Object1 = {
  name: 'Conor',
  age: 25,
};
const Object2 = Object1;
Object2.age = 30;
console.log(Object1);
console.log(Object2);
