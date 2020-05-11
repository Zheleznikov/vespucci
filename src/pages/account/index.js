import './account.css';
import { SERVER } from '../../js/constants/service';
import Api from '../../js/api/Api';
import Head from '../../js/components/Head';
import Exit from '../../js/components/Exit';
import News from '../../js/components/News';
import Newslist from '../../js/components/Newslist';
import Operate from '../../js/utils/Operate';
import SavedArt from '../../js/components/SavedArt';
import { MY_USUAL_HEADERS, MY_BEARER_HEADERS } from '../../js/constants/reqOptions';


(function main() {
  const api = new Api(SERVER, MY_USUAL_HEADERS, MY_BEARER_HEADERS);
  const head = new Head(document.querySelector('.header'));
  const savedArt = new SavedArt(document.querySelector('.articles-info'));
  head.setBlackTheme();

  const operate = new Operate();


  const insertNews = (url, urlToImage, publishedAt, description, content, source, _id, keyword, message) => {
    const news = new News(url, urlToImage, publishedAt, description, content, source, _id, keyword, message, api);
    news.createNewsCard();
    news.accountHandlers();

    return news;
  };

  const newslist = new Newslist(document.querySelector('.results__container'), insertNews, operate);

  api.getMyData()
    .then((data) => {
      head.ifLogin(data.data.name);
      savedArt.setName(data.data.name, operate.pairValue(data.data.articles.length));
      api.getNews()
        .then((res) => {
          if (res.length === 0) {
            savedArt.turnKeywordsOff();
            saved.turnOffResults();
          } else {
            savedArt.turnOnResults();
            savedArt.setKeywords(operate.getKeywords(res));
            newslist.renderInAccount(res);
          }
        });
    })
    .catch(() => {
      window.location.pathname = './';
    });

  new Exit(api, head);
}());