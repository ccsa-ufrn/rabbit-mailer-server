

var example = require('./sendHelper.js');


var test = example.emailParser('from', 'to', 'test', 'hello');

console.log(test);

example.sendEmail(test, 'hello');