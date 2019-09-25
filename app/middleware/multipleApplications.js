'use strict';

const config = require('app/config');
const logger = require('app/components/logger')('Init');
const ServiceMapper = require('app/utils/ServiceMapper');

const initDashboard = (req, res, next) => {
    const session = req.session;
    const formdata = session.form;
    const formData = ServiceMapper.map(
        'FormData',
        [config.services.orchestrator.url, req.sessionID]
    );

    if (formdata.screeners) {
        cleanupFormdata(req.session.form, true);

        formData.postNew(req.authToken, req.session.serviceAuthorization, req.session.form.caseType)
            .then(() => {
                getApplications(req, res, next, formData);
            })
            .catch(err => {
                logger.error(`Error while getting applications: ${err}`);
            });
    } else {
        getApplications(req, res, next, formData);
    }
};

const getApplications = (req, res, next, formData) => {
    formData.getAll(req.authToken, req.session.serviceAuthorization)
        .then(result => {
            if (result.applications && result.applications.length) {
                cleanupFormdata(req.session.form);
            }

            req.session.form.applications = result.applications;
            next();
        })
        .catch(err => {
            logger.error(`Error while getting applications: ${err}`);
        });
};

const getCase = (req, res) => {
    const session = req.session;
    const ccdCaseId = req.originalUrl
        .split('/')[2]
        .split('?')[0];
    let probateType = req.originalUrl
        .split('/')[2]
        .split('?')[1]
        .split('=')[1];

    if (!probateType && req.session.form.caseType) {
        probateType = req.session.form.caseType;
    }

    const formData = ServiceMapper.map(
        'FormData',
        [config.services.orchestrator.url, req.sessionID]
    );

    formData.get(req.authToken, req.session.serviceAuthorization, ccdCaseId, probateType)
        .then(result => {
            session.form = result.formdata;

            if (session.form.ccdCase.state === 'Draft' || session.form.ccdCase.state === 'PAAppCreated' || session.form.ccdCase.state === 'CasePaymentFailed') {
                res.redirect('/task-list');
            } else {
                res.redirect('/thank-you');
            }
        })
        .catch(err => {
            logger.error(`Error while getting the case: ${err}`);
        });
};

const cleanupFormdata = (formdata, retainCaseType = false) => {
    const retainedList = [
        'applicantEmail',
        'payloadVersion',
        'userLoggedIn'
    ];
    if (retainCaseType) {
        retainedList.push('caseType');
    }
    Object.keys(formdata).forEach((key) => {
        if (!retainedList.includes(key)) {
            delete formdata[key];
        }
    });
};

module.exports.initDashboard = initDashboard;
module.exports.getCase = getCase;
