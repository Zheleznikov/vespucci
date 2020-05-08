export default class Exit {
  constructor(api, head) {
    this.api = api;
    this.head = head;
    this.handler();
  }

  exit() {
    this.api.logout()
      .then(() => {
        this.head.ifUnauthorized();
        location = "./index.html";
      })
      .catch(err => console.log(err));
  }

  handler() {
    document.querySelector('.header__button_in').addEventListener('click', this.exit.bind(this));
  }
}