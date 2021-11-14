const HOUSE_TYPES = {
  flat: 'Квартира ',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const advertTemplate = document.querySelector('#card').content.querySelector('.popup');
const advertImgElement = document.querySelector('#card').content.querySelector('.popup__photo');

const generateImgs = (array = []) => {
  const newImages = [];
  array.forEach((item) => {
    const imgTemplate = advertImgElement.cloneNode(true);
    imgTemplate.src = item;
    newImages.push(imgTemplate);
  });
  return newImages;
};

const fillTextNode = (node, fieldList, optionalString, nodeAttribute = 'textContent') => {
  const isHaveAllFields = fieldList.every((field) => field);
  if (isHaveAllFields) {
    node[nodeAttribute] = optionalString || fieldList[0];
  }
  else {
    node.remove();
  }
};

const generateAdvert = (advert) => {
  const advertCard = advertTemplate.cloneNode(true);
  const title = advert.offer.title;
  const titleNode = advertCard.querySelector('.popup__title');
  const address = advert.offer.address;
  const addressNode = advertCard.querySelector('.popup__text--address');
  const price = advert.offer.price;
  const priceNode = advertCard.querySelector('.popup__text--price');
  const type = HOUSE_TYPES[advert.offer.type];
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
  fillTextNode(titleNode, [title]);
  fillTextNode(addressNode, [address]);
  fillTextNode(typeNode, [type]);
  fillTextNode(priceNode, [price], `${price} ₽/ночь`);
  fillTextNode(capacityNode, [rooms, guests], `${rooms} комнаты для ${guests} гостей`);
  fillTextNode(timeNode, [checkin, checkout], `Заезд после ${checkin}, выезд до ${checkout}`);
  fillTextNode(descriptionNode, [description]);
  fillTextNode(avatarNode, [avatar], null, 'src');
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
  photoElement.remove();
  if (photosArray.length) {
    photosNode.append(...photosArray);
  }
  else {
    photosNode.remove();
  }
  return advertCard;
};


export {generateAdvert};
