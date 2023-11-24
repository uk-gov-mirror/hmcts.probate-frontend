'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class NewSubmittedToHmrc extends ValidationStep {

    static getUrl() {
        return '/new-submitted-to-hmrc';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'ihtFormEstateId', value: 'optionIHT400', choice: 'optionIHT400'},
                {key: 'ihtFormEstateId', value: 'optionIHT400421', choice: 'optionIHT400421'},
                {key: 'ihtFormEstateId', value: 'optionNA', choice: 'optionNA'},
            ]
        };
    }

    handlePost(ctx, errors, formdata) {
        if (ctx.ihtFormEstateId === 'optionIHT400421' || ctx.ihtFormEstateId === 'optionIHT400') {
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
            ctx.estateValueCompleted = 'optionYes';
            formdata.iht.estateValueCompleted = 'optionYes';
        } else if (ctx.ihtFormEstateId === 'optionNA') {
            delete formdata.grossValue;
            delete formdata.netValue;
            delete formdata.iht.grossValue;
            delete formdata.iht.grossValueField;
            delete formdata.iht.netValue;
            delete formdata.iht.netValueField;
            delete ctx.ihtGrossValue;
            delete ctx.ihtNetValue;
            delete ctx.grossValueField;
            delete ctx.netValueField;
            ctx.estateValueCompleted = 'optionNo';
            formdata.iht.estateValueCompleted = 'optionNo';
        }
        return super.handlePost(ctx, errors, formdata);
    }
    isComplete(ctx) {
        return [
            ctx.estateValueCompleted==='optionYes' || ctx.estateValueCompleted==='optionNo', 'inProgress'
        ];
    }
}

module.exports = NewSubmittedToHmrc;
