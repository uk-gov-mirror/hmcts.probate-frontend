'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/iht/completed');

class IhtCompleted extends ValidationStep {

    static getUrl() {
        return '/iht-completed';
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('ihtNotCompleted');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'completed', value: content.optionYes, choice: 'completed'}
            ]
        };
    }
}

module.exports = IhtCompleted;
