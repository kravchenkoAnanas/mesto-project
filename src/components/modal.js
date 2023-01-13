import { createAndAddCard } from './card.js';
import { popupEditFormInfoInput, popupEditFormNameInput,
  profileInfoTitle, profileInfoSubTitle, popupEdit, popupAdd,
  popupAddFormLinkInput, popupAddFormNameInput, popupAvatarFormLinkInput,
  profileInfoAvatarImg, popupAvatar, popupEditSubmitButton,
  popupAddSubmitButton, popupAvatarSubmitButton, listPopups
} from '../index.js';
import { updateUserInfo, postCard, updateAvatar } from './api.js';
import { renderLoading } from './utils.js';

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeByClick(evt) {
  // находим объект, на который кликнули
  const clickedObject = evt.target;
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
}

export function openPopup(popup) {
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEscape);
    window.addEventListener('mousedown', closeByClick);
  }
}

export function closePopup(popup) {
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEscape);
    window.removeEventListener('mousedown', closeByClick);
  }
}

export function submitPopupEdit(evt) {
  evt.preventDefault();
  
  const name = popupEditFormNameInput.value;
  const about = popupEditFormInfoInput.value;

  renderLoading(true, popupEditSubmitButton);
  updateUserInfo(name, about)
  .then(user => {
    profileInfoTitle.textContent = name;
    profileInfoSubTitle.textContent = about;
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupEditSubmitButton);
  })

  closePopup(popupEdit);
}

export function submitPopupAdd(evt) {
  evt.preventDefault();
  const name = popupAddFormNameInput.value;
  const link = popupAddFormLinkInput.value;

  renderLoading(true, popupAddSubmitButton);
  postCard(name, link)
  .then(card => {
    const cardId = card._id;
    const name = card.name;
    const link = card.link;
    const cntLikes = card.likes.length;
    const ownerId = card.owner._id;
    
    createAndAddCard(cardId, name, link, cntLikes, ownerId);
    closePopup(popupAdd);
    evt.target.reset();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupAddSubmitButton);
  });

}

export function submitPopupAvatar(evt) {
  evt.preventDefault();
  const link = popupAvatarFormLinkInput.value;

  renderLoading(true, popupAvatarSubmitButton);
  updateAvatar(link)
  .then(avatar => {
    profileInfoAvatarImg.setAttribute("src", link);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupAvatarSubmitButton);
  });

  closePopup(popupAvatar);
}
