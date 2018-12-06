'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
const content = require('app/resources/en/translation/will/neworiginal');
const pageUrl = '/new-will-original';
const fieldKey = 'original';

class NewWillOriginal extends EligibilityValidationStep {

    static getUrl() {
        return pageUrl;
    }

    getContextData(req, res) {
        return super.getContextData(req, res, pageUrl, fieldKey);
    }

    handlePost(ctx, errors, formdata, session) {
        return super.handlePost(ctx, errors, formdata, session);
    }

    persistFormData() {
        return super.persistFormData();
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('notOriginal');
    }

    nextStepOptions() {
        return {
            options: [
                {key: fieldKey, value: content.optionYes, choice: 'isOriginal'}
            ]
        };
    }
}

module.exports = NewWillOriginal;
