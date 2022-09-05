const printForecast = temperatureArray => {
  for (let i = 0; i < temperatureArray.length; i++) {
    console.log(`...${temperatureArray[i]}*C in ${i + 1} days...`);
  }
};
printForecast([17, 21, 23]);
