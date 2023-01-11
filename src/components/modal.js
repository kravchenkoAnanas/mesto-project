import { createAndAddCard } from './card.js';
import { popupEditFormInfoInput, popupEditFormNameInput, profileInfoTitle, profileInfoSubTitle, popupEdit, popupAdd, popupAddFormLinkInput, popupAddFormNameInput } from '../index.js';
import { updateUserInfo, postCard } from './api.js';

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
  
  const name = popupEditFormNameInput.value;
  const about = popupEditFormInfoInput.value;

  profileInfoTitle.textContent = name;
  profileInfoSubTitle.textContent = about;

  closePopup(popupEdit);
  updateUserInfo(name, about);
}

export function submitPopupAdd(evt) {
  evt.preventDefault();
  const name = popupAddFormNameInput.value;
  const link = popupAddFormLinkInput.value;

  createAndAddCard(name, link);
  postCard(name, link);
  closePopup(popupAdd);
  evt.target.reset();
}
