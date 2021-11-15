import {addPinsToMap, loadMap, setFilterForm} from './map.js';
import { getData, setUserFormSubmit } from './api.js';
import {activateFilterForm, formNode, resetForm, showMessagePopover} from './form.js';
import { showAlert } from './utils.js';

const onFormSubmitSuccess = () => {
  showMessagePopover('success');
  resetForm();
};

const onFormSubmitError = () => {
  showMessagePopover('error');
};


setUserFormSubmit(formNode, onFormSubmitSuccess, onFormSubmitError);
loadMap(() => {
  getData((offerList) => {
    addPinsToMap(offerList);
    setFilterForm(offerList);
    activateFilterForm();
  }, showAlert);
});
