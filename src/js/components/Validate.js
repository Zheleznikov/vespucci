/* МЕТОДЫ ДЛЯ ВАЛИДАЦИИ

- проверка что за поле. метод checkFiled

- заблокирована ли кнопка - setButtonAttribute

- обработчик валидации - handler

*/

/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
// import ValidateConst from '../constants/ValidateConst';

export default class Validate {
  constructor() {
    this.errMessageNull = 'Это поле должно быть заполнено';
    this.errMessageLength = 'Должно быть от 2 до 30 символов';
    this.errMessageEmail = 'Это не email';
    this.errMessagePass = 'Пароль должен содержать латинские символы и цифры';
    this.errMessagePassLength = 'Пароль должен быть не менее 8 символов';
    this.passwordReg = /\w+/;
    this.emailReg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    this.emailFlag = false;
    this.passFlag = false;
  }

  // проверяем поле
  _checkField(value, tip, input) {
    if (value === '') {
      input.onblur = () => tip.textContent = this.errMessageNull;
      input.onfocus = () => tip.textContent = '';
      return false;
    }

    if (input.classList.contains('popup__input_name') && (value.length === 1 || value.length > 30)) {
      input.onblur = () => tip.textContent = this.errMessageLength;
      input.onfocus = () => tip.textContent = '';
      return false;
    }

    if (input.classList.contains('popup__input_email') && !this.emailReg.test(value)) {
      input.onblur = () => tip.textContent = this.errMessageEmail;
      input.onfocus = () => tip.textContent = '';
      return false;
    }

    if (input.classList.contains('popup__input_pass') && value.length < 8 && value.length !== 0) {
      // пока не знаю, как сделать так как нужно
      tip.textContent = this.errMessagePassLength;
      // input.onblur = () => tip.textContent = this.errMessagePassLength;
      // input.onfocus = () => tip.textContent = '';
      return false;
    }

    if (input.classList.contains('popup__input_pass') && !this.passwordReg.test(value)) {
      tip.textContent = this.errMessagePass;
      return false;
    }

    input.onblur = () => tip.textContent = '';
    tip.textContent = '';
    return true;
  }

  // работа с кнопкой
  _setButtonAttribute(button, valid) {
    if (valid) {
      button.removeAttribute('disabled', true);
    } else {
      button.setAttribute('disabled', true);
    }
  }

  searchStringHandler(field, button) {
    const flag = (field.value.length !== 0);
    this._setButtonAttribute(button, flag);
  }

  // обработчик валидации
  handler(data, handlerErr, button) {
    button.onblur = () => handlerErr.textContent = '';
    const flags = data.map((field) => this._checkField(field.input.value, field.error, field.input));
    if (flags.every((flag) => flag)) {
      this._setButtonAttribute(button, true);
    } else {
      this._setButtonAttribute(button, false);
    }
  }
}