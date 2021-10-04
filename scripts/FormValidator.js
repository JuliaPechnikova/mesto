export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _hasInvalidInput = () => {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };
  
  _hasNoInput = () => {
    return this._inputList.every(inputElement => {
      return inputElement.value.length === 0;
    });
  };

  disableSubmitButton = () => {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  };
  
  enableSubmitButton = () => {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  };
  
  //Переключение состояния кнопки submit
  _toggleButtonState = () => {
  const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(this._inputList) || this._hasNoInput(this._inputList)) {
      this.disableSubmitButton(buttonElement);
    } else {
      this.enableSubmitButton(buttonElement);
    }
  };

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); 
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); 
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  
  //Проверка валидности поля
  _checkInputValidity = (inputElement) => {
  
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this.hideInputError(inputElement);
    }
  };

  _setEventListeners  = () => {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  
    this._inputList.forEach(inputElement => {
      this.hideInputError(inputElement);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}


