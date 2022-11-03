const content = document.querySelector(".content");

const profileInfo = content.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
const profileInfoTitle = profileInfo.querySelector(".profile__title");
const profileInfoSubTitle = profileInfo.querySelector(".profile__subtitle");

const popupEdit = document.querySelector(".edit-popup");
const popupEditForm = popupEdit.querySelector(".popup__content");
const popupEditCloseButton = popupEdit.querySelector(".popup__close")
const popupEditFormNameInput = popupEditForm.querySelector("#name")
const popupEditFormInfoInput = popupEditForm.querySelector("#info")

const popupAdd = document.querySelector(".add-popup");
const popupAddForm = popupAdd.querySelector(".popup__content");
const popupAddCloseButton = popupAdd.querySelector(".popup__close")
const popupAddFormNameInput = popupAddForm.querySelector("#name");
const popupAddFormLinkInput = popupAddForm.querySelector("#link");

const popupImg = document.querySelector(".img-popup");
const popupImgFull = popupImg.querySelector(".popup__full"); 
const popupImgDescription = popupImg.querySelector(".popup__description");
const popupImgCloseButton = popupImg.querySelector(".popup__close");

const elements = content.querySelector(".elements")
const cardTemplate = document.querySelector("#element").content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function submitPopupAdd(evt) {
  evt.preventDefault();

  createAndAddCard(popupAddFormNameInput.value, popupAddFormLinkInput.value);
  closePopup(popupAdd);
}

function createCard(text, imgSrc) {
  let card = cardTemplate.cloneNode(true);

  let image = card.querySelector(".element__mask-group");
  let title = card.querySelector(".element__title");
  let like = card.querySelector(".element__group");
  let trash = card.querySelector(".element__trash");
  
  title.textContent = text;
  image.setAttribute("src", imgSrc);
  image.setAttribute("alt", text);

  image.addEventListener("click", function() {
    popupImgDescription.textContent = text;

    popupImgFull.setAttribute("src", imgSrc);
    popupImgFull.setAttribute("alt", text);

    openPopup(popupImg);
  })

  like.addEventListener("click", function(evt) {
    evt.target.classList.toggle("element__group_active");
  });
  
  trash.addEventListener("click", function(evt) {
    let cardDescription = evt.target.parentElement;
    let card = cardDescription.parentElement;

    card.remove();
  })
  return card
}

function addCard(card) {
  elements.prepend(card);
}

function createAndAddCard(text, imgSrc) {
  let newCard = createCard(text, imgSrc);
  addCard(newCard);
}

function submitPopupEdit(evt) {
  evt.preventDefault();

  profileInfoTitle.textContent = popupEditFormNameInput.value;
  profileInfoSubTitle.textContent = popupEditFormInfoInput.value;

  closePopup(popupEdit);
}

// addEventListeners for profile
// к объекту profileEditButton прошу добавить слушатель события
profileEditButton.addEventListener("click", function() {
  openPopup(popupEdit);
});
popupEditCloseButton.addEventListener("click", function() {
  closePopup(popupEdit);
});
popupEditForm.addEventListener("submit", submitPopupEdit);

profileAddButton.addEventListener("click", function() {
  openPopup(popupAdd);  
});
popupAddCloseButton.addEventListener("click", function() {
  closePopup(popupAdd);
});
popupAddForm.addEventListener("submit", submitPopupAdd)

popupImgCloseButton.addEventListener("click", function() {
  closePopup(popupImg);
});

initialCards.forEach(function(initialCard) {
  createAndAddCard(initialCard.name, initialCard.link);
})
            