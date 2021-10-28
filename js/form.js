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
const onroomSelectNodeChange = () => {
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

onroomSelectNodeChange();
roomSelectNode.addEventListener('change', onroomSelectNodeChange);

export {disablePage, activePage};
