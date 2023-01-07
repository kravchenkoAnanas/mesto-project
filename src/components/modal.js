import { createAndAddCard } from './card.js'
import { popupEditFormInfoInput, popupEditFormNameInput, profileInfoTitle, profileInfoSubTitle, popupEdit, popupAdd, popupAddFormLinkInput, popupAddFormNameInput } from '../index.js';

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
  evt.preventDefault();
  createAndAddCard(popupAddFormNameInput.value, popupAddFormLinkInput.value);
  closePopup(popupAdd);
  evt.target.reset();
}
