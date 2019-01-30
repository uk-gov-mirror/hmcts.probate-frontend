'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const contentMaritalStatus = require('app/resources/en/translation/deceased/maritalstatus');
const content = require('app/resources/en/translation/deceased/divorceplace');

class DivorcePlace extends ValidationStep {

    static getUrl() {
        return '/deceased-divorce-place';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        ctx.legalProcess = (formdata.deceased && formdata.deceased.maritalStatus === contentMaritalStatus.optionDivorced) ? contentMaritalStatus.divorce : contentMaritalStatus.separation;
        return ctx;
    }

    nextStepUrl(req, ctx) {
        return this.next(req, ctx).constructor.getUrl('divorcePlace');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'divorcePlace', value: content.optionYes, choice: 'inEnglandOrWales'},
            ]
        };
    }
}

module.exports = DivorcePlace;
