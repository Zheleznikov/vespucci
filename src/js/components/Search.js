export default class Search {
  constructor(form, newsApi, newslist) {
    this.form = form;
    this.newslist = newslist;
    this.newsApi = newsApi;
    this.searchString = form.elements.searchString;
    this.button = this.form.elements.button;
    this.count = 0;
    this.handlers();

  }

  clearContainer() {
    document.querySelector('.results__container').textContent = '';
  }

  turnOnResults() {
    document.querySelector('.results').classList.add('results_on');
  }

  turnOffResults() {
    document.querySelector('.results').classList.remove('results_on', true);
  }

  show(evt) {
    evt.preventDefault();
    this.clearContainer();
    document.querySelector('.waiting__error').classList.remove('waiting__error_on');
    document.querySelector('.waiting__loading').classList.add('waiting__loading_on');
    this.newsApi.getNews(this.searchString.value)
      .then((res) => {
        this.turnOnResults();
        document.querySelector('.waiting__loading').classList.remove('waiting__loading_on', true);
        this.newslist.render(res.articles, 0);
        if (res.articles.length === 0) {
          document.querySelector('.waiting__error').classList.add('waiting__error_on');
        }
      })
      .catch(err => {
        this.turnOffResults();
        console.log(err);
      });
  }

  showMore() {
    this.count += 3;
    this.newsApi.getNews(this.searchString.value)
      .then((res) => this.newslist.render(res.articles, this.count))
      .catch(err => console.log(err));
  }


  handlers() {
    this.button.addEventListener('click', this.show.bind(this));
    document.querySelector('.results__button').addEventListener('click', this.showMore.bind(this));

  }
}