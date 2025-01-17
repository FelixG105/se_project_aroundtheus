class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputEl, errorMessage) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = errorMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError() {}

  _toggleButtonState() {}

  _hasInvalidInput() {}

  _checkInputValidity() {}

  _setEventListeners() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitBtn = this._form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(formEl, inputEl, options);
        toggleButtonState(inputEls, submitBtn, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}
const editFormValidator = new FormValidator();
editFormValidator.enableValidation();

export default FormValidator;
