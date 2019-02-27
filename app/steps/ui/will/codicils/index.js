'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const json = require('app/resources/en/translation/will/codicils');

class WillCodicils extends ValidationStep {

    static getUrl() {
        return '/will-codicils';
    }

    nextStepUrl(req, ctx) {
        return this.next(req, ctx).constructor.getUrl('codicils');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'codicils', value: json.optionNo, choice: 'noCodicils'}
            ]
        };
    }

    action(ctx, formdata) {
        if (ctx.codicils === this.generateContent(ctx, formdata).optionNo) {
            delete ctx.codicilsNumber;
        }
        super.action(ctx, formdata);
        return [ctx, formdata];
    }

    clearFormData(ctx, sessionForm, fieldToCheckSection) {
        const fieldToCheck = 'codicils';
        const dataToClear = {
            codicilsNumber: 'will.codicilsNumber'
        };

        return super.clearFormData(ctx, sessionForm, fieldToCheckSection, fieldToCheck, dataToClear);
    }

}

module.exports = WillCodicils;
