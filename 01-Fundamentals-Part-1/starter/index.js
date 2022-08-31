let js = "amazing";

//declaring and initialization of variable
let firstName = "Jonas";
console.log(firstName);

let _name = 5;
console.log(_name);

let $name = 5;
console.log($name);

//Data types
let aNumber = 7; //Number
console.log("I am a number ", aNumber);
let aString = "Aniket"; //String
console.log("I am a string ", aString);
let aBoolean = "True"; //boolean
console.log(" I am a boolean ", aBoolean);
let aUndefined; //undefined
console.log(" I am a undefined ", aUndefined);

//assigning different value of different type to the same variable
//dynamic typing
aString = 5;
console.log(aString);

//typeof operator
console.log(typeof true);
console.log(typeof aNumber);
console.log(typeof aString);
console.log(typeof aUndefined);
console.log(typeof null);

//declaring variables-let const and var
let age = 30;
age = 31;

const birthYear = 2001;
// birthYear = 2002; //not allowed
console.log(birthYear);

//operators in javascript
//arithmetic operators
const personAge = 2037;
const birthAge = 1992;
const Age = 2037 - 1992;
console.log(Age);

let number1 = 5;
let number2 = 6;
const multiply = number1 * number2;
console.log(multiply);

//5^6
const exponentiation = 5 ** 6;
console.log(exponentiation);

let number3 = 12;
let number4 = 6;
const divide = number3 / number4;
console.log(divide);

const modulo = 12 % 6;
console.log(modulo);

let string1 = "Aniket";
let string2 = "Singh";
const finalString = string1 + " " + string2;
console.log(finalString);

let x = 10 + 5;
console.log(x);

//x=x+10
console.log((x += 10));

console.log((x -= 5));

//x=x+1
x++;
console.log(x);

//x=x-1
x--;
console.log(x);

let ageJonas = 46;
let ageHora = 25;
console.log(46 > 25);
console.log(46 < 25);

const myName = "Aniket";
const yourName = "Aniket";
console.log(myName == yourName);

//operator precedence
console.log(15 - 2 > 13 + 5);
let a, b;
a = b = 25 - 10 - 4;
console.log(a, b);

let c = (25 + 25) / 50;
console.log(c);

//string and template litearal
const Name = "Aniket";
const job = "Software Engineer";
const myBirthYear = 1999;

const fullSentence =
  "My name is " +
  Name +
  " I am a " +
  job +
  "I am " +
  (2022 - myBirthYear) +
  " years old";
console.log(fullSentence);

//template literal
const newfullSentence = `I am ${Name}, I am a ${job}. I am ${
  2022 - myBirthYear
} years old`;
console.log(newfullSentence);

const myAge = 17;
const isOldEnough = myAge >= 18;
if (isOldEnough) {
  console.log("Driver license Granted");
} else {
  console.log("Not allowed driver license");
}
const myBirthYear1 = 1999;
let century;
if (myBirthYear1 < 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

//type conversion and coercion
//coercion==implicit conversion
const value1 = "9";
const value2 = 5;
let sum = value1 + value2;
console.log(sum);

//explicit conversion
const value3 = "9";
const value4 = 5;
let sum1 = Number(value3) + value4;
console.log(sum1);

console.log(18 + "19");
//here javascript converted the string "23" into number and then performed the subtraction operation
console.log("23" - 18 - 5);

//truthy and falsy values
console.log(Boolean(0));
console.log(Boolean(NaN));
console.log(Boolean(undefined));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(1));
console.log(Boolean("jonas"));
console.log(Boolean(5));
console.log(Boolean({}));
console.log(Boolean([]));

const money = 0;
if (money) {
  console.log("Paise udao mat");
} else {
  console.log("You should get a Job!");
}

//== vs ===
const yourAge = 18;
if (yourAge == 18) {
  console.log("You are adult");
}

//boolean logic
const hasDriversLicense = true;
const hasGoodVision = true;
console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense && hasGoodVision);
console.log(!hasDriversLicense);
const shouldDrive = hasDriversLicense && hasGoodVision;
if (shouldDrive) {
  console.log("You can drive");
} else {
  console.log("You cannot drive");
}

//switch statement
const day = "thursday";
switch (day) {
  case "monday":
    console.log("It's monday");
    console.log("Off the weekend");
    break;
  case "tuesday":
    console.log("It tuesday");
    break;
  case "wednesday":
    console.log("It wednesday");
    break;
  case "thursday":
  case "friday":
    console.log("Close to weekend");
    break;
  default:
    console.log("Not a valid day");
}

//statements and expressions
3 + 4;

//ternary operator
let harryAge = 23;
harryAge >= 18
  ? console.log("You are allowed for license")
  : console.log("You are not allowed");

const drink = age >= 18 ? "wine" : "water";
console.log(drink);

console.log(`I like to drink ${age >= 28 ? "wine" : "water"}`);
