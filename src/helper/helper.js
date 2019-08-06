export const isLeapYear = function(year) {
  if (!typeof +year === "number") {
    throw new Error("year format error");
  }

  if (+year < 1970) {
    throw new Error("can't littler then 1970");
  }

  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

/**
 * 返回月份中的第一天是星期几
 * @returns {number}
 * 1 星期一
 * 2 星期二
 * 3 星期三
 * 4 星期四
 * 5 星期五
 * 6 星期六
 * 0 星期天
 */
export const weekOfMonth = function(date) {
  if (!date) date = new Date();
  return new Date(getFullYear(date), getMonth(date), 1).getDay();
};

export const getMonth = function(date) {
  if (!date) date = new Date();
  return date.getMonth();
};

export const getFullYear = function(date) {
  if (!date) date = new Date();
  return date.getFullYear();
};

/**
 * 获取一月中的某一天
 */
export const getDate = function(date) {
  if (!date) date = new Date();
  return date.getDate();
};

export default {
  isLeapYear,
  weekOfMonth,
  getMonth,
  getFullYear,
  getDate
};
