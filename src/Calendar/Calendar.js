import React, { Component } from "react";
import H from "../helper/helper";

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentYear: H.getFullYear(),
      currentMonth: H.getMonth(),
      currentDay: H.getDate(),
      selectYear: H.getFullYear(),
      selectMonth: H.getMonth(),
      selectDay: H.getDate(),
      historyYear: undefined,
      historyMonth: undefined,
      historyDay: undefined,
      dateNumArray: []
    };
  }

  componentDidMount() {
    let { year, month, day} = this.props;

    if(year && month && day) {
      let dateNumArray = this._initMonthDayNumber(year),
        firstDay = H.weekOfMonth(new Date(year, month - 1));

      this.setState({
        selectYear: year,
        selectMonth: month - 1,
        selectDay: day,
        dateNumArray: dateNumArray,
        firstDay: firstDay
      });
    }
  }

  _initMonthDayNumber(year) {
    let _dateArray = [];

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
        if (H.isLeapYear(year)) {
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

  componentWillMount() {
    let dateNumArray = this._initMonthDayNumber(this.state.currentYear),
      firstDay = H.weekOfMonth();

    this.setState({dateNumArray: dateNumArray, firstDay: firstDay});
  }


  selectDate(sDay) {
    let { selectYear, selectMonth} = this.state;
    this.setState({
      historyYear: selectYear,
      historyMonth: selectMonth,
      historyDay: sDay,
      selectDay: sDay
    }, () => {
      this.props.onSelectDate(selectYear, selectMonth + 1, sDay);
    });
  }

  previousMonth() {
    let { currentYear, currentMonth, currentDay, selectYear, selectMonth, selectDay, dateNumArray, firstDay} = this.state;

    if (selectMonth === 0) {
      selectYear = +selectYear - 1;
      selectMonth = 11;
      dateNumArray = this._initMonthDayNumber(selectYear);
    } else {
      selectMonth = +selectMonth - 1;
    }

    firstDay = H.weekOfMonth(new Date(selectYear, selectMonth));

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

  nextMonth() {
    let { currentYear, currentMonth, currentDay, selectYear, selectMonth, selectDay, dateNumArray, firstDay} = this.state;

    if (selectMonth === 11) {
      selectYear = +selectYear + 1;
      selectMonth = 0;
      dateNumArray = this._initMonthDayNumber(selectYear);
    } else {
      selectMonth = +selectMonth + 1;
    }

    firstDay = H.weekOfMonth(new Date(selectYear, selectMonth));

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

  render() {
    let { rowNumber, colNumber, tags } = this.props;
    let { currentYear, currentMonth, currentDay,
            selectYear, selectMonth,
            historyYear, historyMonth, historyDay,
            dateNumArray, firstDay} = this.state;

    let monthDay = dateNumArray[selectMonth],
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
    for (let i = 0; i < firstDay; i++) {
      let previousLink = (<li className="item-gray" key={"previous"+i}>
                <a href="javascript:;">{previousMonthDays - (firstDay - i) + 1}</a>
            </li>);
      previousDays.push(previousLink);
    }

    let currentClassName = "", currentText = "";

    for (let i = 0; i < monthDay; i++) {
      if (currentYear == selectYear && currentMonth == selectMonth && currentDay == (i + 1)) {
        currentClassName = "item-current";
        currentText = i + 1;
      } else {
        currentText = i + 1;
        if (selectYear == historyYear && selectMonth == historyMonth && historyDay == (i + 1)) {
          currentClassName = "item-active";
        } else {
          currentClassName = "";
        }
      }

      if (tags.length > 0) {
        for (let j = 0; j < tags.length; j++) {
          if ((i + 1) == tags[j]) { // tags[j] maybe string or integer
            currentClassName += " item-tag";
            break;
          }
        }
      }

      let currentLink = (<li className={currentClassName} key={"current"+i}>
        <a href="javascript:;" onClick={this.selectDate.bind(this, i + 1)}>
          {currentText}
        </a>
      </li>);
      currentDays.push(currentLink);
    }

    for (let i = 0; i < nDay; i++) {
      let nextLink = (<li className="item-gray" key={"next"+i}>
        <a href="javascript:;">{i + 1}</a>
      </li>);
      nextDays.push(nextLink);
    }

    totalDays = previousDays.concat(currentDays, nextDays);

    let ulList = [];
    if (totalDays.length > 0) {
      for (let i = 0; i < rowNumber; i++) {
        let liList = [],
          startIndex = i * colNumber,
          endIndex = (i + 1) * colNumber;
        for (let j = startIndex; j < endIndex; j++) {
          liList.push(totalDays[j]);
        }
        ulList.push(liList);
      }
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <i className="icon-left" onClick={this.previousMonth.bind(this)}></i>
          <span>{selectYear}/{selectMonth < 10 ? `0${selectMonth}` : selectMonth}</span>
          <i className="icon-right" onClick={this.nextMonth.bind(this)}></i>
        </div>
        <div className="calendar-body">
          <ul className="c-body-head">
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
          </ul>
          <div className="c-body-content">
            {
              ulList.map((u, index) => {
                return (<ul key={"ul"+index} className="content-row">{u}</ul>);
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

Calendar.defaultProps = {
  rowNumber: 6,
  colNumber: 7
};

export default Calendar;