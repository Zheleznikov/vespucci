// переменные для валидации
export default class ValidateConst {
  constructor() {
    this.errMessageNull = 'Это поле должно быть заполнено';
    this.errMessageLength = 'Должно быть от 2 до 30 символов';
    this.errMessageEmail = 'Это не email';
    this.errMessagePass = 'Пароль должен содержать латинские символы и цифры';
    this.errMessagePassLength = 'Пароль должен быть не менее 8 символов';
    this.passwordReg = /\w+/;
    this.emailReg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
  }
}