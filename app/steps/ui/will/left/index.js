'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/will/left');

class WillLeft extends ValidationStep {

    static getUrl() {
        return '/will-left';
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('noWill');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'left', value: content.optionYes, choice: 'withWill'}
            ]
        };
    }
}

module.exports = WillLeft;
