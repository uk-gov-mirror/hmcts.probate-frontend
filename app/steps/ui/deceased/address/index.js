'use strict';

const AddressStep = require('app/core/steps/AddressStep');

class DeceasedAddress extends AddressStep {

    static getUrl() {
        return '/deceased-address';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'isToggleEnabled', value: true, choice: 'toggleOn'}
            ]
        };
    }
}

module.exports = DeceasedAddress;
