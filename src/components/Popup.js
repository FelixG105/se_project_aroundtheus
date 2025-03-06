export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);

    this._popupClose = this._popupElement.querySelector(".modal__close");

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleModalClose = this._handleModalClose.bind(this);
    this._handleButtonClose = this._handleButtonClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleModalClose);
    document.removeEventListener("click", this._handleButtonClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleModalClose(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  _handleButtonClose(evt) {
    if (evt.target === this._popupClose) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("click", this._handleModalClose);
    document.addEventListener("click", this._handleButtonClose);
  }
}
