import './style/index.css';
import { IP, SERVER } from './js/constants/service';

import Api from './js/api/Api';
import NewsApi from './js/api/NewsApi';
import Head from './js/components/Head';
import Enter from './js/components/Enter';
import Reg from './js/components/Reg';
import Validate from './js/components/Validate';
import Popup from './js/components/Popup';
import News from './js/components/News'
import Newslist from './js/components/Newslist';
import Operate from './js/utils/Operate';
import Exit from './js/components/Exit';
import Search from './js/components/Search';


(function() {
  const newsApi = new NewsApi();
  const operate = new Operate();

  const api = new Api(SERVER);
  const head = new Head(document.querySelector('.header'));
  const validate = new Validate();

  // newsApi.getNews('cats')
  //   .then((res) => {
  //     document.querySelector('.results').classList.add('results_on');
  //     newslist.render(res.articles, 0);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  api.getMyData()
    .then(data => head.ifLogin(data.data.name))
    .catch(() => head.ifUnauthorized());


  const insertNews = (url, urlToImage, publishedAt, description, content, source, _id, keyword, message) => {
    const news = new News(url, urlToImage, publishedAt, description, content, source, _id, keyword, message, api);
    news.createNewsCard();
    news.authHandler();
    return news;
  }


  const newslist = new Newslist(document.querySelector('.results__container'), insertNews, operate);
  new Search(document.forms.search, newsApi, newslist, api);

  new Popup(document.querySelector('.popup-success'));
  new Enter(document.querySelector('.popup-enter'), validate, api, head);
  new Exit(api, head);
  new Reg(document.querySelector('.popup-reg'), validate, api);





}());