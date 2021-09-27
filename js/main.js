const getRandomInteger = (min, max) => {
  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

const getRandomFloat = (min, max, length) => {
  const randomNumber = min + Math.random() * (max - min);
  return randomNumber.toFixed(length);
};

getRandomInteger(1, 10);
getRandomFloat(1.1, 1.2, 10);
