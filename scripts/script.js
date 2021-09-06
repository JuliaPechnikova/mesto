let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let open = false;
let personName = content.querySelector('.profile__name');
let description = content.querySelector('.profile__description');

//Добавление формы редактирования Имени и профессии пользователя

content.insertAdjacentHTML('beforeend', `
<div class="popup">
  <div class="popup__container">
  <h2 class="popup__header">Редактировать профиль</h2>
  <form class="popup__texts" name="formdata" action="#" method="POST">
    <input type="text" value="Жак-Ив Кусто" placeholder="Имя" class="popup__text" id="name" name="name">
    <input type="text" value="Исследователь океана" placeholder="О себе" class="popup__text" id="description" name="description">
    <button type="submit" class="popup__save-btn">Сохранить</button>
  </form>
  <button class="popup__close-btn" type="reset">
    <img class="popup__close-btn-image" src="./images/edit-form-image.svg" alt="X">
  </button>
  </div>
</div>`);

//Объявление переменных после внесения текста попапа в тело main 
let popup = content.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-btn');
let nameInput = popup.querySelector('#name');
let descriptionInput = popup.querySelector('#description');
let form = popup.querySelector('.popup__texts');

// Функция открытия попап
function openedPopup() {
  //Добавление класса для отображения попап
  popup.classList.add('popup_opened');
      
  //Добавление данных из профиля в форму
  nameInput.value = `${personName.textContent}`;
  descriptionInput.value = `${description.textContent}`;
};

//Функция сохранения данных, введенных в форму
function submitForm(evt) {
  evt.preventDefault(); 
  personName.textContent = nameInput.value;
  description.textContent = descriptionInput.value; 
  closedPopup(); //Закрываем форму после редактирования
};

//Функция закрытия попап
function closedPopup() {
  popup.classList.remove('popup_opened');
};

//Слушатель на открытие попап
editButton.addEventListener('click', openedPopup);

//Слушатель на форму при отправке
form.addEventListener('submit', submitForm);  

//Слушатель на закрытие попап
closeButton.addEventListener('click', closedPopup);

