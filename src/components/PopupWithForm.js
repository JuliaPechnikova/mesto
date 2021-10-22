import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitForm, popupForm){
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = popupForm;
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    //Отправить данные, введенные в форму
    this._popupForm.addEventListener('submit', () => this._submitForm(this._getInputValues()));
  }

  close(){
    this._popupForm.reset();
    super.close();
  }
}