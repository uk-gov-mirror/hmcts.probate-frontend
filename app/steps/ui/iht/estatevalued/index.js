'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const DeathCertificateInterim = require('app/steps/ui/deceased/deathcertificate');

class IhtEstateValued extends ValidationStep {

    static getUrl() {
        return '/estate-valued';
    }

    static getPreviousUrl() {
        return DeathCertificateInterim.getUrl();
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'estateValueCompleted', value: 'optionYes', choice: 'ihtEstateFormsCompleted'}
            ]
        };
    }

}

module.exports = IhtEstateValued;
