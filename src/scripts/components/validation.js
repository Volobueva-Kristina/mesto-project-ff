const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.classList.add(validationSettings.errorClass);

  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);

  errorElement.textContent = '';
  inputElement.setCustomValidity("");
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, validationSettings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
}

const checkInputValidity = (formElement, inputElement, validationSettings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationSettings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
};

export function enableValidation(validationSettings) {
  const inputList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  inputList.forEach(formElement => {
    setEventListeners(formElement, validationSettings);
  });
}

export function resetValidation(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, validationSettings);
  });

  toggleButtonState(inputList, buttonElement, validationSettings);
}
