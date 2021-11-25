'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');

class ExceptedEstateDeceasedDod extends EligibilityValidationStep {

    static getUrl() {
        return '/ee-deceased-dod';
    }
}

module.exports = ExceptedEstateDeceasedDod;
