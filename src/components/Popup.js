export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);

    this._popupClose = this._popupElement.querySelectorAll(".modal__close");

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedModal = this._popupElement.querySelector(".modal_opened");
      if (openedModal) {
        this._handleEscClose(openedModal);
      }
    }
  }

  setEventListeners() {
    document.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("click", () => {
      if (e.target === this._popupElement) {
        this.close();
      }
    });
  }
}
