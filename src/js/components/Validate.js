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
  setButtonAttribute(button, valid) {
    if (valid) {
      button.removeAttribute('disabled', true);
    } else {
      button.setAttribute('disabled', true);
    }
  }

  // обработчик валидации
  handler(evt, data, emailFlag, passFlag, nameFlag = true) {
    data.button.onblur = () => data.handlerErr.textContent = '';
    // this.emailFlag = false;
    // this.passFlag = false;

    // if (evt.target === data.email) {
    emailFlag = this._checkField(data.email.value, data.emailErr, data.email);
    // }
    // if (evt.target === data.pass) {
    passFlag = this._checkField(data.pass.value, data.passErr, data.pass);
    // }
    // if (evt.target === data.name) {
    if (data.name) {
      nameFlag = this._checkField(data.name.value, data.nameErr, data.name);
    }
    // }
    console.log(emailFlag, '- флаг email', passFlag, '- флаг пароля');
    // console.log(this.passFlag, '- флаг пароля');

    if (emailFlag && passFlag && nameFlag) {
      this.setButtonAttribute(data.button, true);
    } else {
      this.setButtonAttribute(data.button, false);
    }
  }
}