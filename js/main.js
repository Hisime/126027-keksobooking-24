import {getRandomFloat, getRandomInteger, getRandomArrayElement, shuffle, getAvatarUrl} from './utils.js';
import {TITLES, TYPES, CHECK_TIMES, DESCRIPTIONS, FEATURES, PHOTOS} from './data.js';


const ADVERT_COUNT = 10;

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
