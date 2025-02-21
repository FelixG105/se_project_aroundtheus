export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeBtn = this._popupElement.querySelector(".modal_close");
    this._handleEscClose = 
  }

  open() {
    //NOTE - opens popup
  }

  close() {
    //NOTE - closes pop
  }

  _handleEscClose() {
    //NOTE - listens for esc button
  }

  setEventListeners() {
    //NOTE - sets event listeners
  }
}
