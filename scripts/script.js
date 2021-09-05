let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let open = false;
let personName = content.querySelector('.profile__name');
let description = content.querySelector('.profile__description');


//Добавление формы редактирования Имени и профессии пользователя

  function openedPopup() {

    //Добавление класса для отображения попап
    popup.classList.add('popup_opened');

    //Если попап был прописан, то повторно добавлятся не будет
    if (open === !true) {
      popup.insertAdjacentHTML('beforeend', `
      <div class="popup__container">
      <h2 class="popup__header">Редактировать профиль</h2>
      <form class="popup__texts" name="formdata" action="#" method="POST">
        <input type="text" value="${personName.textContent}" placeholder="Имя" class="popup__text" id="name" name="name">
        <input type="text" value="${description.textContent}" placeholder="О себе" class="popup__text" id="description" name="description">
        <button type="submit" class="popup__save-btn">Сохранить</button>
      </form>
      <button class="popup__close-btn" type="reset">
        <img class="popup__close-btn-image" src="./images/edit-form-image.svg" alt="X">
      </button>
      </div>`);

      open = true;
    };

    //Объявление переменных формы
    let nameInput = popup.querySelector('#name');
    let descriptionInput = popup.querySelector('#description');

    //Добавляем дефолтные значения, для того, чтобы сбрасывались данные при закрытии без отправки
    nameInput.value = `${personName.textContent}`;
    descriptionInput.value = `${description.textContent}`;
  
    //Функция сохранения данных, введенных в форму
    function submitForm(evt) {
      evt.preventDefault(); 
      personName.textContent = nameInput.value;
      description.textContent = descriptionInput.value; 
      closedPopup(); //Закрываем форму после редактирования
    };

    let closeButton = popup.querySelector('.popup__close-btn');

    //Слуушатель на форму при отправке
    popup.addEventListener('submit', submitForm);  

    //Закрытие попапа реализуется удалением класса
    function closedPopup() {
      popup.classList.remove('popup_opened');
    };

    closeButton.addEventListener('click', closedPopup);
  };

  editButton.addEventListener('click', openedPopup);

