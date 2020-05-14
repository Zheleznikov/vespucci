import News from './News';

export default class NewsInAccount extends News {
  constructor(newsData, vespucciApi, auth, _id, savedArt, operate) {
    super(newsData, vespucciApi, auth, _id);
    this.savedArt = savedArt;
    this.operate = operate;
    this.vespucciApi = vespucciApi;
  }

  // удаляем карточку со страницы, в случае успеха обновляется информация вверху страницы
  remove() {
    this.vespucciApi.deleteNews(this._id)
      .then((res) => {
        this.removeChild();
        const currentNumOfSavedNews = (localStorage.getItem('numOfArt') - 1);
        this.savedArt.setName(localStorage.getItem('name'), this.operate.pairValue(localStorage.getItem('numOfArt') - 1));
        localStorage.setItem('numOfArt', currentNumOfSavedNews);
        const arrayOfKeywords = this.operate.deleteElementFromArray(localStorage.getItem('keywords'), res.data.keyword);
        localStorage.setItem('keywords', arrayOfKeywords);
        this.savedArt.setKeywords(this.operate.getArrayOfUniqueKeyWords(arrayOfKeywords));
        if (arrayOfKeywords.length === 0) {
          this.savedArt.turnOff();
        }
      })
      .catch((err) => console.log(err));
  }

  removeChild() {
    this.newsCard.parentElement.removeChild(this.newsCard);
  }


  accountHandlers() {
    this.newsCard.querySelector('.news__icon_delete').addEventListener('click', this.remove.bind(this));
  }
}