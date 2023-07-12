'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const account3 = {
  owner: 'Aniket Singh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 9857,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const accounts = [account1, account2,account3];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatMovementDate=function(date){
  const calcDaysPassed=(date1,date2)=>Math.abs(date2-date1)/(1000*60*60*24)
  const daysPassed=Math.round(calcDaysPassed(new Date(),date))
  console.log(daysPassed)
  if(daysPassed===0) return 'Today'
  if(daysPassed===1) return 'Yesterday'
  if(daysPassed<=7) return `${daysPassed} days ago`
  else{
  const day=`${date.getDate()}`.padStart(2,0)
  const month=`${date.getMonth()+1}`.padStart(2,0)
  const year=date.getFullYear()
  return `${day}/${month}/${year}`
  }
}
const formatCur=function(value,locale,currency){
 return new Intl.NumberFormat(locale,{
    style:'currency',
    currency:currency
  }).format(value)
}
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date=new Date(acc.movementsDates[i])
    const displayDate=formatMovementDate(date)
    const formattedMov=formatCur(mov,acc.locale,acc.currency)
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formatCurrency=formatCur(acc.balance,acc.locale,acc.currency)
  labelBalance.textContent = formatCurrency;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes,acc.locale,acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out,acc.locale,acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest,acc.locale,acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
const startLogoutTimer=function(){
  //set the time to 5 minutes
  let time=300
  //call the timer every second
  const tick=function(){
    //in each call.print the remaining time on UI
    const min=time/60;
    const sec=time%60
    labelTimer.textContent=`${`${Math.floor(min)}`.padStart(2,0)}:${`${sec}`.padStart(2,0)}`;
    
 
    //when 0 seconds,stop timer and log out user
     if(time===0){
      clearInterval(timer);
      labelWelcome.textContent="Login to get started"
      containerApp.style.opacity=0
     }
      //decrease 1 second from time 
      time--;
    }
      
     tick()
 const timer= setInterval(tick,1000)
  return timer  
}
let currentAccount,timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    if(timer){
      clearInterval(timer)
    }
    timer=startLogoutTimer()
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(Number(inputTransferAmount.value));
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString())
    receiverAcc.movementsDates.push(new Date().toISOString())
    // Update UI
    updateUI(currentAccount);
    if(timer){
      clearInterval(timer)
      timer=startLogoutTimer()
    }
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString())

    // Update UI
    updateUI(currentAccount);
    if(timer){
      clearInterval(timer)
      timer=startLogoutTimer()
    }
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
//fake login
// currentAccount=account1
// updateUI(currentAccount)
// containerApp.style.opacity = 100;
const today=new Date()
const day=`${today.getDate()}`.padStart(2,0)
const month=`${today.getMonth()+1}`.padStart(2,0)
const year=today.getFullYear()
const hour=`${today.getHours()}`.padStart(2,0)
const minutes=`${today.getMinutes()}`.padStart(2,0)
labelDate.textContent=`${day}/${month}/${year}, ${hour}:${minutes}`

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
console.log(23===23.0)
//Base 10---> 0 to 9,1/10=0.1,3/10=0.3
//Binary base 2--->0 1
console.log(0.1+0.2)

//conversion
let a='23'
console.log(typeof Number(a))  //explicit converion [string to number]
console.log(typeof +a)//another way of converting[string to number]

//Parsing
let b='23px'
console.log(Number.parseInt(b))
console.log(Number.parseInt(a))
let c='2e3'
console.log(Number.parseInt(c))
let d='e32'
console.log(Number.parseInt(d))
let e='2.5'
console.log(Number.parseInt(e))
console.log(Number.parseFloat(e))

//isNaN method
console.log(Number.isNaN(20))
console.log(Number.isNaN('20'))
console.log(Number.isNaN('p2x'))
console.log(Number.isNaN(23/0))

//isFinite
//isFinite is a good method to check whether a number is actual number or not
console.log(Number.isFinite(20))
console.log(Number.isFinite('20'))
console.log(Number.isFinite('p2x'))
console.log(Number.isFinite(23/0))

