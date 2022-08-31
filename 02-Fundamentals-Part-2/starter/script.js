"use strict";

// const { add } = require("@tensorflow/tfjs-layers/dist/exports_layers");

let hasDriversLicense = false;

const passTest = true;
if (passTest) {
  hasDriversLicense = true;
  console.log("hi");
} else console.log("Please pass the test");

//throws an error for using undeclared variable
// x = 3.14;
// console.log("hi hello");

//functions
//function definition

function logger() {
  console.log("This is logger function");
}
logger();
//calling or invoking or running a function
// console.log(logger());
//function declaration
function ReturnsSometing(x) {
  return x;
}
let xreturn = ReturnsSometing(25);
console.log(xreturn);

function add(x, y) {
  console.log(x + y);
}
add(2, 3);
function calculateAge(birthYear) {
  return 2037 - birthYear;
}

let myAge = calculateAge(1999);
console.log(myAge);

//function expression
let againAge = function (birthYear) {
  return 2037 - birthYear;
};

//arrow function
let againAge2 = () => {
  console.log("Hi Again");
};
againAge2();
const Again3 = (birthYear) => 2037 - birthYear;
console.log(Again3(1999));

//Arrays
const arr1 = [1, 2, 3, 4];
console.log(arr1);
const arr2 = new Array("Aniket", "Somesh", 1);
console.log(arr2);
const filterresult = arr1.filter((ele) => {
  if (ele > 2) return ele;
});
console.log(filterresult);
const findresult = arr1.find((ele) => {
  if (ele > 2) return ele;
});
console.log(findresult);
console.log(arr1[0]);
console.log(arr1.length);
console.log(arr1[arr1.length - 1]);
arr1[2] = 4;
console.log(arr1);
const firstName = "Aniket";
const aniket = [firstName, "Singh", 2022 - 1999, "SDE", arr1];
console.log(aniket);
console.log(aniket[4][0]);

//Exercise
const calcAge = (birthYearArray) => {
  const birthYearArray2 = [];
  let age;
  for (let i = 0; i < birthYearArray.length; i++) {
    age = 2022 - birthYearArray[i];
    birthYearArray2.push(age);
  }
  return birthYearArray2;
};
const birthYear = [1990, 2001, 2007, 2010];
console.log(calcAge(birthYear));

//array methods
//add element into array
//adding element to the last position
//push method returns new  array length
const LengthOfBirthYear=birthYear.push(2006);
console.log("Length of Birth Year is ",LengthOfBirthYear)

//adding element at first posisition
//unshift method returns new  array length
birthYear.unshift(1987);
console.log(birthYear);

//remove elements
//pop method removes last element and returns last element
const LastElement = birthYear.pop();
console.log(LastElement);
console.log(birthYear);

//unshift method removes first element and returns first element
const LastElementUnshift = birthYear.shift();
console.log(LastElementUnshift);
console.log(birthYear);

//indexof method return the index at which the element is present, if element is not present it returns -1
console.log(birthYear.indexOf(2007));

//ES6 feature, it checks whether an element is present in the array or not.
//it returns true if the element is present else returns false if the element is not present
console.log(birthYear.includes(207));
