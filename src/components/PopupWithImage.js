import Popup from "./Popup.js";

class PopupWithImage extend Popup{
  constructor() {

  open() {
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
  }

  close() {
    super.close();
  }

  s
}


// index.js


const cardPopup = new PopupWithImage("#preview-image-modal", ()=> {});

cardPopup.open();