//Some Math Functions
console.log(Math.sqrt(25)) //square root of 25
console.log(25**(1/2)) //another way of calculating square root
console.log(8**(1/3)) //cube root of 8    (**) is the exponential operator
console.log(Math.trunc(25.55)) //Math.trunc method returns the integer part of the number by removing any fractional digits
console.log(Math.trunc(Math.random()*10)+1)//Math.random() method returns a random value between 0 and 1, it will be in decimals mostly thats why we use Math.trunc() to neglect the decimal part. In this example we have multiplied it by 10 because we want random values between 0 & 10.
const randomInt=(min,max)=>{
  return Math.trunc(Math.random()*(max-min)+1)+min
}
console.log(randomInt(2,4))

//Math.round() function rounds the number to the nearest number, for example if the number is 23.3,it will round to 23.If the number is 23.5,it will round to 24.Its like if the decimal part contains number less than 5,then it will be the same number but if the decimal part contains number greater than or equal to 5 then the number will be +1.
console.log(Math.round(23.3))
console.log(Math.round(23.5))
console.log(Math.round(23.7))

//Math.ceil() method returns the number+1[if in decimal]
console.log(Math.ceil(23.3))
console.log(Math.ceil(23.5))

//Math.floor() method returns number[without decimal][if in decimal]
console.log(Math.floor(23.3))
console.log(Math.floor(-23.5))

//Rounding decimals
//toFixed() method returns the number with specified digits after the decimal, example 2.732.toFixed(2) will return 2.73 because we have specified 2 in the method.
console.log((2.7).toFixed(0))
console.log((2.734).toFixed(2))

//Remainder operation
console.log(5%2)
console.log(4%2)

//checking odd and even
const checkEven=(number)=>number%2===0?true:false;
console.log(checkEven(2))
console.log(checkEven(3))
console.log(checkEven(23))
console.log(checkEven(24))

//Numeric Separator
//its very hard to read this number, so to make it more readable we use numeric separator
const diameter=287460000000
//Now its bit simpler to read
const anotherDiameter=287_764_000_000
console.log(anotherDiameter)

//BigInt
//9007199254740991 this is max value [2**53] a Number can store, if we want some bigger number than this, then we use BigInt

//browser will fail to render this number as a integer
console.log(4545646456454654564564545645645465465465464)

//appending "n" to bigger number will convert them into BigInt numbers
console.log(4545646456454654564564545645645465465465464n)

//using BigInt() will also conver huge number to BigInt
const hugeNum=BigInt(4545646456454654564564545645645465465465464)
console.log(hugeNum)

//this operation will fail, because there are two different number types here,1.bigInt 2.Number
// console.log(hugeNum+25)

//This will work because we have converted numer to BigInt()
console.log(hugeNum+BigInt(25))

//Math functions do not work with BigInt

//Dates
const now=new Date()
console.log(now)
console.log(new Date(2025,15,15,15,15,25)) //year  month  day  hour mins seconds
//24*60*60*1000 //calculates no of seconds in a day
console.log(new Date(3*24*60*60*1000))//3days after

const future=new Date(2037,10,19,15,23)
console.log(future.getFullYear())
console.log(future.getMonth())
console.log(future.getDay())
console.log(future.getDate())
console.log(future.getHours())
console.log(future.getMinutes())
console.log(future.getSeconds())
console.log(future.toISOString())
console.log(future.getTime()) //timestamp in milliseconds
console.log(Date.now()/1000)//also returns current timestamp in milliseconds
console.log(new Date().getTime())


//Date Operations
const calcDaysPassed=(date1,date2)=>Math.abs(date2-date1)/(1000*60*60*24)
const day1=calcDaysPassed(new Date(2037,3,14),new Date(2037,3,24))
console.log(day1)

//setTimeout
setTimeout(()=>{
  console.log("Bring Pizza")
},3000)

function bringPizza(){
  console.log("Bring Pizzza")
}
setTimeout(bringPizza,2000)
function runAfterTime(time){
  console.log("I ran after",time/1000,"seconds")
}
setTimeout(runAfterTime,3000,3000)

//clearing setTimeout()
let timerId=setTimeout(()=>{
  console.log("ran after 5s")
},5000)
console.log(timerId)
clearTimeout(timerId)

//setInterval method
function runAfterIntervals(){
  console.log("I ran after every intervals")
}
// setInterval(runAfterIntervals, 3000);

function runAfterTimedInterval(time){
  console.log("I ran after every",time," seconds")
}
// setInterval(runAfterTimedInterval,2000,2000)

//clearing setInterval()
let timerIntervalId=setInterval(runAfterTimedInterval,5000,2000)
clearInterval(timerIntervalId)