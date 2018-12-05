'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/deceased/newdeathcertificate');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();
const pageUrl = '/new-death-certificate';
const fieldKey = 'deathCertificate';

class NewDeathCertificate extends ValidationStep {

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

    handlePost(ctx, errors, formdata, session) {
        delete session.form;
        return [ctx, errors];
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('deathCertificate');
    }

    nextStepOptions() {
        return {
            options: [
                {key: fieldKey, value: content.optionYes, choice: 'hasCertificate'}
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

module.exports = NewDeathCertificate;
