class Card {
  constructor(
    cardData,
    cardSelector,
    handleCardImageClick,
    handleDeleteCard,
    handleLikeCard,
    handleDeleteLike,
    confirmDeleteCardPopup
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleCardImageClick = handleCardImageClick;
    this._cardSelector = cardSelector;
    this._cardId = cardData._id;
    console.log("Card Data recieved:", cardData);
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLike = handleDeleteLike;
    this._isLiked = false;
    this._confirmDeletePopup = confirmDeleteCardPopup;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteBtnClick(this._cardId, this._cardElement);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardImageClick(this._name, this._link);
    });
  }

  _handleDeleteBtnClick(cardId, cardElement) {
    this._confirmDeletePopup._cardToDelete = { cardId, cardElement };
    this._confirmDeletePopup.open();
  }

  _handleLikeIcon() {
    if (this._isLiked) {
      console.log("Attempting to unlike card with ID:", this._cardId);
      this._handleDeleteLike(this._cardId)
        .then((res) => {
          console.log("Unlike Response:", res);
          this._likeButton.classList.remove("card__like-button_active");
          this._likeCounter.textContent = res.isLiked ? 1 : 0;
          this._isLiked = false;
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Attempting to like card with ID:", this._cardId);
      this._handleLikeCard(this._cardId)
        .then((res) => {
          console.log("Like Response:", {
            response: res,
            type: typeof res,
            keys: Object.keys(res),
          });
          this._likeButton.classList.add("card__like-button_active");
          this._likeCounter.textContent = res.isLiked ? 1 : 0;
          this._isLiked = true;
        })
        .catch((err) => console.error(err));
    }
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._likeCounter = this._cardElement.querySelector(".card__like-counter");

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
