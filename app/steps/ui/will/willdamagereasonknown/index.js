'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class WillDamageReasonKnown extends ValidationStep {

    static getUrl() {
        return '/will-damage-reason';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'willDamageReasonKnown', value: 'optionYes', choice: 'willDamageReasonIsKnown'}
            ]
        };
    }

}

module.exports = WillDamageReasonKnown;
