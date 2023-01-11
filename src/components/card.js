import { userId, cardTemplate, elements,
  popupImgDescription, popupImgFull, popupImg } from "../index.js";
import { openPopup } from "./modal.js";
import { deleteCard, putLike, deleteLike } from "./api.js";

export function createCard(cardId, text, imgSrc, cntLikes, ownerId, isLiked) {
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
  if (isLiked) {
    like.classList.add("element__like_active");
  }
  like.addEventListener("click", function(evt) {
    if (evt.target.classList.contains("element__like_active")) {
      evt.target.classList.remove("element__like_active");
      // Int - integer - целое
      counter.textContent = parseInt(counter.textContent) - 1;
      deleteLike(cardId);
    } else {
      evt.target.classList.add("element__like_active");
      counter.textContent = parseInt(counter.textContent) + 1;
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
    trash.remove();
  }
  return card
}

export function addCard(card) {
  elements.prepend(card);
}

export function createAndAddCard(cardId, text, imgSrc, cntLikes, ownerId, isLiked) {
  const newCard = createCard(cardId, text, imgSrc, cntLikes, ownerId, isLiked);
  addCard(newCard);
}
