import {addPinsToMap} from './map.js';
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

getData(addPinsToMap, showAlert);
setUserFormSubmit(formNode, onFormSubmitSuccess, onFormSubmitError);
