const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const isBetween = require('dayjs/plugin/isBetween');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const weekOfYear = require('dayjs/plugin/weekOfYear');

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);

const getUtcStartOfDay = time => {
  if (!time) return dayjs().utc().startOf('day');

  return dayjs(time).utc().startOf('day');
};

const differenceDays = (dateStart, dateTo, round = false) => {
  const difference = dateTo.getTime() - dateStart.getTime();
  if (round) {
    return Math.ceil(difference / (1000 * 3600 * 24));
  }
  return Math.floor(difference / (1000 * 3600 * 24));
};

const weekId = day => {
  return day.week() + '_' + day.year();
};

const nowWeekId = () => {
  const now = dayjs();
  return weekId(now);
};

const nowTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

module.exports = {
  getUtcStartOfDay,
  differenceDays,
  weekId,
  nowWeekId,
  nowTimestamp,
};
