/* РАБОТА С ПОПАПОМ

- открыть, закрыть, закрыть по кнопке esc и щелчку мыши в другом месте экрана

- очистить поля попапа clearContent;

- переключение между попапами
  showEnterPopup()
  showRegPopup()
  switchPopupHandler()
*/

import PopupConst from '../constants/PopupConst';

export default class Popup extends PopupConst {
  constructor(element) {
    super(element);
    this.defaultHandlers();
    this.switchPopupHandler();
  }

  open() {
    this.element.classList.add('popup_is-opened');
  }

  close() {
    if (this.element.classList.contains('popup-success')) {
      this.element.classList.remove('popup_is-opened', true);
    } else {
      this.element.classList.remove('popup_is-opened', true);
      this.clearContent();
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