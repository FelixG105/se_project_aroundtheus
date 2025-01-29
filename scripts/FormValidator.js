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

  _hideInputError() {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    if (_hasInvalidInput(inputEls)) {
      this._submitBtn.classList.add(this._inactiveButtonClass);
      this._submitBtn.disabled = true;
      return;
    }
    this._submitBtn.classList.remove(inactiveButtonClass);
    this._submitBtn.disabled = false;
  }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity() {
    if (!inputEl.validity.valid) {
      return _showInputError(formEl, inputEl, options);
    }
    _hideInputError(formEl, inputEl, options);
  }

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
    setEventListeners(formEl, options);
  }
}

export default FormValidator;
