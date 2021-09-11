//Объявление данных формы редактирования профиля
const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');

//Кнопка добавления карточки
const addCardButton = content.querySelector('.profile__add-button');

//Секции с попапами
const popupForm = document.querySelector('.popup_edit-form');
const popupCard = document.querySelector('.popup_edit-card');
const popupPhoto = document.querySelector('.popup_full-photo');

//Формы на отправку
const formEditor = document.querySelector('#popup__form-editor');
const formCard = document.querySelector('#popup__form-card');

//Объявление переменных для закрытия карточек
const closeButtonEditor = document.querySelector('.popup__close-btn_editor');
const closeButtonCard = document.querySelector('.popup__close-btn_card');
const closeButtonPhoto = document.querySelector('.popup__close-btn_photo');

//Данные формы редактирования
const username = document.querySelector('#username');
const description = document.querySelector('#description');

//Данные формы карточек
const photoName = document.querySelector('#photoname');
const link = document.querySelector('#link');

//Секция, куда будут вставлятся карточки
const cardsContainer = content.querySelector('.elements');

//Функция попапа, заменяющая данные профиля
function editProfilePopup() {
  username.value = `${profileName.textContent}`;
  description.value = `${profileDescription.textContent}`;
  popupForm.classList.add('popup_opened');

  formEditor.addEventListener('submit', (event) => {
    profileName.textContent = username.value;
    profileDescription.textContent = description.value; 
    event.preventDefault(); 
    popupForm.classList.remove('popup_opened');
  });
  closeButtonEditor.addEventListener('click', () => {
    popupForm.classList.remove('popup_opened');
  });
};

//Функция попапа, добавляющая карточки по кнопке
function editCardPopup(){
  popupCard.classList.add('popup_opened');
  formCard.addEventListener('submit', (event) => {
    event.preventDefault(); 
    popupCard.classList.remove('popup_opened'); 
  });

  closeButtonCard.addEventListener('click', () => {
    popupCard.classList.remove('popup_opened');
  });
};

//Функция попапа, увеличивающая карточку
function photoCardPopup(){
  popupPhoto.classList.add('popup_opened');

  closeButtonPhoto.addEventListener('click', () => {
    popupPhoto.classList.remove('popup_opened');
  });
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
  cardElement.querySelector('.element__image').setAttribute('alt', data.name);

  //Добавление лайка
  cardElement.querySelector('.element__button-heart').addEventListener('click', (event) => {
    event.target.classList.toggle('element__button-heart_active');
  });
  
  //Добавлении функция удаления карточки
  cardElement.querySelector('.element__trash-btn').addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });

  //Слушатель на открытие фото
  cardElement.querySelector('.element__image').addEventListener('click', () => {
    document.querySelector('.popup__photo').setAttribute('src', data.link);
    document.querySelector('.popup__photo').setAttribute('alt', data.name);
    document.querySelector('.popup__photo-caption').textContent = data.name;
    photoCardPopup();
  });
  
  //Отображение карточек в секции elements
  cardsContainer.prepend(cardElement);
};

//Объявление данных, содержащихся в карточках
const postingCardHandler = (event) => {
  event.preventDefault();

  addCard({
    name: photoName.value,
    link: link.value
  });
  formCard.reset();
}

//Добавление карточек при отправке формы
formCard.addEventListener('submit', postingCardHandler);  

//Чтение данных из массива с карточками
initialCards.forEach((card) => {
  addCard(card);
});


//Слушатель на открытие попап для редактирования профиля
editButton.addEventListener('click', editProfilePopup);

//Слушатель на открытие попап для добавления карточки
addCardButton.addEventListener('click', editCardPopup);

