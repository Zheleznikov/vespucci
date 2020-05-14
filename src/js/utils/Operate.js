/* ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ДЛЯ ПРЕОБРАЗОВАНИЯ РАЗНЫХ РЕЗУЛЬТАТОВ */

/* eslint-disable class-methods-use-this */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */

export default class Operate {
  // перевод поля даты с newsApi в нужный формат
  turnDate(date) {
    const months = 'мартобря января февраля марта апреля мая июня июля августа сентября октября ноября декабя'.split(' ');
    const newDate = date.slice(0, 10).split('-').reverse();
    newDate[0] = +newDate[0];
    months.forEach((month, i) => {
      if (i == newDate[1]) {
        newDate[1] = newDate[1].replace(newDate[1], `${month},`);
      }
    });
    return newDate.join(' ');
  }

  // обработка текстов, если они слишком длинные NEWSAPI
  trimString(content, reqSize) {
    return content === null ? '' : content.length > reqSize ? `${content.slice(0, reqSize)}...` : content;
  }

  // обработка сколько статей у пользователя
  // ДЛЯ ЛИЧНОГО КАБИнЕТА ВЫСТАВИТЬ СВЕРХУ
  pairValue(numOfArt) {
    const last = +numOfArt.toString().slice(-1);

    if (numOfArt === 0) {
      return 'у Вас нет сохраненных статей';
    }

    if (numOfArt > 100) {
      return 'у Вас больше 100 сохраненных статей';
    }
    if (numOfArt > 4 && numOfArt < 21) {
      return `у Вас ${numOfArt} сохраненных статей`;
    }
    if (last === 1) {
      return `у Вас ${numOfArt} сохраненная статья`;
    }

    if (last > 1 && last < 5) {
      return `у Вас ${numOfArt} сохраненных статьи`;
    }

    return `у Вас ${numOfArt} сохраненных статей`;
  }

  // преобразовать дату в валидный формат. для класса Search
  getDate(time) {
    const date = time;
    let dd = date.getDate();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    let mm = date.getMonth() + 1;
    if (mm < 10) {
      mm = `0${mm}`;
    }
    const year = date.getFullYear();
    return `${year}-${mm}-${dd}`;
  }


  // ОБРАБОТКА МАССИВОВ С КЛЮЧЕВЫМИ СЛОВАМИ

  // получить только ключевые слова из массива. для localstorage
  getAllKeyWords(data) {
    return data.map((news) => news.keyword);
  }

  // формирование строки с ключевыми словами. для первого поиска при открытии личного кабинета
  getKeywords(words) {
    if (words.length === 0) {
      return 'нет статей - нет ключевых слов :(';
    }
    const uniqKeys = words.map((news) => news.keyword).reduce((res, current) => {
      if (!res.includes(current)) {
        res.push(current);
      }
      return res;
    }, []).reverse();

    if (uniqKeys.length === 1) {
      return uniqKeys[0];
    }

    if (uniqKeys.length === 2) {
      return uniqKeys.join(' и ');
    }

    if (uniqKeys.length === 3) {
      return `${uniqKeys[0]}, ${uniqKeys[1]} и ${uniqKeys[2]}`;
    }

    const length = uniqKeys.length - 2;
    return `${uniqKeys[0]}, ${uniqKeys[1]} и ${length} другим`;
  }

  // создать массив с уникальными ключами
  getArrayOfUniqueKeyWords(words) {
    if (words.length === 0) {
      return 'нет статей - нет ключевых слов :(';
    }
    return words.reduce((res, current) => {
      if (!res.includes(current)) {
        res.push(current);
      }
      return res;
    }, []).reverse();
  }

  // удалить одно ключевое слово из списка ключевых слов
  deleteElementFromArray(stringOfKeywords, deletedWord) {
    const arrOfKeywords = stringOfKeywords.split(',');
    arrOfKeywords.splice(arrOfKeywords.indexOf(deletedWord), 1);
    return arrOfKeywords;
  }
}