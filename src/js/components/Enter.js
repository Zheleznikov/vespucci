import Popup from './Popup';

export default class Enter extends Popup {
  constructor(element, validate, api, head) {
    super(element);
    this.api = api;
    this.validate = validate;
    this.head = head;

    this.handlers();
  }



  enterHandler(evt) {
    this.validate.handler(evt, this.email, this.emailErr, this.pass, this.passErr, this.button, this.handlerErr)
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
    this.form.addEventListener('change', this.enterHandler.bind(this));
    this.form.addEventListener('submit', this.enter.bind(this));

  }
}