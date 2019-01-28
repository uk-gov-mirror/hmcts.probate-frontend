'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
const content = require('app/resources/en/translation/screeners/willleft');
const pageUrl = '/will-left';
const fieldKey = 'left';

class WillLeft extends EligibilityValidationStep {

    static getUrl() {
        return pageUrl;
    }

    getContextData(req, res) {
        const featureToggles = {
            isIntestacyScreeningToggleEnabled: 'intestacy_screening_questions'
        };
        return super.getContextData(req, res, pageUrl, fieldKey, featureToggles);
    }

    nextStepUrl(req, ctx) {
        return this.next(req, ctx).constructor.getUrl('noWill');
    }

    nextStepOptions(ctx) {
        if (ctx.isIntestacyScreeningToggleEnabled) {
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
        delete ctx.isIntestacyScreeningToggleEnabled;
        return [ctx, formdata];
    }
}

module.exports = WillLeft;
