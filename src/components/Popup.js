export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    console.log(this._popupElement);
    this._popupClose = this._popupElement.querySelectorAll(".modal__close");

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add(".modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove(".modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("click", () => this.close());
    // this._popupElement.addEventListener("click", () => {
    //   if (e.target === this._popupElement) {
    //     this.close();
    //   }
    // });
  }
}
