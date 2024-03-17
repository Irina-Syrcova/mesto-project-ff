import { profileAvatar, profileDesc, profileTitle, placesList, openSubmit, openImage, nameInput, jobInput, inputCardName, inputUrl } from "./index.js";
import { createCard, likeCard } from "./card.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: 'aa983300-fa7e-4a17-a77d-fcc024d33f1c',
    'Content-Type': 'application/json'
  }
}

export function getUserInfo() {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDesc.textContent = res.about;
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
};

export function getCard() {
  fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .then((res) => {
      res.forEach(function (element) {
        placesList.append(createCard(element, openSubmit, likeCard, openImage));
      })
    })
    .catch((err) => {
      console.log(err);
    })
};

export function setUserNewData() {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log(err);
    })
};

export function addNewCard() {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: inputCardName.value,
      link: inputUrl.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log(err);
    })
};

export function deleteMyCard(id) {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log(err);
    })
};

export function putLikeCard(id) {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .then((res) => {
      const numbersOfLikes = document.querySelectorAll('.card__likes');
      numbersOfLikes.forEach((element) => {
        if (element._id === res._id) {
          element.textContent = res.likes.length
        }
      })
    })
    .catch((err) => {
      console.log(err);
    })
};

export function dislikeCard(id) {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .then((res) => {
      const numbersOfLikes = document.querySelectorAll('.card__likes');
      numbersOfLikes.forEach((element) => {
        if (element._id === res._id) {
          element.textContent = res.likes.length
        }
      })
    })
    .catch((err) => {
      console.log(err);
    })
};

export function updateAvatar() {
  fetch('https://nomoreparties.co/v1/wff-cohort-9/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'aa983300-fa7e-4a17-a77d-fcc024d33f1c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log(err);
    })
};