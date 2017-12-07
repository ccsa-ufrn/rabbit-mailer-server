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

## Installing and running

Rabbit Mailer is npm based, to install use the command:

```
sudo npm install -g rabbit-mailer
```

The `-g` flag is important because it needs to be installed as a global package. After npm's install process rabbit-mailer should be up and running as a service. Run this command to verify if it is really running:

```
service rabbit-mailer status
```


```
● rabbit-mailer.service - Rabbit Mailer server
   Loaded: loaded (/etc/systemd/system/rabbit-mailer.service; disabled; vendor p
   Active: active (running) since Qui 2017-12-07 07:32:44 -03; 2s ago
 Main PID: 5719 (node)
   CGroup: /system.slice/rabbit-mailer.service
           └─5719 node /usr/lib/node_modules/rabbit-mailer/bin/server
```

You should get something like this, otherwise please read Troubleshooting topic bellow.

Now, if is working, you have to change your configuration file located at your global `node_modules/rabbit-mailer`, to find where it is located run `npm root -g` it will return the directory containing all global installed packages.

The configuration file is that simple:
```json
{
    "host": "amqp://localhost",
    "queue": "email",
    "smtp": {
        "server": "smtp-server",
        "user": "smtp-user",
        "password": "smtp-password"
    }
}
```

In `host` you must especify the AMQP server, this means: which server has RabbitMQ running (we don't tried another message broker). `queue` is the email queue feeded by a "Rabbit Mailer client", check bellow a list with available client packages to import to your application (if you created a client for Rabbit Mailer using a not listed language please notify us). `smtp` contains your email server information such as smtp `server` address, your `user` and `password` credentials.

## Troubleshooting

### The rabbit-mailer service is not working
First of all, check if the command `rabbit-mailer -v` works, if yes this means that rabbit-mailer was successfully installed by npm globaly. Find the `node_modules/rabbit-mailer` (the path can be located running `npm root -g`). Now, copy the file located at `service/rabbit-mailer.service` to your systemd services directory (this directory is usually `/etc/systemd/system` or `/usr/systemd/system`, it can be different to your distro). After copy the service file run `sudo systemctl deamon-reload` to reload the services. Finally run `sudo service rabbit-mailer start`.

### The rabbit-mailer is setted but returns fail
There's two cases where rabbit-mailer service can breaks: (i) the execution script path is not correctly configurated; (ii) the configuration file contains inconsistencies and it is breaking the server. 

To fix the (i)th problem you have to check where is located the rabbit-mailer binary, to do this go do the path returned by `npm root -g` the binary file is at `rabbit-mailer/bin/server` (copy the absolute path to this file). Go to your systemd services path and edit `rabbit-mailer.service` at line 7 change the `ExecStart` to your correct server binary path. Run `systemctl daemon-reload` and, finally, `service rabbit-mailer start`.

To fix the (ii)th you have to verify the `config.json` file looking for issues. It's located at `node-mailer` subdirectory of the showed by `npm root -g`.

## Contributing

All contribution is welcome, please read `./github/CONTRIBUTING.md`

## License

Rabbit Mailer is licensed over GPLv3 [read about](https://www.gnu.org/licenses/gpl-3.0.html)
