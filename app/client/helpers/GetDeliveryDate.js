import moment from 'moment';

// input - weekdays (counts monday-friday only) after today output sample:  Monday April 25, 2016

export default function ({days}) {
  let date = new Date();
  let total_days = 0;
  let total_weekdays = 0;
  let weekday = (date.getDay() !== 6) ? date.getDay() + 1 : 0;

  while (total_weekdays < days) {
    total_days++;
    if (weekday !== 0 && weekday !== 6) {
      total_weekdays++;
    }
    if (weekday === 6) {
      weekday = 0;
    } else {
      weekday++;
    }
  }

  return moment().add(total_days, 'days').format('dddd MMMM DD, YYYY');
}
