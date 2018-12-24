'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const FormatName = require('app/utils/FormatName');
const content = require('app/resources/en/translation/deceased/maritalstatus');

class DeceasedMaritalStatus extends ValidationStep {

    static getUrl() {
        return '/deceased-marital-status';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        ctx.deceasedName = FormatName.format(formdata.deceased);
        return ctx;
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'maritalStatus', value: content.optionDivorced, choice: 'divorced'},
                {key: 'maritalStatus', value: content.optionSeparated, choice: 'divorced'}
            ]
        };
    }
}

module.exports = DeceasedMaritalStatus;
