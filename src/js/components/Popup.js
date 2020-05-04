export default class Popup {
  constructor(element) {

    this.element = element;
    this.toggleButton = this.element.querySelector('.popup__toggle-link');
    this.handlers();
  }

  open() {
    this.setRegPopup();
    this.element.classList.add('popup_is-opened');

  }

  close() {
    this.element.classList.remove('popup_is-opened');
    this.clearContent();
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

  clearContent() {
    this.element.querySelector('.popup__template').innerHTML = '';
  }

  setEnterPopup() {
    this.clearContent();
    const popupContentEnter = document.querySelector('.popup__content-enter').content.cloneNode(true);
    this.element.querySelector('.popup__template').appendChild(popupContentEnter);
    this.toggleButton.textContent = 'Зарегистрироваться';
    this.toggleButton.classList.add('is-enter');
    this.toggleButton.classList.remove('is-reg', true);
  }

  setRegPopup() {
    this.clearContent();
    const popupContentReg = document.querySelector('.popup__content-reg').content.cloneNode(true);
    this.element.querySelector('.popup__template').appendChild(popupContentReg);
    this.toggleButton.textContent = 'Войти';
    this.toggleButton.classList.add('is-reg');
    this.toggleButton.classList.remove('is-enter', true);
  }

  contentHandler() {
    if (this.toggleButton.classList.contains('is-enter')) {
      this.setRegPopup();
    } else if (this.toggleButton.classList.contains('is-reg')) {
      this.setEnterPopup();
    }

  }


  handlers() {
    document.querySelector('.header__button').addEventListener('click', this.open.bind(this));
    window.addEventListener('keydown', this.closeByKey.bind(this));
    this.element.addEventListener('click', this.closeByClick.bind(this));
    this.toggleButton.addEventListener('click', this.contentHandler.bind(this));

  }
}