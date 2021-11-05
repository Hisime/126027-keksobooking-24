const isInvalidFloat = (number) => number < 0;
const isInvalidInteger = (number) => number < 0 || !Number.isInteger(number);
const ALERT_SHOW_TIME = 5000;

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

const getRandomArrayElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const getAvatarUrl = (item, number) => {
  number++;
  if (number >= 10) {
    return `img/avatars/user${number}.png`;
  }
  return `img/avatars/user0${number}.png`;
};


const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Ошибка сервера';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {getRandomInteger, getRandomFloat, getRandomArrayElement, shuffle, getAvatarUrl, showAlert};
