import Card from "./card.js";
import FormValidator from "./FormValidator.js";

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
const editModalForm = profileEditModal.querySelector(".modal__form");
const addCardModalForm = addCardModal.querySelector(".modal__form");

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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

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

const cardSelector = "#card-template";

/* --------------------------------------------*/
/* ------------------Validation----------------*/
/* --------------------------------------------*/

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationSettings, editModalForm);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardModalForm
);

// editFormValidator.enableValidation();
// addFormValidator.enableValidation();

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  // Card Buttons
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(previewImageModal);
    previewImageEl.src = cardData.link;
    previewImageEl.alt = cardData.name;
    previewTitleEl.textContent = cardData.name;
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

/* --------------------------------------------*/
/* ------------------Event Handlers------------*/
/* --------------------------------------------*/
function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  const card = new Card(cardData, cardSelector);
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
});
profileModalCloseBtn.addEventListener("click", () =>
  closePopup(profileEditModal)
);

// Preview Image
previewImageEl.addEventListener("click", () => {
  previewTitleEl.value = previewTitleEl.textContent;
  openPopup(previewImageModal);
});
previewModalCloseBtn.addEventListener("click", () =>
  closePopup(previewImageModal)
);

// Add New Card Button
addNewCardBtn.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseBtn.addEventListener("click", () => closePopup(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// Close modal with Escape and Click
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
