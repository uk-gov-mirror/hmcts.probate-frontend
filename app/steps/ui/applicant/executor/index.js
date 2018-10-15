'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/applicant/executor');

class ApplicantExecutor extends ValidationStep {

    static getUrl() {
        return '/applicant-executor';
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
}

module.exports = ApplicantExecutor;
