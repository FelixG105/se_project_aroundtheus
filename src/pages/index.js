import "./index.css";
import {
  initialCards,
  avatarEditBtn,
  profileEditBtn,
  addNewCardBtn,
  profileTitle,
  profileSubtitle,
  profileTitleInput,
  profileSubtitleInput,
  cardSelector,
  validationSettings,
  formValidators,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

/* --------------------------------------------*/
/* ------------------Validation----------------*/
/* --------------------------------------------*/

const enableValidation = (validationSettings) => {
  const formList = document.querySelectorAll(validationSettings.formSelector);
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationSettings);

/* --------------------------------------------*/
/* ------------------Event Handlers------------*/
/* --------------------------------------------*/

function handleCardImageClick(name, link) {
  const data = { name, link };
  popupWithImage.open(data);
}

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    cardSelector,
    handleCardImageClick,
    handleDeleteCard,
    api.likeCard.bind(api),
    api.deleteLike.bind(api),
    confirmDeleteCard
  );
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  section.addItem(cardElement);
}

function handleProfileEditSubmit({ title, subtitle }) {
  editProfilePopupWithForm.renderLoading(true);
  api
    .updateUserInfo(title, subtitle)
    .then((updatedUser) => {
      userInfo.setUserInfo({
        title: updatedUser.name,
        subtitle: updatedUser.about,
        avatar: userInfo.getUserInfo().avatar,
      });
      editProfilePopupWithForm.close();
      editProfilePopupWithForm.renderLoading(false);
    })
    .catch((err) => {
      console.error("Failed to update profile:", err);
      editProfilePopupWithForm.renderLoading(false);
    });
}

function handleAddCardSubmit({ name, link }) {
  addCardPopupWithForm.renderLoading(true);
  api
    .addNewCard({ name, link })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      section.addItem(cardElement);
      addCardPopupWithForm.reset();
      formValidators["add-card"].disableButton();
      addCardPopupWithForm.close();
      addCardPopupWithForm.renderLoading(false);
    })
    .catch((err) => {
      console.error("Failed to add card:", err);
      addCardPopupWithForm.renderLoading(false);
    });
}

function handleDeleteCard(cardId, cardElement) {
  confirmDeleteCard.renderLoading(true);
  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      confirmDeleteCard.close();
      confirmDeleteCard.renderLoading(false);
    })
    .catch((err) => {
      console.error("Failed to delete card:", err);
      confirmDeleteCard.renderLoading(false);
    });
}

function handleEditAvatar({ avatar }) {
  editAvatarPopup.renderLoading(true);
  api
    .updateAvatar(avatar)
    .then((userData) => {
      userInfo.setUserInfo({
        title: userData.name,
        subtitle: userData.about,
        avatar: userData.avatar,
      });
      editAvatarPopup.close();
      editAvatarPopup.renderLoading(false);
      editAvatarPopup.reset();
    })
    .catch((err) => {
      console.error("Failed to update avatar:", err);
      editAvatarPopup.renderLoading(false);
    });
}

/* --------------------------------------------*/
/* ------------------Event Listeners-----------*/
/* --------------------------------------------*/

// Edit Avatar
avatarEditBtn.addEventListener("click", () => {
  editAvatarPopup.open();
});

// Profile Edit
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  editProfilePopupWithForm.open();
  formValidators["edit-profile"].resetValidation();
});

// Add New Card Button
addNewCardBtn.addEventListener("click", () => {
  addCardPopupWithForm.open();
});

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//NOTE - Instantiate Popup Classes

//UserInfo Class
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

// Popups

//PopupWithForm
const addCardPopupWithForm = new PopupWithForm(
  "#add-card-modal",

  handleAddCardSubmit
);
addCardPopupWithForm.setEventListeners();

const editProfilePopupWithForm = new PopupWithForm(
  "#edit-modal",

  handleProfileEditSubmit
);
editProfilePopupWithForm.setEventListeners();

// PopupWithImage
const popupWithImage = new PopupWithImage(
  { popupSelector: "#preview-image-modal" },
  ".modal__image",
  ".modal__title"
);
popupWithImage.setEventListeners();

const confirmDeleteCard = new PopupWithForm(
  "#confirm-delete-modal",
  handleDeleteCard
);
confirmDeleteCard.setEventListeners();

const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-modal",
  handleEditAvatar
);
editAvatarPopup.setEventListeners();

/* --------------------------------------------*/
/* ---------------------API--------------------*/
/* --------------------------------------------*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6a091442-58c6-459c-bd1b-335f83fe50a7",
    "Content-Type": "application/json",
  },
});

// Section variable declaration - initialized after API data is loaded
let section;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    // Initialize section with card data from the API
    section = new Section(
      { items: cardData, renderer: renderCard },
      ".cards__list"
    );
    section.renderItems();
    userInfo.setUserInfo({
      title: userData.name,
      subtitle: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => console.error(err));
