import {initialCards} from './initial-сards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//Объявление данных формы редактирования профиля
const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');

//Кнопка добавления карточки
const addCardButton = content.querySelector('.profile__add-button');

//Фото и подпись открываемых карточек
export const photo = document.querySelector('.popup__photo');
export const photoCaption = document.querySelector('.popup__photo-caption');

//Секции с попапами
const popupProfile = document.querySelector('.popup_edit-profile');
const popupCard = document.querySelector('.popup_add-card');
export const popupPhoto = document.querySelector('.popup_full-photo');

//Формы на отправку
const formEditor = document.querySelector('#popup__form-editor');
const formCard = document.querySelector('#popup__form-card');

//Объявление переменных для закрытия карточек
const closeButtonEditor = document.querySelector('.popup__close-btn_editor');
const closeButtonCard = document.querySelector('.popup__close-btn_card');
const closeButtonPhoto = document.querySelector('.popup__close-btn_photo');

//Данные формы редактирования
const usernameInput = document.querySelector('#username');
const descriptionInput = document.querySelector('#description');

//Данные формы карточек
const photoNameInput = document.querySelector('#photoname');
const linkInput = document.querySelector('#link');

//Секция, куда будут вставлятся карточки
const cardsContainer = content.querySelector('.elements');

//Параметры для валидации форм
const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//Генерация валидации для форм
const validationProfileForm = new FormValidator(validationParams, formEditor);
const validationCardForm = new FormValidator(validationParams, formCard);

//Включение валидации
validationProfileForm.enableValidation();
validationCardForm.enableValidation();

//Открыть форму для редактирования профиля
function openProfilePopup() {
  validationProfileForm.hideInputErrors();
  validationProfileForm.enableSubmitButton();
  usernameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
};

//Открыть форму для добавления карточки
function openCardPopup(){
  validationCardForm.hideInputErrors();
  validationCardForm.disableSubmitButton();
  photoNameInput.value = '';
  linkInput.value = '';
  openPopup(popupCard);
};

//Объявление данных, содержащихся в карточках
const postingCardHandler = (event) => {
  event.preventDefault();

  renderCard({
    name: photoNameInput.value,
    link: linkInput.value
  }, cardsContainer);
  formCard.reset();
  closePopup(popupCard);
};

const generateEachCard = (data) => {
  const card = new Card(data, cardsContainer);
  const cardElement = card.generateCard();
  return cardElement;
}

const renderCard = (data, place) => { 
  place.prepend(generateEachCard(data)); 
};
  
//Отображает начальный список карточек
initialCards.forEach((data) => {
  renderCard(data, cardsContainer);
});

//Функция отслеживает какой попап открыт и закрывает его
function closeOpenedPopup() {
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
};

//Закрыть попап по клавише ESC
function closePopupESC(evt) {
  if (evt.key === 'Escape') {
    closeOpenedPopup();
  };
};

//Закрыть попап по клику за пределы попапа
function closePopupOnClick(evt){
  if (evt.target.classList.contains('popup_opened')) {
    closeOpenedPopup();
  };
};

//Открыть/закрыть попапы

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupESC);
  popup.addEventListener('click', closePopupOnClick);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupESC);
  popup.removeEventListener('click', closePopupOnClick);
};

//Слушатели

//Отправить данные, введенные в форму
formEditor.addEventListener('submit', (event) => {
  event.preventDefault(); 
  profileName.textContent = usernameInput.value;
  profileDescription.textContent = descriptionInput.value; 
  closePopup(popupProfile);
});

//Добавление карточек при отправке формы
formCard.addEventListener('submit', postingCardHandler);

//Слушатель на открытие попап для редактирования профиля
editButton.addEventListener('click', openProfilePopup);

//Слушатель на открытие попап для добавления карточки
addCardButton.addEventListener('click', openCardPopup);

//Закрыть форму редактирования профиля
closeButtonEditor.addEventListener('click', () => {
  closePopup(popupProfile);
});

//Закрыть форму добавления карточки
closeButtonCard.addEventListener('click', () => {
  closePopup(popupCard);
});

//Закрыть фото с карточки
closeButtonPhoto.addEventListener('click', () => {
  closePopup(popupPhoto);
});


