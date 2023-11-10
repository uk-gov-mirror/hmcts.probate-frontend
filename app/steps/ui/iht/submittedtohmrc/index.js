'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class SubmittedToHmrc extends ValidationStep {

    static getUrl() {
        return '/submitted-to-hmrc';
    }
    nextStepOptions() {
        return {
            options: [
                {key: 'optionIHT400', value: 'optionIHT400', choice: 'optionIHT400'},
                {key: 'optionIHT400421', value: 'optionIHT400421', choice: 'optionIHT400421'},
                {key: 'optionNotRequired', value: 'optionNotRequired', choice: 'optionNotRequired'}
            ]
        };
    }

}

module.exports = SubmittedToHmrc;
