import dateUtil from '../../utils/date';

export const toDate = function(date) {
    let _date = new Date(date);
    // IE patch start (#1422)
    if (isNaN(_date.getTime()) && typeof date === 'string'){
        _date = date.split('-').map(Number);
        _date[1] += 1;
        _date = new Date(..._date);
    }
    // IE patch end

    if (isNaN(_date.getTime())) return null;
    return _date;
};

export const formatDate = function(date, format) {
    date = toDate(date);
    if (!date) return '';
    return dateUtil.format(date, format || 'yyyy-MM-dd');
};

export const parseDate = function(string, format) {
    return dateUtil.parse(string, format || 'yyyy-MM-dd');
};

export const getDayCountOfMonth = function(year, month) {
    return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = function(date) {
    const temp = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
};

export const siblingMonth = function(src, diff) {
    const temp = new Date(src); // lets copy it so we don't change the original
    const newMonth = temp.getMonth() + diff;
    const newMonthDayCount = getDayCountOfMonth(temp.getFullYear(), newMonth);
    if (newMonthDayCount < temp.getDate()) {
        temp.setDate(newMonthDayCount);
    }
    temp.setMonth(newMonth);

    return temp;
};

export const prevMonth = function(src) {
    return siblingMonth(src, -1);
};

export const nextMonth = function(src) {
    return siblingMonth(src, 1);
};

export const initTimeDate = function() {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
};
/*入一个时间，回这个时间内，周日到周六的日期*/
export const getWeekMinMax = function(data, index = 0) {

    const dateOfToday = new Date(data).getTime();
    const dayOfToday = (new Date(data).getDay() + 7) % 7
    const daysOfThisWeek = Array.from(new Array(7))
        .map((_, i) => {
            const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)
            return date;
            // return date.getFullYear() +
            //     '-' +
            //     String(date.getMonth() + 1).padStart(2, '0') +
            //     '-' +
            //     String(date.getDate()).padStart(2, '0')
        })

    return daysOfThisWeek[index];

}
/*入日期，回此日期是今年的第几周*/
export const getWeekNumber = function(data) {
    var totalDays = 0;
    var now = new Date(data);
    var years = now.getYear()
    if (years < 1000) {
        years += 1900
    }
    var days = new Array(12);
    days[0] = 31;
    days[2] = 31;
    days[3] = 30;
    days[4] = 31;
    days[5] = 30;
    days[6] = 31;
    days[7] = 31;
    days[8] = 30;
    days[9] = 31;
    days[10] = 30;
    days[11] = 31;

    //判断是否为闰年，针对2月的天数进行计算
    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
        days[1] = 29
    } else {
        days[1] = 28
    }
    if (now.getMonth() == 0) {
        totalDays = totalDays + now.getDate();
    } else {
        var curMonth = now.getMonth();
        for (var count = 1; count <= curMonth; count++) {
            totalDays = totalDays + days[count - 1];
        }
        totalDays = totalDays + now.getDate();
    }
    //得到第几周
    var week = Math.round(totalDays / 7);
    return week;
};
export const formatDateLabels = (function() {
    /*
      Formats:
      yyyy - 4 digit year
      m - month, numeric, 1 - 12
      mm - month, numeric, 01 - 12
      mmm - month, 3 letters, as in `toLocaleDateString`
      Mmm - month, 3 letters, capitalize the return from `toLocaleDateString`
      mmmm - month, full name, as in `toLocaleDateString`
      Mmmm - month, full name, capitalize the return from `toLocaleDateString`
    */

    const formats = {
        yyyy: date => date.getFullYear(),
        m: date => date.getMonth() + 1,
        mm: date => ('0' + (date.getMonth() + 1)).slice(-2),
        mmm: (date, locale) => {
            const monthName = date.toLocaleDateString(locale, {
                month: 'long'
            });
            return monthName.slice(0, 3);
        },
        Mmm: (date, locale) => {
            const monthName = date.toLocaleDateString(locale, {
                month: 'long'
            });
            return (monthName[0].toUpperCase() + monthName.slice(1).toLowerCase()).slice(0, 3);
        },
        mmmm: (date, locale) =>
            date.toLocaleDateString(locale, {
                month: 'long'
            }),
        Mmmm: (date, locale) => {
            const monthName = date.toLocaleDateString(locale, {
                month: 'long'
            });
            return monthName[0].toUpperCase() + monthName.slice(1).toLowerCase();
        }
    };
    const formatRegex = new RegExp(['yyyy', 'Mmmm', 'mmmm', 'Mmm', 'mmm', 'mm', 'm'].join('|'), 'g');

    return function(locale, format, date) {
        const componetsRegex = /(\[[^\]]+\])([^\[\]]+)(\[[^\]]+\])/;
        const components = format.match(componetsRegex).slice(1);
        const separator = components[1];
        const labels = [components[0], components[2]].map(component => {
            const label = component.replace(/\[[^\]]+\]/, str => {
                return str.slice(1, -1).replace(formatRegex, match => formats[match](date, locale));
            });
            return {
                label: label,
                type: component.indexOf('yy') != -1 ? 'year' : 'month'
            };
        });
        return {
            separator: separator,
            labels: labels
        };
    };
})();
