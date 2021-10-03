import openPopup from "./script.js";

export default class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate
    .querySelector('.element')
    .cloneNode(true);

    //Возврат DOM элемента карточки
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();
  
    //Наполнение дефолтными данными карточек
    this._element.querySelector('.element__header').textContent = this._name;
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;
  
    return this._element;
  }

  _setEventListeners() {
    //Добавление лайка
    this._element.querySelector('.element__button-heart').addEventListener('click', this._likeCard);
    //Удаление карточки
    this._element.querySelector('.element__trash-btn').addEventListener('click', this._removeCard);
    //Слушатель на открытие фото
    this._element.querySelector('.element__image').addEventListener('click', () => this._openPhoto());
  }

  //Открыть фото карточки
  _openPhoto(){
    //Фото и подпись открываемых карточек
    const photo = document.querySelector('.popup__photo');
    const photoCaption = document.querySelector('.popup__photo-caption');

    photo.src = this._link;
    photo.alt = this._name;
    photoCaption.textContent = this._name;

    const popupPhoto = document.querySelector('.popup_full-photo');
    openPopup(popupPhoto);
  };

  //Лайк
  _likeCard(event){
    event.target.classList.toggle('element__button-heart_active');
  };

//Удалить карточку
  _removeCard(event){
    event.target.closest('.element').remove();
  };
}


