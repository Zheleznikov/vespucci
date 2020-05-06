export default class News {
  constructor(url, urlToImage, publishedAt, description, content, source ) {
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.description = description;
    this.content = content;
    this.source = source;
  }


  create(url, urlToImage, publishedAt, description, content, source) {
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
    this.newsCard = this.create(this.url, this.urlToImage, this.publishedAt, this.description, this.content, this.source);
  }

}