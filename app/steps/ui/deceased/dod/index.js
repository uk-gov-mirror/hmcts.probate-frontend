'use strict';

const DateStep = require('app/core/steps/DateStep');
const FieldError = require('app/components/error');
const FeatureToggle = require('app/utils/FeatureToggle');

class DeceasedDod extends DateStep {

    static getUrl() {
        return '/deceased-dod';
    }

    dateName() {
        return 'dod';
    }

    handlePost(ctx, errors, formdata, session, hostname, featureToggles) {
        const dod = new Date(`${ctx.dod_year}-${ctx.dod_month}-${ctx.dod_day}'`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (today < dod) {
            errors.push(FieldError('dod_date', 'dateInFuture', this.resourcePath, this.generateContent()));
        }

        ctx.isToggleEnabled = FeatureToggle.isEnabled(featureToggles, 'screening_questions');

        return [ctx, errors];
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'isToggleEnabled', value: true, choice: 'toggleOn'}
            ]
        };
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.isToggleEnabled;
        return [ctx, formdata];
    }
}

module.exports = DeceasedDod;
