import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._popupSubmit = this._popupForm.querySelector(".modal__submit");
    this._submitBtnText = this._popupSubmit.textContent;
  }

  _getInputValues() {
    const inputObj = {};
    this._inputs.forEach((input) => {
      inputObj[input.name] = input.value;
    });
    // returns data as object
    return inputObj;
  }

  open(data) {
    super.open();
    this._data = data;
    // // Find and focus the submit/confirm button
    if (this._popupSubmit) {
      this._popupSubmit.focus();
    }
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._popupSubmit.textContent = loadingText;
    } else {
      this._popupSubmit.textContent = this._submitBtnText;
    }
  }

  getForm() {
    return this._popupForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this._data) {
        this._handleFormSubmit(this._data);
      } else {
        const inputValues = this._getInputValues();

        this._handleFormSubmit(inputValues);
      }
    });
  }

  reset() {
    this._popupForm.reset();
  }
}
