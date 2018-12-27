'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/applicant/relationshiptodeceased');

class RelationshipToDeceased extends ValidationStep {

    static getUrl() {
        return '/relationship-to-deceased';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        ctx.deceasedMaritalStatus = (formdata.deceased && formdata.deceased.maritalStatus) ? formdata.deceased.maritalStatus : '';
        return ctx;
    }

    nextStepUrl(ctx) {
        return this.next(ctx).constructor.getUrl('otherRelationship');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'relationshipToDeceased', value: content.optionSpousePartner, choice: 'spousePartner'},
                {key: 'relationshipToDeceased', value: content.optionSpousePartner, choice: 'spousePartnerOver250k'},
                {key: 'relationshipToDeceased', value: content.optionChild, choice: 'child'},
                {key: 'relationshipToDeceased', value: content.optionAdoptedChild, choice: 'adoptedChild'},
            ]
        };
    }
}

module.exports = RelationshipToDeceased;
