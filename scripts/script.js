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

//Открыть форму для редактирования профиля
function editProfilePopup() {
  username.value = `${profileName.textContent}`;
  description.value = `${profileDescription.textContent}`;
  popupForm.classList.add('popup_opened');
};

//Отправить данные, ввведенные в форму
formEditor.addEventListener('submit', (event) => {
  event.preventDefault(); 
  profileName.textContent = username.value;
  profileDescription.textContent = description.value; 
  popupForm.classList.remove('popup_opened');
});

//Закрыть форму редактирования профиля
closeButtonEditor.addEventListener('click', () => {
  popupForm.classList.remove('popup_opened');
});

//Открыть форму для добавления карточки
function editCardPopup(){
  popupCard.classList.add('popup_opened');
};

//Отправить данные, введенные в форму карточки
formCard.addEventListener('submit', (event) => {
  event.preventDefault(); 
  popupCard.classList.remove('popup_opened'); 
});

//Закрыть форму добавления карточки
closeButtonCard.addEventListener('click', () => {
  popupCard.classList.remove('popup_opened');
});

//Открыть фото с карточки
function photoCardPopup(){
  popupPhoto.classList.add('popup_opened');
};

//Закрыть фото с карточки
closeButtonPhoto.addEventListener('click', () => {
  popupPhoto.classList.remove('popup_opened');
});

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

//Создание карточки
const createCard = (data) => {
  //Клонируем
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  
  //Наполнение дефолтными данными карточек
  cardElement.querySelector('.element__header').textContent = data.name;
  cardElement.querySelector('.element__image').setAttribute('src', data.link);
  cardElement.querySelector('.element__image').setAttribute('alt', data.name);

  //Добавление лайка
  cardElement.querySelector('.element__button-heart').addEventListener('click', like);
  
  //Удаление карточки
  cardElement.querySelector('.element__trash-btn').addEventListener('click', removeCard);

  //Слушатель на открытие фото
  cardElement.querySelector('.element__image').addEventListener('click', () => openPhoto(data));
  
  //Отображение карточек в секции elements
  cardsContainer.prepend(cardElement);
};

//Лайк
function like(event){
  event.target.classList.toggle('element__button-heart_active');
};

//Удалить карточку
function removeCard(event){
  event.target.closest('.element').remove();
}

//Открыть фото карточки
function openPhoto(data){
  document.querySelector('.popup__photo').setAttribute('src', data.link);
  document.querySelector('.popup__photo').setAttribute('alt', data.name);
  document.querySelector('.popup__photo-caption').textContent = data.name;
  photoCardPopup();
};

//Объявление данных, содержащихся в карточках
const postingCardHandler = (event) => {
  event.preventDefault();

  createCard({
    name: photoName.value,
    link: link.value
  });
  formCard.reset();
}

//Добавление карточек при отправке формы
formCard.addEventListener('submit', postingCardHandler);  

//Чтение данных из массива с карточками
initialCards.forEach((card) => {
  createCard(card);
});


//Слушатель на открытие попап для редактирования профиля
editButton.addEventListener('click', editProfilePopup);

//Слушатель на открытие попап для добавления карточки
addCardButton.addEventListener('click', editCardPopup);

