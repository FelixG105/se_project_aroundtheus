class Card {
  constructor(
    cardData,
    cardSelector,
    handleCardImageClick,
    handleDeleteCard,
    handleLikeCard,
    handleDeleteLike,
    confirmDeleteCardPopup,
    userId
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes || [];
    this._handleCardImageClick = handleCardImageClick;
    this._cardSelector = cardSelector;
    this._cardId = cardData._id;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLike = handleDeleteLike;
    this._confirmDeletePopup = confirmDeleteCardPopup;
    this._userId = userId;
    this._isLiked = this._likes.some((like) => like._id === this._userId);
    console.log("Card likes:", this._likes);
    console.log("Current userId:", this._userId);
    console.log("Is liked:", this._isLiked);
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

  _handleDeleteBtnClick() {
    this._confirmDeletePopup.open({
      cardId: this._cardId,
      cardElement: this._cardElement,
    });
  }

  _handleLikeIcon() {
    if (this._isLiked) {
      this._handleDeleteLike(this._cardId)
        .then((res) => {
          this._likes = res.likes; // Update the likes array with new data
          this._isLiked = false; // Update the liked state
          this._likeButton.classList.remove("card__like-button_active"); // Update the UI
        })
        .catch(console.log);
    } else {
      this._handleLikeCard(this._cardId)
        .then((res) => {
          this._likes = res.likes; // Update the likes array with new data
          this._isLiked = true; // Update the liked state
          this._likeButton.classList.add("card__like-button_active"); // Update the UI
        })
        .catch(console.log);
    }
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._isLiked = this._likes.some((like) => like._id === this._userId);
    this._likeButton.classList.toggle(
      "card__like-button_active",
      this._isLiked
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
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
