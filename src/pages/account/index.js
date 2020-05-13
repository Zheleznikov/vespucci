import './account.css';
import { SERVER } from '../../js/constants/service';
import VespucciApi from '../../js/api/VespucciApi';
import Head from '../../js/components/Head';
import Exit from '../../js/components/Exit';
import News from '../../js/components/News';
import Newslist from '../../js/components/Newslist';
import Operate from '../../js/utils/Operate';
import SavedArt from '../../js/components/SavedArt';
import { MY_USUAL_HEADERS, MY_BEARER_HEADERS } from '../../js/constants/reqOptions';
import Auth from '../../js/components/Auth';


const auth = new Auth();
const vespucciApi = new VespucciApi(SERVER, MY_USUAL_HEADERS, MY_BEARER_HEADERS);
const head = new Head(document.querySelector('.header'));
const savedArt = new SavedArt(document.querySelector('.articles-info'));
head.setBlackTheme();
const operate = new Operate();

const insertNews = (newsData, _id) => {
  const news = new News(newsData, vespucciApi, auth, _id);
  news.createNewsCard();
  news.accountHandlers();
  return news;
};

const newslist = new Newslist(document.querySelector('.results__container'), insertNews, operate);
new Exit(vespucciApi, head, auth);

if (auth.isLogin()) {
  head.ifLogin(localStorage.getItem('name'));
  vespucciApi.getNews()
    .then((res) => {
      savedArt.setName(localStorage.getItem('name'), operate.pairValue(res.length));
      if (res.length === 0) {
        savedArt.turnKeywordsOff();
        savedArt.turnOffResults();
      } else {
        savedArt.turnOnResults();
        savedArt.setKeywords(operate.getKeywords(res));
        newslist.renderInAccount(res);
      }
    });
} else {
  window.location.pathname = '/';
}