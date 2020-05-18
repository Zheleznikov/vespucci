/* eslint-disable prefer-promise-reject-errors */
// Здесь собраны методы для работы со своим сервером. Они подписаны в коде

export default class VespucciApi {
  constructor(IP, headers) {
    this.headers = headers;
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
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
    // .catch((err) => {
    //   throw new Error(err);
    // });
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
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
    // .catch((err) => {
    //   throw new Error(err);
    // });
  }

  // разлогиниться
  logout() {
    return fetch(`${this.IP}logout`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
    // .catch((err) => {
    //   throw new Error(err);
    // });
  }

  // получить информацию о себе
  getMyData() {
    return fetch(`${this.IP}users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => console.log(err)); // этим методом я больше не пользуюсь поэтому завершаю цепочку здесь
  }

  // сохранить новость себе
  postNews(news) {
    return fetch(`${this.IP}articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: news.keyword,
        title: news.title,
        text: news.content,
        date: news.publishedAt,
        source: news.source.name,
        link: news.url,
        image: news.urlToImage,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
    // .catch((err) => {
    //   throw new Error(err);
    // });
  }

  // удалить новость
  deleteNews(id) {
    return fetch(`${this.IP}articles/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
    // .catch((err) => {
    //   throw new Error(err);
    // });
  }

  // показать все новости
  getNews() {
    return fetch(`${this.IP}articles`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => res.data);
    // .catch((err) => {
    //   throw new Error(err);
    // });
  }
}