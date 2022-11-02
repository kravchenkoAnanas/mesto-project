const content = document.querySelector(".content");
const profileInfo = content.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");

const popupEdit = document.querySelector(".popup-edit");
const popupEditCloseButton = popupEdit.querySelector(".popup-edit__close-button");
const popupEditForm = popupEdit.querySelector(".popup-edit__content");
const nameInput = popupEditForm.querySelector("#name");
const jobInput = popupEditForm.querySelector("#info");

const profileAddButton = content.querySelector(".profile__add-button");

const popupAdd = document.querySelector(".popup-add");
const popupAddCloseButton = popupAdd.querySelector(".popup-add__close-button");
const popupAddForm = popupAdd.querySelector(".popup-add__content")

const popupImg = document.querySelector(".popup-img");
const popupImgCloseButton = popupImg.querySelector(".popup-img__close-button");

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

function openPopupEdit() {
  // console.log("open popup-edit")
  // первый способ
  // popup.setAttribute("class", "popup popup_opened")

  // второй способ
  // console.log(popup.className)
  // console.log(popup.classList)
  popupEdit.classList.add("popup-edit_opened");
}

function closePopupEdit() {
  console.log("close popup-edit")
  popupEdit.classList.remove("popup-edit_opened");
}

function openPopupAdd() {
  popupAdd.classList.add("popup-add_opened");
}

function closePopupAdd() {
  popupAdd.classList.remove("popup-add_opened"); 
}

function submitPopupAdd(evt) {
  evt.preventDefault();
  
  let name = popupAddForm.querySelector("#name").value;
  let link = popupAddForm.querySelector("#link").value;
 
  createAndAddCard(name, link);
  
  popupAdd.classList.remove("popup-add_opened");
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
    popupImg.classList.add("popup-img_opened");
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
  elements.append(card);
}

function createAndAddCard(text, imgSrc) {
  let newCard = createCard(text, imgSrc);
  addCard(newCard);
}

function editProfile(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  console.log(name);
  console.log(job);

  let title = profileInfo.querySelector(".profile__title");
  title.textContent = name;

  let subtitle = profileInfo.querySelector(".profile__subtitle");
  subtitle.textContent = job;
  
  popupEdit.classList.remove("popup-edit_opened");
}

function closePopupImg() {
  popupImg.classList.remove("popup-img_opened");
}

// addEventListeners for profile
// светофор -> полицейский наблюдает за событием - когда загорается зеленый свет -> когда это произойдет он останавливает движение
profileEditButton.addEventListener("click", openPopupEdit); // к объекту profileEditButton прошу добавить слушатель события
popupEditCloseButton.addEventListener("click", closePopupEdit);
profileAddButton.addEventListener("click", openPopupAdd);
popupAddCloseButton.addEventListener("click", closePopupAdd);
popupAddForm.addEventListener("submit", submitPopupAdd);
popupEditForm.addEventListener("submit", editProfile);
popupImgCloseButton.addEventListener("click", closePopupImg);

initialCards.forEach(function(initialCard) {
  createAndAddCard(initialCard.name, initialCard.link);
})
            