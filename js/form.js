import { MAP_CENTER, resetMap } from './map.js';
import { clearImages } from './photos.js';

const MinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const OptionsMap = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};


const formNode = document.querySelector('.ad-form');
const formDisabledClass = 'ad-form--disabled';
const formListNode = formNode.querySelectorAll('fieldset');
const filterNode = document.querySelector('.map__filters');
const filterDisabledClass = 'map__filters--disabled';
const filterListNode = filterNode.querySelectorAll('[class^=\'map__\']');

const disablePage = () => {
  filterListNode.forEach((node) => {
    node.disabled = true;
  });
  formNode.classList.add(formDisabledClass);
  filterNode.classList.add(filterDisabledClass);
  formListNode.forEach((node) => {
    node.disabled = true;
  });
};

const activateMainForm = () => {
  formNode.classList.remove(formDisabledClass);
  formListNode.forEach((node) => {
    node.disabled = false;
  });
};

const activateFilterForm = () => {
  filterListNode.forEach((node) => {
    node.disabled = false;
  });
  filterNode.classList.remove(filterDisabledClass);
};

const roomSelectNode = formNode.querySelector('#room_number');
const capacitySelectNode = formNode.querySelector('#capacity');
const capacityOptionListNode = capacitySelectNode.querySelectorAll('option');
const onRoomSelectNodeChange = () => {
  const updateOptions = (optionList = []) => {
    capacityOptionListNode.forEach((option) => {
      if (optionList.includes(option.value)) {
        option.disabled = false;
      }
      else {
        option.disabled = true;
        if (capacitySelectNode.value === option.value) {
          capacitySelectNode.value = '';
        }
      }
    });
  };
  updateOptions(OptionsMap[roomSelectNode.value]);
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

const onHouseTypeSelectNodeChange = (noValidate) => {
  const setMinPrice = (minPrice) => {
    pricePerNightNode.min = minPrice;
    pricePerNightNode.placeholder = minPrice;
  };
  const minValidatorValue = MinPrices[typeHouseSelectNode.value.toUpperCase()];

  setMinPrice(minValidatorValue);
  if (!noValidate) {
    validatePrice();
  }
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
  filterNode.reset();
  onHouseTypeSelectNodeChange(true);
  onRoomSelectNodeChange();
  resetMap();
  clearImages();
  addressNode.value = `${MAP_CENTER.lat}, ${MAP_CENTER.lng}`;
  filterNode.dispatchEvent(new Event('change'));
};

const resetButtonNode = formNode.querySelector('.ad-form__reset');
resetButtonNode.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {disablePage, activateFilterForm, activateMainForm, formNode, showMessagePopover, resetForm};
