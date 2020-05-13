import './account.css';
import { SERVER } from '../../js/constants/service';
import VespucciApi from '../../js/api/VespucciApi';
import Head from '../../js/components/Head';
import Exit from '../../js/components/Exit';
// import News from '../../js/components/News';
// import NewsInAccount from  '../../js/components/NewsInAccount';
import Newslist from '../../js/components/Newslist';
import Operate from '../../js/utils/Operate';
import SavedArt from '../../js/components/SavedArt';
import { MY_USUAL_HEADERS, MY_BEARER_HEADERS } from '../../js/constants/reqOptions';
import Auth from '../../js/components/Auth';
import NewsInAccount from '../../js/components/NewsInAccount';


const auth = new Auth();
const vespucciApi = new VespucciApi(SERVER, MY_USUAL_HEADERS, MY_BEARER_HEADERS);
const head = new Head(document.querySelector('.header'));
const savedArt = new SavedArt(document.querySelector('.articles-info'));
head.setBlackTheme();
const operate = new Operate();

const insertNews = (newsData, _id) => {
  const newsInAccount = new NewsInAccount(newsData, vespucciApi, auth, _id, savedArt, operate);
  newsInAccount.createNewsCard();
  newsInAccount.accountHandlers();
  return newsInAccount;
};

const newslist = new Newslist(document.querySelector('.results__container'), insertNews, operate);
new Exit(vespucciApi, head, auth);

if (auth.isLogin()) {
  head.setLogin(localStorage.getItem('name'));
  vespucciApi.getNews()
    .then((res) => {
      localStorage.setItem('numOfArt', res.length);
      savedArt.setName(localStorage.getItem('name'), operate.pairValue(res.length));
      if (res.length === 0) {
        savedArt.turnOff();
      } else {
        savedArt.turnOnResults();
        savedArt.setKeywords(operate.getKeywords(res));
        newslist.renderInAccount(res);
      }
    })
    .catch((err) => console.log(err));
} else {
  window.location.pathname = '/';
}