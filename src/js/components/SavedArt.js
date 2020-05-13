/* eslint-disable class-methods-use-this */
export default class SavedArt {
  constructor(element) {
    this.element = element;
    this.info = this.element.querySelector('.articles-info__main');
    this.keyWords = this.element.querySelector('.articles-info__words');
    this.keyWordsSection = this.element.querySelector('.articles-info__key');
    this.resultsBlock = document.querySelector('.results');
  }

  setName(name, bid) {
    this.info.textContent = `${name}, ${bid}`;
  }

  setKeywords(keys) {
    this.keyWords.textContent = keys;
  }

  turnKeywordsOff() {
    this.keyWordsSection.classList.add('articles-info__key_off');
  }

  turnOnResults() {
    this.resultsBlock.classList.add('results_on');
  }

  turnOffResults() {
    this.resultsBlock.classList.remove('results_on');
  }

  turnOff() {
    this.turnOffResults();
    this.turnKeywordsOff();
  }
}