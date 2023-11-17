'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class NewSubmittedToHmrc extends ValidationStep {

    static getUrl() {
        return '/new-submitted-to-hmrc';
    }
    nextStepOptions() {
        return {
            options: [
                {key: 'ihtFormIdTesting', value: 'optionIHT400', choice: 'optionIHT400'},
                {key: 'ihtFormIdTesting', value: 'optionIHT400421', choice: 'optionIHT400421'},
                {key: 'ihtFormIdTesting', value: 'NOTAPPLICABLE', choice: 'optionNA'},
            ]
        };
    }
    handlePost(ctx, errors, formdata) {
        if (ctx.ihtFormIdTesting === 'optionIHT400421' || ctx.ihtFormIdTesting === 'optionIHT400') {
            ctx.ihtFormEstateId = ctx.ihtFormIdTesting;
            ctx.estateValueCompleted = 'optionYes';
            delete ctx.estateGrossValue;
            delete ctx.estateNetValue;
            delete ctx.estateNetQualifyingValue;
            delete ctx.estateNetQualifyingValueField;
            delete ctx.estateGrossValueField;
            delete ctx.estateNetValueField;
        } else if (ctx.ihtFormIdTesting === 'optionNA') {
            delete ctx.ihtGrossValue;
            delete ctx.ihtNetValue;
            delete ctx.ihtFormEstateId;
            ctx.estateValueCompleted = 'optionNo';
            delete ctx.grossValueField;
            delete ctx.netValueField;
        }
        return super.handlePost(ctx, errors, formdata);
    }
    action(ctx, formdata) {
        super.action(ctx, formdata);
        if (ctx.estateValueCompleted === 'optionNo') {
            delete formdata.iht.grossValue;
            delete formdata.iht.grossValueField;
            delete formdata.iht.netValue;
            delete formdata.iht.netValueField;
            delete formdata.iht.ihtFormEstateId;
            delete ctx.ihtGrossValue;
            delete ctx.ihtNetValue;
            delete ctx.ihtFormEstateId;
            delete ctx.grossValueField;
            delete ctx.netValueField;
        } else if (ctx.estateValueCompleted === 'optionYes') {
            delete formdata.iht.estateGrossValue;
            delete formdata.iht.estateNetValue;
            delete formdata.iht.estateNetQualifyingValue;
            delete formdata.iht.estateNetQualifyingValueField;
            delete formdata.iht.estateGrossValueField;
            delete formdata.iht.estateNetValueField;
            delete ctx.estateGrossValue;
            delete ctx.estateNetValue;
            delete ctx.estateNetQualifyingValue;
            delete ctx.estateNetQualifyingValueField;
            delete ctx.estateGrossValueField;
            delete ctx.estateNetValueField;
        }
        return [ctx, formdata];
    }
}

module.exports = NewSubmittedToHmrc;
