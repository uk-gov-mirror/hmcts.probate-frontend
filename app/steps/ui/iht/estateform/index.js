'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const IhtEstateValued = require('app/steps/ui/iht/estatevalued');

class IhtEstateForm extends ValidationStep {

    static getUrl() {
        return '/estate-form';
    }

    static getPreviousUrl() {
        return IhtEstateValued.getUrl();
    }

}

module.exports = IhtEstateForm;
