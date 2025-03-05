export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);

    this._popupClose = this._popupElement.querySelector(".modal__close");

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    console.log("handle esc close has run");
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //this._popupElement.addEventListener("click", () => this.close());
  }
}
