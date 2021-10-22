import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector, link, name){
    super(popupSelector);
    this._link = link;
    this._name = name;
    this._photo = document.querySelector('.popup__photo');
    this._caption = document.querySelector('.popup__photo-caption');
  }
  open(){
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._caption.textContent = this._name;

    super.open();
  }
}