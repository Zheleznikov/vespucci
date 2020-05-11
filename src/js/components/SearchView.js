export default class SearchView {
  constructor() {
    this.newsContainer = document.querySelector('.results__container');
    this.resultBlock = document.querySelector('.results');
    this.loadingView = document.querySelector('.waiting__loading');
    this.errorView = document.querySelector('.waiting__error');
    this.resultButton = document.querySelector('.results__button');
  }

  clearContainer() {
    this.newsContainer.textContent = '';
  }

  turnOnResults() {
    this.resultBlock.classList.add('results_on');
  }

  turnOffResults() {
    this.resultBlock.classList.remove('results_on');
  }

  turnOnWaiting() {
    this.loadingView.classList.add('waiting__loading_on');
  }

  turnOffWaiting() {
    this.loadingView.classList.remove('waiting__loading_on');
  }

  turnOnError() {
    this.errorView.classList.add('waiting__error_on');
  }

  turnOffError() {
    this.errorView.classList.remove('waiting__error_on');
  }

  runPreloader() {
    this.turnOffError();
    this.turnOnWaiting();
  }

  getResults() {
    this.turnOnResults();
    this.turnOffWaiting();
  }

  getError() {
    this.turnOnError();
    this.turnOffResults();
  }
}