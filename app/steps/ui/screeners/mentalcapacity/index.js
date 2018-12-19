'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
const content = require('app/resources/en/translation/screeners/mentalcapacity');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();
const pageUrl = '/mental-capacity';
const fieldKey = 'mentalCapacity';

class MentalCapacity extends EligibilityValidationStep {

    static getUrl() {
        return pageUrl;
    }

    handlePost(ctx, errors, formdata, session) {
        delete session.form;
        return [ctx, errors];
    }

    getContextData(req, res) {
        return super.getContextData(req, res, pageUrl, fieldKey);
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('mentalCapacity');
    }

    nextStepOptions() {
        return {
            options: [
                {key: fieldKey, value: content.optionYes, choice: 'isCapable'}
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

module.exports = MentalCapacity;
