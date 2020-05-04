/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
export default class Popup {
  constructor(element) {
    this.element = element;
    this.handlers();
  }

  open() {
    this.element.classList.add('popup_is-opened');
  }

  close() {
    this.element.classList.remove('popup_is-opened');
  }

  // закрыть by esc
  closeByKey(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  }

  // закрыть, щелкнув просто где-то на экране
  closeByClick(event) {
    if (event.target === this.element || event.target === this.element.querySelector('.popup__close')) {
      this.close();
    }
  }

  handlers() {
    document.querySelector('.header__button').addEventListener('click', this.open.bind(this));
    window.addEventListener('keydown', this.closeByKey.bind(this));
    this.element.addEventListener('click', this.closeByClick.bind(this));
  }
}