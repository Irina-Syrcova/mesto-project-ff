const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: 'aa983300-fa7e-4a17-a77d-fcc024d33f1c',
    'Content-Type': 'application/json'
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

export function getUserInfo() {
  return request(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
};

export function getCard() {
  return request(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
};

export function setUserNewData(name, job) {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job
    })
  })
};

export function addNewCard(cardName, url) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: url
    })
  })
};

export function deleteMyCard(id) {
  return request(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

export function putLikeCard(id) {
  return request(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
};

export function dislikeCard(id) {
  return request(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

export function updateAvatar(avatar) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: 'aa983300-fa7e-4a17-a77d-fcc024d33f1c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatar
    })
  })
};