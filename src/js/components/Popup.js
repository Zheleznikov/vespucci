/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
export default class Popup {
  constructor(element) {
    this.element = element;
    this.handlers();

    this.popupContentEnter = document.querySelector('.popup__content-enter').content.cloneNode(true);
    this.popupContentReg = document.querySelector('.popup__content-reg').content.cloneNode(true);
  }

  open() {
    this.element.classList.add('popup_is-opened');
  }

  close() {
    this.element.classList.remove('popup_is-opened');
  }

  closeByKey(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  }

  closeByClick(event) {
    if (event.target === this.element || event.target === this.element.querySelector('.popup__close')) {
      this.close();
    }
  }

  setContent() {
    this.element.querySelector('.popup__content').appendChild(this.popupContentEnter);
     this.element.querySelector('.popup__toggle-link').addEventListener('click', this.setContent2.bind(this));
  }

  setContent2() {
    this.clearContent();
     this.element.querySelector('.popup__content').appendChild(this.popupContentReg);
  }


  clearContent() {
    this.element.querySelector('.popup__content').innerHTML = '';
  }

  handlers() {
    document.querySelector('.header__button').addEventListener('click', this.open.bind(this));
    window.addEventListener('keydown', this.closeByKey.bind(this));
    this.element.addEventListener('click', this.closeByClick.bind(this));

    //  this.element.querySelector('.popup__toggle-link').addEventListener('click', this.setContent2.bind(this));
  }
}