import { MAP_CENTER, resetMap } from './map.js';

const MinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};


const formNode = document.querySelector('.ad-form');
const formDisabledClass = 'ad-form--disabled';
const formListNode = formNode.querySelectorAll('fieldset');
const filterNode = document.querySelector('.map__filters');
const filterDisabledClass = 'map__filters--disabled';
const filterListNode = filterNode.querySelectorAll('[class^=\'map__\']');

const disablePage = () => {
  filterListNode.forEach((node) => {
    node.setAttribute('disabled', '');
  });
  formNode.classList.add(formDisabledClass);
  filterNode.classList.add(filterDisabledClass);
  formListNode.forEach((node) => {
    node.setAttribute('disabled', '');
  });
};

const activePage = () => {
  filterListNode.forEach((node) => {
    node.removeAttribute('disabled');
  });
  formNode.classList.remove(formDisabledClass);
  filterNode.classList.remove(filterDisabledClass);
  formListNode.forEach((node) => {
    node.removeAttribute('disabled');
  });
};

const roomSelectNode = formNode.querySelector('#room_number');
const capacitySelectNode = formNode.querySelector('#capacity');
const capacityOptionListNode = capacitySelectNode.querySelectorAll('option');
const onRoomSelectNodeChange = () => {
  const updateOptions = (optionList) => {
    capacityOptionListNode.forEach((option) => {
      if (optionList.includes(option.value)) {
        option.removeAttribute('disabled');
      }
      else {
        option.setAttribute('disabled', '');
        if (capacitySelectNode.value === option.value) {
          capacitySelectNode.value = '';
        }
      }
    });
  };
  switch(roomSelectNode.value) {
    case '1':
      updateOptions(['1']);
      break;
    case '2':
      updateOptions(['1', '2']);
      break;
    case '3':
      updateOptions(['1', '2', '3']);
      break;
    case '100':
      updateOptions(['0']);
      break;
  }
};

const typeHouseSelectNode = formNode.querySelector('#type');
const pricePerNightNode = formNode.querySelector('#price');
const checkInSelectNode = formNode.querySelector('#timein');
const checkOutSelectNode = formNode.querySelector('#timeout');

const validatePrice = () => {
  if (Number(pricePerNightNode.value) < pricePerNightNode.min) {
    pricePerNightNode.setCustomValidity(`Минимальная цена ${pricePerNightNode.min}`);
  }
  else {
    pricePerNightNode.setCustomValidity('');
  }
  pricePerNightNode.reportValidity();
};

pricePerNightNode.addEventListener('input', () => {
  validatePrice();
});

const onHouseTypeSelectNodeChange = () => {
  const setMinPrice = (minPrice) => {
    pricePerNightNode.min = minPrice;
    pricePerNightNode.placeholder = minPrice;
  };
  let minValidatorValue;
  switch(typeHouseSelectNode.value) {
    case 'bungalow':
      minValidatorValue = MinPrices.BUNGALOW;
      break;
    case 'flat':
      minValidatorValue = MinPrices.FLAT;
      break;
    case 'hotel':
      minValidatorValue = MinPrices.HOTEL;
      break;
    case 'house':
      minValidatorValue = MinPrices.HOUSE;
      break;
    case 'palace':
      minValidatorValue = MinPrices.PALACE;
      break;
  }

  setMinPrice(minValidatorValue);
  validatePrice();
};

const onCheckInNodeChange = () => {
  checkOutSelectNode.value = checkInSelectNode.value;
};

const onCheckOutNodeChange = () => {
  checkInSelectNode.value = checkOutSelectNode.value;
};

onRoomSelectNodeChange();
roomSelectNode.addEventListener('change', onRoomSelectNodeChange);
typeHouseSelectNode.addEventListener('change', onHouseTypeSelectNodeChange);
checkInSelectNode.addEventListener('change', onCheckInNodeChange);
checkOutSelectNode.addEventListener('change', onCheckOutNodeChange);

const showMessagePopover = (templateId) => {
  const bodyNode = document.body;
  const messageTemplateNode = document.querySelector(`#${templateId}`).content;
  const messageNode = messageTemplateNode.firstElementChild.cloneNode(true);
  const onEscapeKeyPress = (evt) => {
    if (evt.key === 'Escape') {
      messageNode.remove();
      window.removeEventListener('keydown', onEscapeKeyPress);
    }
  };
  const onMessageClick = () => {
    messageNode.remove();
    window.removeEventListener('keydown', onEscapeKeyPress);
  };
  messageNode.addEventListener('click', onMessageClick);
  window.addEventListener('keydown', onEscapeKeyPress);
  bodyNode.appendChild(messageNode);
};


const addressNode = formNode.querySelector('#address');
const resetForm = () => {
  formNode.reset();
  resetMap();
  addressNode.value = `${MAP_CENTER.lat}, ${MAP_CENTER.lng}`;
};

const resetButtonNode = formNode.querySelector('.ad-form__reset');
resetButtonNode.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {disablePage, activePage, formNode, showMessagePopover, resetForm};
