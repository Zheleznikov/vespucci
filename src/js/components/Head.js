export default class Head {
  constructor(header) {
    this.header = header;
    this.authButton = this.header.querySelector('.header__button_auth');
    this.userButton = this.header.querySelector('.header__button_in');
    this.userNameButton = this.header.querySelector('.header__button_user');
    this.accountLink = this.header.querySelector('.header__link_account');
    this.openButton = this.header.querySelector('.header__menu-button');

    this.handlers();
  }

  // кнопки в хэдере для авторизванного пользователя
  ifLogin(name) {
    this.authButton.classList.add('header__button_none');
    this.userButton.classList.remove('header__button_none');
    this.accountLink.classList.remove('header__link_none');
    this.userNameButton.textContent = name;
  }

  // кнопки входа для неавторизованного пользователя
  ifUnauthorized() {
    this.authButton.classList.remove('header__button_none');
    this.userButton.classList.add('header__button_none');
    this.accountLink.classList.add('header__link_none');
  }

  ifMobile() {
    this.header.classList.toggle('header_mobile');
    this.header.classList.toggle('page');
    this.header.querySelector('.header__links').classList.toggle('header__links_mobile');
    this.header.querySelector('.header__logo-container').classList.toggle('header__logo-container_mobile');
    this.header.querySelector('.header__logo').classList.toggle('header__logo_mobile');
    this.header.querySelector('.header__menu-sticks').classList.toggle('header__menu-sticks_mobile');
    this.header.querySelectorAll('.header__button').forEach(button => button.classList.toggle('header__button_mobile'));
    this.header.querySelectorAll('.header__link').forEach(link => link.classList.toggle('header__link_mobile'));
    this.header.querySelector('.header__link_active').classList.toggle('header__link_active_mobile');
    document.querySelector('.search').classList.toggle('search_mobile');
  }

  handlers() {
    this.openButton.addEventListener('click', this.ifMobile.bind(this));
  }

}