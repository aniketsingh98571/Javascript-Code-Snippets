let country = "India";
let continent = "Asia";
let population = 145;
console.log(country);
console.log(continent);
console.log(population);

//Another way of Logging
console.log(
  " My country name is: " +
    country +
    " it lies in " +
    continent +
    " continent " +
    " it has population of " +
    population
);

//Data Types Assignment
let isIsland = true;
let language;
console.log("type of isIsland " + typeof isIsland);
console.log("type of language " + typeof language);
console.log("type of population  " + typeof population);
console.log("type of country " + typeof country);

language = "Hindi";
console.log(isIsland);

let halfPopulation = population / 2;
console.log(halfPopulation);
population++;
console.log(population);
console.log(6 > 146);
console.log(146 < 33);
let description =
  "Portugal is in Europe, and its 11 million people speak portuguese";

//conding challenge 1
let markHeight = 1.69;
let markWeight = 78;
let johnHeight = 1.95;
let johnWeight = 92;
let markBMI = markWeight / (markHeight * markHeight);
let johnBMI = johnWeight / (johnHeight * johnHeight);
console.log(markBMI);
console.log(johnBMI);
const higherBMI = markBMI > johnBMI;
console.log(higherBMI);
description = `Portugal is in Europe, and its 11 million people speak portugese`;

const myCountryPopulation = 146;
if (myCountryPopulation > 33) {
  console.log(`Portugal population is above average`);
} else {
  console.log(`portugal population is 22 million below average`);
}

//coding challenge 2
if (johnBMI > markBMI) {
  console.log(`John BMI ${johnBMI} is  higher than ${markBMI} BMI`);
} else {
  console.log(`John BMI ${johnBMI} is  less than ${markBMI} BMI`);
}

// let myNeighbors = Number(prompt("How many neighbor countries do you have?"));
// if (myNeighbors === 1) {
//   console.log("Only One Border");
// } else if (myNeighbors > 1) {
//   console.log("More than 1 border");
// } else {
//   console.log("No border");
// }

//coding challenge 3

let minimumScore = 100;
let dolphinsAverage, koalasAverage;
let dolphinsScore = [97, 112, 101];

let koalasScore = [109, 95, 123];
let dolphinsSum = (koalasSum = 0);
for (i = 0; i < dolphinsScore.length; i++) {
  dolphinsSum = dolphinsSum + dolphinsScore[i];
  koalasSum = koalasSum + koalasScore[i];
}
dolphinsAverage = dolphinsSum / dolphinsScore.length;
koalasAverage = koalasSum / koalasScore.length;
if (dolphinsAverage > koalasAverage && dolphinsAverage >= minimumScore) {
  console.log("Dolphin Team Wins");
} else if (koalasAverage > dolphinsAverage && koalasAverage >= minimumScore) {
  console.log("Koalas Wins");
} else if (
  koalasAverage === dolphinsAverage &&
  koalasAverage >= minimumScore &&
  dolphinsAverage >= minimumScore
) {
  console.log("Its a tie");
} else {
  console.log("No one wins");
}

//coding challenge 4
let bill, tip;
bill = 430;

tip = bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;

console.log(
  `The bill was of ${bill} and the tip for that bill was ${tip}, so the total amount of bill including tip is ${
    bill + tip
  }`
);
