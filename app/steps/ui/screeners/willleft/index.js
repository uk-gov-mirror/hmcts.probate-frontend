'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
const content = require('app/resources/en/translation/screeners/willleft');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();
const FeatureToggle = require('app/utils/FeatureToggle');
const pageUrl = '/will-left';
const fieldKey = 'left';

class WillLeft extends EligibilityValidationStep {

    static getUrl() {
        return pageUrl;
    }

    handlePost(ctx, errors, formdata, session, hostname, featureToggles) {
        ctx.isToggleEnabled = FeatureToggle.isEnabled(featureToggles, 'intestacy_screening_questions');
        delete session.form;
        return [ctx, errors];
    }

    getContextData(req, res) {
        return super.getContextData(req, res, pageUrl, fieldKey);
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('noWill');
    }

    nextStepOptions(ctx) {
        if (ctx.isToggleEnabled) {
            return {
                options: [
                    {key: fieldKey, value: content.optionYes, choice: 'withWill'},
                    {key: fieldKey, value: content.optionNo, choice: 'withoutWillToggleOn'}
                ]
            };
        }

        return {
            options: [
                {key: fieldKey, value: content.optionYes, choice: 'withWill'}
            ]
        };
    }

    persistFormData() {
        return {};
    }

    setEligibilityCookie(req, res, nextStepUrl) {
        eligibilityCookie.setCookie(req, res, nextStepUrl);
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.isToggleEnabled;
        return [ctx, formdata];
    }
}

module.exports = WillLeft;
