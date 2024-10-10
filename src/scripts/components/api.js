const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: 'd8ed37fc-7e4d-40c9-94c0-50419c8fec9d',
    'Content-Type': 'application/json'
  }
}

export const fetchInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  });
}

export const getCurrentUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
}

export function editUserProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({ name, about}),
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function editUserAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({avatar}),
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({ name, link }),
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function requestDeleteCard(userId) {
  return fetch(`${config.baseUrl}/cards/${userId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function addUserlikes(userId) {
  return fetch(`${config.baseUrl}/cards/likes/${userId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function requestdeleteUserLike(userId) {
  return fetch(`${config.baseUrl}/cards/likes/${userId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}