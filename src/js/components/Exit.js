// Выход из системы

export default class Exit {
  constructor(api, head) {
    this.api = api;
    this.head = head;
    this._handler();
  }

  _exit() {
    this.api.logout()
      .then(() => {
        this.head.ifUnauthorized();
        localStorage.removeItem('token');
        window.location.pathname = './';
      })
      .catch((err) => console.log(err));
  }

  _handler() {
    document.querySelector('.header__button_in').addEventListener('click', this._exit.bind(this));
  }
}