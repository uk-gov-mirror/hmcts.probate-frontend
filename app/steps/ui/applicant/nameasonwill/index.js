'use strict';
const ValidationStep = require('app/core/steps/ValidationStep');
const {get} = require('lodash');
const WillWrapper = require('app/wrappers/Will');
const content = require('app/resources/en/translation/executors/applying');

class ApplicantNameAsOnWill extends ValidationStep {

    static getUrl() {
        return '/applicant-name-as-on-will';
    }

    isSoftStop (formdata, ctx) {
        return {
            stepName: this.constructor.name,
            isSoftStop: get(formdata, 'applicant.nameAsOnTheWill') === this.generateContent(ctx, formdata).optionNo
        };
    }

    handleGet(ctx, formdata) {
        ctx.codicilPresent = (new WillWrapper(formdata.will)).hasCodicils();
        return [ctx];
    }

    handlePost(ctx, errors) {
        if (ctx.nameAsOnTheWill !== 'No') {
            delete ctx.alias;
            delete ctx.aliasReason;
            delete ctx.otherReason;
        }
        return [ctx, errors];
    }

    nextStepOptions() {
        const nextStepOptions = {
            options: [
                {key: 'nameAsOnTheWill', value: content.optionNo, choice: 'hasAlias'}
            ]
        };
        return nextStepOptions;
    }

    clearFormData(ctx, sessionForm) {
        const fieldToCheckSection = 'applicant';
        const fieldToCheck = 'nameAsOnTheWill';
        const dataToClear = {
            alias: 'applicant.alias',
            aliasReason: 'applicant.aliasReason'
        };

        return super.clearFormData(ctx, sessionForm, fieldToCheckSection, fieldToCheck, dataToClear);
    }

}

module.exports = ApplicantNameAsOnWill;
