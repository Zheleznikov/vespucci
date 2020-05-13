/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* РАБОТА С ПОПАПОМ

- открыть, закрыть, закрыть по кнопке esc и щелчку мыши в другом месте экрана

- очистить поля

- обработчик закрытия приветственного попапа


- переключение между попапами
  showEnterPopup()
  showRegPopup()
  switchPopupHandler()
*/

export default class Popup {
  constructor(element) {
    this.element = element;
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
  }

  open() {
    this.element.classList.add('popup_is-opened');
  }

  close() {
    this.element.classList.remove('popup_is-opened', true);
  }

  // закрыть по щелчку мыши в другом месте или по esc
  multyClose(event) {
    if (event.target === this.element || event.target === this.element.querySelector('.popup__close') || event.keyCode === 27) {
      this.close();
    }
  }

  // очистить содержимое полей и подсказок
  clearFields() {
    this.handlerErr.textContent = '';
    this.button.setAttribute('disabled', 'disabled');
  }

  // обработчик закрытия приветственного попапа регистрации
  closeSuccessPopupHandler() {
    this.toggleLinkSuccess.addEventListener('click', this.close.bind(this));
  }

  defaultHandlers() {
    window.addEventListener('keydown', this.multyClose.bind(this));
    this.element.addEventListener('click', this.multyClose.bind(this));
  }
}