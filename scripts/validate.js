const showInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputerror = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Проверка валидности поля
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 

  if(!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputerror(inputElement, errorElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const hasNoInput = (inputList) => {
  return inputList.every(inputElement => {
    return inputElement.value.length === 0;
  });
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(inactiveButtonClass);
};

//Переключение состояния кнопки submit
const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  if (hasInvalidInput(inputList) || hasNoInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};

//обработчики событий одной формы
const setEventListeners  = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });
  });
}

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(formElement => {
    setEventListeners(formElement, 
      config.inputSelector,
      config.submitButtonSelector, 
      config.inputErrorClass, 
      config.errorClass, 
      config.inactiveButtonClass);
  });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
