
let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let profileName = content.querySelector('.profile__name');
let profileDescription = content.querySelector('.profile__description');
let addCardButton = content.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let popupCard = document.querySelector('.popup_edit-card');
let popupForm = document.querySelector('.popup_edit-form');
let popupPhoto = document.querySelector('.popup_full-photo');

let closeButton = popup.querySelector('.popup__close-btn');
let form = popup.querySelector('.popup__texts');
let username = form.querySelector('#username');
let description = form.querySelector('#description');
let photoName = form.querySelector('#photoname');
let link = form.querySelector('#link');
//Секция добавления карточек 
const cardsContainer = content.querySelector('.elements');

function editProfilePopup() {
  username.value = `${profileName.textContent}`;
  description.value = `${profileDescription.textContent}`;
  popupForm.classList.add('popup_opened');
  form.addEventListener('submit', (event) => {
    profileName.textContent = username.value;
    profileDescription.textContent = description.value; 
    event.preventDefault(); 
    closedPopup(); //Закрываем форму после редактирования
  });
}

function editCardPopup(){
  popupCard.classList.add('popup_opened');
  form.addEventListener('submit', (event) => {

    event.preventDefault(); 
    closedPopup(); //Закрываем форму после редактирования
  });
}

function photoCardPopup(){
  popupPhoto.classList.add('popup_opened');
}

//Функция закрытия попап
function closedPopup() {
  popup.classList.remove('popup_opened');
};

// Добавление карточек на страницу
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

//Находим шаблон с карточками
const cardTemplate = document.querySelector('#element-template').content;

const addCard = (data) => {
  //Клонируем
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  
  //Поля заголовков и картинок, которые будут менятся
  cardElement.querySelector('.element__header').textContent = data.name;
  cardElement.querySelector('.element__image').setAttribute('src', data.link);
  cardElement.querySelector('.element__trash-btn').addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });
  //Слушатель на открытие фото
  cardElement.querySelector('.element__image').addEventListener('click', () => {
    document.querySelector('.popup__photo').setAttribute('src', data.link);
    photoCardPopup();
  });
  

  //Отображение карточек в секции elements
  cardsContainer.prepend(cardElement);
};

const postingCardHandler = (event) => {
  event.preventDefault();

  addCard({
    name: photoName.value,
    link: link.value
  });
  form.reset();
}

form.addEventListener('submit', postingCardHandler);  

initialCards.forEach((card) => {
  addCard(card);
});


//Слушатель на открытие попап для редактирования профиля
editButton.addEventListener('click', editProfilePopup);
//Слушатель на открытие попап для добавления карточки
addCardButton.addEventListener('click', editCardPopup);

