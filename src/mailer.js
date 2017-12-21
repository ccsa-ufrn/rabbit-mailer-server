/**
 * CCSA - UFRN. 2017.
 */
"use strict";

const nodemailer = require('nodemailer');
const amqp = require('amqplib/callback_api');

/**
 * Starts listenning the emails queue and sending messages
 * @param queueHost message broker address
 * @param options server options
 */
function listen(amqpOptions, smtpOptions, queueName) {
    console.log(amqpOptions);
    // create a node mailer transport, logging with mail service
    const nodeMailerTransport = nodemailer.createTransport(smtpOptions);

    amqp.connect(amqpOptions, function(connErr, conn) {
        if (connErr) throw "Can't initialize connection with the host. Please verify if RabbitMQ server is running";
        conn.createChannel(function(chErr, channel) {
            if (chErr) throw new Error("Can't assign the channel");
            // assigns the queue to the given channel
            channel.assertQueue(queueName, { durable: true });
            console.log("Rabbit Mailer server started");
            // consume emails
            channel.consume(queueName, function(message) {
                parsedMessage = JSON.parse(message.content);

                nodeMailerTransport.sendMail(parsedMessage, function(nodeMailerError) {
                    if (nodeMailerError) throw "Can't send a mail. Please check mail settings";
                });
            }, { noAck: true });

        });
    });
}

module.exports = {
    listen
};