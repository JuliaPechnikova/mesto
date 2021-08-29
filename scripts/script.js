let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-btn');
let personName = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let saveButton = document.querySelector('.popup__save-btn');

popup.classList.remove('popup_opened');

function popupOpened() {
  popup.classList.add('popup_opened');
  let nameInput = document.querySelector('.popup__name');
  let descriptionInput = document.querySelector('.popup__description');

  function addProfileInfo(evt) {
    evt.preventDefault();
    personName.textContent = `${nameInput.value}`;
    description.textContent = `${descriptionInput.value}`;
    popupClosed();
  }

  function popupClosed() {
    nameInput.value = personName.textContent;
    descriptionInput.value = description.textContent;
    popup.classList.remove('popup_opened');
  }

  closeButton.addEventListener('click', popupClosed);
  saveButton.addEventListener('submit', addProfileInfo);
  saveButton.addEventListener('click', addProfileInfo);
}

editButton.addEventListener('click', popupOpened);