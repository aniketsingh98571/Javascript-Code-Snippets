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
//includes uses strict equality operator which means 23==="23" returns false,it doesn't do type coercion
console.log(birthYear.includes(207));

//Javascript is case-sensitive, which means peter==="PETER" returns false, since they both are way different
console.log("peter"==="PETER")

const newArray=["Aniket",22,[[5,6],7]]
console.log(newArray[2][0][1])
console.log(newArray[2][1])

//Objects

//this syntax is called object literal syntax
const mySelf={
  firstName:"Aniket",
  lastName:"Singh",
  age:20,
  job:"SDE",
  bestFriend:"Somesh"
}
console.log(mySelf)

//accessing elements of Objects
//dot notation/dot operator
console.log(mySelf.lastName)

//bracket notation
console.log(mySelf["lastName"])

//Expressions for bracket notation
const nameKey="Name"
console.log(mySelf["first"+nameKey])
console.log(mySelf["last"+nameKey])

// const userInfo=prompt("What do you want to know about me,firstName or lastName or job")
// console.log(mySelf[userInfo])

//adding new properties to objects
//dot notation
mySelf.linkedin="aniketsingh98571"


//bracket notation
mySelf["github"]="aniketsingh98571"
console.log(mySelf)
const friends=["Somesh","Pushkar","Gitesh"]
console.log(`${mySelf.firstName} has ${friends.length} friends and his best friend is ${mySelf.bestFriend}`)

const mySelf2={
  firstName:"Aniket",
  lastName:"Singh",
   job:"SDE",
  birthYear:1999,
  bestFriend:"Somesh",
  friends:["Pushkar","Somesh","Gitesh"],
  hasDriversLicense:false,
  calcAge:function(){  //A method
    console.log(this) //since we are writing the method in the same object so this has reference to the object properties and hance we can 
    return 2027-this.birthYear;//access the propertios of object in the same object.
  }
}
console.log(mySelf2.calcAge())
console.log(mySelf2["calcAge"]())       // Accessing function with brackets notation

//storing the calcAge value to the same object
const mySelf3={
  firstName:"Aniket",
  lastName:"Singh",
  job:"SDE",
  birthYear:1999,
  bestFriend:"Somesh",
  friends:["Pushkar","Somesh","Gitesh"],
  hasDriversLicense:false,
  calcAge:function(){  //A method
      this.newAge=2027-this.birthYear;  //creating a new variable "newAge" inside same object with "this" keyword since "this" has reference
      return this.newAge                             //to "mySelf3" object.
  }
}
console.log(mySelf3.calcAge())
console.log(mySelf3["calcAge"]())
console.log(mySelf3.newAge);

const mySelf4={
  firstName:"Aniket",
  lastName:"Singh",
  job:"SDE",
  birthYear:1999,
  bestFriend:"Somesh",
  friends:["Pushkar","Somesh","Gitesh"],
  hasDriversLicense:false,
  checkDriverLicense:function(){
    if(this.hasDriversLicense)
      return "a"
    else
      return "no"
  },
  calcAge:function(){  //A method
    this.newAge=2027-this.birthYear;  
    return this.newAge                            
  },
  mySummary:function(){  //A method
      return `${this.firstName} is a ${this.calcAge()} old ${this.job}, and he has ${this.checkDriverLicense()} drivers
      licence  `
  }
}
console.log(mySelf4.mySummary())

//for loops
for(let i=1;i<=10;i++){
  console.log(` repetition ${i}`)
}

//using for loop to iterate and array
const customArray=["Daniel","Richer","Costaricka",55,42,true]
for(let i=0;i<customArray.length;i++){
  console.log(customArray[i])
}
const newArray1=[];
for(let i=0;i<customArray.length;i++){
  const type=typeof(customArray[i])
  newArray1.push(type)
}
console.log(newArray1)

//continue keyword ---->it skips a particular iteration based on specified condition
const newArray2=["Aniket","Chris","Hola","Cola"]
for(let i=0;i<newArray2.length;i++){
  if(newArray2[i]==="Chris")
    continue;
  else  
    console.log(newArray2[i])
}

//break keyword - it breaks the loop and come out of loop if a condition is met.
const newArray3=["Aniket","Chris","Hola","Cola"]
for(let i=0;i<newArray3.length;i++){
  if(newArray3[i]==="Chris")
    break;
  else  
    console.log(newArray3[i])
}

//backward looping
const newArray4=["Aniket","Chris","Hola","Cola"]
for(let i=newArray4.length-1;i>=0;i--){
  console.log(newArray4[i])
}

//Nested Loops
let counter=0;
for(let i=0;i<3;i++){
  for(let j=0;j<5;j++){
    counter++;
    console.log("Repetition Number "+counter)
  }
}

//while loop
let i=1;
while(i<=10){
  console.log("Repetion Number "+i)
  i++;
}

let dice=Math.trunc(Math.random()*6)+1
console.log(dice)
while(dice!==6){
  console.log("You rolled "+dice)
  dice=Math.trunc(Math.random()*6)+1
}

