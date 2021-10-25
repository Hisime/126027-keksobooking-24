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

export {disablePage, activePage};
