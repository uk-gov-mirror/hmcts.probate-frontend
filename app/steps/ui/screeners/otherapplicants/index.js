'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/screeners/otherapplicants');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();

class OtherApplicants extends ValidationStep {

    static getUrl() {
        return '/other-applicants';
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('otherApplicants');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'otherApplicants', value: content.optionNo, choice: 'noOthers'}
            ]
        };
    }

    setEligibilityCookie(req, res, ctx) {
        eligibilityCookie.setCookie(req, res, this.nextStepUrl(ctx));
    }
}

module.exports = OtherApplicants;
