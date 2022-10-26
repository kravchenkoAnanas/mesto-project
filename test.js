let content = document.querySelector(".content");
let profileInfo = content.querySelector(".profile__info");
let profileEditButton = profileInfo.querySelector(".profile__edit-button");

let popupEdit = document.querySelector(".popup-edit");
let popupEditCloseButton = popupEdit.querySelector(".popup-edit__close-button");

let profileAddButton = content.querySelector(".profile__add-button");

let popupAdd = document.querySelector(".popup-add");
let popupAddCloseButton = popupAdd.querySelector(".popup-add__close-button");

let elements = content.querySelectorAll(".element .element__group");

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

// светофор -> полицейский наблюдает за событием - когда загорается зеленый свет -> когда это произойдет он останавливает движение
profileEditButton.addEventListener("click", openPopupEdit); // к объекту profileEditButton прошу добавить слушатель события
popupEditCloseButton.addEventListener("click", closePopupEdit);
profileAddButton.addEventListener("click", openPopupAdd);
popupAddCloseButton.addEventListener("click", closePopupAdd);

// console.log(elements)
for (let i = 0; i < elements.length; i = i + 1) {
  let element = elements[i] // получаем i - ое сердечко (element)

  element.addEventListener("click", function () {
    // содержит ли сердечко класс "element__group_active" ?
    if (element.classList.contains("element__group_active")) {
      // если да -> удаляем класс 
      element.classList.remove("element__group_active");
    } else {
      // если нет -> добавляем класс
      element.classList.add("element__group_active");
    }
  });
}
