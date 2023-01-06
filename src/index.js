import './pages/index.css';

import { openPopup, closePopup, submitPopupEdit, submitPopupAdd } from "./components/modal.js"
import { createAndAddCard } from "./components/card.js"
import { enableValidation } from "./components/validate.js"

const content = document.querySelector(".content");
const listPopups = Array.from(document.querySelectorAll(".popup"));

const profileInfo = content.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
export const profileInfoTitle = profileInfo.querySelector(".profile__title");
export const profileInfoSubTitle = profileInfo.querySelector(".profile__subtitle");

export const popupEdit = document.querySelector(".edit-popup");
const popupEditForm = popupEdit.querySelector(".popup__content");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");
export const popupEditFormNameInput = popupEditForm.querySelector("#name-input");
export const popupEditFormInfoInput = popupEditForm.querySelector("#info-input");

export const popupAdd = document.querySelector(".add-popup");
const popupAddForm = popupAdd.querySelector(".popup__content");
const popupAddCloseButton = popupAdd.querySelector(".popup__close");
export const popupAddFormNameInput = popupAddForm.querySelector("#name-input");
export const popupAddFormLinkInput = popupAddForm.querySelector("#link-input");

export const popupImg = document.querySelector(".img-popup");
export const popupImgFull = popupImg.querySelector(".popup__full"); 
export const popupImgDescription = popupImg.querySelector(".popup__description");
const popupImgCloseButton = popupImg.querySelector(".popup__close");

export const elements = content.querySelector(".elements")
export const cardTemplate = document.querySelector("#element").content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// addEventListeners for profile
// к объекту profileEditButton прошу добавить слушатель события
profileEditButton.addEventListener("click", function() {
  openPopup(popupEdit);
});
popupEditCloseButton.addEventListener("click", function() {
  closePopup(popupEdit);
});
popupEditForm.addEventListener("submit", submitPopupEdit);

profileAddButton.addEventListener("click", function() {
  openPopup(popupAdd);  
});
popupAddCloseButton.addEventListener("click", function() {
  closePopup(popupAdd);
});
popupAddForm.addEventListener("submit", submitPopupAdd)

popupImgCloseButton.addEventListener("click", function() {
  closePopup(popupImg);
});

initialCards.forEach(function(initialCard) {
  createAndAddCard(initialCard.name, initialCard.link);
})

enableValidation({
  formSelector: '.popup__content',
  fieldsetSelector: '.popup__input-items',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  errorClass: 'popup__input-item_error'
});

document.addEventListener('keydown', function(event) {
  if(event.key === "Escape") {
    listPopups.forEach((popup) => {
      closePopup(popup);
    });
  }
})

window.addEventListener('click', (event) => {
  // находим объект, на который кликнули
  const clickedObject = event.target;
  // проверяем, что найденный объект - это один из объектов,
  // у которых класс popup
  const checkPopups = listPopups.some((popup) => {
    return popup === clickedObject;
  });

  // если объект, на который кликнули - popup (НЕ popup_container, popup_*)
  // то закрываем все popup ы
  if (checkPopups) {
    listPopups.forEach((popup) => {
      closePopup(popup);
    });
  }
})

