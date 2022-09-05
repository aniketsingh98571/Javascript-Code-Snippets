// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = '23';
const x1 = 22;
console.log('hi');
const calcAge = () => {
  console.log('Hey this is calcAge');
};
const calcAmplitude = (temperatureArray1, temperatureArray2) => {
  const temperatureArray = temperatureArray1.concat(temperatureArray2);
  console.log(temperatureArray);
  let max, min;
  max = min = temperatureArray[0];

  for (let i = 0; i < temperatureArray.length; i++) {
    if (typeof temperatureArray[i] === 'string') {
      continue;
    } else {
      if (temperatureArray[i] > max) max = temperatureArray[i];
    }
  }
  for (let i = 0; i < temperatureArray.length; i++) {
    if (typeof temperatureArray[i] === 'string') {
      continue;
    } else {
      if (temperatureArray[i] < min) {
        min = temperatureArray[i];
      }
    }
  }
  return [max, min];
};
const temperature = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const temperature2 = [3, -2, -8, -1, 'error', 9, 13, 18, 15, 1, 9, 5];
const returnedValues = calcAmplitude(temperature, temperature2);
console.log(returnedValues[0] + returnedValues[1]);
