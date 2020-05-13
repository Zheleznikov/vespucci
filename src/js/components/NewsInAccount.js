import News from './News';

export default class NewsInAccount extends News {
  constructor(newsData, vespucciApi, auth, _id, savedArt) {
    super(newsData, vespucciApi, auth, _id);
    this.savedArt = savedArt;
  }

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