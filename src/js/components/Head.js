/*  ОФОРМЛЕНИЕ ХЭДЕРА

- переключение кнопок в хэдере в зависимости от того авторизованный пользователь или нет
Методы ifLogin, ifUnauthorized

- переключение классов для мобильной версии при разрешении меньше 680
Методы ifMobile

- переключение на мобильную версию для страницы личного кабинета
Методы setBlackTheme, widthHandler

*/

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

  // подключение классов для мобильной версии
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

    if (window.location.pathname !== "/account.html") {
      document.querySelector('.search').classList.toggle('search_mobile');
    }

    if (window.location.pathname === '/account.html') {
      document.querySelector('.articles-info').classList.toggle('articles-info_mobile');
      this.header.querySelector('.header__button_icon').src = '../../images/logout.svg';
    }
  }

  // подключение классов для мобильной версии для страницы личного кабинета
  setBlackTheme() {
    if (window.location.pathname === "/account.html") {
      this.header.querySelector('.header__logo').classList.toggle('header__theme_black');
      this.header.querySelectorAll('.header__link').forEach(link => link.classList.toggle('header__theme_black'));
      this.header.querySelector('.header__button_in').classList.toggle('header__theme_black');
      this.header.querySelector('.header__menu-button').classList.toggle('header__menu-button_account');
    }
  }

  setButtonBlackTheme() {
    this.header.querySelector('.header__button_in').classList.add('header__theme_black');
  }

  // обработчик переключение значка выхода в зависимости от ширины страницы
  widthHandler() {
    if (window.innerWidth < 680) {
      this.header.querySelector('.header__button_icon').src = '../../images/logout.svg';
    } else if (window.innerWidth > 680) {
      this.header.querySelector('.header__button_icon').src = '../../images/logout-black.svg';
    }
  }

  handlers() {
    this.openButton.addEventListener('click', this.ifMobile.bind(this));
    this.openButton.addEventListener('click', this.setBlackTheme.bind(this));
    if (window.location.pathname === '/account.html') {
      window.addEventListener('resize', this.widthHandler.bind(this))
    }
  }

}