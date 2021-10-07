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

const ADVERT_COUNT = 10;

const TITLES = [
  'Домик у моря',
  'Квартира с видом на залив',
  'Уютная студия  центре города',
  'Роскошный дворец',
  'Комната в квартире с отличными соседями',
];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const DESCRIPTIONS = [
  'Квартира в доме-памятнике купца Полежаева. В этом доме режиссер В. Бортко снимал в сцены для фильма по роману М.А. Булгакова «Мастер и Маргарита».',
  'Квартира с прекрасным видом на Канал Грибоедова в доме начала XX века. В историческом центре, в непосредственной близости от главных достопримечательностей.',
  'Старинный петербургский дом 1900 г. постройки. Совсем недавно в нём были реконструированы мини-студии, интересные исторические детали интерьера были бережно восстановлены.',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];


const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

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

const AVATARS = Array.from({ length: ADVERT_COUNT}, getAvatarUrl);
shuffle(AVATARS);

const createAdvert = (item, index) => {
  const newLocation = {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5),
  };
  shuffle(FEATURES);
  shuffle(PHOTOS);
  return {
    author: {
      avatar: AVATARS[index],
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${newLocation.lat}, ${newLocation.lng}`,
      price: getRandomInteger(0, 1000000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 20),
      guests: getRandomInteger(0, 10),
      checkin: getRandomArrayElement(CHECK_TIMES),
      checkout: getRandomArrayElement(CHECK_TIMES),
      features: FEATURES.slice(0, getRandomInteger(0, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: PHOTOS.slice(0, getRandomInteger(0, PHOTOS.length)),
    },
    location: {
      lat: newLocation.lat,
      lng: newLocation.lng,
    },
  };
};

Array.from({ length: ADVERT_COUNT }, createAdvert);
