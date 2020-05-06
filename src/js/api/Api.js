export default class Api {
  constructor(IP, options) {
    this.options = options;
    this.IP = IP;
  }

  // зарегистрироваться
  signup(email, name, password, callback) {
    return fetch(`${this.IP}signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "name": name,
          "password": password,
        })
      })
      .then(res => res.json())
      .then((result) => {
        if (callback) {
          callback(result);
        }
        return result;
      })
      .catch((err) => console.log(err))

  }

  // залогиниться
  signin(email, password, callback) {
    return fetch(`${this.IP}signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
        })
      })
      .then(res => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        return data
      })
      .then(data => {
        if (callback) {
          callback(data)
        }
        return data;
      })
      .catch(err => console.log(err));
  }

  // разлогиниться
  logout(callback) {
    return fetch(`${this.IP}logout`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then((result) => {
        callback(result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  // получить информацию о себе
  getMyData(callback) {
    return fetch(`${this.IP}users/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then((result) => {
        if (callback) {
          callback(result);
        }
        return result;
      })
      .catch((err) => console.log(err));

  }

}