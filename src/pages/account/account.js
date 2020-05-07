import './account.css';
import { IP, SERVER } from '../../js/constants/service';
import Api from '../../js/api/Api';
import Head from '../../js/components/Head';
import Exit from '../../js/components/Exit';
import News from '../../js/components/News';
import Newslist from '../../js/components/Newslist';
import Operate from '../../js/utils/Operate';


(function() {
  const api = new Api(IP);
  const head = new Head(document.querySelector('.header'));
  const operate = new Operate();

  // то, что надо будет вынести в отдельный файл
  document.querySelector('.header__logo').classList.add('header__theme_black');
  document.querySelector('.header__link').classList.add('header__theme_black');
  document.querySelectorAll('.header__link').forEach(link => link.classList.add('header__theme_black'));
  document.querySelector('.header__button_in').classList.add('header__theme_black');

  const insertNews = (url, urlToImage, publishedAt, description, content, source, _id) => {
    const news = new News(url, urlToImage, publishedAt, description, content, source, _id, api);
    news.createNewsCard();
    news.accountHandlers();

    return news;
  }

  const newslist = new Newslist(document.querySelector('.results__container'), insertNews, operate);

  api.getNews()
  .then(data => {
    console.log(data);
    newslist.renderInAccount(data)
  });






  api.getMyData()
    .then(data => head.ifLogin(data.data.name))
    .catch(() => {
      head.ifUnauthorized();
      location = "./index.html";
    });

  new Exit(api, head);


})()