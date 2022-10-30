const content = document.querySelector(".content");
const profileInfo = content.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");

const popupEdit = document.querySelector(".popup-edit");
const popupEditCloseButton = popupEdit.querySelector(".popup-edit__close-button");

const profileAddButton = content.querySelector(".profile__add-button");

const popupAdd = document.querySelector(".popup-add");
const popupAddCloseButton = popupAdd.querySelector(".popup-add__close-button");
const popupAddForm = popupAdd.querySelector(".popup-add__content")

const elements = content.querySelector(".elements")
const cardTemplate = document.querySelector("#element").content;


function openPopupEdit() {
  console.log("open popup-edit")
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
  console.log('Форма отправлена');

  let name = evt.target.querySelector("#name").value;
  let link = evt.target.querySelector("#link").value;

  createAndAddCard(link, name);
  popupAdd.classList.remove("popup-add_opened");
}

function createCard(imgSrc, text) {
  let card = cardTemplate.cloneNode(true);
  let image = card.querySelector(".element__mask-group");
  let title = card.querySelector(".element__title");
  let like = card.querySelector(".element__group")
  
  image.setAttribute("src", imgSrc);
  title.textContent = text;

  like.addEventListener("click", function(evt) {
    evt.target.classList.toggle("element__group_active");
  });
  return card
}

function addCard(card) {
  elements.append(card);
}

function createAndAddCard(imgSrc, text) {
  let newCard = createCard(imgSrc, text);
  addCard(newCard);
}

// addEventListeners for profile
// светофор -> полицейский наблюдает за событием - когда загорается зеленый свет -> когда это произойдет он останавливает движение
profileEditButton.addEventListener("click", openPopupEdit); // к объекту profileEditButton прошу добавить слушатель события
popupEditCloseButton.addEventListener("click", closePopupEdit);
profileAddButton.addEventListener("click", openPopupAdd);
popupAddCloseButton.addEventListener("click", closePopupAdd);
popupAddForm.addEventListener("submit", submitPopupAdd);

// create and add cards to the elemnts
createAndAddCard("images/kirill-pershin-1088404-unsplash.png", "Карачаевск");
createAndAddCard("images/MaskGroup.png", "Гора Эльбрус");
createAndAddCard("images/MaskGroup2.png", "Домбай");
