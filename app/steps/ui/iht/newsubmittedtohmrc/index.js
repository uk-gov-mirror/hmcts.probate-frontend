'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const {get} = require('lodash');

class NewSubmittedToHmrc extends ValidationStep {

    static getUrl() {
        return '/new-submitted-to-hmrc';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'ihtFormIdTesting', value: 'optionIHT400', choice: 'optionIHT400'},
                {key: 'ihtFormIdTesting', value: 'optionIHT400421', choice: 'optionIHT400421'},
                {key: 'ihtFormIdTesting', value: 'optionNA', choice: 'optionNA'},
            ]
        };
    }

    handleGet(ctx, formdata) {
        if (formdata.iht.estateValueCompleted) {
            ctx.estateValueCompleted = get(formdata, 'iht.estateValueCompleted') === 'optionYes';
            if (typeof get(formdata, 'iht.ihtFormEstateId') !== 'undefined') {
                ctx.ihtFormIdTesting = get(formdata, 'iht.ihtFormEstateId');
            } else {
                ctx.ihtFormIdTesting = 'optionNA';
            }
        }
        return [ctx, []];
    }

    handlePost(ctx, errors, formdata) {
        ctx.ihtFormEstateId = ctx.ihtFormIdTesting;
        formdata.iht.ihtFormEstateId = ctx.ihtFormIdTesting;
        if (ctx.ihtFormIdTesting === 'optionIHT400421' || ctx.ihtFormIdTesting === 'optionIHT400') {
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
        } else if (ctx.ihtFormIdTesting === 'optionNA') {
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

    clearoutValues(formdata, ctx) {
        delete formdata.grossValue;
        delete formdata.netValue;
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
    }

    clearoutEstateValues(formdata, ctx) {
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

    isComplete(ctx) {
        return [
            ctx.estateValueCompleted==='optionYes' || ctx.estateValueCompleted==='optionNo', 'inProgress'
        ];
    }
}

module.exports = NewSubmittedToHmrc;
