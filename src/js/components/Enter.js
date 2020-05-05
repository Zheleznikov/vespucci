import Popup from './Popup';

export default class Enter extends Popup {
  constructor(element, validate, api, head) {
    super(element);

    this.api = api;
    this.validate = validate;
    this.head = head;


    this.emailFlag;
    this.passFlag;
    this.handlers();
  }

  enterHandler(evt) {
    if (evt.target === this.email) {
      this.emailFlag = this.validate.checkWhatToCheck(this.email.value, this.emailErr, 'email');
    } else if (evt.target === this.pass) {
      this.passFlag = this.validate.checkWhatToCheck(this.pass.value, this.passErr, 'password');
    }
    if (this.emailFlag && this.passFlag) {
      this.validate.setButtonAttribute(this.button, true);
    } else {
      this.validate.setButtonAttribute(this.button, false);
    }
  }

  enter(evt) {
    evt.preventDefault();
    this.api.signin(this.email.value, this.pass.value, (data) => {
      if (data.message === 'Congratulate') {
        this.head.ifLogin(data.data.name);
        this.close();
      } else {
        this.handlerErr.textContent = data.message;
      }
    })

  }

  exit() {
    this.api.logout(data => this.head.ifUnauthorized());
  }



  handlers() {
    document.querySelector('.header__button_auth').addEventListener('click', this.open.bind(this));
    document.querySelector('.header__button_in').addEventListener('click', this.exit.bind(this));
    this.form.addEventListener('input', this.enterHandler.bind(this));
    this.form.addEventListener('submit', this.enter.bind(this));

  }
}