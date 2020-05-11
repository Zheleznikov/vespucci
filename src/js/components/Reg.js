/* ФОРМА РЕГИСТРАЦИИ

- обработчик регистрации - reg

- обработчик валидации - regHandler
*/

import Popup from './Popup';

export default class Auth extends Popup {
  constructor(element, validate, api) {
    super(element);
    this.validate = validate;
    this.api = api;
    this.name = this.element.querySelector('.popup__input_name');
    this.nameErr = this.element.querySelector('.popup__input-error_name');
    this._handlers();
  }

  // валидация
  _regHandler(evt) {
    this.validate.handler(evt, this.email, this.emailErr, this.pass, this.passErr, this.button, this.handlerErr, this.name, this.nameErr);
  }

  // зарегистрироваться
  _reg(evt) {
    evt.preventDefault();
    this.api.signup(this.email.value, this.name.value, this.pass.value)
      .then((data) => {
        if (data.message === 'Congratulate') {
          this.close();
          document.querySelector('.popup-success').classList.add('popup_is-opened');
        } else {
          this.handlerErr.textContent = data.message;
        }
      })
      .catch((err) => console.log(err));
  }

  _handlers() {
    this.form.addEventListener('input', this._regHandler.bind(this));
    this.form.addEventListener('submit', this._reg.bind(this));
  }
}