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
    handlePost(ctx, errors) {
        if (ctx.ihtFormIdTesting === 'optionIHT400421' || ctx.ihtFormIdTesting === 'optionIHT400') {
            ctx.ihtFormEstateId = ctx.ihtFormIdTesting;
            ctx.estateValueCompleted = 'optionYes';
        } else if (ctx.ihtFormIdTesting === 'optionNA') {
            delete ctx.ihtFormEstateId;
            ctx.estateValueCompleted = 'optionNo';
        }
        return super.handlePost(ctx, errors);
    }
}

module.exports = NewSubmittedToHmrc;
