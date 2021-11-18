'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class IhtEstateValued extends ValidationStep {

    static getUrl() {
        return '/estate-valued';
    }

}

module.exports = IhtEstateValued;
