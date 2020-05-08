export default class SavedArt {
  constructor(element) {
    this.element = element;
  }

  setName(name, bid) {
    this.element.querySelector('.articles-info__main').textContent = `${name}, ${bid}`;
  }

  setKeywords(keys) {
    this.element.querySelector('.articles-info__words').textContent = keys;
  }

  turnKeywordsOff() {
   this.element.querySelector('.articles-info__key').classList.add('articles-info__key_off');
    console.log(this.element.querySelector('.articles-info__key'))
  }

}