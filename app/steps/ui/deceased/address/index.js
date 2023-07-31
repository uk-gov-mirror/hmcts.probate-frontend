'use strict';

const AddressStep = require('app/core/steps/AddressStep');

class DeceasedAddress extends AddressStep {

    static getUrl() {
        return '/deceased-address';
    }
    static getPreviousUrl() {
        return '/deceased-dod';
    }
}

module.exports = DeceasedAddress;
