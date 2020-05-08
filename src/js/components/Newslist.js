export default class Newslist {
  constructor(container, insertNews, operate) {
    this.container = container;
    this.insertNews = insertNews;
    this.operate = operate;
  }


  // отрисовать карточку
  appendNews(container, news) {
    container.appendChild(news);
  }




  // рендерим новости с newsApi
  render(arr, keyword, message) {
    return arr.map(news => {
      console.log(news);
      this.publishedAt = this.operate.turnDate(news.publishedAt);
      this.title = this.operate.trimString(news.title, 46);
      this.content = this.operate.trimString(news.content, 200);

      const card = this.insertNews(news.url, news.urlToImage, this.publishedAt, this.title, this.content, news.source.name, '_id', keyword, message);
      return card;
    })
  }

  // отрисовываем новости с сервера по 3 шт
  append(arr) {
    arr.splice(0, 3).forEach(news => {
      this.appendNews(this.container, news.newsCard);
    });
  }

  // рендерим новости с нашего сервера в личный кабинет
  renderInAccount(arr) {
    arr.forEach(news => {
      const card = this.insertNews(news.link, news.image, news.date, news.title, news.text, news.source, news._id, news.keyword, news.message);
      this.appendNews(this.container, card.newsCard)
    })
  }

}