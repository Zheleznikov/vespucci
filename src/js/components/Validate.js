
/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import ValidateConst from '../constants/ValidateConst';

export default class Validate extends ValidateConst {
  // проверяем поле
  checkField(value, tip, input) {
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
  setButtonAttribute(button, valid) {
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
      this.emailFlag = this.checkField(email.value, emailErr, email);
    } else if (evt.target === pass) {
      this.passFlag = this.checkField(pass.value, passErr, pass);
    } else if (evt.target === name) {
      this.nameFlag = this.checkField(name.value, nameErr, name);
    }

    if (this.emailFlag && this.passFlag && this.nameFlag) {
      this.setButtonAttribute(button, true);
    } else {
      this.setButtonAttribute(button, false);
    }
  }
}