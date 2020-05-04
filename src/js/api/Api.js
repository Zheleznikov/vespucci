export default class Api {
  constructor(options, IP) {
    this.options = options;
    this.IP = IP;
  }

  // зарегистрироваться
  signup(email, name, password, callback) {
    fetch(`${this.IP3}signup`, {
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
        callback(result);
      })
      .catch((err) => console.log(err))

  }

  // залогиниться
  signin(email, password, callback) {
    fetch(`${this.IP}signin`, {
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
      })
      .catch(err => console.log(err));
  }

  // разлогиниться
  logout(callback) {
    fetch(`${this.IP}logout`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then((result) => {
        callback(result);
      })
      .catch((err) => console.log(err));

  }

}