import { userId, cardTemplate, elements,
  popupImgDescription, popupImgFull, popupImg } from "../index.js";
import { openPopup } from "./modal.js";
import { deleteCard, putLike, deleteLike } from "./api.js";

export function createCard(cardId, text, imgSrc, cntLikes, ownerId) {
  const card = cardTemplate.cloneNode(true);

  const image = card.querySelector(".element__mask-group");
  const title = card.querySelector(".element__title");
  const like = card.querySelector(".element__like");
  const counter = card.querySelector(".element__count");
  const trash = card.querySelector(".element__trash");

  // content of the post
  title.textContent = text;
  counter.textContent = cntLikes;
  image.setAttribute("src", imgSrc);
  // image.setAttribute("alt", text);

  // click on image
  image.addEventListener("click", function() {
    popupImgDescription.textContent = text;

    popupImgFull.setAttribute("src", imgSrc);
    popupImgFull.setAttribute("alt", text);

    openPopup(popupImg);
  })

  // like
  like.addEventListener("click", function(evt) {
    if (evt.target.classList.contains("element__like_active")) {
      evt.target.classList.remove("element__like_active");
      deleteLike(cardId);
    } else {
      evt.target.classList.add("element__like_active");
      putLike(cardId);
    }
  });
  
  // trash
  if (userId === ownerId) {
    // если id того, кто добавил данный пост совпадает
    // с id пользователя (чей профиль), то доавляем возможность
    // удаления данного поста
    trash.addEventListener("click", function(evt) {
      evt.target.closest(".element").remove();
      
      // удаление карты с сервера
      deleteCard(cardId);
    });
  } else {
    // в противном случае убираем с поста символ корзины
    // TODO - сделать класс `element__trashnone`
    // trash.classList.add("element__trash-none")
    trash.remove();
    // trash.style.cssText += "display: None;";
  }
console.log(card);
  return card
}

export function addCard(card) {
  elements.prepend(card);
}

export function createAndAddCard(cardId, text, imgSrc, cntLikes, ownerId) {
  const newCard = createCard(cardId, text, imgSrc, cntLikes, ownerId);
console.log(newCard);
  addCard(newCard);
}
