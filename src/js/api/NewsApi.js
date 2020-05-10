export default class NewsApi {
  constructor(options, url) {
    this.options = options;
    this.url = url;
  }

  getNews(query, today, sevenDaysAgo) {
    const params = {
      q: query,
      from: sevenDaysAgo,
      to: today,
      pageSize: 100,
      sortBy: 'popularity',
    };

    const queryParams = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

    return fetch(`${this.url}${queryParams}`, this.options)
      .then((res) => res.json())
      .then((response) => response)
      .catch((error) => console.log('error', error));
  }
}