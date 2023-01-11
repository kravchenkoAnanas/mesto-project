import { createAndAddCard } from './card.js';
import { popupEditFormInfoInput, popupEditFormNameInput,
  profileInfoTitle, profileInfoSubTitle, popupEdit, popupAdd,
  popupAddFormLinkInput, popupAddFormNameInput, popupAvatarFormLinkInput,
  profileInfoAvatarImg, popupAvatar, popupEditSubmitButton,
  popupAddSubmitButton, popupAvatarSubmitButton
} from '../index.js';
import { updateUserInfo, postCard, updateAvatar } from './api.js';


function renderLoading(isLoading, button) {
  if (isLoading) {
    button.setAttribute("value", button.value + "...");
  } else {
    button.setAttribute("value", button.value.replace("...", ""));
  };
}

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

  renderLoading(true, popupEditSubmitButton);
  updateUserInfo(name, about)
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
  })
  .finally(() => {
    renderLoading(false, popupAddSubmitButton);
  });

  closePopup(popupAdd);
  evt.target.reset();
}

export function submitPopupAvatar(evt) {
  evt.preventDefault();
  const link = popupAvatarFormLinkInput.value;

  profileInfoAvatarImg.setAttribute("src", link);
  
  renderLoading(true, popupAvatarSubmitButton);
  updateAvatar(link)
  .finally(() => {
    renderLoading(false, popupAvatarSubmitButton);
  });

  closePopup(popupAvatar);
}
