import {getRandomFloat, getRandomInteger, getRandomArrayElement, shuffle, getAvatarUrl} from './utils.js';
import {TITLES, TYPES, CHECK_TIMES, DESCRIPTIONS, FEATURES, PHOTOS} from './data.js';

const ADVERT_COUNT = 10;

const AVATARS = Array.from({ length: ADVERT_COUNT}, getAvatarUrl);
shuffle(AVATARS);

const createAdvert = (index) => {
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
const firstAdvertItem = createAdvert(1);

const getHouseType = {
  flat: 'Квартира ',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const advertTemplate = document.querySelector('#card').content.querySelector('.popup');
const advertListElement = document.querySelector('#map-canvas');
const advertListFragment = document.createDocumentFragment();
const advertImgElement = document.querySelector('#card').content.querySelector('.popup__photo');

const generateImgs = (array) => {
  const newImgs = [];
  array.forEach((item) => {
    const imgTemplate = advertImgElement.cloneNode(true);
    imgTemplate.src = item;
    newImgs.push(imgTemplate);
  });
  return newImgs;
};

const generateAdvert = (advert) => {
  const advertCard = advertTemplate.cloneNode(true);
  advertListElement.appendChild(advertCard);
  const title = advert.offer.title;
  const titleElement = advertCard.querySelector('.popup__title');
  const address = advert.offer.address;
  const addressElement = advertCard.querySelector('.popup__text--address');
  const price = advert.offer.price;
  const priceElement = advertCard.querySelector('.popup__text--price');
  const type = getHouseType[advert.offer.type];
  const typeElement = advertCard.querySelector('.popup__type');
  const rooms = advert.offer.rooms;
  const guests = advert.offer.guests;
  const capacityElement = advertCard.querySelector('.popup__text--capacity');
  const checkin = advert.offer.checkin;
  const checkout = advert.offer.checkout;
  const timeElement = advertCard.querySelector('.popup__text--time');
  const features = advert.offer.features;
  const featuresElement = advertCard.querySelector('.popup__features');
  const description = advert.offer.description;
  const descriptionElement = advertCard.querySelector('.popup__description');
  const avatar = advert.author.avatar;
  const avatarElement = advertCard.querySelector('.popup__avatar');
  const photosElement = advertCard.querySelector('.popup__photos');
  const photoElement = photosElement.querySelector('.popup__photo');
  const photosArray = generateImgs(advert.offer.photos);
  if (title) {
    titleElement.textContent = title;
  }
  else {
    titleElement.remove();
  }
  if (address) {
    addressElement.textContent = address;
  }
  else {
    addressElement.remove();
  }
  if (price) {
    priceElement.textContent = `${price} ₽/ночь`;
  }
  else {
    priceElement.remove();
  }
  if (type) {
    typeElement.textContent = type;
  }
  else {
    typeElement.remove();
  }
  if (rooms && guests) {
    capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  }
  else {
    capacityElement.remove();
  }
  if (checkin && checkout) {
    timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  }
  else {
    timeElement.remove();
  }
  if (features) {
    featuresElement.textContent = features;
  }
  else {
    featuresElement.remove();
  }
  if (description) {
    descriptionElement.textContent = description;
  }
  else {
    descriptionElement.remove();
  }
  photoElement.remove();
  if (photosArray.length) {
    photosElement.append(...photosArray);
  }
  else {
    photosElement.remove();
  }
  if (avatar) {
    avatarElement.src = avatar;
  }
  else {
    avatarElement.remove();
  }
  advertListFragment.appendChild(advertCard);
  advertListElement.appendChild(advertListFragment);
};

export {generateAdvert, firstAdvertItem};
