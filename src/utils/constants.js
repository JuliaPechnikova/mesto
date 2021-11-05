// Добавление карточек на страницу
//Объявление данных формы редактирования профиля
const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const editAvatar = content.querySelector('.profile__add-photo-button');

//Кнопка добавления карточки
const addCardButton = content.querySelector('.profile__add-button');

//Формы на отправку
const formEditor = document.querySelector('#popup__form-editor');
const formCard = document.querySelector('#popup__form-card');
const formPhotoEditor = document.querySelector('#popup__form-profile-photo');
const formCardDelete = document.querySelector('#popup__delete-form-card');

//Данные формы редактирования
const usernameInput = document.querySelector('#username');
const descriptionInput = document.querySelector('#description');

//Секция, куда будут вставлятся карточки
const cardsContainer = content.querySelector('.elements');

//Шаблон карточки, вставляемый в секцию элементс
const cardTemplate = '#element-template';

//Параметры для валидации форм
const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {  
  editButton,
  addCardButton,
  editAvatar,
  formEditor,
  formCard,
  formPhotoEditor,
  formCardDelete,
  usernameInput,
  descriptionInput,
  cardsContainer,
  validationParams,
  cardTemplate,
  initialCards
};