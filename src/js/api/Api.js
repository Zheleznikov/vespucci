/* eslint-disable object-shorthand */
export default class Api {
  constructor(IP, options) {
    this.options = options;
    this.IP = IP;
  }

  // зарегистрироваться
  signup(email, name, password) {
    return fetch(`${this.IP}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  // залогиниться
  signin(email, password) {
    return fetch(`${this.IP}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
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
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  // получить информацию о себе
  getMyData() {
    return fetch(`${this.IP}users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  // сохранить новость себе
  postNews(keyword, title, text, date, source, link, image) {
    return fetch(`${this.IP}articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        date: date,
        source: source,
        link: link,
        image: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
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
      .catch((err) => console.log(err));
  }

  // показать все новости
  getNews(callback) {
    return fetch(`${this.IP}articles`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (callback) {
          callback(result);
        }
        return result.data;
      })
      .catch((err) => console.log(err));
  }
}