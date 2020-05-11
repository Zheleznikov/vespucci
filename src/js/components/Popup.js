/* eslint-disable no-unused-expressions */
/* РАБОТА С ПОПАПОМ

- открыть, закрыть, закрыть по кнопке esc и щелчку мыши в другом месте экрана

- очистить поля попапа clearContent;

- переключение между попапами
  showEnterPopup()
  showRegPopup()
  switchPopupHandler()
*/

// import PopupConst from '../constants/PopupConst';

export default class Popup {
  constructor(element, validate) {
    this.element = element;
    this.validate = validate;
    // super(element);
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
    this.defaultHandlers();
    this.switchPopupHandler();
  }

  open() {
    this.element.classList.add('popup_is-opened');
    // this.emailFlag = false;
    // this.passFlag = false;
  }

  close() {
    if (this.element.classList.contains('popup-success')) {
      this.element.classList.remove('popup_is-opened', true);
    } else {
      this.element.classList.remove('popup_is-opened', true);
      this.clearContent();
      // this.emailFlag = false;
      // this.passFlag = false;
    }
  }


  // закрыть по щелчку мыши в другом месте или по esc
  multyClose(event) {
    if (event.target === this.element || event.target === this.element.querySelector('.popup__close') || event.keyCode === 27) {
      this.close();
    }
  }

  // очистить содержимое полей и подсказок
  clearContent() {
    this.email.value = '';
    this.pass.value = '';
    document.querySelector('.popup__input_name').value = '';
    this.emailErr.textContent = '';
    this.passErr.textContent = '';
    this.handlerErr.textContent = '';
    document.querySelector('.popup__input-error_name').textContent = '';
    this.button.setAttribute('disabled', 'disabled');
  }

  // переключиться на попап входа
  showEnterPopup() {
    if (this.element.classList.contains('popup-reg') || this.element.classList.contains('popup-success')) {
      this.enterPopup.classList.add('popup_is-opened');
      this.close();
    }
  }

  // переключиться на попап регистрации
  showRegPopup() {
    if (this.element.classList.contains('popup-enter')) {
      this.regPopup.classList.add('popup_is-opened');
      this.close();
    }
  }

  // обработчик переключения попапов
  switchPopupHandler() {
    this.toggleLinkReg.addEventListener('click', this.showEnterPopup.bind(this));
    this.toggleLinkEnter.addEventListener('click', this.showRegPopup.bind(this));
    this.toggleLinkSuccess.addEventListener('click', this.showEnterPopup.bind(this));
  }

  defaultHandlers() {
    window.addEventListener('keydown', this.multyClose.bind(this));
    this.element.addEventListener('click', this.multyClose.bind(this));
  }
}