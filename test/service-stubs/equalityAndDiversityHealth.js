'use strict';

const config = require('app/config');
const express = require('express');
const router = require('express').Router();
const logger = require('app/components/logger')('Init');
const app = express();
const equalityPort = config.services.equalityAndDiversity.port;

app.use(express.json());

app.get('/health', (req, res) => {
    logger.info(req.body);
    res.send({status: 'UP'});
});

app.use(router);

logger.info(`Listening on: ${equalityPort}`);

const server = app.listen(equalityPort);

module.exports = server;
