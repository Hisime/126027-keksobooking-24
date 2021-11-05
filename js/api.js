

const getData = (onSuccess, onError) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
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
      'https://24.javascript.pages.academy/keksobooking',
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

