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
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '22:00',
    address,
  }) {
    console.log(
      `Order delivered to ${address} at ${time} with ${this.categories[starterIndex]} and ${this.mainMenu[mainIndex]}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`here is your pasta with ${ing1},${ing2},${ing3}`);
  },
  orderPizza: function (mainIng, ...restIng) {
    console.log(mainIng, restIng);
  },
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
console.log(firstValue1, secondValue1);
// [firstValue1, secondValue1] = [secondValue1,firstValue1];
console.log('After Swapping with Approach 2');
console.log(firstValue1, secondValue1);

const [starterDish, mainDish] = restaurant.order(2, 1);
console.log('Started Dish is ', starterDish);
console.log('Main Dish is ', mainDish);

//destructuring for nested arrays
const nested = [2, 4, [5, 6]];
//accessing 1st element and the nested array using destructuring.
const [nestedEleOne, , nestedEleTwo] = nested;
console.log(nestedEleOne, nestedEleTwo);

//accessing individual elements from nested array using nested destructuring
const [nestedEle1, , [nestedEle21, nestedEle22]] = nested;
console.log(nestedEle1, nestedEle21, nestedEle22);

//suppose if we dont have all the elements in the array but still accessing the elements using destructuring,so the uninitialized value will return undefined.

//In this case as you can see, we have our original right hand side array with only two elements but on the left handside we are destructuring it using three values, so the third value i.e 'k' will return undefined.
const [i, j, k] = [8, 9];
console.log(i, j, k);

//In order to solve above problem of undefined, we can initialize the destructuring variables with a default value.
//In this case, as we can see we only have two values in the original array of right hand side and we are trying to destructure it using three variables, but now for the third value we have a default value setted, so we will not get undefined for it instead it will print 1
//if the destructure values dont have any value then default value will be used else the original array values will be used.
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

//Destructuring Objects
//Note:- In object destructuring, the name of destructuring variables should be same like the names which are defined in the object.
//as we can see below, the categories and openingHours are the destructuring variable name which are same like the ones which are defined in restaurant object.
//if we do not give the same variable name just like defined in the original object, it will return undefined
const { categories, openingHours } = restaurant;
console.log(categories, openingHours);

//if we want to still give some other variable names to the destructuring variables in object destructuring, then we can do something like this but dont forget that we have to still reference the variable names which are defined in the object
//here myCategories and myOpeningHours are the aliasing names for categories and openingHours
const { categories: myCategories, openingHours: myOpeningHours } = restaurant;
console.log(myCategories, myOpeningHours);

//suppose if we dont know some properties of an object initially and then if we use it then it will return  undefined.
//So inorder to prevent it, we can assign default values to our destructuring variables

//here since in our restaurant object, we dont have any property named "starterMen", so we will initialize it with empty object and give it a alias called 'starters'
const { name = {}, starterMen: starters = {} } = restaurant;
console.log(name, starters);

//nested objects
const { openingHours: openingHours2 } = restaurant;
console.log(openingHours2);
//accessing properties inside of a 'fri' property
const {
  fri: { open, close },
} = openingHours2;

console.log(open, close);

//we are calling the function with a object, but during function definition we dont have to worry about the whole object since we can destructure it with the object propeties and access it.
restaurant.orderDelivery({ time: '23:00', address: 'Nashik' });

//Spread Operators
const arr2 = [1, 2, 3, 4, 5, 6];
console.log(...arr2); //if we try to access the array with spread operator it will return individual elements of array
const arr3 = [...arr2, 7, 8, 9]; //here we are using spread operator to create a new array with all elements of arr2 with some more extra elements
console.log(arr3);
const newMenu = [...restaurant.mainMenu, 'idli', 'dosa'];
console.log(newMenu);

//copy array
const newMenu2 = [...restaurant.mainMenu];

//merging two arrays with spread operator
const mergedArray = [...newMenu, ...newMenu2];
console.log(mergedArray);

//strings are also iterable so we can apply spread operator over the string to get its individual letters
const str1 = 'Aniket';
const newStr = [...str1, '', 'S'];
console.log(newStr);
console.log(...str1);

//using spread operators in function call
// const ingredients=[prompt("ing1?"),prompt("ing2?"),prompt("ing3?")]
// console.log(ingredients)
// restaurant.orderPasta(...ingredients)

//using spread operator in objects
const restaurantCopy = { ...restaurant };
console.log(restaurantCopy);

//adding new property to an existing object.
const restaurantCopy1 = { ...restaurant, hobby: 'singing' };
console.log(restaurantCopy1);

//REST Operator
//Note-Spread operator is used to unpack all values from arrays or objects, while REST is used to pack the values in arrays or objects.
//Spread is mostly used on right handside of equal sign while REST is used at left handside of equal sign.

//Spread Example:-
const arr1 = [1, 2, 3, 4];
const arr21 = [...arr1, 5, 6];
console.log(arr21);

//REST Example with destructuring
//As we can see here that we have used REST operator to pack remainig elements of an array.
const [ele1, ele2, ...others] = [1, 2, 3, 4, 5, 6];
console.log(ele1, ele2, others);

//REST with spread operator
//On the left side is REST Operator
//On the right hand side is Spread Operator
//Note:-The REST operator should be at the last during destructuring
const [p1, q1, ...otherDishes] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(p1, q1, otherDishes);

//REST with objects
const { name: myname, ...restObject } = restaurant;
console.log(myname, restObject);

//REST in function
//REST operator is used in function definition to pack all the arguments into an array.
//While spread operator is used in function call to unpack all the elements and pass them individually
//REST operator example below in  function definition
const add = function (...params) {
  console.log(params);
};
add(1, 2);
add(1, 2, 3);
add(1, 2, 3, 4);
add(1, 2, 3, 4, 5);

//spread operator example below in function call
const x1 = [1, 2, 3, 4, 7];
add(...x1);

restaurant.orderPizza('mushroom', 'capsicum', 'chilli', 'honey');
let sum = 2;
sum += 4;
console.log(sum);

//coding challenge

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: [
    'Lewandowski',
    'Gnarby',
    'Lewandowski',
    'Hummels',
    'Gnarby',
    'Aniket',
    'Hummels',
    'Aniket',
  ],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
const [players1, players2] = game.players;
console.log(players1, players2);
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Coutinho', 'tiago', 'perisic'];
const {
  odds: { team1, x: draw, team2 },
} = game;
const printGoals = function (...players) {
  console.log(players.length + ' goals were scored');
};
printGoals('Davies', 'Muller', 'Levandewski', 'kimich');
printGoals('Daves', 'Miller');
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

//for-of loop
const menu = [...restaurant.starterMenu];
for (const item of menu) {
  console.log(item);
}

//for-of loop doesn't provide any mechanism to get the index of an element in array, so inorder to get the index of elements in for-of loop refer below:-
//'.entries' function returns the elements of array in key-value pair of index with element at that index in another array form
for (const [index, item] of menu.entries()) console.log(item);
console.log(menu.entries());

//Enhanced Object Literal
const obj2 = {
  occupation: 'SDE',
  work: 'Frontend',
};
const games = ['cricket', 'football'];
//adding another variable as property directly in an object is called Enhanced Object literal
const obj1 = {
  name: 'Aniket',
  age: 22,
  hobby: ['cricket', 'music'],
  obj2,
  games,
};
console.log(obj1);

//In normal javascript object, we would define a function something like below:-
const obj3 = {
  name: 'Aniket',
  age: 21,
  hobby: ['cricket', 'football'],
  yourName: function () {
    console.log(this.name);
  },
};
obj3.yourName();

//But using Enhanced Object Literal, functions can be written like below:-
const obj4 = {
  name: 'Aniket',
  age: 21,
  hobby: ['cricket', 'football'],
  yourName() {
    console.log(this.name);
  },
};
obj4.yourName();

//we can also do some computation in the object with the help of enhanced object literal. Initially when javascript was introduced, computation in objects was not possible but with enhanced object literal it is possible now.
const runs = [4, 5, 6];
const obj5 = {
  [2 + 2]: 'aniket',
  age: 25 + 2,
  [runs[2]]: 'runs',
};
console.log(obj5);

//Optional Chaining
const obj7 = {
  name: 'Bob',
  work: 'builder',
  age: 25,
  yourName() {
    console.log(this.name);
  },
  hobby: {
    one: 'Cricket',
    two: 'Football',
  },
};

//here we are using optional chaining operator to check if yourName function is present in obj7 or not, if not present undefined will be returned else function will be called
obj7.yourName?.();

//here we are using optional chaining operator to check if hobby object is present in obj7 or not, if present then we will access one property of hobby object else undefined will be returned
console.log(obj7.hobby?.one);

//here since obj7 does not contain current property so it will not further proceed to access value property instead returns undefined
console.log(obj7.current?.value);

//Iterating over Objects
const iterate = Object.keys(restaurant.starterMenu);
console.log(iterate);
console.log(Object.values(obj7));
const entries = Object.entries(obj7);
console.log(entries);
const arr7 = [1, 2, 3];
for (const data of arr7.entries()) {
  console.log(data);
}

//Coding Challenge 2
for (const [goalNo, playerName] of game.scored.entries()) {
  console.log(`Goal ${goalNo} ${playerName}`);
}

const oddsEntries = Object.entries(game.odds);
console.log(oddsEntries);
let average = (sum = 0);
for (const [property, [value, name]] of oddsEntries.entries()) {
  sum = sum + name;
}
console.log(sum);
average = sum / oddsEntries.length;
console.log(average);
const printOddsEntries = Object.entries(game.odds);
for (const [index, [property, value]] of printOddsEntries.entries()) {
  console.log(`Odd of victory ${game[property] || 'draw'}: ${value}`);
}
const scorers = {};
for (let i = 0; i < game.scored.length; i++) {
  let count = 1;
  for (let j = i + 1; j < game.scored.length; j++) {
    if (game.scored[i] === game.scored[j]) {
      count++;
      game.scored[j] = -1;
    }
  }

  if (game.scored[i] !== -1) scorers[game.scored[i]] = count;
}
// scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
console.log(scorers);

//SETS in JS
//SETS contains only unique elements, SETS are also iterables like arrays and objects
//Even if we add duplicate elements in set but during pringting it will consider only unique ones.
//Since JS is case-sensitive 'Pasta' and 'pasta' are different
//Set is basically an object which takes arrays as input
//In SET, elements are randomly placed
const orderedSet = new Set(['Pasta', 'Pizza', 'Pumpkin', 'Pizza', 'pasta']);
const orderSet2 = new Set([1, 2, 3, 4, 1]);
console.log(orderSet2);
console.log(orderedSet);

//checking size of SET
console.log(orderedSet.size);

//checking if an element is present in SET or not
console.log(orderedSet.has('Pizza'));
console.log(orderedSet.has('Bruschetta'));

//adding element in the SET
orderedSet.add('Bruschetta');
console.log(orderedSet);

//deleting element in SET
orderedSet.delete('Pizza');
console.log(orderedSet);

//looping over the SET
for (const data of orderedSet) console.log(data);

//clearing the entire set
orderedSet.clear();
console.log(orderedSet);

//Usecase for SET- suppose if we want an array with only unique elements then we can use set.
const staff = ['Pankaj', 'Mohammad', 'Ismail', 'Pankaj', 'Kendra', 'Ismail'];
//since we want an array, thats why we have used spread operator here
const staffSet = [...new Set(staff)];
console.log(staffSet);

//Maps in JS
//In object, the keys are string. We cannot assign any other data-type as keys in objects.
//In object, if we add same key name multiple times then it will take the last key and its value.
const obj8 = {
  1: 'Aniket',
  Hi: 'Singh',
  Hi: 'Hello',
};
console.log(obj8);
console.log(typeof Object.keys(obj8));
//As we can see
for (const data of Object.keys(obj8)) console.log(typeof data);

const rest = new Map();
rest.set('name', 'Italian');
rest.set(1, 'Italian');
rest.set(1, 'Italian1');
console.log(rest);
for (const [data, value] of rest) {
  console.log(typeof data);
}

//getting values from map
console.log(rest.get('name'));

//checking if a key is present or not in map
console.log(rest.has('name'));

//deleting a key with its value from map
rest.delete(1);
console.log(rest);

//checking the size of map
console.log(rest.size);

//clearing the entire map
rest.clear();
console.log(rest);

//Initializing Map
const rest2 = new Map([
  [1, 'One'],
  [2, 'Two'],
  [3, 'Three'],
]);
console.log(rest2);

//Iterating over Maps
for (const [key, value] of rest2) console.log(value);

//converting a map into an array
const mapArray = [...rest2];
console.log(mapArray);

//Data Structure in JS as of now
//1. Array  2. Object  3.Set  4. Map

//Coding CHhallenge 3
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);
const bufferEvents = [];
for (const [key, value] of gameEvents) {
  bufferEvents.push(value);
}
console.log(bufferEvents);
const events = [...new Set(bufferEvents)];
console.log(events);
gameEvents.delete(64);
console.log(gameEvents);

for (const [key, value] of gameEvents) {
  if (key <= 90) {
    console.log('An event happened, on average, every 9 minutes', value);
  }
}
for (const [key, value] of gameEvents) {
  if (key <= 45) {
    console.log(`[FIRST HALF] ${key}: ${value}`);
  } else {
    console.log(`[SECOND HALF] ${key}: ${value}`);
  }
}

//Strings
const airline = 'Tap Air Portugal';
const plane = 'A321';
//strings in JS are arrays in which elements can be acccessed by indexes
console.log(airline[0]);
console.log(plane[3]);
console.log('Aniket'[2]);

//getting length of string
console.log(plane.length);
console.log(airline.length);

//getting index at which a particular character or word is present.
//indexOf returns only first occurence of the character or word
console.log(airline.indexOf('p'));
console.log(airline.indexOf('Portugal'));

//to get the lastindex of which the element is present, use the below code
console.log(airline.lastIndexOf('r'));

//slice method is used to extract some part of the string.
//it makes use of imdexes of string to extract characters
//the first parameter of slice is the started index of string and the second parameter is ending index of string like till where we have to extract it.
//slice always ignores the last index value and calculates the string with lastindex-1
console.log(airline.slice(0, 2));

//indexOf can be used with slice to get your first name and last name -a usecase
const myName = 'Aniket Singh';
//to get the firstName
console.log(myName.slice(0, myName.indexOf(' ')));
//to get the lastName
console.log(myName.slice(myName.indexOf(' ') + 1));
const checkMiddleSeat = seat => {
  //B and E are middle seat
  const lastChar = seat.slice(-1);
  if (lastChar === 'B' || lastChar === 'E') {
    console.log('It is a middle seat');
  } else {
    console.log('It is not middle seat');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

//we can use negative indexes with slice to extract characters from end of the string
console.log(myName.slice(-1));

//Well you may be curious how we can access functions on strings, since strings are primitive types. When we create a string, JS internally converts it into a string object something like below":-
console.log(typeof new String('Aniket'));
//After a particular operation is done on the string, the functions returns the string in primitive type

//Also note that strings are immutable in JS since they are primitve types, so if we are using any functions on strings that do some operations it does not affect the original string.

//UPPERCASE and LOWERCASE
const myName2 = 'Aniket';
//lets convert it into UPPERCASE
console.log(myName2.toUpperCase());
console.log(myName2);

//lets convert it to lowercase
console.log(myName2.toLowerCase());

//Suppose you receive a input like "aNiKet", and you want to convert it into "Aniket", then follow below steps:-
const myName3 = 'aNiKet';
const LowerName = myName3.toLowerCase();
const FirstUpper = LowerName[0].toUpperCase() + LowerName.slice(1);
console.log(FirstUpper);

//Suppose you have a string named " aniket" and you want to remove the whitespace from the string.
const myName4 = ' aniket';
console.log(myName4.trim());

//Suppose some user inputs his email as " aniKeT@SinGH", but we wanted "aniket@singh", follow below steps to achieve it
const email = ' aniKeT@SinGH';
//since when we apply any operation on strings using some functions, that function returnss the new string and then again we can apply some other function to the string, this is called chaining.
const properEmail = email.toLowerCase().trim();
console.log(properEmail);

//Suppose you want to replace "#" in an email with '@' becuase that is correct one :D , follow below steps:-
const myEmail = 'aniket#singh';
console.log(myEmail.replace('#', '@'));

//replace only replaces first occurrence of letter or word
const myEmail2 = 'aniket singh is earning 12# but he returns 15#';
//In this only 12# will convert to 12$ but 15# will not convert, since replace works on first occurence of a letter.
console.log(myEmail2.replace('#', '$'));

//In order to prevent, single occurrence replacement we use replaceAll
console.log(myEmail2.replaceAll('#', '$'));

const myName12 = 'Aniket Singh';
console.log(myName12.replace('Singh', 'Chaudhari'));
//checking if particular substring is present in string or not
const name7 = 'Aniket Singh';
console.log(name7.includes('ket'));
console.log(name7.includes(''));
console.log(name7.includes('nik'));

//check if a string starts with a particular substring
//it takes first word of string into account
const name8 = 'Aniket kumar Singh';
console.log(name8.startsWith('Ani'));
console.log(name8.startsWith('Anik'));

//check if a string ends with a particular substring
//it takes last word of string into account
const name9 = 'Aniket Singh';
console.log(name9.endsWith('Singh'));
console.log(name9.endsWith('h'));
console.log(name9.endsWith('kumar'));

const checkBaggage = items => {
  const newItem = items.toLowerCase();
  if (newItem.includes('knife') || newItem.includes('gun')) {
    console.log('You are not allowed');
  } else {
    console.log('You are allowed,Welcome');
  }
};
checkBaggage('I have a laptop, some food and a pocket knife');
checkBaggage('Socks and Camera');
checkBaggage('Got some snacks and a gun for protectors');

//Split in Strings
const sentenceTwo = 'A-very-interesting-string';
console.log(sentenceTwo.split('-'));
const sentenceOne = 'Aniket Singh';
console.log(sentenceOne.split('', 2));
const sentenceThree = 'JS is fun';
console.log(sentenceThree.split(' ', 1));

//Join in Strings
const sentenceFour = ['JS', 'is', 'again'];
console.log(sentenceFour.join(' '));
console.log(sentenceFour.join(''));
console.log(sentenceFour.join('-'));
console.log(sentenceFour.join('You know'));
const sentenceFive = ['Mr.', 'Aniket', 'Singh'];
console.log(sentenceFive.join(' '));
let nameMe = [];
//Making First Letter of each word capital
const capitalize = word => {
  const names = word.split(' ');
  for (const data of names) {
    console.log('Single', data);
    nameMe.push(data[0].toUpperCase() + data.slice(1));
  }
  console.log(nameMe.join(' '));
};
capitalize('aniket singh');

//padding in strings
//padding is useful in masking the credit card number on websites
const name71 = 'Aniket';
console.log(name71.padStart(4, '*'));

//coding challenge 4
const camelCaseList = [];
const convertToUnderScore = variableList => {
  for (const name of variableList) {
    const lowerName = name.toLowerCase();
    const [firstName, secondName] = lowerName.split('_');
    const updatedString =
      firstName + secondName[0].toUpperCase() + secondName.slice(1);
    camelCaseList.push(updatedString);
  }
  console.log(camelCaseList);
};
convertToUnderScore([
  'underscore_case',
  'first_name',
  'Some_Variable',
  'calculate_AGE',
  'delayed_departure',
]);
//underscoreCase firstName someVariable calculateAge delayedDeparture

//coding challenge 4.1
const flightFormat = schedule => {
  const removePlus = schedule.split('+');
  const removedUnderscore = [];
  const journeyTrack = [];
  console.log(removePlus);
  for (const data of removePlus) {
    removedUnderscore.push(
      data.replaceAll('_', ' ').replaceAll(':', 'h').trim().split(';')
    );
  }
  console.log(removedUnderscore);
  for (const data of removedUnderscore) {
    const tempJourney = {};
    tempJourney.from = data[1].slice(0, 3);
    tempJourney.to = data[2].slice(0, 3);
    journeyTrack.push(tempJourney);
  }
  console.log(journeyTrack);

  //final print
  for (const [index, data] of removedUnderscore.entries()) {
    console.log(
      `${data[0]} from ${journeyTrack[
        index
      ].from.toUpperCase()} to ${journeyTrack[index].to.toUpperCase()} (${
        data[3]
      }) `
    );
  }
};

const flightsCheck =
  '_Delayed_Departure;fao937410;txl2133456;11:25 +_Arrival;bru0512352;fao93745;11:45 +_Delayed_Arrival;hel452652;fao9854123;12:05 +_Departure;fao85412;lis232252;12:30';

flightFormat(flightsCheck);
//Delayed Departure from FAO to TXL (11h25)
// const removePlus = schedule[0].replace('_', '').replaceAll(':', 'h').split('+');
//   console.log(removePlus);
//   let removeColon = [];
//   const formatedPlaces = [];
//   for (const data of removePlus) {
//     removeColon.push(data.split(';'));
//   }
//   console.log(removeColon);
//   for (const data of removeColon) {
//     let formatedPlace = {};
//     formatedPlace.from = data[1].slice(0, 3);
//     formatedPlace.to = data[2].slice(0, 3);
//     formatedPlaces.push(formatedPlace);
//   }
//   console.log(formatedPlaces);
//   for (const data of removeColon) {
//     // let firstWord = console.log(firstWord);
//   }
