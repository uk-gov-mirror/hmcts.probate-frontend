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

    nextStepOptions(ctx) {
        ctx.divorcedOrSeparated = (ctx.maritalStatus === content.optionDivorced || ctx.maritalStatus === content.optionSeparated);
        return {
            options: [
                {key: 'divorcedOrSeparated', value: true, choice: 'divorcedOrSeparated'}
            ]
        };
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.deceasedName;
        delete ctx.divorcedOrSeparated;
        return [ctx, formdata];
    }

    clearFormData(ctx, sessionForm) {
        const fieldToCheckSection = 'deceased';
        const fieldToCheck = 'maritalStatus';
        const dataToClear = {
            divorcePlace: 'deceased.divorcePlace',
            anyChildren: 'deceased.anyChildren',
            anyOtherChildren: 'deceased.anyOtherChildren',
            allChildrenOver18: 'deceased.allChildrenOver18',
            anyDeceasedChildren: 'deceased.anyDeceasedChildren',
            anyGrandchildrenUnder18: 'deceased.anyGrandchildrenUnder18',
            relationshipToDeceased: 'applicant.relationshipToDeceased',
            spouseNotApplyingReason: 'applicant.spouseNotApplyingReason',
            adoptionPlace: 'applicant.adoptionPlace'
        };

        return super.clearFormData(ctx, sessionForm, fieldToCheckSection, fieldToCheck, dataToClear);
    }
}

module.exports = DeceasedMaritalStatus;
