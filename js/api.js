
const URL = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(`${URL}/data`)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => onError());
};

const setUserFormSubmit = (formNode, onSuccess, onError) => {
  formNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch(
      URL,
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        throw new Error('Не удалось отправить форму');
      }
    })
      .catch(() => {
        onError();
      });
  });
};

export {getData, setUserFormSubmit};

