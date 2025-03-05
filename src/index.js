import "./pages/index.css";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Popup from "./components/Popup.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* --------------------------------------------*/
/* ------------------Elements------------------*/
/* --------------------------------------------*/

//  Wrappers
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const editModalForm = document.forms["edit-profile-form"];
const addCardModalForm = document.forms["add-card-form"];

//  Buttons  and other DOM nodes
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileModalCloseBtn = profileEditModal.querySelector(".modal__close");
const addCardModalCloseBtn = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const addNewCardBtn = document.querySelector(".profile__add-button");

// Preview Image Modal
const previewImageModal = document.querySelector("#preview-image-modal");
const previewTitleEl = previewImageModal.querySelector(".modal__title");
const previewImageEl = previewImageModal.querySelector(".modal__image");
const previewModalCloseBtn = previewImageModal.querySelector(".modal__close");

// Form Data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");

const cardTitleInput = addCardModalForm.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardModalForm.querySelector(".modal__input_type_url");
const cardSelector = "#card-template";

// Pop up

/* --------------------------------------------*/
/* ------------------Functions-----------------*/
/* --------------------------------------------*/

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
}

function handleCardImageClick(name, link) {
  // set the correct image in the preview image modal
  previewImageEl.src = link;
  // set the coorect text in the caption for the image modal
  previewTitleEl.textContent = name;
  //set the alt...
  previewImageEl.alt = name;
  // open the preview image modal
  openPopup(previewImageModal);
}

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

function getCardElement(cardData) {
  const card = new Card(cardData, cardSelector, handleCardImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  e.target.reset();
  closePopup(addCardModal);
  formValidators["add-card"].disableButton();
}
/* --------------------------------------------*/
/* ------------------Event Listeners-----------*/
/* --------------------------------------------*/

// Form Listeners

editModalForm.addEventListener("submit", handleProfileEditSubmit);
addCardModalForm.addEventListener("submit", handleAddCardSubmit);

// Profile Edit
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openPopup(profileEditModal);
  formValidators["edit-profile"].resetValidation();
});

// Add New Card Button
addNewCardBtn.addEventListener("click", () => openPopup(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// // Close modal with Escape and Click
const modals = document.querySelectorAll(".modal");

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

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");

  button.addEventListener("click", () => closePopup(popup));
});

//NOTE - Instantiate Popup Classes

//UserInfo Class
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
});
//userInfo.setUserInfo();

//Section Class
const section = new Section(
  { items: initialCards, renderer: () => {} },
  ".page__section"
);
section.renderItems();

// Popups

//PopupWithForm
const addCardPopupWithForm = new PopupWithForm(
  "#add-card-modal",
  handleAddCardSubmit
);
addCardPopupWithForm.setEventListeners();

const editProfilePopupWithForm = new PopupWithForm(
  "#edit-profile-modal",
  handleProfileEditSubmit
);
editProfilePopupWithForm.setEventListeners();

// PopupWithImage
const popupWithImage = new PopupWithImage(
  "#preview-image-modal",
  ".modal__image",
  ".modal__title"
);

const allPopups = new Popup(".modal");
