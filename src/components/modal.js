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
  if (evt.key === 'Escape') { // свойство key хранит название нажатой клавиши
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeByClick(evt) {
  // находим объект, на который кликнули
  const clickedObject = evt.target; // Свойство event.target содержит элемент, на котором сработало событие. Это не тот элемент, к которому был привязан обработчик этого события, а именно самый глубокий тег, на который непосредственно был, к примеру, совершен клик

  // проверяем, что найденный объект - это один из объектов,
  // у которых класс popup 
  const checkPopups = listPopups.some((popup) => { //Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции
    return popup === clickedObject; 
  });

  // если объект, на который кликнули - popup, то закрываем все popup'ы
  if (checkPopups) {
    listPopups.forEach((popup) => { // проходимся по каждому и закрываем
      closePopup(popup);
    });
  }
}

export function openPopup(popup) {
  if (!popup.classList.contains("popup_opened")) {
    // если попап отображаем, то добавляем слушателей, чтобы он смог закрыться
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

  renderLoading(true, popupEditSubmitButton); // вызываем функцию значка загрузки 
  updateUserInfo(name, about) // вызываем функцию для обновления данных пользователя
  .then(user => {
    // в 'имя' и 'деятельность' на странице идут обновленные данные 
    profileInfoTitle.textContent = name; 
    profileInfoSubTitle.textContent = about;

    closePopup(popupEdit);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // убираем 3 точки на кнопке popupEditSubmitButton
    renderLoading(false, popupEditSubmitButton); 
  })
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
    // evt.target - сам popup-форма (объект в html) 
    // The HTMLFormElement.reset() method restores a form element's default values.
    evt.target.reset();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupAddSubmitButton); //!
  });

}

export function submitPopupAvatar(evt) {
  evt.preventDefault();
  const link = popupAvatarFormLinkInput.value;

  renderLoading(true, popupAvatarSubmitButton);
  updateAvatar(link)
  .then(avatar => {
    profileInfoAvatarImg.setAttribute("src", link);
    closePopup(popupAvatar);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupAvatarSubmitButton); //!
  });
}
