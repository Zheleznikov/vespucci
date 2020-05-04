export default class Form {
  constructor(popup) {
    this.popup = popup;
    this.button = this.popup.querySelector('.popup__button');
    this.handlers();
  }

  log() {
    console.log('ok');
  }

  handlers() {
    this.button.addEventListener('click' , this.log.bind(this))
  }

}