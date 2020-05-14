
/*  ОФОРМЛЕНИЕ ХЭДЕРА

- переключение кнопок в хэдере в зависимости от того авторизованный пользователь или нет
Методы setLogin, setUnauthorized

- переключение классов для мобильной версии при разрешении меньше 680
Методы setMobile

- переключение на мобильную версию для страницы личного кабинета
Методы setBlackTheme, widthHandler

*/

/* eslint-disable no-undef */

export default class Head {
  constructor(header) {
    this.header = header;
    this.authButton = this.header.querySelector('.header__button_auth');
    this.userButton = this.header.querySelector('.header__button_in');
    this.userNameButton = this.header.querySelector('.header__button_user');
    this.accountLink = this.header.querySelector('.header__link_account');
    this.openButton = this.header.querySelector('.header__menu-button');

    this.headerLinks = this.header.querySelector('.header__links');
    this.headerLogoContainer = this.header.querySelector('.header__logo-container');
    this.headerLogo = this.header.querySelector('.header__logo');
    this.headerMenuSticks = this.header.querySelector('.header__menu-sticks');
    this.headerButtonsArray = this.header.querySelectorAll('.header__button');
    this.headerLinksArray = this.header.querySelectorAll('.header__link');
    this.headerLinkActive = this.header.querySelector('.header__link_active');
    this.headerMenuButton = this.header.querySelector('.header__menu-button');
    this.search = document.querySelector('.search');
    this.articlesInfo = document.querySelector('.articles-info');
    this.headerButtonIcon = this.header.querySelector('.header__button_icon');
    this.headerButtonIn = this.header.querySelector('.header__button_in');

    this._handlers();
  }

  // кнопки в хэдере для авторизванного пользователя
  setLogin(name) {
    this.authButton.classList.add('header__button_none');
    this.userButton.classList.remove('header__button_none');
    this.accountLink.classList.remove('header__link_none');
    this.userNameButton.textContent = name;
  }

  // кнопки входа для неавторизованного пользователя
  setUnauthorized() {
    this.authButton.classList.remove('header__button_none');
    this.userButton.classList.add('header__button_none');
    this.accountLink.classList.add('header__link_none');
  }

  // подключение классов для мобильной версии
  _setMobile() {
    this.header.classList.toggle('header_mobile');
    this.header.classList.toggle('page');

    this.headerLinks.classList.toggle('header__links_mobile');
    this.headerLogoContainer.classList.toggle('header__logo-container_mobile');
    this.headerLogo.classList.toggle('header__logo_mobile');
    this.headerMenuSticks.classList.toggle('header__menu-sticks_mobile');
    this.headerButtonsArray.forEach((button) => button.classList.toggle('header__button_mobile'));
    this.headerLinksArray.forEach((link) => link.classList.toggle('header__link_mobile'));
    this.headerLinkActive.classList.toggle('header__link_active_mobile');
    this.headerMenuButton.classList.toggle('header__menu-button_x');

    if (window.location.pathname !== '/account.html') {
      this.search.classList.toggle('search_mobile');
    }

    if (window.location.pathname === '/account.html') {
      this.articlesInfo.classList.toggle('articles-info_mobile');
      this.headerButtonIcon.src = '../../images/logout.svg';
    }
  }

  // подключение классов для мобильной версии для страницы личного кабинета
  setBlackTheme() {
    if (window.location.pathname === '/account.html') {
      this.headerLogo.classList.toggle('header__theme_black');
      this.headerLinksArray.forEach((link) => link.classList.toggle('header__theme_black'));
      this.headerButtonIn.classList.toggle('header__theme_black');
      this.headerMenuButton.classList.toggle('header__menu-button_account');
    }
  }

  // обработчик переключение значка выхода в зависимости от ширины страницы
  _widthHandler() {
    if (window.innerWidth < 680) {
      this.headerButtonIcon.src = '../../images/logout.svg';
    } else if (window.innerWidth > 680) {
      this.headerButtonIcon.src = '../../images/logout-black.svg';
    }
  }

  _handlers() {
    this.headerMenuSticks.addEventListener('click', this._setMobile.bind(this));
    this.headerMenuSticks.addEventListener('click', this.setBlackTheme.bind(this));

    if (window.location.pathname === '/account.html') {
      window.addEventListener('resize', this._widthHandler.bind(this));
    }
  }
}