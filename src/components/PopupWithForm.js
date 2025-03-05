import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = document.querySelector(".modal__form");
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputObj = {};
    this._inputs.forEach((input) => {
      inputObj[input.name] = input.value;
    });
    // returns data as object
    return inputObj;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }
}

// index.js
// const newCardPopup = new PopupWithForm("#add-card-modal", () => {});

// newCardPopup.open();
// newCardPopup.close();
