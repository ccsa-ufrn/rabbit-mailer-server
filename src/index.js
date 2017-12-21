/**
 * CCSA - UFRN. 2017.
 */
"use strict";

const mailer = require("./mailer");
const fs = require("fs");
const path = require("path");

const configFile = JSON.parse(fs.readFileSync(path.resolve('config.json'), 'utf-8'));

mailer.listen(configFile.amqp, configFile.smtp, configFile.queueName);