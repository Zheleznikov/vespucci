/* eslint-disable no-param-reassign */
/* ФОРМА РЕГИСТРАЦИИ

- обработчик регистрации - reg

- обработчик валидации - regHandler
*/

import Popup from './Popup';

export default class PopupReg extends Popup {
  constructor(element, validate, vespucciApi) {
    super(element);
    this.validate = validate;
    this.vespucciApi = vespucciApi;
    this.name = this.element.querySelector('.popup__input_name');
    this.nameErr = this.element.querySelector('.popup__input-error_name');
    this._handlers();
    this.dataToValidate = [{
      input: this.email,
      error: this.emailErr,
    },
    {
      input: this.pass,
      error: this.passErr,
    },
    {
      input: this.name,
      error: this.nameErr,
    },
    ];
  }

  open() {
    super.open();
    this.clearFields();
  }

  clearFields() {
    super.clearFields();
    this.dataToValidate.forEach((couple) => {
      couple.input.value = '';
      couple.error.textContent = '';
    });
  }

  // валидация
  _regHandler() {
    this.validate.handler(this.dataToValidate, this.handlerErr, this.button);
  }

  // зарегистрироваться
  _reg(evt) {
    evt.preventDefault();
    this.vespucciApi.signup(this.email.value, this.name.value, this.pass.value)
      .then(() => {
        this.close();
        document.querySelector('.popup-success').classList.add('popup_is-opened');
      })
      .catch((err) => {
        console.log(err);
        this.handlerErr.textContent = 'видимо email занят';
      });
  }

  _handlers() {
    this.toggleLinkEnter.addEventListener('click', this.open.bind(this));
    this.toggleLinkReg.addEventListener('click', this.close.bind(this));
    this.form.addEventListener('input', this._regHandler.bind(this));
    this.form.addEventListener('submit', this._reg.bind(this));
  }
}