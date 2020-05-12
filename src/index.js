import './style/index.css';
import { SERVER } from './js/constants/service';
import { REQUEST_OPTIONS, URL, MY_USUAL_HEADERS, MY_BEARER_HEADERS } from './js/constants/reqOptions';
import { SEVEN_DAYS_AGO, TODAY } from './js/constants/times';
import Api from './js/api/Api';
import NewsApi from './js/api/NewsApi';
import Head from './js/components/Head';
import Enter from './js/components/Enter';
import Reg from './js/components/Reg';
import Validate from './js/components/Validate';
import Popup from './js/components/Popup';
import News from './js/components/News';
import Newslist from './js/components/Newslist';
import Operate from './js/utils/Operate';
import Exit from './js/components/Exit';
import Search from './js/components/Search';
// import PopupConst from './js/constants/PopupConst';

// const popupConstEnter = new PopupConst('');

const token = localStorage.getItem('token');
console.log(token);
const newsApi = new NewsApi(REQUEST_OPTIONS, URL);
const operate = new Operate();
const api = new Api(SERVER, MY_USUAL_HEADERS, MY_BEARER_HEADERS);
const head = new Head(document.querySelector('.header'));
const validate = new Validate();

api.getMyData()
  .then((data) => {
    console.log(data);
    head.ifLogin(data.data.name);
  })
  .catch((err) => {
    console.log(err);
    head.ifUnauthorized();
  });

const insertNews = (url, urlToImage, publishedAt, description, content, source, _id, keyword) => {
  const news = new News(url, urlToImage, publishedAt, description, content, source, _id, keyword, api);
  news.createNewsCard();
  news.authHandler();
  return news;
};

const newslist = new Newslist(document.querySelector('.results__container'), insertNews, operate);
new Search(document.forms.search, newsApi, newslist, api, operate, SEVEN_DAYS_AGO, TODAY, validate);
new Popup(document.querySelector('.popup-success'));
new Enter(document.querySelector('.popup-enter'), validate, api, head);
new Reg(document.querySelector('.popup-reg'), validate, api);
new Exit(api, head);