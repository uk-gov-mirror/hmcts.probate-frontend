'use strict';

const AddressStep = require('app/core/steps/AddressStep');
const FeatureToggle = require('app/utils/FeatureToggle');

module.exports = class DeceasedAddress extends AddressStep {

    static getUrl() {
        return '/deceased-address';
    }

    handlePost(ctx, errors, formdata, session, hostname, featureToggles) {
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
};
