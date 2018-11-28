'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/deceased/deathcertificate');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();

class DeathCertificate extends ValidationStep {

    static getUrl() {
        return '/death-certificate';
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('deathCertificate');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'deathCertificate', value: content.optionYes, choice: 'hasCertificate'}
            ]
        };
    }

    persistFormData() {
        return {};
    }

    setEligibilityCookie(req, res, nextStepUrl) {
        eligibilityCookie.setCookie(req, res, nextStepUrl);
    }
}

module.exports = DeathCertificate;
