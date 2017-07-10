"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _helper = require("../helper/helper");

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.state = {
      currentYear: _helper2.default.getFullYear(),
      currentMonth: _helper2.default.getMonth(),
      currentDay: _helper2.default.getDate(),
      selectYear: _helper2.default.getFullYear(),
      selectMonth: _helper2.default.getMonth(),
      selectDay: _helper2.default.getDate(),
      historyYear: undefined,
      historyMonth: undefined,
      historyDay: undefined,
      dateNumArray: []
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          year = _props.year,
          month = _props.month,
          day = _props.day;


      if (year && month && day) {
        var dateNumArray = this._initMonthDayNumber(year),
            firstDay = _helper2.default.weekOfMonth(new Date(year, month - 1));

        this.setState({
          selectYear: year,
          selectMonth: month - 1,
          selectDay: day,
          dateNumArray: dateNumArray,
          firstDay: firstDay
        });
      }
    }
  }, {
    key: "_initMonthDayNumber",
    value: function _initMonthDayNumber(year) {
      var _dateArray = [];

      for (var i = 0; i < 12; i++) {
        switch (i + 1) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            _dateArray.push(31);
            break;
          case 4:
          case 6:
          case 9:
          case 11:
            _dateArray.push(30);
            break;
          case 2:
            if (_helper2.default.isLeapYear(year)) {
              _dateArray.push(29);
            } else {
              _dateArray.push(28);
            }
            break;
          default:
            break;
        }
      }

      return _dateArray;
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var dateNumArray = this._initMonthDayNumber(this.state.currentYear),
          firstDay = _helper2.default.weekOfMonth();

      this.setState({ dateNumArray: dateNumArray, firstDay: firstDay });
    }
  }, {
    key: "selectDate",
    value: function selectDate(sDay) {
      var _this2 = this;

      var _state = this.state,
          selectYear = _state.selectYear,
          selectMonth = _state.selectMonth;

      this.setState({
        historyYear: selectYear,
        historyMonth: selectMonth,
        historyDay: sDay,
        selectDay: sDay
      }, function () {
        _this2.props.onSelectDate(selectYear, selectMonth + 1, sDay);
      });
    }
  }, {
    key: "previousMonth",
    value: function previousMonth() {
      var _state2 = this.state,
          currentYear = _state2.currentYear,
          currentMonth = _state2.currentMonth,
          currentDay = _state2.currentDay,
          selectYear = _state2.selectYear,
          selectMonth = _state2.selectMonth,
          selectDay = _state2.selectDay,
          dateNumArray = _state2.dateNumArray,
          firstDay = _state2.firstDay;


      if (selectMonth === 0) {
        selectYear = +selectYear - 1;
        selectMonth = 11;
        dateNumArray = this._initMonthDayNumber(selectYear);
      } else {
        selectMonth = +selectMonth - 1;
      }

      firstDay = _helper2.default.weekOfMonth(new Date(selectYear, selectMonth));

      if (currentYear === selectYear && currentMonth === selectMonth) {
        selectDay = currentDay;
      } else {
        selectDay = undefined;
      }

      this.props.onPreviousMonth(selectYear, selectMonth + 1);
      this.setState({
        selectYear: selectYear,
        selectMonth: selectMonth,
        selectDay: selectDay,
        dateNumArray: dateNumArray,
        firstDay: firstDay
      });
    }
  }, {
    key: "nextMonth",
    value: function nextMonth() {
      var _state3 = this.state,
          currentYear = _state3.currentYear,
          currentMonth = _state3.currentMonth,
          currentDay = _state3.currentDay,
          selectYear = _state3.selectYear,
          selectMonth = _state3.selectMonth,
          selectDay = _state3.selectDay,
          dateNumArray = _state3.dateNumArray,
          firstDay = _state3.firstDay;


      if (selectMonth === 11) {
        selectYear = +selectYear + 1;
        selectMonth = 0;
        dateNumArray = this._initMonthDayNumber(selectYear);
      } else {
        selectMonth = +selectMonth + 1;
      }

      firstDay = _helper2.default.weekOfMonth(new Date(selectYear, selectMonth));

      if (currentYear === selectYear && currentMonth === selectMonth) {
        selectDay = currentDay;
      } else {
        selectDay = undefined;
      }

      this.props.onPreviousMonth(selectYear, selectMonth + 1);
      this.setState({
        selectYear: selectYear,
        selectMonth: selectMonth,
        selectDay: selectDay,
        dateNumArray: dateNumArray,
        firstDay: firstDay
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          rowNumber = _props2.rowNumber,
          colNumber = _props2.colNumber,
          tags = _props2.tags;
      var _state4 = this.state,
          currentYear = _state4.currentYear,
          currentMonth = _state4.currentMonth,
          currentDay = _state4.currentDay,
          selectYear = _state4.selectYear,
          selectMonth = _state4.selectMonth,
          historyYear = _state4.historyYear,
          historyMonth = _state4.historyMonth,
          historyDay = _state4.historyDay,
          dateNumArray = _state4.dateNumArray,
          firstDay = _state4.firstDay;


      var monthDay = dateNumArray[selectMonth],
          nDay = rowNumber * colNumber - firstDay - monthDay,
          previousMonthDays = undefined,
          previousDays = [],
          currentDays = [],
          nextDays = [],
          totalDays = [],
          previousMonth = undefined;

      if (selectMonth === 0) {
        previousMonth = 11;
      } else {
        previousMonth = selectMonth - 1;
      }

      previousMonthDays = dateNumArray[previousMonth];
      for (var i = 0; i < firstDay; i++) {
        var previousLink = _react2.default.createElement(
          "li",
          { className: "item-gray", key: "previous" + i },
          _react2.default.createElement(
            "a",
            { href: "javascript:;" },
            previousMonthDays - (firstDay - i) + 1
          )
        );
        previousDays.push(previousLink);
      }

      var currentClassName = "",
          currentText = "";

      for (var _i = 0; _i < monthDay; _i++) {
        if (currentYear == selectYear && currentMonth == selectMonth && currentDay == _i + 1) {
          currentClassName = "item-current";
          currentText = _i + 1;
        } else {
          currentText = _i + 1;
          if (selectYear == historyYear && selectMonth == historyMonth && historyDay == _i + 1) {
            currentClassName = "item-active";
          } else {
            currentClassName = "";
          }
        }

        if (tags.length > 0) {
          for (var j = 0; j < tags.length; j++) {
            if (_i + 1 == tags[j]) {
              // tags[j] maybe string or integer
              currentClassName += " item-tag";
              break;
            }
          }
        }

        var currentLink = _react2.default.createElement(
          "li",
          { className: currentClassName, key: "current" + _i },
          _react2.default.createElement(
            "a",
            { href: "javascript:;", onClick: this.selectDate.bind(this, _i + 1) },
            currentText
          )
        );
        currentDays.push(currentLink);
      }

      for (var _i2 = 0; _i2 < nDay; _i2++) {
        var nextLink = _react2.default.createElement(
          "li",
          { className: "item-gray", key: "next" + _i2 },
          _react2.default.createElement(
            "a",
            { href: "javascript:;" },
            _i2 + 1
          )
        );
        nextDays.push(nextLink);
      }

      totalDays = previousDays.concat(currentDays, nextDays);

      var ulList = [];
      if (totalDays.length > 0) {
        for (var _i3 = 0; _i3 < rowNumber; _i3++) {
          var liList = [],
              startIndex = _i3 * colNumber,
              endIndex = (_i3 + 1) * colNumber;
          for (var _j = startIndex; _j < endIndex; _j++) {
            liList.push(totalDays[_j]);
          }
          ulList.push(liList);
        }
      }

      return _react2.default.createElement(
        "div",
        { className: "calendar" },
        _react2.default.createElement(
          "div",
          { className: "calendar-header" },
          _react2.default.createElement("i", { className: "icon-left", onClick: this.previousMonth.bind(this) }),
          _react2.default.createElement(
            "span",
            null,
            selectYear,
            "/",
            selectMonth < 10 ? "0" + selectMonth : selectMonth
          ),
          _react2.default.createElement("i", { className: "icon-right", onClick: this.nextMonth.bind(this) })
        ),
        _react2.default.createElement(
          "div",
          { className: "calendar-body" },
          _react2.default.createElement(
            "ul",
            { className: "c-body-head" },
            _react2.default.createElement(
              "li",
              null,
              "\u65E5"
            ),
            _react2.default.createElement(
              "li",
              null,
              "\u4E00"
            ),
            _react2.default.createElement(
              "li",
              null,
              "\u4E8C"
            ),
            _react2.default.createElement(
              "li",
              null,
              "\u4E09"
            ),
            _react2.default.createElement(
              "li",
              null,
              "\u56DB"
            ),
            _react2.default.createElement(
              "li",
              null,
              "\u4E94"
            ),
            _react2.default.createElement(
              "li",
              null,
              "\u516D"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "c-body-content" },
            ulList.map(function (u, index) {
              return _react2.default.createElement(
                "ul",
                { key: "ul" + index, className: "content-row" },
                u
              );
            })
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.defaultProps = {
  rowNumber: 6,
  colNumber: 7
};

exports.default = Calendar;