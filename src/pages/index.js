import './styles/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
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
  cardTemplate,
  initialCards
} from '../utils/constants.js';

//Генерация валидации для форм
const validationProfileForm = new FormValidator(validationParams, formEditor);
const validationCardForm = new FormValidator(validationParams, formCard);

const popupWithImage = new PopupWithImage('.popup_full-photo');
popupWithImage.setEventListeners();

//Включение валидации
validationProfileForm.enableValidation();
validationCardForm.enableValidation();

//Использование класса UserInfo для работы c профилем пользователя
const userInfo = new UserInfo('.profile__name', '.profile__description');

//Открыть форму для редактирования профиля
function openProfilePopup() {
  validationProfileForm.resetValidation();
  validationProfileForm.enableSubmitButton();
  const userInfoData = userInfo.getUserInfo();
  usernameInput.value = userInfoData.usernameInput;
  descriptionInput.value = userInfoData.descriptionInput;
  popupProfile.open();
};

//Открыть форму для добавления карточки
function openCardPopup(){
  validationCardForm.resetValidation();
  popupCard.open();
};

const generateEachCard = (data) => {
  const card = new Card({data, handleCardClick(){
    popupWithImage.open(data.link, data.name);
  }, cardTemplate});
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
  defaultCardList.addItem(generateEachCard(cardInputs));
  popupCard.close();
};

const submitProfileForm = (profileInputs) => {
  userInfo.setUserInfo(profileInputs);
  popupProfile.close();
}

const popupCard = new PopupWithForm('.popup_add-card', postingCardHandler);
const popupProfile = new PopupWithForm('.popup_edit-profile', submitProfileForm);

popupCard.setEventListeners();
popupProfile.setEventListeners();
    
//Слушатель на открытие попап для редактирования профиля
editButton.addEventListener('click', openProfilePopup);

//Слушатель на открытие попап для добавления карточки
addCardButton.addEventListener('click', openCardPopup);
