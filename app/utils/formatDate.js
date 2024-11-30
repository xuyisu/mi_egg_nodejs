const { format } = require('date-fns');

function formatDate(date, dateFormat = 'yyyy-MM-dd HH:mm:ss') {
    if (!date) {
        return '';
    }
    if (typeof date === 'string') {
        return format(new Date(date), dateFormat);
    }
    return format(date, dateFormat);
}

module.exports = formatDate;