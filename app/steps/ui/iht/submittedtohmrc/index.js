'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class SubmittedToHMRC extends ValidationStep {

    static getUrl() {
        return '/submitted-to-hmrc';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'optionIHT400', value: 'optionIHT400', choice: 'submittedIHT400'},
                {key: 'optionIHT400IHT421', value: 'optionIHT400IHT421', choice: 'submittedIHT400IHT421'},
                {key: 'optionNotRequired', value: 'optionNotRequired', choice: 'notRequired'}
            ]
        };
    }

}

module.exports = SubmittedToHMRC;
