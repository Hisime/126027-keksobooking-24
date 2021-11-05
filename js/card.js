const getHouseType = {
  flat: 'Квартира ',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const advertTemplate = document.querySelector('#card').content.querySelector('.popup');
const advertImgElement = document.querySelector('#card').content.querySelector('.popup__photo');

const generateImgs = (array) => {
  const newImgs = [];
  if (!array) {
    array = [];
  }
  array.forEach((item) => {
    const imgTemplate = advertImgElement.cloneNode(true);
    imgTemplate.src = item;
    newImgs.push(imgTemplate);
  });
  return newImgs;
};

const generateAdvert = (advert) => {
  const advertCard = advertTemplate.cloneNode(true);
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
  return advertCard;
};


export {generateAdvert};
