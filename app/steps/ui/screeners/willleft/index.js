'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/screeners/willleft');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();
const FeatureToggle = require('app/utils/FeatureToggle');

class WillLeft extends ValidationStep {

    static getUrl() {
        return '/will-left';
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('noWill');
    }

    handlePost(ctx, errors, formdata, session, hostname, featureToggles) {
        ctx.isToggleEnabled = FeatureToggle.isEnabled(featureToggles, 'intestacy_screening_questions');

        return [ctx, errors];
    }

    nextStepOptions(ctx) {
        if (ctx.isToggleEnabled) {
            return {
                options: [
                    {key: 'left', value: content.optionNo, choice: 'withoutWillToggleOn'}
                ]
            };
        }

        return {
            options: [
                {key: 'left', value: content.optionYes, choice: 'withWill'}
            ]
        };
    }

    setEligibilityCookie(req, res, ctx) {
        eligibilityCookie.setCookie(req, res, this.nextStepUrl(ctx));
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.isToggleEnabled;
        return [ctx, formdata];
    }
}

module.exports = WillLeft;
