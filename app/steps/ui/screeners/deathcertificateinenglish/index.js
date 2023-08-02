'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
const pageUrl = '/death-certificate-english';
const fieldKey = 'deathCertificateInEnglish';
const Dashboard = require('app/steps/ui/dashboard');
const DeathCertificate = require('app/steps/ui/screeners/deathcertificate');

class DeathCertificateInEnglish extends EligibilityValidationStep {

    static getUrl() {
        return pageUrl;
    }

    static getPreviousUrl() {
        return DeathCertificate.getUrl();
    }

    getContextData(req, res) {
        return super.getContextData(req, res, pageUrl, fieldKey);
    }

    nextStepUrl(req, ctx) {
        if (!this.previousQuestionsAnswered(req, ctx, fieldKey)) {
            return Dashboard.getUrl();
        }

        return this.next(req, ctx).constructor.getUrl('deathCertificateInEnglish');
    }

    nextStepOptions() {
        return {
            options: [
                {key: fieldKey, value: 'optionYes', choice: 'deathCertificateInEnglish'}
            ]
        };
    }
}

module.exports = DeathCertificateInEnglish;
