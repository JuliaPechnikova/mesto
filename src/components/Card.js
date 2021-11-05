export default class Card {
  constructor({data, profileID, handleCardClick, handleCardDelete, handleCardLike, cardTemplate}) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._profileID = profileID;
    this._handleCardLike = handleCardLike;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._cardTemplate = cardTemplate;
    this._element = this._getTemplate();
    this._heartButton = this._element.querySelector('.element__button-heart');
    this._trashButton = this._element.querySelector('.element__trash-btn');
    this._heartCounter = this._element.querySelector('.element__button-heart-counter');
    this._elementImage = this._element.querySelector('.element__image');
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content 
    .querySelector('.element')
    .cloneNode(true);

    //Возврат DOM элемента карточки
    return cardElement;
  }

  generateCard() {

    this._setEventListeners();
  
    //Наполнение дефолтными данными карточек
    this._element.querySelector('.element__header').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this.countCardLikes(this._likes);
    this._checkLikeExists();
    this._checkCardOwner();
  
    return this._element;
  }

  _setEventListeners() {
    // //Добавление лайка
    this._heartButton.addEventListener('click', this._handleCardLike);
    //Удаление карточки
    this._trashButton.addEventListener('click', this._handleCardDelete);
    //Слушатель на открытие фото
    this._elementImage.addEventListener('click', () => this._handleCardClick());
  }

  countCardLikes(likesArr) {
    this._heartCounter.textContent = likesArr.length;
  }

  _checkLikeExists() {
    this._likes.forEach((card) => {
      if (card._id === this._profileID)
        this._heartButton.classList.add('element__button-heart_active')
      else {
        this._heartButton.classList.remove('element__button-heart_active');
      }
    });
  }

  _checkCardOwner() {
    if (this._data.owner._id === this._profileID)
      this._trashButton.classList.add('element__trash-btn_active')
    else {
      this._trashButton.classList.remove('element__trash-btn_active')
    };
  }

  removeCard(){
    this._element.remove();
  };
}



