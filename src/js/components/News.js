/* eslint-disable class-methods-use-this */
export default class News {
  constructor(url, urlToImage, publishedAt, description, content, source, _id, keyword, message, api) {
    this._id = _id;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.description = description;
    this.content = content;
    this.source = source;
    this.keyword = keyword;
    this.message = message;
    this.api = api;
  }

  // создать карточку
  _create(url, urlToImage, publishedAt, description, content, source, _id, keyword) {
    const news = document.querySelector('.news-template').content.cloneNode(true);
    news.querySelector('.news__link').href = url;
    news.querySelector('.news__image').src = urlToImage;
    news.querySelector('.news__date').textContent = publishedAt;
    news.querySelector('.news__title').textContent = description;
    news.querySelector('.news__text').textContent = content;
    news.querySelector('.news__source').textContent = source;
    if (window.location.pathname === '/account.html') {
      news.querySelector('.news__keyword-content').textContent = keyword;
    }
    return news.querySelector('.news');
  }

  // запустить процесс создания карточки
  createNewsCard() {
    this.newsCard = this._create(this.url, this.urlToImage, this.publishedAt, this.description, this.content, this.source, this._id, this.keyword, this.message);
  }

  // поставить флажок новости
  _mark() {
    this.newsCard.querySelector('.news__icon').classList.toggle('news__icon_marked');
  }

  // удлаить карточку из личного кабинета
  remove() {
    this.api.deleteNews(this._id);
    this.newsCard.classList.add('news__deleted');
  }

  // обработчик клика по флажку
  clickIconHandler() {
    if (this.newsCard.querySelector('.news__icon').classList.contains('news__icon_marked')) {
      this.api.deleteNews(this._id);
      this._mark();
    } else {
      this._mark();
      this.api.postNews(this.keyword, this.description, this.content, this.publishedAt, this.source, this.url, this.urlToImage)
        // eslint-disable-next-line no-return-assign
        .then((res) => this._id = res.data._id)
        .catch((err) => console.log(err));
    }
  }

  // показать подсказку
  _showTip() {
    this.newsCard.querySelector('.news__tip').classList.add('news__tip_on');
  }

  // скрыть подсказку
  _hideTip() {
    this.newsCard.querySelector('.news__tip').classList.remove('news__tip_on', true);
  }

  // обработчик подсказок
  _tipHandler() {
    this.newsCard.querySelector('.news__icon').addEventListener('mouseover', this._showTip.bind(this));
    this.newsCard.querySelector('.news__tip-content').addEventListener('mouseout', this._hideTip.bind(this));
    this.newsCard.querySelector('.news__tip').addEventListener('click', this._openEnter.bind(this));
  }

  // обработчик смотрит ли карточку зарегистрированный пользователь
  authHandler() {
    if (this.message === 'Congratulate') {
      this.handlers();
    } else {
      this._tipHandler();
    }
  }

  // открыть попап если нажать на иконку
  _openEnter() {
    document.querySelector('.popup-enter').classList.add('popup_is-opened');
  }

  handlers() {
    this.newsCard.querySelector('.news__icon').addEventListener('click', this.clickIconHandler.bind(this));
  }

  // для account.html
  accountHandlers() {
    this.newsCard.querySelector('.news__icon_delete').addEventListener('click', this.remove.bind(this));
  }
}