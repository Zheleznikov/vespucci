export default class Operate {

  turnDate(date) {
    const months = 'мартобря января февраля марта апреля мая июня июля августа сентября октября ноября декабя'.split(' ');
    const newDate = date.slice(0, 10).split('-').reverse();
    newDate[0] = +newDate[0];
    months.forEach((month, i) => {
      if (i == newDate[1]) {
        newDate[1] = newDate[1].replace(newDate[1], `${month},`)
      }
    })
    return newDate.join(' ');
  }

  trimString(string, n) {
    return string === null ? '' : string.length > n ? string.slice(0, 53) + '...' : string;
  }


  pairValue(n) {
    const last = +n.toString().slice(-1);

    if (n === 0) {
      return 'у Вас нет сохраненных статей'
    }

    if (n > 100) {
      return 'у Вас больше 100 сохраненных статей'
    }
    if (n > 4 && n < 21) {
      return `у Вас ${n} сохраненных статей`
    }
    if (last === 1) {
      return `у Вас ${n} сохраненная статья`
    }

    if (last > 1 && last < 5) {
      return `у Вас ${n} сохраненных статьи`
    }

    return `у Вас ${n} сохраненных статей`

  }


  getKeywords(arr) {
    if (arr.length === 0) {
      return 'нет статей - нет ключевых слов :('
    }
    const keys = arr.map(el => el.keyword);

    const uniqKeys = keys.reduce((res, current) => {
      if (!res.includes(current)) {
        res.push(current)
      }
      return res;
    }, [])

    if (uniqKeys.length === 1) {
      return uniqKeys[0]
    }

    if (uniqKeys.length === 2) {
      return uniqKeys.join(' и ')
    }

    if (uniqKeys.length === 3) {
      return `${uniqKeys[0]}, ${uniqKeys[1]} и ${uniqKeys[2]}`
    }

    const length = uniqKeys.length - 2;
    return `${uniqKeys[0]}, ${uniqKeys[1]} и ${length} другим`

  }
}