/* eslint-disable no-param-reassign */
/* ОБРАБОТКА МАССИВА С НОВОСТЯМИ

- рендерим карточки с сервера - render

- выводим карточки по 3(или по сколько надо) append

- рендерим в личный кабинет renderInAccount

- добавляем карточку в контейнер
*/

export default class Newslist {
  constructor(container, insertNews, operate) {
    this.container = container;
    this.insertNews = insertNews;
    this.operate = operate;
  }

  // добавляем в контейнер
  // eslint-disable-next-line class-methods-use-this
  _appendNews(container, news) {
    container.appendChild(news);
  }

  // рендерим новости с newsApi
  render(data, keyword) {
    return data.map((news) => {
      news.publishedAt = this.operate.turnDate(news.publishedAt);
      news.title = this.operate.trimString(news.title, 46);
      news.content = this.operate.trimString(news.content, 200);
      news.keyword = keyword;

      const card = this.insertNews(news, '_id');
      return card;
    });
  }

  // отрисовываем новости с сервера по столько штук столько надо
  append(data, numOfLetters) {
    data.splice(0, numOfLetters).forEach((news) => {
      this._appendNews(this.container, news.newsCard);
    });
  }

  // рендерим новости с нашего сервера в личный кабинет
  renderInAccount(data) {
    data.reverse().forEach((news) => {
      news.publishedAt = news.date;
      news.urlToImage = news.image;
      news.content = news.text;
      news.url = news.link;
      const card = this.insertNews(news, news._id);
      this._appendNews(this.container, card.newsCard);
    });
  }
}