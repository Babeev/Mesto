export class API {
  constructor(array) {
    this.address = array.baseUrl;
    this.token = array.headers.authorization;
    this.json = array.headers;
  }

  getCards() {
    return fetch(`${this.address}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.token
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
      return Promise.reject(err);
    })
  }

  getUserInfo() {
    return fetch(`${this.address}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }).catch((err) => {
        return Promise.reject(err);
      })
  }

  editProfile(newname, newabout) {
    return fetch(`${this.address}/users/me`, {
      method: 'PATCH',
      headers: this.json,
      body: JSON.stringify({
        name: newname,
        about: newabout
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    }).catch((err) => {
      return Promise.reject(err);
    })
  }

  addCard(name, link) {
    return fetch(`${this.address}/cards`, {
      method: 'POST',
      headers: this.json,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      }).catch((err) => {
        return Promise.reject(err);
        // Можно лучше
        // return Promise.reject(new Error(err.message));
      })
  }

}
