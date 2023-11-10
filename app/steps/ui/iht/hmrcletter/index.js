'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class HmrcLetter extends ValidationStep {

    static getUrl() {
        return '/hmrc-letter';
    }
    nextStepOptions() {
        return {
            options: [
                {key: 'hmrcLetter', value: 'optionYes', choice: 'hmrcLetter'}
            ]
        };
    }
}

module.exports = HmrcLetter;
