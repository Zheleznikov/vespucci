/* eslint-disable prefer-promise-reject-errors */
// класс для работы с newsapi.org
export default class NewsApi {
  constructor(url, api_key, headers) {
    this.url = url;
    this.api_key = api_key;
    this.headers = headers;
  }

  getNews(q, from, to) {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({q, from, to ,key:this.api_key }),
      redirect: 'follow'
    };


    return fetch(this.url, requestOptions)
     .then((res) => {
          if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
          return res.json();
        });


  }


}


  // получить данные от сервера
  // getNews(q, from, to) {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Accept", "application/json");
  //   myHeaders.append("Content-Type", "application/json");

  //   const raw = JSON.stringify({"q":q,"from":from,"to":to,"key":"e1b4f6c04db147c8afb184bec5c703a5"});

  //   const requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch("http://localhost:3002/news-api", requestOptions)

  // }

  //   return fetch(`http://localhost:3002/news-api`, {
  //     method: 'GET',
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ q, from, to, key: 'e1b4f6c04db147c8afb184bec5c703a5' })
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         return Promise.reject(`Ошибка: ${res.status}`);
  //       }
  //       return res.json();
  //     });
  // }
// }
