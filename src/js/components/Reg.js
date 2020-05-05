import Popup from './Popup';

export default class Auth extends Popup {
  constructor(element, validate, api) {
    super(element);
    this.validate = validate;
    this.api = api;

    this.defaultHandlers();
    this.switchPopupHandler();

    this.emailFlag;
    this.passFlag;
    this.nameFlag;



    this.name = this.element.querySelector('.popup__input_name');
    this.nameErr = this.element.querySelector('.popup__input-error_name');

    this.handlers();

  }

  regHandler(evt) {
    if (evt.target === this.email) {
      this.emailFlag = this.validate.checkWhatToCheck(this.email.value, this.emailErr, 'email');
    } else if (evt.target === this.pass) {
      this.passFlag = this.validate.checkWhatToCheck(this.pass.value, this.passErr, 'password');
    } else if (evt.target === this.name) {
      this.nameFlag = this.validate.checkWhatToCheck(this.name.value, this.nameErr, 'name');
    }
    if (this.emailFlag && this.passFlag && this.nameFlag) {
      this.validate.setButtonAttribute(this.button, true)
    } else {
      this.validate.setButtonAttribute(this.button, false)
    }
  }

  reg(evt) {
    evt.preventDefault();
    this.api.signup(this.email.value, this.name.value, this.pass.value, (data) => {
      if (data.message === 'Congratulate') {
        this.close();
        document.querySelector('.popup-success').classList.add('popup_is-opened');

      } else {
        this.handlerErr.textContent = data.message;
      }
    })
  }

  handlers() {
    this.form.addEventListener('input', this.regHandler.bind(this));
    this.form.addEventListener('submit', this.reg.bind(this));
  }


}