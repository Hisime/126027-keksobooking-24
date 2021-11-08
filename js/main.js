import {addPinsToMap, setFilterForm} from './map.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './api.js';
import { formNode, resetForm, showMessagePopover} from './form.js';
import { showAlert } from './utils.js';

const onFormSubmitSuccess = () => {
  showMessagePopover('success');
  resetForm();
};

const onFormSubmitError = () => {
  showMessagePopover('error');
};

getData((offerList) => {
  addPinsToMap(offerList);
  setFilterForm(offerList);
}, showAlert);
setUserFormSubmit(formNode, onFormSubmitSuccess, onFormSubmitError);
