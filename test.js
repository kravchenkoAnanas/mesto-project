let content = document.querySelector(".content");
let profileInfo = content.querySelector(".profile__info");
let profileEditButton = profileInfo.querySelector(".profile__edit-button");

let popup = document.querySelector(".popup");
let popupCloseButton = popup.querySelector(".popup__close-button");

function openPopup() {
  console.log("open popup")
  // первый способ
  // popup.setAttribute("class", "popup popup_opened")

  // второй способ
  // console.log(popup.className)
  // console.log(popup.classList)
  popup.classList.add("popup_opened");
}

function closePopup() {
  console.log("close popup")
  popup.classList.remove("popup_opened");
}

// светофор -> полицейский наблюдает за событием - когда загорается зеленый свет -> когда это произойдет он останавливает движение
profileEditButton.addEventListener("click", openPopup); // к объекту profileEditButton прошу добавить слушатель события
popupCloseButton.addEventListener("click", closePopup)
