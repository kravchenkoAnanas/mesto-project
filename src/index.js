import './pages/index.css';

import { openPopup, closePopup, submitPopupEdit, submitPopupAdd, submitPopupAvatar } from "./components/modal.js"
import { createAndAddCard } from "./components/card.js"
import { enableValidation } from "./components/validate.js"
import { getInitialCards, getUserInfo } from './components/api.js'

const content = document.querySelector(".content");
const listPopups = Array.from(document.querySelectorAll(".popup"));

const profileInfo = content.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
export const profileInfoTitle = profileInfo.querySelector(".profile__title");
export const profileInfoSubTitle = profileInfo.querySelector(".profile__subtitle");
const profileInfoAvatar = content.querySelector(".profile__avatar");
export const profileInfoAvatarImg = content.querySelector(".profile__avatar-img");


export const popupEdit = document.querySelector(".edit-popup");
const popupEditForm = popupEdit.querySelector(".popup__content");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");
export const popupEditFormNameInput = popupEditForm.querySelector("#name-input");
export const popupEditFormInfoInput = popupEditForm.querySelector("#info-input");

export const popupAdd = document.querySelector(".add-popup");
const popupAddForm = popupAdd.querySelector(".popup__content");
const popupAddCloseButton = popupAdd.querySelector(".popup__close");
export const popupAddFormNameInput = popupAdd.querySelector("#name-input");
export const popupAddFormLinkInput = popupAdd.querySelector("#link-input");

export const popupImg = document.querySelector(".img-popup");
export const popupImgFull = popupImg.querySelector(".popup__full"); 
export const popupImgDescription = popupImg.querySelector(".popup__description");
const popupImgCloseButton = popupImg.querySelector(".popup__close");

export const popupAvatar = document.querySelector(".avatar-popup");
const popupAvatarForm = popupAvatar.querySelector(".popup__content");
const popupAvatarCloseButton = popupAvatar.querySelector(".popup__close");
export const popupAvatarFormLinkInput = popupAvatar.querySelector("#link-input");

export const elements = content.querySelector(".elements")
export const cardTemplate = document.querySelector("#element").content;

export let userId;

// addEventListeners for profile
// к объекту profileEditButton прошу добавить слушатель события
profileEditButton.addEventListener("click", function() {
  popupEditFormNameInput.value = profileInfoTitle.textContent;
  popupEditFormInfoInput.value = profileInfoSubTitle.textContent;
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

profileInfoAvatar.addEventListener("click", function() {
  openPopup(popupAvatar);  
});
popupAvatarCloseButton.addEventListener("click", function() {
  closePopup(popupAvatar);
});
popupAvatarForm.addEventListener("submit", submitPopupAvatar)

enableValidation({
  formSelector: '.popup__content',
  fieldsetSelector: '.popup__input-items',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  errorClass: 'popup__input-item_error'
});

window.addEventListener('mousedown', (event) => {
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

// work w server
getUserInfo()
.then(userInfo => {
  userId = userInfo._id;

  profileInfoTitle.textContent = userInfo.name;
  profileInfoSubTitle.textContent = userInfo.about;
  profileInfoAvatarImg.setAttribute("src", userInfo.avatar);
  profileInfoAvatarImg.setAttribute("alt", "Аватар");
});

getInitialCards()
.then(cards => {
  cards.reverse().forEach(function(card) {
    console.log(card.likes);
    const cardId = card._id;
    const name = card.name;
    const link = card.link;
    const cntLikes = card.likes.length;
    const ownerId = card.owner._id;
    
    createAndAddCard(cardId, name, link, cntLikes, ownerId);
  })
});


