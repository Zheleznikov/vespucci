/* eslint-disable class-methods-use-this */
import SearchView from './SearchView';

export default class Search extends SearchView {
  constructor(form, newsApi, newslist, api, operate, sevenDaysAgo, today) {
    super();
    this.operate = operate;
    this.form = form;
    this.newslist = newslist;
    this.newsApi = newsApi;
    this.api = api;
    this.sevenDaysAgo = sevenDaysAgo;
    this.today = today;
    this.searchString = form.elements.searchString;
    this.button = this.form.elements.button;
    this.handlers();
  }

  // вывод карточек на экран
  show(evt) {
    evt.preventDefault();
    this.clearContainer();
    this.runPreloader();
    this.api.getMyData()
      .then((data) => {
        this.newsApi.getNews(this.searchString.value, this.operate.getDate(this.today), this.operate.getDate(this.sevenDaysAgo))
          .then((res) => {
            this.getResults();
            if (this.searchString.value === '') {
              // здесь должно быть кое-какое сообщение типа это пустая строка
              this.getError();
            } else {
              this.renderArr = this.newslist.render(res.articles, this.searchString.value, data.message);
              this.widthHandler();
              this.resultButtonHandler();
              if (res.articles.length === 0) {
                this.getError();
                // здесь должно быть кое-какое сообщение типа ничего не найдено
              }
            }
          })
          .catch((err) => {
            this.getError();
            // здесь должно быть сообщение типа на сервере что-то не так, повторите позже
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  }

  // вывести еще карточек
  showMore() {
    this.widthHandler();
    this.resultButtonHandler();
  }


  // обработчик, который в зависимости от ширины экрана выводит разное количество карточек
  widthHandler() {
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
  resultButtonHandler() {
    if (this.renderArr.length === 0) {
      document.querySelector('.results__button').classList.add('results__button_off');
    } else {
      document.querySelector('.results__button').classList.remove('results__button_off');
    }
  }

  handlers() {
    this.form.addEventListener('submit', this.show.bind(this));
    this.resultButton.addEventListener('click', this.showMore.bind(this));
  }
}