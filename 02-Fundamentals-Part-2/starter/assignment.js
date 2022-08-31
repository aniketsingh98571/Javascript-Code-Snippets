//coding challenge
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
