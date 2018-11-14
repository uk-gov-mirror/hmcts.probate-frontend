'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/applicant/newexecutor');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();

class NewApplicantExecutor extends ValidationStep {

    static getUrl() {
        return '/new-applicant-executor';
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('notExecutor');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'executor', value: content.optionYes, choice: 'isExecutor'}
            ]
        };
    }

    setEligibilityCookie(req, res, ctx) {
        eligibilityCookie.setCookie(req, res, this.nextStepUrl(ctx));
    }
}

module.exports = NewApplicantExecutor;
