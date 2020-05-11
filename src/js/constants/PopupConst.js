export default class PopupConst {
  constructor(element) {
    this.element = element;

    // сами попапы
    this.enterPopup = document.querySelector('.popup-enter');
    this.regPopup = document.querySelector('.popup-reg');
    this.successPopup = document.querySelector('.popup-success');

    // поля ошибок
    this.emailErr = this.element.querySelector('.popup__input-error_email');
    this.passErr = this.element.querySelector('.popup__input-error_pass');
    this.handlerErr = this.element.querySelector('.popup__input-error_handler');

    // элементы формы
    this.form = this.element.querySelector('.popup__form');
    this.email = this.element.querySelector('.popup__input_email');
    this.pass = this.element.querySelector('.popup__input_pass');
    this.button = this.element.querySelector('.popup__button');

    // ссылка для переключения между попапами
    this.toggleLinkReg = document.querySelector('.popup__toggle-link_reg');
    this.toggleLinkEnter = document.querySelector('.popup__toggle-link_enter');
    this.toggleLinkSuccess = document.querySelector('.popup__toggle-link_success');
  }
}
