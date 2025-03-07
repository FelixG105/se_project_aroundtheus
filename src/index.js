import "./pages/index.css";
import "./utils/constants.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

/* --------------------------------------------*/
/* ------------------Validation----------------*/
/* --------------------------------------------*/

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  formSelector: ".modal__form",
};

const formValidators = {};

const enableValidation = (validationSettings) => {
  const formList = document.querySelectorAll(validationSettings.formSelector);
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    // Here you get the name of the form (if you don’t have it then you need to add it into each form in `index.html` first)
    const formName = formElement.getAttribute("name");

    // Here you store the validator using the `name` of the form
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
  const card = new Card(cardData, cardSelector, handleCardImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function handleProfileEditSubmit({ title, subtitle }) {
  userInfo.setUserInfo(title, subtitle);
}

function handleAddCardSubmit(values) {
  renderCard(values, cardListEl);
  addCardPopupWithForm.reset();
  addCardPopupWithForm.close();
}

/* --------------------------------------------*/
/* ------------------Event Listeners-----------*/
/* --------------------------------------------*/

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
  formValidators["add-card"].disableButton();
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//NOTE - Instantiate Popup Classes

//UserInfo Class
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
});

//Section Class
const section = new Section(
  { items: initialCards, renderer: () => {} },
  ".page__section"
);
section.renderItems();

// Popups

//PopupWithForm
const addCardPopupWithForm = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
  },
  handleAddCardSubmit
);
addCardPopupWithForm.setEventListeners();

const editProfilePopupWithForm = new PopupWithForm(
  {
    popupSelector: "#edit-modal",
  },
  handleProfileEditSubmit
);
editProfilePopupWithForm.setEventListeners();

// PopupWithImage
const popupWithImage = new PopupWithImage(
  { popupSelector: "#preview-image-modal" },
  ".modal__image",
  ".modal__title"
);
