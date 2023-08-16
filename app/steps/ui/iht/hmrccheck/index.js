'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class HmrcCheck extends ValidationStep {

    static getUrl() {
        return '/hmrc-check';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'estateValueCompleted', value: 'optionYes', choice: 'ihtEstateFormsCompleted'}
            ]
        };
    }

}

module.exports = HmrcCheck;
