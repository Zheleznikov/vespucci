export default class NewsApi {


  constructor(options) {
    this.options = options;
  }

  getNews(query) {

    const url = 'https://newsapi.org/v2/everything?' +
      `q=${query}&` +
      'from=2020-05-06&' +
      'sortBy=popularity&' +
      'pageSize=5&' +
      'apiKey=e1b4f6c04db147c8afb184bec5c703a5';


    // https://newsapi.org/v2/everything?q=${sport}&from=2020-06-05&sortBy=popularity&pageSize=5&apiKey=e1b4f6c04db147c8afb184bec5c703a5

    const req = new Request(url);
    // console.log(req);

    const options = {
      method: 'GET',
      credentials: "same-origin",
      mode: "cors",
      redirect: 'follow',
      headers: {
        "Authorization": 'Bearer e1b4f6c04db147c8afb184bec5c703a5'

      }
    }

    return fetch(req)

    .then((res) => res.json())
      .then(function(response) {
        // console.log(response);
        return response;
      })

  }

  handler() {

  }
}