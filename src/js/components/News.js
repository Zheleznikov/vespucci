export default class News {
  constructor(url, urlToImage, publishedAt, description, content, source, _id, api) {
    this._id = _id;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.description = description;
    this.content = content;
    this.source = source;
    this.api = api;
  }


  create(url, urlToImage, publishedAt, description, content, source, _id) {
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
    this.newsCard = this.create(this.url, this.urlToImage, this.publishedAt, this.description, this.content, this.source, this._id);
  }

  mark() {
    this.newsCard.querySelector('.news__icon').classList.toggle('news__icon_marked')
  }


  remove(_id) {
    this.newsCard.parentElement.removeChild(this.newsCard);
    this.api.deleteNews(this._id)
  }



  addNewsHandler() {
    if (this.newsCard.querySelector('.news__icon').classList.contains('news__icon_marked')) {
      this.api.deleteNews(this._id);
      this.mark();
    } else {
      this.mark();

      this.api.postNews('ключевое слово', this.description, this.content, this.publishedAt, this.source, this.url, this.urlToImage)
        .then((res) => this._id = res.data._id)
    }
  }

  accountHandlers() {
    this.newsCard.querySelector('.news__icon_delete').addEventListener('click', this.remove.bind(this))
  }

  handlers() {
    this.newsCard.querySelector('.news__icon').addEventListener('click', this.addNewsHandler.bind(this));
    // this.newsCard.querySelector('.news__icon').addEventListener('click', this.remove.bind(this));
  }



}