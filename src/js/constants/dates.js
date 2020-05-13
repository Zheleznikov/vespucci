// // рассчет переменных для поиска
// const SEVEN_DAYS_AGO = new Date(new Date().getTime() - 1000 * 7 * 24 * 60 * 60);
// const TODAY = new Date();

const DATES = {
  today: new Date(),
  sevenDaysAgo: new Date(new Date().getTime() - 1000 * 7 * 24 * 60 * 60),
};
export default DATES;