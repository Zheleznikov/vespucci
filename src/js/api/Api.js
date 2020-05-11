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
      .catch((err) => console.log(err));
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
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  // разлогиниться
  logout() {
    return fetch(`${this.IP}logout`, {
      method: 'POST',
      headers: this.bearerHeaders,
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  // получить информацию о себе
  getMyData() {
    return fetch(`${this.IP}users/me`, { headers: this.bearerHeaders })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
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
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  // удалить новость
  deleteNews(id) {
    return fetch(`${this.IP}articles/${id}`, {
      method: 'DELETE',
      headers: this.bearerHeaders,
    })
      .catch((err) => console.log(err));
  }

  // показать все новости
  getNews() {
    return fetch(`${this.IP}articles`, { headers: this.bearerHeaders })
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
}