/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* ФОРМА ВХОДА

- обработчик входа - enter

- обработчик валидации enterValidate
*/

import Popup from './Popup';

export default class PopupEnter extends Popup {
  constructor(element, validate, vespucciApi, head, auth) {
    super(element);
    this.auth = auth;
    this.vespucciApi = vespucciApi;
    this.validate = validate;
    this.head = head;
    this.popupOpenButton = document.querySelector('.header__button_auth');
    this._handlers();

    this.dataToValidate = [{
      input: this.email,
      error: this.emailErr,
    },
    {
      input: this.pass,
      error: this.passErr,
    },
    ];
  }

  open() {
    super.open();
    this.clearFields();
  }

  // очистить все поля
  clearFields() {
    super.clearFields();
    this.dataToValidate.forEach((couple) => {
      couple.input.value = '';
      couple.error.textContent = '';
    });
  }

  // валидация
  _enterHandler() {
    this.validate.handler(this.dataToValidate, this.handlerErr, this.button);
  }

  // вход
  _enter(evt) {
    evt.preventDefault();
    this.button.textContent = 'Заходим...';
    this.vespucciApi.signin(this.email.value, this.pass.value)
      .then((res) => {
        this.button.textContent = 'Войти';
        this.auth.login(res.token, res.data.name);
        this.head.setLogin(localStorage.getItem('name'));
        this.close();
      })
      .catch((err) => {
        this.button.textContent = 'Войти';
        this.handlerErr.textContent = 'Неправильная почта или пароль';
        console.log(err);
      });
  }


  _handlers() {
    this.toggleLinkReg.addEventListener('click', this.open.bind(this));
    this.popupOpenButton.addEventListener('click', this.open.bind(this));
    this.toggleLinkSuccess.addEventListener('click', this.open.bind(this));
    this.toggleLinkEnter.addEventListener('click', this.close.bind(this));
    this.form.addEventListener('input', this._enterHandler.bind(this));
    this.form.addEventListener('submit', this._enter.bind(this));
  }
}