import './styles/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ProfilePhoto from '../components/ProfilePhoto.js';
import Api from '../components/Api.js';

import {
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
  cardTemplate
} from '../utils/constants.js';

import PopupWithConfirmation from '../components/PopupWithConfirmation.js';



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29/',
  headers: {
    'authorization': 'f941cb39-a05b-48d7-86db-8f1e836b871d',
    'Content-Type': 'application/json'
  }
});

//Генерация валидации для форм
const validationProfileForm = new FormValidator(validationParams, formEditor);
const validationCardForm = new FormValidator(validationParams, formCard);
const validationProfilePhotoForm = new FormValidator(validationParams, formPhotoEditor);
const validationCardDelete = new FormValidator(validationParams, formCardDelete);

const popupWithImage = new PopupWithImage('.popup_full-photo');
popupWithImage.setEventListeners();

//Включение валидации
validationProfileForm.enableValidation();
validationCardForm.enableValidation();
validationProfilePhotoForm.enableValidation();
validationCardDelete.enableValidation();

//Использование класса UserInfo для работы c профилем пользователя
const userInfo = new UserInfo('.profile__name', '.profile__description');
//Использование класса ProfilePhoto для работы c фото профиля
const profilePhoto = new ProfilePhoto('.profile__avatar');

let profileID = null;
let userInfoData = null;
let deletingCard = null;
let cardID = null;

api.getAllInfo()
  .then(([cards, profileData]) => {
    profileID = profileData._id;
    userInfo.setUserInfo(profileData);
    profilePhoto.setUserPhoto(profileData);
    defaultCardList.renderItem(cards);
  })
  .catch(err => console.log(`Ошибка инициализации данных: ${err}`));


//Открыть форму для редактирования профиля
function openProfilePopup() {
  validationProfileForm.resetValidation();
  validationProfileForm.enableSubmitButton();
  userInfoData = userInfo.getUserInfo();
  usernameInput.value = userInfoData.usernameInput;
  descriptionInput.value = userInfoData.descriptionInput;
  popupProfile.open();
};

//Открыть форму для добавления карточки
function openCardPopup(){
  validationCardForm.resetValidation();
  popupCard.open();
};

//Открыть форму для добавления фото профиля
function openProfilePhotoPopup(){
  validationProfilePhotoForm.resetValidation();
  popupPhotoProfile.open();
};

const generateEachCard = (data) => {
  const card = new Card({data,
    profileID, 
    handleCardClick(){
      popupWithImage.open(data.link, data.name);
    },
    handleCardDelete(){
      popupDeleteCard.open();
      deletingCard = card;
      cardID = data._id;
    },
    handleCardLike(event) {
      if (event.target.classList.contains('element__button-heart_active')) {
        api.deleteCardLikes(data._id)
        .then((data) => {
          event.target.classList.remove('element__button-heart_active');
          card.countCardLikes(data.likes);
        })
        .catch(err => console.log(`Ошибка удаления лайка: ${err}`));
      } else {
        api.putCardLikes(data._id)
        .then((data) => {
          event.target.classList.add('element__button-heart_active');
          card.countCardLikes(data.likes);
        })
        .catch(err => console.log(`Ошибка добавления лайка: ${err}`));
      }
    }, cardTemplate});
  const cardElement = card.generateCard();
  return cardElement;
}

const defaultCardList = new Section({
  renderer: (data) => {
    defaultCardList.addItem(generateEachCard(data));
  }
}, cardsContainer);

// Объявление данных, содержащихся в карточках
const postingCardHandler = (cardInputs) => {
  saveMessage (formCard, 'Сохранение...');
  api.setCard(cardInputs.link, cardInputs.name)
  .then((data) => {
    defaultCardList.addItem(generateEachCard(data));
    popupCard.close();
  })
  .catch(err => console.log(`Ошибка создания карточки: ${err}`))
  .finally(() => {
    saveMessage(formCard, 'Сохранить');
  });
};

const submitProfileForm = (profileInputs) => {
  saveMessage (formEditor, 'Сохранение...');
  userInfo.setUserInfo(profileInputs);
  userInfoData = userInfo.getUserInfo();
  api.setUserProfile(userInfoData.usernameInput, userInfoData.descriptionInput)
  .then(() => {
    popupProfile.close();
  })
  .catch(err => console.log(`Ошибка изменения параметров профиля: ${err}`))
  .finally(() => {
    saveMessage (formEditor, 'Сохранить');
  });
}

const submitProfilePhoto = (profileInputs) => {
  saveMessage (formPhotoEditor, 'Сохранение...');
  profilePhoto.setUserPhoto(profileInputs);
  api.setUserAvatar(profilePhoto.getUserPhoto())
  .then(() => {
    popupPhotoProfile.close();
  })
  .catch(err => console.log(`Ошибка изменения аватара: ${err}`))
  .finally(() => {
    saveMessage (formPhotoEditor, 'Сохранить');
  });
}

function saveMessage (savingForm, showMessage) {
  savingForm.querySelector('.popup__button').textContent = showMessage;
}

const submitCardDelete = () => {
  api.deleteCard(cardID)
  .then(() => {
    deletingCard.removeCard();
    popupDeleteCard.close();
    })
  .catch(err => console.log(`Ошибка удаления карточки: ${err}`));
}

const popupCard = new PopupWithForm('.popup_add-card', postingCardHandler);
const popupProfile = new PopupWithForm('.popup_edit-profile', submitProfileForm);
const popupPhotoProfile = new PopupWithForm('.popup_edit-prifile-photo', submitProfilePhoto);
const popupDeleteCard = new PopupWithConfirmation('.popup_delete-card', submitCardDelete);

popupCard.setEventListeners();
popupProfile.setEventListeners();
popupPhotoProfile.setEventListeners();
popupDeleteCard.setEventListeners();
    
//Слушатель на открытие попап для редактирования профиля
editButton.addEventListener('click', openProfilePopup);

//Слушатель на открытие попап для редактирования фото профиля
editAvatar.addEventListener('click', openProfilePhotoPopup);

//Слушатель на открытие попап для добавления карточки
addCardButton.addEventListener('click', openCardPopup);
