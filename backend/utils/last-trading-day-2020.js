const moment = require('moment-business-days');

const yesterDay = getPrevTradingDay(new Date());

function getPrevTradingDay(day) {
  const getHours = new Date().getHours();
  const getPreviousDay = moment(day).prevBusinessDay().format().slice(0, 10);
  const getDayBefore = moment(day)
    .prevBusinessDay()
    .prevBusinessDay()
    .format()
    .slice(0, 10);

  return getHours >= 0 && getHours <= 8 ? getDayBefore : getPreviousDay;
}

const restDay = [
  '2020-10-01',
  '2020-10-02',
  '2020-10-03',
  '2020-10-04',
  '2020-10-05',
  '2020-10-06',
  '2020-10-07',
  '2020-10-08',
];

function sanitizeRestDay(arr, day) {
  if (arr.includes(day)) {
    day = getPrevTradingDay(day);
    console.log(day);
    return sanitizeRestDay(arr, day);
  }
  return day;
}

const lastTradingDay = sanitizeRestDay(restDay, yesterDay);

module.exports = lastTradingDay;
