'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class IhtEstateForm extends ValidationStep {

    static getUrl() {
        return '/estate-form';
    }
    nextStepOptions() {
        return {
            options: [
                {key: 'optionIHT400', value: 'optionIHT400', choice: 'optionIHT400'},
                {key: 'optionIHT400421', value: 'optionIHT400421', choice: 'optionIHT400421'},
                {key: 'optionIHT205', value: 'optionIHT205', choice: 'optionIHT205'}
            ]
        };
    }
}

module.exports = IhtEstateForm;
