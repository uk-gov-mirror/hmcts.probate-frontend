'use strict';

const config = require('app/config');
const MultipleApplications = require('app/services/MultipleApplications');
const logger = require('app/components/logger')('Init');
const content = require('app/resources/en/translation/dashboard');

const getApplications = (req, res, next) => {
    const session = req.session;
    const multipleApplications = new MultipleApplications(config.services.multipleApplicatons.urlApplications, session.id);

    multipleApplications.getApplications(req.authToken, req.session.serviceAuthorization, session.form.applicantEmail)
        .then(result => {
            if (result.applications && result.applications.length) {
                cleanupFormdata(session.form);
            }

            session.form.applications = result.applications;
            next();
        })
        .catch(err => {
            logger.error(`Error while getting applications: ${err}`);
        });
};

const getCase = (req, res) => {
    const session = req.session;
    const multipleApplications = new MultipleApplications(config.services.multipleApplicatons.urlCase, session.id);
    const ccdCaseId = req.originalUrl.split('/')[2];

    multipleApplications.getCase(req.authToken, req.session.serviceAuthorization, session.form.applicantEmail, ccdCaseId)
        .then(result => {
            session.form = result.formdata;
            if (result.status === content.statusInProgress) {
                res.redirect('/task-list');
            } else {
                res.redirect('/thank-you');
            }
        })
        .catch(err => {
            logger.error(`Error while getting the case: ${err}`);
        });
};

const cleanupFormdata = (formdata) => {
    delete formdata.applicant;
    delete formdata.checkAnswersSummary;
    delete formdata.deceased;
    delete formdata.documents;
    delete formdata.executors;
    delete formdata.iht;
    delete formdata.legalDeclaration;
    delete formdata.summary;
    delete formdata.will;
};

module.exports.getApplications = getApplications;
module.exports.getCase = getCase;
