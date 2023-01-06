import { createAndAddCard } from './card.js'
import { popupAddFormLinkInput, popupAddFormNameInput, popupEditFormInfoInput, popupEditFormNameInput, profileInfoTitle, profileInfoSubTitle } from '../index.js';

export function openPopup(popup) {
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
  }
}

export function closePopup(popup) {
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
  }
}

export function submitPopupEdit(evt) {
  evt.preventDefault();

  profileInfoTitle.textContent = popupEditFormNameInput.value;
  profileInfoSubTitle.textContent = popupEditFormInfoInput.value;

  closePopup(popupEdit);
}

export function submitPopupAdd(evt) {
  evt.preventDefault();

  createAndAddCard(popupAddFormNameInput.value, popupAddFormLinkInput.value);
  closePopup(popupAdd);
}
