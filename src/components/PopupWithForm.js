import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._popupSubmit = this._popupForm.querySelector(".modal__submit");
  }

  _getInputValues() {
    const inputObj = {};
    this._inputs.forEach((input) => {
      inputObj[input.name] = input.value;
    });
    // returns data as object
    return inputObj;
  }

  open(cardData) {
    super.open();
    if (this._popupElement.id === "confirm-delete-modal") {
      this._cardToDelete = cardData;

      // Find and focus the submit/confirm button
      const submitButton = this._popupForm.querySelector(".modal__submit");
      if (submitButton) {
        submitButton.focus();
      }
    }
  }

  renderLoading(isLoading) {
    if (isLoading === true) {
      this._popupSubmit.textContent = "Saving...";
    } else {
      this._popupSubmit.textContent = "Save";
    }
  }

  getForm() {
    return this._popupForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this._popupElement.id === "confirm-delete-modal") {
        const { cardId, cardElement } = this._cardToDelete;

        this._handleFormSubmit(cardId, cardElement);
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
