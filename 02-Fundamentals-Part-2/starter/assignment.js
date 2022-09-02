//coding challenge 1
console.log("Assignment Js");
const calcAverage = (score1, score2, score3) => {
  const average = (score1 + score2 + score3) / 3;
  return average * 2;
};
const checkWinner = () => {
  let dolphin = calcAverage(85, 54, 41);
  let koalas = calcAverage(23, 34, 27);
  if (dolphin > koalas) {
    console.log("dolphins wins");
  } else if (koalas > dolphin) {
    console.log("koalas wins");
  } else {
    console.log("No one wins");
  }
};
checkWinner();

//Coding Challenge 2
const calcTip = (billsArray) => {
  const bills = [];
  let tipValue;
  for (let i = 0; i < billsArray.length; i++) {
    if (billsArray[i] >= 50 && billsArray[i] <= 300) {
      tipValue = billsArray[i] * 0.15;
      bills.push(tipValue);
    } else {
      tipValue = billsArray[i] * 0.2;
      bills.push(tipValue);
    }
  }
  return bills;
};
const billsArray = [125, 555, 44];
const tipsArray = calcTip(billsArray);
console.log(tipsArray);
const total = (tipsArray, billsArray) => {
  let total = 0;
  for (let i = 0; i < tipsArray.length; i++) {
    total = total + tipsArray[i] + billsArray[i];
  }
  return total;
};
const totalBill = total(tipsArray, billsArray);
console.log(totalBill);

//Coding Challenge 3
const markDetails = {
  firstName: "Mark",
  lastName: "Miller",
  weight: 78,
  height: 1.69,
  calcMarkBMI: function () {
    this.markBMI = this.weight / (this.height * this.height);
    return this.markBMI;
  },
};
const johnDetails = {
  firstName: "John",
  lastName: "Smith",
  weight: 92,
  height: 1.95,
  calcJohnBMI: function () {
    this.johnBMI = this.weight / (this.height * this.height);
    return this.johnBMI;
  },
};
const markBMI = markDetails.calcMarkBMI();
const johnBMI = johnDetails.calcJohnBMI();
if (markBMI > johnBMI) {
  console.log(`Mark BMI(${markBMI}) is greater than john BMI (${johnBMI})`);
} else {
  console.log(`John BMI(${johnBMI}) is greater than Mark BMI (${markBMI})`);
}