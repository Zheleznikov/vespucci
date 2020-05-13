import News from './News';

export default class NewsInAccount extends News {
  constructor(newsData, vespucciApi, auth, _id, savedArt) {
    super(newsData, vespucciApi, auth, _id);
    this.savedArt = savedArt;
  }

  // _create(newsData) {
  //   super._create(newsData);
  //   const news = document.querySelector('.news-template').content.cloneNode(true);
  //   news.querySelector('.news__link').href = newsData.url;
  //   news.querySelector('.news__image').src = newsData.urlToImage;
  //   news.querySelector('.news__date').textContent = newsData.publishedAt;
  //   news.querySelector('.news__title').textContent = newsData.title;
  //   news.querySelector('.news__text').textContent = newsData.content;
  //   news.querySelector('.news__source').textContent = newsData.source.name;
  //   news.querySelector('.news__keyword-content').textContent = newsData.keyword;
  //   return news.querySelector('.news');
  // }

  remove() {
    this.vespucciApi.deleteNews(this._id)
      .then(() => {
        this.newsCard.parentElement.removeChild(this.newsCard);
      })
      .catch((err) => console.log(err));
  }

  createNewsCard() {
    super.createNewsCard();
  }

  accountHandlers() {
    this.newsCard.querySelector('.news__icon_delete').addEventListener('click', this.remove.bind(this));
  }
}