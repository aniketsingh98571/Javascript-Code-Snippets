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
  movements: [430, 1000, 700, 50, 90, -300, -20],
  interestRate: 5,
  pin: 9857,
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

const displayMovements = function (movements,sort=false) {
  containerMovements.innerHTML = '';
  const movs=sort?movements.slice().sort((a,b)=>{
    if(a>b) return 1;
    if(b>a) return -1
  }):movements
  movs.forEach(function (data, index, array) {
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
// displayMovements(account1.movements);

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

const accountBalance = function (account) {
  const balance = account.movements.reduce(function (
    accumulator,
    currentValue
  ) {
    return accumulator + currentValue;
  });
  account.balance = balance;
  console.log(balance);
  labelBalance.textContent = `${balance} EURO`;
};
// accountBalance(account1.movements);
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(function (data) {
      return data > 0;
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    });
  labelSumIn.textContent = `${incomes} EURO`;
  const outgoing = account.movements
    .filter(function (data) {
      return data < 0;
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    });
  labelSumOut.textContent = `${Math.abs(outgoing)} EURO`;
  const interest = account.movements
    .filter(function (data) {
      return data > 0;
    })
    .map(function (data) {
      return (data * account.interestRate) / 100;
    })
    .filter(function (data) {
      return data >= 1;
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    });
  labelSumInterest.textContent = `${interest} EURO`;
};
// calcDisplaySummary(account1.movements);
let loginAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  loginAccount = accounts.find(function (account) {
    return account.username === inputLoginUsername.value.trim();
  });

  if (loginAccount?.pin === Number(inputLoginPin.value.trim())) {
    inputLoginUsername.value = inputLoginPin.value = ' ';
    // inputLoginPin.blur();
    console.log('logged in');
    labelWelcome.textContent = `Welcome Back, ${loginAccount.owner.split(
      ' '[1]
    )}`;
    containerApp.style.opacity = 100;
    updateUI(loginAccount);
  } else {
    alert('Wrong Credentials');
  }
});
const updateUI = function (account) {
  displayMovements(account.movements);
  calcDisplaySummary(account);
  accountBalance(account);
};
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(function (data) {
    return data.username === inputTransferTo.value;
  });
  if (
    amount > 0 &&
    loginAccount.balance >= amount &&
    receiverAccount.username !== loginAccount.username &&
    receiverAccount
  ) {
    loginAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(loginAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === loginAccount.username &&
    Number(inputClosePin.value) === loginAccount.pin
  ) {
    const index = accounts.findIndex(function (data) {
      return data.username === loginAccount.username;
    });
    accounts.splice(index, 1);
    console.log(accounts);
    containerApp.style.opacity = 0;
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Loan');
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    loginAccount.movements.some(function (data) {
      return data >= loanAmount * 0.1;
    })
  ) {
    loginAccount.movements.push(loanAmount);
    updateUI(loginAccount);
    inputLoanAmount.value = '';
  }
});
let sortedState=false;
btnSort.addEventListener('click',function(e){
  e.preventDefault()
  displayMovements(loginAccount.movements,!sortedState)
  sortedState=!sortedState
})
const numDeposits=accounts.flatMap((acc)=>acc.movements).reduce((count,cur)=>(
  cur>=1000?count+1:count),0
)
console.log(numDeposits)
console.log(accounts.flatMap((acc)=>acc.movements))

const sums=accounts.flatMap(acc=>acc.movements).reduce((sum,cur)=>{
  cur>0?sum.deposits+=cur:sum.withdrawls+=cur
  return sum
},{deposits:0,withdrawls:0})
console.log(sums)

//question ---->convert from "this is a nice title" to "This Is a Nice Title"
const converTitle=function(title){
  const exceptions=['a','an','the','but','and','or','on','in','with']
  const titleCase=title.toLowerCase()
  const splittedTitle=titleCase.split(" ")
  const changedTitle=splittedTitle.map((word)=>{
    if(!exceptions.includes(word)){
      return word[0].toUpperCase()+word.substr(1,)
    }
    else{
      return word
    }
  })
  return changedTitle.join(" ")
}
console.log(converTitle('this is a nice title'))
console.log(converTitle('this is a LONG title but not too long'))
console.log(converTitle('and here is another title with an EXAMPLE'))
// const sumsArray=accounts.flatMap(acc=>acc.movements).reduce((sum,cur)=>{
//   cur>0?sum[0]+=cur:sum[1]+=cur
// },[])
// console.log(sumsArray)
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

//Method Chaining
const totalDepositsUSD = movements
  .filter(function (data) {
    return data > 0;
  })
  .map(function (data) {
    return data * euroToUSD;
  })
  .reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  });
console.log(totalDepositsUSD);

//coding challenge 3
const againCalcAverage = function (nos) {
  const averageArray = nos
    .filter(function (data) {
      return data > 1;
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    });
  console.log(averageArray / nos.length);
};
againCalcAverage([5, 2, 4, 1, 15, 8, 3]);

//find method
//The find method works on the array and finds the first occurence of an element for which a condition is met.
//Filter method returns a new array based on given condition but find method returns a single value i.e first occurence of an element for which a condition is met.
const arr14 = [1, 5, 7, 6, 9];
const firstConditionMetElement = arr14.find(function (data) {
  return data > 5;
});
console.log(firstConditionMetElement);

//finding single account from accounts array of bankist using some condition
const singleAccn = accounts.find(function (account) {
  return account.owner === 'Jessica Davis';
});
console.log(singleAccn);
//using for-of loop
for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
  }
}
//some and every method
console.log(movements);
//the includes method only does strict equality check and returns boolean based on provided value.  We cannot provide any expressions in includes method
console.log(movements.includes(-130));

