import { cardTemplate, elements, popupImgDescription, popupImgFull, popupImg } from "../index.js";
import { openPopup } from "./modal.js";

export function createCard(text, imgSrc, cntLikes) {
  const card = cardTemplate.cloneNode(true);

  const image = card.querySelector(".element__mask-group");
  const title = card.querySelector(".element__title");
  const like = card.querySelector(".element__like");
  const counter = card.querySelector(".element__count");
  const trash = card.querySelector(".element__trash");

  title.textContent = text;
  counter.textContent = cntLikes;
  image.setAttribute("src", imgSrc);
  image.setAttribute("alt", text);

  image.addEventListener("click", function() {
    popupImgDescription.textContent = text;

    popupImgFull.setAttribute("src", imgSrc);
    popupImgFull.setAttribute("alt", text);

    openPopup(popupImg);
  })

  like.addEventListener("click", function(evt) {
    evt.target.classList.toggle("element__like_active");
  });
  
  trash.addEventListener("click", function(evt) {
    const card = evt.target.closest(".element");
    card.remove();
  });
  
  return card
}

export function addCard(card) {
  elements.prepend(card);
}

export function createAndAddCard(text, imgSrc, cntLikes) {
  const newCard = createCard(text, imgSrc, cntLikes);
  addCard(newCard);
}

