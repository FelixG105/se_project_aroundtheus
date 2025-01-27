// Preview Image Modal
const modals = document.querySelectorAll(".modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewTitleEl = previewImageModal.querySelector(".modal__title");
const previewImageEl = previewImageModal.querySelector(".modal__image");
const previewModalCloseBtn = previewImageModal.querySelector(".modal__close");

function closePopup(modal) {
  modal.classList.remove("modal_opened");

  document.removeEventListener("keydown", closeModalEsc);
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closePopup(openedModal);
    }
  }
}

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closePopup(modal);
    }
  });
});

class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListner("click", () => {
        this._hanldeLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListner("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListner("click", () => {
        this._handlePreviewPicture();
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _hanldeLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  _handlePreviewPicture() {
    this._cardElement
      .querySelector(".modal__image")
      .addEventListener("click", () => {
        previewTitleEl.value = previewTitleEl.textContent;
        openPopup(previewImageModal);
      });
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
    this._element = this._getTenplate();

    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector("card.__title").textContent = this._name;

    this._setEventListeners();
  }
}

export default Card;
