const isInvalidFloat = (number) => number < 0;
const isInvalidInteger = (number) => number < 0 || !Number.isInteger(number);

const getRandomInteger = (min, max) => {
  if (isInvalidInteger(min) || isInvalidInteger(max)) {
    return 'Передан неверный аргумент. Аргумент должен быть больше или равен нулю и являться целым числом.';
  }
  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

const getRandomFloat = (min, max, length) => {
  if (isInvalidFloat(min) || isInvalidFloat(max) || isInvalidInteger(length)) {
    return 'Передан неверный аргумент. Аргумент должен быть больше или равен нулю и являться числом. Третий аргумент должен быть только целым числом.';
  }
  const randomNumber = min + Math.random() * (max - min);
  return Number(randomNumber.toFixed(length));
};

getRandomInteger(1, 10);
getRandomFloat(1.1, 1.2, 10);
