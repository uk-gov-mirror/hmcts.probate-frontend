'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class WillHasVisibleDamage extends ValidationStep {

    static getUrl() {
        return '/will-has-damage';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'willHasVisibleDamage', value: 'optionYes', choice: 'willDoesHaveVisibleDamage'},
            ]
        };
    }
}

module.exports = WillHasVisibleDamage;
