'use strict';

const config = require('config');
const get = require('lodash').get;
const ServiceMapper = require('app/utils/ServiceMapper');
const {v4: uuidv4} = require('uuid');
const logger = require('app/components/logger')('Init');
const featureToggle = new (require('app/utils/FeatureToggle'))();
const healthcheck = require('@hmcts/nodejs-healthcheck');
const app = require('app');
const os = require('os');

const completeEqualityTask = (params) => {
    const formData = ServiceMapper.map(
        'FormData',
        [config.services.orchestrator.url, params.req.sessionID]
    );

    if (params.isEnabled && !get(params.req.session.form, 'equality.pcqId', false)) {
        const healthCheckConfig = {
            checks: {
                [config.services.equalityAndDiversity.name]: healthcheck.web(`${config.services.equalityAndDiversity.url}/health`, function() {
                    return {
                        callback: (err, res) => {
                            if (err) {
                                console.log('Health check failed!');
                            }
                            console.log('HEALTH CHECK RES => ', res);
                            // const equalityHealthIsUp = json.status === 'UP' && json['pcq-backend'].actualStatus === 'UP';
                            const equalityHealthIsUp = res.body.status === 'good' ? healthcheck.up() : healthcheck.down();
                            logger.info(config.services.equalityAndDiversity.name, 'is', (equalityHealthIsUp ? 'UP' : 'DOWN'));
                            if (equalityHealthIsUp === healthcheck.UP) {
                                params.req.session.form.equality = {
                                    pcqId: uuidv4()
                                };

                                formData.post(params.req.session.authToken, params.req.session.serviceAuthorization, params.req.session.form.ccdCase.id, params.req.session.form);

                                featureToggle.callCheckToggle(params.req, params.res, params.next, params.res.locals.launchDarkly,
                                    'ft_pcq_token', featureToggle.toggleFeature);
                            } else {
                                pcqDown(params, formData);
                            }

                            return equalityHealthIsUp;
                        },
                        timeout: config.health.timeout,
                        deadline: config.health.deadline
                    };
                })
            },
            buildInfo: {
                name: config.health.service_name,
                host: os.hostname(),
                uptime: process.uptime(),
            },
        };

        healthcheck.addTo(app, healthCheckConfig);
    } else {
        pcqDown(params, formData);
    }
};

const pcqDown = (params, formData) => {
    formData.post(params.req.authToken, params.req.session.serviceAuthorization, params.req.session.form.ccdCase.id, params.req.session.form);

    if (params.req.session.caseType === 'intestacy') {
        params.res.redirect('/summary');
    } else {
        params.res.redirect('/task-list');
    }
};

module.exports = completeEqualityTask;
