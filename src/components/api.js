import { checkResponse } from "./utils.js";

// нужна в качестве шаблона, чтобы в каждом запросе не писать одинаковые строки
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: '90a3b86c-0f37-47cc-a67e-3897ae76ba03',
    'Content-Type': 'application/json'
  }
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
};

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH', // PATCH — для частичного обновления ресурса. Например, при обновлении профиля пользователя
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })})
    .then(checkResponse)
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
}

export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST', // POST используют для отправки данных на сервер
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse)
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, { 
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
};

export const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(checkResponse)
}

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT', // PUT предназначен для полного обновления указанного ресурса. Например, если в каталоге книг вы решили заменить одну книгу другой;
    headers: config.headers
  })
  .then(checkResponse)
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
}
