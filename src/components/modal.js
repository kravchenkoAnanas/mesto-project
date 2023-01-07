import { createAndAddCard } from './card.js'
import { popupEditFormInfoInput, popupEditFormNameInput, profileInfoTitle, profileInfoSubTitle, popupEdit } from '../index.js';


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEscape);
  }
}

export function closePopup(popup) {
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEscape);
  }
}

export function submitPopupEdit(evt) {
  evt.preventDefault();

  profileInfoTitle.textContent = popupEditFormNameInput.value;
  profileInfoSubTitle.textContent = popupEditFormInfoInput.value;

  closePopup(popupEdit);
}

export function submitPopupAdd(evt) {
  const form = evt.target;
  const nameInput = form.querySelector("#name-input");
  const linkInput = form.querySelector("#link-input");
  const popupAdd = form.closest('.add-popup');
  
  evt.preventDefault();
  createAndAddCard(nameInput.value, linkInput.value);
  closePopup(popupAdd);
  form.reset();
}
