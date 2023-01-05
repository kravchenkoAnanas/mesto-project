const content = document.querySelector(".content");

const profileInfo = content.querySelector(".profile__info");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
const profileInfoTitle = profileInfo.querySelector(".profile__title");
const profileInfoSubTitle = profileInfo.querySelector(".profile__subtitle");

const popupEdit = document.querySelector(".edit-popup");
const popupEditForm = popupEdit.querySelector(".popup__content");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const popupEditFormFieldset = popupEdit.querySelector(".popup__input-items");
const popupEditFormNameInput = popupEditForm.querySelector("#name-input");
const popupEditFormInfoInput = popupEditForm.querySelector("#info-input");

const popupAdd = document.querySelector(".add-popup");
const popupAddForm = popupAdd.querySelector(".popup__content");
const popupAddCloseButton = popupAdd.querySelector(".popup__close");
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
  const card = cardTemplate.cloneNode(true);

  const image = card.querySelector(".element__mask-group");
  const title = card.querySelector(".element__title");
  const like = card.querySelector(".element__group");
  const trash = card.querySelector(".element__trash");

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
    const card = evt.target.closest(".element");
    card.remove();
  });
  
  return card
}

function addCard(card) {
  elements.prepend(card);
}

function createAndAddCard(text, imgSrc) {
  const newCard = createCard(text, imgSrc);
  addCard(newCard);
}

function submitPopupEdit(evt) {
  evt.preventDefault();

  profileInfoTitle.textContent = popupEditFormNameInput.value;
  profileInfoSubTitle.textContent = popupEditFormInfoInput.value;

  closePopup(popupEdit);
}

// Функция, которая добавляет класс с ошибкой
// и добавляет текст к error-span
const showInputError = (formInput, inputError, messageError) => {
  formInput.classList.add('popup__input-item_error');
  inputError.textContent = messageError;
};

// Функция, которая удаляет класс с ошибкой
// и удаляет текст у error-span
const hideInputError = (formInput, inputError) => {
  formInput.classList.remove('popup__input-item_error');
  inputError.textContent = '';
};

// Функция, которая проверяет валидность input
// Если input валиден, то вызывается функция hideInputError
// в противном случае вызывается функция showInputError
const isValid = (fieldset, formInput) => {
  const inputError = fieldset.querySelector(`.${formInput.id}-error`);

  //кастомное сообщение
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity('');
  };
  
  //сообщение компьютера
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formInput, inputError, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formInput, inputError);
  }
};

// Функция, которая проверяет список input ов на НЕвалидность.
// Если хотя бы один input из списка не валиден, то функция вернет true
// Если все input валидны, то функция вернет false
// Данная функция используется в toggleButtonState, чтобы понять нужно ли делать
// кнопку отправки формы активной или нет
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция, которая проверяет список input ов в форме
// и при необходимости делает кнопку активной / неактивной
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__submit-button_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__submit-button_inactive');
  }
};

// Функция, которая обрабатывает fieldset: находит все input ы и кнопку внутри себя
// Добавляет для каждого input слушателя, при каком-либо изменении input
// - проверяем валиден ли input
// - и стоит ли после изменения данного input делать кнопку активной
const setEventListeners = (fieldset) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(fieldset.querySelectorAll('.popup__input-item'));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = fieldset.querySelector('.popup__submit-button');

  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(fieldset, formInput);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
});
};

// Функция, которая сама найдет все формы из HTML (DOM). У каждой формы
// уберет поведение по умолчанию и пройдется по всем fieldset ам
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__content'));

  formList.forEach((formInput) => {
    formInput.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    
    const fieldsetList = Array.from(formInput.querySelectorAll('.popup__input-items'));

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

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

enableValidation();
