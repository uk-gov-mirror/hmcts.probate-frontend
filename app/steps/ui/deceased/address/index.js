'use strict';

const AddressStep = require('app/core/steps/AddressStep');
const DeceasedDod = require('app/steps/ui/deceased/dod');

class DeceasedAddress extends AddressStep {

    static getUrl() {
        return '/deceased-address';
    }
    static getPreviousUrl() {
        return DeceasedDod.getUrl();
    }
}

module.exports = DeceasedAddress;
