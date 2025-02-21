import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;

    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    return document
      .querySelector(this._popupSelector)
      .content.querySelector(".modal")
      .cloneNode(true);
  }
}

// index.js
const newCardPopup = new PopupWithForm("#add-card-modal", () => {});

newCardPopup.open();
newCardPopup.close();
