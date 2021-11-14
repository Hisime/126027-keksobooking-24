const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const IMAGE_SIZE = '70';

const avatarFileNode = document.querySelector('.ad-form-header__input');
const avatarPreviewNode = document.querySelector('.ad-form-header__preview img');
const avatarPlaceholderUrl = avatarPreviewNode.src;


const photoFileNode = document.querySelector('.ad-form__input');
const photoPreviewNode = document.querySelector('.ad-form__photo');


avatarFileNode.addEventListener('change', () => {
  const file = avatarFileNode.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreviewNode.src = URL.createObjectURL(file);
  }
});


photoFileNode.addEventListener('change', () => {
  const file = photoFileNode.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const imgPreviewNode = document.createElement('img');
    imgPreviewNode.width = IMAGE_SIZE;
    imgPreviewNode.height = IMAGE_SIZE;
    imgPreviewNode.src = URL.createObjectURL(file);
    photoPreviewNode.appendChild(imgPreviewNode);
  }
});

const clearImages = () => {
  const photoImgNode =  photoPreviewNode.querySelector('img');
  avatarPreviewNode.src = avatarPlaceholderUrl;
  if (photoImgNode) {
    photoImgNode.remove();
  }
};


export {clearImages};
