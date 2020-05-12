/* eslint-disable no-unused-expressions */
/* ФОРМА ВХОДА

- обработчик входа - enter

- обработчик валидации enterValidate
*/

import Popup from './Popup';

export default class Enter extends Popup {
  constructor(element, validate, api, head) {
    super(element);
    this.api = api;
    this.validate = validate;
    this.head = head;
    this._handlers();
    // this.emailFlag;
    // this.passFlag;

    this.dataToValidate = [{
      input: this.email,
      error: this.emailErr,
    //   flag: this.emailFlag,
    },
    {
      input: this.pass,
      error: this.passErr,
    //    flag: this.passFlag,
    },

    ];
  }

  open() {
    super.open();
    //   this.emailFlag = false;
    //  this.passFlag = false;
    // console.log(this.emailFlag);
  }

  // валидация
  _enterHandler() {
    this.validate.handler(this.dataToValidate, this.handlerErr, this.button);
  }

  // вход
  _enter(evt) {
    evt.preventDefault();
    this.api.signin(this.email.value, this.pass.value)
      .then((data) => {
        // console.log(data);
        if (data.message === 'Congratulate') {
          localStorage.setItem('token', data.token);
          this.head.ifLogin(data.data.name);
          this.close();
        } else {
          this.handlerErr.textContent = data.message;
        }
      })
      .catch((err) => {
        console.log(err);
        //  return Promise.reject(`Ошибка: ${err.message}`);
      });
  }


  _handlers() {
    document.querySelector('.header__button_auth').addEventListener('click', this.open.bind(this));
    this.form.addEventListener('input', this._enterHandler.bind(this));
    this.form.addEventListener('submit', this._enter.bind(this));
  }
}