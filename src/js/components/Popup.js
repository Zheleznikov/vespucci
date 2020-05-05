import PopupConst from '../constants/PopupConst'

export default class Popup extends PopupConst {
  constructor(element) {
    super(element);
    this.defaultHandlers();
    this.switchPopupHandler();
  }

  open() {
    this.clearContent();
    this.element.classList.add('popup_is-opened');
  }

  close() {
    this.element.classList.remove('popup_is-opened', true);
  }

  multyClose(event) {
    if (event.target === this.element || event.target === this.element.querySelector('.popup__close')) {
      this.close();
    }
    if (event.keyCode === 27) {
      this.close();
    }
  }

  clearContent() {
    this.element.querySelector('.popup__input_email').value = '';
    this.element.querySelector('.popup__input_pass').value = '';
    document.querySelector('.popup__input_name').value = '';
    this.element.querySelector('.popup__input-error_email').textContent = '';
    this.element.querySelector('.popup__input-error_pass').textContent = '';
    document.querySelector('.popup__input-error_name').textContent = '';
    this.element.querySelector('.popup__button').setAttribute('disabled', 'disabled');
  }

  showEnterPopup() {
    // this.clearContent();
    this.enterPopup.classList.add('popup_is-opened');
    this.regPopup.classList.remove('popup_is-opened', true);
    this.successPopup.classList.remove('popup_is-opened', true);
  }

  showRegPopup() {
    // this.clearContent();
    this.regPopup.classList.add('popup_is-opened');
    this.enterPopup.classList.remove('popup_is-opened', true);
  }

  switchPopupHandler() {
    document.querySelector('.popup__toggle-link_reg').addEventListener('click', this.showEnterPopup.bind(this));
    document.querySelector('.popup__toggle-link_enter').addEventListener('click', this.showRegPopup.bind(this));
    document.querySelector('.popup__toggle-link_success').addEventListener('click', this.showEnterPopup.bind(this));
  }

  defaultHandlers() {
    window.addEventListener('keydown', this.multyClose.bind(this));
    this.element.addEventListener('click', this.multyClose.bind(this));
  }
}