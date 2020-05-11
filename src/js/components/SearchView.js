/* Метод для оформелния внешнего вида страницы при поиске
разные вспомогательные методы
*/

export default class SearchView {
  constructor() {
    this.newsContainer = document.querySelector('.results__container');
    this.resultBlock = document.querySelector('.results');
    this.loadingView = document.querySelector('.waiting__loading');
    this.errorView = document.querySelector('.waiting__error');
    this.resultButton = document.querySelector('.results__button');
    this.errMessage = document.querySelector('.waiting__text_err');
  }

  clearContainer() {
    this.newsContainer.textContent = '';
  }

  _turnOnResults() {
    this.resultBlock.classList.add('results_on');
  }

  _turnOffResults() {
    this.resultBlock.classList.remove('results_on');
  }

  _turnOnWaiting() {
    this.loadingView.classList.add('waiting__loading_on');
  }

  _turnOffWaiting() {
    this.loadingView.classList.remove('waiting__loading_on');
  }

  _turnOnError() {
    this.errorView.classList.add('waiting__error_on');
  }

  _turnOffError() {
    this.errorView.classList.remove('waiting__error_on');
  }

  runPreloader() {
    this._turnOffError();
    this._turnOnWaiting();
  }

  getResults() {
    this._turnOnResults();
    this._turnOffWaiting();
  }

  _getError() {
    this._turnOnError();
    this._turnOffResults();
  }

  getErrEmptyField() {
    this._getError();
    this.errMessage.textContent = 'Вы ввели пустую строку';
  }

  getErrMotFound() {
    this._getError();
    this.errMessage.textContent = 'К сожалению, по вашему запросу ничего не найдено';
  }

  getErrServer() {
    this._getError();
    this.errMessage.textContent = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
  }
}