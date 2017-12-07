/**
 * CCSA - UFRN. 2017.
 */
"use strict";

const mailer = require("./mailer");
const fs = require("fs");

let queueHost = "amqp://localhost";
let queueName = "emails";
let options = {
    service: null,
    user: null,
    pass: null,
}

function printHelp() {
    const helpMessage =
    "Usage: rabbit-mailer [--arg value | --help]\n\n" +
    "Options:\n"+
    "  -v, --version\t\tprint rabbit-mailer version\n" +
    "  --help\t\tshows this help message\n" +
    "  --config\t\tdefines a configuration file" +
    "  --host\t\tdefines the message broker address\n" +
    "  --queue\t\tset the message queue name\n" +
    "  --smtp-server\t\tset the SMTP server address\n" +
    "  --smtp-user\t\tset the SMTP user\n" +
    "  --smtp-password\tset the SMTP password\n\n" +
    "Documentation can be found at https://github.com/ccsa-ufrn/rabbit-mailer";
    console.log(helpMessage);
}

function readConfigFile(filePath, queueHost, queueName, options) {
    const configFile = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(configFile);
    if (configFile) {
        queueHost = configFile.host,
        queueName = configFile.queue,
        options = {
            service: configFile.smtp.server,
            user: configFile.smtp.user,
            password: configFile.smtp.password
        };
    }
}

module.exports = function() {
    for (let i = 2; i < process.argv.length; i++) {
        // a argument assumes the following structure: --name value | --help
        const term = process.argv[i];
        switch(term) {
            case "-v":
            case "--version":
                console.log("v1.0");
                process.exit();
                break;
            case "--help":
                printHelp();
                process.exit();
                break;
        }

        if (process.argv.length >= i + 1) {
            switch(term) {
                case "--host":
                    queueHost = process.argv[++i];
                    continue;
                case "--queue":
                    queueName = process.argv[++i];
                    continue;
                case "--smtp-server":
                    options.service = process.argv[++i];
                    continue;
                case "--smtp-user":
                    options.user = process.argv[++i];
                    continue;
                case "--smtp-password":
                    options.pass = process.argv[++i];
                    continue;
                case "--config":
                    // Read from configuration file
                    const configFile = JSON.parse(fs.readFileSync(process.argv[++i], 'utf-8'));
                    if (configFile) {
                        queueHost = configFile.host,
                        queueName = configFile.queue,
                        options = {
                            service: configFile.smtp.server,
                            user: configFile.smtp.user,
                            password: configFile.smtp.password
                        };
                    }
                    continue;
            }
        }
    }

    console.log("Starting Rabbit Mailer server...");
    try {
        mailer.listen(queueHost, queueName, options);
    } catch(e) {
        console.log("Initialization failed. Exiting with error");
        process.exit(1);
    }
}