/* eslint-disable prefer-promise-reject-errors */
// Здесь собраны методы для работы со своим сервером. Они подписаны в коде

export default class Api {
  constructor(IP, headers, bearerHeaders) {
    this.headers = headers;
    this.bearerHeaders = bearerHeaders;
    this.IP = IP;
  }

  // зарегистрироваться
  signup(userEmail, userNname, userPass) {
    return fetch(`${this.IP}signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: userEmail,
        name: userNname,
        password: userPass,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {
        throw new Error(err);
      });
  }

  // залогиниться
  signin(userEmail, userPass) {
    return fetch(`${this.IP}signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: userEmail,
        password: userPass,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`err: ${res.status}`);
        }
        return res.json();
      });
    // .catch((err) => {
    // //  console.log(err);
    //   throw new Error(err.message);
    // });
  }

  // разлогиниться
  logout() {
    return fetch(`${this.IP}logout`, {
      method: 'POST',
      headers: this.bearerHeaders,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // получить информацию о себе
  getMyData() {
    return fetch(`${this.IP}users/me`, { headers: this.bearerHeaders })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  // сохранить новость себе
  postNews(artKeyword, artTitle, artText, artDate, artSource, artLink, artImage) {
    return fetch(`${this.IP}articles`, {
      method: 'POST',
      headers: this.bearerHeaders,
      body: JSON.stringify({
        keyword: artKeyword,
        title: artTitle,
        text: artText,
        date: artDate,
        source: artSource,
        link: artLink,
        image: artImage,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // удалить новость
  deleteNews(id) {
    return fetch(`${this.IP}articles/${id}`, {
      method: 'DELETE',
      headers: this.bearerHeaders,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // показать все новости
  getNews() {
    return fetch(`${this.IP}articles`, { headers: this.bearerHeaders })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });
  }
}