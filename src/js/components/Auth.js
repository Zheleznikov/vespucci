/* eslint-disable class-methods-use-this */

/*  Работа с localstorage
Действия при входе и выходе из системы, проверка залогинин ли пользователь
*/

export default class Auth {
  constructor(eventGenerate) {
    this.eventGenerate = eventGenerate;
  }
  login(token, name) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    this.eventGenerate.authEventGenerate();
  }

  logout() {
    localStorage.clear();
    this.eventGenerate.noAuthEventGenerate();
  }

  isLogin() {
    return (localStorage.getItem('token') !== null);
  }
}