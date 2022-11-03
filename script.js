const content = document.querySelector(".content");
const profileInfo = content.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");

const popup = document.querySelector(".popup");
const popupForm = popup.querySelector(".popup__container");
const popupCloseButton = popup.querySelector(".popup__close");

const popupEdit = document.querySelector(".popup-edit");
const popupEditForm = popupEdit.querySelector(".popup-edit__content");
const nameInput = popupForm.querySelector("#name").value;
const jobInput = popupForm.querySelector("#info").value;
const linkInput = popupForm.querySelector("#link").value;



const popupAdd = document.querySelector(".popup-add");
const popupAddForm = popupAdd.querySelector(".popup-add__content")

const popupImg = document.querySelector(".popup-img");

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

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function submitPopupAdd(evt) {
  evt.preventDefault();
  createAndAddCard(name, link);
}

function createCard(text, imgSrc) {
  let card = cardTemplate.cloneNode(true);

  let image = card.querySelector(".element__mask-group");
  let title = card.querySelector(".element__title");
  let like = card.querySelector(".element__group");
  let trash = card.querySelector(".element__trash");
  
  image.setAttribute("src", imgSrc);
  title.textContent = text;

  image.addEventListener("click", function() {
    // popupImg - открывается
    
    // изменить картинку в popupImg на которую кликнули
    let popupImgFull = popupImg.querySelector(".popup-img__full");
    let popupImgHeading = popupImg.querySelector(".popup-img__heading");

    popupImgFull.setAttribute("src", imgSrc);
    popupImgHeading.textContent = text;
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

function editProfile(evt) {
  evt.preventDefault();

  let title = profileInfo.querySelector(".profile__title");
  title.textContent = name;

  let subtitle = profileInfo.querySelector(".profile__subtitle");
  subtitle.textContent = job;
}


// addEventListeners for profile
profileEditButton.addEventListener("click", openPopup); // к объекту profileEditButton прошу добавить слушатель события
popupCloseButton.addEventListener("click", closePopup);
profileAddButton.addEventListener("click", openPopup);
popupAddForm.addEventListener("submit", submitPopupAdd);
popupEditForm.addEventListener("submit", editProfile);

initialCards.forEach(function(initialCard) {
  createAndAddCard(initialCard.name, initialCard.link);
})
            