
let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let personName = content.querySelector('.profile__name');
let description = content.querySelector('.profile__description');
let addCardButton = content.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-btn');
let form = popup.querySelector('.popup__texts');
let popupIdFirstfield = popup.querySelector('#popup-id-firstfield');
let popupIdSecondfield = popup.querySelector('#popup-id-secondfield');

function editProfilePopup () {
  popup.querySelector('.popup__header').textContent = 'Редактировать профиль';
  popupIdFirstfield.value = `${personName.textContent}`;
  popupIdSecondfield.value = `${description.textContent}`;
  popupIdFirstfield.placeholder = 'Имя';
  popupIdSecondfield.placeholder = 'О себе';
  popupIdFirstfield.name= 'profile-name';
  popupIdSecondfield.name = 'description';
  form.name = 'edit-profile';
  openedPopup();
}

function editCardPopup () {
  popup.querySelector('.popup__header').textContent = 'Новое место';
  popupIdFirstfield.value = '';
  popupIdSecondfield.value = '';
  popupIdFirstfield.placeholder = 'Название';
  popupIdSecondfield.placeholder = 'Ссылка на картинку';
  popupIdFirstfield.name = 'name';
  popupIdSecondfield.name = 'link';
  form.name = 'edit-place';
  openedPopup();
}

// Функция открытия попап
function openedPopup() {
  //Добавление класса для отображения попап
  popup.classList.add('popup_opened');
};

//Функция сохранения данных, введенных в форму
function submitForm(event) {
  event.preventDefault(); 
  if (form.name === 'edit-profile') {
    //Добавление данных из профиля в форму
    personName.textContent = popupIdFirstfield.value;
    description.textContent = popupIdSecondfield.value; 
  }
  else {
    //Отправка данных по карточке
    addCards(popupIdFirstfield.value, popupIdSecondfield.value);
  }
  closedPopup(); //Закрываем форму после редактирования
};

//Функция закрытия попап
function closedPopup() {
  popup.classList.remove('popup_opened');
};

//Слушатель на открытие попап для редактирования профиля
editButton.addEventListener('click', editProfilePopup);
//Слушатель на открытие попап для добавления карточки
addCardButton.addEventListener('click', editCardPopup);

//Слушатель на форму при отправке
//form.addEventListener('submit', submitForm);  

//Слушатель на закрытие попап
closeButton.addEventListener('click', closedPopup);

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

//Секция добавления карточек 
const cardsContainer = content.querySelector('.elements');

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

  //Отображение карточек в секции elements
  cardsContainer.prepend(cardElement);
};

const postingCardHandler = (event) => {
  event.preventDefault();

  addCard({
    name: cardName,
    link: cardLink
  });
  form.reset();
}

form.addEventListener('submit', postingCardHandler);  

initialCards.forEach((card) => {
  addCard(card);
});
