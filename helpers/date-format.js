const moment = require("moment")
const dateFormat = moment.defineLocale('tr-cardinal-date', {
    parentLocale: 'tr',
    ordinal: (number) => `${number}`,
    dayOfMonthOrdinalParse: /d{1,2}('(inci|nci|üncü|ncı|uncu|ıncı))?/
});

module.exports = dateFormat