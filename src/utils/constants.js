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
