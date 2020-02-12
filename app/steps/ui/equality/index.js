'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const RedirectRunner = require('app/core/runners/RedirectRunner');
const config = require('app/config');
const get = require('lodash').get;

class Equality extends ValidationStep {

    runner() {
        return new RedirectRunner();
    }

    static getUrl() {
        return '/equality-and-diversity';
    }

    runnerOptions(ctx, formdata, language, host) {
        const params = {
            serviceId: 'PROBATE',
            ccdCaseId: formdata.ccdCase.id,
            returnUrl: `${host}/task-list`,
            language: language
        };

        const qs = Object.keys(params)
            .map(key => key + '=' + params[key])
            .join('&');

        const serviceUrl = config.services.equalityAndDiversity.url + ':' + config.services.equalityAndDiversity.port + config.services.equalityAndDiversity.path + '?' + qs;
        const options = {
            redirect: true,
            url: serviceUrl
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
