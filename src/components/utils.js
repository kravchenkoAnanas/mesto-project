// проверка ответа от сервера 
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// значок загрузки
export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.setAttribute("value", button.value + "...");
  } else {
    button.setAttribute("value", button.value.replace("...", ""));
  };
}
