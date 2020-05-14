// рассчет переменных для поискового запроса от сегодняшней даты до даты 7 дней назад
const DATES = {
  today: new Date(),
  sevenDaysAgo: new Date(new Date().getTime() - 1000 * 7 * 24 * 60 * 60),
};
export default DATES;