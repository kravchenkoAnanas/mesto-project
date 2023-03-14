import { userId, cardTemplate, elements,
  popupImgDescription, popupImgFull, popupImg } from "../index.js";
import { openPopup } from "./modal.js";
import { deleteCard, putLike, deleteLike } from "./api.js";

export function createCard(cardId, text, imgSrc, cntLikes, ownerId, isLiked) {
  // Метод cloneNode позволяет клонировать элемент и получить его точную копию: 
  // If true, then the node and its whole subtree, including text that may be in child Text nodes, is also copied.
  // If false, only the node will be cloned. The subtree, including any text that the node contains, is not cloned.
  const card = cardTemplate.cloneNode(true);

  const image = card.querySelector(".element__mask-group");
  const title = card.querySelector(".element__title");
  const like = card.querySelector(".element__like");
  const counter = card.querySelector(".element__count");
  const trash = card.querySelector(".element__trash");

  // content of the post
  // Свойство textContent позволяет считывать или *задавать* текстовое содержимое элемента.
  // Обращение к свойству вернёт строку, которая будет состоять из текстового содержимого всех вложенных элементов,
  // даже если они скрыты с помощью CSS и не видны на экране.
  title.textContent = text; 
  counter.textContent = cntLikes;
  image.setAttribute("src", imgSrc); // src - source - источник (где хранится картинка)
  image.setAttribute("alt", text);

  // click on image
  image.addEventListener("click", function() {
    popupImgDescription.textContent = text;

    popupImgFull.setAttribute("src", imgSrc);
    popupImgFull.setAttribute("alt", text);

    openPopup(popupImg);
  })

  // what to do if i click on a like (button)
  like.addEventListener("click", function(evt) {
    // if was liked
    if (evt.target.classList.contains("element__like_active")) { 
      deleteLike(cardId)
      .then(card => {
        counter.textContent = card.likes.length;
        evt.target.classList.remove("element__like_active");
      })
      .catch((err) => {
        console.log(err);
      });
    } else { // if was NOT liked
      putLike(cardId)
      .then(card => {
        counter.textContent = card.likes.length;
        evt.target.classList.add("element__like_active");
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });
  // if I have already liked that card
  if (isLiked) {
    like.classList.add("element__like_active");
  }
  
  // trash
  if (userId === ownerId) {
    // если id того, кто добавил данный пост совпадает
    // с id пользователя (чей профиль), то добавляем возможность
    // удаления данного поста
    trash.addEventListener("click", function(evt) {
      // удаление карты с сервера
      deleteCard(cardId)
      .then(card => {
        // evt.target - trash button
        // closest - find the closest object in html with class `element`
        evt.target.closest(".element").remove();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  } else {
    // в противном случае убираем с поста символ корзины
    trash.remove();
  }
  return card // return object card for using it later
}

export function addCard(card) {
  elements.prepend(card);
}

export function createAndAddCard(cardId, text, imgSrc, cntLikes, ownerId, isLiked) {
  // isLiked wether liked by me
  const newCard = createCard(cardId, text, imgSrc, cntLikes, ownerId, isLiked);
  addCard(newCard);
}
