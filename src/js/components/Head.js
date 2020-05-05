export default class Head {
  constructor(header) {
    this.header = header;
    this.authButton = this.header.querySelector('.header__button_auth');
    this.userButton = this.header.querySelector('.header__button_in');
    this.accountLink = this.header.querySelector('.header__link_account');
  }

  // кнопки в хэдере для авторизванного пользователя
  ifLogin(name) {
    this.authButton.classList.add('header__button_none');
    this.userButton.classList.remove('header__button_none');
    this.accountLink.classList.remove('header__link_none');
    this.userButton.textContent = name;
  }

  // кнопки входа для неавторизованного пользователя
  ifUnauthorized() {
    this.authButton.classList.remove('header__button_none');
    this.userButton.classList.add('header__button_none');
    this.accountLink.classList.add('header__link_none');
  }

}