"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isLeapYear = exports.isLeapYear = function isLeapYear(year) {
  if (!_typeof(+year) === "number") {
    throw new Error("year format error");
  }

  if (+year < 1790) {
    throw new Error("can't litter then 1790");
  }

  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
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
var weekOfMonth = exports.weekOfMonth = function weekOfMonth(date) {
  if (!date) date = new Date();
  return new Date(getFullYear(date), getMonth(date), 1).getDay();
};

var getMonth = exports.getMonth = function getMonth(date) {
  if (!date) date = new Date();
  return date.getMonth();
};

var getFullYear = exports.getFullYear = function getFullYear(date) {
  if (!date) date = new Date();
  return date.getFullYear();
};

/**
 * 获取一月中的某一天
 */
var getDate = exports.getDate = function getDate(date) {
  if (!date) date = new Date();
  return date.getDate();
};

exports.default = {
  isLeapYear: isLeapYear,
  weekOfMonth: weekOfMonth,
  getMonth: getMonth,
  getFullYear: getFullYear,
  getDate: getDate
};