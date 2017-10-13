// Return result: new Data().getTime()
// Unix Epic - Jan 1st 1970 00:00:00 am UTC

const moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

var date = moment();

// Oct 13th 2017, 8:20:02 am
console.log(date.format('MMM Do YYYY, h:mm:ss a'));

// 9:35 am
console.log(date.format('h:mm a'));

// return Unix Epic
var timeStamp = moment().valueOf();
console.log(timeStamp);