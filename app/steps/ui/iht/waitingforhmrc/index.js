'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
//const JourneyMap = require('../../../../core/JourneyMap');

class WaitingForHmrc extends ValidationStep {

    static getUrl() {
        return '/waiting-for-hmrc';
    }

}

module.exports = WaitingForHmrc;
