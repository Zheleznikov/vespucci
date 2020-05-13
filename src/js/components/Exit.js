// Выход из системы

export default class Exit {
  constructor(vespucciApi, head, auth) {
    this.auth = auth;
    this.vespucciApi = vespucciApi;
    this.head = head;
    this._handler();
  }

  _exit(evt) {
    evt.preventDefault();
    this.vespucciApi.logout()
      .then(() => {
        this.auth.logout();
        if (window.location.pathname !== '/') {
          window.location.pathname = '/';
        }
        this.head.ifUnauthorized();
      })
      .catch((err) => console.log(err));
  }

  _handler() {
    document.querySelector('.header__button_in').addEventListener('click', this._exit.bind(this));
  }
}