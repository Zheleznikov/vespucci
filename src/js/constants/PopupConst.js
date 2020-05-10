export default class PopupConst {
  constructor(element) {
    this.element = element;

    this.enterPopup = document.querySelector('.popup-enter');
    this.regPopup = document.querySelector('.popup-reg');
    this.successPopup = document.querySelector('.popup-success');

    this.emailErr = this.element.querySelector('.popup__input-error_email');
    this.passErr = this.element.querySelector('.popup__input-error_pass');
    this.handlerErr = this.element.querySelector('.popup__input-error_handler');

    this.form = this.element.querySelector('.popup__form');
    this.email = this.element.querySelector('.popup__input_email');
    this.pass = this.element.querySelector('.popup__input_pass');
    this.button = this.element.querySelector('.popup__button');
  }
}