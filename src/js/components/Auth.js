/* eslint-disable class-methods-use-this */
export default class Auth {
  login(token, name) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);

    // console.log(localStorage.getItem('token'));
    // console.log(localStorage.getItem('name'));
  }

  logout() {
    localStorage.clear();
  }

  isLogin() {
    return (localStorage.getItem('token') !== null);
  }
}