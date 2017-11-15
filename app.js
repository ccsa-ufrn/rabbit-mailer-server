

var person = require('./send.js');


var teste = person.emailParser('haha', 'h', 'h', 'h');

console.log(teste);

person.sendEmail(teste, 'hello');