//some method
//the some method takes a callback function which iterates through all the elements of an array and returns boolean based on condition, in some method we can write an expression while in includes method we cant. Some method looks for some elements based on condition and returns the boolean eventhough some conditions are satisfied
const checkDeposit = movements.some(function (data) {
  return data > 0;
});
console.log(checkDeposit);

//every method
//the every method takes a callback function which iterates through all the elements of an array and returns boolean based on condition, in every method we can write expression too just like some method. Every method is slightly different than some method in a sense, in some method even if a single condition is met then the some method returns true but in every method all the elements should satisfy the given condition otherwise false will be returned
const checkDeposit2 = movements.every(function (data) {
  return data > 0;
});
console.log(checkDeposit2);

//flat and flatMap method of array

//flat method
//the flat method converts the deeply nested array into a single array with all the elements.
const arr47 = [[1, 2, 3], 4, 5, [6, 7, 8]];
const flatArray = arr47.flat();
console.log(flatArray);

//by default the flat method converts the deeply nested array into a single array by just 1 level, so if you have more deep nested array lets suppose 2 to 3 levels nesting then we have to provide the flat method an argument about how much deep we want to go and extract all the elements to a single array.
const arr48 = [[1, 2, [3, 4], 5, 6], 7, 8, [9, 10, [11, 12], 13]];
const flatArrayDeep = arr48.flat(2);
console.log(flatArrayDeep);

//flatMap
//flatMap method is a combination of map and flat method, it first maps on array and then flattens it. Note here is that, the flatMap method can go only 1 level deep for flatening

//sorting arrays
//sort() method only works with strings, if the array contains numbers then the sort method convert the number into string and then do the computation.sort method also mutates the original array

const owners = ['Jack', 'Aniket', 'Martha', 'Zach', 'Amit'];
console.log(owners.sort());

const nos = [5, 4, 2, 9, 5, 7, 1];
console.log(nos.sort());

//as we can see here that, sort method did some mistakes here, the correct output should be [-5,-1,2,3,4,5]
//but the actual output is [-1,-5,2,3,4,5] the reason is because sort method converted the numbers into strings and the minus sign has higher precendence thats why it came first followed by numbers in line. In order to solve this problem we use a callback function in sort method which takes 2 arguments current value and next value.
const nos2 = [-1, -5, 2, 5, 4, 3];
//for ascending sort
//return positive if we want to switch
//return negative if we dont want to switch
nos2.sort(function (current, next) {
  if (current > next) return 1;
  else if (current < next) return -1;
});
console.log(nos2);

//sort() function in arrays.
//In Strings
const owners2=['Jonas','Zach','Adam','Martha']
console.log(owners2.sort())

//In Numbers
const numbers2=[45,65,10,100,2500]
console.log(numbers2.sort())

//Sort function takes an array and sorts it based on strings, it mutates the original array. If you give an array of numbers to sort then the sort function will first convert those numbers into strings and then it will do sorting.
//In order to sort the numbers in array using sort() function then we have to use a callback function which is provided by sort()function. The callback function takes two parameters, 1st the current number and 2nd the number after the current number, its just like assuming two consecutive numbers in an array. 
//Example take two numbers 400,-140 now if we want to sort these two numbers in ascending order with the help of sort function so in the callback function we will compare if first number is greater than second one, if true then we will return any positive number else we will return any negative number.
//If you want to swap the numbers then return positive number
//else return negative number

//ascending order
numbers2.sort((a,b)=>{
  if(a>b) 
    return 1;
  if(b>a)
    return -1;
})
console.log(numbers2)

//descending order
numbers2.sort((a,b)=>{
  if(a>b) 
    return -1;
  if(b>a)
    return 1;
})
console.log(numbers2)

//fill method
//fill method fills the entire array with a single element, it works on the array constructor. fill method also takes 3 arguments,1st the element which we have to fill,2nd the position to start filling the array and 3rd the position where we have to end the fill position.
const arr575=new Array(4)
arr575.fill(7)
arr575.fill(23,2)
console.log(arr575)

//from method
//the from method do the same thing like fill for filling the array but here you can enter series of numbers.
const arr741= Array.from({length:7},(curr,i)=>i+1)
console.log(arr741)
const arr841= Array.from({length:7},(curr,i)=>i>0?Math.round(Math.random()*6):1)
console.log(arr841)

//coding challenge
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];
  dogs.forEach(function(dog){
    const recommendFood=dog.weight**0.75*28
    dog["recommendFood"]=recommendFood
  })
  console.log(dogs)
  dogs.forEach(function(dog){
    if(dog.owners.includes("Sarah")){
       if(dog.curFood>dog.recommendFood){
        console.log("Its eating too much")
      }
      else
        console.log("Not eating too much")
    }
})
let ownersEatTooMuch=[]
let ownersEatTooLess=[]
dogs.forEach((dog)=>{
  if(dog.curFood>dog.recommendFood){
    const temp=[...ownersEatTooMuch,...dog.owners]
    ownersEatTooMuch=temp
  }
  else{
    const temp=[...ownersEatTooLess,...dog.owners]
    ownersEatTooLess=temp
  }
})
console.log(ownersEatTooMuch)
console.log(ownersEatTooLess)
// ownersEatTooMuch.forEach()
console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much`)
console.log(`${ownersEatTooLess.join(' and ')} dogs eat too less`)
console.log(dogs.some((dog)=>{
  dog.curFood===dog.recommendFood
}))
const checkEatingOkay=dog=>dog.curFood>dog.recommendFood*0.9&&dog.curFood<dog.recommendFood*1.1
console.log(dogs.some(checkEatingOkay))
console.log(dogs.filter(checkEatingOkay))
const dogsCopy=dogs.slice().sort((a,b)=>a.recommendFood-b.recommendFood)
console.log(dogsCopy)
