'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
const pageUrl = '/applicant-executor';
const fieldKey = 'executor';
const Dashboard = require('app/steps/ui/dashboard');
const WillOriginal = require('app/steps/ui/screeners/willoriginal');

class ApplicantExecutor extends EligibilityValidationStep {

    static getUrl() {
        return pageUrl;
    }

    static getPreviousUrl() {
        return WillOriginal.getUrl();
    }

    getContextData(req, res) {
        return super.getContextData(req, res, pageUrl, fieldKey);
    }

    nextStepUrl(req, ctx) {
        if (!this.previousQuestionsAnswered(req, ctx, fieldKey)) {
            return Dashboard.getUrl();
        }

        return this.next(req, ctx).constructor.getUrl('notExecutor');
    }

    nextStepOptions() {
        return {
            options: [
                {key: fieldKey, value: 'optionYes', choice: 'isExecutor'}
            ]
        };
    }
}

module.exports = ApplicantExecutor;
