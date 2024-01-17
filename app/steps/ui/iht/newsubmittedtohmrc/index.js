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

    handlePost(ctx, errors) {
        if (ctx.ihtFormEstateId === 'optionIHT400421' || ctx.ihtFormEstateId === 'optionIHT400') {
            delete ctx.estateGrossValue;
            delete ctx.estateNetValue;
            delete ctx.estateNetQualifyingValue;
            delete ctx.estateNetQualifyingValueField;
            delete ctx.estateGrossValueField;
            delete ctx.estateNetValueField;
            ctx.estateValueCompleted = 'optionYes';
        } else if (ctx.ihtFormEstateId === 'optionNA') {
            delete ctx.ihtGrossValue;
            delete ctx.ihtNetValue;
            delete ctx.grossValueField;
            delete ctx.netValueField;
            ctx.estateValueCompleted = 'optionNo';
        }
        return super.handlePost(ctx, errors);
    }
    isComplete(ctx) {
        return [
            ctx.estateValueCompleted==='optionYes' || ctx.estateValueCompleted==='optionNo', 'inProgress'
        ];
    }
}

module.exports = NewSubmittedToHmrc;
