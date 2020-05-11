// Запрос на newsApi
const REQUEST_OPTIONS = {
  headers: {
    authorization: 'Bearer e1b4f6c04db147c8afb184bec5c703a5',
  },
};

const URL = 'https://newsapi.org/v2/everything?';


// запросы на свой сервер
const MY_USUAL_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const MY_BEARER_HEADERS = {
  authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export { REQUEST_OPTIONS, URL, MY_USUAL_HEADERS, MY_BEARER_HEADERS };