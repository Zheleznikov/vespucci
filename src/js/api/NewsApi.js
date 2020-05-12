/* eslint-disable prefer-promise-reject-errors */
// класс для работы с newsapi.org
export default class NewsApi {
  constructor(options, url) {
    this.options = options;
    this.url = url;
  }

  // получить данные от сервера
  getNews(query, today, sevenDaysAgo) {
    const params = {
      q: query,
      from: sevenDaysAgo,
      to: today,
      pageSize: 100,
    };
    const queryParams = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

    return fetch(`${this.url}${queryParams}`, this.options)
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch((error) => console.log('error', error));
  }
}