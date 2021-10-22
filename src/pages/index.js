import './styles/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import {
  editButton,
  addCardButton,
  formEditor,
  formCard,
  usernameInput,
  descriptionInput,
  cardsContainer,
  validationParams,
  initialCards
} from '../utils/constants.js';

const popupPhoto = new Popup('.popup_full-photo');

//Генерация валидации для форм
const validationProfileForm = new FormValidator(validationParams, formEditor);
const validationCardForm = new FormValidator(validationParams, formCard);

//Включение валидации
validationProfileForm.enableValidation();
validationCardForm.enableValidation();

//Использование класса UserInfo для работы c профилем пользователя
const userInfo = new UserInfo('.profile__name', '.profile__description');

//Открыть форму для редактирования профиля
function openProfilePopup() {
  validationProfileForm.hideInputErrors();
  validationProfileForm.enableSubmitButton();
  userInfo.getUserInfo(usernameInput, descriptionInput);
  popupProfile.open();
};

//Открыть форму для добавления карточки
function openCardPopup(){
  validationCardForm.hideInputErrors();
  validationCardForm.disableSubmitButton();
  popupCard.open();
};

const generateEachCard = (data) => {
  const card = new Card({data, handleCardClick(){
    const popupWithImage = new PopupWithImage('.popup_full-photo', data.link, data.name);
    popupWithImage.open();
    popupPhoto.setEventListeners();
  }});
  const cardElement = card.generateCard();
  return cardElement;
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (data) => {
    defaultCardList.addItem(generateEachCard(data));
  }
}, cardsContainer);
defaultCardList.renderItem();

// Объявление данных, содержащихся в карточках
const postingCardHandler = (cardInputs) => {
  const newCardElement = new Section({
    items: [cardInputs],
    renderer: (data) => {
      newCardElement.addItem(generateEachCard(data));
    }
  }, cardsContainer);
  newCardElement.renderItem();
  popupCard.close();
};

const submitProfileForm = (profileInputs) => {
  userInfo.setUserInfo(profileInputs);
  popupProfile.close();
}

const popupCard = new PopupWithForm('.popup_add-card', postingCardHandler, formCard);
const popupProfile = new PopupWithForm('.popup_edit-profile', submitProfileForm, formEditor);

popupCard.setEventListeners();
popupProfile.setEventListeners();
    
//Слушатель на открытие попап для редактирования профиля
editButton.addEventListener('click', openProfilePopup);

//Слушатель на открытие попап для добавления карточки
addCardButton.addEventListener('click', openCardPopup);
