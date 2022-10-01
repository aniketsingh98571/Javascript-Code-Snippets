'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (startedIndex, mainIndex) {
    return [this.starterMenu[startedIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery:function({starterIndex=1,mainIndex=0,time="22:00",address}){
    console.log(`Order delivered to ${address} at ${time} with ${this.categories[starterIndex]} and ${this.mainMenu[mainIndex]}`)
  },
  orderPasta:function(ing1,ing2,ing3){
    console.log(`here is your pasta with ${ing1},${ing2},${ing3}`)
  }
};

//Array Destructuring
const array1 = [1, 2, 3, 4];
//without destructuring
const a = array1[0];
const b = array1[1];
console.log('Without destructuring a', a);
console.log('without destructuring b', b);

//With destructuring
const [x, y, z] = array1;
console.log('With destructuring x', x);
console.log('WIth destructuring y', y);

const [first, second] = restaurant.categories;
console.log(first);
console.log(second);

const [firstDish, , thirdDish] = restaurant.categories; //if we want to skip second dish
console.log(firstDish);
console.log(thirdDish);

//swapping two values
let [firstValue, secondValue] = restaurant.categories;
//before swapping
console.log('Before Swapping');
console.log(firstValue);
console.log(secondValue);

//Approach 1 - Swapping
let temp;
temp = firstValue;
firstValue = secondValue;
secondValue = temp;
//After swapping with Approach 1
console.log('After Swapping');
console.log(firstValue, secondValue);

//Swapping Approach-2
let [firstValue1, secondValue1] = restaurant.categories;
console.log('Before Swapping with Approach 2');
console.log(firstValue1, secondValue1)
// [firstValue1, secondValue1] = [secondValue1,firstValue1];
console.log('After Swapping with Approach 2');
console.log(firstValue1, secondValue1);

const [starterDish, mainDish] = restaurant.order(2, 1);
console.log('Started Dish is ', starterDish);
console.log('Main Dish is ', mainDish);

//destructuring for nested arrays
const nested=[2,4,[5,6]]
//accessing 1st element and the nested array using destructuring.
const [nestedEleOne,,nestedEleTwo]=nested
console.log(nestedEleOne,nestedEleTwo)

//accessing individual elements from nested array using nested destructuring
const [nestedEle1,,[nestedEle21,nestedEle22]]=nested
console.log(nestedEle1,nestedEle21,nestedEle22)

//suppose if we dont have all the elements in the array but still accessing the elements using destructuring,so the uninitialized value will return undefined.

//In this case as you can see, we have our original right hand side array with only two elements but on the left handside we are destructuring it using three values, so the third value i.e 'k' will return undefined.
const [i,j,k]=[8,9]
console.log(i,j,k)

//In order to solve above problem of undefined, we can initialize the destructuring variables with a default value.
//In this case, as we can see we only have two values in the original array of right hand side and we are trying to destructure it using three variables, but now for the third value we have a default value setted, so we will not get undefined for it instead it will print 1
//if the destructure values dont have any value then default value will be used else the original array values will be used.
const [p=1,q=1,r=1]=[8,9]
console.log(p,q,r)

//Destructuring Objects
//Note:- In object destructuring, the name of destructuring variables should be same like the names which are defined in the object.
//as we can see below, the categories and openingHours are the destructuring variable name which are same like the ones which are defined in restaurant object.
//if we do not give the same variable name just like defined in the original object, it will return undefined
const {categories,openingHours}=restaurant
console.log(categories,openingHours)

//if we want to still give some other variable names to the destructuring variables in object destructuring, then we can do something like this but dont forget that we have to still reference the variable names which are defined in the object
//here myCategories and myOpeningHours are the aliasing names for categories and openingHours
const {categories:myCategories,openingHours:myOpeningHours}=restaurant
console.log(myCategories,myOpeningHours)

//suppose if we dont know some properties of an object initially and then if we use it then it will return  undefined.
//So inorder to prevent it, we can assign default values to our destructuring variables

//here since in our restaurant object, we dont have any property named "starterMen", so we will initialize it with empty object and give it a alias called 'starters'
const {name={},starterMen:starters={}}=restaurant
console.log(name,starters)

//nested objects
const {openingHours:openingHours2}=restaurant
console.log(openingHours2)
//accessing properties inside of a 'fri' property
const {fri:{open,close}}=openingHours2

console.log(open,close);

//we are calling the function with a object, but during function definition we dont have to worry about the whole object since we can destructure it with the object propeties and access it.
restaurant.orderDelivery({time:"23:00",address:"Nashik"})

//Spread Operators
const arr2=[1,2,3,4,5,6]
console.log(...arr2) //if we try to access the array with spread operator it will return individual elements of array
const arr3=[...arr2,7,8,9]  //here we are using spread operator to create a new array with all elements of arr2 with some more extra elements
console.log(arr3)
const newMenu=[...restaurant.mainMenu,"idli","dosa"]
console.log(newMenu)

//copy array
const newMenu2=[...restaurant.mainMenu]

//merging two arrays with spread operator
const mergedArray=[...newMenu,...newMenu2]
console.log(mergedArray)

//strings are also iterable so we can apply spread operator over the string to get its individual letters
const str1="Aniket"
const newStr=[...str1,'','S']
console.log(newStr)
console.log(...str1)

//using spread operators in function call
const ingredients=[prompt("ing1?"),prompt("ing2?"),prompt("ing3?")]
console.log(ingredients)
restaurant.orderPasta(...ingredients)

//using spread operator in objects
const restaurantCopy={...restaurant}
console.log(restaurantCopy)