import ValidateConst from '../constants/ValidateConst';

export default class Validate extends ValidateConst {
  constructor() {
    super();
  }

  // проверяем поле
  checkField(value, tip, input) {
    if (value === '') {
      tip.textContent = this.errMessageNull;
      return false;
    } else if (input.classList.contains('popup__input_name') && (value.length === 1 || value.length > 30)) {
      tip.textContent = this.errMessageLength;
      return false;
    } else if (input.classList.contains('popup__input_email') && !this.emailReg.test(value)) {
      tip.textContent = this.errMessageEmail;
      return false;
    } else if (input.classList.contains('popup__input_pass') && value.length < 8) {
      tip.textContent = this.errMessagePassLength;
      return false;
    } else if (input.classList.contains('popup__input_pass') && !this.passwordReg.test(value)) {
      tip.textContent = this.errMessagePass;
      return false;
    } else {
      tip.textContent = '';
      return true;
    }
  }

  // убрать подсказку, если инпут сейчас в фокусе
  hideHint(value, err, type) {
    if (type === 'focus') {
      value.onfocus = () => err.textContent = '';
    } else if (type === 'blur') {
      value.onblur = () => err.textContent = '';
    }
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

    this.hideHint(email, emailErr, 'focus');
    this.hideHint(pass, passErr, 'focus');
    this.hideHint(name, nameErr, 'focus');
    this.hideHint(button, handlerErr, 'blur');
  }





}