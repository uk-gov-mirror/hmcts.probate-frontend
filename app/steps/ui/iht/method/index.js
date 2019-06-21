'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const content = require('app/resources/en/translation/iht/method');

class IhtMethod extends ValidationStep {

    static getUrl() {
        return '/iht-method';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'method', value: content.optionOnline, choice: 'online'}
            ]
        };
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);

        if (formdata.iht && formdata.iht.method && ctx.method !== formdata.iht.method) {
            if (ctx.method === content.optionPaper) {
                delete ctx.identifier;
                delete ctx.grossValueOnline;
                delete ctx.netValueOnline;
            } else {
                delete ctx.form;
                delete ctx.ihtFormId;
                delete ctx.grossIHT205;
                delete ctx.grossIHT207;
                delete ctx.grossIHT400421;
                delete ctx.netIHT205;
                delete ctx.netIHT207;
                delete ctx.netIHT400421;
            }

            delete ctx.assetsOutside;
            delete ctx.netValueAssetsOutsideField;
            delete ctx.netValueAssetsOutside;

            if (formdata.deceased) {
                delete formdata.deceased.anyChildren;
                delete formdata.deceased.allChildrenOver18;
                delete formdata.deceased.anyDeceasedChildren;
                delete formdata.deceased.anyGrandchildrenUnder18;
            }
        }

        return [ctx, formdata];
    }
}

module.exports = IhtMethod;
