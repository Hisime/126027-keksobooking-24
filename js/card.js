const getHouseType = {
  flat: 'Квартира ',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const advertTemplate = document.querySelector('#card').content.querySelector('.popup');
const advertImgElement = document.querySelector('#card').content.querySelector('.popup__photo');

const generateImgs = (array = []) => {
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
  const title = advert.offer.title;
  const titleNode = advertCard.querySelector('.popup__title');
  const address = advert.offer.address;
  const addressNode = advertCard.querySelector('.popup__text--address');
  const price = advert.offer.price;
  const priceNode = advertCard.querySelector('.popup__text--price');
  const type = getHouseType[advert.offer.type];
  const typeNode = advertCard.querySelector('.popup__type');
  const rooms = advert.offer.rooms;
  const guests = advert.offer.guests;
  const capacityNode = advertCard.querySelector('.popup__text--capacity');
  const checkin = advert.offer.checkin;
  const checkout = advert.offer.checkout;
  const timeNode = advertCard.querySelector('.popup__text--time');
  const features = advert.offer.features;
  const featuresNode = advertCard.querySelector('.popup__features');
  const featureListNode = featuresNode.querySelectorAll('.popup__feature');
  const description = advert.offer.description;
  const descriptionNode = advertCard.querySelector('.popup__description');
  const avatar = advert.author.avatar;
  const avatarNode = advertCard.querySelector('.popup__avatar');
  const photosNode = advertCard.querySelector('.popup__photos');
  const photoElement = photosNode.querySelector('.popup__photo');
  const photosArray = generateImgs(advert.offer.photos);
  if (title) {
    titleNode.textContent = title;
  }
  else {
    titleNode.remove();
  }
  if (address) {
    addressNode.textContent = address;
  }
  else {
    addressNode.remove();
  }
  if (price) {
    priceNode.textContent = `${price} ₽/ночь`;
  }
  else {
    priceNode.remove();
  }
  if (type) {
    typeNode.textContent = type;
  }
  else {
    typeNode.remove();
  }
  if (rooms && guests) {
    capacityNode.textContent = `${rooms} комнаты для ${guests} гостей`;
  }
  else {
    capacityNode.remove();
  }
  if (checkin && checkout) {
    timeNode.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  }
  else {
    timeNode.remove();
  }

  if (features) {
    featureListNode.forEach((featureListItem) => {
      const isNecessary = features.some(
        (featureName) => featureListItem.classList.contains(`popup__feature--${featureName}`),
      );
      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  }
  else {
    featuresNode.remove();
  }

  if (description) {
    descriptionNode.textContent = description;
  }
  else {
    descriptionNode.remove();
  }
  photoElement.remove();
  if (photosArray.length) {
    photosNode.append(...photosArray);
  }
  else {
    photosNode.remove();
  }
  if (avatar) {
    avatarNode.src = avatar;
  }
  else {
    avatarNode.remove();
  }
  return advertCard;
};


export {generateAdvert};
