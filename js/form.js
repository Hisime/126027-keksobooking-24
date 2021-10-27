const form = document.querySelector('.ad-form');
const formDisabled = 'ad-form--disabled';
const formElements = form.querySelectorAll('fieldset');
const filter = document.querySelector('.map__filters');
const filterDisabled = 'map__filters--disabled';
const filterElements = filter.querySelectorAll('[class^=\'map__\']');

const disablePage = () => {
  filterElements.forEach((element) => {
    element.setAttribute('disabled', '');
  });
  form.classList.add(formDisabled);
  filter.classList.add(filterDisabled);
  formElements.forEach((element) => {
    element.setAttribute('disabled', '');
  });
};

const activePage = () => {
  filterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  form.classList.remove(formDisabled);
  filter.classList.remove(filterDisabled);
  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const roomSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');
const onRoomSelectChange = () => {
  const updateOptions = (optionList) => {
    capacityOptions.forEach((option) => {
      if (optionList.includes(option.value)) {
        option.removeAttribute('disabled');
      }
      else {
        option.setAttribute('disabled', '');
        if (capacitySelect.value === option.value) {
          capacitySelect.value = '';
        }
      }
    });
  };

  if (roomSelect.value === '1') {
    updateOptions(['1']);
  }
  if (roomSelect.value === '2') {
    updateOptions(['1', '2']);
  }
  if (roomSelect.value === '3') {
    updateOptions(['1', '2', '3']);
  }
  if (roomSelect.value === '100') {
    updateOptions(['0']);
  }
};

onRoomSelectChange();
roomSelect.addEventListener('change', onRoomSelectChange);

export {disablePage, activePage};
