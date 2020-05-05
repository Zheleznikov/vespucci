import ValidateConst from '../constants/ValidateConst';

export default class Validate extends ValidateConst {
  constructor() {
    super();
  }

  checkName(value, tip) {
    if (value.length === 0) {
      tip.textContent = this.errMessageNull;
      return false;
    } else if (value.length === 1 || value.length > 30) {
      tip.textContent = this.errMessageLength;
      return false;
    } else {
      tip.textContent = '';
      return true;
    }
  }

  checkEmail(value, tip) {
    if (value === '') {
      tip.textContent = this.errMessageNull;
      return false;
    } else if (!this.emailReg.test(value)) {
      tip.textContent = this.errMessageEmail;
      return false;
    } else {
      tip.textContent = '';
      return true;
    }
  }

  checkPass(value, tip) {
    if (value === '') {
      tip.textContent = this.errMessageNull;
      return false;
    } else if (value.length < 8) {
      tip.textContent = this.errMessagePassLength;
      return false;
    } else if (!this.passwordReg.test(value)) {
      tip.textContent = this.errMessagePass;
      return false;
    } else {
      tip.textContent = '';
      return true;
    }
  }

  checkWhatToCheck(value, tip, inputType) {
    if (inputType === 'name') {
      return this.checkName(value, tip);
    }
    if (inputType === 'email') {
      return this.checkEmail(value, tip);
    }
    if (inputType === 'password') {
      return this.checkPass(value, tip)
    }
  }

  setButtonAttribute(button, valid) {
    if (valid) {
      button.removeAttribute('disabled', true);
    } else {
      button.setAttribute('disabled', true);
    }
  }



}