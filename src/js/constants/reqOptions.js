// Запрос на newsApi
const REQUEST_OPTIONS = {
  headers: {
    authorization: 'Bearer e1b4f6c04db147c8afb184bec5c703a5',
  },
};

// const URL = 'https://newsapi.org/v2/everything?';
const URL = 'http://localhost:3002/news-api?';


// запросы на свой сервер
const MY_USUAL_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};


export { REQUEST_OPTIONS, URL, MY_USUAL_HEADERS };