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


  create(url, urlToImage, publishedAt, description, content, source, _id, keyword, message) {
    const news = document.querySelector('.news-template').content.cloneNode(true);
    news.querySelector('.news__link').href = url;
    news.querySelector('.news__image').src = urlToImage;
    news.querySelector('.news__date').textContent = publishedAt;
    news.querySelector('.news__title').textContent = description;
    news.querySelector('.news__text').textContent = content;
    news.querySelector('.news__source').textContent = source;
    return news.querySelector('.news');
  }

  createNewsCard() {
    this.newsCard = this.create(this.url, this.urlToImage, this.publishedAt, this.description, this.content, this.source, this._id, this.keyword, this.message);
  }

  mark() {
    this.newsCard.querySelector('.news__icon').classList.toggle('news__icon_marked')
  }


  remove(_id) {
    this.api.deleteNews(this._id);
    this.newsCard.parentElement.removeChild(this.newsCard);
  }

  clickIconHandler() {
    if (this.newsCard.querySelector('.news__icon').classList.contains('news__icon_marked')) {
      this.api.deleteNews(this._id);
      this.mark();
    } else {
      this.mark();
      this.api.postNews(this.keyword, this.description, this.content, this.publishedAt, this.source, this.url, this.urlToImage)
        .then((res) => this._id = res.data._id)
        .catch(err => console.log(err))
    }
  }

  showTip() {
    this.newsCard.querySelector('.news__tip').classList.add('news__tip_on')
  }

  hideTip() {
    this.newsCard.querySelector('.news__tip').classList.remove('news__tip_on', true)
  }

  tipHandler() {
    this.newsCard.querySelector('.news__icon').addEventListener('mouseover', this.showTip.bind(this));
    this.newsCard.querySelector('.news__icon').addEventListener('mouseout', this.hideTip.bind(this));
  }

  authHandler() {
    if (this.message === 'Congratulate') {
      this.handlers();
    } else {
      this.tipHandler();
    }
  }

  handlers() {
    this.newsCard.querySelector('.news__icon').addEventListener('click', this.clickIconHandler.bind(this));
  }

  handlers2() {
    this.newsCard.querySelector('.news__icon').addEventListener('mouseover', this.authHandler.bind(this));
  }


  // для другой страницы
  accountHandlers() {
    this.newsCard.querySelector('.news__icon_delete').addEventListener('click', this.remove.bind(this))
  }



}