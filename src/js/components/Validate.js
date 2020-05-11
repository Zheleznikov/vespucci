/* МЕТОДЫ ДЛЯ ВАЛИДАЦИИ

- проверка что за поле. метод checkFiled

- заблокирована ли кнопка - setButtonAttribute

- обработчик валидации - handler

*/

/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import ValidateConst from '../constants/ValidateConst';

export default class Validate extends ValidateConst {
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
      // может для пароля надо чтобы сообщения об ошибках были в реальном времени
      // tip.textContent = this.errMessagePassLength;
      input.onblur = () => tip.textContent = this.errMessagePassLength;
      input.onfocus = () => tip.textContent = '';
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

  // обработчик валидации
  handler(evt, email, emailErr, pass, passErr, button, handlerErr, name = document.querySelector('.popup__input_name'), nameErr = document.querySelector('.popup__input-err_name')) {
    this.emailFlag;
    this.passFlag;
    this.nameFlag = true;

    button.onblur = () => handlerErr.textContent = '';

    if (evt.target === email) {
      this.emailFlag = this._checkField(email.value, emailErr, email);
    } else if (evt.target === pass) {
      this.passFlag = this._checkField(pass.value, passErr, pass);
    } else if (evt.target === name) {
      this.nameFlag = this._checkField(name.value, nameErr, name);
    }

    if (this.emailFlag && this.passFlag && this.nameFlag) {
      this._setButtonAttribute(button, true);
    } else {
      this._setButtonAttribute(button, false);
    }
  }
}