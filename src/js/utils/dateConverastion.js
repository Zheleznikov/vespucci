function dateConversation(date) {
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

