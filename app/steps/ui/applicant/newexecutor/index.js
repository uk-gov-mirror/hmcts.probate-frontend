'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/applicant/newexecutor');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();
const pageUrl = '/new-applicant-executor';
const fieldKey = 'executor';

class NewApplicantExecutor extends ValidationStep {

    static getUrl() {
        return pageUrl;
    }

    getFieldKey() {
        return fieldKey;
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const answerValue = eligibilityCookie.getAnswer(req, pageUrl, fieldKey);

        if (answerValue) {
            ctx[fieldKey] = answerValue;
        }

        return ctx;
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('notExecutor');
    }

    nextStepOptions() {
        return {
            options: [
                {key: fieldKey, value: content.optionYes, choice: 'isExecutor'}
            ]
        };
    }

    persistFormData() {
        return {};
    }

    setEligibilityCookie(req, res, nextStepUrl, fieldKey, fieldValue) {
        eligibilityCookie.setCookie(req, res, nextStepUrl, fieldKey, fieldValue);
    }
}

module.exports = NewApplicantExecutor;
