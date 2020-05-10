const REQUEST_OPTIONS = {
  headers: {
    authorization: 'Bearer e1b4f6c04db147c8afb184bec5c703a5',
  },
};

const URL = 'https://newsapi.org/v2/everything?';
const MY_API_HEADERS = {
  authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export { REQUEST_OPTIONS, URL, MY_API_HEADERS };