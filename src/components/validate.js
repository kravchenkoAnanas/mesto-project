// Функция, которая добавляет класс с ошибкой
// и добавляет текст к error-span
const showInputError = (formInput, inputError, messageError, selectors) => {
  formInput.classList.add(selectors.errorClass);
  inputError.textContent = messageError;
};

// Функция, которая удаляет класс с ошибкой
// и удаляет текст у error-span
const hideInputError = (formInput, inputError, selectors) => {
  formInput.classList.remove(selectors.errorClass);
  inputError.textContent = '';
};

// Функция, которая проверяет валидность input
// Если input валиден, то вызывается функция hideInputError
// в противном случае вызывается функция showInputError
const isValid = (formElement, formInput, selectors) => {
  const inputError = formElement.querySelector(`.${formInput.id}-error`);
  //кастомное сообщение
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity('');
  };
  
  //сообщение компьютера
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formInput, inputError, formInput.validationMessage, selectors);
  } else {
    // Если проходит, скроем
    hideInputError(formInput, inputError, selectors);
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
const toggleButtonState = (inputList, buttonElement, selectors) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(selectors.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  }
};

// Функция, которая обрабатывает форму: находит все input ы и кнопку внутри себя
// Добавляет для каждого input слушателя, при каком-либо изменении input
// - проверяем валиден ли input
// - и стоит ли после изменения данного input делать кнопку активной
const setEventListeners = (formElement, selectors) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors);
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
     toggleButtonState(inputList, buttonElement, selectors);
    }, 0); 
  });

  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput, selectors);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, selectors);
    });
});
};

// Функция, которая сама найдет все формы из HTML (DOM)
export const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, selectors);
  });
};
