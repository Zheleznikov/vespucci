/* eslint-disable class-methods-use-this */

/*  Работа с localstorage
Действия при входе и выходе из системы, проверка залогинин ли пользователь
*/

export default class Auth {
  login(token, name) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    const authGen = new CustomEvent('is-auth', {
      detail: 'auth-was-made'
    })
    document.dispatchEvent(authGen);
  }

  logout() {
    localStorage.clear();
    const authGen = new CustomEvent('is-auth', {
      detail: 'no-auth'
    })
    document.dispatchEvent(authGen);
  }

  isLogin() {
    return (localStorage.getItem('token') !== null);
  }
}