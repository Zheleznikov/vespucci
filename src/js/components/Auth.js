/* eslint-disable class-methods-use-this */

/*  Работа с localstorage
Действия при входе и выходе из системы, проверка залогинин ли пользователь
*/

export default class Auth {
  login(token, name) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
  }

  logout() {
    localStorage.clear();
  }

  isLogin() {
    return (localStorage.getItem('token') !== null);
  }
}