import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }, image, caption) {
    super(popupSelector);
    this._image = document.querySelector(image);
    this._caption = document.querySelector(caption);
  }

  open(data) {
    super.open();
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
  }

  close() {
    super.setEventListeners();
    super.close();
  }
}
