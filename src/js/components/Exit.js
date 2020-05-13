// Выход из системы

export default class Exit {
  constructor(vespucciApi, head, auth) {
    this.auth = auth;
    this.vespucciApi = vespucciApi;
    this.head = head;
    this.logoutButton = document.querySelector('.header__button_in');
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
        this.head.setUnauthorized();
      })
      .catch((err) => console.log(err));
  }

  _handler() {
    this.logoutButton.addEventListener('click', this._exit.bind(this));
  }
}