'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const {get} = require('lodash');

class NewSubmittedToHmrc extends ValidationStep {

    static getUrl() {
        return '/new-submitted-to-hmrc';
    }
    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        if (formdata.estateValueCompleted) {
            ctx.estateValueCompleted = get(formdata, 'iht.estateValueCompleted') === 'true';
            if (typeof get(formdata, 'iht.ihtFormEstateId') !== 'undefined') {
                ctx.ihtFormIdTesting = get(formdata, 'iht.ihtFormEstateId');
            } else {
                ctx.ihtFormIdTesting = 'optionNA';
            }
        }
        return ctx;
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
            formdata.iht.ihtFormEstateId = ctx.ihtFormIdTesting;
            formdata.iht.estateValueCompleted = 'optionYes';
            this.clearoutEstateValues(formdata, ctx);
        } else if (ctx.ihtFormIdTesting === 'optionNA') {
            ctx.estateValueCompleted = 'optionNo';
            formdata.iht.estateValueCompleted = 'optionNo';
            this.clearoutValues(formdata, ctx);
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

    action(ctx, formdata) {
        super.action(ctx, formdata);
        if (ctx.estateValueCompleted === 'optionNo') {
            this.clearoutValues(formdata, ctx);
        } else if (ctx.estateValueCompleted === 'optionYes') {
            this.clearoutEstateValues(formdata, ctx);
        }
        return [ctx, formdata];
    }
}

module.exports = NewSubmittedToHmrc;
