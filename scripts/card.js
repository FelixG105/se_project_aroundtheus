class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
  }
  //!Need help with functions from index.js
  _openPopup() {
    this._cardElement.classList.add("modal_opened");
    this._cardElement.addEventListener("keydown", closeModalEsc);
  }

  _closePopup() {
    this._cardElement.classList.remove("modal_opened");
    this._cardElement.removeEventListener("keydown", closeModalEsc);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture();
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement.classList // .querySelector(".card__like-button")
      .toggle(".card__like-button_active");
  }

  _handlePreviewPicture() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        previewTitleEl.value = previewTitleEl.textContent;
      });
    this._cardElement.addEventListener("click", () =>
      this._openPopup(this._cardElement)
    );
    this._cardElement.addEventListener("click", () =>
      closePopup(previewImageModal)
    );
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();

    // this._cardElement.querySelector(
    //   ".card__image"
    // ).style.backgroundImage = `url(${this._link})`;
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
