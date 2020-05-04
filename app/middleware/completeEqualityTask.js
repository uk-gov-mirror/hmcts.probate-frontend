'use strict';

const config = require('config');
const get = require('lodash').get;
const ServiceMapper = require('app/utils/ServiceMapper');
const uuidv4 = require('uuid/v4');
// const Healthcheck = require('app/utils/Healthcheck');
// const logger = require('app/components/logger')('Init');

const completeEqualityTask = (params) => {
    // const healthcheck = new Healthcheck();
    // const service = {
    //     name: config.services.equalityAndDiversity.name,
    //     url: config.services.equalityAndDiversity.url,
    //     gitCommitIdPath: config.services.equalityAndDiversity.gitCommitIdPath
    // };
    //
    // healthcheck.getServiceHealth(service)
    //     .then(json => {
    //         params.req.session.equalityHealth = json.status;
    //         logger.info(config.services.equalityAndDiversity.name, 'is', params.req.session.equalityHealth);
    //
    //         const formData = ServiceMapper.map(
    //             'FormData',
    //             [config.services.orchestrator.url, params.req.sessionID]
    //         );
    //
    //         if (params.req.session.equalityHealth === 'UP') {
    //             params.req.session.form.equality = {
    //                 pcqId: uuidv4()
    //             };
    //         } else {
    //             params.req.session.form.equality = {
    //                 pcqId: 'Service down'
    //             };
    //         }
    //
    //         formData.post(params.req.authToken, params.req.session.serviceAuthorization, params.req.session.form.ccdCase.id, params.req.session.form);
    //
    //         if (params.req.session.equalityHealth === 'UP') {
    //             params.next();
    //         } else if (params.req.session.caseType ==='intestacy') {
    //             params.res.redirect('/summary');
    //         } else {
    //             params.res.redirect('/task-list');
    //         }
    //     });

    if (params.isEnabled && !get(params.req.session.form, 'equality.pcqId', false)) {
        const formData = ServiceMapper.map(
            'FormData',
            [config.services.orchestrator.url, params.req.sessionID]
        );

        params.req.session.form.equality = {
            pcqId: uuidv4()
        };

        formData.post(params.req.authToken, params.req.session.serviceAuthorization, params.req.session.form.ccdCase.id, params.req.session.form);

        params.next();
    } else if (params.req.session.caseType ==='intestacy') {
        params.res.redirect('/summary');
    } else {
        params.res.redirect('/task-list');
    }
};

module.exports = completeEqualityTask;
