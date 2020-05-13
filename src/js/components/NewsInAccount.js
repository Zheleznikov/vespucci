import News from './News';

export default class NewsInAccount extends News {
  constructor(newsData, vespucciApi, auth, _id, savedArt, operate) {
    super(newsData, vespucciApi, auth, _id);
    this.savedArt = savedArt;
    this.operate = operate;
    this.vespucciApi = vespucciApi;
  }

  remove() {
    this.vespucciApi.deleteNews(this._id)
      .then(() => {
        this.newsCard.parentElement.removeChild(this.newsCard);
        this.vespucciApi.getNews()
          .then((res) => {
            this.savedArt.setName(localStorage.getItem('name'), this.operate.pairValue(res.length));
            if (res.length === 0) {
              this.savedArt.turnOff();
            } else {
              this.savedArt.turnOnResults();
              this.savedArt.setKeywords(this.operate.getKeywords(res));
            }
          })
          .catch((err) => console.log(err));
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