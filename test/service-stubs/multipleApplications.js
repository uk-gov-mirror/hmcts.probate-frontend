'use strict';

const config = require('app/config');
const express = require('express');
const logger = require('app/components/logger');
const app = express();
const router = require('express').Router();
const MULTIPLE_APPLICATIONS_PORT = config.services.multipleApplicatons.port;
const content = require('app/resources/en/translation/dashboard');
const url = require('url');

router.get('/ma-get-applications', (req, res) => {
    res.status(200);
    res.send({
        applications: [
            {
                ccdCaseId: '1234-5678-9012-3456',
                deceasedFullName: 'David Cameron',
                dateCreated: '13 July 2016',
                status: content.statusInProgress
            },
            {
                ccdCaseId: '5678-9012-3456-1234',
                deceasedFullName: 'Theresa May',
                dateCreated: '24 July 2019',
                status: content.statusSubmitted
            },
            {
                ccdCaseId: '9012-3456-1234-5678',
                deceasedFullName: 'Boris Johnson',
                dateCreated: '31 October 2019',
                status: content.statusDraft
            }
        ]
    });
});

router.get('/ma-get-case', (req, res) => {
    const urlParts = url.parse(req.originalUrl, true);
    let status;

    switch (urlParts.query.ccdCaseId) {
    case '1234-5678-9012-3456':
        status = content.statusInProgress;
        break;
    case '5678-9012-3456-1234':
        status = content.statusSubmitted;
        break;
    case '9012-3456-1234-5678':
        status = content.statusDraft;
        break;
    default:
        status = '';
        break;
    }

    res.status(200);
    res.send({
        status: status,
        formdata: {
            executors: {}
        }
    });
});

app.use(router);

logger().info(`Listening on: ${MULTIPLE_APPLICATIONS_PORT}`);

const server = app.listen(MULTIPLE_APPLICATIONS_PORT);

module.exports = server;
