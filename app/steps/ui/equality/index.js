'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const RedirectRunner = require('app/core/runners/RedirectRunner');
const config = require('app/config');
const get = require('lodash').get;
const EqualityService = require('app/services/Equality');

class Equality extends ValidationStep {

    runner() {
        return new RedirectRunner();
    }

    static getUrl() {
        return '/equality-and-diversity';
    }

    runnerOptions(ctx, formdata, language, sessionID) {
        const serviceUrl = config.services.equalityAndDiversity.url + ':' + config.services.equalityAndDiversity.port + config.services.equalityAndDiversity.path;
        const equality = new EqualityService(serviceUrl, sessionID);

        const options = {
            redirect: true,
            method: 'POST',
            service: equality,
            url: serviceUrl,
            body: {
                serviceId: 'PROBATE',
                ccdCaseId: formdata.ccdCase.id,
                returnUrl: 'http://localhost:3000/task-list',
                language: language
            }
        };

        formdata.equality = {
            equality: true
        };

        return options;
    }

    isComplete(ctx, formdata) {
        const complete = get(formdata, 'equality.equality', false) || get(formdata, 'payment.reference', false);
        return [complete, 'inProgress'];
    }
}

module.exports = Equality;
