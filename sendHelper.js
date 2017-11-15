

var amqp = require('amqplib/callback_api');

module.exports = {
  emailParser: function(from, to, subject,html) {
    return({
		from,
		to,
		subject,
		html
	});
  },

sendEmail: function(email, queue) {
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {

	    ch.assertQueue(queue, {durable: true});

	    ch.sendToQueue(queue, new Buffer(JSON.stringify(email)));
	    console.log(" [x] Sent ", email);
	 });
	  setTimeout(function() { conn.close(); process.exit(0) }, 500);
	});
  }
};

