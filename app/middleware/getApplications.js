'use strict';

const config = require('app/config');
const MultipleApplications = require('app/services/MultipleApplications');
const logger = require('app/components/logger')('Init');

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

module.exports = getApplications;
