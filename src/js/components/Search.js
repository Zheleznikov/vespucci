/* eslint-disable class-methods-use-this */
import SearchView from './SearchView';

export default class Search extends SearchView {
  constructor(form, newsApi, newslist, operate, dates, validate) {
    super();
    this.dates = dates;
    this.validate = validate;
    this.operate = operate;
    this.form = form;
    this.searchString = this.form.elements.searchString;
    this.button = this.form.elements.button;
    this.newslist = newslist;
    this.newsApi = newsApi;

    this.resultsButton = document.querySelector('.results__button');
    this._handlers();
  }

  // вывод карточек на экран
  _show(evt) {
    evt.preventDefault();
    this.clearContainer();
    this.runPreloader();
    this.disableSearchFields();
    this.newsApi.getNews(this.searchString.value, this.operate.getDate(this.dates.today), this.operate.getDate(this.dates.sevenDaysAgo))
      .then((res) => {
        this.enableSearchFields();
        this.getResults();
        this.renderArr = this.newslist.render(res.articles, this.searchString.value);
        this._widthHandler();
        this._resultButtonHandler();
        if (res.articles.length === 0) {
          this.getErrMotFound();
        }
      })
      .catch((err) => {
        this.enableSearchFields();
        this.stopPreloader();
        this.getErrServer();
        console.log(err);
      })
      .finally(() => this.stopPreloader());
  }

  // вывести еще карточек
  _showMore() {
    this._widthHandler();
    this._resultButtonHandler();
  }


  // обработчик, который в зависимости от ширины экрана выводит разное количество карточек
  _widthHandler() {
    if (window.innerWidth > 1230) {
      this.newslist.append(this.renderArr, 3);
    }
    if (window.innerWidth < 1231 && window.innerWidth > 840) {
      this.newslist.append(this.renderArr, 4);
    }

    if (window.innerWidth < 841 && window.innerWidth > 683) {
      this.newslist.append(this.renderArr, 3);
    }

    if (window.innerWidth < 684) {
      this.newslist.append(this.renderArr, 2);
    }
  }

  // обработчик кнопки "показать еще"
  _resultButtonHandler() {
    if (this.renderArr.length === 0) {
      this.resultsButton.classList.add('results__button_off');
    } else {
      this.resultsButton.classList.remove('results__button_off');
    }
  }


  // обработчик кнопки поиска новостей
  _searchStringHandler() {
    this.validate.searchStringHandler(this.searchString, this.button);
  }

  _handlers() {
    this.form.addEventListener('submit', this._show.bind(this));
    this.form.addEventListener('input', this._searchStringHandler.bind(this));
    this.resultButton.addEventListener('click', this._showMore.bind(this));
  }
}