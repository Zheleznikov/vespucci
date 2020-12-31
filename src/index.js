import "./style/index.css";
import { SERVER } from "./js/constants/service";
import { URL, MY_USUAL_HEADERS, API_KEY } from "./js/constants/reqOptions";
import {
  HEADER,
  POPUP_REG,
  POPUP_ENTER,
  POPUP_SUCCESS,
  RESULTS_CONTAINER,
} from "./js/constants/domConst";
import DATES from "./js/constants/dates";
import VespucciApi from "./js/api/VespucciApi";
import NewsApi from "./js/api/NewsApi";
import Head from "./js/components/Head";
import PopupEnter from "./js/components/PopupEnter";
import PopupReg from "./js/components/PopupReg";
import Validate from "./js/components/Validate";
import Popup from "./js/components/Popup";
import News from "./js/components/News";
import Newslist from "./js/components/Newslist";
import Operate from "./js/utils/Operate";
import Exit from "./js/components/Exit";
import Search from "./js/components/Search";
import Auth from "./js/components/Auth";
import EventGenerate from "./js/components/EventGenerate";

const eventGenerate = new EventGenerate();
const auth = new Auth(eventGenerate);
const newsApi = new NewsApi(URL, API_KEY, MY_USUAL_HEADERS);
const operate = new Operate();
const vespucciApi = new VespucciApi(SERVER, MY_USUAL_HEADERS);
const head = new Head(HEADER);
const validate = new Validate();



const isLogin = () => {
  if (auth.isLogin()) {
    head.setLogin(localStorage.getItem("name"));
    eventGenerate.authEventGenerate();
  } else {
    head.setUnauthorized();
    eventGenerate.noAuthEventGenerate();
  }
};

isLogin();

const insertNews = (newsData, _id) => {
  const news = new News(newsData, vespucciApi, auth, _id, eventGenerate);
  news.createNewsCard();
  // news.authHandler();
  news._authListener();
  // news.handler();
  return news;
};

const newslist = new Newslist(RESULTS_CONTAINER, insertNews, operate);
new Search(document.forms.search, newsApi, newslist, operate, DATES, validate, isLogin);
const successPopup = new Popup(POPUP_SUCCESS);
successPopup.closeSuccessPopupHandler();
new PopupEnter(POPUP_ENTER, validate, vespucciApi, head, auth);
new PopupReg(POPUP_REG, validate, vespucciApi);
new Exit(vespucciApi, head, auth);
