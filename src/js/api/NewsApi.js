export default class NewsApi {


  constructor(options) {
    this.options = options;
  }

  getNews(query) {


    const url = 'http://newsapi.org/v2/everything?' +
      `q=${query}&` +
      'from=2020-05-06&' +
      'sortBy=popularity&' +
      'pageSize=5&' +
      'apiKey=e1b4f6c04db147c8afb184bec5c703a5';

    const req = new Request(url);

    return fetch(req)
      .then((res) => res.json())
      .then(function(response) {
        // console.log(response);
        return response;
      })

  }
}