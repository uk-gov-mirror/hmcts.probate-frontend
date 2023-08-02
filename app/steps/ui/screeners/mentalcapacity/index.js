'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
const pageUrl = '/mental-capacity';
const fieldKey = 'mentalCapacity';
const Dashboard = require('app/steps/ui/dashboard');
const ApplicantExecutor = require('app/steps/ui/screeners/applicantexecutor');

class MentalCapacity extends EligibilityValidationStep {

    static getUrl() {
        return pageUrl;
    }

    static getPreviousUrl() {
        return ApplicantExecutor.getUrl();
    }

    getContextData(req, res) {
        return super.getContextData(req, res, pageUrl, fieldKey);
    }

    nextStepUrl(req, ctx) {
        if (!this.previousQuestionsAnswered(req, ctx, fieldKey)) {
            return Dashboard.getUrl();
        }

        return this.next(req, ctx).constructor.getUrl('mentalCapacity');
    }

    nextStepOptions() {
        return {
            options: [
                {key: fieldKey, value: 'optionYes', choice: 'isCapable'}
            ]
        };
    }
}

module.exports = MentalCapacity;
