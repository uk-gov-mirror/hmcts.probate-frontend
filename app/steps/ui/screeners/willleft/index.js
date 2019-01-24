'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
const content = require('app/resources/en/translation/screeners/willleft');
const pageUrl = '/will-left';
const fieldKey = 'left';
const FeatureToggle = require('app/utils/FeatureToggle');

class WillLeft extends EligibilityValidationStep {

    static getUrl() {
        return pageUrl;
    }

    handlePost(ctx, errors, formdata, session, hostname, featureToggles) {
        super.handlePost(ctx, errors, formdata, session, hostname, featureToggles);
        ctx.isToggleEnabled = FeatureToggle.isEnabled(featureToggles, 'intestacy_screening_questions');
        session.willLeft = ctx.left;
        return [ctx, errors];
    }

    getContextData(req, res) {
        const featureToggles = {
            isToggleEnabled: 'intestacy_screening_questions'
        };
        return super.getContextData(req, res, pageUrl, fieldKey, featureToggles);
    }

    nextStepUrl(req, ctx) {
        return this.next(req, ctx).constructor.getUrl('noWill');
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

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.isToggleEnabled;
        return [ctx, formdata];
    }
}

module.exports = WillLeft;
