'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/will/original');

class WillOriginal extends ValidationStep {

    static getUrl() {
        return '/will-original';
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('notOriginal');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'original', value: content.optionYes, choice: 'isOriginal'}
            ]
        };
    }
}

module.exports = WillOriginal;
