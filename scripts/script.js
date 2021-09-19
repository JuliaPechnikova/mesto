//Объявление данных формы редактирования профиля
const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');

//Кнопка добавления карточки
const addCardButton = content.querySelector('.profile__add-button');

//Секции с попапами
const popupProfile = document.querySelector('.popup_edit-profile');
const popupCard = document.querySelector('.popup_add-card');
const popupPhoto = document.querySelector('.popup_full-photo');

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

//Фото и подпись открываемых карточек
const photo = document.querySelector('.popup__photo');
const photoCaption = document.querySelector('.popup__photo-caption');

//Секция, куда будут вставлятся карточки
const cardsContainer = content.querySelector('.elements');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//Закрыть попап по клавише ESC
function closePopupESC(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupProfile);
    closePopup(popupCard);
    closePopup(popupPhoto);
  };
}

//Закрыть попап по клику за пределы попапа
function closePopupOnClick(evt){
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popupProfile);
    closePopup(popupCard);
    closePopup(popupPhoto);
  }
}


//Открыть форму для редактирования профиля
function openProfilePopup() {
  usernameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
};

//Открыть форму для добавления карточки
function openCardPopup(){
  photoNameInput.value = '';
  linkInput.value = '';
  openPopup(popupCard);
};


//Находим шаблон с карточками
const cardTemplate = document.querySelector('#element-template').content;

//Создание карточки
const createCard = (data) => {
  //Клонируем
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  
  //Наполнение дефолтными данными карточек
  cardElement.querySelector('.element__header').textContent = data.name;
  cardElement.querySelector('.element__image').src = data.link;
  cardElement.querySelector('.element__image').alt = data.name;

  //Добавление лайка
  cardElement.querySelector('.element__button-heart').addEventListener('click', likeCard);
  
  //Удаление карточки
  cardElement.querySelector('.element__trash-btn').addEventListener('click', removeCard);

  //Слушатель на открытие фото
  cardElement.querySelector('.element__image').addEventListener('click', () => openPhoto(data));

  return cardElement;
};


//Отображение карточек в секции elements
const renderCard = (data, place) => {
  place.prepend(createCard(data));
};


//Лайк
function likeCard(event){
  event.target.classList.toggle('element__button-heart_active');
};

//Удалить карточку
function removeCard(event){
  event.target.closest('.element').remove();
}

//Открыть фото карточки
function openPhoto(data){
  photo.src = data.link;
  photo.alt = data.name;
  photoCaption.textContent = data.name;
  openPopup(popupPhoto);
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
}

//Чтение данных из массива с карточками
initialCards.forEach((data) => {
  renderCard(data, cardsContainer);
});

//Отправить данные, введенные в форму
formEditor.addEventListener('submit', (event) => {
  event.preventDefault(); 
  profileName.textContent = usernameInput.value;
  profileDescription.textContent = descriptionInput.value; 
  closePopup(popupProfile);
});

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

//Добавление карточек при отправке формы
formCard.addEventListener('submit', postingCardHandler);  

//Слушатель на открытие попап для редактирования профиля
editButton.addEventListener('click', openProfilePopup);

//Слушатель на открытие попап для добавления карточки
addCardButton.addEventListener('click', openCardPopup);

//Cлушатель на нажатие ESC при открытом попап
document.addEventListener('keydown', closePopupESC);

//Слушатель на нажатие за пределы попапа
document.addEventListener('click', closePopupOnClick);