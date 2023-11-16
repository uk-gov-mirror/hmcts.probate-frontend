'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class SubmittedToHmrc extends ValidationStep {

    static getUrl() {
        return '/submitted-to-hmrc';
    }
    nextStepOptions() {
        return {
            options: [
                {key: 'ihtFormEstateId', value: 'optionIHT400', choice: 'optionIHT400'},
                {key: 'ihtFormEstateId', value: 'optionIHT400421', choice: 'optionIHT400421'}
            ]
        };
    }

}

module.exports = SubmittedToHmrc;
