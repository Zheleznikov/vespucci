import './style/index.css';
import { SERVER } from './js/constants/service';
import { REQUEST_OPTIONS, URL, MY_USUAL_HEADERS, MY_BEARER_HEADERS } from './js/constants/reqOptions';
import DATES from './js/constants/dates';
import VespucciApi from './js/api/VespucciApi';
import NewsApi from './js/api/NewsApi';
import Head from './js/components/Head';
import PopupEnter from './js/components/PopupEnter';
import PopupReg from './js/components/PopupReg';
import Validate from './js/components/Validate';
import Popup from './js/components/Popup';
import News from './js/components/News';
import Newslist from './js/components/Newslist';
import Operate from './js/utils/Operate';
import Exit from './js/components/Exit';
import Search from './js/components/Search';
import Auth from './js/components/Auth';


const auth = new Auth();
const newsApi = new NewsApi(REQUEST_OPTIONS, URL);
const operate = new Operate();
const vespucciApi = new VespucciApi(SERVER, MY_USUAL_HEADERS, MY_BEARER_HEADERS);
const head = new Head(document.querySelector('.header'));
const validate = new Validate();

if (auth.isLogin()) {
  head.ifLogin(localStorage.getItem('name'));
} else {
  head.ifUnauthorized();
}

const insertNews = (newsData, _id) => {
  const news = new News(newsData, vespucciApi, auth, _id);
  news.createNewsCard();
  news.authHandler();
  // news.handler();
  return news;
};

const newslist = new Newslist(document.querySelector('.results__container'), insertNews, operate);
new Search(document.forms.search, newsApi, newslist, operate, DATES, validate);
const successPopup = new Popup(document.querySelector('.popup-success'));
successPopup.closeSuccessPopupHandler();
new PopupEnter(document.querySelector('.popup-enter'), validate, vespucciApi, head, auth);
new PopupReg(document.querySelector('.popup-reg'), validate, vespucciApi);
new Exit(vespucciApi, head, auth);