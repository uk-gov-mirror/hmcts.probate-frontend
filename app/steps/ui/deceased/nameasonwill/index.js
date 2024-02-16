'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const {get} = require('lodash');

class DeceasedNameAsOnWill extends ValidationStep {

    static getUrl() {
        return '/deceased-name-as-on-will';
    }

    isSoftStop (formdata) {
        return {
            stepName: this.constructor.name,
            isSoftStop: get(formdata, 'deceased.nameAsOnTheWill') === 'optionNo'
        };
    }

    handlePost(ctx, errors) {
        if (ctx.nameAsOnTheWill !== 'optionNo') {
            delete ctx.alias;
        }
        return [ctx, errors];
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'nameAsOnTheWill', value: 'optionNo', choice: 'hasAlias'}
            ]
        };
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);

        if (ctx.nameAsOnTheWill === 'optionYes') {
            delete ctx.alias;
            delete formdata.alias;
        }

        return [ctx, formdata];
    }
}

module.exports = DeceasedNameAsOnWill;
