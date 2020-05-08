export default class Search {
  constructor(form, newsApi, newslist, api, operate, sevenDaysAgo, today) {
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

  // вспомогательные функции
  clearContainer() {
    document.querySelector('.results__container').textContent = '';
  }

  turnOnResults() {
    document.querySelector('.results').classList.add('results_on');
  }

  turnOffResults() {
    document.querySelector('.results').classList.remove('results_on');
  }

  turnOnWaiting() {
    document.querySelector('.waiting__loading').classList.add('waiting__loading_on');
  }

  turnOffWaiting() {
    document.querySelector('.waiting__loading').classList.remove('waiting__loading_on');
  }

  turnOnError() {
    document.querySelector('.waiting__error').classList.add('waiting__error_on');
  }

  turnOffError() {
    document.querySelector('.waiting__error').classList.remove('waiting__error_on');
  }

  // вывод карточек на экран
  show(evt) {
    evt.preventDefault();
    this.clearContainer();

    this.turnOffError();
    this.turnOnWaiting();

    this.api.getMyData()
      .then((data) => {
        this.newsApi.getNews(this.searchString.value, this.operate.getDate(this.today), this.operate.getDate(this.sevenDaysAgo))
          .then((res) => {

            this.turnOnResults();
            this.turnOffWaiting();

            if (this.searchString.value === '') {
              this.turnOnError();
              this.turnOffResults();
            } else {
              this.renderArr = this.newslist.render(res.articles, this.searchString.value, data.message);

              this.widthHandler();
              this.resultButtonHandler();

              if (res.articles.length === 0) {
                this.turnOnError();
                this.turnOffResults();
              }
            }
          })
          .catch(err => {
            this.turnOffResults();
            this.turnOnError();
            console.log(err);
          });
      })
      .catch(err => console.log(err));

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

  showAfterAuth(evt) {
    if (this.searchString.value !== '') {
      this.show(evt);
    }
  }


  handlers() {
    this.form.addEventListener('submit', this.show.bind(this));
    document.querySelector('.results__button').addEventListener('click', this.showMore.bind(this));
    document.querySelector('.popup__button_re-search').addEventListener('input', this.showAfterAuth.bind(this));



  }
}