'use strict';

const AddressStep = require('app/core/steps/AddressStep');
const FeatureToggle = require('app/utils/FeatureToggle');

class DeceasedAddress extends AddressStep {

    static getUrl() {
        return '/deceased-address';
    }

    handlePost(ctx, errors, formdata, session, hostname, featureToggles) {
        super.handlePost(ctx, errors, formdata, session, hostname, featureToggles);
        const isDocumentUploadToggleEnabled = FeatureToggle.isEnabled(featureToggles, 'document_upload');
        ctx.isDocumentUploadToggleEnabled = ctx.isToggleEnabled && isDocumentUploadToggleEnabled;

        return [ctx, errors];
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'isDocumentUploadToggleEnabled', value: true, choice: 'documentUploadToggleOn'},
            ]
        };
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.isDocumentUploadToggleEnabled;
        return [ctx, formdata];
    }
}

module.exports = DeceasedAddress;
