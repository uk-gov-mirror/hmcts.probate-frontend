'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class WillDamageReasonKnown extends ValidationStep {

    static getUrl() {
        return '/will-damage-reason';
    }

}

module.exports = WillDamageReasonKnown;
