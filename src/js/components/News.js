/* eslint-disable class-methods-use-this */

/* КЛАСС СОЗДАНИЯ НОВОСТИ */
export default class News {
  constructor(newsData, vespucciApi, auth, _id, eventGenerate) {
    this._id = _id;
    this.newsData = newsData;
    this.auth = auth;
    this.vespucciApi = vespucciApi;
    this.eventGenerate = eventGenerate;
  }

  // создать карточку
  _create(newsData) {
    const news = document.querySelector('.news-template').content.cloneNode(true);
    news.querySelector('.news__link').href = newsData.url;
    news.querySelector('.news__image').src = newsData.urlToImage;
    news.querySelector('.news__date').textContent = newsData.publishedAt;
    news.querySelector('.news__title').textContent = newsData.title;
    news.querySelector('.news__text').textContent = newsData.content;
    news.querySelector('.news__source').textContent = newsData.source.name;
    if (window.location.pathname === '/account.html') {
      news.querySelector('.news__keyword-content').textContent = newsData.keyword;
    }
    return news.querySelector('.news');
  }

  // запустить процесс создания карточки
  createNewsCard() {
    this.newsCard = this._create(this.newsData);
  }

  // поставить флажок новости
  _mark() {
    this.newsCard.querySelector('.news__icon').classList.toggle('news__icon_marked');
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

  _addingHandler() {
    this.newsCard.querySelector('.news__icon').addEventListener('click', this.clickIconHandler.bind(this));
    this.newsCard.querySelector('.news__icon').removeEventListener('mouseover', this._showTip.bind(this));
    this.newsCard.querySelector('.news__tip-content').removeEventListener('mouseout', this._hideTip.bind(this));
  }


  // обработчик смотрит ли карточку зарегистрированный пользователь
  authHandler() {
    if (this.auth.isLogin()) {
      // this.eventGenerate.authEventGenerate();
      this._addingHandler();
    } else {
      // this.eventGenerate.noAuthEventGenerate();
      this._tipHandler();
    }
  }

  // обработчик клика по флажку
  clickIconHandler() {
    if (this.newsCard.querySelector('.news__icon').classList.contains('news__icon_marked')) {
      this.vespucciApi.deleteNews(this._id)
        .then(() => this._mark())
        .catch((err) => console.log(err));
    } else {
      this.vespucciApi.postNews(this.newsData)
        .then((res) => {
          this._mark();
          this._id = res.data._id;
        })
        .catch((err) => console.log(err));
    }
  }

  // открыть попап входа если нажать на иконку
  _openEnter() {
    document.querySelector('.popup-enter').classList.add('popup_is-opened');
  }


  _authListener() {
    document.addEventListener('is-auth', (e) => {
      console.log('this is suthlistener', e.detail);
      if (e.detail === 'no-auth') {
        this._tipHandler();
      } else if (e.detail === 'auth-was-made') {
        this._addingHandler();
      }

    });

  }
}