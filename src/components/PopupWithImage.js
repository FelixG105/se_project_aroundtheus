import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, image, caption) {
    super(popupSelector);
    this._image = image;
    this._caption = caption;
  }

  open(data) {
    super.open();
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
  }

  close() {
    super.close();
  }
}

// // index.js
// const cardPopup = new PopupWithImage("#preview-image-modal", () => {});

// cardPopup.open();
