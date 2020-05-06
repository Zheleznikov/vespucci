export default class Newslist {
  constructor(container, insertNews, operate) {
    this.container = container;
    this.insertNews = insertNews;
    this.operate = operate;
  }

  appendNews(container, news) {
    container.appendChild(news);
  }

  render(arr) {
    arr.forEach(news => {

      this.publishedAt = this.operate.turnDate(news.publishedAt);
      this.description = this.operate.trimString(news.description, 46);
      this.content = this.operate.trimString(news.content, 200);

      const card = this.insertNews(news.url, news.urlToImage, this.publishedAt, this.description, this.content, news.source.name);
      this.appendNews(this.container, card.newsCard)
    })

  }

}