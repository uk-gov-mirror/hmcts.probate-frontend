'use strict';

const config = require('config');
const ServiceMapper = require('app/utils/ServiceMapper');
const Healthcheck = require('app/utils/Healthcheck');
const uuidv4 = require('uuid/v4');
const logger = require('app/components/logger')('Init');

const completeEqualityTask = (req, res, next) => {
    const healthcheck = new Healthcheck();
    const services = [
        {name: config.services.equalityAndDiversity.name, url: config.services.equalityAndDiversity.url}
    ];

    healthcheck.getDownstream(services, healthcheck.health, healthDownstream => {
        req.session.equalityHealth = healthDownstream[0].status;
        logger.info(config.services.equalityAndDiversity.name, 'is', req.session.equalityHealth);

        const formData = ServiceMapper.map(
            'FormData',
            [config.services.orchestrator.url, req.sessionID]
        );

        if (req.session.equalityHealth === 'UP') {
            req.session.form.equality = {
                pcqId: uuidv4()
            };
        } else {
            req.session.form.equality = {
                pcqId: 'Service down'
            };
        }

        formData.post(req.authToken, req.session.serviceAuthorization, req.session.form.ccdCase.id, req.session.form);

        if (req.session.equalityHealth === 'UP') {
            next();
        } else if (req.session.caseType ==='intestacy') {
            res.redirect('/summary');
        } else {
            res.redirect('/task-list');
        }
    });
};

module.exports = completeEqualityTask;
