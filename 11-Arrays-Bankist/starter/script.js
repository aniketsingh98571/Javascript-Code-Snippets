'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: 'Aniket Singh',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 5,
  pin: 98571,
};
const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (data, index, array) {
    const type = data > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${data}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

function computeUserName(accounts) {
  for (const account of accounts) {
    const intermediateUserName = account.owner.toLowerCase().split(' ');
    let userName = '';
    for (const name of intermediateUserName) {
      userName = userName + name[0];
    }
    account.username = userName;
    console.log(userName);
  }
}
computeUserName(accounts);

const accountBalance = function (movements) {
  const balance = movements.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  });
  labelBalance.textContent = `${balance} EURO`;
};
accountBalance(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/////////////////////////////////////////////////
//More Arrays Methods

//slice method in Array
//slice method extracts elements from an array
//slice method does not mutates the origin array
let arr = ['a', 'b', 'c', 'd', 'e'];
//2 is the starting index
console.log(arr.slice(2));

//2 is the starting index and 4 is the ending index.
//Note slice only returns the element till last_index-1
//here its 3, therefore the output is ['c','d']
console.log(arr.slice(2, 4));
console.log(arr.slice(1, -2));

//you can create a shallow copy of an array using slice
console.log(arr.slice());

//Splice method in Array
//Splice method is same as slice method, the only difference is that slice does not mutate original oarray but splice does.
//splice is mostly used for removing elements from original array just because it mutates original array
const arr1 = [1, 2, 3, 4];
//removes elements from position 1 to end.
console.log(arr1.splice(1));
console.log(arr1);

//Reverse in Array
//reverse is used to reverse the elements of array
//reverse also mutates the original array
const arr2 = [1, 2, 3, 4, 5, 6];
console.log(arr2.reverse());
console.log(arr2);

//Concat in Array
//concat is used to concat two arrays
const arr3 = [1, 2, 3, 4];
const arr4 = [5, 6, 7, 8];
const numbers = arr3.concat(arr4);
console.log(numbers);

//join in array
const arr5 = [1, 2, 3, 4];
console.log(arr5.join('-'));

//at method in array
//at method is used to get the element at particular index in array.
//well we can access elements of array using bracket notation also but at some cases it is little bit more steps taking to do.
//at method also works on strings

//accessing first element of array
const arr6 = [1, 2, 3, 4];
//using bracket notation
console.log(arr6[0]);

//using at method
console.log(arr6.at(0));

//accessing last element of array
//using slice
console.log(arr6.slice(-1)[0]);

//using bracket notation
console.log(arr6[arr6.length - 1]);

//using at method [this seems little bit simple to use]
console.log(arr6.at(-1));

//for-of loop
const arr8 = [1, 2, 3, 4];
for (const x of arr8.entries()) {
  console.log(x);
}

//forEach loop
//forEach method takes a callback function which runs for every element of an array.
//And the callback function takes the element and its index as arguments,
//Note:- index is optional field, but the data is compulsory field.
//Note:- The order of arguments in callback function must be as per the desired rule,like the first argument will be the element, second argument will be index and third argument will be the whole array.
const arr9 = [25, 100, 30, 1, 2, 3, 200];
arr9.forEach(function (data, index) {
  console.log(`element at ${index} is ${data}`);
  if (data < 20) {
    console.log(`${data} is less than 20`);
  }
});

//forEach with maps and sets
//MAP
const currencies2 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'EURO'],
  ['GBP', 'Pound Sterling'],
]);
currencies2.forEach(function (element, key, map) {
  console.log(`${key}:${element}`);
});

//SET
//SET doesnot have keys and indexes
const currencies3 = new Set(['USD', 'GBP', 'EUR', 'Pound']);
currencies3.forEach(function (element, key, set) {
  console.log(`${key}:${element}`);
});

//coding challenge
const checkDogs = function (dogsJulia, dogsKate) {
  const shallowDogsJulia = [...dogsJulia];
  console.log(dogsJulia);
  console.log(shallowDogsJulia);
  shallowDogsJulia.splice(0, 1);
  shallowDogsJulia.splice(-1, 3);
  console.log(shallowDogsJulia);
  const finalData = shallowDogsJulia.concat(dogsKate);
  console.log(finalData);
  finalData.forEach(function (data, index) {
    if (data >= 3) {
      console.log(`Dog number ${index} is an adult, and is ${data} years old`);
    } else {
      console.log(`Dog number 2 is still a puppy 🐶`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

//map method of array
const arr10 = [1, 2, 3, 4, 5, 6];
const newMapArray = arr10.map(function (data, index) {
  return data * 2;
});
console.log(newMapArray);

const euroToUSD = 1.1;
const converterEuro = movements.map(function (data, index) {
  return data * euroToUSD;
});
console.log(converterEuro);
const movementsOf = [];
for (const data of movements) {
  movementsOf.push(data * 1.1);
}
console.log(movementsOf);

//map using arrow function
const movementsArrow = movements.map(data => data * euroToUSD);
console.log(movementsArrow);

//the callback function of map method takes max 3 arguments in which element is compulsory one and rest arguments like index and whole array is optional
const arr87 = [1, 2, 3, 4, 5, 6];
const multiplyByThree = arr87.map(function (element, index, wholeArray) {
  return `At index ${index}, when we multiply ${element} by three we get ${element * 3}`;
});
console.log(multiplyByThree);

//filter method of array
const arr11 = [1, 2, 3, 4, 5, 6, 7, 8];
const newFilterArray = arr11.filter(function (data, index) {
  return data > 3;
});
console.log(newFilterArray);

const deposits = movements.filter(function (data, index) {
  return data > 0;
});
console.log(deposits);
const withdrawls = movements.filter(function (data, index) {
  return data < 0;
});
console.log(withdrawls);

//reduce method array
const arr12 = [1, 2, 3, 4, 5, 6, 7, 8];
const addAll = arr12.reduce(function (previousValue, currentValue) {
  return previousValue + currentValue;
});
console.log(addAll);
const balance = movements.reduce(function (
  accumulator,
  currentValue,
  index,
  wholeArray
) {
  return currentValue + accumulator;
});
console.log(balance);

const arr57 = [25, 43, 24, 98, 14, 105];
let max = 0;
const maxValue = arr57.reduce(function (accumulator, currentValue) {
  if (accumulator > currentValue) return accumulator;
  else return currentValue;
});
console.log(maxValue);

//coding challenge
const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(function (data, index) {
    if (data <= 2) return 2 * data;
    else if (data > 2) return 16 + data * 2;
  });

  const filterHumanAge = humanAge.filter(function (data) {
    return data > 18;
  });
  console.log(filterHumanAge);

  const sum = filterHumanAge.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue;
  });
  console.log(sum / filterHumanAge.length);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
