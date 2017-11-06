# Rabbit Mailer Server
A email delivering service based on AMQP protocol

<img src="https://i.imgur.com/BTdctAa.png" width="250">

## How it works

Rabbit Mailer Server uses [Rabbit MQ](https://www.rabbitmq.com) and [Node Mailer](https://nodemailer.com/) to deliver asynchronous SMTP 
emails. It consumes a queue of "to be sent emails" managed by Rabbit MQ server and send these incoming messages using Node Mailer with a 
pre-setted email configuration. The major benefits of use Rabbit Mailer are:

- Centered mail service to a lot of applications
- Ensures that the email will be sent since Rabbit MQ is on (thank to the queue magic)

Looking to the MQ stack, this server is the Consumer "C" of the email's queue (in red) filled by the Producer "P" -- The Rabbit Mailer Client 
plugged into your application. 

<img src="https://www.rabbitmq.com/img/tutorials/python-one.png" width="250">

That simple.

## Prerequisites

To get Rabbit Mailer Server up and running you will need these:

- Rabbit MQ Server - [Download here](https://www.rabbitmq.com/download.html)
- Node JS >= v7.0.0 - [Download here](https://nodejs.org/en/download/)

## Contributing

All contribution is welcome, please read `./github/CONTRIBUTING.md`

## License

Rabbit Mailer is licensed over GPLv3 [read about](https://www.gnu.org/licenses/gpl-3.0.html)
