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

  // валидация
  _enterHandler() {
    this.validate.handler(this.dataToValidate, this.handlerErr, this.button);
  }

  // вход
  _enter(evt) {
    evt.preventDefault();
    this.vespucciApi.signin(this.email.value, this.pass.value)
      .then((res) => {
        // if (res.message === 'Congratulate') {
        this.auth.login(res.token, res.data.name);
        this.head.ifLogin(localStorage.getItem('name'));
        this.close();
        // } else {
        //   this.handlerErr.textContent = res.message;
        // }
      })
      .catch((err) => {
        console.log(err.body);
        this.handlerErr.textContent = 'Неправильная почта или пароль';
        console.log(err);
      });
  }


  _handlers() {
    document.querySelector('.header__button_auth').addEventListener('click', this.open.bind(this));
    this.toggleLinkSuccess.addEventListener('click', this.open.bind(this));
    this.form.addEventListener('input', this._enterHandler.bind(this));
    this.form.addEventListener('submit', this._enter.bind(this));
  }
}